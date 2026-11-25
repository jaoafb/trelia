import { onSavedReadingsChange, readingKey, removeReading, savedReadings, saveReading } from "../leituras-salvas.mjs";
import { h } from "./html.mjs";

const bookmark = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6 4h12v16l-6-4-6 4V4Z"/></svg>';

export function readingSaver(topic, areaTitle) {
  const keys = new Set(savedReadings().map(readingKey));
  return item => {
    const reading = { topicId: topic.id, topicTitle: topic.title, area: topic.area, areaTitle, ...item };
    const saved = keys.has(readingKey(reading));
    return `<button type="button" class="save-reading" data-save-reading="${h(JSON.stringify(reading))}"
      aria-label="${h(saveLabel(reading.title, saved))}" title="${h(saveLabel(reading.title, saved))}" aria-pressed="${saved}">${bookmark}</button>`;
  };
}

const saveLabel = (title, saved) => (saved ? "Leitura salva" : "Salvar leitura") + " — " + title;

export function savedReadingsPage() {
  return `<section class="bibliography-page shell saved-readings-page">
    <div class="section-heading"><h1 tabindex="-1">Minhas leituras</h1></div>
    <div data-saved-list></div>
  </section>`;
}

function sourceUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    return;
  }
}

function savedCard(item, external) {
  const url = sourceUrl(item.url);
  const topic = "#livros/" + encodeURIComponent(item.topicId);
  const resume = item.guide && item.editionId
    ? "#duvida/" + encodeURIComponent(item.topicId) + "?" + new URLSearchParams({ obra: item.materialId, edicao: item.editionId })
    : topic;
  return `<li class="bibliography-card saved-reading-card">
    <div>
      <p class="book-type">${h(item.areaTitle || item.area)}</p>
      <h2>${h(item.title)}</h2>
      ${item.author ? `<p class="author">${h(item.author)}</p>` : ""}
      <p><a href="${h(topic)}">${h(item.topicTitle ?? "")}</a></p>
      ${item.edition ? `<p>${h(item.edition)}</p>` : ""}
      <p>${item.location ? `<strong>Onde começar</strong> ${h(item.location)}` : "Localização a conferir"}</p>
    </div>
    <div class="saved-reading-actions">
      ${item.guide || !url
        ? `<a class="primary-button" href="${h(resume)}">${item.guide ? "Retomar indicação" : "Voltar ao tema"}</a>`
        : `<div class="saved-reading-source">${external(url, "Abrir fonte salva")}</div>`}
      ${item.guide && url ? external(url, "Abrir fonte salva") : ""}
      <button type="button" class="text-link saved-reading-remove" data-remove-reading="${h(readingKey(item))}" aria-label="${h("Remover leitura — " + item.title)}">Remover</button>
    </div>
  </li>`;
}

export function bindSavedReadings(root, status, external) {
  let statusTimeout;
  function announce(message) {
    clearTimeout(statusTimeout);
    status.textContent = message;
    statusTimeout = setTimeout(() => { status.textContent = ""; }, 4000);
  }

  function updateList(selected = "") {
    const list = root.querySelector("[data-saved-list]");
    if (!list) return;
    const items = savedReadings();
    const areas = new Map(items.map(item => [item.area, item.areaTitle || item.area]));
    if (areas.size < 2 || !areas.has(selected)) selected = "";
    const shown = items.filter(item => !selected || item.area === selected);
    list.innerHTML = items.length ? `
      ${areas.size > 1 ? `<label class="saved-reading-filter">Área <select data-reading-area>
        <option value="">Todas</option>
        ${[...areas].sort((a, b) => a[1].localeCompare(b[1], "pt-BR")).map(([id, title]) =>
          `<option value="${h(id)}"${selected === id ? " selected" : ""}>${h(title)}</option>`).join("")}
      </select></label>` : ""}
      <ul class="saved-reading-list">${shown.map(item => savedCard(item, external)).join("")}</ul>`
      : `<div class="saved-reading-empty">
        <div class="saved-reading-empty-icon">${bookmark}</div>
        <p>As leituras que você salvar aparecem aqui.</p>
        <a class="text-link" href="#duvidas">Explorar temas <span aria-hidden="true">→</span></a>
      </div>`;
  }

  function refreshButtons() {
    const keys = new Set(savedReadings().map(readingKey));
    for (const button of root.querySelectorAll("[data-save-reading]")) {
      const item = JSON.parse(button.dataset.saveReading);
      const saved = keys.has(readingKey(item));
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", saveLabel(item.title, saved));
      button.title = saveLabel(item.title, saved);
    }
  }

  const currentArea = () => root.querySelector("[data-reading-area]")?.value;
  root.addEventListener("change", event => {
    if (!event.target.matches("[data-reading-area]")) return;
    updateList(event.target.value);
    root.querySelector("[data-reading-area]")?.focus();
  });
  root.addEventListener("click", event => {
    const button = event.target.closest("[data-save-reading], [data-remove-reading]");
    if (!button) return;
    if (button.hasAttribute("data-save-reading")) {
      if (button.getAttribute("aria-pressed") === "true") return;
      try {
        saveReading(JSON.parse(button.dataset.saveReading));
        refreshButtons();
        announce("Leitura salva neste navegador.");
      } catch {
        announce("Não foi possível salvar a leitura neste navegador.");
      }
      return;
    }
    const index = [...root.querySelectorAll("[data-remove-reading]")].indexOf(button);
    try {
      removeReading(button.dataset.removeReading);
      updateList(currentArea());
      const remaining = root.querySelectorAll("[data-remove-reading]");
      (remaining[Math.min(index, remaining.length - 1)] ?? root.querySelector("h1")).focus();
      announce("Leitura removida.");
    } catch {
      announce("Não foi possível remover a leitura.");
    }
  });
  onSavedReadingsChange(() => {
    refreshButtons();
    updateList(currentArea());
  });
  return updateList;
}
