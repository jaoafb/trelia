export function normalize(value) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim();
}

const ignored = new Set(["a", "as", "o", "os", "um", "uma", "de", "do", "da", "dos", "das", "e", "em", "no", "na", "para", "por", "qual", "quais", "que", "como", "quando", "me", "explica", "explique", "entenda", "conceito", "guia", "sobre", "queria", "quero", "livro", "livros", "obra", "obras", "leitura", "leituras", "bibliografia", "indica", "recomende", "onde", "encontro"]);
export function createSearch(courses, topics, books) {
  const entries = [
    ...courses.map(item => ({ ...item, type: "Disciplina", route: item.id === "penal-i" ? item.id : "disciplina/" + item.id, note: "Consulte a bibliografia e os temas." })),
    ...topics.map(item => ({ ...item, type: "Guia de dúvida", route: "duvida/" + item.id, note: item.intro })),
    ...books.map(item => ({ ...item, type: "Livro", route: "livro/" + item.id, aliases: [item.author, item.short, ...item.editions.map(e => e.isbn)].filter(Boolean), note: item.author })),
  ].map(item => ({ item, keys: [item.title, ...item.aliases].map(normalize) }));

  function findEntries(query) {
    const normalized = normalize(query);
    const compact = normalized.replace(/ /g, "");
    if (!normalized) return [];
    const terms = normalized.split(" ").filter(term => !ignored.has(term));
    const requestsBooks = /\b(?:livros?|obras?|leituras?|bibliografia)\b/.test(normalized);
    const requestsExplanation = /^(?:o que|qual|quais|como|quando|por que|me explica|explique|entenda|diferenca entre|conceito de|guia)\b/.test(normalized);
    const showTopicBooks = requestsBooks || !requestsExplanation;
    const ranked = entries.map(({ item, keys }) => {
      const exact = keys.some(key => key === normalized || (/^\d{13}$/.test(compact) && key === compact));
      const phrases = keys.filter(key => key.includes(" ") && (" " + normalized + " ").includes(" " + key + " "));
      const words = new Set(keys.flatMap(key => key.split(" ")));
      const overlap = terms.filter(term => words.has(term)).length;
      const score = exact ? 1000 : phrases.length ? 100 + Math.max(...phrases.map(k => k.length)) : terms.length > 0 && overlap === terms.length ? 20 + overlap : 0;
      const entry = (showTopicBooks || item.central !== undefined) && item.type === "Guia de dúvida"
        ? { ...item, route: "livros/" + item.id, type: "Livros por assunto",
            title: "Livros sobre " + item.readingTitle, note: "Veja as obras, edições e os trechos localizados." }
        : item;
      return { item: entry, score };
    }).filter(hit => hit.score > 0).sort((a,b) => b.score - a.score);
    const exact = ranked.filter(hit => hit.score === 1000);
    return (exact.length ? exact : ranked).map(hit => hit.item);
  }
  return findEntries;
}
