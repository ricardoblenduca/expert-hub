import type { AgenteAI } from "@/types";

export const agentesAI: AgenteAI[] = [
  {
    id: "clone_ai",
    categoria: "Agentes A.I",
    nome: "Clone A.I",
    descricao: "Seu clone digital de IA para interacao com clientes",
    entregaveis: [
      "Extrator de DNA do Expert",
      "Extrator de Padroes Linguisticos",
      "Criacao do seu Clone IA",
      "Integracao com WhatsApp",
      "Controle de acesso para clientes ativos",
    ],
    investimento: {
      setup: 2500,
      mensal: 500,
    },
    icone: "🤖",
    cor: "#C22235",
  },

  {
    id: "mentor_ai",
    categoria: "Agentes A.I",
    nome: "Mentor A.I",
    descricao: "Clone + Sistema de mentoria ativa e acompanhamento",
    entregaveis: [
      "TUDO DO CLONE A.I",
      "Indicacao de links (trilhas/ferramentas)",
      "Fluxo personalizado de acompanhamento",
      "Envio ativo de mensagens via Meta Oficial",
    ],
    investimento: {
      setup: 5000,
      setupAdicionalPorAcao: 500,
      mensal: 1000,
    },
    icone: "🧠",
    cor: "#5F5B42",
  },

  {
    id: "comercial_ai",
    categoria: "Agentes A.I",
    nome: "Comercial A.I",
    descricao: "Agente comercial completo com gestao de leads e vendas",
    entregaveis: [
      "IA Conversacional Avancada",
      "Base de Conhecimento Personalizada",
      "Gestao Completa de Agendamentos Pagos/Gratuitos",
      "Redirecionamento Automatico Inteligente",
      "Integracao WhatsApp & Redes Sociais 24/7",
      "Dashboard de Metricas",
      "Manutencoes Tecnicas",
      "Grupo de Suporte Dedicado",
      "Atualizacoes Periodicas de Performance",
    ],
    investimento: {
      setup: 5000,
      setupAdicionalPorIntegracao: 1500,
      mensal: 1500,
      adicionalPorNumero: 250,
      prospeccaoAtiva: 500,
    },
    icone: "💼",
    cor: "#113F4B",
  },
];

export const agentesMap: Record<string, AgenteAI> = agentesAI.reduce(
  (acc, agente) => {
    acc[agente.id] = agente;
    return acc;
  },
  {} as Record<string, AgenteAI>
);
