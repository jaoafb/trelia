export function orderedReadings(topic, books, preferredBook) {
  const sequence = [preferredBook, ...(topic.readingOrder ?? []), ...Object.keys(topic.recommendations)];
  const byId = new Map(books.filter(book => topic.recommendations[book.id]).map(book => [book.id, book]));
  return [...new Set(sequence)].map(id => byId.get(id)).filter(Boolean);
}

export function readingEvidence(topic, book, edition) {
  const recommendation = topic.recommendations[book.id];
  const ref = topic.refs[edition.id];
  const specific = recommendation.coverageByEdition?.[edition.id];
  return { ref, source: ref ?? specific ?? recommendation.coverage, specific };
}

export function defaultReadingEdition(topic, book) {
  const located = book.editions.filter(item => topic.refs[item.id]?.where.startsWith("Página"));
  if (topic.readingOrder) {
    return located.reduce((latest, item) => item.year > latest.year ? item : latest, located[0])
      ?? book.editions.find(item => topic.refs[item.id])
      ?? book.editions.find(item => topic.recommendations[book.id].coverageByEdition?.[item.id])
      ?? book.editions[0];
  }
  return located.at(-1) ?? book.editions.find(item => topic.refs[item.id]) ?? book.editions[0];
}
