const storageKey = "trelia:minhas-leituras:v1";

export const readingKey = item => JSON.stringify([item.materialId, item.topicId, item.editionId ?? ""]);

export function savedReadings() {
  try {
    const items = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(items) ? items.filter(item =>
      typeof item?.title === "string" && typeof item.materialId === "string"
      && typeof item.topicId === "string" && typeof item.area === "string") : [];
  } catch {
    return [];
  }
}

export function saveReading(item) {
  const items = savedReadings();
  if (items.some(saved => readingKey(saved) === readingKey(item))) return;
  localStorage.setItem(storageKey, JSON.stringify([item, ...items]));
}

export function removeReading(key) {
  localStorage.setItem(storageKey, JSON.stringify(savedReadings().filter(item => readingKey(item) !== key)));
}

export function onSavedReadingsChange(listener) {
  window.addEventListener("storage", event => {
    if (event.key === storageKey || event.key === null) listener();
  });
}
