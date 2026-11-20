"""Generate the grouped RVBI catalogue and the curated complement."""

import argparse
import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlencode

from gerar_acervo import ROOT, OUTPUT, AREAS, edition_name, validate_isbn, url, require
from gerar_fichas_rvbi import ENDPOINT

SOURCE = ROOT / "data/catalogo/coleta-2026-11-20"
GROUPS = SOURCE / "obras"
PUBLIC = OUTPUT / "ampliado"
NAMES = {
    "Econômico": "Direito Econômico",
    "Digital": "Direito Digital",
    "Processo Penal": "Processo Penal",
    "Internacional": "Direito Internacional",
}


def slug(value):
    normalized = unicodedata.normalize("NFD", value)
    return re.sub(r"[^a-z0-9]+", "-", "".join(c for c in normalized if not unicodedata.combining(c)).lower()).strip("-")


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def save(path, value, module=False):
    contents = json.dumps(value, ensure_ascii=False, indent=2) + "\n"
    if module:
        contents = "// Gerado por scripts/gerar_catalogo_ampliado.py.\nexport default " + contents.rstrip() + ";\n"
    path.write_text(contents, encoding="utf-8")


def split_snapshot(path):
    snapshot = read(path)
    grouped = defaultdict(list)
    for group in snapshot.pop("obras"):
        grouped[slug(group["areas"][0])].append(group)
    require(not any(file.stem not in grouped for file in GROUPS.glob("*.json")),
            "Há áreas na coleta anterior fora do novo lote; confira a migração.")
    GROUPS.mkdir(parents=True, exist_ok=True)
    for area, groups in grouped.items():
        save(GROUPS / f"{area}.json", groups)
    save(SOURCE / "procedencia.json", snapshot)


def record(entry):
    record_id = entry["id_rvbi"]
    isbns = list(dict.fromkeys(entry["isbns"]))
    return dict(
        id="rvbi-" + record_id.rsplit("/", 1)[-1], isbns=isbns,
        isbn=isbns[0] if len(isbns) == 1 else None, year=entry["ano"],
        name=" · ".join(filter(None, [entry["edicao"] or "Edição do registro", entry["volume"]])),
        source=ENDPOINT + "?" + urlencode(dict(verb="GetRecord", metadataPrefix="marc21", identifier=record_id)),
        sourceLabel="Ver registro na RVBI", provenance="Rede Virtual de Bibliotecas (RVBI)",
    )


def edition(row):
    isbn = row["isbn13"]
    validate_isbn(isbn)
    return dict(
        id=isbn, isbn=isbn, year=int(row["ano"]) if row["ano"] else None,
        name=edition_name(row), format=row["formato"], source=url(row["fonte_bibliografica"]),
        sourceLabel="Ver ficha editorial", access=row["acesso_publico"], bookAccess=row["acesso_ao_livro"],
    )


def broad_catalog():
    target = PUBLIC / "bibliografia"
    target.mkdir(parents=True, exist_ok=True)
    imports, files, ids, isbns, records = [], [], set(), set(), set()
    for index, path in enumerate(sorted(GROUPS.glob("*.json"))):
        area = path.stem
        public = []
        for group in read(path):
            key = group["id"]
            require(key not in ids, f"Obra agrupada duplicada: {key}")
            ids.add(key)
            institutional = [record(entry) for entry in group["registros_rvbi"]]
            for entry in institutional:
                require(entry["id"] not in records, f"Registro duplicado: {entry['id']}")
                records.add(entry["id"])
            editions = [edition(row) for row in group["edicoes_editoriais"]] + institutional
            for item in editions:
                for isbn in item.get("isbns", [item["isbn"]]):
                    validate_isbn(isbn)
                    isbns.add(isbn)
            areas = [AREAS.get(label, (slug(label), ""))[0] for label in group["areas"]]
            aliases = list(dict.fromkeys(alias for entry in group["registros_rvbi"]
                                         for alias in [entry["titulo"], *entry["autores"],
                                                       ": ".join(filter(None, [entry["titulo"], entry["subtitulo"]]))]
                                         if alias and alias not in (group["titulo"], *group["autores"])))
            public.append(dict(
                id=key, area=areas[0], areas=areas, title=group["titulo"],
                author="; ".join(group["autores"]) or "Autoria não indicada",
                aliases=aliases, imported=True, label="Registro bibliográfico", editions=editions,
                provenance="Rede Virtual de Bibliotecas (RVBI)" if institutional else "Ficha editorial",
            ))
        file = target / f"{area}.mjs"
        file.write_text("// Gerado a partir da coleta institucional.\nexport default [\n"
                        + ",\n".join(json.dumps(book, ensure_ascii=False) for book in public) + "\n];\n", encoding="utf-8")
        name = f"area{index}"
        imports.append(f'import {name} from "./{file.name}";')
        files.append(f"...{name}")
    expected = read(SOURCE / "procedencia.json")["resumo"]
    require((len(ids), len(records), len(isbns)) == (expected["obras_agrupadas_estimativa"],
            expected["registros_rvbi_incluidos"], expected["isbns_distintos"]), "Contagens divergentes da coleta")
    (target / "index.mjs").write_text("\n".join(imports) + "\nexport default [" + ", ".join(files) + "];\n", encoding="utf-8")
    print(f"{len(ids)} grupos, {len(records)} registros e {len(isbns)} ISBNs na coleta")


def curated():
    payload = read(SOURCE / "curadoria-novas-areas.json")
    new_books, edition_owner, topics, catalog = {}, {}, {}, {}
    new_isbns = {row["isbn13"] for row in payload["edicoes"]}
    previous = [row for path in GROUPS.glob("*.json") for group in read(path)
                for row in group["edicoes_editoriais"] if row["isbn13"] not in new_isbns]
    for row in previous:
        edition_owner[row["isbn13"]] = row["obra_id"]
    for row in payload["edicoes"]:
        area = slug(row["area"])
        checked = edition(row)
        key = row["obra_id"]
        require(checked["isbn"] not in edition_owner, f"ISBN editorial duplicado: {checked['isbn']}")
        edition_owner[checked["isbn"]] = key
        book = new_books.setdefault(key, dict(id=key, area=area, title=row["titulo"], author=row["autoria"],
                                             label=row["funcao_editorial"], editions=[]))
        book["editions"].append(checked)
    for row in payload["temas"]:
        key, area = row["tema_id"], slug(row["area"])
        require(key not in topics, f"Tema duplicado: {key}")
        label = row["area"]
        title = NAMES.get(label, "Direito " + label)
        catalog.setdefault(area, dict(course=dict(id=area, title=title, aliases=[label]), books=[], topics=[]))
        heading = {"ordem-economica": "Ordem econômica", "intervencao-estado-economia": "Intervenção do Estado na economia",
                   "defesa-concorrencia": "Defesa da concorrência"}.get(key, row["sinonimos"][0].capitalize())
        topic = dict(id=key, area=area, title=heading, readingTitle=heading.lower(),
                     aliases=list(dict.fromkeys([row["busca"], heading, *row["sinonimos"]])), refs={}, sources=[], recommendations={})
        topics[key] = topic
        catalog[area]["topics"].append(topic)
    for book in new_books.values():
        catalog[book["area"]]["books"].append(book)
    references = set()
    for row in payload["indicacoes"]:
        key, book, isbn = row["tema_id"], row["obra_id"], row["isbn13"]
        topic = topics[key]
        require(edition_owner.get(isbn) == book, f"ISBN não corresponde à obra: {key}/{isbn}")
        require((key, isbn) not in references, f"Indicação duplicada: {key}/{isbn}")
        references.add((key, isbn))
        source = url(row["fonte"])
        action = "Ver sumário" if "sumario" in source.lower() else "Ver ficha editorial"
        require(row["motivo_editorial"] and row["evidencia"], f"Falta justificativa ou evidência: {key}/{isbn}")
        topic["recommendations"][book] = dict(reason=row["motivo_editorial"], coverage=dict(url=source, action=action, evidence=row["evidencia"]))
        location, page = row["localizacao"], row["pagina_inicial"]
        require(page is None or (isinstance(page, int) and page > 0 and location), f"Página sem localização: {key}/{isbn}")
        if location:
            topic["refs"][isbn] = dict(where=f"{location} · p. {page}" if page else location, detail=row["evidencia"],
                                      precision="Página inicial" if page else "Capítulo ou seção", url=source, action=action)
    require((len(catalog), len(topics), len(references)) == (10, 13, 17), "Cobertura divergente do complemento")
    target = PUBLIC / "curadoria"
    target.mkdir(parents=True, exist_ok=True)
    imports, names = [], []
    for index, (area, data) in enumerate(catalog.items()):
        save(target / f"{area}.mjs", data, module=True)
        name = f"area{index}"
        imports.append(f'import {name} from "./{area}.mjs";')
        names.append(name)
    (target / "index.mjs").write_text("\n".join(imports) + "\nexport default [" + ", ".join(names) + "];\n", encoding="utf-8")
    print(f"{len(catalog)} áreas, {len(topics)} temas e {len(references)} novas indicações")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--coleta", type=Path, help="JSON com o agrupamento integral da RVBI")
    arguments = parser.parse_args()
    if arguments.coleta:
        split_snapshot(arguments.coleta)
    broad_catalog()
    curated()
