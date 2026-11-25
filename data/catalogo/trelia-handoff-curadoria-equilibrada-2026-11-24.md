# Trelia — Handoff editorial: curadoria equilibrada (24/11/2026)

## O que foi entregue

- **38 novos temas explicados**, exatamente 2 em cada uma das **19 áreas**.
- **10 artigos científicos** em periódicos, todos com autoria e DOI registrados.
- **12 vínculos candidatos com livros já no catálogo**, sem transformar esses vínculos em recomendação aprovada por edição.
- **12 obras pré-selecionadas na rodada anterior**, registradas como candidatas, não como capítulos verificados.
- Fonte de verdade: `trelia-curadoria-equilibrada-2026-11-24.json`.

## Escopo editorial

A classificação ‘primeira leitura’ é só uma das funções da curadoria; priorizar diversidade entre introdução, acompanhamento, doutrina especializada, artigos acadêmicos e materiais gratuitos. Não substituir estudos específicos por livros gerais e não encher toda ficha de títulos introdutórios.

## Integração técnica solicitada

1. Antes de alterar arquivos, leia `AGENTS.md`, `FLUXO.md`, `docs/CURADORIA_PARA_INICIANTES.md` (na worktree que contém o documento) e `data/catalogo/README.md`.
2. Trabalhe em worktree separada, sem destruir alterações preexistentes. Esta entrega NÃO foi integrada nem publicada.
3. Cruzar os 38 IDs e assuntos com os arquivos fonte atuais, os 32 temas do lote de 22/11 e a base já existente. Em colisões semânticas, mescle ou transforme em atualização, sem duplicar.
4. Inserir temas e artigos nos arquivos fonte apropriados, não editar módulos `dist/**` gerados à mão.
5. Respeitar `status` dos livros: não chamar candidatos de ‘recomendado para iniciantes’ nem atribuir capítulo/página sem fonte da edição. Livros só entram na interface quando evidência editorial suficiente estiver disponível.
6. Artigos com autores múltiplos devem manter todos os créditos. Não confundir artigo, capítulo de livro, organização, edição e coautoria.
7. Não prometer PDF direto; abrir landing oficial do artigo quando disponível. Se PDF legal for disponibilizado, conferir licença e estabilidade.
8. Verificar URLs, acessibilidade, links de busca, duplicação por área, regressões de conteúdo e estados de revisão.
9. Não abrir PR, não fazer merge/push/deploy sem solicitação.

## Temas por área

- **administrativo**: Pedidos de acesso à informação pública; Sanções nas licitações e contratos públicos
- **ambiental**: Logística reversa e responsabilidade pós-consumo; Política Nacional de Educação Ambiental
- **civil**: Sucessão legítima e sucessão testamentária; Herdeiros necessários e legítima
- **constitucional**: Direito de reunião e manifestação; Estado de defesa e estado de sítio
- **consumidor**: Publicidade enganosa e abusiva; Prevenção e tratamento do superendividamento
- **digital**: Controlador e operador na LGPD; Comunicação de incidentes com dados pessoais
- **economico**: Programas de compliance concorrencial; Cláusulas de exclusividade em plataformas digitais
- **eleitoral**: Federações partidárias; Sistema eleitoral proporcional
- **empresarial**: Estabelecimento empresarial; Títulos de crédito e seus requisitos
- **financeiro**: PPA, LDO e LOA; Restos a pagar
- **internacional**: Refúgio e reconhecimento da condição de refugiado; Tratados de direitos humanos e hierarquia normativa
- **penal-i**: Omissão imprópria e posição de garantidor; Dolo eventual e culpa consciente
- **previdenciario**: Aposentadoria especial; Benefício de Prestação Continuada (BPC/LOAS)
- **processo-civil**: Negócios jurídicos processuais; Sistema de precedentes no CPC
- **processo-penal**: Busca pessoal no processo penal; Direito ao silêncio no interrogatório
- **propriedade-intelectual**: Registro de desenho industrial; Segredo industrial e concorrência desleal
- **trabalho**: Teletrabalho e trabalho remoto; Discriminação no acesso e manutenção do trabalho
- **tributario**: Restituição de tributo pago indevidamente; Responsabilidade tributária por sucessão
- **urbanistico**: Direito de preempção urbanística; Operações urbanas consorciadas

## Qualidade e pendências

- Os 32 temas do lote de 22/11 continuam editoriais, não necessariamente publicados. Se ambos os lotes forem integrados, o catálogo projetado passa de 201 para **239 temas**, condicionado à deduplicação final.
- A literatura científica é complementar aos livros; artigos de outra área (ex.: administração, ciência política, engenharia) são admitidos se a pertinência jurídica for justificada.
- Algumas pesquisas são empíricas e historicamente situadas; não apresentá-las como normas em vigor.
- Nenhum capítulo, página, ISBN ou autoria de livro foi inferido para uma edição sem fonte própria nesta entrega.

## Estado

Pronto para revisão e importação técnica pelo Codex após a checagem de duplicidade e a confirmação de fontes pendentes.
