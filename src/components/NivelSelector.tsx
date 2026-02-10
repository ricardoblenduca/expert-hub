"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { niveis, modalidades } from "@/data/modalidades";
import { precosMatriz } from "@/data/precosMatriz";
import { tecnologiaInclusa } from "@/data/tecnologiaInclusa";
import { getPilaresParaModalidadeENivel, contarEntregaveisParaModalidade, entregavelDisponivelNoNivel } from "@/data/entregaveis";
import { formatCurrency } from "@/utils/formatting";
import type { NivelId } from "@/types";

export default function NivelSelector() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setNivel = useCartStore((s) => s.setNivel);
  const setStep = useCartStore((s) => s.setStep);

  // Track which levels have expanded entregaveis
  const [expandedNiveis, setExpandedNiveis] = useState<Record<string, boolean>>({});

  const { modalidade, nivel: nivelSelecionado } = carrinho;

  if (!modalidade) return null;

  const modalidadeInfo = modalidades[modalidade];

  const toggleExpand = (nivelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNiveis((prev) => ({
      ...prev,
      [nivelId]: !prev[nivelId],
    }));
  };

  const handleSelect = (nivelId: NivelId) => {
    setNivel(nivelId);
    if (modalidade === "completo") {
      setStep("customizacoes");
    } else {
      setStep("adicionar_tech");
    }
  };

  const handleBack = () => {
    setStep("modalidade");
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para modalidades
      </button>

      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full"
          style={{ backgroundColor: `${modalidadeInfo.cor}15` }}
        >
          <span>{modalidadeInfo.icone}</span>
          <span className="font-kanit font-semibold text-sm" style={{ color: modalidadeInfo.cor }}>
            {modalidadeInfo.nome}
          </span>
        </div>
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Escolha o nivel ideal para o seu momento
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Cada nivel foi projetado para uma fase especifica do seu negocio
        </p>
      </div>

      {/* Level Cards - Full Width */}
      <div className="space-y-6">
        {niveis.map((nivel) => {
          const preco = precosMatriz[nivel.id][modalidade];
          const tech = modalidade === "completo" ? tecnologiaInclusa[nivel.id] : null;
          const isExpanded = expandedNiveis[nivel.id];
          const totalEntregaveis = contarEntregaveisParaModalidade(modalidade, nivel.id);
          const pilaresVisiveis = getPilaresParaModalidadeENivel(modalidade, nivel.id);

          return (
            <div
              key={nivel.id}
              className={`bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                nivelSelecionado === nivel.id ? "shadow-lg" : "border-gray-100 hover:shadow-md"
              }`}
              style={{
                borderColor: nivelSelecionado === nivel.id ? nivel.cor : undefined,
              }}
            >
              {/* Card Header */}
              <div className="h-1.5" style={{ backgroundColor: nivel.cor }} />

              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-play text-xs font-bold tracking-wider px-3 py-1 rounded text-white"
                        style={{ backgroundColor: nivel.cor }}
                      >
                        {nivel.nome}
                      </span>
                      {nivel.nomeCompleto && (
                        <span className="font-kanit text-sm text-blenduca-grafite font-medium">
                          {nivel.nomeCompleto}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-kanit text-xs text-blenduca-cinza-medio">Faturamento</p>
                        <p className="font-kanit text-sm font-semibold text-blenduca-grafite">
                          {nivel.faturamento}
                        </p>
                      </div>
                      <div>
                        <p className="font-kanit text-xs text-blenduca-cinza-medio">Persona</p>
                        <p className="font-kanit text-sm font-semibold text-blenduca-grafite">
                          {nivel.persona}
                        </p>
                      </div>
                    </div>

                    {nivel.personaDescricao && (
                      <p className="font-kanit text-xs text-blenduca-cinza-medio italic">
                        {nivel.personaDescricao}
                      </p>
                    )}
                  </div>

                  {/* Right: Pricing & CTA */}
                  <div className="lg:text-right lg:min-w-[200px]">
                    {preco.entrada > 0 && (
                      <p className="font-kanit text-sm text-blenduca-cinza-medio mb-1">
                        Entrada: {formatCurrency(preco.entrada)}
                      </p>
                    )}
                    <p className="font-kanit font-bold text-2xl text-blenduca-grafite mb-3">
                      {formatCurrency(preco.mensal)}
                      <span className="text-sm font-normal text-blenduca-cinza-medio">/mes</span>
                    </p>

                    <button
                      onClick={() => handleSelect(nivel.id)}
                      className="w-full lg:w-auto px-6 py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: nivel.cor }}
                    >
                      Selecionar {nivel.nome}
                    </button>
                  </div>
                </div>

                {/* Technology Preview (Pacote Completo only) */}
                {tech && (
                  <div className="mt-4 bg-green-50/50 border border-green-100 rounded-lg p-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-green-600 text-white px-2 py-1 rounded">
                          TECNOLOGIA INCLUSA
                        </span>
                        <span className="font-kanit text-xs text-green-700">
                          Economia de {formatCurrency(tech.totalTecnologia.mensal)}/mes
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-kanit text-blenduca-cinza-medio">
                        <span>🎬 Experience Flix {tech.experienceFlix.plano}</span>
                        <span>📄 {tech.funnelPages.quantidade.funis} Funis</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expand Entregaveis Button */}
                <button
                  onClick={(e) => toggleExpand(nivel.id, e)}
                  className="mt-4 w-full py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-kanit text-sm text-blenduca-grafite"
                >
                  <span>{isExpanded ? "▲" : "📋"}</span>
                  <span>
                    {isExpanded
                      ? "Fechar entregaveis"
                      : `Ver todos os ${totalEntregaveis} entregaveis inclusos`}
                  </span>
                </button>

                {/* Expanded Entregaveis - filtered by modalidade */}
                {isExpanded && (
                  <div className="mt-6 space-y-6 animate-fade-in-up">
                    {pilaresVisiveis.map((pilar) => {
                      // pilaresVisiveis already has filtered entregaveis
                      if (pilar.entregaveis.length === 0) return null;

                      return (
                        <div key={pilar.id} className="border-t border-gray-100 pt-4">
                          {/* Pilar Header */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">{pilar.icone}</span>
                            <h4
                              className="font-kanit font-bold text-sm uppercase tracking-wide"
                              style={{ color: pilar.cor }}
                            >
                              {pilar.nome}
                            </h4>
                          </div>

                          {/* Entregaveis */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pilar.entregaveis.map((entregavel) => (
                              <div
                                key={entregavel.id}
                                className="bg-gray-50/50 border border-gray-100 rounded-lg p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-lg shrink-0">{entregavel.icone}</span>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                                      {entregavel.nome}
                                    </h5>

                                    {/* Detalhes do nivel - no significado in interface, only in PDF */}
                                    {entregavel.detalhesNivel?.[nivel.id] && (
                                      <div className="bg-blue-50/50 rounded p-2">
                                        <p className="font-kanit text-[10px] font-bold text-blue-700 uppercase mb-1">
                                          No seu nivel ({nivel.nome})
                                        </p>
                                        <p className="font-kanit text-xs text-blenduca-grafite whitespace-pre-line">
                                          {entregavel.detalhesNivel[nivel.id]}
                                        </p>
                                      </div>
                                    )}

                                    {/* Valor avulso (for tech) */}
                                    {entregavel.valorAvulso?.[nivel.id] && (
                                      <div className="mt-2 flex items-center justify-between">
                                        <span className="font-kanit text-xs text-blenduca-cinza-medio">
                                          Valor avulso: {formatCurrency(entregavel.valorAvulso[nivel.id]!)}/mes
                                        </span>
                                        <span className="font-play text-[9px] font-bold bg-green-600 text-white px-2 py-0.5 rounded">
                                          INCLUSO
                                        </span>
                                      </div>
                                    )}

                                    {/* Frequencia */}
                                    {entregavel.frequencia && (
                                      <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-1">
                                        📅 {entregavel.frequencia}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
