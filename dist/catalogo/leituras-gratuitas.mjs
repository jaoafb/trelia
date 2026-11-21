import materials from "./gratuitas/materiais.mjs";
import indications from "./gratuitas/indicacoes.mjs";
import editorial from "./gratuitas/temas.mjs";
import { normalize } from "./busca.mjs";

const byMaterial = new Map(materials.map(item => [item.id, item]));
const variants = new Map(editorial.variants);
const bookId = material => material.integracao.obra_id_existente ?? material.id;
const urlKey = url => url?.split("#")[0].replace(/\/$/, "");
const types = {
  guia: "Guia", legislacao: "Legislação", livro: "Livro", artigo: "Artigo",
  capitulo: "Capítulo", jurisprudencia: "Jurisprudência", cartilha: "Cartilha",
  relatorio: "Relatório", manual: "Manual", faq: "Perguntas frequentes",
};
export const materialType = material => types[material.tipo] ?? material.tipo.replaceAll("_", " ");

export function addFreeMaterials(existing) {
  const books = new Map(existing.map(book => [book.id, book]));
  for (const material of materials) {
    const id = bookId(material);
    const book = books.get(id);
    if (material.integracao.obra_id_existente && !book) throw new Error("Obra ausente: " + id);
    const editionId = material.integracao.edicao_id_existente ?? material.isbn ?? "aberta-" + material.id;
    const previous = book?.editions.find(edition => edition.id === editionId);
    const edition = {
      id: editionId, isbn: material.isbn, name: material.ano_ou_versao ?? "Edição disponível",
      format: material.formato, ...(previous ?? {}), readingMaterial: material,
      source: previous?.source ?? material.link_origem, sourceLabel: previous?.sourceLabel ?? "Ver publicação de origem",
    };
    const aliases = [...new Set([...(book?.aliases ?? []), material.titulo, material.autoria_ou_instituicao,
      ...(material.id === "cade-guia-h" ? ["Guia H", "Guia H do Cade"] : [])])].filter(Boolean);
    const editions = previous
      ? book.editions.map(item => item.id === editionId ? edition : item)
      : [...(book?.editions ?? []), edition];
    books.set(id, {
      id, title: material.titulo, author: material.autoria_ou_instituicao, area: material.area_id,
      label: materialType(material), ...(book ?? {}), aliases, editions,
    });
  }
  return [...books.values()];
}

export function addFreeReadings(topics) {
  const existing = new Map(topics.map(topic => [topic.id, topic]));
  for (const item of editorial.proposals) {
    existing.set(item.id, {
      id: item.id, area: item.area_id, title: item.titulo, readingTitle: item.titulo,
      aliases: item.termos_busca, sources: [], refs: {}, recommendations: {},
      relatedTopics: [item.tema_relacionado_id],
    });
  }
  const grouped = new Map();
  for (const row of indications) {
    const material = byMaterial.get(row.material_id);
    if (!existing.has(row.tema_id)) throw new Error("Tema ausente: " + row.tema_id);
    const group = grouped.get(row.tema_id) ?? new Map();
    group.set(row.material_id, { ...row, material, bookId: bookId(material) });
    grouped.set(row.tema_id, group);
  }
  return [...existing.values()].map(topic => {
    const freeReadings = [...(grouped.get(topic.id)?.values() ?? [])].sort((a, b) =>
      Number(b.papel_editorial === "primeira_leitura") - Number(a.papel_editorial === "primeira_leitura"));
    const duplicateSource = source => freeReadings.some(({ material }) => {
      const urls = [material.link_leitura, material.link_origem].map(urlKey);
      if (urls.includes(urlKey(source.url))) return true;
      const norm = material.integracao.referencia_normativa_na_base;
      return Boolean(norm && normalize(source.title).includes(normalize(norm)));
    });
    return { ...topic, freeReadings, sources: topic.sources.filter(source => !duplicateSource(source)),
      aliases: [...new Set([...topic.aliases, ...(variants.get(topic.id) ?? [])])] };
  });
}
