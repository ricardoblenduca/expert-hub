import type { Produto } from "@/types";

export const produtos: Produto[] = [
  {
    id: "starter",
    nome: "EXPERT STARTER - VIDA DE EXPERT",
    categoria: "Expert Starter",
    tagline: "Transforme seu conhecimento em negocio",
    cor: "#C22235",
    persona:
      "Expert Empreendedor, Prestador de servicos / Profissional Liberal",
    faturamento: "10k a 20k/mes",
    duracao: "12 meses + recorrencia (minimo 6 meses + 30 dias aviso previo)",
    investimento: { mensal: 1250.0, minimoMeses: 6, setup: 0 },
    entregaveis: [
      {
        pilar: "IMPLEMENTACAO",
        items: [
          {
            categoria: "EDUCACAO + ORIENTACAO + TECNOLOGIA + CONSULTORIA",
            descricao:
              "Mapa B'Expert (4 semanas): Modelo de Negocio / Posicionamento Unico / Metodo Guia / Oferta Universal",
            detalhes:
              "Onboarding Individual + Trilhas Gravadas + Agentes IA + 2 Encontros Individual Quinzenal",
          },
        ],
      },
      {
        pilar: "CONSULTORIA",
        items: [
          {
            categoria: "Planejamento Estrategico",
            descricao:
              "Planejamento Estrategico & Caixa Rapido - ROI 21 dias",
            frequencia: "1x ano - Individual",
          },
        ],
      },
      {
        pilar: "ACOMPANHAMENTO",
        items: [
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro de Acompanhamento Individual (OKRs)",
            frequencia: "Individual - 1x Trimestre",
          },
          {
            categoria: "CONSULTORIA",
            descricao: "Check In de Acompanhamento Mensal de KPIs",
            frequencia: "WhatsApp - 1x mes",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro Tatico de Implementacao Semanal",
            tipo: "Grupo",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Plantao tira-duvidas ao vivo semanal",
            tipo: "Grupo",
          },
        ],
      },
      {
        pilar: "EDUCACAO",
        items: [
          {
            categoria: "B'Academy",
            descricao: "Trilhas gravadas B'Academy (Area de Membros)",
            nivel: "Nivel Starter",
          },
          {
            categoria: "Material",
            descricao: "Kit Participante",
            nivel: "Nivel Starter",
          },
        ],
      },
      {
        pilar: "TECNOLOGIA",
        items: [
          {
            categoria: "Ferramentas",
            descricao: "Central de Ferramentas",
            nivel: "Nivel Starter",
          },
          {
            categoria: "IA",
            descricao: "Central de Inteligencia (+40 solucoes plug & play)",
            nivel: "Nivel Starter",
          },
          {
            categoria: "IA",
            descricao: "B'Mentor (IA conversacional 24/7)",
            tipo: "Tutor IA",
          },
        ],
      },
      {
        pilar: "COMUNIDADE",
        items: [
          {
            categoria: "Eventos",
            descricao: "Imersoes presenciais (Expert Experience)",
            quantidade: "1 ingresso Starter",
          },
          {
            categoria: "Networking",
            descricao: "Comunidade B'Experts (Relacionamento)",
            acesso: true,
          },
        ],
      },
      {
        pilar: "PLATAFORMA",
        items: [
          {
            categoria: "Funnel Pages",
            descricao: "Paginas Web",
            quantidade: "Pagina de Links + 1 Funil",
          },
        ],
      },
    ],
    composicaoPreco: {
      "Entregas Individuais": 550.0,
      "Entregas Escalaveis (PASS)": 500.0,
      "Funnel + Bonus Pagina de Links": 200.0,
      LXP: 0.0,
    },
  },
  {
    id: "professional",
    nome: "EXPERT PROFESSIONAL - ACELERA EXPERT",
    categoria: "Expert Professional",
    tagline: "Leve seu negocio de conhecimento ao proximo nivel",
    cor: "#5F5B42",
    persona:
      "Mentor / Consultor / Palestrante. Apenas produtos de posicionamento",
    faturamento: "20k a 40k/mes",
    duracao: "12 meses + recorrencia (minimo 6 meses + 30 dias aviso previo)",
    investimento: { mensal: 2500.0, minimoMeses: 6, setup: 0 },
    entregaveis: [
      {
        pilar: "IMPLEMENTACAO",
        items: [
          {
            categoria: "EDUCACAO + ORIENTACAO + TECNOLOGIA + CONSULTORIA",
            descricao:
              "Mapa B'Expert (4 semanas): Modelo de Negocio / Posicionamento Unico / Metodo Guia / Oferta Universal",
            detalhes:
              "Onboarding Individual + Trilhas Gravadas + Agentes IA + 4 Encontros Individual Semanal",
          },
        ],
      },
      {
        pilar: "CONSULTORIA",
        items: [
          {
            categoria: "Planejamento Estrategico",
            descricao:
              "Planejamento Estrategico & Caixa Rapido - ROI 21 dias",
            frequencia: "1x ano - Individual",
          },
        ],
      },
      {
        pilar: "ACOMPANHAMENTO",
        items: [
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro de Acompanhamento Individual (OKRs)",
            frequencia: "Individual - 1x mes",
          },
          {
            categoria: "CONSULTORIA",
            descricao: "Check In de Acompanhamento Mensal de KPIs",
            frequencia: "Meet - 1x mes",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro Tatico de Implementacao Semanal",
            tipo: "Grupo",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Plantao tira-duvidas ao vivo semanal",
            tipo: "Grupo",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Acompanhamento de Acoes Semanais",
            canal: "WhatsApp",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Grupo de CEOs e Fundadores",
            canal: "WhatsApp",
          },
        ],
      },
      {
        pilar: "EDUCACAO",
        items: [
          {
            categoria: "B'Academy",
            descricao: "Trilhas gravadas B'Academy (Area de Membros)",
            nivel: "Nivel Professional",
          },
          {
            categoria: "Material",
            descricao: "Kit Participante",
            nivel: "Nivel Professional",
          },
        ],
      },
      {
        pilar: "TECNOLOGIA",
        items: [
          {
            categoria: "Ferramentas",
            descricao: "Central de Ferramentas",
            nivel: "Nivel Professional",
          },
          {
            categoria: "IA",
            descricao: "Central de Inteligencia (+40 solucoes plug & play)",
            nivel: "Nivel Professional",
          },
          {
            categoria: "IA",
            descricao: "B'Mentor (IA conversacional 24/7)",
            tipo: "Mentor IA",
          },
        ],
      },
      {
        pilar: "COMUNIDADE",
        items: [
          {
            categoria: "Eventos",
            descricao: "Imersoes presenciais (Expert Experience)",
            quantidade: "1 ingresso Professional",
          },
          {
            categoria: "Networking",
            descricao: "Comunidade B'Experts (Relacionamento)",
            acesso: true,
          },
          {
            categoria: "Palestras",
            descricao: "Palestra dos Founders em Eventos B'Experts",
            acesso: true,
          },
        ],
      },
      {
        pilar: "SERVICO / TECNOLOGIA",
        items: [
          {
            categoria: "Desenvolvimento",
            descricao: "Sprints de Desenvolvimento",
            acesso: true,
          },
        ],
      },
      {
        pilar: "CONSULTORIA / TECNOLOGIA",
        items: [
          {
            categoria: "Gestao",
            descricao: "B'Vision (Sistema de Gestao de KPIs)",
            acesso: true,
          },
        ],
      },
      {
        pilar: "PLATAFORMA",
        items: [
          {
            categoria: "Experience Flix",
            descricao: "Plataforma de Conteudo",
            quantidade: "1 Area de Membros",
          },
          {
            categoria: "Funnel Pages",
            descricao: "Paginas Web",
            quantidade: "Pagina de Links + 3 Funis",
          },
        ],
      },
    ],
    composicaoPreco: {
      "Entregas Individuais": 1200.0,
      "Entregas Escalaveis (PASS)": 500.0,
      "Funnel + Bonus Pagina de Links": 300.0,
      LXP: 500.0,
    },
  },
  {
    id: "business",
    nome: "EXPERT BUSINESS",
    categoria: "Expert Business",
    tagline: "Pegamos junto para fazer o seu negocio decolar",
    cor: "#113F4B",
    persona:
      "Negocios de Conhecimento. Produtos recorrentes e escalaveis",
    faturamento: "40k a 80k/mes",
    duracao:
      "12 meses + recorrencia (minimo 12 meses + 30 dias aviso previo)",
    investimento: {
      mensal: 3500.0,
      minimoMeses: 12,
      setup: 0,
      extras: "Partnership",
    },
    entregaveis: [
      {
        pilar: "IMPLEMENTACAO",
        items: [
          {
            categoria: "EDUCACAO + ORIENTACAO + TECNOLOGIA + CONSULTORIA",
            descricao:
              "Mapa B'Expert (4 semanas): Modelo de Negocio / Posicionamento Unico / Metodo Guia / Oferta Universal",
            detalhes:
              "Onboarding Individual + Trilhas Gravadas + Agentes IA + 4 Encontros Individual Semanal",
          },
        ],
      },
      {
        pilar: "CONSULTORIA",
        items: [
          {
            categoria: "Planejamento Estrategico",
            descricao:
              "Planejamento Estrategico & Caixa Rapido - ROI 21 dias",
            frequencia: "1x ano - Individual",
          },
        ],
      },
      {
        pilar: "ACOMPANHAMENTO",
        items: [
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro de Acompanhamento Individual (OKRs)",
            frequencia: "Individual - 2x mes",
          },
          {
            categoria: "CONSULTORIA",
            descricao: "Check In de Acompanhamento Mensal de KPIs",
            frequencia: "Meet - 1x mes",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro Tatico de Implementacao Semanal",
            tipo: "Grupo",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Plantao tira-duvidas ao vivo semanal",
            tipo: "Grupo",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Acompanhamento de Acoes Semanais",
            canal: "WhatsApp",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Grupo de CEOs e Fundadores",
            canal: "WhatsApp",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Grupo com os colaboradores do seu time",
            canal: "WhatsApp",
          },
        ],
      },
      {
        pilar: "EDUCACAO",
        items: [
          {
            categoria: "B'Academy",
            descricao: "Trilhas gravadas B'Academy (Area de Membros)",
            nivel: "Nivel Business",
          },
          {
            categoria: "Material",
            descricao: "Kit Participante",
            nivel: "Nivel Business",
          },
          {
            categoria: "Time",
            descricao: "Acessos Tecnicos para Time",
            acesso: true,
          },
        ],
      },
      {
        pilar: "TECNOLOGIA",
        items: [
          {
            categoria: "Ferramentas",
            descricao: "Central de Ferramentas",
            nivel: "Nivel Business",
          },
          {
            categoria: "IA",
            descricao: "Central de Inteligencia (+40 solucoes plug & play)",
            nivel: "Nivel Business",
          },
          {
            categoria: "IA",
            descricao: "B'Mentor (IA conversacional 24/7)",
            tipo: "Mentor IA",
          },
        ],
      },
      {
        pilar: "COMUNIDADE",
        items: [
          {
            categoria: "Eventos",
            descricao: "Imersoes presenciais (Expert Experience)",
            quantidade: "2 ingressos Business",
          },
          {
            categoria: "Networking",
            descricao: "Comunidade B'Experts (Relacionamento)",
            acesso: true,
          },
          {
            categoria: "Palestras",
            descricao: "Palestra dos Founders em Eventos B'Experts",
            acesso: true,
          },
          {
            categoria: "Exclusivo",
            descricao: "Encontro de Experiencia Exclusivo B'Minds",
            frequencia: "1x ano",
          },
          {
            categoria: "Visitas",
            descricao: "Visitas Tecnica Incompany",
            frequencia: "3x ano",
          },
          {
            categoria: "Eventos",
            descricao: "Participacao em Eventos B'Minds",
            acesso: true,
          },
          {
            categoria: "Clube",
            descricao: "Membros B'Minds Club (Vantagens)",
            acesso: true,
          },
          {
            categoria: "Networking",
            descricao: "Encontros Presenciais Exclusivos (B'Minds Connect)",
            acesso: true,
          },
          {
            categoria: "Palco",
            descricao: "Palco Expert Experience",
            acesso: true,
          },
        ],
      },
      {
        pilar: "SERVICO / TECNOLOGIA",
        items: [
          {
            categoria: "Desenvolvimento",
            descricao: "Sprints de Desenvolvimento",
            acesso: true,
          },
        ],
      },
      {
        pilar: "CONSULTORIA / TECNOLOGIA",
        items: [
          {
            categoria: "Gestao",
            descricao: "B'Vision (Sistema de Gestao de KPIs)",
            acesso: true,
          },
        ],
      },
      {
        pilar: "PLATAFORMA",
        items: [
          {
            categoria: "Experience Flix",
            descricao: "Plataforma de Conteudo",
            quantidade: "3 Areas de Membros",
          },
          {
            categoria: "Funnel Pages",
            descricao: "Paginas Web",
            quantidade: "Pagina de Links + 5 Funis",
          },
        ],
      },
    ],
    composicaoPreco: {
      "B'Minds Club": 1750.0,
      "Entregas Escalaveis (PASS)": 500.0,
      "Funnel + Bonus Pagina de Links": 500.0,
      LXP: 750.0,
    },
  },
  {
    id: "scale",
    nome: "SCALE EXPERT CONSULTING",
    categoria: "Scale Expert",
    tagline:
      "Consultoria estrategica para escalar seu imperio de conhecimento",
    cor: "#C22235",
    persona: "Influenciadores e Empresas / B.U de Educacao",
    faturamento: "1M+/ano",
    duracao:
      "12 meses + recorrencia (minimo 12 meses + 30 dias aviso previo)",
    investimento: {
      mensal: 7500.0,
      minimoMeses: 12,
      setup: 0,
      extras: "Revenue Share + Partnership",
    },
    entregaveis: [
      {
        pilar: "IMPLEMENTACAO",
        items: [
          {
            categoria: "EDUCACAO + ORIENTACAO + TECNOLOGIA + CONSULTORIA",
            descricao:
              "Mapa B'Expert (4 semanas): Modelo de Negocio / Posicionamento Unico / Metodo Guia / Oferta Universal",
            detalhes:
              "Onboarding Individual + Trilhas Gravadas + Agentes IA + 4 Encontros Individual Semanal",
          },
        ],
      },
      {
        pilar: "CONSULTORIA",
        items: [
          {
            categoria: "Planejamento Estrategico",
            descricao:
              "Planejamento Estrategico & Caixa Rapido - ROI 21 dias",
            frequencia: "1x ano - Individual",
          },
          {
            categoria: "Gestao Premium",
            descricao: "Dashboard de Gestao de Atividades (Monday)",
            acesso: true,
          },
        ],
      },
      {
        pilar: "ACOMPANHAMENTO",
        items: [
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro de Acompanhamento Individual (OKRs)",
            frequencia: "Individual - 4x mes",
          },
          {
            categoria: "CONSULTORIA",
            descricao: "Check In de Acompanhamento Mensal de KPIs",
            frequencia: "Meet - 1x mes",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Encontro Tatico de Implementacao Semanal",
            tipo: "Grupo",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Plantao tira-duvidas ao vivo semanal",
            tipo: "Grupo",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Acompanhamento de Acoes Semanais",
            canal: "WhatsApp",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Grupo de CEOs e Fundadores",
            canal: "WhatsApp",
          },
          {
            categoria: "ORIENTACAO",
            descricao: "Grupo com os colaboradores do seu time",
            canal: "WhatsApp",
          },
        ],
      },
      {
        pilar: "EDUCACAO",
        items: [
          {
            categoria: "B'Academy",
            descricao: "Trilhas gravadas B'Academy (Area de Membros)",
            nivel: "Nivel Scale",
          },
          {
            categoria: "Material",
            descricao: "Kit Participante",
            nivel: "Nivel Scale",
          },
          {
            categoria: "Time",
            descricao: "Acessos Tecnicos para Time",
            acesso: true,
          },
        ],
      },
      {
        pilar: "TECNOLOGIA",
        items: [
          {
            categoria: "Ferramentas",
            descricao: "Central de Ferramentas",
            nivel: "Nivel Scale",
          },
          {
            categoria: "IA",
            descricao: "Central de Inteligencia (+40 solucoes plug & play)",
            nivel: "Nivel Scale",
          },
          {
            categoria: "IA",
            descricao: "B'Mentor (IA conversacional 24/7)",
            tipo: "Mentor IA",
          },
        ],
      },
      {
        pilar: "COMUNIDADE",
        items: [
          {
            categoria: "Eventos",
            descricao: "Imersoes presenciais (Expert Experience)",
            quantidade: "2 ingressos Scale",
          },
          {
            categoria: "Networking",
            descricao: "Comunidade B'Experts (Relacionamento)",
            acesso: true,
          },
          {
            categoria: "Palestras",
            descricao: "Palestra dos Founders em Eventos B'Experts",
            acesso: true,
          },
          {
            categoria: "Eventos",
            descricao: "Participacao em Eventos B'Minds",
            acesso: true,
          },
          {
            categoria: "Clube",
            descricao: "Membros B'Minds Club (Vantagens)",
            acesso: true,
          },
          {
            categoria: "Networking",
            descricao: "Encontros Presenciais Exclusivos (B'Minds Connect)",
            acesso: true,
          },
          {
            categoria: "Palco",
            descricao: "Palco Expert Experience",
            acesso: true,
          },
        ],
      },
      {
        pilar: "SERVICO / TECNOLOGIA",
        items: [
          {
            categoria: "Desenvolvimento",
            descricao: "Sprints de Desenvolvimento",
            acesso: true,
          },
        ],
      },
      {
        pilar: "CONSULTORIA / TECNOLOGIA",
        items: [
          {
            categoria: "Gestao",
            descricao: "B'Vision (Sistema de Gestao de KPIs)",
            acesso: true,
          },
        ],
      },
      {
        pilar: "PLATAFORMA",
        items: [
          {
            categoria: "Experience Flix",
            descricao: "Plataforma de Conteudo",
            nivel: "Nivel Business",
          },
          {
            categoria: "Funnel Pages",
            descricao: "Paginas Web",
            nivel: "Nivel Business",
          },
        ],
      },
    ],
    composicaoPreco: {
      "Consultoria Premium": 7500.0,
    },
  },
];
