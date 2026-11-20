# Expansão do acervo

O lote reúne 31 obras, 32 edições e formatos, 48 temas e 110 referências. A cobertura indica pontos de leitura por edição. As buscas e seus sinônimos são hipóteses editoriais para validar com estudantes.

Os CSVs são UTF-8 e delimitados por ponto e vírgula. O ISBN identifica a combinação de edição e formato. A coluna `pagina_inicial` corresponde à página do livro. O fragmento `#page=` aponta para a folha do PDF que sustenta a referência.

Para regenerar os módulos de `dist/catalogo/`, rode na raiz:

```bash
python scripts/gerar_acervo.py
```

O gerador valida os ISBNs, os vínculos entre tema, obra e edição, a precisão das páginas e as contagens editoriais. O site serve os módulos gerados a partir de `dist/`. Versione o CSV e o módulo gerado juntos.

Na bibliografia de Civil, a ficha editorial de Sílvio de Salvo Venosa retornou 404. A edição foi conferida pelo mesmo ISBN numa ficha comercial identificada como compra. A localização temática segue em aberto.
