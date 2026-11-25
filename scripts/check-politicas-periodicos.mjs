import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { expansionIIIArticles, novemberTopicId } from "../dist/catalogo/ampliado/curadoria-novembro.mjs";
import policies from "../dist/catalogo/ampliado/novembro/politicas-periodicos.mjs";
import { researchSection } from "../dist/ui/pesquisas.mjs";

const source = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-politicas-periodicos-2026-11-24.json", import.meta.url)));
assert.deepEqual(policies, source, "Módulo gerado difere da curadoria");
const byJournal = new Map(policies.periodicos.map(row => [row.periodico, row]));
assert.equal(byJournal.size, policies.periodicos.length, "Periódico repetido");
assert.ok(byJournal.size >= 10, "Poucas políticas documentadas");
assert.equal(expansionIIIArticles.length, 19);
for (const article of expansionIIIArticles) {
  const policy = byJournal.get(article.periodico);
  assert.ok(policy, "Política ausente para " + article.periodico);
  assert.match(policy.url_politica, /^https:\/\//);
  assert.equal(policy.status, "politica_publica_do_periodico_localizada");
  const html = researchSection(novemberTopicId(article.tema_id), (url, label) => url + " " + label, () => "");
  assert.ok(html.includes(policy.url_politica), article.id + ": política não disponível na interface");
  assert.ok(html.includes("Política de revisão por pares"), article.id);
}
console.log("Expansão III: políticas editoriais de 14 periódicos associadas a 19 artigos.");
