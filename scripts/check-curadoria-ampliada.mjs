import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { bibliography, books, catalog, findEntries, topics } from "../dist/data.mjs";
import { orderedReadings, readingEvidence } from "../dist/catalogo/leituras.mjs";

const lot = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-curadoria-ampliada-2026-11-20.json", import.meta.url)));
const topicById = new Map(topics.map(topic => [topic.id, topic]));
const bookById = new Map(books.map(book => [book.id, book]));
const sourceById = new Map(lot.fontes.map(source => [source.id, source]));
assert.equal(topicById.size, topics.length);
assert.equal(bookById.size, books.length);
assert.equal(topics.length, lot.totais.temas_no_acervo_projetado);
assert.equal(topics.filter(topic => topic.answer).length, lot.totais.temas_com_explicacao_no_acervo_projetado);
assert.equal(catalog.length, lot.base.areas_com_curadoria + lot.areas.length);

for (const { consulta, rota, regra } of [...lot.testes_busca, ...lot.testes_busca_isbn]) {
  const routes = (await bibliography.search(consulta)).map(item => item.route);
  if (regra === "vazio") assert.deepEqual(routes, [], consulta);
  else if (regra === "inclui") assert.ok(routes.includes(rota), consulta);
  else assert.equal(routes[0], rota, consulta);
}

for (const item of lot.temas) {
  for (const query of [...item.consultas, item.titulo]) {
    assert.ok(findEntries(query).some(hit => hit.route === "livros/" + item.id), query);
  }
}
for (const { tema_id, obra_ids } of lot.ordem_das_leituras) {
  assert.deepEqual(orderedReadings(topicById.get(tema_id), books).map(book => book.id), obra_ids, tema_id);
}
for (const item of lot.testes_referencias) {
  const book = bookById.get(item.obra_id);
  const edition = book.editions.find(edition => edition.id === item.edicao_id);
  const { ref, source } = readingEvidence(topicById.get(item.tema_id), book, edition);
  assert.equal(ref?.where ?? "Localização a conferir", item.rotulo, item.tema_id);
  assert.equal(ref ? "localizacao" : "cobertura", item.tipo_fonte, item.tema_id);
  if (item.fonte_id) assert.equal(source.url, sourceById.get(item.fonte_id).url, item.tema_id);
}
console.log("Curadoria: consultas, ISBNs, ordem das leituras e evidências por edição passaram.");
