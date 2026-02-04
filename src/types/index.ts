export interface Investimento {
  mensal: number;
  minimoMeses: number;
  setup?: number;
  extras?: string;
}

export interface Entregavel {
  categoria: string;
  descricao: string;
  detalhes?: string;
  frequencia?: string;
  tipo?: string;
  nivel?: string;
  canal?: string;
  quantidade?: string;
  acesso?: boolean;
}

export interface Pilar {
  pilar: string;
  items: Entregavel[];
}

export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  tagline: string;
  cor: string;
  persona: string;
  faturamento: string;
  duracao: string;
  investimento: Investimento;
  entregaveis: Pilar[];
  composicaoPreco: Record<string, number>;
}

export interface ServicoAdicional {
  id: string;
  categoria: string;
  nome: string;
  descricao: string;
  preco: number;
  tipo: "mensal" | "unico";
  nivelDedicacao?: string;
  entregaveis: string[];
}

export interface ItemCarrinho {
  tipo: "produto" | "servico";
  item: Produto | ServicoAdicional;
  quantidade: number;
  notas?: string;
}

export interface DadosCliente {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  dataReuniao: string;
  objetivosPrincipais: string[];
  desafiosAtuais: string;
  resultadoEsperado: string;
  faturamentoAtual: string;
  observacoes: string;
  prazoImplementacao: string;
  condicoesEspeciais: string;
}

export interface Proposta {
  id: string;
  data: Date;
  validade: Date;
  cliente: DadosCliente;
  itens: ItemCarrinho[];
  subtotal: number;
  desconto: number;
  total: number;
  consultor: string;
}

export interface ResumoCarrinho {
  totalProduto: number;
  totalServicos: number;
  subtotal: number;
  desconto: number;
  total: number;
  totalAnual: number;
}
