import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { findEntries, topics, normalize } from "../dist/data.mjs";
import { novemberTopicId } from "../dist/catalogo/ampliado/curadoria-novembro.mjs";
import searchTerms from "../dist/catalogo/ampliado/novembro/termos-busca.mjs";

const source = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-termos-busca-consolidacao-2026-11-24.json", import.meta.url)));
const expanded = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-expansao-editorial-iii-2026-11-24-revisado.json", import.meta.url)));
assert.deepEqual(searchTerms, source, "Módulo gerado difere da fonte");
assert.equal(searchTerms.entradas.length, expanded.temas.length);
assert.equal(topics.length, 308);
const ids = new Set(expanded.temas.map(t => t.id));
const aliases = new Map();
const byId = new Map(topics.map(t => [t.id, t]));
for (const { tema_id, termos_busca } of searchTerms.entradas) {
  assert.ok(ids.has(tema_id), "Tema não pertence à Expansão III: " + tema_id);
  const id = novemberTopicId(tema_id);
  const topic = byId.get(id);
  assert.ok(topic);
  assert.equal(termos_busca.length, 2, tema_id);
  for (const term of termos_busca) {
    const norm = normalize(term);
    const duplicates = aliases.get(norm) ?? [];
    duplicates.push(tema_id);
    aliases.set(norm, duplicates);
    assert.ok(topic.aliases.some(alias => normalize(alias) === norm), "Termo não incorporado: " + term);
    assert.ok(findEntries(term).some(result => result.route === "livros/" + id), "Busca não encontra tema: " + term);
  }
}
for (const [term, ids] of aliases) assert.equal(ids.length, 1, "Termo duplicado: " + term);
console.log("Busca: 152 expressões adicionais conferidas para 76 temas nas 19 áreas.");
