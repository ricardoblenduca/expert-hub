"use client";

import { create } from "zustand";
import type {
  ModalidadeId,
  NivelId,
  CondicaoPagamento,
  AgenteNoCarrinho,
  AgenteAI,
  DadosCliente,
  ResumoCarrinho,
  CarrinhoState,
} from "@/types";
import { precosMatriz } from "@/data/precosMatriz";
import { tecnologiaInclusa, upgradeExperienceFlixOpcoes } from "@/data/tecnologiaInclusa";

export type Step = "modalidade" | "nivel" | "customizacoes" | "agentes" | "cliente" | "preview";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface StoreState {
  // Navigation
  step: Step;
  setStep: (step: Step) => void;

  // Carrinho
  carrinho: CarrinhoState;

  // Modalidade & Nivel
  setModalidade: (modalidade: ModalidadeId) => void;
  setNivel: (nivel: NivelId) => void;

  // Upgrades
  setUpgradeExperienceFlix: (nivel: NivelId | null) => void;
  setFunisExtras: (quantidade: number) => void;

  // Agentes AI
  adicionarAgente: (agente: AgenteAI, config?: Partial<AgenteNoCarrinho>) => void;
  removerAgente: (agenteId: string) => void;
  atualizarAgente: (agenteId: string, config: Partial<AgenteNoCarrinho>) => void;

  // Condicoes
  setCondicaoPagamento: (condicao: CondicaoPagamento) => void;
  setRevenueShareObservacoes: (obs: string) => void;

  // Cliente
  dadosCliente: DadosCliente;
  setDadosCliente: (dados: DadosCliente) => void;

  // Consultor
  consultor: string;
  setConsultor: (nome: string) => void;

  // Resumo
  calcularResumo: () => ResumoCarrinho;

  // UI
  mobileCartOpen: boolean;
  setMobileCartOpen: (open: boolean) => void;

  // Toast
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;

  // Reset
  resetCarrinho: () => void;
}

const initialDadosCliente: DadosCliente = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  dataReuniao: "",
  objetivosPrincipais: ["", "", ""],
  desafiosAtuais: "",
  resultadoEsperado: "",
  faturamentoAtual: "",
  observacoes: "",
  prazoImplementacao: "",
  condicoesEspeciais: "",
};

const initialCarrinho: CarrinhoState = {
  modalidade: null,
  nivel: null,
  upgradeExperienceFlix: null,
  funisExtras: 0,
  agentes: [],
  condicaoPagamento: "padrao",
  revenueShareObservacoes: "",
};

function calcularSetupAgente(agente: AgenteAI, config: Partial<AgenteNoCarrinho>): number {
  let total = agente.investimento.setup;

  if (agente.id === "mentor_ai" && config.acoesExtras) {
    total += (agente.investimento.setupAdicionalPorAcao ?? 0) * config.acoesExtras;
  }

  if (agente.id === "comercial_ai" && config.integracoesExtras) {
    total += (agente.investimento.setupAdicionalPorIntegracao ?? 0) * config.integracoesExtras;
  }

  return total;
}

function calcularMensalAgente(agente: AgenteAI, config: Partial<AgenteNoCarrinho>): number {
  let total = agente.investimento.mensal;

  if (agente.id === "comercial_ai") {
    if (config.numerosExtras) {
      total += (agente.investimento.adicionalPorNumero ?? 0) * config.numerosExtras;
    }
    if (config.prospeccaoAtiva) {
      total += agente.investimento.prospeccaoAtiva ?? 0;
    }
  }

  return total;
}

export const useCartStore = create<StoreState>((set, get) => ({
  // Navigation
  step: "modalidade",
  setStep: (step) => set({ step }),

  // Carrinho
  carrinho: initialCarrinho,

  // Modalidade
  setModalidade: (modalidade) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        modalidade,
        // Reset upgrades when changing modality
        upgradeExperienceFlix: null,
        funisExtras: 0,
      },
    })),

  // Nivel
  setNivel: (nivel) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        nivel,
        // Reset upgrades when changing level
        upgradeExperienceFlix: null,
        funisExtras: 0,
      },
    })),

  // Upgrade Experience Flix
  setUpgradeExperienceFlix: (nivel) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        upgradeExperienceFlix: nivel,
      },
    })),

  // Funis Extras
  setFunisExtras: (quantidade) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        funisExtras: Math.max(0, Math.min(20, quantidade)),
      },
    })),

  // Agentes AI
  adicionarAgente: (agente, config = {}) =>
    set((state) => {
      // Check if already added
      if (state.carrinho.agentes.some((a) => a.agente.id === agente.id)) {
        get().addToast("Este agente ja foi adicionado", "warning");
        return state;
      }

      const setupTotal = calcularSetupAgente(agente, config);
      const mensalTotal = calcularMensalAgente(agente, config);

      const novoAgente: AgenteNoCarrinho = {
        agente,
        acoesExtras: config.acoesExtras ?? 0,
        integracoesExtras: config.integracoesExtras ?? 0,
        numerosExtras: config.numerosExtras ?? 0,
        prospeccaoAtiva: config.prospeccaoAtiva ?? false,
        setupTotal,
        mensalTotal,
      };

      get().addToast(`${agente.nome} adicionado!`, "success");

      return {
        carrinho: {
          ...state.carrinho,
          agentes: [...state.carrinho.agentes, novoAgente],
        },
      };
    }),

  removerAgente: (agenteId) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        agentes: state.carrinho.agentes.filter((a) => a.agente.id !== agenteId),
      },
    })),

  atualizarAgente: (agenteId, config) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        agentes: state.carrinho.agentes.map((a) => {
          if (a.agente.id !== agenteId) return a;

          const novoConfig = { ...a, ...config };
          const setupTotal = calcularSetupAgente(a.agente, novoConfig);
          const mensalTotal = calcularMensalAgente(a.agente, novoConfig);

          return { ...novoConfig, setupTotal, mensalTotal };
        }),
      },
    })),

  // Condicoes
  setCondicaoPagamento: (condicao) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        condicaoPagamento: condicao,
      },
    })),

  setRevenueShareObservacoes: (obs) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        revenueShareObservacoes: obs,
      },
    })),

  // Cliente
  dadosCliente: initialDadosCliente,
  setDadosCliente: (dados) => set({ dadosCliente: dados }),

  // Consultor
  consultor: "Consultor Blenduca",
  setConsultor: (nome) => set({ consultor: nome }),

  // Resumo
  calcularResumo: () => {
    const { carrinho } = get();
    const { modalidade, nivel, upgradeExperienceFlix, funisExtras, agentes } = carrinho;

    // Default values
    const resumo: ResumoCarrinho = {
      pacoteEntrada: 0,
      pacoteMensal: 0,
      tecnologiaInclusa: 0,
      tecnologiaAvulsoEquivalente: 0,
      upgradeFlixMensal: 0,
      funisExtrasMensal: 0,
      totalUpgradesMensal: 0,
      agentesSetup: 0,
      agentesMensal: 0,
      totalSetup: 0,
      totalEntrada: 0,
      subtotalMensal: 0,
      totalMensal: 0,
      totalAnual: 0,
      economia: 0,
    };

    if (!modalidade || !nivel) return resumo;

    // Pacote base
    const precos = precosMatriz[nivel][modalidade];
    resumo.pacoteEntrada = precos.entrada;
    resumo.pacoteMensal = precos.mensal;

    // Tecnologia inclusa (only for EXPERT)
    if (modalidade === "expert") {
      const tech = tecnologiaInclusa[nivel];
      resumo.tecnologiaInclusa = tech.totalTecnologia.mensal;
      resumo.tecnologiaAvulsoEquivalente = tech.totalTecnologia.mensal;
    }

    // Upgrade Experience Flix
    if (modalidade === "expert" && upgradeExperienceFlix) {
      const upgrade = upgradeExperienceFlixOpcoes.find(
        (u) => u.de === nivel && u.para === upgradeExperienceFlix
      );
      if (upgrade) {
        resumo.upgradeFlixMensal = upgrade.diferencaMensal;
      }
    }

    // Funis extras
    resumo.funisExtrasMensal = funisExtras * 100;
    resumo.totalUpgradesMensal = resumo.upgradeFlixMensal + resumo.funisExtrasMensal;

    // Agentes AI
    resumo.agentesSetup = agentes.reduce((sum, a) => sum + a.setupTotal, 0);
    resumo.agentesMensal = agentes.reduce((sum, a) => sum + a.mensalTotal, 0);

    // Totais
    resumo.totalSetup = resumo.agentesSetup;
    resumo.totalEntrada = resumo.pacoteEntrada;
    resumo.subtotalMensal = resumo.pacoteMensal + resumo.totalUpgradesMensal + resumo.agentesMensal;
    resumo.totalMensal = resumo.subtotalMensal;
    resumo.totalAnual = resumo.totalMensal * 12;

    // Economia (tecnologia inclusa no EXPERT)
    if (modalidade === "expert") {
      resumo.economia = resumo.tecnologiaInclusa;
    }

    return resumo;
  },

  // UI
  mobileCartOpen: false,
  setMobileCartOpen: (open) => set({ mobileCartOpen: open }),

  // Toasts
  toasts: [],
  addToast: (message, type = "info") => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  // Reset
  resetCarrinho: () =>
    set({
      step: "modalidade",
      carrinho: initialCarrinho,
      dadosCliente: initialDadosCliente,
    }),
}));
