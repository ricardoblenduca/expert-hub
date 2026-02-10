"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatting";

export default function HomeScreen() {
  const setStep = useCartStore((s) => s.setStep);
  const setTipoProposta = useCartStore((s) => s.setTipoProposta);

  const handleProgramas = () => {
    setTipoProposta("programa");
    setStep("modalidade");
  };

  const handleTecnologia = () => {
    setTipoProposta("tecnologia");
    setStep("tecnologia");
  };

  const handleAgentes = () => {
    setTipoProposta("agentes");
    setStep("agentes");
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="font-kanit font-bold text-3xl md:text-4xl text-blenduca-grafite mb-3">
          Monte sua Proposta Personalizada
        </h1>
        <p className="font-kanit text-blenduca-cinza-medio text-lg">
          Escolha o que você precisa. Combine como quiser.
        </p>
      </div>

      {/* 3 Entry Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* PONTO DE ENTRADA 1: Programas de Mentoria */}
        <div className="relative bg-white rounded-xl shadow-lg border-2 border-blenduca-vermelho overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
          {/* V0.17: Badge B'EXPERTS */}
          <div className="absolute top-3 right-3 bg-blenduca-vermelho text-white font-play text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full">
            B'EXPERTS
          </div>

          <div className="p-6">
            {/* Icon */}
            <div className="w-14 h-14 bg-blenduca-vermelho/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">🎓</span>
            </div>

            {/* Title */}
            <h2 className="font-kanit font-bold text-xl text-blenduca-grafite mb-1">
              Programas de Mentoria
            </h2>

            {/* V0.17: Subtitle */}
            <p className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-3">
              PLATAFORMA DE SOLUÇÕES
            </p>

            {/* Description */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Programas completos de mentoria com metodologia, estrategia e
              acompanhamento personalizado para transformar conhecimento em resultados.
            </p>

            {/* Options */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Pacote Completo
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Pacote Consultoria
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Pacote Comunidade
              </span>
            </div>

            {/* Pricing */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              A partir de{" "}
              <strong className="text-blenduca-grafite">
                {formatCurrency(500)}/mes
              </strong>
            </p>

            {/* CTA */}
            <button
              onClick={handleProgramas}
              className="w-full py-3 bg-blenduca-vermelho text-white font-kanit font-semibold rounded-lg hover:bg-blenduca-vermelho-dark transition-colors flex items-center justify-center gap-2"
            >
              Selecionar
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* PONTO DE ENTRADA 2: Tecnologia (Avulso) */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
          {/* V0.17: Badge B'TECH */}
          <div className="absolute top-3 right-3 bg-blue-500 text-white font-play text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full">
            B'TECH
          </div>

          <div className="p-6">
            {/* Icon */}
            <div className="w-14 h-14 bg-blenduca-azul/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">💻</span>
            </div>

            {/* Title */}
            <h2 className="font-kanit font-bold text-xl text-blenduca-grafite mb-1">
              Servicos de Tecnologia
            </h2>

            {/* V0.17: Subtitle */}
            <p className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-3">
              SOLUCOES TECNOLOGICAS
            </p>

            {/* Description */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Plataformas e ferramentas tecnologicas para estruturar,
              automatizar e escalar seu negocio digital.
            </p>

            {/* Options */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Experience Flix
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Funnel Pages
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Personalizacao
              </span>
            </div>

            {/* Pricing */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              A partir de{" "}
              <strong className="text-blenduca-grafite">
                {formatCurrency(197)}/mes
              </strong>
            </p>

            {/* CTA */}
            <button
              onClick={handleTecnologia}
              className="w-full py-3 bg-blue-500 text-white font-kanit font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              Selecionar
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* PONTO DE ENTRADA 3: Agentes A.I (Avulso) */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
          {/* V0.17: Badge B'AGENTS */}
          <div className="absolute top-3 right-3 bg-purple-600 text-white font-play text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full">
            B'AGENTS
          </div>

          <div className="p-6">
            {/* Icon */}
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">🤖</span>
            </div>

            {/* Title */}
            <h2 className="font-kanit font-bold text-xl text-blenduca-grafite mb-1">
              Agentes Inteligentes
            </h2>

            {/* V0.17: Subtitle */}
            <p className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-3">
              CENTRAL DE INTELIGENCIA
            </p>

            {/* Description */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Agentes de IA especializados e Central de Inteligencia para
              automacao, atendimento e gestao do conhecimento.
            </p>

            {/* Options */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Clone A.I
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Mentor A.I
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Comercial A.I
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Central de Inteligencia
              </span>
            </div>

            {/* Pricing */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              A partir de{" "}
              <strong className="text-blenduca-grafite">
                {formatCurrency(500)}/mes
              </strong>
            </p>

            {/* CTA */}
            <button
              onClick={handleAgentes}
              className="w-full py-3 bg-purple-600 text-white font-kanit font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              Selecionar
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Acesso Rápido para Clientes Existentes */}
      <div className="text-center">
        <p className="font-kanit text-sm text-blenduca-cinza-medio mb-2">
          Já é cliente?
        </p>
        <button
          onClick={handleProgramas}
          className="font-kanit text-sm text-blenduca-vermelho hover:underline"
        >
          Fazer upgrade do meu pacote →
        </button>
      </div>
    </div>
  );
}
