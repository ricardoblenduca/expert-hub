import type { ServicoAdicional } from "@/types";

export const servicosAdicionais: ServicoAdicional[] = [
  {
    id: "prof_bi",
    categoria: "Profissionais",
    nome: "Profissional de Business Intelligence",
    descricao:
      "Analisa dados e gera insights para embasar decisoes estrategicas e otimizar resultados",
    nivelDedicacao: "Dedicado (100%)",
    preco: 49571.25,
    tipo: "mensal",
    entregaveis: [
      "Analise de dados e insights",
      "Comunicacao com cliente/equipe",
      "Coleta e extracao de dados",
      "Construcao de dashboards e relatorios",
    ],
  },
  {
    id: "prof_food",
    categoria: "Profissionais",
    nome: "Profissional de Food Service",
    descricao: "Plataforma V4 Food + Servico",
    nivelDedicacao: "Plano Start",
    preco: 9257.9,
    tipo: "mensal",
    entregaveis: [
      "IA - Gestao de Midia Paga (Meta Ads)",
      "Cardapio Digital + Sistema Delivery",
      "IA - Criativos para Anuncio",
      "IA - Relatorios de acompanhamento semanal",
    ],
  },
  {
    id: "prof_designer",
    categoria: "Profissionais",
    nome: "Profissional de Designer Grafico",
    descricao:
      "Cria identidade visual e materiais graficos alinhados a estrategia da marca",
    preco: 7706.88,
    tipo: "mensal",
    nivelDedicacao: "Variavel",
    entregaveis: [
      "Criacao de posts para redes sociais",
      "Desenvolvimento de materiais de apresentacoes de proposta",
      "Otimizacao de metricas comerciais (TM, CAC, TX CONV)",
      "Atualizar CRM e pipeline diariamente",
    ],
  },
  {
    id: "prof_redator",
    categoria: "Profissionais",
    nome: "Profissional de Redacao Publicitaria",
    descricao:
      "Cria textos persuasivos para campanhas, anuncios e conteudos estrategicos",
    preco: 5750.94,
    tipo: "mensal",
    nivelDedicacao: "Variavel",
    entregaveis: [
      "Criar copys",
      "Analise de indicadores (KPIs), relatorios e rotinas",
      "Otimizacao e ajustes de campanhas",
      "Gestao de orcamento (Plano de Midia)",
    ],
  },
  {
    id: "prof_midia_paga",
    categoria: "Profissionais",
    nome: "Profissional de Gestao de Midia Paga",
    descricao:
      "Gerencia campanhas pagas para maximizar ROI e alcancar objetivos de marketing",
    preco: 5497.13,
    tipo: "mensal",
    nivelDedicacao: "Variavel",
    entregaveis: [],
  },
  {
    id: "diag_midia_paga",
    categoria: "Diagnosticos",
    nome: "Diagnostico de Midia Paga (Meta e Google Ads)",
    descricao:
      "Analise completa da estrutura e performance das campanhas de midia paga",
    preco: 9174.05,
    tipo: "unico",
    entregaveis: [],
  },
];
