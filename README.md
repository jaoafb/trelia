# Trelia.

Busque um tema e encontre livros para estudá-lo, com edição, capítulo ou página quando a fonte confirma a localização. O acervo publicado inicial cobre três temas de Direito Penal I.

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

Busque por **dolo eventual**, **Penal I** e um tema fora do catálogo. Abra e feche o resumo, confira uma referência de edição e troque para a edição de 2018 do Nucci no guia do tema. Confira a composição com uma janela larga e outra estreita quando a interface mudar.

## Trabalho e publicação

- [AGENTS.md](AGENTS.md) reúne as instruções para trabalhar no projeto. [FLUXO.md](FLUXO.md) detalha o ciclo de produto e verificação.
- O [catálogo piloto](data/catalogo/README.md) guarda o fluxo de coleta e revisão de fichas. O conteúdo atualmente exibido está em [dist/data.mjs](dist/data.mjs).
- Abra uma branch e revise as alterações em um pull request. Em um projeto conectado à Vercel, teste o endereço de prévia antes de mesclar no main.
- Importe o repositório na Vercel a partir da raiz. O arquivo vercel.json configura a publicação estática da pasta dist, sem etapa de build.
