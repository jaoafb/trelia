import { createSearch, normalize } from "../busca.mjs";

const isbns = edition => edition.isbns ?? (edition.isbn ? [edition.isbn] : []);

export function createBibliography(courses, topics, coreBooks, coreSearch) {
  let pending;

  function load() {
    pending ??= import("./bibliografia/index.mjs").then(({ default: imported }) => {
      const coreById = new Map(coreBooks.map(book => [book.id, book]));
      const coreByIsbn = new Map(coreBooks.flatMap(book =>
        book.editions.flatMap(edition => isbns(edition).map(isbn => [isbn, book]))));
      const pilotByRecord = new Map(coreBooks.filter(book => book.imported)
        .flatMap(book => book.editions.map(edition => [edition.id, { book, edition }])));
      const byId = new Map(coreById);
      const superseded = new Set();

      const grouped = imported.map(group => {
        const candidate = coreById.get(group.id) ?? group.editions
          .flatMap(isbns).map(isbn => coreByIsbn.get(isbn)).find(book => book && !book.imported);
        const legacyIds = group.editions.flatMap(edition => {
          const pilot = pilotByRecord.get(edition.id);
          return pilot ? [pilot.book.id] : [];
        });
        const records = group.editions.map(edition => {
          const pilot = pilotByRecord.get(edition.id)?.edition;
          return pilot?.format && pilot.isbn === edition.isbn ? { ...edition, format: pilot.format } : edition;
        });
        const editions = candidate
          ? [...candidate.editions, ...records.filter(edition =>
              !candidate.editions.some(existing => existing.id === edition.id))]
          : records;
        const merged = candidate ? { ...group, ...candidate, editions, aliases: [...new Set([
          ...(candidate.aliases ?? []), ...group.aliases, group.title,
        ])] } : { ...group, editions };
        for (const id of [group.id, ...legacyIds, ...(candidate ? [candidate.id] : [])]) {
          byId.set(id, merged);
          superseded.add(id);
        }
        return merged;
      });

      return {
        find: createSearch(courses, topics, [...coreBooks.filter(book => !superseded.has(book.id)), ...grouped]),
        byId,
      };
    }).catch(error => {
      pending = undefined;
      throw error;
    });
    return pending;
  }

  async function search(query) {
    const results = coreSearch(query);
    const key = normalize(query);
    if (!key) return [];
    const priority = results.filter(hit => hit.route.includes("?obra=")
      || ((hit.route.startsWith("livros/") || hit.type === "Disciplina")
        && [hit.title, ...hit.aliases].some(alias => normalize(alias) === key)));
    if (priority.length) return priority;
    return (await load()).find(query);
  }

  async function book(id) {
    return (await load()).byId.get(id);
  }

  return { search, book };
}
