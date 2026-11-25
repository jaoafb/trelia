import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const input = new URL("../data/catalogo/trelia-leituras-gratuitas-2026-11-20.json", import.meta.url);
const output = new URL("../dist/catalogo/gratuitas/", import.meta.url);
const lot = JSON.parse(readFileSync(input, "utf8"));
const sources = new Map(lot.fontes.map(source => [source.id, source]));
const materials = new Map(lot.materiais.map(material => [material.id, material]));
const topics = new Set([...lot.temas_existentes, ...lot.propostas_de_tema].map(topic => topic.id));
const pairs = new Set();

for (const row of lot.indicacoes) {
  const key = row.tema_id + "/" + row.material_id;
  const source = sources.get(row.fonte_id);
  if (pairs.has(key) || !topics.has(row.tema_id) || !materials.has(row.material_id)
      || source?.material_id !== row.material_id
      || (row.onde_comecar?.url_especifica && !/^https:\/\//.test(row.onde_comecar.url_especifica))) throw new Error("Indicação inválida: " + key);
  pairs.add(key);
}
for (const material of materials.values()) {
  if (sources.get(material.fonte_id)?.material_id !== material.id
      || material.login_necessario !== false
      || !["texto_integral_aberto", "capitulo_integral_aberto", "pagina_institucional_aberta"].includes(material.tipo_acesso)
      || sources.get(material.fonte_id).url_leitura_conferida !== material.link_leitura
      || ![material.link_leitura, material.link_origem].every(url => /^https:\/\//.test(url))) {
    throw new Error("Acesso ou procedência inválida: " + material.id);
  }
}

mkdirSync(output, { recursive: true });
const write = (file, value) => writeFileSync(new URL(file + ".mjs", output),
  "// GERADO por scripts/gerar_leituras_gratuitas.mjs — não edite à mão\nexport default "
    + JSON.stringify(value) + ";\n");
write("materiais", lot.materiais.map(material => ({
  ...material,
  verificacao: sources.get(material.fonte_id),
})));
write("indicacoes", lot.indicacoes.map(({ tema_id, material_id, papel_editorial, por_que_ler, onde_comecar }) => ({
  tema_id, material_id, papel_editorial, por_que_ler, onde_comecar,
})));
write("temas", {
  variants: lot.temas_existentes.filter(topic => topic.novas_variantes.length)
    .map(({ id, novas_variantes }) => [id, novas_variantes]),
  proposals: lot.propostas_de_tema,
});
