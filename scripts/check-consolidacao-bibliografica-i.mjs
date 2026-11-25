import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { books, topics, findEntries } from "../dist/data.mjs";
import { readingEvidence } from "../dist/catalogo/leituras.mjs";
import generated from "../dist/catalogo/ampliado/novembro/consolidacao-i.mjs";

const lot = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-consolidacao-bibliografica-01-2026-11-24.json", import.meta.url)));
assert.equal(lot.indicacoes_de_livro.length, 2);
assert.deepEqual(generated.indicacoes, lot.indicacoes_de_livro, "Módulo gerado divergente da fonte de curadoria");
assert.equal(topics.length, 308, "A consolidação não cria temas novos");

const book = books.find(item => item.id === "barbosa-introducao-pi");
assert.ok(book, "Obra já existente na Trelia");
const edition = book.editions.find(item => item.id === "barbosa-intro-2-pdf");
assert.ok(edition, "Edição digital já existente");
for (const item of lot.indicacoes_de_livro) {
  assert.equal(item.obra_id, book.id);
  assert.equal(item.edicao_id, edition.id);
  assert.equal(item.evidencia.url, lot.obra_existente.fonte);
  const topic = topics.find(entry => entry.id === item.tema_id);
  assert.ok(topic, item.tema_id);
  const { ref } = readingEvidence(topic, book, edition);
  assert.equal(ref?.where, "Página " + item.localizacao.pagina, item.tema_id);
  assert.equal(ref?.url, item.evidencia.url, item.tema_id);
  assert.equal(topic.recommendations[book.id]?.reason, item.por_que_ler);
  assert.ok(findEntries(topic.title).some(hit => hit.route === "livros/" + topic.id), "A pesquisa pelo título permanece funcional: " + topic.title);
}
assert.ok(!lot.indicacoes_de_livro.some(item => item.tema_id === "protecao-software-direito-autoral"));
console.log("Consolidação I: duas referências da 2ª edição do Barbosa e pendência de software preservadas.");
