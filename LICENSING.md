# Escopo do licenciamento da Trelia

A Trelia tem **licenciamento separado para código e conteúdo**. O fato de os arquivos estarem no mesmo repositório não concede uma licença única a tudo que ali aparece.

## Código-fonte — MIT

O **código-fonte original** da Trelia é disponibilizado sob a [licença MIT](LICENSE.md), na medida em que seus titulares podem conceder essa autorização. Isso abrange a lógica da aplicação, os componentes de interface, os scripts e as configurações de desenvolvimento e publicação, incluindo, quando originais do projeto:

- o código HTML, CSS e JavaScript de `dist/`;
- os scripts de geração, importação e testes de `scripts/`;
- configurações de automação em `.github/workflows/` e `vercel.json`;
- a documentação técnica associada ao uso desse código.

A MIT autoriza uso, cópia, modificação, distribuição e uso comercial do **código abrangido**, observadas as condições de manutenção do aviso de direitos e da licença.

## Curadoria, bases de dados e textos — fora da MIT

A licença MIT **não concede autorização de reutilização** para os seguintes conteúdos, independentemente da pasta ou formato em que estejam:

- os lotes, fichas e conjuntos de dados editoriais de `data/catalogo/`;
- títulos de fichas, resumos, explicações, perguntas de estudo, justificativas, descrições bibliográficas redigidas e demais textos de curadoria, **inclusive quando incorporados a módulos JavaScript ou páginas HTML de `dist/`**;
- textos editoriais e documentos de política de curadoria que não sejam mera documentação técnica do código.

Esses materiais não recebem, por este documento, uma licença aberta de redistribuição ou exploração comercial. Qualquer uso deverá respeitar os direitos e autorizações aplicáveis. Essa separação **não reivindica exclusividade sobre fatos, dados brutos, leis, ideias ou outros elementos que não sejam protegidos por direitos autorais**. Uma licença específica para a curadoria poderá ser definida posteriormente.

## Nome, marca, elementos visuais e terceiros

O nome **Trelia**, seus sinais distintivos, logotipos, elementos gráficos e eventuais marcas não são licenciados para uso como identidade de outro produto pela MIT. A disponibilização de código não implica permissão de representação oficial, endosso ou uso de marca.

Livros, artigos, capas, imagens, conteúdos institucionais e materiais de terceiros preservam suas respectivas condições de uso. Referenciar uma fonte ou incluir um link não transfere direitos sobre ela. A Trelia também não concede direitos que não detenha.

## Arquivos mistos e reutilização

Um arquivo pode conter **código MIT e conteúdo não licenciado sob MIT ao mesmo tempo**. Por exemplo, quem reutilizar um módulo JavaScript com lógica de busca deverá separar a lógica dos textos e dados editoriais antes de redistribuir o material, salvo se tiver outra autorização aplicável.

Para contribuir, veja [CONTRIBUTING.md](CONTRIBUTING.md). Para esclarecer permissões adicionais sobre o conteúdo, entre em contato com o responsável pelo repositório.

Este documento descreve o alcance da licença e não substitui as regras de direitos autorais e demais normas aplicáveis.
