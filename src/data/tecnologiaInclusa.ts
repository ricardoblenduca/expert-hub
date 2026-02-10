import type { TecnologiaInclusa, FunisAdicionaisConfig } from "@/types";

export const tecnologiaInclusa: TecnologiaInclusa = {
  starter: {
    experienceFlix: {
      id: "flix_starter",
      plano: "STARTER",
      nome: "Experience Flix Starter",
      descricao: "1 Área de Membros. Até 100 usuários ativos/mês",
      recursos: [
        "1 Área de Membros pré-configurada",
        "Aulas e Conteúdos ilimitados",
        "Vitrine Personalizada estilo Netflix",
        "Trilhas de aprendizado",
        "Plataforma 100% Whitelabel com Domínio Próprio",
        "Integração com Gateway de Pagamento Externo",
        "Integração com Vimeo e YouTube",
        "Atendimento via WhatsApp e Suporte Técnico",
      ],
      limites: {
        areas: 1,
        usuariosAtivos: 100,
        custoExcedente: 3.0,
        textoExcedente: "Cada usuário ativo além de 100: R$ 3,00/mês",
      },
      valorAvulso: {
        entrada: 497,
        mensal: 497,
        anuidade: 5964,
        condicoes: "12 meses (R$ 5.964 à vista com desconto)",
      },
      descontoNoPacoteCompleto: 197,
      podeAdicionarAoPacote: true,
    },

    funnelPages: {
      plano: "STARTER",
      descricao: "Página de Links + 1 Funil",
      funis: ["1x Funil de Sessão Estratégica / Aplicação de Produto"],
      automacao: [
        "Squad de desenvolvimento (copy/design/dev)",
        "Página de obrigado integrada ao WhatsApp",
        "Atendimento via WhatsApp e Suporte Técnico",
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
      id: "flix_professional",
      plano: "PROFESSIONAL",
      nome: "Experience Flix Professional",
      descricao: "3 Áreas de Membros. Até 150 usuários ativos/mês",
      recursos: [
        "TUDO DO STARTER",
        "3 Áreas de Membros completas",
        "Produção de banners e capas para toda plataforma",
        "Atendimento dedicado para postagem de conteúdos",
      ],
      limites: {
        areas: 3,
        usuariosAtivos: 150,
        custoExcedente: 2.5,
        textoExcedente: "Cada usuário ativo além de 150: R$ 2,50/mês",
      },
      valorAvulso: {
        entrada: 997,
        mensal: 997,
        anuidade: 11964,
        condicoes: "12 meses (R$ 11.964 à vista)",
      },
      descontoNoPacoteCompleto: 397,
      podeAdicionarAoPacote: true,
    },

    funnelPages: {
      plano: "PROFESSIONAL",
      descricao: "Página de Links + 3 Funis",
      funis: [
        "1x Funil de Sessão Estratégica / Aplicação de Produto",
        "1x Funil de Evento de Lançamento (Gratuito / Pago)",
        "1x Funil de Isca Digital Perpétuo (Gratuito / Pago)",
      ],
      automacao: [
        "TUDO DO STARTER",
        "Automação para envio de e-mails de confirmação",
        "Integração dos inscritos no CRM/Planilha de inscritos",
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
      id: "flix_business",
      plano: "BUSINESS",
      nome: "Experience Flix Business",
      descricao: "3 Áreas de Membros. Membros ilimitados",
      recursos: [
        "TUDO DO PROFESSIONAL",
        "Comunidade integrada com múltiplos canais",
        "Sessão de onboarding coletivo",
        "Campanha 20mil disparos",
        "Bônus: 200GB armazenamento + 300GB banda",
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
        condicoes: "12 meses (R$ 17.964 à vista)",
      },
      descontoNoPacoteCompleto: 597,
      podeAdicionarAoPacote: true,
    },

    funnelPages: {
      plano: "BUSINESS",
      descricao: "Página de Links + 5 Funis",
      funis: [
        "1x Funil de Sessão Estratégica",
        "1x Funil de Isca Digital Perpétuo",
        "1x Funil de Evento de Lançamento",
        "2x Funil de Aplicação de Produto",
      ],
      automacao: [
        "TUDO DO PROFESSIONAL",
        "Automação / Sequência de Nutrição via E-mail Marketing",
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
      id: "flix_scale",
      plano: "SCALE",
      nome: "Experience Flix Scale",
      descricao: "Membros e Conteúdos ilimitados + App Próprio",
      recursos: [
        "TUDO DO BUSINESS",
        "App próprio",
        "Aulas ao vivo (YouTube, Vimeo, Zoom)",
        "Campanha 50mil disparos",
        "5 Automações + 1 WhatsApp conexão + 1 Chip",
        "Bônus: 500GB armazenamento + 1TB banda",
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
        condicoes: "12 meses (R$ 23.964 à vista)",
      },
      descontoNoPacoteCompleto: 797,
      podeAdicionarAoPacote: true,
    },

    funnelPages: {
      plano: "SCALE",
      descricao: "Página de Links + 7 Funis",
      funis: [
        "1x Funil de Sessão Estratégica",
        "2x Funil de Isca Digital Perpétuo",
        "2x Funil de Evento de Lançamento",
        "2x Funil de Aplicação de Produto",
      ],
      automacao: ["TUDO DO BUSINESS", "Automação Pré-vendas A.I"],
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
      descricao: "Central de Inteligência integrada na plataforma",
      recursos: [
        "10 CreatorGPT",
        "1MM Créditos Agentes A.I",
        "1 Suporte A.I",
        "1 Pré-vendas A.I",
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
    "Cada funil adicional inclui copy, design, desenvolvimento e integrações completas",
};

export const upgradeExperienceFlixOpcoes = [
  {
    de: "starter" as const,
    para: "professional" as const,
    diferencaMensal: 500,
    descricao: "De 1 área para 3 áreas + Serviço completo",
  },
  {
    de: "professional" as const,
    para: "business" as const,
    diferencaMensal: 500,
    descricao: "De 150 usuários para ilimitado + Recursos premium",
  },
  {
    de: "business" as const,
    para: "scale" as const,
    diferencaMensal: 500,
    descricao: "App próprio + Genius AI + Recursos enterprise",
  },
];
