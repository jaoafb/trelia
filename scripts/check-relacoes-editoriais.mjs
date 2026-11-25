import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { topics } from "../dist/data.mjs";
import { novemberTopicId } from "../dist/catalogo/ampliado/curadoria-novembro.mjs";
import generated from "../dist/catalogo/ampliado/novembro/relacoes-editoriais.mjs";
const source = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-relacoes-editoriais-2026-11-24.json", import.meta.url)));
assert.deepEqual(generated, source);
assert.equal(topics.length, 308);
assert.equal(generated.pares.length, 31);
const byId = new Map(topics.map(item => [item.id, item]));
const seen = new Set();
for (const pair of generated.pares) {
  const a = novemberTopicId(pair.tema_a);
  const b = novemberTopicId(pair.tema_b);
  assert.notEqual(a, b);
  const key = [a, b].sort().join("/");
  assert.ok(!seen.has(key), "Relação duplicada: " + key);
  seen.add(key);
  assert.ok(pair.justificativa.length > 30);
  assert.ok(byId.get(a)?.relatedTopics?.includes(b), "Falta vínculo: " + key);
  assert.ok(byId.get(b)?.relatedTopics?.includes(a), "Falta reciprocidade: " + key);
}
console.log("Relações editoriais: 31 pares bidirecionais validados.");
