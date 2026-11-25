const code = "https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-2848-7-dezembro-1940-412868-normaatualizada-pe.pdf";
const nucciContents = "https://sumarios.grupogen.com.br/jur/FOR/9786559642816_SUM.pdf";
const nucci2018Contents = "https://bdjur.stj.jus.br/bitstreams/7aeacac9-e1d9-4988-8d76-dc2d56c2e091/download";
const cunhaContents = "https://juspodivmdigital.com.br/cdn/pdf/JUS4997-Sumario.pdf";

export const books = [
  {
    id: "nucci", author: "Guilherme de Souza Nucci", short: "Nucci", title: "Manual de Direito Penal",
    cover: "violet", label: "Manual para a disciplina",
    reason: "Use como livro de referência para acompanhar a teoria do crime e voltar aos temas à medida que aparecem nas aulas.",
    editions: [
      { id: "nucci-22", year: 2026, name: "22ª edição", format: "Impresso", isbn: "9788530999223", source: "https://www.grupogen.com.br/livro-manual-de-direito-penal-volume-unico-22-edicao-2026-guilherme-nucci-editora-forense-9788530999223", sourceLabel: "Ver na editora" },
      { id: "nucci-22-epub", year: 2026, name: "22ª edição", format: "E-book", isbn: "9788530999230", source: "https://www.grupogen.com.br/e-book-manual-de-direito-penal-volume-unico-22-edicao-2026-guilherme-nucci-editora-forense-9788530999230", sourceLabel: "Ver na editora" },
      { id: "nucci-18", year: 2022, name: "18ª edição", format: "Impresso", isbn: "9786559642816", source: nucciContents, sourceLabel: "Ver sumário da edição" },
      { id: "nucci-14", year: 2018, name: "14ª edição", format: "Impresso", isbn: "9788530977528", source: nucci2018Contents, sourceLabel: "Ver sumário no STJ" },
    ],
  },
  {
    id: "cunha", author: "Rogério Sanches Cunha", short: "Cunha", title: "Manual de Direito Penal – Parte Geral",
    cover: "sage", label: "Foco na Parte Geral",
    reason: "Escolha esta edição se você quer um manual dedicado à Parte Geral. Consulte o sumário para comparar a organização dos temas com a da sua disciplina.",
    editions: [{ id: "cunha-2026", year: 2026, name: "Edição de 2026", format: "Impresso", isbn: "9788544269954", source: "https://www.editorajuspodivm.com.br/manual-de-direito-penal-volume-unico-parte-geral-2026-cunha", sourceLabel: "Ver na editora" }],
  },
  {
    id: "bitencourt", author: "Cezar Roberto Bitencourt", short: "Bitencourt", title: "Tratado de Direito Penal – Parte Geral, vol. 1",
    cover: "gold", label: "Aprofundamento",
    reason: "Consulte para desenvolver uma pesquisa doutrinária ou comparar o tratamento de um tema com o seu manual de referência.",
    editions: [{ id: "bitencourt-2026", year: 2026, name: "32ª edição", format: "Impresso", isbn: "9786551771194", source: "https://www.grupogen.com.br/livro-tratado-de-direito-penal-parte-geral-vol-1-32-edicao-2026-cezar-roberto-bitencourt-saraiva-jur-9786551771194", sourceLabel: "Ver na editora" }],
  },
  {
    id: "rodriguez", author: "Víctor Gabriel Rodríguez", short: "Rodríguez", title: "Laboratório de Direito Penal",
    cover: "rose", label: "Prática com casos",
    reason: "Use depois da leitura teórica para aplicar os conceitos a casos criados para simulações de julgamento. A ficha editorial descreve dez casos da Parte Geral.",
    editions: [{ id: "rodriguez-book", year: null, name: "Edição impressa", format: "Impresso", isbn: "9788563182401", source: "https://www.bookinfometadados.com.br/books/view/9788563182401", sourceLabel: "Ver ficha editorial" }],
  },
];

export const topics = [
  {
    id: "dolo-eventual", readingTitle: "dolo eventual e culpa consciente", title: "Dolo eventual e culpa consciente", category: "Teoria do crime",
    aliases: ["dolo eventual", "culpa consciente", "dolo indireto", "diferença entre dolo e culpa", "dolo e culpa", "assumir o risco", "previsão do resultado", "artigo 18", "art 18"],
    intro: "As duas hipóteses podem envolver a previsão do resultado. A distinção está na atitude diante dessa possibilidade.",
    summary: "A diferença está na atitude diante do resultado previsto. Assumir o risco é diferente de confiar que o resultado será evitado.",
    answer: "No dolo eventual, a pessoa prevê o resultado e assume o risco de produzi-lo. Na culpa consciente, prevê o resultado, mas confia que conseguirá evitá-lo ou que ele não ocorrerá. Ao ler um caso, procure os fatos que sustentam essa diferença. Prever o resultado, por si só, não resolve a classificação.",
    focus: "Comece pela distinção do art. 18 entre crime doloso e culposo. A comparação com a culpa consciente é desenvolvida pela doutrina.",
    sources: [
      { title: "Dolo eventual e culpa consciente", by: "Conversando com o Nucci · GEN Jurídico", type: "Áudio aberto", note: "Uma introdução à distinção com o próprio autor.", url: "https://blog.grupogen.com.br/juridico/areas-de-interesse/penal/dolo-eventual-e-culpa-consciente/" },
      { title: "Código Penal · art. 18", by: "Câmara dos Deputados", type: "Texto oficial", note: "Compare os incisos I e II.", url: code + "#page=4" },
    ],
    refs: {
      "nucci-22": { where: "Capítulo XIV", detail: "Elementos Subjetivos do Crime: Dolo e Culpa", precision: "Capítulo verificado", url: books[0].editions[0].source, action: "Ver sumário da editora" },
      "nucci-22-epub": { where: "Capítulo XIV", detail: "Elementos Subjetivos do Crime: Dolo e Culpa", precision: "Capítulo verificado", url: books[0].editions[1].source, action: "Ver sumário da editora" },
      "nucci-18": { where: "Páginas 167 e 174", detail: "Capítulo XIV, item 5 para o conceito e item 13 para a comparação com culpa consciente.", precision: "Páginas verificadas no sumário", url: nucciContents, action: "Ver sumário da edição" },
      "nucci-14": { where: "Páginas 192 e 200", detail: "Capítulo XIV, item 5 para o conceito e item 13 para a comparação com culpa consciente.", precision: "Páginas verificadas no sumário", url: nucci2018Contents, action: "Ver sumário no STJ" },
      "cunha-2026": { where: "Página 327", detail: "O índice aponta uma pergunta sobre a diferença entre dolo eventual e culpa consciente.", precision: "Página verificada no sumário", url: cunhaContents + "#page=17", action: "Ver índice da editora" },
    },
  },
  {
    id: "omissao-impropria", readingTitle: "omissão própria e imprópria", title: "Omissão própria e imprópria", category: "Conduta e resultado",
    aliases: ["omissão imprópria", "omissão imprópria e dever de agir", "crime omissivo impróprio", "crimes omissivos", "omissão própria", "dever de agir", "posição de garantidor", "garantidor", "salva-vidas", "artigo 13", "art 13"],
    intro: "O que distingue a omissão própria da imprópria?",
    summary: "Na omissão própria, a lei descreve a falta de ação como crime. Na imprópria, a pessoa pode responder pelo resultado que devia e podia evitar.",
    answer: "Na omissão própria, a lei descreve a falta de ação como crime, como deixar de prestar assistência nas situações do art. 135 do Código Penal. Na omissão imprópria, a pessoa pode responder pelo resultado que deixou de impedir quando tinha o dever jurídico e a possibilidade de agir para evitá-lo, conforme o art. 13, § 2º.",
    focus: "Ao ler um caso, identifique primeiro de onde viria o dever de agir. Depois, examine o que a pessoa podia fazer nas circunstâncias.",
    sources: [
      { title: "Código Penal · art. 13, § 2º", by: "Câmara dos Deputados", type: "Texto oficial", note: "Leia as alíneas a, b e c para localizar as fontes do dever de agir.", url: code + "#page=3" },
      { title: "Omissão imprópria no Informativo 681", by: "Superior Tribunal de Justiça", type: "Jurisprudência", note: "Busque por “conduta omissiva imprópria” para ler um caso sobre a posição de garantidor.", url: "https://scon.stj.jus.br/docs_internet/informativos/PDF/Inf0681.pdf" },
    ],
    refs: {
      "nucci-18": { where: "Página 156", detail: "Capítulo XIII, item 5.3, sobre o nexo causal nos crimes omissivos próprios e impróprios.", precision: "Página verificada no sumário", url: nucciContents, action: "Ver sumário da edição" },
      "9788530987664": { where: "Página 160", detail: "Capítulo XIII, item 5.3, sobre o nexo causal nos crimes omissivos próprios e impróprios.", precision: "Página verificada no sumário", url: "https://sumarios.grupogen.com.br/jur/FOR/9788530987664_SUM.pdf", action: "Ver sumário da edição" },
      "bitencourt-2026": { where: "Capítulo XV", detail: "A Omissão e Suas Formas.", precision: "Capítulo verificado", url: books[2].editions[0].source, action: "Ver sumário da editora" },
    },
  },
  {
    id: "tentativa", readingTitle: "tentativa e desistência voluntária", title: "Tentativa e desistência voluntária", category: "Iter criminis",
    aliases: ["tentativa", "crime tentado", "desistência voluntária", "iter criminis", "circunstâncias alheias", "artigo 14", "artigo 15", "art 14", "art 15"],
    intro: "O que muda quando a execução é interrompida pela própria pessoa ou por uma circunstância externa?",
    summary: "Para distinguir a tentativa da desistência voluntária, observe o que interrompeu a execução e se a pessoa ainda podia prosseguir.",
    answer: "Na tentativa, a execução começa e a consumação deixa de ocorrer por circunstâncias alheias à vontade da pessoa. Na desistência voluntária, a própria pessoa decide interromper a execução quando ainda podia prosseguir. Nessa hipótese, o art. 15 prevê que ela responde pelos atos já praticados.",
    focus: "Leia os arts. 14, II, e 15 juntos. No enunciado, procure o fato que interrompeu a execução.",
    sources: [
      { title: "Código Penal · arts. 14 e 15", by: "Câmara dos Deputados", type: "Texto oficial", note: "Comece pelo inciso II do art. 14 e continue até o art. 15.", url: code + "#page=4" },
    ],
    refs: {
      "nucci-22": { where: "Capítulo XVIII", detail: "Crime Consumado e Tentativa", precision: "Capítulo verificado", url: books[0].editions[0].source, action: "Ver sumário da editora" },
      "nucci-22-epub": { where: "Capítulo XVIII", detail: "Crime Consumado e Tentativa", precision: "Capítulo verificado", url: books[0].editions[1].source, action: "Ver sumário da editora" },
      "nucci-18": { where: "Páginas 249 e 262", detail: "Capítulo XVIII, item 2 para tentativa e item 3 para desistência voluntária e arrependimento eficaz.", precision: "Páginas verificadas no sumário", url: nucciContents, action: "Ver sumário da edição" },
      "cunha-2026": { where: "Páginas 525 e 533", detail: "Itens 4, sobre tentativa, e 5.1, sobre desistência voluntária.", precision: "Páginas verificadas no sumário", url: cunhaContents + "#page=9", action: "Ver sumário da editora" },
    },
  },
];

export const course = {
  id: "penal-i", title: "Direito Penal",
  aliases: ["Direito Penal I", "penal 1", "penal i", "direito penal", "primeiro semestre penal", "livro de direito penal", "manual de penal", "teoria geral do crime", "parte geral", "dpu0206"],
};
