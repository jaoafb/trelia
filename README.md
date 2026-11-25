# Trelia.

A **Trelia** ajuda estudantes de Direito a descobrir **quais livros tratam do assunto que desejam estudar** e **onde começar a leitura** em cada edição, quando houver uma referência conferida.

**[Abrir a Trelia](https://trelia.vercel.app/)** · [Política de curadoria](docs/CURADORIA_PARA_INICIANTES.md) · [Como contribuir](CONTRIBUTING.md)

## O que você encontra

- **Busca por temas e perguntas:** explicações breves e recomendações para dúvidas de estudo.
- **Referências por edição:** capítulo, seção ou página, somente quando o material consultado permite essa precisão.
- **Pesquisas sobre o tema:** artigos científicos como leituras complementares, com autoria e fonte identificadas.
- **Minhas leituras:** salve referências e retome a edição escolhida. Os itens ficam no armazenamento local **deste navegador**, sem conta nem sincronização entre dispositivos; limpar os dados do site pode apagá-los.
- **Avisos editoriais:** informações ainda pendentes de revisão e indicações sem comprovação bibliográfica aparecem identificadas.

Com a integração de novembro de 2026 ([PR #16](https://github.com/jaoafb/trelia/pull/16)), o catálogo chegou a **308 temas em 19 áreas jurídicas**. Essa é a contagem daquela entrega, não um número atualizado automaticamente.

> A Trelia é uma ferramenta de orientação de estudo. Ela não substitui a consulta à legislação vigente, à obra citada ou à bibliografia exigida pela disciplina.

## Estrutura do repositório

| Caminho | Responsabilidade |
|---|---|
| `dist/` | Aplicação estática em HTML, CSS e módulos JavaScript; é a pasta publicada na Vercel. |
| `dist/leituras-salvas.mjs` | Armazenamento local de **Minhas leituras**. |
| `data/catalogo/` | Dados editoriais, obras, fontes, lotes e pendências de revisão. |
| `scripts/` | Geração de módulos e verificações automatizadas. |
| `docs/CURADORIA_PARA_INICIANTES.md` | Política para seleção de leituras. |
| `AGENTS.md` e `FLUXO.md` | Orientações e processo de manutenção. |

Alguns módulos de `dist/` são gerados a partir das fontes em `data/catalogo/`. Use os respectivos geradores, descritos em [data/catalogo/README.md](data/catalogo/README.md), em vez de editar manualmente os arquivos gerados.

## Executar localmente

É necessário um servidor HTTP para carregar os módulos JavaScript. Com Python 3 instalado, na raiz:

```bash
python -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Acesse [http://127.0.0.1:8000/](http://127.0.0.1:8000/). Dependendo do ambiente, o comando pode ser `python3`.

## Verificar alterações

Com Node.js instalado, na raiz do projeto:

```bash
node --check dist/app.mjs
node --check dist/data.mjs
node scripts/smoke.mjs
node scripts/check-curadoria-ampliada.mjs
node scripts/check-leituras-gratuitas.mjs
node scripts/check-curadoria-novembro.mjs
node scripts/check-expansao-iii.mjs
git diff --check
```

Além dos testes, mudanças em recomendações precisam de verificação de edição, ISBN, capítulos, links e legislação. Alterações de interface exigem testes de navegação por teclado, desktop e celular. Trabalhe em uma branch e revise a prévia da Vercel em pull request antes de mesclar à `main`.

## Manutenção e condições de uso

- [CONTRIBUTING.md](CONTRIBUTING.md): contribuições, correções editoriais e critérios de revisão.
- [SECURITY.md](SECURITY.md): como comunicar falhas de segurança sem divulgação pública.
- [CHANGELOG.md](CHANGELOG.md): principais marcos do projeto.
- **Código-fonte:** [licença MIT](LICENSE.md), permitindo estudo, uso, modificação e redistribuição conforme seus termos.
- **Curadoria e demais materiais:** [escopo de licenciamento](LICENSING.md). Textos editoriais, bases de dados, imagens, marca e materiais de terceiros **não são liberados pela MIT**, mesmo quando aparecem em arquivos que também contêm código.
