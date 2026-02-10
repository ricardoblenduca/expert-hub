import type { PilarEntregaveis, NivelId } from "@/types";

// ============================================
// ENTREGAVEIS COMPLETOS V6.0
// ============================================

export const pilares: PilarEntregaveis[] = [
  // ═══════════════════════════════════════════════════════════
  // 1. IMPLEMENTACAO (Primeiras 4 semanas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "implementacao",
    nome: "IMPLEMENTACAO",
    icone: "🚀",
    cor: "#C22235",
    ordem: 1,
    entregaveis: [
      {
        id: "mapa_bexpert",
        nome: "Mapa B'Expert (4 semanas)",
        descricao:
          "1 encontro de Onboarding Individual + 2 encontros estrategicos quinzenais onde voce constroi: Modelo de Negocio / Posicionamento Unico / Metodo Guia / Oferta Universal",
        significado:
          "Em 1 mes voce sai com clareza total sobre QUEM voce e como expert, PARA QUEM voce serve, COMO voce entrega valor e QUANTO voce cobra. Acabam as duvidas sobre o que vender e como se posicionar.",
        detalhesNivel: {
          starter: "1 Onboarding + 2 encontros quinzenais",
          professional: "1 Onboarding + 4 encontros semanais",
          business: "1 Onboarding + 4 encontros semanais",
          scale: "Onboarding + Trilhas Gravadas + Agentes IA + 4 encontros semanais",
        },
        icone: "🗺️",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. ESTRATEGIA - CONSULTORIA & ORIENTACAO INDIVIDUAL
  // ═══════════════════════════════════════════════════════════
  {
    id: "estrategia",
    nome: "ESTRATEGIA - Consultoria & Orientacao Individual",
    icone: "📋",
    cor: "#5F5B42",
    ordem: 2,
    entregaveis: [
      {
        id: "expert_planning",
        nome: "Expert Planning Anual",
        descricao:
          "1 encontro estrategico anual individual para Planejamento Estrategico e construcao do Funil de Caixa Rapido",
        significado:
          "Todo ano voce recalibra sua estrategia com um planejamento profissional focado em gerar caixa rapido (ROI em 21 dias). E o momento de olhar o ano inteiro com visao estrategica.",
        frequencia: "1x por ano",
        formato: "Individual",
        icone: "📊",
      },
      {
        id: "mentorias_individuais",
        nome: "Encontros de Mentorias Individuais",
        descricao:
          "Mentorias individuais focadas em: Motor Perpetuo de Crescimento / Produtos e Entregas Escalaveis / Gestao de Resultados (OKRs & KPIs)",
        significado:
          "Voce tem acesso regular a mentoria estrategica 1-1 para resolver gargalos, ajustar rotas e acelerar resultados. Como ter um consultor senior dedicado ao seu negocio.",
        detalhesNivel: {
          starter: "1x por trimestre",
          professional: "1x por mes",
          business: "2x por mes + sob demanda em Revenue Share",
          scale: "4x por mes + sob demanda em Revenue Share",
        },
        formato: "Individual",
        icone: "💡",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. CONEXOES - COMUNIDADE
  // ═══════════════════════════════════════════════════════════
  {
    id: "conexoes",
    nome: "CONEXOES - Comunidade",
    icone: "📊",
    cor: "#113F4B",
    ordem: 3,
    entregaveis: [
      {
        id: "comunidade_bexperts",
        nome: "Comunidade B'Experts",
        descricao: "Acesso a comunidade exclusiva para relacionamento, avisos e networking",
        significado:
          "Voce entra em uma rede de experts que estao na mesma jornada. Trocas, parcerias, indicacoes e suporte mutuo. Networking que gera oportunidades reais de negocio.",
        icone: "👥",
      },
      {
        id: "expert_experience",
        nome: "Imersoes Presenciais (Expert Experience)",
        descricao: "Eventos presenciais para networking, aprendizado e aceleracao",
        significado:
          "Experiencias imersivas presenciais onde voce se conecta pessoalmente com outros experts, participa de palestras transformadoras e acelera seu crescimento. Networking que vale milhoes.",
        detalhesNivel: {
          starter: "2 ingressos Starter/ano",
          professional: "2 ingressos Professional/ano",
          business: "2 ingressos Business/ano",
          scale: "2 ingressos Scale/ano",
        },
        icone: "🎪",
      },
      {
        id: "encontros_founders",
        nome: "Palestras / Lives / Encontros com Founders",
        descricao: "Acesso a conteudos exclusivos direto dos fundadores Ricardo e Silviane",
        significado:
          "Conteudo estrategico e insights direto de quem construiu um dos maiores ecossistemas de educacao do Brasil. Acesso a quem ja trilhou o caminho que voce quer percorrer.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Ate 1x por ano",
          business: "Ate 2x por ano",
          scale: "Ate 3x por ano",
        },
        icone: "🎤",
      },
      {
        id: "bminds_club",
        nome: "Membros B'Minds Club",
        descricao: "Clube premium exclusivo com vantagens especiais",
        significado:
          "Clube de elite com beneficios exclusivos, descontos em parceiros estrategicos e acesso a eventos fechados. Status e vantagens concretas para seu negocio.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: "Acesso completo",
          scale: "Acesso completo",
        },
        icone: "👑",
      },
      {
        id: "bminds_connect",
        nome: "Encontros de Experiencia (B'Minds Connect)",
        descricao: "Encontros presenciais exclusivos para networking de alto nivel",
        significado:
          "2 encontros presenciais exclusivos por ano so para membros Business e Scale. Masterminds, parcerias estrategicas e networking com o topo do mercado de conhecimento.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: "2x por ano",
          scale: "2x por ano",
        },
        icone: "🥂",
      },
      {
        id: "visitas_tecnicas",
        nome: "Visitas Tecnicas Incompany (B'Minds Connect)",
        descricao: "Visitas a empresas de referencia para aprender nos bastidores",
        significado:
          "2 visitas tecnicas por ano a empresas de sucesso. Veja como funcionam operacoes reais, conheca processos, sistemas e estrategias sendo aplicadas. Aprendizado pratico impossivel de ter em curso.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: "2x por ano",
          scale: "2x por ano",
        },
        icone: "🏢",
      },
      {
        id: "palco_experience",
        nome: "Palco Expert Experience",
        descricao: "Oportunidade de palestrar no principal evento Expert Experience",
        significado:
          "1 oportunidade por ano de subir no palco do Expert Experience e apresentar para centenas de outros experts. Exposicao de marca, autoridade e geracao de oportunidades. Valor inestimavel.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: "1x por ano",
          scale: "1x por ano",
        },
        icone: "🎤",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. PERFORMANCE - ORIENTACAO EM GRUPO
  // ═══════════════════════════════════════════════════════════
  {
    id: "performance",
    nome: "PERFORMANCE - Orientacao em Grupo",
    icone: "🎓",
    cor: "#C22235",
    ordem: 4,
    entregaveis: [
      {
        id: "encontro_tatico",
        nome: "Encontro Tatico de Implementacao Semanal",
        descricao:
          "Lives semanais toda terca-feira as 19:30h para tirar do papel: copywriting, paginas de vendas, criativos, trafego, IA/produto, vendas",
        significado:
          "Toda semana voce tem conteudo pratico e aplicavel para implementar no seu negocio. Sem enrolacao, so o que funciona. E como ter uma consultoria semanal em grupo focada em execucao.",
        frequencia: "Toda terca-feira, 19:30h",
        formato: "Grupo ao vivo",
        icone: "🎯",
      },
      {
        id: "plantao_duvidas",
        nome: "Plantao Tira-Duvidas ao Vivo Semanal",
        descricao:
          "Sessao semanal toda quinta-feira as 16h para trazer duvidas e desbloquear obstaculos",
        significado:
          "Voce nunca fica travado. Toda semana tem espaco para resolver o que esta te impedindo de avancar. Zero paralisia por analise, maxima velocidade de execucao.",
        frequencia: "Toda quinta-feira, 16h",
        formato: "Grupo ao vivo",
        icone: "❓",
      },
      {
        id: "bmentor_ia",
        nome: "B'Mentor (IA conversacional 24/7)",
        descricao: "Assistente de IA disponivel 24/7 via WhatsApp, Plataforma e Sistema",
        significado:
          "Mentor de inteligencia artificial sempre disponivel. Tire duvidas, peca insights estrategicos, valide ideias a qualquer hora do dia. E como ter um consultor no bolso, 24/7.",
        acesso: "24/7 - WhatsApp / Plataforma / Sistema",
        icone: "🤖",
      },
      {
        id: "grupo_expert_whatsapp",
        nome: "Grupo Exclusivo com Expert no WhatsApp",
        descricao: "Grupo de WhatsApp com acesso direto aos experts da Blenduca",
        significado:
          "Canal direto com a equipe de experts. Suporte rapido, trocas estrategicas e comunidade ativa. Voce tem acesso direto a quem ja construiu o que voce quer construir.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Acesso completo",
          business: "Acesso completo",
          scale: "Acesso completo",
        },
        icone: "💬",
      },
      {
        id: "grupo_time_whatsapp",
        nome: "Grupo com Colaboradores do Seu Time no WhatsApp",
        descricao: "Grupo dedicado onde seu TIME inteiro recebe orientacao",
        significado:
          "Nao e so voce - seu TIME inteiro aprende e e orientado. Seus colaboradores tem acesso direto para tirar duvidas e receber suporte. Acelera implementacao exponencialmente.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: "Acesso completo",
          scale: "Acesso completo",
        },
        icone: "👥",
      },
      {
        id: "central_ferramentas",
        nome: "Central de Ferramentas",
        descricao: "Acesso a Drive organizado, B'Vision (gestao de KPIs) e B'Academy (educacao)",
        significado:
          "Hub centralizado com todas as ferramentas: Google Drive organizado, sistema de KPIs (B'Vision) e plataforma de educacao (B'Academy). Tudo que voce precisa em um so lugar.",
        nivel: "Evolui conforme o nivel (Starter / Professional / Business / Scale)",
        icone: "🛠️",
      },
      {
        id: "central_inteligencia",
        nome: "Central de Inteligencia (+40 solucoes IA)",
        descricao: "Mais de 40 ferramentas e prompts de IA prontos para usar (plug & play)",
        significado:
          "Biblioteca completa de IA: geracao de copy, criacao de conteudo, analise de dados, automacoes, scripts de vendas. Basta escolher e aplicar. Economia de centenas de horas.",
        nivel: "Evolui conforme o nivel",
        quantidade: "+40 solucoes",
        icone: "🧠",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. EDUCACAO
  // ═══════════════════════════════════════════════════════════
  {
    id: "educacao",
    nome: "EDUCACAO",
    icone: "💻",
    cor: "#5F5B42",
    ordem: 5,
    entregaveis: [
      {
        id: "bacademy_trilhas",
        nome: "Trilhas Gravadas B'Academy",
        descricao:
          "Area de membros com conteudo gravado: cursos, masterclasses, frameworks e estrategias",
        significado:
          "Aprenda no seu ritmo com conteudo de altissima qualidade. Cursos completos, aulas praticas e frameworks testados. E como ter uma universidade de negocios de conhecimento disponivel 24/7.",
        nivel: "Conteudo evolui por nivel (Starter → Professional → Business → Scale)",
        icone: "🎓",
      },
      {
        id: "acessos_time",
        nome: "Acessos Tecnicos para Time",
        descricao: "Licencas adicionais para seus colaboradores acessarem todo o conteudo",
        significado:
          "Seu TIME inteiro tem acesso a todo conteudo educacional. Democratize conhecimento na sua empresa. Equipe treinada = execucao mais rapida e eficiente.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: "Acesso completo",
          scale: "Acesso completo",
        },
        icone: "🎫",
      },
      {
        id: "kit_participante",
        nome: "Kit Participante",
        descricao: "Templates, checklists, planilhas, frameworks e workbooks",
        significado:
          "Material de apoio completo para implementar com excelencia. Voce nao precisa criar do zero - ja tem tudo pronto para adaptar ao seu negocio.",
        nivel: "Evolui por nivel",
        icone: "📦",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 6. RESULTADOS (KPIs)
  // ═══════════════════════════════════════════════════════════
  {
    id: "resultados",
    nome: "RESULTADOS (KPIs)",
    icone: "🤝",
    cor: "#113F4B",
    ordem: 6,
    entregaveis: [
      {
        id: "checkin_kpis",
        nome: "Check-In de Acompanhamento Mensal de KPIs",
        descricao: "Revisao mensal dos seus indicadores chave via B'Vision",
        significado:
          "Todo mes seus numeros sao revisados. Identifica desvios, ajusta rotas e garante que voce esta no caminho certo. E impossivel se perder quando voce tem os numeros na mao.",
        detalhesNivel: {
          starter: "Formulario / WhatsApp - 1x mes",
          professional: "CS / Meet - 1x mes",
          business: "CS / Meet - 1x mes",
          scale: "CS / Meet + B'Vision - 1x mes",
        },
        icone: "📊",
      },
      {
        id: "acompanhamento_acoes",
        nome: "Acompanhamento de Acoes (WhatsApp)",
        descricao: "Follow-up regular via WhatsApp para garantir execucao",
        significado:
          'Accountability gentil mas firme para te manter em movimento. Sabendo que alguem vai perguntar "voce fez?", a chance de executar multiplica.',
        detalhesNivel: {
          starter: "Mensal",
          professional: "Quinzenal",
          business: "Semanal",
          scale: "Semanal",
        },
        canal: "WhatsApp",
        icone: "✅",
      },
      {
        id: "dashboard_monday",
        nome: "Dashboard de Gestao de Atividades (Monday)",
        descricao: "Workspace enterprise no Monday.com configurado para seu negocio",
        significado:
          "Gestao de projetos nivel corporativo. Tudo organizado, nada esquecido. Automacoes, integracoes e dashboards em tempo real. Gestao profissional sem esforco.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: "Nao disponivel",
          scale: "Acesso completo",
        },
        icone: "📋",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 7. TECNOLOGIA (SERVICOS & IMPLEMENTACOES)
  // ═══════════════════════════════════════════════════════════
  {
    id: "tecnologia",
    nome: "TECNOLOGIA (Servicos & Implementacoes)",
    icone: "🌐",
    cor: "#C22235",
    ordem: 7,
    entregaveis: [
      {
        id: "experience_flix",
        nome: "Experience Flix - Plataforma de Cursos",
        descricao: "Plataforma completa de cursos online estilo Netflix",
        significado:
          "Sua propria Netflix de cursos. Plataforma profissional, 100% whitelabel, com sua marca e dominio. Seus alunos acham que voce desenvolveu do zero. Engajamento sobe, cancelamentos caem.",
        detalhesNivel: {
          starter: `PLANO STARTER
• 1 Area de Membros Pre-Configurada
• Aulas e Conteudos ilimitados
• Ate 100 usuarios ativos/mes (excedente R$ 3,00/usuario)
• Vitrine Personalizada estilo "Netflix"
• Trilhas de aprendizado
• Plataforma 100% Whitelabel com Dominio Proprio
• Integracao com Gateway de Pagamento
• Integracao com Vimeo e YouTube
• Atendimento via WhatsApp e Suporte Tecnico`,
          professional: `PLANO PROFESSIONAL
• 3 Areas de Membros Completas
• Aulas e Conteudos ilimitados
• Ate 150 usuarios ativos/mes (excedente R$ 2,50/usuario)
✅ TUDO DO STARTER +
• Producao de banners e capas para toda plataforma
• Atendimento dedicado para postagem de conteudos`,
          business: `PLANO BUSINESS
• 3 Areas de Membros Completas
• Aulas e Conteudos ilimitados
• Membros ilimitados (sem custo de excedente!)
✅ TUDO DO PROFESSIONAL +
• Comunidade integrada com multiplos canais
• Sessao de onboarding coletivo
• Campanha 20mil disparos de e-mail
• Bonus: 200GB armazenamento + 300GB banda`,
          scale: `PLANO SCALE
• Membros e Conteudos ilimitados
✅ TUDO DO BUSINESS +
• App proprio (Android e iOS)
• Aulas ao vivo (YouTube, Vimeo, Zoom)
• Campanha 50mil disparos
• 5 Automacoes de e-mail
• 1 WhatsApp conexao + 1 Chip
• Bonus: 500GB armazenamento + 1TB banda`,
        },
        valorAvulso: {
          starter: 497,
          professional: 997,
          business: 1497,
          scale: 1997,
        },
        icone: "🎬",
      },
      {
        id: "funnel_pages",
        nome: "Funnel Pages - Funis de Vendas",
        descricao: "Funis completos com copy, design, desenvolvimento e automacoes",
        significado:
          "Funis profissionais prontos para vender. Squad completo desenvolve tudo: copy persuasivo, design que converte, codigo otimizado, automacoes funcionando. Voce so valida e publica.",
        detalhesNivel: {
          starter: `PLANO STARTER
• Pagina de Links + 1 Funil
• 1 Funil de Sessao Estrategica / Aplicacao de Produto

Automacao & Time:
• Squad de desenvolvimento (copy/design/dev)
• Pagina de obrigado integrada ao WhatsApp
• Atendimento via WhatsApp e Suporte Tecnico`,
          professional: `PLANO PROFESSIONAL
• Pagina de Links + 3 Funis
• 1 Funil de Sessao Estrategica / Aplicacao de Produto
• 1 Funil de Evento de Lancamento (Gratuito/Pago)
• 1 Funil de Isca Digital Perpetuo (Gratuito/Pago)

✅ TUDO DO STARTER +
• Automacao de e-mails de confirmacao
• Integracao dos inscritos no CRM/Planilha`,
          business: `PLANO BUSINESS
• Pagina de Links + 5 Funis
• 1 Funil de Sessao Estrategica
• 1 Funil de Isca Digital Perpetuo
• 1 Funil de Evento de Lancamento
• 2 Funis de Aplicacao de Produto

✅ TUDO DO PROFESSIONAL +
• Automacao / Sequencia de Nutricao via E-mail Marketing`,
          scale: `PLANO SCALE
• Pagina de Links + 7 Funis
• 1 Funil de Sessao Estrategica
• 2 Funis de Isca Digital Perpetuo
• 2 Funis de Evento de Lancamento
• 2 Funis de Aplicacao de Produto

✅ TUDO DO BUSINESS +
• Automacao Pre-vendas A.I`,
        },
        valorAvulso: {
          starter: 197,
          professional: 397,
          business: 597,
          scale: 797,
        },
        icone: "📄",
      },
      {
        id: "genius_ai",
        nome: "Genius AI - Central de Inteligencia",
        descricao: "Assistentes de IA integrados na plataforma",
        significado:
          "Inteligencia artificial trabalhando para voce. Assistentes customizados que ajudam em vendas, conteudo, suporte. E como ter uma equipe de IA dedicada ao seu negocio.",
        detalhesNivel: {
          starter: "Nao disponivel",
          professional: "Nao disponivel",
          business: `GENIUS AI BUSINESS
• 5 CreatorGPT
• 1 Suporte A.I
• 200mil Creditos Agentes A.I`,
          scale: `GENIUS AI SCALE
• 10 CreatorGPT
• 1MM Creditos Agentes A.I
• 1 Suporte A.I
• 1 Pre-vendas A.I
• 1 Vendas A.I`,
        },
        icone: "🧠",
      },
    ],
  },
];

// Helper function to get entregaveis for a specific nivel
export function getEntregaveisPorNivel(nivelId: NivelId): PilarEntregaveis[] {
  return pilares.map((pilar) => ({
    ...pilar,
    entregaveis: pilar.entregaveis.filter((e) => {
      // If no detalhesNivel, it's available for all
      if (!e.detalhesNivel) return true;
      // Check if available for this nivel
      const detalhe = e.detalhesNivel[nivelId];
      return detalhe && detalhe !== "Nao disponivel";
    }),
  }));
}

// Helper function to count total entregaveis for a nivel
export function contarEntregaveis(nivelId: NivelId): number {
  return pilares.reduce((total, pilar) => {
    return (
      total +
      pilar.entregaveis.filter((e) => {
        if (!e.detalhesNivel) return true;
        const detalhe = e.detalhesNivel[nivelId];
        return detalhe && detalhe !== "Nao disponivel";
      }).length
    );
  }, 0);
}

// Helper function to check if entregavel is available for nivel
export function entregavelDisponivelNoNivel(
  entregavel: { detalhesNivel?: Partial<Record<NivelId, string>> },
  nivelId: NivelId
): boolean {
  if (!entregavel.detalhesNivel) return true;
  const detalhe = entregavel.detalhesNivel[nivelId];
  return !!detalhe && detalhe !== "Nao disponivel";
}

// ============================================
// PILARES POR MODALIDADE V0.8
// ============================================

// Config: which pilares are shown for each modalidade
export const PILARES_POR_MODALIDADE: Record<string, string[]> = {
  completo: [
    "implementacao",
    "estrategia",
    "conexoes",
    "performance",
    "educacao",
    "resultados",
    "tecnologia",
  ],
  consultoria: [
    "implementacao",
    "estrategia",
    "conexoes",
    "performance",
    "educacao",
    "resultados",
    // "tecnologia" - REMOVED for consultoria
  ],
  comunidade: [
    // "implementacao" - REMOVED for comunidade
    // "estrategia" - REMOVED for comunidade
    "conexoes",
    "performance",
    "educacao",
    "resultados",
    // "tecnologia" - REMOVED for comunidade
  ],
};

// Helper function to get pilares filtered by modalidade
export function getPilaresParaModalidade(modalidadeId: string): PilarEntregaveis[] {
  const pilaresPermitidos = PILARES_POR_MODALIDADE[modalidadeId] || PILARES_POR_MODALIDADE.completo;
  return pilares.filter((pilar) => pilaresPermitidos.includes(pilar.id));
}

// Helper function to get pilares filtered by modalidade AND nivel
export function getPilaresParaModalidadeENivel(
  modalidadeId: string,
  nivelId: NivelId
): PilarEntregaveis[] {
  const pilaresPermitidos = PILARES_POR_MODALIDADE[modalidadeId] || PILARES_POR_MODALIDADE.completo;

  return pilares
    .filter((pilar) => pilaresPermitidos.includes(pilar.id))
    .map((pilar) => ({
      ...pilar,
      entregaveis: pilar.entregaveis.filter((e) => {
        if (!e.detalhesNivel) return true;
        const detalhe = e.detalhesNivel[nivelId];
        return detalhe && detalhe !== "Nao disponivel";
      }),
    }))
    .filter((pilar) => pilar.entregaveis.length > 0);
}

// Helper function to count entregaveis for modalidade + nivel
export function contarEntregaveisParaModalidade(
  modalidadeId: string,
  nivelId: NivelId
): number {
  const pilaresVisiveis = getPilaresParaModalidadeENivel(modalidadeId, nivelId);
  return pilaresVisiveis.reduce((total, pilar) => total + pilar.entregaveis.length, 0);
}
