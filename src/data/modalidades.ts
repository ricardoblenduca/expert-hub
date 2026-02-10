import type { Modalidade, NivelConfig } from "@/types";

export const modalidades: Record<string, Modalidade> = {
  expert: {
    id: "expert",
    nome: "EXPERT - Programa Completo",
    descricao: "Consultoria + Comunidade + Tecnologia Inclusa",
    icone: "🎯",
    incluiConsultoria: true,
    incluiComunidade: true,
    incluiTecnologia: true,
    cor: "#C22235",
  },

  exper: {
    id: "exper",
    nome: "EXPER - Programa sem Tecnologia",
    descricao: "Consultoria + Comunidade (sem plataforma e funis)",
    icone: "📊",
    incluiConsultoria: true,
    incluiComunidade: true,
    incluiTecnologia: false,
    cor: "#5F5B42",
    observacao: "Tecnologia pode ser contratada separadamente",
  },

  xper: {
    id: "xper",
    nome: "XPER - Acesso a Comunidade",
    descricao:
      "Comunidade + Educacao + Performance (sem consultoria individual)",
    icone: "🤝",
    incluiConsultoria: false,
    incluiComunidade: true,
    incluiTecnologia: false,
    cor: "#113F4B",
    observacao: "Foco em aprendizado em grupo e network",
  },
};

export const niveis: NivelConfig[] = [
  {
    id: "starter",
    nome: "STARTER",
    faturamento: "10k a 20k/mes",
    persona: "Expert Empreendedor",
    cor: "#C22235",
  },
  {
    id: "professional",
    nome: "PROFESSIONAL",
    faturamento: "20k a 50k/mes",
    persona: "Expert Profissional",
    cor: "#5F5B42",
  },
  {
    id: "business",
    nome: "BUSINESS",
    faturamento: "50k a 100k/mes",
    persona: "Expert Empresario",
    cor: "#113F4B",
  },
  {
    id: "scale",
    nome: "SCALE",
    faturamento: "100k+/mes",
    persona: "Expert Escalador",
    cor: "#222222",
  },
];

export const niveisMap: Record<string, NivelConfig> = niveis.reduce(
  (acc, nivel) => {
    acc[nivel.id] = nivel;
    return acc;
  },
  {} as Record<string, NivelConfig>
);
