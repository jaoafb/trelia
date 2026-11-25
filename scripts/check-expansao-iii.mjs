import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { books, topics, findEntries } from "../dist/data.mjs";
import { readingEvidence } from "../dist/catalogo/leituras.mjs";
import { novemberTopicId } from "../dist/catalogo/ampliado/curadoria-novembro.mjs";
import { researchSection } from "../dist/ui/pesquisas.mjs";

const lot = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-expansao-editorial-iii-2026-11-24-revisado.json", import.meta.url)));
const byId = new Map(topics.map(topic => [topic.id, topic]));
const updatedReviews = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-revisao-juridica-2026-11-24.json", import.meta.url)));
const reviewsById = new Map(updatedReviews.registros.map(item => [item.tema_id, item]));
assert.equal(topics.length, 308);
assert.equal(byId.size, topics.length);
for (const theme of lot.temas) {
  const id = novemberTopicId(theme.id);
  const topic = byId.get(id);
  assert.equal(topic?.area, theme.area_id);
  assert.ok(findEntries(theme.pergunta).some(result => result.route === "livros/" + id), theme.pergunta);
  if (id === theme.id) {
    const review = reviewsById.get(id);
    assert.equal(topic.editorialPending, review?.status !== "revisao_concluida_no_escopo", id);
    assert.equal(topic.answer, review?.historico.at(-1)?.resposta_revisada ?? theme.resposta, id);
  }
}

for (const item of lot.indicacoes_de_livro_confirmadas_nesta_rodada) {
  const owners = books.filter(book => book.editions.some(edition =>
    edition.isbn === item.isbn_edicao || edition.isbns?.includes(item.isbn_edicao)));
  assert.equal(owners.length, 1, item.isbn_edicao);
  const book = owners[0];
  const edition = book.editions.find(edition => edition.isbn === item.isbn_edicao);
  const topic = byId.get(novemberTopicId(item.tema_id));
  const { ref } = readingEvidence(topic, book, edition);
  assert.equal(ref?.url, item.evidencia.url, item.tema_id);
  const { pagina_inicial, secao } = item.localizacao;
  assert.equal(ref?.where, pagina_inicial ? "Página " + pagina_inicial : secao, item.tema_id);
}
const consumer = books.find(book => book.id === "tartuce-neves-consumidor");
const previous = consumer.editions.find(edition => edition.year === 2025);
assert.equal(readingEvidence(byId.get("praticas-abusivas-art39"), consumer, previous).ref, undefined);
for (const article of lot.artigos) {
  const markup = researchSection(novemberTopicId(article.tema_id), (url, label) => url + " " + label, () => "");
  assert.ok(markup.includes(article.doi ?? article.url_publicacao), article.id);
  assert.match(markup, /<details class="research-panel more-courses">/);
  assert.doesNotMatch(markup, /\/abstract\/[^\s]* Ler gratuitamente/);
}
console.log("Expansão III: 76 consultas, 26 indicações por ISBN e 19 artigos passaram.");
