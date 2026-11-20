# Trelia.

Busque um tema, compare os livros indicados e veja onde começar a leitura na sua edição. A Trelia informa o capítulo, a seção ou a página conforme a fonte disponível.

**[Abrir a Trelia](https://trelia.vercel.app/)** · **[Planejar a expansão do acervo](data/catalogo/BRIEF-EXPANSAO.md)**

O acervo reúne Direito Penal I e leituras em Constitucional, Civil, Processo Civil, Administrativo, Trabalho e Tributário. Experimente buscar **“poder constituinte”** e trocar entre o impresso e o Bookshelf do Lenza. Em **“dolo eventual”**, o guia do Nucci de **2018** aponta para as páginas **192 e 200**.

O site usa HTML, CSS e módulos JavaScript. A Vercel serve `dist/` diretamente. O importador e a fila de curadoria ficam fora da pasta publicada.

## Rodar localmente

Com Python 3 instalado, execute na raiz do repositório:

~~~bash
python -m http.server 8000 --bind 127.0.0.1 --directory dist
~~~

Abra <http://127.0.0.1:8000/>. Um servidor HTTP é necessário para carregar os módulos JavaScript no navegador.

## Conferir uma mudança

~~~bash
node --check dist/app.mjs
node --check dist/data.mjs
git diff --check
~~~

Busque por **dolo eventual**, **Penal I** e um tema fora do catálogo. Confira a resposta breve e, no cartão do Nucci, troque para a edição de 2018. Abra a fonte da referência selecionada. Confira a composição com uma janela larga e outra estreita quando a interface mudar.

## Trabalho e publicação

- [AGENTS.md](AGENTS.md) reúne as instruções para trabalhar no projeto. [FLUXO.md](FLUXO.md) detalha o ciclo de produto e verificação.
- O [catálogo piloto](data/catalogo/README.md) guarda o fluxo de coleta e revisão de fichas. O conteúdo atualmente exibido está em [dist/data.mjs](dist/data.mjs).
- O [lote de expansão](data/catalogo/expansao/README.md) explica como validar os CSVs e regenerar os módulos estáticos por disciplina.
- Abra uma branch e revise as alterações em um pull request. Em um projeto conectado à Vercel, teste o endereço de prévia antes de mesclar no main.
- Importe o repositório na Vercel a partir da raiz. O arquivo vercel.json configura a publicação estática da pasta dist, sem etapa de build.
