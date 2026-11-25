import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { books, topics } from "../dist/data.mjs";
import { readingEvidence } from "../dist/catalogo/leituras.mjs";
import checked from "../dist/catalogo/ampliado/novembro/verificacao-complementar.mjs";
const raw = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-verificacao-complementar-2026-11-24.json", import.meta.url)));
assert.deepEqual(checked, raw);
assert.equal(checked.fontes_oficiais.length, 33);
assert.equal(new Set(checked.fontes_oficiais.map(f => f.id)).size, 33);
assert.ok(checked.fontes_oficiais.every(f => f.status_conferencia_normativa.includes("pendente")), "Não remover pendências de conteúdo por URL");
const falencia = checked.fontes_oficiais.find(f => f.id === "FALENCIA");
assert.ok(falencia?.url_conferida.includes("l11101compilado.htm"));
assert.equal(checked.indicacoes_bibliograficas.length, 4);
assert.equal(checked.livros_novos.length, 2);
assert.equal(topics.length, 308);
for (const indication of checked.indicacoes_bibliograficas) {
  const book = books.find(b => b.id === indication.obra_id);
  const edition = book?.editions.find(e => e.id === indication.edicao_id && e.isbn === indication.isbn);
  const topic = topics.find(t => t.id === indication.tema_id);
  assert.ok(book && edition && topic, indication.tema_id);
  const { ref } = readingEvidence(topic,book,edition);
  assert.equal(ref?.where, indication.localizacao.pagina
    ? "Página " + indication.localizacao.pagina : indication.localizacao.secao);
  assert.equal(ref?.url, indication.evidencia.url);
}
const rec = topics.find(t => t.id === "recuperacao-extrajudicial-empresa");
assert.ok(rec.sources.some(s => s.url === falencia.url_conferida), "URL compilada oficial não usada no tema");
assert.equal(checked.observacoes_vigencia.length, 5);
console.log("Verificação complementar: 33 fontes verificadas para acesso, 4 indicações por edição e 5 alertas de vigência.");
