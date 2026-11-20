import data from "./lote/bibliografia.mjs";
import modules from "./lote/index.mjs";
import links from "./lote/vinculos.mjs";
import { normalize } from "../busca.mjs";

const unique = values => [...new Set(values)];
const index = (items, key = "id") => new Map(items.map(item => [item[key], item]));
const group = (items, key) => {
  const result = new Map();
  for (const item of items) {
    const list = result.get(item[key]) ?? [];
    list.push(item);
    result.set(item[key], list);
  }
  return result;
};
const sources = index(data.fontes);
const additions = modules.flatMap(area => area.temas);
const indications = group(modules.flatMap(area => area.indicacoes), "tema_id");
const orders = index(modules.flatMap(area => area.ordem_das_leituras), "tema_id");
const related = index(links.temas_relacionados, "tema_id");
const editionGroups = group(data.edicoes, "obra_id");
const positions = ["primeira_leitura", "aprofundamento", "contexto"];
const editionAccess = {
  sumario_aberto: "Sumário aberto",
  texto_aberto: "Texto integral aberto",
  ficha_publica: "Ficha pública",
  ficha_editora: "Ficha editorial",
};
const sourceType = {
  sumario: "Sumário", legislacao: "Legislação", editora: "Ficha editorial", ficha: "Ficha",
  texto_integral: "Texto integral", jurisprudencia: "Jurisprudência",
  fonte_oficial: "Fonte oficial", doutrina_e_jurisprudencia: "Doutrina e jurisprudência",
};

function source(id) {
  const item = sources.get(id);
  if (!/^https?:\/\//i.test(item?.url ?? "")) throw new Error("Fonte inválida: " + id);
  return item;
}

function newEdition(item) {
  const proof = source(item.metadados.fontes_ids[0]);
  const access = editionAccess[item.acesso];
  const name = [item.numero && item.numero + "ª edição", item.volume && "Vol. " + item.volume]
    .filter(Boolean).join(" · ") || (item.ano ? String(item.ano) : "Edição");
  return { id: item.id, isbn: item.isbn13 || undefined, name, year: item.ano,
    format: item.formato, access, source: proof.url, sourceLabel: "Abrir " + access.toLowerCase(),
    provenance: proof.instituicao, alternateUrl: proof.url_alternativa };
}

function editionIsbns(edition) {
  return (edition.isbns ?? [edition.isbn]).filter(Boolean).map(isbn => normalize(isbn).replaceAll(" ", ""));
}

function mergeEditions(previous, added) {
  const editions = [...previous];
  for (const edition of added) {
    const match = editions.find(item => item.id === edition.id
      || editionIsbns(item).some(isbn => editionIsbns(edition).includes(isbn)));
    if (!match) editions.push(edition);
  }
  return editions;
}

export function applyCuratedBooks(books, records) {
  const byId = index(books);
  for (const item of data.obras) {
    const previous = byId.get(item.id) ?? records.get(item.id);
    const destination = item.editorial.destino;
    if (item.operacao === "complementar" && !previous) throw new Error("Obra ausente: " + item.id);
    const book = {
      id: item.id, title: item.titulo, author: item.autoria, ...previous, area: item.area_id,
      label: item.editorial.finalidade, imported: destination === "catalogo",
      collectionId: item.integra_colecao_de,
      aliases: unique([...(previous?.aliases ?? []), item.autoria, item.titulo]),
      editions: previous?.editions ?? [],
    };
    byId.set(item.id, book);
  }
  for (const [id, editions] of editionGroups) {
    const book = byId.get(id);
    if (!book) throw new Error("Edição sem obra: " + id);
    byId.set(id, { ...book, editions: mergeEditions(book.editions, editions.map(newEdition)) });
  }
  return [...byId.values()];
}

function coverageReference(item) {
  const proof = source(item.fonte_id);
  const action = "Abrir " + sourceType[proof.tipo].toLowerCase();
  const provenance = { url: proof.url, action, alternateUrl: proof.url_alternativa };
  const location = item.localizacao;
  if (!location?.pagina_inicial && !location?.secao) return { ...provenance, detail: item.evidencia };
  const pages = [location.pagina_inicial, ...(location.paginas_adicionais ?? [])].filter(Boolean);
  const where = pages.length
    ? (pages.length === 1 ? "Página " : "Páginas ") + pages.join(" e ")
    : location.secao;
  return { ...provenance, where, section: pages.length ? location.secao : undefined,
    precision: pages.length ? "Paginação da obra" : "Localização confirmada", detail: item.evidencia };
}

export function applyCuratedTopics(topics, books) {
  const byId = index(topics);
  const bookIndex = index(books);
  for (const item of additions) {
    const previous = byId.get(item.id);
    if (item.operacao === "complementar" && !previous) throw new Error("Tema ausente: " + item.id);
    const explanation = item.explicacao;
    const reviewed = explanation?.status_revisao === "conferida_nas_fontes";
    const proofs = reviewed ? explanation.fontes.map(item => {
      const proof = source(item.fonte_id);
      return { title: proof.titulo, by: proof.instituicao, url: proof.url,
        type: sourceType[proof.tipo], note: item.recorte, alternateUrl: proof.url_alternativa };
    }) : [];
    byId.set(item.id, {
      id: item.id, area: item.area_id, title: item.titulo, readingTitle: item.titulo,
      ...previous,
      aliases: unique([...(previous?.aliases ?? []), item.titulo, ...item.consultas]),
      answer: reviewed ? explanation.texto : previous?.answer,
      summary: previous?.summary ?? (reviewed ? explanation.texto : undefined),
      sources: [...proofs, ...(previous?.sources ?? []).filter(old => !proofs.some(proof => proof.url === old.url))],
      recommendations: previous?.recommendations ?? {}, refs: previous?.refs ?? {},
    });
  }
  for (const [id, entries] of indications) {
    const topic = byId.get(id);
    const refs = { ...topic.refs };
    const recommendations = { ...topic.recommendations };
    for (const entry of entries) {
      if (entry.revisao !== "cobertura_conferida") continue;
      const book = bookIndex.get(entry.obra_id);
      if (!book || book.imported) throw new Error("Indicação sem obra curada: " + entry.id);
      const coverageByEdition = {};
      for (const item of entry.cobertura_por_edicao) {
        if (!book.editions.some(edition => edition.id === item.edicao_id)) {
          throw new Error("Evidência com edição desconhecida: " + item.edicao_id);
        }
        const ref = coverageReference(item);
        coverageByEdition[item.edicao_id] = ref;
        if (ref.where) refs[item.edicao_id] ??= ref;
      }
      const previous = recommendations[book.id];
      const coverage = previous?.coverage ?? Object.values(coverageByEdition)[0];
      if (!coverage) throw new Error("Indicação sem evidência: " + entry.id);
      recommendations[book.id] = { reason: entry.motivo, ...previous, coverage, coverageByEdition,
        role: positions.includes(entry.papel) ? entry.papel : undefined };
    }
    const readingOrder = orders.get(id)?.obra_ids;
    if (readingOrder?.some(bookId => !recommendations[bookId])) throw new Error("Ordem inválida: " + id);
    byId.set(id, { ...topic, refs, recommendations, readingOrder });
  }
  for (const { consulta, de_tema_id, para_tema_id } of links.ajustes_consultas_existentes) {
    const key = normalize(consulta);
    const from = byId.get(de_tema_id);
    const to = byId.get(para_tema_id);
    byId.set(from.id, { ...from, aliases: from.aliases.filter(alias => normalize(alias) !== key) });
    byId.set(to.id, { ...to, aliases: unique([...to.aliases, consulta]) });
  }
  for (const [id, item] of related) {
    if (item.relacionados_ids.some(target => !byId.has(target))) throw new Error("Tema relacionado ausente: " + id);
    byId.set(id, { ...byId.get(id), relatedTopics: item.relacionados_ids });
  }
  return [...byId.values()];
}

export function curatedCatalog(base, topics, books) {
  const courses = [...base.map(area => area.course), ...data.areas.map(item => ({
    id: item.id, title: item.titulo, aliases: item.consultas,
  }))];
  const bibliographies = new Map(base.map(area => [area.course.id, new Set(area.books.map(book => book.id))]));
  for (const item of data.obras) {
    if (item.editorial.destino !== "curadoria") continue;
    const ids = bibliographies.get(item.area_id) ?? new Set();
    ids.add(item.id);
    bibliographies.set(item.area_id, ids);
  }
  return courses.map(course => ({
    course,
    books: books.filter(book => bibliographies.get(course.id)?.has(book.id)),
    topics: topics.filter(topic => topic.area === course.id),
  }));
}
export const promotedIds = new Set(data.obras.filter(item => item.operacao === "complementar").map(item => item.id));
