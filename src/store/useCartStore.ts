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
  CoProdutorConfig,
  DescontoConfig,
  TipoDesconto,
  CentralInteligenciaPacoteId,
  ServicosExtrasConfig,
} from "@/types";
import { SERVICOS_EXTRAS } from "@/data/servicosExtras";
import { precosMatriz } from "@/data/precosMatriz";
import {
  tecnologiaInclusa,
  upgradeExperienceFlixOpcoes,
} from "@/data/tecnologiaInclusa";
import { experienceFlixAvulso, funnelPagesAvulso } from "@/data/tecnologiaAvulsa";

// V5.0: New step flow with entry points (V0.12: Added negociacao)
export type Step =
  | "home" // Tela inicial com 3 pontos de entrada
  | "modalidade" // Escolha de modalidade (Programas)
  | "nivel" // Escolha de nível
  | "customizacoes" // Upgrades (só para Pacote Completo)
  | "adicionar_tech" // Adicionar tech ao Pacote Consultoria/Comunidade
  | "tecnologia" // Contratação avulsa de tecnologia
  | "agentes" // Agentes A.I (pode ser avulso ou adicionar) + Central de Inteligência
  | "extras" // Serviços Extras V0.18: Expert Planning e Sessões de Mentoria
  | "negociacao" // Negociação: Desconto + Co-produtor (V0.12)
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

  // Co-produtor (Business/Scale only)
  setCoprodutor: (config: CoProdutorConfig | null) => void;

  // Central de Inteligência - V0.12 (V0.14: added assistentesExtras)
  setCentralInteligenciaPacote: (pacoteId: CentralInteligenciaPacoteId) => void;
  setCentralInteligenciaExtras: (quantidade: number) => void; // V0.14

  // Servicos Extras V0.18
  setExpertPlanning: (ativo: boolean) => void;
  setSessaoMentoriaQtd: (qtd: number) => void;
  resetServicosExtras: () => void;

  // Desconto mensal V0.11 (V0.14: renamed from desconto)
  setDescontoMensalAtivo: (ativo: boolean) => void;
  setDescontoMensalTipo: (tipo: TipoDesconto) => void;
  setDescontoMensalValor: (valor: number) => void;
  setDescontoMensalMotivo: (motivo: string) => void;
  resetDescontoMensal: () => void;

  // Desconto setup V0.14
  setDescontoSetupAtivo: (ativo: boolean) => void;
  setDescontoSetupTipo: (tipo: TipoDesconto) => void;
  setDescontoSetupValor: (valor: number) => void;
  setDescontoSetupMotivo: (motivo: string) => void;
  resetDescontoSetup: () => void;

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

const initialDesconto: DescontoConfig = {
  ativo: false,
  tipo: "percentual",
  valor: 0,
  motivo: "",
};

const initialCentralInteligencia = {
  pacoteSelecionado: null as CentralInteligenciaPacoteId,
  assistentesExtras: 0, // V0.14: assistentes adicionais
  setupTotal: 0,
};

const initialServicosExtras: ServicosExtrasConfig = {
  expertPlanning: false,
  sessaoMentoriaQtd: 0,
};

const initialCarrinho: CarrinhoState = {
  tipoProposta: null,
  modalidade: null,
  nivel: null,
  tecnologiaAvulsa: null,
  upgradeExperienceFlix: null,
  funisExtras: 0,
  centralInteligencia: initialCentralInteligencia,
  agentes: [],
  coprodutor: null,
  servicosExtras: initialServicosExtras, // V0.18
  descontoMensal: initialDesconto, // V0.14: renamed from desconto
  descontoSetup: initialDesconto, // V0.14: novo desconto para setup
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

  // Co-produtor (Business/Scale only)
  setCoprodutor: (config) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        coprodutor: config,
      },
    })),

  // Central de Inteligência - V0.12 (V0.14: added assistentesExtras)
  setCentralInteligenciaPacote: (pacoteId) =>
    set((state) => {
      // Calculate setup based on package + extras
      let baseSetup = 0;
      if (pacoteId === "pacote_5") {
        baseSetup = 2500;
      } else if (pacoteId === "pacote_10") {
        baseSetup = 5000;
      }

      // V0.14: Add extras setup (R$ 500 each)
      const extrasSetup = state.carrinho.centralInteligencia.assistentesExtras * 500;
      const setupTotal = baseSetup + extrasSetup;

      return {
        carrinho: {
          ...state.carrinho,
          centralInteligencia: {
            pacoteSelecionado: pacoteId,
            assistentesExtras: pacoteId ? state.carrinho.centralInteligencia.assistentesExtras : 0,
            setupTotal,
          },
        },
      };
    }),

  // V0.14: Assistentes extras para Central de Inteligência
  setCentralInteligenciaExtras: (quantidade) =>
    set((state) => {
      // Limit to 0-20 extras
      const extras = Math.max(0, Math.min(20, quantidade));

      // Recalculate setup
      let baseSetup = 0;
      if (state.carrinho.centralInteligencia.pacoteSelecionado === "pacote_5") {
        baseSetup = 2500;
      } else if (state.carrinho.centralInteligencia.pacoteSelecionado === "pacote_10") {
        baseSetup = 5000;
      }

      const setupTotal = baseSetup + (extras * 500);

      return {
        carrinho: {
          ...state.carrinho,
          centralInteligencia: {
            ...state.carrinho.centralInteligencia,
            assistentesExtras: extras,
            setupTotal,
          },
        },
      };
    }),

  // Servicos Extras V0.18
  setExpertPlanning: (ativo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        servicosExtras: {
          ...state.carrinho.servicosExtras,
          expertPlanning: ativo,
        },
      },
    })),

  setSessaoMentoriaQtd: (qtd) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        servicosExtras: {
          ...state.carrinho.servicosExtras,
          sessaoMentoriaQtd: Math.max(0, Math.min(20, qtd)),
        },
      },
    })),

  resetServicosExtras: () =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        servicosExtras: { ...initialServicosExtras },
      },
    })),

  // Desconto mensal V0.11 (V0.14: renamed from desconto)
  setDescontoMensalAtivo: (ativo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoMensal: {
          ...state.carrinho.descontoMensal,
          ativo,
          // Reset values when deactivating
          ...(ativo ? {} : { valor: 0, motivo: "" }),
        },
      },
    })),

  setDescontoMensalTipo: (tipo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoMensal: {
          ...state.carrinho.descontoMensal,
          tipo,
          valor: 0, // Reset value when changing type
        },
      },
    })),

  setDescontoMensalValor: (valor) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoMensal: {
          ...state.carrinho.descontoMensal,
          valor: Math.max(0, valor),
        },
      },
    })),

  setDescontoMensalMotivo: (motivo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoMensal: {
          ...state.carrinho.descontoMensal,
          motivo,
        },
      },
    })),

  resetDescontoMensal: () =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoMensal: initialDesconto,
      },
    })),

  // Desconto setup V0.14
  setDescontoSetupAtivo: (ativo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoSetup: {
          ...state.carrinho.descontoSetup,
          ativo,
          // Reset values when deactivating
          ...(ativo ? {} : { valor: 0, motivo: "" }),
        },
      },
    })),

  setDescontoSetupTipo: (tipo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoSetup: {
          ...state.carrinho.descontoSetup,
          tipo,
          valor: 0, // Reset value when changing type
        },
      },
    })),

  setDescontoSetupValor: (valor) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoSetup: {
          ...state.carrinho.descontoSetup,
          valor: Math.max(0, valor),
        },
      },
    })),

  setDescontoSetupMotivo: (motivo) =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoSetup: {
          ...state.carrinho.descontoSetup,
          motivo,
        },
      },
    })),

  resetDescontoSetup: () =>
    set((state) => ({
      carrinho: {
        ...state.carrinho,
        descontoSetup: initialDesconto,
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
      modalidade,
      nivel,
      tecnologiaAvulsa,
      upgradeExperienceFlix,
      funisExtras,
      centralInteligencia,
      agentes,
      coprodutor,
      servicosExtras,
      descontoMensal,
      descontoSetup,
    } = carrinho;

    // Default values (V0.14: added new fields)
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
      centralInteligenciaSetup: 0,
      centralInteligenciaPacote: null,
      centralInteligenciaQuantidade: 0, // V0.14
      centralInteligenciaExtras: 0, // V0.14
      agentesSetup: 0,
      agentesMensal: 0,
      servicosExtrasTotal: 0, // V0.18
      coprodutorNome: "",
      totalSetup: 0,
      totalEntrada: 0,
      subtotalSetup: 0, // V0.14
      subtotalMensal: 0,
      valorDescontoSetup: 0, // V0.14
      motivoDescontoSetup: "", // V0.14
      valorDescontoMensal: 0, // V0.14: renamed from valorDesconto
      motivoDescontoMensal: "", // V0.14: renamed from motivoDesconto
      totalInicialComDesconto: 0, // V0.14
      totalMensal: 0,
      totalAnual: 0,
      economia: 0,
      economiaAnualDescontoMensal: 0, // V0.14: renamed from economiaAnualDesconto
      economiaAnualTotal: 0, // V0.15: desconto setup + (12 × desconto mensal)
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

    // Central de Inteligência V0.13: disponível para todos os usuários (V0.14: detailed info)
    if (centralInteligencia.pacoteSelecionado) {
      resumo.centralInteligenciaSetup = centralInteligencia.setupTotal;
      const baseAssistentes = centralInteligencia.pacoteSelecionado === "pacote_5" ? 5 : 10;
      resumo.centralInteligenciaPacote = centralInteligencia.pacoteSelecionado === "pacote_5"
        ? "5 Assistentes"
        : "10 Assistentes";
      resumo.centralInteligenciaExtras = centralInteligencia.assistentesExtras;
      resumo.centralInteligenciaQuantidade = baseAssistentes + centralInteligencia.assistentesExtras;
    }

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

    // Servicos Extras V0.18
    if (nivel) {
      if (servicosExtras.expertPlanning) {
        resumo.servicosExtrasTotal += SERVICOS_EXTRAS.expertPlanning.precos[nivel];
      }
      if (servicosExtras.sessaoMentoriaQtd > 0) {
        resumo.servicosExtrasTotal +=
          SERVICOS_EXTRAS.sessaoMentoria.precos[nivel] * servicosExtras.sessaoMentoriaQtd;
      }
    }

    // Totais (antes do desconto)
    resumo.totalSetup = resumo.agentesSetup + resumo.centralInteligenciaSetup + resumo.servicosExtrasTotal;
    resumo.totalEntrada = resumo.pacoteEntrada + resumo.techAvulsaEntrada;
    resumo.subtotalSetup = resumo.totalSetup + resumo.totalEntrada; // V0.14: investimento inicial antes do desconto
    resumo.subtotalMensal =
      resumo.pacoteMensal +
      resumo.totalUpgradesMensal +
      resumo.techAvulsaMensal +
      resumo.agentesMensal;

    // Co-produtor name (V0.12: apenas dados, sem cálculo de comissão)
    if (coprodutor?.ativo && coprodutor.nome) {
      resumo.coprodutorNome = coprodutor.nome;
    }

    // Desconto Setup V0.14
    if (descontoSetup.ativo && descontoSetup.valor > 0) {
      if (descontoSetup.tipo === "percentual") {
        // Desconto percentual (limitado a 100%)
        const percentual = Math.min(descontoSetup.valor, 100);
        resumo.valorDescontoSetup = Math.round((resumo.subtotalSetup * percentual) / 100);
      } else {
        // Desconto em valor fixo (limitado ao subtotal)
        resumo.valorDescontoSetup = Math.min(descontoSetup.valor, resumo.subtotalSetup);
      }
      resumo.motivoDescontoSetup = descontoSetup.motivo;
    }

    // Desconto Mensal V0.11 (V0.14: renamed)
    if (descontoMensal.ativo && descontoMensal.valor > 0) {
      if (descontoMensal.tipo === "percentual") {
        // Desconto percentual (limitado a 100%)
        const percentual = Math.min(descontoMensal.valor, 100);
        resumo.valorDescontoMensal = Math.round((resumo.subtotalMensal * percentual) / 100);
      } else {
        // Desconto em valor fixo (limitado ao subtotal)
        resumo.valorDescontoMensal = Math.min(descontoMensal.valor, resumo.subtotalMensal);
      }
      resumo.motivoDescontoMensal = descontoMensal.motivo;
      resumo.economiaAnualDescontoMensal = resumo.valorDescontoMensal * 12;
    }

    // Total final (após desconto)
    resumo.totalInicialComDesconto = resumo.subtotalSetup - resumo.valorDescontoSetup; // V0.14
    resumo.totalMensal = resumo.subtotalMensal - resumo.valorDescontoMensal;
    resumo.totalAnual = resumo.totalMensal * 12;

    // Economia (tecnologia inclusa no Pacote Completo)
    if (modalidade === "completo") {
      resumo.economia = resumo.tecnologiaInclusa;
    }

    // V0.15: Economia total anual = desconto setup + (12 × desconto mensal)
    resumo.economiaAnualTotal = resumo.valorDescontoSetup + resumo.economiaAnualDescontoMensal;

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
      carrinho: {
        ...initialCarrinho,
        centralInteligencia: { ...initialCentralInteligencia },
        servicosExtras: { ...initialServicosExtras }, // V0.18
        descontoMensal: { ...initialDesconto },
        descontoSetup: { ...initialDesconto },
      },
      dadosCliente: initialDadosCliente,
    }),
}));
