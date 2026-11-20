"""Generate searchable RVBI bibliographic records without inferring reading recommendations."""

import json
from pathlib import Path
from urllib.parse import urlencode

ROOT = Path(__file__).resolve().parents[1]
BATCH = ROOT / "data/catalogo/piloto-rvbi/lote-piloto.json"
OUT = ROOT / "dist/catalogo/rvbi"
ENDPOINT = "https://edge-rvbi.folio.ebsco.com/oai/eyJzIjoiQm13STh5dHlENCIsInQiOiJmczAwMDAxMjAyIiwidSI6IkVCU0NPRWRnZSJ9"
AREAS = {
    "Constitucional": "constitucional", "Civil": "civil", "Processo Civil": "processo-civil",
    "Administrativo": "administrativo", "Trabalho": "trabalho", "Tributário": "tributario",
}


def record(candidate):
    record_id = candidate["id_rvbi"]
    source = ENDPOINT + "?" + urlencode(dict(verb="GetRecord", metadataPrefix="marc21", identifier=record_id))
    isbns = candidate["isbns"]
    metadata = candidate.get("brasilapi", {}).get("metadados", {})
    identifier = "rvbi-" + record_id.rsplit("/", 1)[-1]
    return dict(
        id=identifier, area=AREAS[candidate["area_piloto"]], imported=True,
        title=": ".join(filter(None, [candidate["titulo"], candidate["subtitulo"]])),
        author="; ".join(candidate["autores"]) or "Autoria não informada",
        label="Registro bibliográfico", provenance="Rede Virtual de Bibliotecas (RVBI)",
        editions=[dict(
            id=identifier, name=" · ".join(filter(None, [candidate["edicao"] or "Edição do registro", candidate["volume"]])),
            year=candidate["ano"], isbn=isbns[0] if len(isbns) == 1 else None, isbns=isbns,
            format=metadata.get("format") if len(isbns) == 1 else None,
            source=source, sourceLabel="Consultar registro MARC da RVBI",
        )],
    )


def main():
    candidates = json.loads(BATCH.read_text(encoding="utf-8"))["candidatos"]
    records = [record(candidate) for candidate in candidates if candidate["titulo"] and candidate["autores"]]
    OUT.mkdir(exist_ok=True)
    imports, names = [], []
    for index, area in enumerate(AREAS.values()):
        selected = [item for item in records if item["area"] == area]
        (OUT / f"{area}.mjs").write_text(
            "// Gerado por scripts/gerar_fichas_rvbi.py.\nexport default "
            + json.dumps(selected, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8",
        )
        name = f"area{index}"
        imports.append(f'import {name} from "./{area}.mjs";')
        names.append(f"...{name}")
    (OUT / "index.mjs").write_text("\n".join(imports) + "\nexport default [" + ", ".join(names) + "];\n", encoding="utf-8")
    print(f"{len(records)} fichas RVBI geradas")


if __name__ == "__main__":
    main()
