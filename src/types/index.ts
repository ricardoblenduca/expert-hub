// ============================================
// MODALIDADES
// ============================================

export type ModalidadeId = "expert" | "exper" | "xper";

export interface Modalidade {
  id: ModalidadeId;
  nome: string;
  descricao: string;
  icone: string;
  incluiConsultoria: boolean;
  incluiComunidade: boolean;
  incluiTecnologia: boolean;
  cor: string;
  observacao?: string;
}

// ============================================
// NIVEIS
// ============================================

export type NivelId = "starter" | "professional" | "business" | "scale";

export interface NivelConfig {
  id: NivelId;
  nome: string;
  faturamento: string;
  persona: string;
  cor: string;
}

// ============================================
// MATRIZ DE PRECOS
// ============================================

export interface PrecoNivel {
  entrada: number;
  mensal: number;
}

export interface PrecosModalidade {
  expert: PrecoNivel;
  exper: PrecoNivel;
  xper: PrecoNivel;
}

export type PrecosMatriz = Record<NivelId, PrecosModalidade>;

// ============================================
// TECNOLOGIA INCLUSA (EXPERT)
// ============================================

export interface LimitesPlataforma {
  areas: number | "Ilimitado";
  usuariosAtivos: number | "Ilimitado";
  custoExcedente: number;
}

export interface ValorAvulso {
  entrada?: number;
  mensal: number;
  anuidade: number;
}

export interface ExperienceFlixConfig {
  plano: string;
  descricao: string;
  recursos: string[];
  limites: LimitesPlataforma;
  valorAvulso: ValorAvulso;
}

export interface FunnelPagesConfig {
  plano: string;
  descricao: string;
  funis: string[];
  automacao: string[];
  quantidade: {
    paginaLinks: number;
    funis: number;
  };
  valorAvulso: ValorAvulso;
}

export interface GeniusAIConfig {
  plano: string;
  descricao: string;
  recursos: string[];
  valorEstimado: {
    mensal: number;
    anuidade: number;
  };
}

export interface TecnologiaNivel {
  experienceFlix: ExperienceFlixConfig;
  funnelPages: FunnelPagesConfig;
  geniusAI?: GeniusAIConfig;
  totalTecnologia: {
    mensal: number;
    anuidade: number;
  };
}

export type TecnologiaInclusa = Record<NivelId, TecnologiaNivel>;

// ============================================
// UPGRADES DE TECNOLOGIA
// ============================================

export interface UpgradeOpcao {
  de: NivelId;
  para: NivelId;
  diferencaMensal: number;
  descricao: string;
}

export interface UpgradeTecnologia {
  id: string;
  nome: string;
  descricao: string;
  opcoes: UpgradeOpcao[];
}

export interface FunisAdicionaisConfig {
  id: string;
  nome: string;
  descricao: string;
  precoPorFunil: number;
  minimo: number;
  maximo: number;
  observacao: string;
}

// ============================================
// PRODUTOS AVULSOS (AGENTES AI)
// ============================================

export interface InvestimentoAgente {
  setup: number;
  setupAdicionalPorAcao?: number;
  setupAdicionalPorIntegracao?: number;
  mensal: number;
  adicionalPorNumero?: number;
  prospeccaoAtiva?: number;
}

export interface AgenteAI {
  id: string;
  categoria: string;
  nome: string;
  descricao: string;
  entregaveis: string[];
  investimento: InvestimentoAgente;
  icone: string;
  cor: string;
}

// ============================================
// ENTREGAVEIS DO PACOTE BASE
// ============================================

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
  icone?: string;
}

export interface Pilar {
  pilar: string;
  icone?: string;
  items: Entregavel[];
}

// ============================================
// CONDICOES COMERCIAIS
// ============================================

export type CondicaoPagamento = "padrao" | "revenue_share";

export interface CondicoesComerciais {
  duracao: string;
  minimoMeses: number;
  avisoPrevia: number;
  multaRescisoria: string;
  formaPagamento: string;
  revenueShare?: string;
}

// ============================================
// CARRINHO E PROPOSTA
// ============================================

export interface AgenteNoCarrinho {
  agente: AgenteAI;
  acoesExtras?: number;
  integracoesExtras?: number;
  numerosExtras?: number;
  prospeccaoAtiva?: boolean;
  setupTotal: number;
  mensalTotal: number;
}

export interface CarrinhoState {
  modalidade: ModalidadeId | null;
  nivel: NivelId | null;
  upgradeExperienceFlix: NivelId | null;
  funisExtras: number;
  agentes: AgenteNoCarrinho[];
  condicaoPagamento: CondicaoPagamento;
  revenueShareObservacoes: string;
}

export interface ResumoCarrinho {
  // Pacote base
  pacoteEntrada: number;
  pacoteMensal: number;

  // Tecnologia inclusa (EXPERT)
  tecnologiaInclusa: number;
  tecnologiaAvulsoEquivalente: number;

  // Upgrades
  upgradeFlixMensal: number;
  funisExtrasMensal: number;
  totalUpgradesMensal: number;

  // Agentes AI
  agentesSetup: number;
  agentesMensal: number;

  // Totais
  totalSetup: number;
  totalEntrada: number;
  subtotalMensal: number;
  totalMensal: number;
  totalAnual: number;

  // Economia
  economia: number;
}

// ============================================
// DADOS DO CLIENTE
// ============================================

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

// ============================================
// PROPOSTA COMERCIAL
// ============================================

export interface Proposta {
  id: string;
  data: Date;
  validade: Date;
  cliente: DadosCliente;
  carrinho: CarrinhoState;
  resumo: ResumoCarrinho;
  consultor: string;
}

// ============================================
// ENTREGAVEIS POR MODALIDADE/NIVEL
// ============================================

export interface EntregaveisConfig {
  modalidade: ModalidadeId;
  nivel: NivelId;
  pilares: Pilar[];
}
