"""Gera os módulos estáticos dos lotes editoriais de novembro."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/catalogo"
DEST = ROOT / "dist/catalogo/ampliado/novembro"
HEADER = "// GERADO por scripts/gerar_curadoria_novembro.py — não edite à mão\n"


def write(name, value):
    (DEST / f"{name}.mjs").write_text(
        HEADER + "export default " + json.dumps(value, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )


def expansion_iii():
    batch = json.loads((SOURCE / "trelia-expansao-editorial-iii-2026-11-24-revisado.json").read_text(encoding="utf-8-sig"))
    sources = {item["id"]: item for item in batch["fontes_oficiais"]}
    themes = []
    for item in batch["temas"]:
        themes.append({
            **item,
            "fontes": [
                {**sources[link["fonte_id"]], "onde_comecar": link["onde_comecar"]}
                for link in item["fontes"]
            ],
        })
    write("expansao-iii", {
        "temas": themes,
        "artigos": batch["artigos"],
        "obras": batch["obras_edicoes_confirmadas_nesta_rodada"],
        "indicacoes": batch["indicacoes_de_livro_confirmadas_nesta_rodada"],
    })


if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    for name, filename in (
        ("expansao", "trelia-expansao-temas-2026-11-22.json"),
        ("equilibrada", "trelia-curadoria-equilibrada-2026-11-24.json"),
    ):
        batch = json.loads((SOURCE / filename).read_text(encoding="utf-8-sig"))
        fields = ("temas", "artigos", "fontes_oficiais", "obras_novas", "indicacoes_de_livro")
        write(name, {key: batch[key] for key in fields if key in batch})
    expansion_iii()
