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
          {/* Destaque badge */}
          <div className="absolute top-0 right-0 bg-blenduca-vermelho text-white font-play text-[10px] font-bold tracking-wider px-3 py-1 rounded-bl-lg">
            MAIS POPULAR
          </div>

          <div className="p-6">
            {/* Icon */}
            <div className="w-14 h-14 bg-blenduca-vermelho/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">🎓</span>
            </div>

            {/* Title */}
            <h2 className="font-kanit font-bold text-xl text-blenduca-grafite mb-2">
              Programas de Mentoria
            </h2>

            {/* Description */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Consultoria, comunidade e suporte completo para transformar
              conhecimento em negócio escalável
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
                {formatCurrency(500)}/mês
              </strong>
            </p>

            {/* CTA */}
            <button
              onClick={handleProgramas}
              className="w-full py-3 bg-blenduca-vermelho text-white font-kanit font-semibold rounded-lg hover:bg-blenduca-vermelho-dark transition-colors flex items-center justify-center gap-2"
            >
              Escolher Programa de Mentoria
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="p-6">
            {/* Icon */}
            <div className="w-14 h-14 bg-blenduca-azul/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">💻</span>
            </div>

            {/* Title */}
            <h2 className="font-kanit font-bold text-xl text-blenduca-grafite mb-2">
              Tecnologia & Plataformas
            </h2>

            {/* Description */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Plataforma de cursos online e funis de vendas profissionais.
              Contrate avulso ou adicione ao seu programa.
            </p>

            {/* Options */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Experience Flix
              </span>
              <span className="px-2 py-1 bg-blenduca-cinza/50 rounded text-xs font-kanit text-blenduca-grafite">
                Funnel Pages
              </span>
            </div>

            {/* Pricing */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              A partir de{" "}
              <strong className="text-blenduca-grafite">
                {formatCurrency(197)}/mês
              </strong>
            </p>

            {/* CTA */}
            <button
              onClick={handleTecnologia}
              className="w-full py-3 bg-blenduca-azul text-white font-kanit font-semibold rounded-lg hover:bg-blenduca-azul/90 transition-colors flex items-center justify-center gap-2"
            >
              Contratar Tecnologia
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="p-6">
            {/* Icon */}
            <div className="w-14 h-14 bg-blenduca-grafite/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">🤖</span>
            </div>

            {/* Title */}
            <h2 className="font-kanit font-bold text-xl text-blenduca-grafite mb-2">
              Agentes de Inteligência Artificial
            </h2>

            {/* Description */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Agentes A.I para automação de vendas, atendimento e mentoria.
              Funcionam independente de qualquer programa.
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
            </div>

            {/* Pricing */}
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              A partir de{" "}
              <strong className="text-blenduca-grafite">
                {formatCurrency(500)}/mês
              </strong>
            </p>

            {/* CTA */}
            <button
              onClick={handleAgentes}
              className="w-full py-3 bg-blenduca-grafite text-white font-kanit font-semibold rounded-lg hover:bg-blenduca-grafite/90 transition-colors flex items-center justify-center gap-2"
            >
              Contratar Agente A.I
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
