import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { bibliography, books, catalog, findEntries, topics } from "../dist/data.mjs";
import { novemberTopicId } from "../dist/catalogo/ampliado/curadoria-novembro.mjs";
import { readingEvidence } from "../dist/catalogo/leituras.mjs";

const read = name => JSON.parse(readFileSync(new URL("../data/catalogo/" + name, import.meta.url)));
const expansion = read("trelia-expansao-temas-2026-11-22.json");
const balanced = read("trelia-curadoria-equilibrada-2026-11-24.json");
const byId = new Map(topics.map(topic => [topic.id, topic]));
assert.ok(topics.length >= 236);
assert.equal(byId.size, topics.length);
assert.equal(new Set(books.map(book => book.id)).size, books.length);
assert.equal(catalog.length, 19);

for (const item of [...expansion.temas, ...balanced.temas]) {
  const id = novemberTopicId(item.id);
  const topic = byId.get(id);
  assert.equal(topic?.area, item.area_id);
  assert.ok(topic.answer && topic.studyOrientation, id);
  assert.ok(findEntries(item.pergunta).some(hit => hit.route === "livros/" + id), item.pergunta);
  if (item.status_editorial === "texto_preparado_com_base_normativa_verificada" && id === item.id) {
    assert.deepEqual(topic.recommendations, {});
  }
}
for (const item of expansion.verificacao_busca.consultas) {
  assert.equal((await bibliography.search(item.consulta))[0]?.route, item.rota, item.consulta);
}
for (const item of expansion.indicacoes_de_livro) {
  const book = books.find(book => book.id === item.obra_id);
  const edition = book.editions.find(edition => edition.id === item.edicao_id);
  const { ref, source } = readingEvidence(byId.get(item.tema_id), book, edition);
  assert.equal(ref?.where, item.localizacao.pagina ? "Página " + item.localizacao.pagina : item.localizacao.secao);
  assert.equal(source.url, item.evidencia.url);
}
const urban = books.find(book => book.id === "rvbi-558697ab151871803e2d");
const legacy = urban.editions.find(edition => edition.year === 2006);
assert.equal(readingEvidence(byId.get("loteamento-e-desmembramento"), urban, legacy).ref, undefined);
assert.equal(books.filter(book => book.editions.some(edition =>
  edition.isbn === "9786551771545" || edition.isbns?.includes("9786551771545"))).length, 1);
assert.equal(new Set([...expansion.artigos, ...balanced.artigos].map(article => article.doi.toLowerCase())).size, 12);
assert.ok([...expansion.artigos, ...balanced.artigos].every(article => byId.has(novemberTopicId(article.tema_id))));
console.log("Novembro: temas, perguntas, ISBNs e evidências por edição passaram.");
