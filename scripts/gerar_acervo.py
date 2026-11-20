"""Validate the editorial CSV batch and generate one static module per area."""

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data/catalogo/expansao"
OUTPUT = ROOT / "dist/catalogo"
AREAS = {
    "Constitucional": ("constitucional", "Direito Constitucional"),
    "Civil": ("civil", "Direito Civil"),
    "Processo Civil": ("processo-civil", "Processo Civil"),
    "Administrativo": ("administrativo", "Direito Administrativo"),
    "Trabalho": ("trabalho", "Direito do Trabalho"),
    "Tributário": ("tributario", "Direito Tributário"),
}
ACCESS = {
    "Ficha editorial pública": "Ver ficha da editora",
    "Ficha pública com sumário": "Ver ficha e sumário",
    "Ficha pública e material parcial editorial": "Ver ficha e prévia",
    "Ficha pública com roteiro de aulas": "Ver ficha e roteiro de aulas",
    "Ficha comercial pública": "Ver ficha de compra",
}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def rows(kind):
    with (INPUT / f"acervo-ampliado-{kind}.csv").open(encoding="utf-8-sig", newline="") as source:
        return list(csv.DictReader(source, delimiter=";"))


def url(value):
    parsed = urlsplit(value)
    require(parsed.scheme == "https" and parsed.hostname, f"URL inválida: {value}")
    return value


def validate_isbn(isbn):
    require(re.fullmatch(r"\d{13}", isbn) and sum(
        int(digit) * (1 if index % 2 == 0 else 3)
        for index, digit in enumerate(isbn)
    ) % 10 == 0, f"ISBN inválido: {isbn}")


def edition_name(row):
    name = f"{row['numero_edicao']}ª edição" if row["numero_edicao"] else "Edição"
    return f"{name} · vol. {row['volume']}" if row["volume"] else name


def reference(row, edition):
    page = row["pagina_inicial"]
    require(not page or (page.isdecimal() and int(page) > 0 and row["precisao"] == "Página inicial"),
            f"Página sem precisão confirmada: {row}")
    source = url(row["fonte_direta"])
    action = "Ver sumário" if "sumario" in source.lower() else edition["sourceLabel"]
    return dict(
        where=" · ".join(filter(None, [row["localizacao"], f"p. {page}" if page else ""])),
        detail=row["evidencia"], precision=row["precisao"], url=source, action=action,
    )


def main():
    books, topics, editions = {}, {}, {}
    for row in rows("edicoes"):
        area, _ = AREAS[row["area"]]
        book_id, isbn = row["obra_id"], row["isbn13"]
        validate_isbn(isbn)
        require(isbn not in editions, f"ISBN duplicado: {isbn}")
        edition = dict(
            id=isbn, isbn=isbn, year=int(row["ano"]) if row["ano"] else None,
            name=edition_name(row), format=row["formato"],
            source=url(row["fonte_bibliografica"]), sourceLabel=ACCESS[row["acesso_publico"]],
            access=row["acesso_publico"], bookAccess=row["acesso_ao_livro"],
        )
        editions[isbn] = (book_id, edition)
        book = books.setdefault(book_id, dict(
            id=book_id, area=area, title=row["titulo"], author=row["autoria"],
            label=row["funcao_editorial"], editions=[],
        ))
        require((book["area"], book["title"], book["author"]) == (area, row["titulo"], row["autoria"]),
                f"Metadados conflitantes: {book_id}")
        book["editions"].append(edition)

    for row in rows("buscas"):
        area, _ = AREAS[row["area"]]
        key = row["tema_id"]
        require(key not in topics, f"Tema duplicado: {key}")
        aliases = [term.strip() for term in row["sinonimos"].split(";") if term.strip()]
        require(aliases, f"Tema sem sinônimos: {key}")
        topics[key] = dict(
            id=key, area=area, title=aliases[0].capitalize(), readingTitle=aliases[0],
            aliases=list(dict.fromkeys([row["busca"], *aliases])),
            central=row["prioridade"] == "Central", refs={}, sources=[],
        )

    counts = defaultdict(set)
    reference_count = 0
    for row in rows("indicacoes"):
        key, isbn = row["tema_id"], row["isbn13"]
        topic = topics[key]
        book_id, edition = editions[isbn]
        require(book_id == row["obra_id"] and books[book_id]["area"] == topic["area"],
                f"Indicação fora da obra ou área correta: {key}/{isbn}")
        require(isbn not in topic["refs"], f"Indicação duplicada: {key}/{isbn}")
        require(row["status_revisao"] == "Referência conferida" and row["localizacao"] and row["precisao"],
                f"Indicação sem evidência aprovada: {key}/{isbn}")
        topic["refs"][isbn] = reference(row, edition)
        counts[key].add(book_id)
        reference_count += 1

    for row in rows("buscas"):
        key = row["tema_id"]
        count = len(counts[key])
        require(count == int(row["obras_com_referencia"]) and count >= (2 if topics[key]["central"] else 1),
                f"Cobertura incompatível com a ficha: {key}: {count}")
    for label, (slug, _) in AREAS.items():
        selected = [topic for topic in topics.values() if topic["area"] == slug]
        require(len(selected) == 8 and sum(topic["central"] for topic in selected) == 4,
                f"Cobertura inesperada: {label}")
    require((len(books), len(editions), len(topics), reference_count) == (31, 32, 48, 110),
            "Totais do lote editorial divergentes")

    OUTPUT.mkdir(exist_ok=True)
    for label, (slug, title) in AREAS.items():
        data = dict(
            course=dict(id=slug, title=title, aliases=[label]),
            books=[book for book in books.values() if book["area"] == slug],
            topics=[topic for topic in topics.values() if topic["area"] == slug],
        )
        (OUTPUT / f"{slug}.mjs").write_text(
            "// Gerado por scripts/gerar_acervo.py a partir dos CSVs editoriais.\n"
            "export default " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
            encoding="utf-8",
        )
    print(f"{len(books)} obras, {len(editions)} edições, {len(topics)} temas, {reference_count} indicações")
    print(dict(Counter(topic["area"] for topic in topics.values())))


if __name__ == "__main__":
    main()
