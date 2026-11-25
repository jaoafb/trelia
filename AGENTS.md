# Trelia.

## Produto

A Trelia ajuda estudantes a descobrir quais livros tratam do assunto que querem estudar. O projeto começou com Direito Penal I e agora reúne 308 temas em 19 áreas jurídicas (marco do PR #16). A expansão deve aproveitar as estruturas de obra, edição, tema e fonte.

- **Encontrar livros por assunto.** Abra a seleção de livros ao buscar um tema. Mostre a explicação breve na própria página quando houver texto conferido. Para cada obra, reúna a edição, o trecho, a fonte e o motivo da indicação no cartão. Quando uma mudança acrescentar uma escolha ou uma tela, explique qual dificuldade isso resolve.
- **Estudar uma área.** Organize poucas obras por finalidade. Explique para quem serve cada indicação, o que cobre e onde pode ser consultada.
- **Resolver uma dúvida.** Ofereça uma explicação breve, uma fonte para conferência e a localização na obra quando houver evidência para aquela edição.
- **Encontrar o material.** Identifique o tipo de acesso confirmado, como texto aberto, prévia, acesso institucional ou compra. Ordene por pertinência ao estudo. Quando houver comissão, identifique o link e mantenha a ordenação editorial.

## Antes de editar

1. Confira o estado do Git e leia [FLUXO.md](FLUXO.md). Preserve o trabalho existente.
2. Formule o resultado esperado do ponto de vista do estudante. Use uma busca real ou uma ação concreta como critério de aceite.
3. Procure primeiro nos dados e no código atuais. Reaproveite as rotas, componentes e estruturas que já atendem à tarefa.

## Conteúdo e fontes

- Use ISBN para identificar **edição e formato**. Agrupe as edições pelo identificador da obra. Confirme os dados que importam para a indicação em um catálogo confiável ou na editora.
- Registre a localização mais precisa que a fonte permite afirmar: capítulo, seção ou página. Uma página confirmada para a edição impressa de 2022 pertence a essa edição. Para edição ou formato sem localização verificada, deixe a referência em aberto na interface.
- Guarde o link da evidência com a indicação. Diferencie fato confirmado, sugestão editorial e limitação de acesso. Prefira o texto oficial para legislação, o sumário da edição para localização e a referência doutrinária para interpretações. Indique divergências quando forem relevantes à dúvida.
- Use explicações próprias e links para as fontes. Aproveite materiais abertos conforme as condições de reutilização. Use sinônimos e termos reais de busca como entradas adicionais para o mesmo tema.

- Para coletar e revisar candidatos de outras áreas, siga o [fluxo do catálogo](data/catalogo/README.md). Mantenha a evidência e a decisão editorial junto a cada ficha.

- Consulte obrigatoriamente a [política de curadoria para iniciantes](docs/CURADORIA_PARA_INICIANTES.md) ao criar, revisar ou ampliar recomendações de livros, especialmente as destinadas a estudantes iniciantes.

## Licenciamento e leituras salvas

- O **código-fonte original** é disponibilizado sob [MIT](LICENSE.md), dentro dos limites de [LICENSING.md](LICENSING.md). Essa licença **não se estende automaticamente** a textos editoriais, bases de curadoria, identidade visual e materiais de terceiros, inclusive quando incorporados a módulos JavaScript.
- **Minhas leituras** armazena referências localmente no navegador. Não introduza contas, sincronização ou coleta de dados sem uma decisão explícita do produto.
- Consulte [CONTRIBUTING.md](CONTRIBUTING.md) e [SECURITY.md](SECURITY.md) para contribuições e relatos de vulnerabilidades.

## Código atual

Prefira uma estrutura modular. Organize código e dados por responsabilidade e distribua arquivos e pastas quando começarem a concentrar assuntos independentes. Mantenha próximos os arquivos usados juntos e use nomes que indiquem seu papel. Ao ampliar o acervo ou a interface, revise se a estrutura ainda facilita localizar, editar e revisar cada parte. Extraia módulos com uma responsabilidade clara e preserve as rotas e os pontos de entrada existentes.

O site é estático e usa HTML, CSS e módulos JavaScript. `dist/` contém o código editável e também é a pasta servida. O arquivo vercel.json configura a publicação estática da pasta dist.

| Arquivo | Responsabilidade |
|---|---|
| `dist/data.mjs` | Obras, edições, guias, referências e lógica de busca. |
| `dist/app.mjs` | Rotas por hash, telas, seletor de edição e formulário que copia o feedback. |
| `dist/index.html` | Estrutura da página, navegação e diálogo de feedback. |
| `dist/style.css` | Tipografia, layout responsivo e estados de interação. |
| `dist/leituras-salvas.mjs` | Persistência local de referências salvas. |
| `scripts/gerar_curadoria_novembro.py` | Geração dos módulos de curadoria de novembro. |

- Preserve os links compartilhados quando alterar rotas ou identificadores. Se precisar trocar um endereço, mantenha um caminho para o destino equivalente.
- Renderize entradas do usuário como texto. Preserve navegação por teclado, rótulos dos controles e leitura no celular.
- Adicione API, banco, autenticação ou ferramenta de busca quando a necessidade concreta justificar o custo. O fluxo em `FLUXO.md` descreve como avaliar essa escolha.

## Verificação e entrega

- Rode `git diff --check`. Para mudanças nos módulos, rode `node --check dist/app.mjs` e `node --check dist/data.mjs`.
- Teste o comportamento que mudou. Quando mexer na busca ou na estrutura dos dados, confira também “Penal I”, “dolo eventual”, uma busca sem resultado e a troca de edição do Nucci.
- Para conteúdo novo, abra os links e compare a referência mostrada com a fonte. Para mudanças na interface, verifique o percurso em desktop e celular quando houver navegador disponível.
- Na entrega, informe o que mudou, como foi verificado e o que ficou pendente. Trabalhe em uma branch e entregue um pull request. Quando o GitHub estiver conectado à Vercel, confira a prévia antes da integração ao main e valide as rotas pelo endereço publicado.


## Histórico de verificação jurídica

- A fonte editorial é `data/catalogo/trelia-revisao-juridica-2026-11-24.json`, com **um registro por tema pendente** na data-base. Registre apenas eventos efetivamente executados, com data, escopo, resumo da evidência, links oficiais e pontos não concluídos.
- Use `pendente_revisao_juridica` quando não houver revisão substantiva; `revisao_parcial` para verificação delimitada; `revisao_concluida_no_escopo` **somente** quando a síntese introdutória inteira, dentro do escopo declarado, tiver sido confrontada com fontes oficiais relevantes. A conclusão não é atestado de validade jurídica eterna.
- Não remova `editorialPending` com base em mero funcionamento de URL, notícia isolada ou verificação de bibliografia. Registre mudanças legislativas com marco temporal de produção de efeitos e fontes; preserve dúvidas sobre a aplicabilidade dos precedentes.
- Mantenha o histórico de eventos anteriores; não sobrescreva registros passados. Regere o módulo com `python scripts/gerar_curadoria_novembro.py`, valide com `node scripts/check-revisao-juridica.mjs` e confira a seção acessível em desktop e celular.
