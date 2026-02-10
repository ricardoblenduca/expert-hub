import type { Modalidade, NivelConfig } from "@/types";

export const modalidades: Record<string, Modalidade> = {
  completo: {
    id: "completo",
    nome: "Pacote Completo",
    nomeMarketing: "TUDO INCLUÍDO",
    tagline: "A solução completa para transformar conhecimento em negócio",
    descricao:
      "Inclui consultoria estratégica individual, acesso à comunidade premium, e toda a tecnologia necessária: plataforma de cursos (Experience Flix) e funis de vendas (Funnel Pages).",
    paraQuem: "Ideal para quem quer acelerar resultados com suporte completo",
    icone: "🎯",
    cor: "#C22235",
    inclui: {
      consultoriaIndividual: true,
      comunidadeEventos: true,
      tecnologiaCompleta: true,
    },
    destaque: true,
  },

  consultoria: {
    id: "consultoria",
    nome: "Pacote Consultoria",
    nomeMarketing: "CONSULTORIA EXPERT",
    tagline: "Mentoria estratégica para escalar seu negócio",
    descricao:
      "Foco total em estratégia e crescimento. Consultoria individual + comunidade premium. Tecnologia pode ser adicionada separadamente conforme necessidade.",
    paraQuem:
      "Para quem já tem infraestrutura ou quer começar focado em estratégia",
    icone: "💡",
    cor: "#5F5B42",
    inclui: {
      consultoriaIndividual: true,
      comunidadeEventos: true,
      tecnologiaCompleta: false,
    },
    podeFazerUpgrade: {
      para: "completo",
      mensagem: "Adicione tecnologia completa por +R$ XXX/mês",
    },
  },

  comunidade: {
    id: "comunidade",
    nome: "Pacote Comunidade",
    nomeMarketing: "COMUNIDADE EXPERT",
    tagline: "Aprenda em grupo e construa sua rede",
    descricao:
      "Acesso à comunidade B'Experts, eventos presenciais, educação completa e sessões em grupo. Sem mentoria individual.",
    paraQuem:
      "Para quem quer aprender com a comunidade e ter acesso ao conteúdo",
    icone: "🤝",
    cor: "#113F4B",
    inclui: {
      consultoriaIndividual: false,
      comunidadeEventos: true,
      tecnologiaCompleta: false,
    },
    podeFazerUpgrade: {
      para: "consultoria",
      mensagem: "Adicione consultoria individual para mentoria personalizada",
    },
  },
};

export const niveis: NivelConfig[] = [
  {
    id: "starter",
    nome: "STARTER",
    nomeCompleto: "VIDA DE EXPERT",
    faturamento: "10k a 20k/mês",
    persona: "Expert de Negócios",
    personaDescricao: "Para quem está transformando conhecimento em negócio rentável",
    cor: "#C22235",
  },
  {
    id: "professional",
    nome: "PROFESSIONAL",
    nomeCompleto: "ACELERA EXPERT",
    faturamento: "20k a 40k/mês",
    persona: "Negócio de Conhecimento",
    personaDescricao: "Para quem já tem negócio estruturado e quer escalar",
    cor: "#5F5B42",
  },
  {
    id: "business",
    nome: "BUSINESS",
    nomeCompleto: "EXPERT BUSINESS",
    faturamento: "40k a 80k/mês",
    persona: "Empresa de Educação",
    personaDescricao: "Para empresas educacionais com produtos recorrentes e escaláveis",
    cor: "#113F4B",
  },
  {
    id: "scale",
    nome: "SCALE",
    nomeCompleto: "EXPERT CONSULTING",
    faturamento: "1M+/ano",
    persona: "Ecossistema de Educação",
    personaDescricao: "Para influenciadores e empresas / B.U de Educação",
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
