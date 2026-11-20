export function normalize(value) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim();
}

const ignored = new Set(["a", "as", "o", "os", "um", "uma", "de", "do", "da", "dos", "das", "e", "em", "no", "na", "para", "por", "qual", "quais", "que", "como", "quando", "me", "explica", "explique", "entenda", "conceito", "guia", "sobre", "queria", "quero", "livro", "livros", "obra", "obras", "leitura", "leituras", "bibliografia", "indica", "recomende", "onde", "encontro"]);
export function createSearch(courses, topics, books) {
  const entries = [
    ...courses.map(item => ({ ...item, type: "Disciplina", route: item.id === "penal-i" ? item.id : "disciplina/" + item.id, note: "Consulte a bibliografia e os temas." })),
    ...topics.map(item => ({ ...item, type: "Guia de dúvida", route: "duvida/" + item.id, note: item.intro })),
    ...books.map(item => ({ ...item, type: item.imported ? "Ficha bibliográfica" : "Livro", route: "livro/" + item.id,
      aliases: [item.author, item.short, ...(item.aliases ?? []), ...item.editions.flatMap(e => e.isbns ?? [e.isbn])].filter(Boolean), note: item.author })),
  ].map(item => ({ item, keys: [item.title, ...item.aliases].map(normalize) }));
  const authorIndex = books.map(book => ({
    book,
    words: new Set(normalize(book.author).split(" ").filter(word => word.length >= 4 && !ignored.has(word))),
  }));
  const topicKeys = topics.map(topic => ({ topic, aliases: topic.aliases.map(normalize) }));

  function findEntries(query) {
    const normalized = normalize(query);
    const compact = normalized.replace(/ /g, "");
    if (!normalized) return [];
    const terms = normalized.split(" ").filter(term => !ignored.has(term));
    const ranked = entries.map(({ item, keys }) => {
      const exact = keys.some(key => key === normalized || (/^(?:\d{13}|\d{9}[\dx])$/.test(compact) && key === compact));
      const phrases = keys.filter(key => key.includes(" ") && (" " + normalized + " ").includes(" " + key + " "));
      const words = new Set(keys.flatMap(key => key.split(" ")));
      const overlap = terms.filter(term => words.has(term)).length;
      const score = exact ? 1000 : phrases.length ? 100 + Math.max(...phrases.map(k => k.length)) : terms.length > 0 && overlap === terms.length ? 20 + overlap : 0;
      const entry = item.type === "Guia de dúvida"
        ? { ...item, route: "livros/" + item.id, type: item.answer ? "Tema e leituras" : "Leituras por tema",
            note: item.summary ?? "Veja as obras e as referências disponíveis." }
        : item;
      return { item: entry, score };
    }).filter(hit => hit.score > 0).sort((a,b) => b.score - a.score);
    const exact = ranked.filter(hit => hit.score === 1000);
    if (exact.length) return exact.map(hit => hit.item);

    const authorMatches = authorIndex.flatMap(({ book, words }) => {
      const remaining = terms.filter(word => !words.has(word));
      if (remaining.length === terms.length || remaining.length === 0) return [];
      const subject = topicKeys.find(({ aliases }) => aliases.includes(remaining.join(" ")))?.topic;
      if (!subject) return [];
      const recommendsBook = Boolean(subject.recommendations[book.id]);
      return [{ ...book, type: recommendsBook ? "Leitura recomendada" : "Ficha bibliográfica",
        route: recommendsBook ? "livros/" + subject.id + "?obra=" + book.id : "livro/" + book.id,
        note: book.author, recommendsBook }];
    });
    if (authorMatches.length) return authorMatches.sort((a, b) => Number(b.recommendsBook) - Number(a.recommendsBook));
    return ranked.map(hit => hit.item);
  }
  return findEntries;
}
