import { h } from "./html.mjs";

const palettes = {
  administrativo: "blue", constitucional: "blue", "direitos-humanos": "blue",
  "processo-civil": "blue", internacional: "blue", eleitoral: "blue", digital: "blue",
  civil: "clay", empresarial: "clay", consumidor: "clay", penal: "clay",
  "penal-i": "clay", "processo-penal": "clay", "propriedade-intelectual": "clay",
};

const extraAreas = {
  agrario: "Direito Agrário",
  "direitos-humanos": "Direitos Humanos",
  penal: "Direito Penal",
  "processo-do-trabalho": "Processo do Trabalho",
  "propriedade-intelectual": "Propriedade Intelectual",
  urbanistico: "Direito Urbanístico",
};

export function bookCover(book, areaTitle = "") {
  const title = book.title || "Título a conferir";
  const coverTitle = title.length > 55 ? title.split(/:\s+|\s+[—–]\s+/, 1)[0] : title;
  const author = book.author?.replace(/^Autoria não (?:indicada|informada)$/i, "");
  const area = areaTitle || extraAreas[book.area] || "";
  const palette = palettes[book.area] ?? "green";
  return `<div class="trelia-cover" data-cover-book="${h(book.id)}" data-cover-palette="${palette}" aria-hidden="true">
    <div class="trelia-cover-area">${h(area)}</div>
    <div class="trelia-cover-title${coverTitle.length > 40 ? " trelia-cover-title-long" : ""}">${h(coverTitle)}</div>
    <div class="trelia-cover-footer">${author ? `<div class="trelia-cover-author">${h(author)}</div>` : ""}<div class="trelia-cover-brand">Trelia.</div></div>
  </div>`;
}
