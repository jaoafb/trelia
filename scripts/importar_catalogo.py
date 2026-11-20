#!/usr/bin/env python3
"""Importa uma amostra de monografias da RVBI para revisão editorial."""

import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
import csv
from datetime import date
import json
from pathlib import Path
import re
import sys
import time
import unicodedata
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET


RVBI_PAGE = (
    "https://www12.senado.leg.br/institucional/biblioteca/rvbi/"
    "vocabulario-controlado-basico-e-classificacao-decimal-de-direito"
)
ISBN_API = "https://brasilapi.com.br/api/isbn/v1/"
NAMESPACES = {
    "o": "http://www.openarchives.org/OAI/2.0/",
    "m": "http://www.loc.gov/MARC21/slim",
}
AREAS = {
    "Constitucional": r"direito constitucional|controle de constitucionalidade|direitos fundamentais|"
                      r"constituicao (?:federal|brasileira|do brasil)|jurisdicao constitucional",
    "Civil": r"direito civil|codigo civil|direito das obrigacoes|direito de familia|direito das sucessoes|"
             r"responsabilidade civil|direitos reais",
    "Processo Civil": r"direito processual civil|processo civil|processual civil|tutela provisoria|"
                      r"processo de conhecimento|execucao civil",
    "Administrativo": r"direito administrativo|contratac(?:ao|oes) publicas?|contratos administrativos?|"
                      r"licitac(?:ao|oes)|poder de policia|improbidade administrativa|atos administrativos?",
    "Trabalho": r"direito (?:do trabalho|trabalhista)|legislacao trabalhista|direito processual do trabalho|"
                r"processo do trabalho|contrato de trabalho|direito sindical",
    "Tributário": r"direito tributario|codigo tributario|sistema tributario|processo tributario|"
                  r"execucao fiscal|reforma tributaria|planejamento tributario",
}
AREA_PATTERNS = {area: re.compile(rf"\b(?:{pattern})\b") for area, pattern in AREAS.items()}
LEVEL = re.compile(r"\b(?:manual|curso|introducao|tratado|compendio|teoria geral|instituicoes)\b")
YEAR = re.compile(r"\b(?:18|19|20)\d{2}\b")


def normalize(text):
    unaccented = "".join(
        char for char in unicodedata.normalize("NFD", text.casefold())
        if unicodedata.category(char) != "Mn"
    )
    return re.sub(r"[^a-z0-9]+", " ", unaccented).strip()


def isbn_checksum(prefix):
    return str((-sum(int(digit) * (1 if i % 2 == 0 else 3) for i, digit in enumerate(prefix))) % 10)


def normalize_isbn(value):
    match = re.match(r"^\s*([0-9][0-9\s-]*[0-9Xx])", value)
    if not match:
        return None
    code = re.sub(r"[\s-]", "", match[1]).upper()
    if re.fullmatch(r"\d{9}[\dX]", code):
        total = sum(int(digit) * (10 - pos) for pos, digit in enumerate(code[:9]))
        if (total + (10 if code[-1] == "X" else int(code[-1]))) % 11:
            return None
        prefix = "978" + code[:9]
        return prefix + isbn_checksum(prefix)
    if re.fullmatch(r"97[89]\d{10}", code) and code[-1] == isbn_checksum(code[:-1]):
        return code
    return None


def clean(value):
    return " ".join(value.split()).rstrip(" /:;,.")


def marc_fields(record, tag, codes):
    return [
        [(sub.attrib["code"], clean(sub.text)) for sub in field.findall("m:subfield", NAMESPACES)
         if sub.text and sub.get("code") in codes]
        for field in record.findall(f"m:datafield[@tag='{tag}']", NAMESPACES)
    ]


def marc_values(record, tag, codes):
    return [" ".join(text for _, text in field) for field in marc_fields(record, tag, codes) if field]


def area_matches(title, subjects):
    scores = {}
    title = normalize(title)
    topics = [normalize(subject) for subject in subjects]
    for area, pattern in AREA_PATTERNS.items():
        title_match = bool(pattern.search(title))
        subject_match = any(pattern.search(subject) for subject in topics)
        if title_match or subject_match:
            scores[area] = ("título" if title_match else "assunto", title_match, subject_match)
    return sorted(scores.items(), key=lambda item: item[1][1:], reverse=True)


def links_from_record(record):
    links = []
    for field in marc_fields(record, "856", "uyz"):
        urls = [text for code, text in field if code == "u"]
        label = " ".join(text for code, text in field if code in "yz")
        label_key = normalize(label)
        if "sumario" in label_key:
            kind = "sumário"
        elif re.search(r"\b(?:texto integral|texto completo|obra completa|acesso aberto)\b", label_key):
            kind = "texto integral indicado"
        elif re.match(r"^(?:lei|res|decreto|constituicao|emenda)\s+\d", label_key):
            kind = "legislação relacionada"
        else:
            kind = "acesso a conferir"
        for url in urls:
            parsed = urlsplit(url)
            if parsed.scheme in ("http", "https") and parsed.hostname:
                links.append({"tipo_indicado": kind, "url": url, "rótulo_original": label or None})
    return links


def parse_record(record):
    marc = record.find("o:metadata/m:record", NAMESPACES)
    source_id = record.findtext("o:header/o:identifier", namespaces=NAMESPACES)
    if marc is None or not source_id:
        return None
    leader = marc.findtext("m:leader", default="", namespaces=NAMESPACES)
    if leader[6:8] != "am":
        return None
    fixed = marc.findtext("m:controlfield[@tag='008']", default="", namespaces=NAMESPACES)
    if fixed[35:38].strip(" |") not in ("", "por", "mul", "und"):
        return None

    title_text = marc_values(marc, "245", "a")
    if not title_text:
        return None
    title = title_text[0]
    qualifiers = marc_values(marc, "245", "b")
    topics = list(dict.fromkeys(marc_values(marc, "650", "avxyz")))
    matches = area_matches(" ".join([title, *qualifiers]), topics)
    if not matches:
        return None

    candidates = [normalize_isbn(value) for value in marc_values(marc, "020", "a")]
    isbns = list(dict.fromkeys(code for code in candidates if code))
    authors = marc_values(marc, "100", "a") + marc_values(marc, "110", "a")
    if not authors:
        authors = marc_values(marc, "245", "c") or marc_values(marc, "700", "a")
    editions = marc_values(marc, "250", "a")
    publication = (marc_values(marc, "264", "c") or marc_values(marc, "260", "c"))
    publication_year = YEAR.search(" ".join(publication))
    areas = [{"nome": name, "evidência": evidence[0]} for name, evidence in matches]

    return {
        "id_rvbi": source_id,
        "data_registro_rvbi": record.findtext("o:header/o:datestamp", namespaces=NAMESPACES),
        "titulo": title,
        "subtitulo": qualifiers[0] if qualifiers else None,
        "autores": authors,
        "edicao": editions[0] if editions else None,
        "volume": " ".join(marc_values(marc, "245", "np")) or None,
        "ano": int(publication_year[0]) if publication_year else None,
        "editoras": marc_values(marc, "264", "b") or marc_values(marc, "260", "b"),
        "isbns": isbns,
        "areas_sugeridas": areas,
        "assuntos_rvbi": topics,
        "tem_nota_de_conteudo": bool(marc_values(marc, "505", "at")),
        "links_rvbi": links_from_record(marc),
    }


def fetch(url, timeout=12, attempts=3):
    req = Request(url, headers={"User-Agent": "CadernoDeLeitura/0.1 (catalogo bibliografico)"})
    for attempt in range(attempts):
        try:
            with urlopen(req, timeout=timeout) as response:
                return response.read()
        except HTTPError as error:
            if error.code not in (408, 429, 500, 502, 503, 504) or attempt == attempts - 1:
                raise
            retry_after = error.headers.get("Retry-After", "")
        except URLError:
            if attempt == attempts - 1:
                raise
            retry_after = ""
        time.sleep(min(30, int(retry_after)) if retry_after.isdigit() else attempt + 1)
    raise AssertionError("A consulta excedeu o número de tentativas.")


def decode_page(blob):
    root = ET.fromstring(blob)
    listing = root.find("o:ListRecords", NAMESPACES)
    if listing is None:
        raise ValueError(root.findtext("o:error", default="A RVBI não devolveu registros OAI-PMH.",
                                       namespaces=NAMESPACES))
    return listing.findall("o:record", NAMESPACES), listing.findtext("o:resumptionToken", namespaces=NAMESPACES)


def rvbi_pages(limit, start):
    page = fetch(RVBI_PAGE).decode("utf-8", errors="replace")
    endpoint = re.search(r"https://edge-rvbi\.folio\.ebsco\.com/oai/[A-Za-z0-9_-]+", page)
    if not endpoint:
        raise ValueError("O endereço OAI-PMH da RVBI mudou. Confira a página oficial do Senado.")
    params = {"verb": "ListRecords", "metadataPrefix": "marc21"}
    if start:
        params["from"] = start
    for index in range(limit):
        records, token = decode_page(fetch(endpoint[0] + "?" + urlencode(params)))
        print(f"RVBI: página {index + 1}, {len(records)} registros recebidos.", file=sys.stderr)
        yield records
        if not token:
            return
        params = {"verb": "ListRecords", "resumptionToken": token}
        time.sleep(0.25)


def candidate_rank(entry, area):
    match = next(item for item in entry["areas_sugeridas"] if item["nome"] == area)
    return (
        match["evidência"] == "título",
        bool(LEVEL.search(normalize(entry["titulo"]))),
        bool(entry["isbns"]),
        entry["tem_nota_de_conteudo"],
        entry["ano"] or 0,
        entry["id_rvbi"],
    )


def select_batch(entries, quota):
    selected = []
    used_isbns = set()
    used_works = set()
    counts = Counter()
    by_area = {
        area: iter(sorted(
            (entry for entry in entries if entry["areas_sugeridas"][0]["nome"] == area),
            key=lambda entry: candidate_rank(entry, area), reverse=True,
        )) for area in AREAS
    }
    for _ in range(quota):
        for area, candidates in by_area.items():
            for candidate in candidates:
                isbns = set(candidate["isbns"])
                work = tuple(normalize(value or "") for value in [
                    candidate["titulo"], candidate["subtitulo"], candidate["volume"], *candidate["autores"],
                ])
                if isbns & used_isbns or work in used_works:
                    continue
                used_isbns.update(isbns)
                used_works.add(work)
                selected.append({**candidate, "area_piloto": area, "status_editorial": "candidato"})
                counts[area] += 1
                break
    return selected, {area: counts[area] for area in AREAS}


def enrich(entry):
    if len(entry["isbns"]) != 1:
        status = "sem_isbn" if not entry["isbns"] else "multiplos_isbns"
        return {"status": status}

    isbn = entry["isbns"][0]
    url = ISBN_API + isbn
    try:
        payload = json.loads(fetch(url, timeout=5, attempts=1))
    except HTTPError as error:
        return {"status": "não_encontrado" if error.code == 404 else "indisponível", "url": url,
                "http": error.code}
    except (OSError, ValueError):
        return {"status": "indisponível", "url": url}

    if not isinstance(payload, dict):
        return {"status": "resposta_incompatível", "url": url}
    returned_isbn = normalize_isbn(str(payload.get("isbn") or ""))
    if returned_isbn != isbn or not payload.get("title"):
        return {"status": "resposta_incompatível", "url": url}

    provider = {key: payload.get(key) for key in (
        "provider", "isbn", "title", "authors", "publisher", "year", "format",
    )}
    return {"status": "encontrado", "url": url, "metadados": provider}


def csv_value(value):
    if value is None:
        return ""
    value = str(value)
    return "'" + value if value.startswith(("=", "+", "-", "@", "\t", "\r")) else value


def review_rows(selected):
    for entry in sorted(selected, key=lambda item: (list(AREAS).index(item["area_piloto"]), item["titulo"])):
        yield {
            "area_sugerida": entry["area_piloto"],
            "evidencia_area": entry["areas_sugeridas"][0]["evidência"],
            "titulo": entry["titulo"],
            "subtitulo": entry["subtitulo"],
            "autores": " · ".join(entry["autores"]),
            "ano": entry["ano"],
            "edicao": entry["edicao"],
            "volume": entry["volume"],
            "isbns": " · ".join(entry["isbns"]),
            "nota_de_conteudo_rvbi": "sim" if entry["tem_nota_de_conteudo"] else "",
            "links_indicados_pela_rvbi": " · ".join(link["url"] for link in entry["links_rvbi"]),
            "id_rvbi": entry["id_rvbi"],
            "brasilapi": entry["brasilapi"]["status"],
            "decisao_editorial": "",
            "area_confirmada": "",
            "tipo_de_acesso_verificado": "",
            "fonte_de_verificacao": "",
            "observacoes": "",
        }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pages", type=int, default=30, help="Máximo de páginas OAI-PMH, cada uma com até 100 registros.")
    parser.add_argument("--per-area", type=int, default=10, help="Meta de candidatos por área.")
    parser.add_argument("--from-date", type=date.fromisoformat, help="Data inicial OAI-PMH no formato AAAA-MM-DD.")
    parser.add_argument("--xml", type=Path, nargs="+", help="Reutiliza respostas de ListRecords salvas localmente.")
    parser.add_argument("--enrich", action="store_true", help="Consulta a BrasilAPI para ISBNs únicos do lote.")
    parser.add_argument("--out", type=Path, required=True, help="Novo diretório para o JSON e o CSV.")
    args = parser.parse_args()
    if args.pages < 1 or args.per_area < 1:
        parser.error("--pages e --per-area precisam ser positivos.")

    if args.out.exists():
        parser.error("Escolha um diretório de saída novo para preservar revisões existentes.")

    entries = {}
    num_records, pages_total = 0, 0
    batches = (decode_page(file.read_bytes())[0] for file in args.xml) if args.xml else rvbi_pages(
        args.pages, args.from_date.isoformat() if args.from_date else None,
    )
    for records in batches:
        pages_total += 1
        num_records += len(records)
        for record in records:
            if entry := parse_record(record):
                entries[entry["id_rvbi"]] = entry

    candidates, counts = select_batch(list(entries.values()), args.per_area)
    if not candidates:
        parser.error("A coleta não encontrou candidatos para essas áreas.")

    if args.enrich:
        with ThreadPoolExecutor(max_workers=2) as pool:
            for entry, result in zip(candidates, pool.map(enrich, candidates)):
                entry["brasilapi"] = result
    else:
        for entry in candidates:
            entry["brasilapi"] = {"status": "não_consultado"}

    report = {
        "fonte_rvbi": RVBI_PAGE,
        "gerado_em": date.today().isoformat(),
        "paginas_rvbi": pages_total,
        "registros_rvbi": num_records,
        "monografias_identificadas_alinhadas_ao_recorte": len(entries),
        "meta_por_area": args.per_area,
        "candidatos_por_area": counts,
        "candidatos_com_isbn": sum(bool(entry["isbns"]) for entry in candidates),
        "candidatos_com_nota_de_conteudo": sum(entry["tem_nota_de_conteudo"] for entry in candidates),
        "candidatos_com_link_informado": sum(bool(entry["links_rvbi"]) for entry in candidates),
        "brasilapi": dict(Counter(entry["brasilapi"]["status"] for entry in candidates)),
    }
    args.out.mkdir(parents=True)
    (args.out / "lote-piloto.json").write_text(
        json.dumps({"coleta": report, "candidatos": candidates}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    rows = list(review_rows(candidates))
    with (args.out / "lote-piloto.csv").open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0]), delimiter=";", lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({key: csv_value(value) for key, value in row.items()})
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except (ET.ParseError, OSError, ValueError) as error:
        raise SystemExit(f"Importação interrompida: {error}") from None
