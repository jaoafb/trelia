# Coleta bibliográfica de 20 de novembro de 2026

`procedencia.json` guarda o resumo e a fonte institucional da coleta. `obras/` preserva os grupos e registros entregues em arquivos separados pela primeira área do grupo. As demais áreas permanecem na ficha de origem. A RVBI fornece metadados bibliográficos. Formato e disponibilidade permanecem em aberto quando a ficha ainda não foi conferida.

`curadoria-novas-areas.json` guarda as indicações editoriais e os rascunhos de introdução. O gerador publica as recomendações com fonte e motivo, e só publica a localização vinculada ao ISBN da indicação. As introduções marcadas como rascunho ficam nos dados editoriais.

Para regenerar os módulos de `dist/catalogo/ampliado/`:

```bash
python -B scripts/gerar_catalogo_ampliado.py
```

Para atualizar o snapshot, informe o JSON original com `--coleta caminho.json`. O comando divide os grupos por área e valida os totais da coleta. O site carrega os módulos bibliográficos na primeira busca que os precisa e usa o índice curado nas buscas diretas por tema e disciplina. Os CSVs do lote anterior seguem em `expansao/`.
