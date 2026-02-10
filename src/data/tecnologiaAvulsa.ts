import type {
  ExperienceFlixAvulso,
  FunnelPagesAvulsoConfig,
  NivelId,
} from "@/types";

// ============================================
// EXPERIENCE FLIX - COMPRA AVULSA
// ============================================

export const experienceFlixAvulso: Record<NivelId, ExperienceFlixAvulso> = {
  starter: {
    id: "flix_avulso_starter",
    plano: "starter",
    nome: "Experience Flix Starter",
    descricao: "Plataforma completa de cursos online estilo Netflix",
    recursos: [
      "1 Área de Membros pré-configurada",
      "Aulas e Conteúdos ilimitados",
      "Até 100 usuários ativos no mês",
      "Vitrine Personalizada estilo Netflix",
      "Trilhas de aprendizado",
      "Plataforma 100% Whitelabel com Domínio Próprio",
      "Integração com Gateway de Pagamento",
      "Integração com Vimeo e YouTube",
      "Atendimento via WhatsApp e Suporte Técnico",
    ],
    beneficios: {
      vitrine_netflix: {
        titulo: 'Vitrine Personalizada estilo "Netflix"',
        significado:
          "Seus alunos terão uma experiência profissional e intuitiva, igual às melhores plataformas do mercado. Isso aumenta engajamento e reduz cancelamentos.",
      },
      trilhas: {
        titulo: "Trilhas de aprendizado",
        significado:
          "Organize seu conteúdo em jornadas estruturadas. Seus alunos sabem exatamente o próximo passo, aumentando conclusão dos cursos em até 40%.",
      },
      whitelabel: {
        titulo: "Plataforma 100% Whitelabel",
        significado:
          "Sua marca, seu domínio. Zero menção à Blenduca. Seus alunos acham que você desenvolveu tudo do zero.",
      },
      gateway: {
        titulo: "Integração com Gateway de Pagamento",
        significado:
          "Venda diretamente na plataforma. Receba no seu banco sem intermediários.",
      },
    },
    limites: {
      areas: 1,
      usuariosAtivos: 100,
      custoExcedente: 3.0,
      textoExcedente: "Cada usuário ativo além de 100: R$ 3,00/mês",
    },
    investimento: {
      entrada: 497,
      mensal: 497,
      condicoes: "12 meses (R$ 5.964 à vista com desconto)",
    },
    descontoNoPacoteCompleto: 197,
  },

  professional: {
    id: "flix_avulso_professional",
    plano: "professional",
    nome: "Experience Flix Professional",
    descricao: "Plataforma premium com 3 áreas de membros",
    recursos: [
      "TUDO DO STARTER",
      "3 Áreas de Membros completas",
      "Até 150 usuários ativos no mês",
      "Produção de banners e capas para toda plataforma",
      "Atendimento dedicado para postagem de conteúdos",
    ],
    limites: {
      areas: 3,
      usuariosAtivos: 150,
      custoExcedente: 2.5,
      textoExcedente: "Cada usuário ativo além de 150: R$ 2,50/mês",
    },
    investimento: {
      entrada: 997,
      mensal: 997,
      condicoes: "12 meses (R$ 11.964 à vista)",
    },
    descontoNoPacoteCompleto: 397,
  },

  business: {
    id: "flix_avulso_business",
    plano: "business",
    nome: "Experience Flix Business",
    descricao: "Plataforma business com membros ilimitados",
    recursos: [
      "TUDO DO PROFESSIONAL",
      "3 Áreas de Membros",
      "Membros ILIMITADOS",
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
    investimento: {
      entrada: 1497,
      mensal: 1497,
      condicoes: "12 meses (R$ 17.964 à vista)",
    },
    descontoNoPacoteCompleto: 597,
  },

  scale: {
    id: "flix_avulso_scale",
    plano: "scale",
    nome: "Experience Flix Scale",
    descricao: "Plataforma enterprise com app próprio",
    recursos: [
      "TUDO DO BUSINESS",
      "Áreas ILIMITADAS",
      "App próprio iOS e Android",
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
    investimento: {
      entrada: 1997,
      mensal: 1997,
      condicoes: "12 meses (R$ 23.964 à vista)",
    },
    descontoNoPacoteCompleto: 797,
  },
};

// ============================================
// FUNNEL PAGES - COMPRA AVULSA (À LA CARTE)
// ============================================

export const funnelPagesAvulso: FunnelPagesAvulsoConfig = {
  id: "funnel_pages_avulso",
  nome: "Funnel Pages - Funis de Vendas Profissionais",
  descricao:
    "Funis de vendas completos: copy + design + desenvolvimento + automações",
  modelo: "ala_carte",

  precoBase: {
    paginaLinks: 0, // Sempre incluso
    precoPorFunil: 100, // R$ 100/mês por funil
    minimo: 1,
    maximo: 20,
  },

  pacotesSugeridos: [
    {
      id: "funnel_starter",
      nome: "PACOTE STARTER",
      funis: 1,
      preco: 197,
      descricao: "Página de Links + 1 Funil",
      tipos: ["1x Sessão Estratégica ou Aplicação de Produto"],
    },
    {
      id: "funnel_professional",
      nome: "PACOTE PROFESSIONAL",
      funis: 3,
      preco: 397,
      economia: 0,
      descricao: "Página de Links + 3 Funis",
      tipos: [
        "1x Sessão Estratégica",
        "1x Evento de Lançamento",
        "1x Isca Digital Perpétua",
      ],
    },
    {
      id: "funnel_business",
      nome: "PACOTE BUSINESS",
      funis: 5,
      preco: 597,
      economia: 0,
      descricao: "Página de Links + 5 Funis",
      tipos: [
        "1x Sessão Estratégica",
        "2x Evento de Lançamento",
        "2x Isca Digital Perpétua",
      ],
    },
    {
      id: "funnel_scale",
      nome: "PACOTE SCALE",
      funis: 7,
      preco: 797,
      economia: 0,
      descricao: "Página de Links + 7 Funis",
      tipos: [
        "1x Sessão Estratégica",
        "2x Isca Digital Perpétua",
        "2x Evento de Lançamento",
        "2x Aplicação de Produto",
      ],
    },
  ],

  oqueCadaFunilInclui: [
    {
      item: "Copy Profissional",
      significado:
        "Textos persuasivos escritos por copywriters especializados. Seu funil vende enquanto você dorme.",
    },
    {
      item: "Design Customizado",
      significado:
        "Layout profissional alinhado com sua identidade visual. Primeira impressão importa: funis bem desenhados convertem 3x mais.",
    },
    {
      item: "Desenvolvimento Técnico",
      significado:
        "Programação completa, mobile-first, rápido. Não precisa contratar dev nem entender código.",
    },
    {
      item: "Integração com CRM",
      significado:
        "Cada lead vai direto pro seu CRM. Zero trabalho manual, zero lead perdido.",
    },
    {
      item: "Automação de E-mails",
      significado:
        "Sequências automáticas de confirmação e nutrição. Seus leads são aquecidos sem você fazer nada.",
    },
    {
      item: "Integração WhatsApp",
      significado:
        "Página de obrigado conectada ao WhatsApp. Leads chegam direto no seu chat para conversão imediata.",
    },
  ],

  tiposDeFunis: [
    {
      tipo: "Sessão Estratégica",
      descricao: "Funil para agendar calls de diagnóstico",
      conversaoMedia: "15-25%",
      melhorPara: "Vender consultoria, mentoria ou serviços high-ticket",
    },
    {
      tipo: "Aplicação de Produto",
      descricao: "Funil para qualificar compradores",
      conversaoMedia: "20-35%",
      melhorPara: "Produtos de alto valor com processo seletivo",
    },
    {
      tipo: "Evento de Lançamento",
      descricao: "Funil para inscrições em eventos/webinars",
      conversaoMedia: "30-50%",
      melhorPara: "Lançamentos, lives, masterclasses",
    },
    {
      tipo: "Isca Digital Perpétua",
      descricao: "Funil evergreen para captura de leads",
      conversaoMedia: "40-60%",
      melhorPara: "Ebooks, diagnósticos, quizzes, materiais gratuitos",
    },
  ],
};

// ============================================
// HELPER: Calcular preço customizado de funis
// ============================================

export function calcularPrecoFunnelCustom(quantidade: number): number {
  return quantidade * funnelPagesAvulso.precoBase.precoPorFunil;
}

// ============================================
// HELPER: Verificar se Pacote Completo seria mais barato
// ============================================

export function verificarUpgradeInteligente(
  pacoteAtual: "consultoria" | "comunidade",
  nivelAtual: NivelId,
  techFlixPlano: NivelId | null,
  funnelQuantidade: number
): { mostrar: boolean; mensagem: string; economia: number } | null {
  if (!techFlixPlano && funnelQuantidade === 0) {
    return null;
  }

  // Importar preços aqui para evitar circular dependency
  const precosPacote = {
    starter: { consultoria: 1000, comunidade: 500, completo: 1500 },
    professional: { consultoria: 2000, comunidade: 750, completo: 3000 },
    business: { consultoria: 2500, comunidade: 1000, completo: 4500 },
    scale: { consultoria: 4000, comunidade: 1500, completo: 7500 },
  };

  const precoFlixAvulso = techFlixPlano
    ? experienceFlixAvulso[techFlixPlano].investimento.mensal
    : 0;
  const precoFunnelAvulso = calcularPrecoFunnelCustom(funnelQuantidade);

  const pacoteBase = precosPacote[nivelAtual][pacoteAtual];
  const totalMontado = pacoteBase + precoFlixAvulso + precoFunnelAvulso;
  const pacoteCompleto = precosPacote[nivelAtual].completo;

  if (totalMontado > pacoteCompleto) {
    const economia = totalMontado - pacoteCompleto;
    return {
      mostrar: true,
      mensagem: `💡 Dica: O Pacote Completo sai mais barato!

Você está montando:
${pacoteAtual === "consultoria" ? "Pacote Consultoria" : "Pacote Comunidade"}: R$ ${pacoteBase}/mês
${techFlixPlano ? `+ Experience Flix ${techFlixPlano.toUpperCase()}: R$ ${precoFlixAvulso}/mês` : ""}
${funnelQuantidade > 0 ? `+ ${funnelQuantidade} Funis: R$ ${precoFunnelAvulso}/mês` : ""}
= R$ ${totalMontado}/mês

MAS o Pacote Completo ${nivelAtual.toUpperCase()} custa apenas R$ ${pacoteCompleto}/mês

Economia: R$ ${economia}/mês`,
      economia,
    };
  }

  return null;
}
