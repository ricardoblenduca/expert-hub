import { create } from "zustand";
import type {
  ItemCarrinho,
  Produto,
  ServicoAdicional,
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
  adicionarServico: (servico: ServicoAdicional) => void;
  removerItem: (itemId: string) => void;
  atualizarQuantidade: (itemId: string, quantidade: number) => void;
  atualizarNotas: (itemId: string, notas: string) => void;
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
      const hadProduct = state.carrinho.some((i) => i.tipo === "produto");
      return { carrinho: [...novoCarrinho, { tipo: "produto", item: produto, quantidade: 1 }] };
    });
    get().addToast(`${produto.categoria} adicionado!`, "success");
  },

  adicionarServico: (servico: ServicoAdicional) => {
    const state = get();
    const existe = state.carrinho.find(
      (i) => i.tipo === "servico" && i.item.id === servico.id
    );
    if (existe) {
      get().addToast("Este servico ja esta no carrinho", "warning");
      return;
    }
    set((s) => ({
      carrinho: [
        ...s.carrinho,
        { tipo: "servico", item: servico, quantidade: 1 },
      ],
    }));
    get().addToast("Servico adicionado!", "success");
  },

  removerItem: (itemId: string) => {
    set((state) => ({
      carrinho: state.carrinho.filter((i) => i.item.id !== itemId),
    }));
  },

  atualizarQuantidade: (itemId: string, quantidade: number) => {
    if (quantidade < 1 || quantidade > 10) return;
    set((state) => ({
      carrinho: state.carrinho.map((i) =>
        i.item.id === itemId ? { ...i, quantidade } : i
      ),
    }));
  },

  atualizarNotas: (itemId: string, notas: string) => {
    set((state) => ({
      carrinho: state.carrinho.map((i) =>
        i.item.id === itemId ? { ...i, notas } : i
      ),
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
