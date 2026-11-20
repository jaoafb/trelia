// GERADO por scripts/gerar_curadoria_ampliada.py — não edite à mão
export default {
  "temas": [
    {
      "id": "marca-vs-patente",
      "area_id": "propriedade-intelectual",
      "titulo": "Marca e patente",
      "operacao": "adicionar",
      "consultas": [
        "Qual a diferença entre marca e patente?",
        "registro de marca ou patente",
        "marca versus patente",
        "marca e patente",
        "patentear uma marca",
        "proteção do nome ou da invenção"
      ],
      "explicacao": {
        "texto": "A marca distingue produtos ou serviços, como um nome ou símbolo usado para identificá-los. A patente protege uma invenção ou um modelo de utilidade que cumpra os requisitos legais. Para separar os institutos, identifique se o pedido pretende proteger um sinal distintivo ou uma solução técnica.",
        "status_revisao": "conferida_nas_fontes",
        "fontes": [
          {
            "fonte_id": "lpi",
            "recorte": "Arts. 8º, 9º, 122 e 129"
          },
          {
            "fonte_id": "inpi-marcas",
            "recorte": "Conceito de marca"
          },
          {
            "fonte_id": "inpi-deposito-patentes",
            "recorte": "Objetos protegidos por patente"
          }
        ],
        "revisada_em": "2026-11-20"
      }
    },
    {
      "id": "registro-de-marca",
      "area_id": "propriedade-intelectual",
      "titulo": "Registro de marca",
      "operacao": "adicionar",
      "consultas": [
        "Como se adquire direito sobre uma marca?",
        "como registrar marca no INPI?",
        "marca registrada",
        "registro de marca no INPI",
        "quem registra marca?",
        "exclusividade sobre marca"
      ],
      "explicacao": {
        "texto": "A propriedade da marca se adquire com o registro validamente concedido pelo INPI. O registro assegura uso exclusivo no território nacional nos termos da lei, dentro do âmbito de proteção da marca. Protocolar o pedido é a etapa inicial, e a concessão depende do exame pelo instituto.",
        "status_revisao": "conferida_nas_fontes",
        "fontes": [
          {
            "fonte_id": "lpi",
            "recorte": "Arts. 122, 124 e 129"
          },
          {
            "fonte_id": "inpi-marcas",
            "recorte": "Etapas para pedir o registro"
          }
        ],
        "revisada_em": "2026-11-20"
      }
    },
    {
      "id": "patenteabilidade",
      "area_id": "propriedade-intelectual",
      "titulo": "Requisitos da patente de invenção",
      "operacao": "adicionar",
      "consultas": [
        "O que pode ser patenteado?",
        "requisitos da patente de invenção",
        "requisitos de patenteabilidade",
        "novidade atividade inventiva e aplicação industrial",
        "patenteabilidade no Brasil",
        "art 8 LPI"
      ],
      "explicacao": {
        "texto": "A patente de invenção exige novidade, atividade inventiva e aplicação industrial. A análise verifica se a solução já estava acessível ao público, se decorre de modo evidente do conhecimento anterior para um técnico no assunto e se pode ser produzida ou utilizada em alguma indústria. A lei também prevê exclusões.",
        "status_revisao": "conferida_nas_fontes",
        "fontes": [
          {
            "fonte_id": "lpi",
            "recorte": "Arts. 8º, 10, 11, 13, 15 e 18"
          },
          {
            "fonte_id": "inpi-deposito-patentes",
            "recorte": "O que pode e o que não pode ser patenteado"
          }
        ],
        "revisada_em": "2026-11-20"
      }
    }
  ],
  "indicacoes": [
    {
      "id": "marca-vs-patente--barbosa-introducao-pi",
      "tema_id": "marca-vs-patente",
      "obra_id": "barbosa-introducao-pi",
      "motivo": "Compare o objeto dos dois regimes em uma leitura doutrinária aberta. Confira detalhes legais na fonte oficial atual.",
      "revisao": "cobertura_conferida",
      "prioridade": 1,
      "cobertura_por_edicao": [
        {
          "edicao_id": "barbosa-intro-2-pdf",
          "fonte_id": "barbosa-intro",
          "evidencia": "O PDF começa a seção de patentes na p. 295 e a de signos distintivos na p. 695.",
          "localizacao": {
            "secao": "Patentes e Signos distintivos",
            "pagina_inicial": 295,
            "paginacao": "paginacao_da_obra",
            "evidencia_tipo": "publicacao",
            "paginas_adicionais": [
              695
            ]
          }
        }
      ]
    },
    {
      "id": "marca-vs-patente--inpi-guia-marcas",
      "tema_id": "marca-vs-patente",
      "obra_id": "inpi-guia-marcas",
      "motivo": "Comece pela função da marca com o INPI e compare com o guia de patentes.",
      "revisao": "cobertura_conferida",
      "prioridade": 2,
      "cobertura_por_edicao": [
        {
          "edicao_id": "inpi-guia-marcas-html",
          "fonte_id": "inpi-marcas",
          "evidencia": "O Guia Básico define marca e explica a exclusividade decorrente do registro.",
          "localizacao": null
        }
      ]
    },
    {
      "id": "marca-vs-patente--cni-deposito-patentes",
      "tema_id": "marca-vs-patente",
      "obra_id": "cni-deposito-patentes",
      "motivo": "Veja quais objetos recebem proteção patentária e como se distinguem de sinais distintivos.",
      "revisao": "cobertura_conferida",
      "prioridade": 3,
      "cobertura_por_edicao": [
        {
          "edicao_id": "cni-deposito-patentes-2026-pdf",
          "fonte_id": "inpi-deposito-patentes",
          "evidencia": "A seção explica os objetos patenteáveis e os requisitos da patente de invenção.",
          "localizacao": {
            "secao": "O que pode e o que não pode ser patenteado",
            "pagina_inicial": 23,
            "paginacao": "paginacao_da_obra",
            "evidencia_tipo": "publicacao"
          }
        }
      ]
    },
    {
      "id": "registro-de-marca--inpi-guia-marcas",
      "tema_id": "registro-de-marca",
      "obra_id": "inpi-guia-marcas",
      "motivo": "Entenda o caminho do depósito ao exame antes de consultar a doutrina.",
      "revisao": "cobertura_conferida",
      "prioridade": 1,
      "cobertura_por_edicao": [
        {
          "edicao_id": "inpi-guia-marcas-html",
          "fonte_id": "inpi-marcas",
          "evidencia": "O guia reúne orientações sobre condições de registro, pedido e acompanhamento.",
          "localizacao": null
        }
      ]
    },
    {
      "id": "registro-de-marca--barbosa-introducao-pi",
      "tema_id": "registro-de-marca",
      "obra_id": "barbosa-introducao-pi",
      "motivo": "Aprofunde o alcance da exclusividade. Para o procedimento atual, use o INPI.",
      "revisao": "cobertura_conferida",
      "prioridade": 2,
      "cobertura_por_edicao": [
        {
          "edicao_id": "barbosa-intro-2-pdf",
          "fonte_id": "barbosa-intro",
          "evidencia": "O sumário separa procedimento, especialidade e limites do direito adquirido.",
          "localizacao": {
            "secao": "Signos distintivos: conteúdo e limites do direito de marca registrada",
            "pagina_inicial": 733,
            "paginacao": "paginacao_da_obra",
            "evidencia_tipo": "publicacao"
          }
        }
      ]
    },
    {
      "id": "patenteabilidade--cni-deposito-patentes",
      "tema_id": "patenteabilidade",
      "obra_id": "cni-deposito-patentes",
      "motivo": "Leia os requisitos com exemplos. Continue pelo quadro de exclusões para aplicar os critérios a exemplos.",
      "revisao": "cobertura_conferida",
      "prioridade": 1,
      "cobertura_por_edicao": [
        {
          "edicao_id": "cni-deposito-patentes-2026-pdf",
          "fonte_id": "inpi-deposito-patentes",
          "evidencia": "A seção explica os três requisitos legais da patente de invenção.",
          "localizacao": {
            "secao": "O que pode e o que não pode ser patenteado",
            "pagina_inicial": 23,
            "paginacao": "paginacao_da_obra",
            "evidencia_tipo": "publicacao"
          }
        }
      ]
    },
    {
      "id": "patenteabilidade--barbosa-introducao-pi",
      "tema_id": "patenteabilidade",
      "obra_id": "barbosa-introducao-pi",
      "motivo": "Aprofunde cada requisito e confronte o texto doutrinário com os artigos atuais da lei.",
      "revisao": "cobertura_conferida",
      "prioridade": 2,
      "cobertura_por_edicao": [
        {
          "edicao_id": "barbosa-intro-2-pdf",
          "fonte_id": "barbosa-intro",
          "evidencia": "O sumário aponta uma seção própria de requisitos e outra sobre inventos excluídos.",
          "localizacao": {
            "secao": "Patentes: requisitos da patente de invenção",
            "pagina_inicial": 318,
            "paginacao": "paginacao_da_obra",
            "evidencia_tipo": "publicacao"
          }
        }
      ]
    }
  ],
  "ordem_das_leituras": [
    {
      "tema_id": "marca-vs-patente",
      "obra_ids": [
        "barbosa-introducao-pi",
        "inpi-guia-marcas",
        "cni-deposito-patentes"
      ]
    },
    {
      "tema_id": "registro-de-marca",
      "obra_ids": [
        "barbosa-introducao-pi",
        "inpi-guia-marcas"
      ]
    },
    {
      "tema_id": "patenteabilidade",
      "obra_ids": [
        "barbosa-introducao-pi",
        "cni-deposito-patentes"
      ]
    }
  ]
};
