# Lote piloto do catálogo jurídico

Este lote testa a expansão para Constitucional, Civil, Processo Civil, Administrativo, Trabalho e Tributário. Os registros vieram da Rede Virtual de Bibliotecas do Senado, com enriquecimento por ISBN da BrasilAPI quando havia um identificador inequívoco. O recorte é uma amostra bibliográfica sobre as áreas, com obras recentes, antigas e especializadas. A seleção para graduação ainda depende da verificação da edição e da finalidade de cada obra.

## Arquivos

- [lote-piloto.json](piloto-rvbi/lote-piloto.json) guarda a procedência de cada candidato, os critérios da classificação sugerida, os links do registro e o resultado das consultas à BrasilAPI.
- [lote-piloto.csv](piloto-rvbi/lote-piloto.csv) é a fila de revisão. A triagem inicial usa o título, os assuntos e a data do registro. Preencha os campos de acesso e fonte de verificação ao conferir o material.

O JSON preserva o estado produzido pelo importador. As decisões editoriais ficam no CSV. Ambos estão fora de `dist/`, a pasta servida pelo site.

Para gerar as fichas bibliográficas pesquisáveis do piloto, execute `python scripts/gerar_fichas_rvbi.py` na raiz. O gerador organiza os registros por área, publica o link MARC de origem e preserva os ISBNs declarados. Registros com mais de um ISBN mantêm a lista da ficha até a confirmação do formato de cada um. A importação bibliográfica não cria recomendações temáticas.

Os textos de orientação e as recomendações complementares ficam em `dist/catalogo/editorial.mjs`. Uma recomendação liga tema e obra, guarda o motivo editorial e aponta para a evidência da cobertura. A localização, quando confirmada, fica na referência da edição correspondente. Os guias citam suas fontes separadamente.

## Gerar outro lote

Use Python 3 na raiz do repositório. O importador usa a biblioteca padrão.

```bash
python3 scripts/importar_catalogo.py \
  --pages 30 --per-area 10 --enrich \
  --out /tmp/caderno-novo-lote
```

O importador registra o total recebido e a seleção por área. O parâmetro `--pages` limita as páginas consultadas e o resultado pode ficar abaixo da meta por área. Use um novo destino para preservar o lote revisado. O parâmetro `--xml` aceita respostas OAI-PMH já baixadas para repetir a seleção sobre os mesmos registros. A BrasilAPI é consultada apenas com `--enrich`.

## Revisar uma ficha

1. Confira se a área sugerida é a principal para o uso na Trelia. Adicione áreas secundárias se houver uma relação pertinente.
2. Confira título, autoria, edição, ano e volume. Use o ISBN da edição e do formato adequados. Quando houver vários ISBNs no registro, confira cada formato pela ficha editorial antes de escolher um.
3. Abra os links e identifique o que o leitor pode acessar. Uma nota de conteúdo pode indicar capítulos. Um link associado ao registro pode levar a um sumário, a uma norma citada ou a outro recurso relacionado. Marque acesso aberto somente após conferir a disponibilidade do texto.
4. Informe a decisão editorial e cite a fonte que sustenta a indicação. Um livro antigo pode servir a uma pesquisa histórica. Para recomendá-lo como apoio à disciplina atual, confira a edição e as mudanças legislativas relevantes à indicação.

## Referências recentes para conferir em paralelo

São exemplos com ISBN e edição nas páginas das editoras. Podem orientar a curadoria inicial quando a RVBI trouxer edições antigas ou obras muito especializadas. A lista tem finalidade de comparação e permite conferir a pertinência com uma bibliografia da disciplina.

| Área | Obra |
|---|---|
| Constitucional | [Pedro Lenza, Direito Constitucional Esquematizado, 30ª ed., 2026](https://www.grupogen.com.br/livro-direito-constitucional-colecao-esquematizado-30-edicao-2026-pedro-lenza-saraiva-jur-9786551771866) |
| Civil | [Farias, Netto e Rosenvald, Manual de Direito Civil, 2026](https://www.editorajuspodivm.com.br/manual-de-direito-civil-volume-unico-2026-farias-netto-rosenvald) |
| Processo Civil | [Fredie Didier Jr., Curso de Direito Processual Civil, v. 1, 2026](https://www.editorajuspodivm.com.br/curso-de-direito-processual-civil-v1-2026-didier-jr) |
| Administrativo | [Maria Sylvia Zanella Di Pietro, Direito Administrativo, 39ª ed., 2026](https://www.grupogen.com.br/livro-direito-administrativo-39-edicao-2026-maria-sylvia-zanella-di-pietro-editora-forense-9788530998653) |
| Trabalho | [Rogério Renzetti, Livro Aula de Direito do Trabalho, 2026](https://www.editorajuspodivm.com.br/livro-aula-direito-do-trabalho-2026-rogerio-renzetti) |
| Tributário | [Mateus Pontalti, Manual de Direito Tributário, 2026](https://www.editorajuspodivm.com.br/manual-de-direito-tributario-2026-pontalti) |

Fontes técnicas

- [Senado Federal, intercâmbio de dados bibliográficos da RVBI](https://www12.senado.leg.br/institucional/biblioteca/rvbi/vocabulario-controlado-basico-e-classificacao-decimal-de-direito)
- [BrasilAPI, documentação](https://brasilapi.com.br/docs#tag/ISBN)
