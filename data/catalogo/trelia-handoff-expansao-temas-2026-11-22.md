# Trelia. — expansão editorial de oito áreas

Integre o arquivo `trelia-expansao-temas-2026-11-22.json` na worktree separada. A base editorial é o commit `f8176fddd0d4b0687ab523ee918945196844b317` da `main`. O lote propõe 32 temas, 32 respostas, 98 termos de busca e 32 perguntas indexáveis. As 23 indicações abrangem nove obras, com uma obra e uma edição novas. Há ainda 36 fontes oficiais e dois artigos de texto integral aberto.

| Área | Temas na base → com o lote | Dos quatro novos, quantos têm livro | Exemplos de novos temas |
|---|---:|---:|---|
| Ambiental | 1 → 5 | 2 | EIA/Rima, APP e Reserva Legal |
| Financeiro | 1 → 5 | 4 | Etapas da despesa, créditos adicionais |
| Eleitoral | 1 → 5 | 2 | Pré-campanha, prestação de contas |
| Internacional | 1 → 5 | 4 | Interpretação de tratados, homologação |
| Empresarial | 2 → 6 | 3 | Sociedade limitada, decretação da falência |
| Previdenciário | 2 → 6 | 4 | Período de graça, pensão por morte |
| Urbanístico | 3 → 7 | 3 | EIV, modalidades da Reurb |
| Propriedade Intelectual | 3 → 7 | 1 | Direitos morais e patrimoniais, indicações geográficas |

A integração leva a base de 169 a 201 temas nas mesmas 19 áreas. As oito áreas foram escolhidas pelo número de temas já disponíveis na `main`.

## Integração dos dados

1. Reaproveite as rotas e estruturas de área, tema e edição. Use `tema.id` para a rota, `area_id` para a disciplina, `titulo` para exibição e indexe `pergunta` e `termos_busca` nos aliases. Exiba `resposta`, `como_estudar` e as fontes, resolvendo `fonte_id` em `fontes_oficiais`. Preserve os IDs e os vínculos do catálogo.
2. Monte os cartões de livros a partir de `indicacoes_de_livro`. Mostre o motivo editorial e a localização da edição selecionada. Permita capítulo ou seção com página em branco. Em troca de edição, consulte a evidência da nova edição. A ficha com sumário público usa **Ver na editora**. Texto integral aberto usa **Ler gratuitamente**. A edição digital de Sacramone entra como compra, com o ISBN `9786551771545`.
3. Apresente a resposta e as referências oficiais nos nove temas listados em `pendencias.confirmar_livro`. Exiba **Livros recomendados** quando houver cartões confirmados. Use o tipo da fonte para diferenciar texto legal em HTML, PDF direto e página institucional com acesso ao manual. Informações de acesso descrevem os links de origem.
4. Use **Pesquisas sobre o tema** recolhida por padrão em `estudo-impacto-vizinhanca` e `unidades-de-conservacao`. Ao expandir, mostre pergunta investigada, método e **Por que ler?**, com ação **Ler gratuitamente** para o texto integral em HTML. Use o DOI como identificação. O Qualis permanece em branco. Preserve as indicações do piloto de Controle de fusões.

## Critérios de aceite

| Percurso | Resultado esperado |
|---|---|
| Buscar `APP e Reserva Legal` | Abre a nova ficha com explicação e artigo da lei. O tema está na fila de curadoria bibliográfica. |
| Buscar `Como se interpreta um tratado pela Convenção de Viena?` | Abre a pergunta específica, a Convenção e a indicação de Portela a partir da p. 122 no impresso de ISBN `9788544270646`. |
| Buscar `Em quais situações a falência pode ser decretada?` | A ficha mostra o cap. 18 de Campinho, com página em branco. |
| Abrir `loteamento e desmembramento` e alternar edições de José Afonso da Silva | Mostra p. 287 com o ISBN `9788544247648` de 2025. Ao trocar para a edição de 2006, a localização só aparece se houver evidência específica daquela edição. |
| Buscar `EIV` e expandir **Pesquisas sobre o tema** | Mostra o artigo sobre municípios paulistas e abre o texto integral em janela anônima. |
| Buscar `unidades de conservação` e expandir **Pesquisas sobre o tema** | Mostra o estudo de caso da APA de Petrópolis com o ano de 2011 e a indicação de leitura histórica. |
| Buscar `9788551903612` | Continua abrindo a ficha bibliográfica já existente, fora das recomendações do lote. |
| Buscar `controle de fusões` e abrir os materiais do Cade | Continua abrindo `atos-concentracao`. O conteúdo e os links já integrados continuam disponíveis. |

Executei a função de busca do repositório localmente com os 169 temas da base e as 32 fichas propostas. As 12 consultas registradas no JSON passaram. Após a integração, confira na worktree os percursos de interface, a abertura anônima e a troca de edição.
