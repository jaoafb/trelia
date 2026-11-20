"""Gera os módulos estáticos da curadoria, organizados por disciplina."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data/catalogo/trelia-curadoria-ampliada-2026-11-20.json"
OUTPUT = ROOT / "dist/catalogo/ampliado/lote"
HEADER = "// GERADO por scripts/gerar_curadoria_ampliada.py — não edite à mão\n"


def write_module(name, body):
    (OUTPUT / f"{name}.mjs").write_text(HEADER + body + "\n", encoding="utf-8", newline="\n")


def export(name, data):
    write_module(name, "export default " + json.dumps(data, ensure_ascii=False, indent=2) + ";")


def generate():
    lote = json.loads(INPUT.read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    groups = {}
    for theme in lote["temas"]:
        groups.setdefault(theme["area_id"], []).append(theme)
    for area, themes in sorted(groups.items()):
        ids = {theme["id"] for theme in themes}
        export(area, {
            "temas": themes,
            **{key: [row for row in lote[key] if row["tema_id"] in ids]
               for key in ("indicacoes", "ordem_das_leituras")},
        })

    export("bibliografia", {key: lote[key] for key in ("areas", "obras", "edicoes", "fontes")})
    export("vinculos", {key: lote[key] for key in ("temas_relacionados", "ajustes_consultas_existentes")})
    imports = [f'import area{i} from "./{area}.mjs";' for i, area in enumerate(sorted(groups))]
    modules = ", ".join(f"area{i}" for i in range(len(groups)))
    write_module("index", "\n".join(imports) + f"\nexport default [{modules}];")


if __name__ == "__main__":
    generate()
