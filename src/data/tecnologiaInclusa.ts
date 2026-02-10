import type { TecnologiaInclusa, FunisAdicionaisConfig } from "@/types";

export const tecnologiaInclusa: TecnologiaInclusa = {
  starter: {
    experienceFlix: {
      plano: "STARTER",
      descricao: "1 Area de Membros. Ate 100 usuarios ativos/mes",
      recursos: [
        "Vitrine Personalizada estilo Netflix",
        "Trilhas de aprendizado",
        "Plataforma 100% Whitelabel com Dominio Proprio",
        "Integracao com Gateway de Pagamento Externo",
        "Integracao com Vimeo e YouTube",
        "Atendimento via Whatsapp e Suporte Tecnico",
      ],
      limites: {
        areas: 1,
        usuariosAtivos: 100,
        custoExcedente: 3.0,
      },
      valorAvulso: {
        entrada: 497,
        mensal: 497,
        anuidade: 5964,
      },
    },

    funnelPages: {
      plano: "STARTER",
      descricao: "Pagina de Links + 1 Funil",
      funis: ["1x Funil de Sessao Estrategica / Aplicacao de Produto"],
      automacao: [
        "Squad de desenvolvimento (copy/design/dev)",
        "Pagina de obrigado integrada ao WhatsApp",
        "Atendimento via WhatsApp e Suporte Tecnico",
      ],
      quantidade: {
        paginaLinks: 1,
        funis: 1,
      },
      valorAvulso: {
        mensal: 197,
        anuidade: 2364,
      },
    },

    totalTecnologia: {
      mensal: 694,
      anuidade: 8328,
    },
  },

  professional: {
    experienceFlix: {
      plano: "PROFESSIONAL",
      descricao: "3 Areas de Membros. Ate 150 usuarios ativos/mes",
      recursos: [
        "TUDO DO STARTER",
        "Producao de banners e capas para toda plataforma",
        "Atendimento dedicado para postagem de conteudos",
      ],
      limites: {
        areas: 3,
        usuariosAtivos: 150,
        custoExcedente: 2.5,
      },
      valorAvulso: {
        entrada: 997,
        mensal: 997,
        anuidade: 11964,
      },
    },

    funnelPages: {
      plano: "PROFESSIONAL",
      descricao: "Pagina de Links + 3 Funis",
      funis: [
        "1x Funil de Sessao Estrategica / Aplicacao de Produto",
        "1x Funil de Evento de Lancamento (Gratuito / Pago)",
        "1x Funil de Isca Digital Perpetuo (Gratuito / Pago)",
      ],
      automacao: [
        "TUDO DO STARTER",
        "Automacao para envio de e-mails de confirmacao",
        "Integracao dos inscritos no CRM/Planilha de inscritos",
      ],
      quantidade: {
        paginaLinks: 1,
        funis: 3,
      },
      valorAvulso: {
        mensal: 397,
        anuidade: 4764,
      },
    },

    totalTecnologia: {
      mensal: 1394,
      anuidade: 16728,
    },
  },

  business: {
    experienceFlix: {
      plano: "BUSINESS",
      descricao: "3 Areas de Membros. Membros ilimitados",
      recursos: [
        "TUDO DO PROFESSIONAL",
        "Comunidade integrada com multiplos canais",
        "Sessao de onboarding coletivo",
        "Campanha 20mil disparos",
        "Bonus: 200GB armazenamento + 300GB banda",
      ],
      limites: {
        areas: 3,
        usuariosAtivos: "Ilimitado",
        custoExcedente: 0,
      },
      valorAvulso: {
        entrada: 1497,
        mensal: 1497,
        anuidade: 17964,
      },
    },

    funnelPages: {
      plano: "BUSINESS",
      descricao: "Pagina de Links + 5 Funis",
      funis: [
        "1x Funil de Sessao Estrategica",
        "1x Funil de Isca Digital Perpetuo",
        "1x Funil de Evento de Lancamento",
        "2x Funil de Aplicacao de Produto",
      ],
      automacao: [
        "TUDO DO PROFESSIONAL",
        "Automacao / Sequencia de Nutricao via E-mail Marketing",
      ],
      quantidade: {
        paginaLinks: 1,
        funis: 5,
      },
      valorAvulso: {
        mensal: 597,
        anuidade: 7164,
      },
    },

    totalTecnologia: {
      mensal: 2094,
      anuidade: 25128,
    },
  },

  scale: {
    experienceFlix: {
      plano: "SCALE",
      descricao: "Membros e Conteudos ilimitados + App Proprio",
      recursos: [
        "TUDO DO BUSINESS",
        "App proprio",
        "Aulas ao vivo (YouTube, Vimeo, Zoom)",
        "Campanha 50mil disparos",
        "5 Automacoes + 1 WhatsApp conexao + 1 Chip",
        "Bonus: 500GB armazenamento + 1TB banda",
      ],
      limites: {
        areas: "Ilimitado",
        usuariosAtivos: "Ilimitado",
        custoExcedente: 0,
      },
      valorAvulso: {
        entrada: 1997,
        mensal: 1997,
        anuidade: 23964,
      },
    },

    funnelPages: {
      plano: "SCALE",
      descricao: "Pagina de Links + 7 Funis",
      funis: [
        "1x Funil de Sessao Estrategica",
        "2x Funil de Isca Digital Perpetuo",
        "2x Funil de Evento de Lancamento",
        "2x Funil de Aplicacao de Produto",
      ],
      automacao: ["TUDO DO BUSINESS", "Automacao Pre-vendas A.I"],
      quantidade: {
        paginaLinks: 1,
        funis: 7,
      },
      valorAvulso: {
        mensal: 797,
        anuidade: 9564,
      },
    },

    geniusAI: {
      plano: "SCALE EXCLUSIVE",
      descricao: "Central de Inteligencia integrada na plataforma",
      recursos: [
        "10 CreatorGPT",
        "1MM Creditos Agentes A.I",
        "1 Suporte A.I",
        "1 Pre-vendas A.I",
        "1 Vendas A.I",
      ],
      valorEstimado: {
        mensal: 500,
        anuidade: 6000,
      },
    },

    totalTecnologia: {
      mensal: 3294,
      anuidade: 39528,
    },
  },
};

export const funisAdicionaisConfig: FunisAdicionaisConfig = {
  id: "funis_adicionais",
  nome: "Funis Adicionais",
  descricao: "Adicione mais funis ao seu pacote",
  precoPorFunil: 100,
  minimo: 0,
  maximo: 20,
  observacao:
    "Cada funil adicional inclui copy, design, desenvolvimento e integracoes completas",
};

export const upgradeExperienceFlixOpcoes = [
  {
    de: "starter" as const,
    para: "professional" as const,
    diferencaMensal: 500,
    descricao: "De 1 area para 3 areas + Servico completo",
  },
  {
    de: "professional" as const,
    para: "business" as const,
    diferencaMensal: 500,
    descricao: "De 150 usuarios para ilimitado + Recursos premium",
  },
  {
    de: "business" as const,
    para: "scale" as const,
    diferencaMensal: 500,
    descricao: "App proprio + Genius AI + Recursos enterprise",
  },
];
