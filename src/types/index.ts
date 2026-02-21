// ============================================
// MODALIDADES V5.0
// ============================================

export type ModalidadeId = "completo" | "consultoria" | "comunidade";

export interface Modalidade {
  id: ModalidadeId;
  nome: string;
  nomeMarketing: string;
  tagline: string;
  descricao: string;
  paraQuem: string;
  icone: string;
  cor: string;
  inclui: {
    consultoriaIndividual: boolean;
    comunidadeEventos: boolean;
    tecnologiaCompleta: boolean;
  };
  destaque?: boolean;
  podeFazerUpgrade?: {
    para: ModalidadeId;
    mensagem: string;
  };
}

// ============================================
// NIVEIS V6.0
// ============================================

export type NivelId = "starter" | "professional" | "business" | "scale";

export interface NivelConfig {
  id: NivelId;
  nome: string;
  nomeCompleto?: string;
  faturamento: string;
  persona: string;
  personaDescricao?: string;
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
  completo: PrecoNivel;
  consultoria: PrecoNivel;
  comunidade: PrecoNivel;
}

export type PrecosMatriz = Record<NivelId, PrecosModalidade>;

// ============================================
// TECNOLOGIA (AVULSA OU INCLUSA)
// ============================================

export interface LimitesPlataforma {
  areas: number | "Ilimitado";
  usuariosAtivos: number | "Ilimitado";
  custoExcedente: number;
  textoExcedente?: string;
}

export interface ValorAvulso {
  entrada?: number;
  mensal: number;
  anuidade?: number;
  condicoes?: string;
}

export interface BeneficioRecurso {
  titulo: string;
  significado: string;
}

export interface ExperienceFlixConfig {
  id: string;
  plano: string;
  nome: string;
  descricao: string;
  recursos: string[];
  beneficios?: Record<string, BeneficioRecurso>;
  limites: LimitesPlataforma;
  valorAvulso: ValorAvulso;
  descontoNoPacoteCompleto?: number;
  podeAdicionarAoPacote?: boolean;
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
// EXPERIENCE FLIX AVULSO (V0.9 - WITH UPGRADES)
// ============================================

export interface FlixUpgradeOption {
  planoDestino: NivelId;
  custoAdicional: number;
  diferenciais: string[];
}

export interface ExperienceFlixAvulso {
  id: string;
  plano: NivelId;
  nome: string;
  descricao: string;
  recursos: string[];
  diferenciais?: string[];
  beneficios?: Record<string, BeneficioRecurso>;
  limites: LimitesPlataforma;
  investimento: ValorAvulso;
  descontoNoPacoteCompleto: number;
  naoInclui?: string[];
  detalhes?: {
    excedenteMembros?: string;
    contrato?: string;
    idealPara?: string;
  };
  upgrades?: Record<string, FlixUpgradeOption>;
}

// ============================================
// FUNNEL PAGES AVULSO (À LA CARTE)
// ============================================

export interface TipoFunil {
  tipo: string;
  descricao: string;
  conversaoMedia: string;
  melhorPara: string;
}

export interface ItemFunilInclui {
  item: string;
  significado: string;
}

export interface FunnelUpgradeOption {
  planoDestino: string;
  custoAdicional: number;
  diferenciais: string[];
}

export interface PacoteFunnelSugerido {
  id: string;
  nome: string;
  funis: number;
  preco: number;
  economia?: number;
  descricao: string;
  tipos?: string[];
  recursos?: string[];
  significado?: string;
  upgrades?: Record<string, FunnelUpgradeOption>;
}

export interface FunnelPagesAvulsoConfig {
  id: string;
  nome: string;
  descricao: string;
  modelo: "ala_carte";
  precoBase: {
    paginaLinks: number;
    precoPorFunil: number;
    minimo: number;
    maximo: number;
  };
  pacotesSugeridos: PacoteFunnelSugerido[];
  oqueCadaFunilInclui: ItemFunilInclui[];
  tiposDeFunis: TipoFunil[];
}

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
// ENTREGAVEIS V6.0 (COM SIGNIFICADO E DETALHES POR NIVEL)
// ============================================

export interface DetalhesNivel {
  starter?: string;
  professional?: string;
  business?: string;
  scale?: string;
}

export interface ValorAvulsoPorNivel {
  starter?: number;
  professional?: number;
  business?: number;
  scale?: number;
}

export interface Entregavel {
  id: string;
  nome: string;

  // Descrição técnica (o que é)
  descricao: string;

  // O que isso significa para o cliente (benefício)
  significado: string;

  // Detalhes específicos por nível
  detalhesNivel?: DetalhesNivel;

  frequencia?: string;
  formato?: string;
  icone: string;
  acesso?: string;
  nivel?: string;
  quantidade?: string;
  canal?: string;

  // Para tecnologia
  valorAvulso?: ValorAvulsoPorNivel;
}

export interface PilarEntregaveis {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  ordem: number;
  entregaveis: Entregavel[];
}

// Legacy interface for backwards compatibility
export interface EntregavelCompleto {
  id: string;
  categoria: string;
  nome: string;
  descricaoTecnica: string;
  oQueIstoSignifica: string;
  resultadoEsperado: string;
  frequencia?: string;
  formato?: string;
  icone: string;
  destaque?: boolean;
  valorEstimadoAvulso?: number;
  diferencialPlano?: string;
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
// CO-PRODUTOR V0.7
// ============================================

export interface CoProdutorConfig {
  ativo: boolean;
  nome: string;
  email: string;
  percentualComissao: number; // 1-100%
  observacoes: string;
}

// ============================================
// DESCONTO V0.11
// ============================================

export type TipoDesconto = "percentual" | "valor";

export interface DescontoConfig {
  ativo: boolean;
  tipo: TipoDesconto;
  valor: number; // percentual (0-100) ou valor fixo em R$
  motivo: string; // opcional: motivo do desconto
}

// ============================================
// GENIUS AI ASSISTENTES V0.11 (DEPRECATED in V0.12)
// ============================================

export interface GeniusAIAssistentesConfig {
  precoUnitario: number; // R$ 500/assistente
  maximo: number; // Máximo de assistentes adicionais
  descricao: string;
  exemplos: string[];
}

// ============================================
// CENTRAL DE INTELIGÊNCIA V0.12 (V0.14: added assistentesExtras)
// ============================================

export type CentralInteligenciaPacoteId = "pacote_5" | "pacote_10" | null;

export interface CentralInteligenciaPacote {
  id: CentralInteligenciaPacoteId;
  nome: string;
  assistentes: number;
  setup: number;
  descricao: string;
  recursos: string[];
}

export interface CentralInteligenciaConfig {
  pacoteSelecionado: CentralInteligenciaPacoteId;
  assistentesExtras: number; // V0.14: assistentes adicionais (R$ 500 cada)
  setupTotal: number;
}

// ============================================
// SERVICOS EXTRAS V0.18
// ============================================

export interface ServicosExtrasConfig {
  expertPlanning: boolean; // Expert Planning Anual selecionado
  expertPlanningNivel: NivelId | null; // Nivel para precificacao quando avulso (sem programa)
  sessaoMentoriaQtd: number; // Quantidade de sessoes individuais de mentoria
}

// ============================================
// CARRINHO V5.0
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

// Tecnologia avulsa no carrinho
export interface TecnologiaNoCarrinho {
  experienceFlix?: {
    plano: NivelId;
    mensal: number;
    entrada: number;
  };
  funnelPages?: {
    modo: "pacote" | "custom";
    pacoteId?: string;
    quantidade: number;
    tipos?: string[];
    mensal: number;
  };
}

export interface CarrinhoState {
  // Tipo de proposta
  tipoProposta: "programa" | "tecnologia" | "agentes" | "combinado" | null;

  // Programa (se aplicável)
  modalidade: ModalidadeId | null;
  nivel: NivelId | null;

  // Tecnologia avulsa (se não usar Pacote Completo ou se comprar separado)
  tecnologiaAvulsa: TecnologiaNoCarrinho | null;

  // Upgrades (para Pacote Completo)
  upgradeExperienceFlix: NivelId | null;
  funisExtras: number;

  // Central de Inteligência (Business/Scale only) - V0.12
  centralInteligencia: CentralInteligenciaConfig;

  // Agentes AI
  agentes: AgenteNoCarrinho[];

  // Co-produtor (Business/Scale only)
  coprodutor: CoProdutorConfig | null;

  // Servicos Extras V0.18
  servicosExtras: ServicosExtrasConfig;

  // Desconto mensal V0.11 (V0.14: renamed from desconto)
  descontoMensal: DescontoConfig;

  // Desconto setup V0.14
  descontoSetup: DescontoConfig;

  // Condições
  condicaoPagamento: CondicaoPagamento;
  revenueShareObservacoes: string;
}

export interface ResumoCarrinho {
  // Pacote base
  pacoteEntrada: number;
  pacoteMensal: number;

  // Tecnologia inclusa (Pacote Completo)
  tecnologiaInclusa: number;
  tecnologiaAvulsoEquivalente: number;

  // Tecnologia avulsa
  techAvulsaEntrada: number;
  techAvulsaMensal: number;

  // Upgrades
  upgradeFlixMensal: number;
  funisExtrasMensal: number;
  totalUpgradesMensal: number;

  // Central de Inteligência V0.14
  centralInteligenciaSetup: number;
  centralInteligenciaPacote: string | null;
  centralInteligenciaQuantidade: number; // total de assistentes (base + extras)
  centralInteligenciaExtras: number; // quantidade de assistentes extras

  // Agentes AI
  agentesSetup: number;
  agentesMensal: number;

  // Totais (antes do desconto)
  totalSetup: number;
  totalEntrada: number;
  subtotalSetup: number; // V0.14: subtotal do investimento inicial antes do desconto
  subtotalMensal: number;

  // Desconto Setup V0.14
  valorDescontoSetup: number;
  motivoDescontoSetup: string;

  // Desconto Mensal V0.11
  valorDescontoMensal: number;
  motivoDescontoMensal: string;

  // Totais finais (após desconto)
  totalInicialComDesconto: number; // V0.14
  totalMensal: number;
  totalAnual: number;

  // Servicos Extras V0.18
  servicosExtrasTotal: number; // custo total de servicos extras (setup/avulso)

  // Co-produtor (apenas dados, sem cálculo de valor) - V0.12
  coprodutorNome: string;

  // Economia
  economia: number;
  economiaAnualDescontoMensal: number; // V0.14: renamed
  economiaAnualTotal: number; // V0.15: desconto setup + (12 × desconto mensal)

  // Sugestão de upgrade
  sugestaoUpgrade?: {
    mostrar: boolean;
    mensagem: string;
    economia: number;
  };
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
  entregaveis?: PilarEntregaveis[];
}

// ============================================
// ENTREGAVEIS POR MODALIDADE/NIVEL
// ============================================

export interface EntregaveisConfig {
  modalidade: ModalidadeId;
  nivel: NivelId;
  pilares: PilarEntregaveis[];
}
