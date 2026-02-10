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
  TecnologiaNoCarrinho,
} from "@/types";
import { precosMatriz } from "@/data/precosMatriz";
import {
  tecnologiaInclusa,
  upgradeExperienceFlixOpcoes,
} from "@/data/tecnologiaInclusa";
import { experienceFlixAvulso, funnelPagesAvulso } from "@/data/tecnologiaAvulsa";

// V5.0: New step flow with entry points
export type Step =
  | "home" // Tela inicial com 3 pontos de entrada
  | "modalidade" // Escolha de modalidade (Programas)
  | "nivel" // Escolha de nível
  | "customizacoes" // Upgrades (só para Pacote Completo)
  | "adicionar_tech" // Adicionar tech ao Pacote Consultoria/Comunidade
  | "tecnologia" // Contratação avulsa de tecnologia
  | "agentes" // Agentes A.I (pode ser avulso ou adicionar)
  | "cliente" // Dados do cliente
  | "preview"; // Preview da proposta

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

  // Tipo de proposta
  setTipoProposta: (
    tipo: "programa" | "tecnologia" | "agentes" | "combinado"
  ) => void;

  // Modalidade & Nivel
  setModalidade: (modalidade: ModalidadeId) => void;
  setNivel: (nivel: NivelId) => void;

  // Tecnologia avulsa
  setTecnologiaAvulsa: (tech: TecnologiaNoCarrinho | null) => void;
  setExperienceFlixAvulso: (plano: NivelId | null) => void;
  setFunnelPagesAvulso: (
    config: TecnologiaNoCarrinho["funnelPages"] | null
  ) => void;

  // Upgrades (para Pacote Completo)
  setUpgradeExperienceFlix: (nivel: NivelId | null) => void;
  setFunisExtras: (quantidade: number) => void;

  // Agentes AI
  adicionarAgente: (
    agente: AgenteAI,
    config?: Partial<AgenteNoCarrinho>
  ) => void;
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

  // Sugestão de upgrade inteligente
  verificarSugestaoUpgrade: () => ResumoCarrinho["sugestaoUpgrade"];

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
  tipoProposta: null,
  modalidade: null,
  nivel: null,
  tecnologiaAvulsa: null,
  upgradeExperienceFlix: null,
  funisExtras: 0,
  agentes: [],
  condicaoPagamento: "padrao",
  revenueShareObservacoes: "",
};

function calcularSetupAgente(
  agente: AgenteAI,
  config: Partial<AgenteNoCarrinho>
): number {
  let total = agente.investimento.setup;

  if (agente.id === "mentor_ai" && config.acoesExtras) {
    total +=
      (agente.investimento.setupAdicionalPorAcao ?? 0) * config.acoesExtras;
  }

  if (agente.id === "comercial_ai" && config.integracoesExtras) {
    total +=
      (agente.investimento.setupAdicionalPorIntegracao ?? 0) *
      config.integracoesExtras;
  }

  return total;
}

function calcularMensalAgente(
  agente: AgenteAI,
  config: Partial<AgenteNoCarrinho>
): number {
  let total = agente.investimento.mensal;

  if (agente.id === "comercial_ai") {
    if (config.numerosExtras) {
      total +=
        (agente.investimento.adicionalPorNumero ?? 0) * config.numerosExtras;
    }
    if (config.prospeccaoAtiva) {
      total += agente.investimento.prospeccaoAtiva ?? 0;
    }
  }

  return total;
}

export const useCartStore = create<StoreState>((set, get) => ({
  // Navigation - Start at home (entry point selection)
  step: "home",
  setStep: (step) => set({ step }),

  // Carrinho
  carrinho: initialCarrinho,

  // Tipo de proposta
  setTipoProposta: (tipo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        tipoProposta: tipo,
      },
    })),

  // Modalidade
  setModalidade: (modalidade) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        modalidade,
        tipoProposta: state.carrinho.tipoProposta || "programa",
        // Reset tech and upgrades when changing modality
        tecnologiaAvulsa: null,
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

  // Tecnologia avulsa
  setTecnologiaAvulsa: (tech) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        tecnologiaAvulsa: tech,
        tipoProposta: state.carrinho.tipoProposta || "tecnologia",
      },
    })),

  setExperienceFlixAvulso: (plano) =>
    set((state) => {
      if (!plano) {
        // Remove Experience Flix
        const newTech = state.carrinho.tecnologiaAvulsa
          ? { ...state.carrinho.tecnologiaAvulsa, experienceFlix: undefined }
          : null;
        return {
          carrinho: {
            ...state.carrinho,
            tecnologiaAvulsa: newTech?.funnelPages ? newTech : null,
          },
        };
      }

      const flixData = experienceFlixAvulso[plano];
      const newFlix = {
        plano,
        mensal: flixData.investimento.mensal,
        entrada: flixData.investimento.entrada ?? 0,
      };

      return {
        carrinho: {
          ...state.carrinho,
          tecnologiaAvulsa: {
            ...state.carrinho.tecnologiaAvulsa,
            experienceFlix: newFlix,
          },
          tipoProposta:
            state.carrinho.tipoProposta === "programa"
              ? "combinado"
              : state.carrinho.tipoProposta || "tecnologia",
        },
      };
    }),

  setFunnelPagesAvulso: (config) =>
    set((state) => {
      if (!config) {
        // Remove Funnel Pages
        const newTech = state.carrinho.tecnologiaAvulsa
          ? { ...state.carrinho.tecnologiaAvulsa, funnelPages: undefined }
          : null;
        return {
          carrinho: {
            ...state.carrinho,
            tecnologiaAvulsa: newTech?.experienceFlix ? newTech : null,
          },
        };
      }

      return {
        carrinho: {
          ...state.carrinho,
          tecnologiaAvulsa: {
            ...state.carrinho.tecnologiaAvulsa,
            funnelPages: config,
          },
          tipoProposta:
            state.carrinho.tipoProposta === "programa"
              ? "combinado"
              : state.carrinho.tipoProposta || "tecnologia",
        },
      };
    }),

  // Upgrade Experience Flix (para Pacote Completo)
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
        get().addToast("Este agente já foi adicionado", "warning");
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

      // Update tipoProposta
      let tipoProposta = state.carrinho.tipoProposta;
      if (!tipoProposta) {
        tipoProposta = "agentes";
      } else if (tipoProposta === "programa" || tipoProposta === "tecnologia") {
        tipoProposta = "combinado";
      }

      return {
        carrinho: {
          ...state.carrinho,
          agentes: [...state.carrinho.agentes, novoAgente],
          tipoProposta,
        },
      };
    }),

  removerAgente: (agenteId) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        agentes: state.carrinho.agentes.filter(
          (a) => a.agente.id !== agenteId
        ),
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
    const {
      tipoProposta,
      modalidade,
      nivel,
      tecnologiaAvulsa,
      upgradeExperienceFlix,
      funisExtras,
      agentes,
    } = carrinho;

    // Default values
    const resumo: ResumoCarrinho = {
      pacoteEntrada: 0,
      pacoteMensal: 0,
      tecnologiaInclusa: 0,
      tecnologiaAvulsoEquivalente: 0,
      techAvulsaEntrada: 0,
      techAvulsaMensal: 0,
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

    // Pacote base (programa)
    if (modalidade && nivel) {
      const precos = precosMatriz[nivel][modalidade];
      resumo.pacoteEntrada = precos.entrada;
      resumo.pacoteMensal = precos.mensal;

      // Tecnologia inclusa (only for Pacote Completo)
      if (modalidade === "completo") {
        const tech = tecnologiaInclusa[nivel];
        resumo.tecnologiaInclusa = tech.totalTecnologia.mensal;
        resumo.tecnologiaAvulsoEquivalente = tech.totalTecnologia.mensal;
      }
    }

    // Upgrade Experience Flix (para Pacote Completo)
    if (modalidade === "completo" && upgradeExperienceFlix && nivel) {
      const upgrade = upgradeExperienceFlixOpcoes.find(
        (u) => u.de === nivel && u.para === upgradeExperienceFlix
      );
      if (upgrade) {
        resumo.upgradeFlixMensal = upgrade.diferencaMensal;
      }
    }

    // Funis extras (para Pacote Completo)
    if (modalidade === "completo") {
      resumo.funisExtrasMensal = funisExtras * 100;
    }

    resumo.totalUpgradesMensal =
      resumo.upgradeFlixMensal + resumo.funisExtrasMensal;

    // Tecnologia avulsa
    if (tecnologiaAvulsa) {
      if (tecnologiaAvulsa.experienceFlix) {
        resumo.techAvulsaEntrada += tecnologiaAvulsa.experienceFlix.entrada;
        resumo.techAvulsaMensal += tecnologiaAvulsa.experienceFlix.mensal;
      }
      if (tecnologiaAvulsa.funnelPages) {
        resumo.techAvulsaMensal += tecnologiaAvulsa.funnelPages.mensal;
      }
    }

    // Agentes AI
    resumo.agentesSetup = agentes.reduce((sum, a) => sum + a.setupTotal, 0);
    resumo.agentesMensal = agentes.reduce((sum, a) => sum + a.mensalTotal, 0);

    // Totais
    resumo.totalSetup = resumo.agentesSetup;
    resumo.totalEntrada = resumo.pacoteEntrada + resumo.techAvulsaEntrada;
    resumo.subtotalMensal =
      resumo.pacoteMensal +
      resumo.totalUpgradesMensal +
      resumo.techAvulsaMensal +
      resumo.agentesMensal;
    resumo.totalMensal = resumo.subtotalMensal;
    resumo.totalAnual = resumo.totalMensal * 12;

    // Economia (tecnologia inclusa no Pacote Completo)
    if (modalidade === "completo") {
      resumo.economia = resumo.tecnologiaInclusa;
    }

    // Verificar sugestão de upgrade
    resumo.sugestaoUpgrade = get().verificarSugestaoUpgrade();

    return resumo;
  },

  // Sugestão de upgrade inteligente
  verificarSugestaoUpgrade: () => {
    const { carrinho } = get();
    const { modalidade, nivel, tecnologiaAvulsa } = carrinho;

    // Só sugerir para Consultoria ou Comunidade com tecnologia
    if (
      !nivel ||
      !modalidade ||
      modalidade === "completo" ||
      !tecnologiaAvulsa
    ) {
      return undefined;
    }

    const hasFlixAvulso = !!tecnologiaAvulsa.experienceFlix;
    const hasFunnelAvulso = !!tecnologiaAvulsa.funnelPages;

    if (!hasFlixAvulso && !hasFunnelAvulso) {
      return undefined;
    }

    // Calcular custo atual
    const precoBase = precosMatriz[nivel][modalidade].mensal;
    const flixMensal = tecnologiaAvulsa.experienceFlix?.mensal ?? 0;
    const funnelMensal = tecnologiaAvulsa.funnelPages?.mensal ?? 0;
    const totalMontado = precoBase + flixMensal + funnelMensal;

    // Pacote Completo equivalente
    const pacoteCompleto = precosMatriz[nivel].completo.mensal;

    if (totalMontado > pacoteCompleto) {
      const economia = totalMontado - pacoteCompleto;
      const pacoteNome =
        modalidade === "consultoria" ? "Pacote Consultoria" : "Pacote Comunidade";

      return {
        mostrar: true,
        mensagem: `💡 Dica: O Pacote Completo sai mais barato!

Você está montando:
${pacoteNome}: R$ ${precoBase.toLocaleString("pt-BR")}/mês
${hasFlixAvulso ? `+ Experience Flix: R$ ${flixMensal.toLocaleString("pt-BR")}/mês` : ""}
${hasFunnelAvulso ? `+ Funnel Pages: R$ ${funnelMensal.toLocaleString("pt-BR")}/mês` : ""}
= R$ ${totalMontado.toLocaleString("pt-BR")}/mês

MAS o Pacote Completo ${nivel.toUpperCase()} custa apenas R$ ${pacoteCompleto.toLocaleString("pt-BR")}/mês

Economia: R$ ${economia.toLocaleString("pt-BR")}/mês`,
        economia,
      };
    }

    return undefined;
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
      step: "home",
      carrinho: initialCarrinho,
      dadosCliente: initialDadosCliente,
    }),
}));
