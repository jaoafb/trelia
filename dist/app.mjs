import { books, topics, findEntries } from "./data.mjs";

const root = document.querySelector("main");
const feedback = document.querySelector("#feedback");
const searchIcon = '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.75" cy="10.75" r="5.75"/><path d="m15 15 4 4"/></svg>';
const bookIcon = '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 5.5c3.5-1.4 6-.1 7.5 1.1 1.5-1.2 4-2.5 7.5-1.1v12.8c-3.5-1.4-6-.1-7.5 1.1-1.5-1.2-4-2.5-7.5-1.1V5.5Zm7.5 1.1v12.8"/></svg>';
const noteIcon = '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="4.5" width="14" height="15" rx="2"/><path d="M8.5 9h7m-7 3h7m-7 3h4"/></svg>';
const chevronIcon = '<svg class="icon disclosure-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

function h(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function external(url, label, className = "text-link") {
  return `<a class="${className}" href="${h(url)}" target="_blank" rel="noopener noreferrer">${h(label)}</a>`;
}

function search(value = "", heading = false) {
  return `<form id="search-form" class="search-form" role="search">
    <label class="sr-only" for="search-input">Buscar assunto, disciplina ou livro</label>
    <div class="search-box">${searchIcon}<input id="search-input" name="query" type="search" placeholder="Ex.: dolo eventual" value="${h(value)}" required maxlength="160" autocomplete="off"></div>
    <button class="${heading ? "search-button" : "primary"}" type="submit">Buscar</button>
  </form>`;
}

function bookCover(book) {
  const coverTitle = { nucci: "Manual de<br>Direito Penal", cunha: "Direito Penal<br>Parte Geral", bitencourt: "Tratado de<br>Direito Penal", rodriguez: "Laboratório de<br>Direito Penal" };
  return `<span aria-hidden="true" class="book-cover cover-${book.cover}"><span>${h(book.short)}</span><strong>${coverTitle[book.id]}</strong><i></i></span>`;
}

function bookCard(book) {
  return `<article class="book-card">
    <div class="book-card-top">${bookCover(book)}<div><p class="eyebrow">${h(book.label)}</p>
    <h3><a href="#livro/${book.id}">${h(book.title)}</a></h3><p class="subtle author">${h(book.author)}</p></div></div>
    <p>${h(book.reason)}</p>
    <a class="text-link" href="#livro/${book.id}">Ver edições e acesso</a>
  </article>`;
}

function topicCard(topic, destination = "duvida") {
  return `<a class="topic-card" href="#${destination}/${topic.id}">
    <span class="tile-icon topic-icon">${noteIcon}</span><span class="eyebrow">${h(topic.category)}</span>
    <h3>${h(topic.title)}</h3><p>${h(topic.intro)}</p>
  </a>`;
}

function crumbs(current, parent = false) {
  return `<nav class="crumbs" aria-label="Nesta página"><a href="#inicio">Início</a>
    ${parent ? '<span aria-hidden="true">/</span><a href="#penal-i">Penal I</a>' : ""}
    <span aria-hidden="true">/</span><span aria-current="page">${h(current)}</span></nav>`;
}

function home() {
  return `<section class="hero">
    <div class="hero-copy">
      <p class="hero-label"><span></span> Biblioteca de estudo</p>
      <h1>Encontre livros<br class="hero-break"> <em>sobre um assunto.</em></h1>
      <p>Busque um tema e veja quais obras o abordam e em que parte de cada edição ele aparece.</p>
      ${search("", true)}
      <div class="examples"><span>Experimente</span><a href="#livros/dolo-eventual">Dolo eventual</a><a href="#livros/omissao-impropria">Omissão imprópria</a><a href="#penal-i">Penal I</a></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="orbit orbit-c"></div>
      <div class="art-note"><span></span><span></span><span></span><span></span></div>
      <div class="art-book"><i></i><div class="art-letter">Aa</div><div class="art-rule"></div><div class="art-rule short"></div></div>
      <div class="art-bookmark"></div><span class="spark">✦</span><span class="spark small">✦</span>
    </div>
  </section>
  <section class="entry-grid" aria-label="Caminhos de estudo">
    <a class="entry-card" href="#penal-i"><span class="tile-icon area-icon">${bookIcon}</span><div><h2>Estudar uma área</h2><p>Compare leituras para acompanhar Direito Penal I.</p></div><span class="entry-action">Ver leituras</span></a>
    <a class="entry-card" href="#duvidas"><span class="tile-icon question-icon">${searchIcon}</span><div><h2>Consultar um guia</h2><p>Leia uma explicação breve e consulte as fontes.</p></div><span class="entry-action">Ver guias</span></a>
  </section>
  <section class="section" aria-labelledby="topics-title">
    <div class="section-head"><div><p class="eyebrow">Direito Penal I</p><h2 id="topics-title">Leituras por assunto</h2></div></div>
    <div class="topics">${topics.map(topic => topicCard(topic, "livros")).join("")}</div>
  </section>`;
}

function coursePage() {
  return `${crumbs("Direito Penal I")}
    <section class="page-hero"><p class="eyebrow">Graduação · Parte Geral</p><h1>Direito Penal I</h1><p>Escolha uma obra pelo que você precisa fazer agora: acompanhar a matéria, aprofundar a doutrina ou praticar com casos.</p></section>
    <section class="section" aria-labelledby="livros-title"><div class="section-head"><h2 id="livros-title">Leituras por objetivo</h2></div>
      <div class="books">${books.map(bookCard).join("")}</div>
    </section>
    <section class="section" aria-labelledby="guia-title"><div class="section-head"><h2 id="guia-title">Guias da disciplina</h2></div><div class="topics">${topics.map(topic => topicCard(topic)).join("")}</div></section>`;
}

function topicList() {
  return `${crumbs("Guias de dúvidas")}
    <section class="page-hero"><p class="eyebrow">Direito Penal I</p><h1>Guias de dúvidas</h1><p>Escolha um tema para ver a explicação, consultar as fontes e localizar a leitura no livro.</p></section>
    <section class="section" aria-label="Temas disponíveis"><div class="topics">${topics.map(topic => topicCard(topic)).join("")}</div></section>`;
}

function sourceCard(source) {
  return `<li class="source-card"><div><p class="eyebrow">${h(source.type)}</p><h3>${h(source.title)}</h3><p class="subtle">${h(source.by)}</p><p>${h(source.note)}</p></div>${external(source.url, "Abrir fonte")}</li>`;
}

function editionLabel(edition) {
  return edition.year && !edition.name.includes(String(edition.year))
    ? edition.name + " · " + edition.year
    : edition.name;
}

function locationCard(ref) {
  if (!ref) return `<div class="locator-result"><p>Página ou seção ainda sem confirmação nessa edição.</p><p class="subtle">As fontes abertas acima já permitem consultar o tema.</p></div>`;
  return `<div class="locator-result"><p class="eyebrow">${h(ref.precision)}</p><strong>${h(ref.where)}</strong><p>${h(ref.detail)}</p>${external(ref.url, ref.action)}</div>`;
}

function topicPage(topic) {
  const editions = books[0].editions;
  const first = editions.find(edition => topic.refs[edition.id]);
  return `${crumbs(topic.title, true)}
    <section class="page-hero topic-hero"><p class="eyebrow">${h(topic.category)} · Direito Penal I</p><h1>${h(topic.title)}</h1><p>${h(topic.intro)}</p></section>
    <div class="article-layout">
      <div>
        <section class="answer" aria-labelledby="resposta"><h2 id="resposta">Em resumo</h2><p>${h(topic.answer)}</p><p class="focus-note">${h(topic.focus)}</p></section>
        <section class="sub-section" aria-labelledby="aberto"><h2 id="aberto">Leia ou ouça agora</h2><ul class="sources">${topic.sources.map(sourceCard).join("")}</ul></section>
      </div>
      <aside class="locator" aria-labelledby="localizar">
        <span class="tile-icon area-icon">${bookIcon}</span>
        <h2 id="localizar">Onde está no livro?</h2>
        <a class="text-link" href="#livro/nucci">Manual de Direito Penal · Nucci</a>
        <label for="edition">Qual edição você tem?</label>
        <select id="edition">${editions.map(edition => `<option value="${edition.id}" ${edition.id === first.id ? "selected" : ""}>${h(editionLabel(edition))} · ${h(edition.format)}</option>`).join("")}</select>
        <div id="edition-result" aria-live="polite">${locationCard(topic.refs[first.id])}</div>
        <p class="topic-reading-link"><a class="text-link" href="#livros/${topic.id}">Ver livros sobre este assunto</a></p>
      </aside>
    </div>
    <section class="section more" aria-labelledby="mais-guias"><div class="section-head"><h2 id="mais-guias">Outras dúvidas de Penal I</h2></div><div class="topics">${topics.filter(item => item !== topic).map(topic => topicCard(topic)).join("")}</div></section>`;
}

function topicBooksPage(topic) {
  const title = "Livros sobre " + topic.readingTitle;
  const matches = books.map(book => ({
    book,
    editions: book.editions.filter(edition => topic.refs[edition.id]),
  })).filter(match => match.editions.length);

  return `${crumbs(title, true)}
    <div class="reading-header">
      <h1>${h(title)}</h1>
      ${search(topic.readingTitle)}
    </div>
    <div class="reading-layout">
      <aside class="reading-summary" aria-labelledby="topic-summary-title">
        <h2 id="topic-summary-title">Resumo do tema</h2>
        <p>${h(topic.summary)}</p>
        <details class="reading-explanation">
          <summary><span class="when-closed">Ler resumo completo</span><span class="when-open">Fechar resumo</span>${chevronIcon}</summary>
          <p>${h(topic.answer)}</p>
          <p class="subtle">${h(topic.focus)}</p>
          <button type="button" class="text-link reading-jump">Ir para os livros indicados</button>
          <a class="text-link" href="#duvida/${topic.id}">Ler a explicação e ver fontes abertas</a>
        </details>
      </aside>
      <section class="reading-books" aria-labelledby="topic-books-title">
        <h2 id="topic-books-title" tabindex="-1">Livros indicados</h2>
        <div class="reading-cards">${matches.map(({ book, editions }) => `<article class="reading-book">
          <div class="reading-book-info">
            <h3><a href="#livro/${book.id}">${h(book.title)}</a></h3>
            <p class="subtle">${h(book.author)}</p>
            <p>${h(book.reason)}</p>
          </div>
          <div class="reading-locations">
            <p class="location-label">Onde ler</p>
            <ul class="reading-editions">${editions.map(edition => `<li>
              <details class="reading-edition">
                <summary>
                  <span><small>${h(editionLabel(edition))} · ${h(edition.format)}</small>
                  <strong>${h(topic.refs[edition.id].where)}</strong></span>${chevronIcon}
                </summary>
                <p>${h(topic.refs[edition.id].detail)}</p>
                ${external(topic.refs[edition.id].url, topic.refs[edition.id].action)}
              </details>
            </li>`).join("")}</ul>
          </div>
        </article>`).join("")}</div>
      </section>
    </div>`;
}

function bookPage(book) {
  const references = topics.filter(t => book.editions.some(e => t.refs[e.id]));
  return `${crumbs(book.short, true)}
    <section class="page-hero book-hero"><div>${bookCover(book)}</div><div><p class="eyebrow">${h(book.label)}</p><h1>${h(book.title)}</h1><p class="book-by">${h(book.author)}</p><p>${h(book.reason)}</p></div></section>
    <section class="section" aria-labelledby="edicoes"><div class="section-head"><h2 id="edicoes">Edições e acesso</h2></div><ul class="sources editions">${book.editions.map(e => `<li class="source-card">
      <div><p class="eyebrow">${h(e.format)}</p><h3>${h(editionLabel(e))}</h3><p class="subtle">ISBN ${h(e.isbn)}</p></div><div class="edition-links">
      ${external(e.source, e.sourceLabel)}
      ${external("https://www.amazon.com.br/s?k=" + e.isbn, "Buscar na Amazon")}
      </div></li>`).join("")}</ul></section>
    ${references.length ? `<section class="section" aria-labelledby="neste-livro"><div class="section-head"><h2 id="neste-livro">Guias que usam esta obra</h2></div><div class="topics">${references.map(topic => topicCard(topic)).join("")}</div></section>` : ""}`;
}

function resultsPage(query) {
  const results = findEntries(query);
  return `${crumbs("Busca")}
    <section class="page-hero"><h1>Resultados da busca</h1>${search(query)}</section>
    <section class="section search-results" aria-label="Resultados">
    ${results.length ? `<ul class="sources">${results.map(item => `<li class="source-card"><div><p class="eyebrow">${h(item.type)}</p><h3><a href="#${item.route}">${h(item.title)}</a></h3><p>${h(item.note)}</p></div><a class="text-link" href="#${item.route}">Abrir</a></li>`).join("")}</ul>` :
    `<div class="empty"><h2>Ainda não temos uma indicação para “${h(query)}”.</h2><p>Experimente “Penal I” ou abra um dos temas do acervo.</p><a class="primary" href="#duvidas">Ver temas disponíveis</a></div>`}</section>`;
}

function currentRoute() {
  const hash = location.hash.slice(1);
  return hash && hash !== "conteudo" ? hash : "inicio";
}

function render(moveFocus = true) {
  const route = currentRoute();
  const [kind, id] = route.split("/");
  const topic = topics.find(item => item.id === id);
  const book = books.find(item => item.id === id);
  const query = new URLSearchParams(route.split("?")[1]).get("q") ?? "";
  let title = "";
  if (route === "penal-i") {
    root.innerHTML = coursePage();
    title = "Direito Penal I";
  } else if (route === "duvidas") {
    root.innerHTML = topicList();
    title = "Guias de dúvidas";
  } else if (kind === "duvida" && topic) {
    root.innerHTML = topicPage(topic);
    title = topic.title;
    document.querySelector("#edition").addEventListener("change", event => {
      document.querySelector("#edition-result").innerHTML = locationCard(topic.refs[event.target.value]);
    });
  } else if (kind === "livros" && topic) {
    root.innerHTML = topicBooksPage(topic);
    title = "Livros sobre " + topic.readingTitle;
    root.querySelector(".reading-jump").addEventListener("click", () => {
      const booksHeading = root.querySelector("#topic-books-title");
      booksHeading.focus({ preventScroll: true });
      booksHeading.scrollIntoView();
    });
  } else if (kind === "livro" && book) {
    root.innerHTML = bookPage(book);
    title = book.title;
  } else if (route.startsWith("busca?")) {
    root.innerHTML = resultsPage(query);
    title = "Busca";
  } else {
    root.innerHTML = home();
  }
  document.title = title ? title + " · Trelia." : "Trelia.";
  document.querySelector("#search-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("query").trim();
    if (!query) return;
    const results = findEntries(query);
    const target = results.length === 1 ? results[0].route : "busca?q=" + encodeURIComponent(query);
    if (location.hash === "#" + target) render();
    else location.hash = target;
  });
  if (moveFocus) {
    window.scrollTo(0, 0);
    const heading = root.querySelector("h1");
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

document.querySelector(".skip").addEventListener("click", event => {
  event.preventDefault();
  root.focus();
});

document.querySelectorAll(".feedback-trigger").forEach(button => {
  button.addEventListener("click", () => feedback.showModal());
});

document.querySelector("#feedback-form").addEventListener("submit", async event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const note = form.get("note").trim();
  const report = `Teste da Trelia\nO que fui fazer: ${form.get("task")}\nEncontrei o que precisava? ${form.get("result")}${note ? "\nBusca ou comentário: " + note : ""}`;
  const status = document.querySelector("#feedback-status");
  const copy = document.querySelector("#feedback-copy");
  try {
    await navigator.clipboard.writeText(report);
    status.textContent = "Feedback copiado. Agora você pode enviar a mensagem.";
    copy.hidden = true;
  } catch {
    status.textContent = "Selecione e copie o feedback abaixo.";
    copy.hidden = false;
    copy.value = report;
    copy.focus();
    copy.select();
  }
});

window.addEventListener("hashchange", () => render());
render(false);
