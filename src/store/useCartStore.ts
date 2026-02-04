import { create } from "zustand";
import type {
  ItemCarrinho,
  Produto,
  UpgradePlataforma,
  DadosCliente,
  ResumoCarrinho,
} from "@/types";
import { calcularResumo } from "@/utils/calculations";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

type AppStep = "catalogo" | "cliente" | "preview";

interface CartState {
  carrinho: ItemCarrinho[];
  dadosCliente: DadosCliente;
  consultor: string;
  step: AppStep;
  mobileCartOpen: boolean;
  toasts: Toast[];

  adicionarProduto: (produto: Produto) => void;
  adicionarFunnel: (upgrade: UpgradePlataforma, funisExtras: number) => void;
  adicionarFlix: (upgrade: UpgradePlataforma) => void;
  removerItem: (itemId: string) => void;
  atualizarFunisExtras: (itemId: string, funisExtras: number) => void;
  setDadosCliente: (dados: Partial<DadosCliente>) => void;
  setConsultor: (nome: string) => void;
  setStep: (step: AppStep) => void;
  setMobileCartOpen: (open: boolean) => void;
  limparCarrinho: () => void;
  getResumo: () => ResumoCarrinho;

  addToast: (message: string, type: Toast["type"]) => void;
  removeToast: (id: string) => void;
}

const dadosClienteInicial: DadosCliente = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  dataReuniao: "",
  objetivosPrincipais: [],
  desafiosAtuais: "",
  resultadoEsperado: "",
  faturamentoAtual: "",
  observacoes: "",
  prazoImplementacao: "",
  condicoesEspeciais: "",
};

export const useCartStore = create<CartState>((set, get) => ({
  carrinho: [],
  dadosCliente: dadosClienteInicial,
  consultor: "",
  step: "catalogo",
  mobileCartOpen: false,
  toasts: [],

  adicionarProduto: (produto: Produto) => {
    set((state) => {
      const novoCarrinho = state.carrinho.filter((i) => i.tipo !== "produto");
      return {
        carrinho: [
          ...novoCarrinho,
          { tipo: "produto" as const, item: produto, quantidade: 1 },
        ],
      };
    });
    get().addToast(`${produto.categoria} adicionado!`, "success");
  },

  adicionarFunnel: (upgrade: UpgradePlataforma, funisExtras: number) => {
    const state = get();
    const funnelExistente = state.carrinho.find(
      (i) => i.tipo === "upgrade_funnel"
    );
    if (funnelExistente) {
      get().addToast(
        "Voce ja tem um plano Funnel Pages. Remova-o antes de adicionar outro.",
        "warning"
      );
      return;
    }

    const precoBase = upgrade.preco;
    const precoPorFunil = upgrade.upgrades?.funisExtras.precoPorUnidade ?? 100;
    const precoExtras = funisExtras * precoPorFunil;
    const precoTotal = precoBase + precoExtras;

    set((s) => ({
      carrinho: [
        ...s.carrinho,
        {
          tipo: "upgrade_funnel" as const,
          item: upgrade,
          quantidade: 1,
          funisExtras,
          precoBase,
          precoExtras,
          precoTotal,
        },
      ],
    }));
    get().addToast(
      `Funnel Pages ${upgrade.plano} adicionado!` +
        (funisExtras > 0 ? ` (+${funisExtras} funis extras)` : ""),
      "success"
    );
  },

  adicionarFlix: (upgrade: UpgradePlataforma) => {
    const state = get();
    const flixExistente = state.carrinho.find(
      (i) => i.tipo === "upgrade_flix"
    );
    if (flixExistente) {
      get().addToast(
        "Voce ja tem um plano Experience Flix. Remova-o antes de adicionar outro.",
        "warning"
      );
      return;
    }

    set((s) => ({
      carrinho: [
        ...s.carrinho,
        {
          tipo: "upgrade_flix" as const,
          item: upgrade,
          quantidade: 1,
          precoBase: upgrade.preco,
          precoExtras: 0,
          precoTotal: upgrade.preco,
        },
      ],
    }));
    get().addToast(
      `Experience Flix ${upgrade.plano} adicionado ao pacote!`,
      "success"
    );
  },

  removerItem: (itemId: string) => {
    set((state) => ({
      carrinho: state.carrinho.filter((i) => i.item.id !== itemId),
    }));
  },

  atualizarFunisExtras: (itemId: string, funisExtras: number) => {
    if (funisExtras < 0 || funisExtras > 20) return;
    set((state) => ({
      carrinho: state.carrinho.map((i) => {
        if (i.item.id !== itemId || i.tipo !== "upgrade_funnel") return i;
        const upgrade = i.item as UpgradePlataforma;
        const precoPorFunil =
          upgrade.upgrades?.funisExtras.precoPorUnidade ?? 100;
        const precoBase = upgrade.preco;
        const precoExtras = funisExtras * precoPorFunil;
        return {
          ...i,
          funisExtras,
          precoBase,
          precoExtras,
          precoTotal: precoBase + precoExtras,
        };
      }),
    }));
  },

  setDadosCliente: (dados: Partial<DadosCliente>) => {
    set((state) => ({
      dadosCliente: { ...state.dadosCliente, ...dados },
    }));
  },

  setConsultor: (nome: string) => {
    set({ consultor: nome });
  },

  setStep: (step: AppStep) => {
    set({ step });
  },

  setMobileCartOpen: (open: boolean) => {
    set({ mobileCartOpen: open });
  },

  limparCarrinho: () => {
    set({ carrinho: [], dadosCliente: dadosClienteInicial });
  },

  getResumo: () => {
    return calcularResumo(get().carrinho);
  },

  addToast: (message: string, type: Toast["type"]) => {
    const id = `toast_${Date.now()}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3000);
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
