"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatting";
import { SERVICOS_EXTRAS } from "@/data/servicosExtras";
import { niveis, niveisMap } from "@/data/modalidades";
import type { NivelId } from "@/types";

// Preco fixo para mentoria avulsa (sem programa)
const MENTORIA_AVULSO_PRECO = 750;

export default function ServicosExtrasSection() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setExpertPlanning = useCartStore((s) => s.setExpertPlanning);
  const setExpertPlanningNivel = useCartStore((s) => s.setExpertPlanningNivel);
  const setSessaoMentoriaQtd = useCartStore((s) => s.setSessaoMentoriaQtd);
  const setStep = useCartStore((s) => s.setStep);
  const calcularResumo = useCartStore((s) => s.calcularResumo);

  const { nivel, servicosExtras } = carrinho;
  const resumo = calcularResumo();

  // Para Expert Planning: usa nivel do programa ou o nivel selecionado para avulso
  const planningNivel = nivel || servicosExtras.expertPlanningNivel;
  const expertPlanningPreco = planningNivel
    ? SERVICOS_EXTRAS.expertPlanning.precos[planningNivel]
    : null;

  // Para Mentoria: usa nivel do programa ou preco fixo avulso
  const sessaoMentoriaPreco = nivel
    ? SERVICOS_EXTRAS.sessaoMentoria.precos[nivel]
    : MENTORIA_AVULSO_PRECO;

  const handleBack = () => {
    setStep("agentes");
  };

  const handleContinue = () => {
    setStep("negociacao");
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blenduca-cinza-medio"
            aria-label="Voltar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="font-kanit font-bold text-2xl text-blenduca-grafite">
              Servicos Extras
            </h1>
            <p className="font-kanit text-sm text-blenduca-cinza-medio">
              Adicione servicos complementares a sua proposta
            </p>
          </div>
        </div>

        {/* Avulso badge */}
        {!nivel && (
          <div className="ml-11">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-kanit font-semibold bg-orange-100 text-orange-700">
              Contratacao Avulsa
            </span>
            <span className="ml-2 font-kanit text-xs text-blenduca-cinza-medio">
              Precos especiais para contratacao sem programa
            </span>
          </div>
        )}
      </div>

      {/* Services Cards */}
      <div className="space-y-4 mb-6">
        {/* Expert Planning Anual */}
        <div
          className={`bg-white rounded-xl border-2 transition-all ${
            servicosExtras.expertPlanning
              ? "border-blenduca-vermelho shadow-lg shadow-blenduca-vermelho/10"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div className="w-12 h-12 bg-blenduca-vermelho/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-2xl">📋</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-kanit font-bold text-lg text-blenduca-grafite">
                      {SERVICOS_EXTRAS.expertPlanning.nome}
                    </h3>
                    <span className="px-2 py-0.5 bg-blenduca-vermelho/10 text-blenduca-vermelho text-[10px] font-play font-bold tracking-wider rounded-full uppercase">
                      {SERVICOS_EXTRAS.expertPlanning.categoria}
                    </span>
                  </div>

                  <p className="font-kanit text-sm text-blenduca-cinza-medio mb-3">
                    {SERVICOS_EXTRAS.expertPlanning.descricao}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-50 rounded text-xs font-kanit text-blenduca-grafite">
                      Planejamento 12 meses
                    </span>
                    <span className="px-2 py-1 bg-gray-50 rounded text-xs font-kanit text-blenduca-grafite">
                      Diagnostico completo
                    </span>
                    <span className="px-2 py-1 bg-gray-50 rounded text-xs font-kanit text-blenduca-grafite">
                      Plano de acao
                    </span>
                  </div>

                  {/* Nivel selector for avulso */}
                  {!nivel && (
                    <div className="mb-3">
                      <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                        Selecione o nivel para precificacao:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {niveis.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => setExpertPlanningNivel(n.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-kanit font-semibold transition-all ${
                              servicosExtras.expertPlanningNivel === n.id
                                ? "text-white"
                                : "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
                            }`}
                            style={
                              servicosExtras.expertPlanningNivel === n.id
                                ? { backgroundColor: n.cor }
                                : {}
                            }
                          >
                            {n.nome} - {formatCurrency(SERVICOS_EXTRAS.expertPlanning.precos[n.id])}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {expertPlanningPreco !== null && (
                    <p className="font-kanit text-sm text-blenduca-cinza-medio">
                      Investimento:{" "}
                      <strong className="text-blenduca-grafite text-base">
                        {formatCurrency(expertPlanningPreco)}
                      </strong>
                      <span className="text-xs ml-1">(unico)</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Toggle - only enabled when nivel is set or expertPlanningNivel is selected */}
              <button
                onClick={() => setExpertPlanning(!servicosExtras.expertPlanning)}
                disabled={!nivel && !servicosExtras.expertPlanningNivel}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shrink-0 ${
                  servicosExtras.expertPlanning
                    ? "bg-blenduca-vermelho"
                    : !nivel && !servicosExtras.expertPlanningNivel
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={servicosExtras.expertPlanning}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    servicosExtras.expertPlanning
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Selected state */}
            {servicosExtras.expertPlanning && expertPlanningPreco !== null && (
              <div className="mt-4 pt-4 border-t border-blenduca-vermelho/20 flex items-center justify-between">
                <span className="font-kanit text-sm text-blenduca-vermelho font-semibold">
                  ✓ Adicionado a proposta
                </span>
                <span className="font-kanit font-bold text-blenduca-grafite">
                  {formatCurrency(expertPlanningPreco)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sessao Individual de Mentoria */}
        <div
          className={`bg-white rounded-xl border-2 transition-all ${
            servicosExtras.sessaoMentoriaQtd > 0
              ? "border-blenduca-vermelho shadow-lg shadow-blenduca-vermelho/10"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-blenduca-vermelho/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl">🎯</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-kanit font-bold text-lg text-blenduca-grafite">
                    {SERVICOS_EXTRAS.sessaoMentoria.nome}
                  </h3>
                  <span className="px-2 py-0.5 bg-blenduca-vermelho/10 text-blenduca-vermelho text-[10px] font-play font-bold tracking-wider rounded-full uppercase">
                    {SERVICOS_EXTRAS.sessaoMentoria.categoria}
                  </span>
                  {!nivel && (
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-play font-bold tracking-wider rounded-full uppercase">
                      AVULSO
                    </span>
                  )}
                </div>

                <p className="font-kanit text-sm text-blenduca-cinza-medio mb-3">
                  {SERVICOS_EXTRAS.sessaoMentoria.descricao}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-50 rounded text-xs font-kanit text-blenduca-grafite">
                    Sessao personalizada
                  </span>
                  <span className="px-2 py-1 bg-gray-50 rounded text-xs font-kanit text-blenduca-grafite">
                    Estrategia individual
                  </span>
                  <span className="px-2 py-1 bg-gray-50 rounded text-xs font-kanit text-blenduca-grafite">
                    Acompanhamento direto
                  </span>
                </div>

                <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
                  Preco por sessao:{" "}
                  <strong className="text-blenduca-grafite text-base">
                    {formatCurrency(sessaoMentoriaPreco)}
                  </strong>
                  <span className="text-xs ml-1">/ sessao</span>
                  {!nivel && (
                    <span className="text-xs ml-2 text-orange-600">(valor avulso)</span>
                  )}
                </p>

                {/* Quantity selector */}
                <div className="flex items-center gap-4">
                  <span className="font-kanit text-sm text-blenduca-cinza-medio">
                    Quantidade de sessoes:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSessaoMentoriaQtd(servicosExtras.sessaoMentoriaQtd - 1)
                      }
                      disabled={servicosExtras.sessaoMentoriaQtd === 0}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-kanit font-bold text-blenduca-grafite"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-kanit font-bold text-blenduca-grafite text-lg">
                      {servicosExtras.sessaoMentoriaQtd}
                    </span>
                    <button
                      onClick={() =>
                        setSessaoMentoriaQtd(servicosExtras.sessaoMentoriaQtd + 1)
                      }
                      disabled={servicosExtras.sessaoMentoriaQtd >= 20}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-kanit font-bold text-blenduca-grafite"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected state */}
            {servicosExtras.sessaoMentoriaQtd > 0 && (
              <div className="mt-4 pt-4 border-t border-blenduca-vermelho/20 flex items-center justify-between">
                <span className="font-kanit text-sm text-blenduca-vermelho font-semibold">
                  ✓ {servicosExtras.sessaoMentoriaQtd}x sessao
                  {servicosExtras.sessaoMentoriaQtd > 1 ? "es" : ""} adicionada
                  {servicosExtras.sessaoMentoriaQtd > 1 ? "s" : ""}
                </span>
                <span className="font-kanit font-bold text-blenduca-grafite">
                  {formatCurrency(sessaoMentoriaPreco * servicosExtras.sessaoMentoriaQtd)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary bar if any extras selected */}
      {resumo.servicosExtrasTotal > 0 && (
        <div className="bg-blenduca-vermelho/5 border border-blenduca-vermelho/20 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-kanit font-semibold text-blenduca-grafite text-sm">
                Total em Servicos Extras
              </p>
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                Investimento adicional unico
              </p>
            </div>
            <p className="font-kanit font-bold text-xl text-blenduca-vermelho">
              {formatCurrency(resumo.servicosExtrasTotal)}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl font-kanit text-sm text-blenduca-cinza-medio hover:bg-gray-50 transition-colors"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </button>

        <button
          onClick={handleContinue}
          className="flex items-center gap-2 px-6 py-3 bg-blenduca-vermelho text-white rounded-xl font-kanit font-semibold text-sm hover:bg-blenduca-vermelho-dark transition-colors shadow-lg shadow-blenduca-vermelho/20"
        >
          {resumo.servicosExtrasTotal > 0 ? "Continuar com Extras" : "Continuar sem Extras"}
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
  );
}
