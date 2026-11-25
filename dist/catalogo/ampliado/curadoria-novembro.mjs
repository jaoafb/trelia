import third from "./novembro/expansao-iii.mjs";
import consolidation from "./novembro/consolidacao-i.mjs";
import expansion from "./novembro/expansao.mjs";
import balanced from "./novembro/equilibrada.mjs";

const thirdTopics = new Set(third.temas.map(topic => topic.id));
const canonicalTopics = {
  "concessao-permissao-servico-publico": "concessao-permissao",
  "tentativa-punivel": "tentativa",
  "desistencia-voluntaria-crime": "tentativa",
  "remedios-antitruste-concentracoes": "proposta-remedios-antitruste",
  "dolo-eventual-culpa-consciente": "dolo-eventual",
  "omissao-impropria-garantidor": "omissao-impropria",
  "controlador-operador-lgpd": "proposta-agentes-tratamento-lgpd",
};
export const novemberTopicId = id => canonicalTopics[id] ?? id;
const officialSources = new Map(expansion.fontes_oficiais.map(source => [source.id, source]));
const unique = items => [...new Set(items)];

function addExpansionBooks(books) {
  return [...books, ...expansion.obras_novas.map(item => ({
    id: item.id, title: item.titulo, author: item.autor, area: item.area_id,
    editions: item.edicoes.map(edition => ({
      id: edition.id, isbn: edition.isbn, name: edition.numero + "ª edição",
      year: edition.ano, format: edition.formato, publisher: edition.editora,
      access: "Compra", source: edition.url_ficha, sourceLabel: "Ver na editora",
    })),
  }))];
}

const thirdBookId = id => id === "tartuce-neves-manual-consumidor-2026" ? "tartuce-neves-consumidor" : id;

export function addNovemberBooks(books) {
  const entries = new Map(addExpansionBooks(books).map(book => [book.id, book]));
  for (const item of third.obras) {
    if (item.status_editorial !== "obra_e_edicao_verificadas") continue;
    const id = thirdBookId(item.id_sugerido);
    const existing = entries.get(id);
    const edition = {
      id: item.isbn, isbn: item.isbn, name: item.edicao, year: item.ano,
      format: item.formato, publisher: item.editora, access: "Compra",
      source: item.url_ficha, sourceLabel: "Ver na editora",
    };
    if (existing?.editions.some(edition => edition.isbn === item.isbn)) continue;
    entries.set(id, {
      id, title: item.titulo, author: item.autores.join("; "), area: item.area_id,
      ...existing, editions: [...(existing?.editions ?? []), edition],
    });
  }
  return [...entries.values()];
}

const thirdIndications = third.indicacoes.filter(item => item.status === "confirmado_para_integracao")
  .map(item => ({
    ...item, obra_id: thirdBookId(item.obra_id_sugerido), edicao_id: item.isbn_edicao, isbn: item.isbn_edicao,
    localizacao: { ...item.localizacao, pagina: item.localizacao.pagina_inicial },
  }));

function topicSources(item) {
  return item.fontes.map(link => {
    const source = link.fonte_id && !link.url ? officialSources.get(link.fonte_id) : link;
    if (!source) throw new Error("Fonte editorial ausente: " + link.fonte_id);
    const types = {
      texto_em_html: "Texto oficial em HTML",
      pdf_direto: "PDF oficial",
      pagina_institucional_com_acesso_ao_manual: "Página institucional",
    };
    return {
      title: source.titulo, url: source.url, by: source.instituicao,
      type: types[source.formato] ?? "Fonte oficial", note: link.onde_comecar,
      unavailable: source.url.endsWith("/guia-compliance-versao-oficial.pdf"),
    };
  });
}

export function addNovemberTopics(topics, books) {
  const entries = new Map(topics.map(topic => [topic.id, topic]));
  const bookIndex = new Map(books.map(book => [book.id, book]));
  for (const item of [...expansion.temas, ...balanced.temas, ...third.temas]) {
    const id = novemberTopicId(item.id);
    const previous = entries.get(id);
    const sources = topicSources(item);
    entries.set(id, {
      id, title: item.titulo, readingTitle: item.titulo, area: item.area_id,
      freeReadings: [],
      ...previous,
      answer: previous?.answer ?? item.resposta,
      editorialPending: previous?.editorialPending ?? (!previous?.answer && thirdTopics.has(item.id)),
      focus: previous?.focus ?? item.como_estudar,
      studyOrientation: previous?.studyOrientation ?? item.como_estudar,
      aliases: unique([...(previous?.aliases ?? []), item.titulo, item.pergunta,
        ...(item.termos_busca ?? item.aliases ?? [])]),
      sources: [...(previous?.sources ?? []), ...sources.filter(source =>
        !previous?.sources?.some(old => source.url === old.url && source.note === old.note)
        && !previous?.freeReadings?.some(({ material }) =>
          [material.link_origem, material.link_leitura].includes(source.url)))],
      relatedTopics: unique([...(previous?.relatedTopics ?? []), ...(item.temas_relacionados ?? [])].map(novemberTopicId)),
      recommendations: { ...previous?.recommendations },
      refs: { ...previous?.refs },
    });
  }
  for (const item of [...expansion.indicacoes_de_livro, ...thirdIndications, ...consolidation.indicacoes]) {
    const topic = entries.get(novemberTopicId(item.tema_id));
    const book = bookIndex.get(item.obra_id);
    const edition = book?.editions.find(entry => entry.id === item.edicao_id && (!item.isbn || entry.isbn === item.isbn));
    if (!topic || !edition) throw new Error("Indicação sem tema ou edição: " + item.tema_id + "/" + item.edicao_id);
    const { pagina, secao } = item.localizacao;
    const ref = {
      url: item.evidencia.url,
      action: item.evidencia.tipo === "texto_integral" ? "Ler gratuitamente" : "Ver fonte",
      where: pagina ? "Página " + pagina : secao,
      section: pagina ? secao : undefined,
      precision: pagina ? "Paginação da obra" : "Localização confirmada",
      detail: item.evidencia.secao ?? secao,
    };
    const previousRef = topic.refs[edition.id];
    const extendsSameReference = previousRef?.url === ref.url
      && ref.where?.startsWith(previousRef.where + ",");
    if (ref.where && (!previousRef || extendsSameReference)) topic.refs[edition.id] = ref;
    const previous = topic.recommendations[book.id];
    topic.recommendations[book.id] = {
      reason: item.por_que_ler.replace(/, que começa na p\. \d+ desta edição(?=\.)/u, ""),
      coverage: { url: item.evidencia.url, action: ref.action },
      ...previous, coverageByEdition: { ...previous?.coverageByEdition, [edition.id]: ref },
    };
  }
  for (const topic of entries.values()) {
    if (topic.relatedTopics?.some(id => !entries.has(id))) throw new Error("Tema relacionado ausente: " + topic.id);
  }
  return [...entries.values()];
}

export const novemberArticles = [...expansion.artigos, ...balanced.artigos];
export const expansionIIIArticles = third.artigos;
