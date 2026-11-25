import assert from "node:assert/strict";
import { books, catalog, topics, findEntries, normalize } from "../dist/data.mjs";
import { expansionIIIArticles, novemberArticles, novemberTopicId } from "../dist/catalogo/ampliado/curadoria-novembro.mjs";
import pilot from "../dist/catalogo/piloto-artigos.mjs";

const problems = [];
const pending = [];
const seen = new Set();
const booksById = new Map(books.map(book => [book.id, book]));
const topicsById = new Map(topics.map(topic => [topic.id, topic]));
const areaById = new Map(catalog.map(area => [area.course.id, area]));
const isUrl = url => typeof url === "string" && /^https?:\/\/[^/\s]+/i.test(url);
const addProblem = (id, reason) => problems.push({ id, reason });
const addPending = (id, reason) => pending.push({ id, reason });
const unique = arr => new Set(arr).size === arr.length;
const editionIndex = new Map();
const summary = {
  areas: catalog.length, temas: topics.length, obras: books.length,
  temas_sem_livro_indicado: 0, temas_com_revisao_pendente: 0,
  temas_sem_fontes_normativas: 0, temas_sem_relacionados: 0,
  temas_sem_termos_alternativos: 0,
  indicacoes_de_obra: 0, indicacoes_com_localizacao: 0,
  edicoes: 0, fontes_de_tema: 0, leituras_gratuitas: 0,
  artigos_em_lotes: 0, artigos_sem_doi: 0,
};
const byArea = Object.fromEntries(catalog.map(item => [item.course.id, {
  area: item.course.title, temas: 0, sem_livro: 0,
  em_revisao: 0, sem_relacionados: 0, indicacoes: 0,
}]));

for (const book of books) {
  if (!book.id || !book.title || !book.author) addProblem(book.id ?? "(sem id)", "Ficha de obra incompleta");
  if (seen.has("obra/" + book.id)) addProblem(book.id, "ID de obra duplicado");
  seen.add("obra/" + book.id);
  if (!Array.isArray(book.editions) || !book.editions.length) {
    addPending(book.id, "Obra sem edição registrada");
    continue;
  }
  const ids = book.editions.map(edition => edition.id);
  if (!unique(ids)) addProblem(book.id, "IDs de edição duplicados na mesma obra");
  for (const edition of book.editions) {
    summary.edicoes++;
    if (!edition.id) addProblem(book.id, "Edição sem ID");
    const linked = editionIndex.get(edition.id) ?? [];
    linked.push(book.id);
    editionIndex.set(edition.id, linked);
    if (edition.source && !isUrl(edition.source)) addProblem(book.id, "URL de edição malformada: " + edition.id);
  }
}

const normalizedTitle = new Map();
for (const topic of topics) {
  if (!topic.id || !topic.title) addProblem(topic.id ?? "(sem id)", "Tema sem ID ou título");
  if (seen.has("tema/" + topic.id)) addProblem(topic.id, "ID de tema duplicado");
  seen.add("tema/" + topic.id);
  if (!areaById.has(topic.area)) {
    addProblem(topic.id, "Área inexistente: " + topic.area);
    continue;
  }
  const area = byArea[topic.area];
  area.temas++;
  const key = topic.area + "/" + normalize(topic.title);
  const titles = normalizedTitle.get(key) ?? [];
  titles.push(topic.id);
  normalizedTitle.set(key, titles);
  if (!Array.isArray(topic.aliases) || !topic.aliases.length) addProblem(topic.id, "Sem termos de busca");
  else if (topic.aliases.every(alias => normalize(alias) === normalize(topic.title))) {
    summary.temas_sem_termos_alternativos++;
  }
  if (topic.editorialPending) {
    summary.temas_com_revisao_pendente++;
    area.em_revisao++;
  }
  if (!(topic.sources?.length)) summary.temas_sem_fontes_normativas++;
  else {
    summary.fontes_de_tema += topic.sources.length;
    for (const source of topic.sources) {
      if (!isUrl(source.url)) addProblem(topic.id, "URL de fonte não HTTP(S): " + String(source.url));
      if (source.unavailable) addPending(topic.id, "Fonte marcada indisponível: " + source.url);
    }
  }
  if (!(topic.relatedTopics?.length)) {
    summary.temas_sem_relacionados++;
    area.sem_relacionados++;
  } else for (const id of topic.relatedTopics) {
    if (!topicsById.has(id)) addProblem(topic.id, "Tema relacionado inexistente: " + id);
    if (id === topic.id) addPending(topic.id, "Tema relacionado a si próprio");
  }
  const recIds = Object.keys(topic.recommendations ?? {});
  summary.indicacoes_de_obra += recIds.length;
  area.indicacoes += recIds.length;
  if (!recIds.length) {
    summary.temas_sem_livro_indicado++;
    area.sem_livro++;
  }
  for (const bookId of recIds) {
    const book = booksById.get(bookId);
    if (!book) {
      addProblem(topic.id, "Indicação com obra inexistente: " + bookId);
      continue;
    }
    const rec = topic.recommendations[bookId];
    if (!rec?.reason && !rec?.coverage) addPending(topic.id, "Indicação sem justificativa/cobertura: " + bookId);
    if (rec.coverage?.url && !isUrl(rec.coverage.url)) addProblem(topic.id, "URL de cobertura inválida: " + bookId);
    for (const [editionId, ref] of Object.entries(rec.coverageByEdition ?? {})) {
      if (!book.editions.some(edition => edition.id === editionId)) addProblem(topic.id, "Cobertura aponta para edição incorreta: " + bookId + "/" + editionId);
      if (ref?.url && !isUrl(ref.url)) addProblem(topic.id, "URL de edição inválida: " + editionId);
    }
  }
  for (const [editionId, ref] of Object.entries(topic.refs ?? {})) {
    if (!editionIndex.has(editionId)) addProblem(topic.id, "Referência com edição inexistente: " + editionId);
    if (ref?.url && !isUrl(ref.url)) addProblem(topic.id, "URL de referência inválida: " + editionId);
    if (ref?.where) summary.indicacoes_com_localizacao++;
  }
  summary.leituras_gratuitas += topic.freeReadings?.length ?? 0;
  const hits = findEntries(topic.title);
  if (!hits.some(hit => hit.route === "livros/" + topic.id)) {
    addPending(topic.id, "Busca pelo título não retorna a ficha: " + topic.title);
  }
}
for (const [key, ids] of normalizedTitle) {
  if (ids.length > 1) addPending(key, "Títulos idênticos na mesma área: " + ids.join(", "));
}
const articles = [...novemberArticles, ...expansionIIIArticles];
summary.artigos_em_lotes = articles.length + pilot.artigos.length;
summary.artigos_sem_doi = articles.filter(article => !article.doi).length
  + pilot.artigos.filter(article => !article.doi_informado).length;
for (const article of articles) {
  if (!topicsById.has(novemberTopicId(article.tema_id))) {
    addProblem(article.id, "Artigo aponta para tema ausente: " + article.tema_id);
  }
  if (!Array.isArray(article.autores) || !article.autores.length || !article.periodico || !article.titulo) {
    addProblem(article.id, "Metadados bibliográficos do artigo incompletos");
  }
  const publication = article.url_publicacao ?? article.url;
  if (!isUrl(publication)) addProblem(article.id, "Link de periódico malformado");
  if (article.url_texto_integral && !isUrl(article.url_texto_integral)) addProblem(article.id, "Link de acesso malformado");
  if (!article.doi) addPending(article.id, "DOI não identificado");
  if (article.revisao_por_pares?.status?.includes("a_conferir")) {
    addPending(article.id, "Política específica de revisão por pares a conferir");
  }
}
const report = {
  meta: {
    base: "main + consolidação bibliográfica",
    gerado_por: "scripts/auditar-catalogo.mjs",
    escopo: "Estruturas e vínculos carregados pela aplicação. Não comprova vigência jurídica nem disponibilidade dos links externos.",
  },
  resumo: summary,
  cobertura_por_area: Object.entries(byArea).map(([id, stats]) => ({ id, ...stats }))
    .sort((a, b) => b.sem_livro - a.sem_livro || a.id.localeCompare(b.id)),
  erros_estruturais: problems,
  pendencias_amostra: pending.slice(0, 80),
  numero_pendencias_identificadas: pending.length,
};
console.log(JSON.stringify(report, null, 2));
if (process.argv.includes("--strict")) {
  assert.equal(summary.temas, 308, "Contagem de temas inesperada");
  assert.equal(summary.areas, 19, "Contagem de áreas inesperada");
  assert.deepEqual(problems, [], "Foram encontrados problemas estruturais no catálogo");
}
