import type { NivelId } from "@/types";

// ============================================
// SERVICOS EXTRAS V0.18
// ============================================

export interface ServicoExtra {
  id: string;
  nome: string;
  tipo: "setup" | "avulso";
  precos: Record<NivelId, number>;
  icone: string;
  categoria: string;
  descricao: string;
}

export const SERVICOS_EXTRAS: Record<string, ServicoExtra> = {
  expertPlanning: {
    id: "expertPlanning",
    nome: "Expert Planning Anual",
    tipo: "setup",
    precos: {
      starter: 5000,
      professional: 7500,
      business: 10000,
      scale: 15000,
    },
    icone: "📋",
    categoria: "Estrategia",
    descricao:
      "Sessao estrategica anual de planejamento completo do seu negocio de conhecimento. Inclui diagnostico, mapeamento de oportunidades e plano de acao detalhado para os proximos 12 meses.",
  },
  sessaoMentoria: {
    id: "sessaoMentoria",
    nome: "Sessao Individual de Mentoria",
    tipo: "avulso",
    precos: {
      starter: 550,
      professional: 500,
      business: 450,
      scale: 400,
    },
    icone: "🎯",
    categoria: "Mentoria",
    descricao:
      "Sessao individual de mentoria personalizada com estrategia e acompanhamento. Cada sessao e dedicada a resolver desafios especificos do seu negocio com orientacao direta.",
  },
};

export function calcularPrecoServico(
  servicoId: string,
  nivel: NivelId
): number {
  const servico = SERVICOS_EXTRAS[servicoId];
  if (!servico) return 0;
  return servico.precos[nivel] ?? 0;
}
