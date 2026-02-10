"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { agentesAI } from "@/data/agentesAI";
import { formatCurrency } from "@/utils/formatting";
import type { AgenteAI, AgenteNoCarrinho } from "@/types";

export default function AgentesSection() {
  const carrinho = useCartStore((s) => s.carrinho);
  const adicionarAgente = useCartStore((s) => s.adicionarAgente);
  const removerAgente = useCartStore((s) => s.removerAgente);
  const atualizarAgente = useCartStore((s) => s.atualizarAgente);
  const setStep = useCartStore((s) => s.setStep);

  const { modalidade, nivel, agentes } = carrinho;

  // Local state for extras configuration before adding
  const [extrasConfig, setExtrasConfig] = useState<Record<string, Partial<AgenteNoCarrinho>>>({});

  const handleBack = () => {
    if (modalidade === "expert") {
      setStep("customizacoes");
    } else {
      setStep("nivel");
    }
  };

  const handleContinue = () => {
    // For business/scale show conditions, otherwise go to cliente
    if (nivel === "business" || nivel === "scale") {
      setStep("cliente"); // We could add condicoes step here
    } else {
      setStep("cliente");
    }
  };

  const isAgenteAdicionado = (agenteId: string) => {
    return agentes.some((a) => a.agente.id === agenteId);
  };

  const getAgenteNoCarrinho = (agenteId: string) => {
    return agentes.find((a) => a.agente.id === agenteId);
  };

  const handleToggleAgente = (agente: AgenteAI) => {
    if (isAgenteAdicionado(agente.id)) {
      removerAgente(agente.id);
    } else {
      const config = extrasConfig[agente.id] || {};
      adicionarAgente(agente, config);
    }
  };

  const updateExtras = (agenteId: string, updates: Partial<AgenteNoCarrinho>) => {
    if (isAgenteAdicionado(agenteId)) {
      atualizarAgente(agenteId, updates);
    } else {
      setExtrasConfig((prev) => ({
        ...prev,
        [agenteId]: { ...prev[agenteId], ...updates },
      }));
    }
  };

  const getExtrasValue = (agenteId: string, field: keyof AgenteNoCarrinho) => {
    const agenteNoCarrinho = getAgenteNoCarrinho(agenteId);
    if (agenteNoCarrinho) {
      return agenteNoCarrinho[field];
    }
    return extrasConfig[agenteId]?.[field] ?? 0;
  };

  const calcSetup = (agente: AgenteAI, config: Partial<AgenteNoCarrinho>) => {
    let total = agente.investimento.setup;
    if (agente.id === "mentor_ai") {
      total += (agente.investimento.setupAdicionalPorAcao ?? 0) * ((config.acoesExtras as number) || 0);
    }
    if (agente.id === "comercial_ai") {
      total += (agente.investimento.setupAdicionalPorIntegracao ?? 0) * ((config.integracoesExtras as number) || 0);
    }
    return total;
  };

  const calcMensal = (agente: AgenteAI, config: Partial<AgenteNoCarrinho>) => {
    let total = agente.investimento.mensal;
    if (agente.id === "comercial_ai") {
      total += (agente.investimento.adicionalPorNumero ?? 0) * ((config.numerosExtras as number) || 0);
      if (config.prospeccaoAtiva) {
        total += agente.investimento.prospeccaoAtiva ?? 0;
      }
    }
    return total;
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>

      <div className="text-center mb-8">
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Adicione Agentes de Inteligencia Artificial
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Produtos avulsos que podem ser contratados independente do pacote
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {agentesAI.map((agente) => {
          const isAdded = isAgenteAdicionado(agente.id);
          const config = isAdded
            ? getAgenteNoCarrinho(agente.id) || {}
            : extrasConfig[agente.id] || {};

          const setupTotal = calcSetup(agente, config);
          const mensalTotal = calcMensal(agente, config);

          const isFeatured = agente.id === "comercial_ai";

          return (
            <div
              key={agente.id}
              className={`bg-white rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                isAdded
                  ? "shadow-lg"
                  : "border-gray-100"
              }`}
              style={{
                borderColor: isAdded ? agente.cor : undefined,
              }}
            >
              {isFeatured && (
                <div className="absolute top-0 right-0 bg-amber-400 text-white text-[9px] font-play font-bold tracking-wider px-2 py-0.5 rounded-bl-lg">
                  MAIS COMPLETO
                </div>
              )}

              <div className="h-1.5" style={{ backgroundColor: agente.cor }} />

              <div className="p-5">
                <div className="text-3xl mb-2">{agente.icone}</div>
                <h3 className="font-kanit font-bold text-lg text-blenduca-grafite mb-1">
                  {agente.nome}
                </h3>
                <p className="font-kanit text-xs text-blenduca-cinza-medio mb-4 min-h-[32px]">
                  {agente.descricao}
                </p>

                {/* Features */}
                <div className="space-y-1 mb-4">
                  {agente.entregaveis.slice(0, 4).map((ent, i) => (
                    <p key={i} className="font-kanit text-xs text-blenduca-grafite flex items-start gap-1.5">
                      <span className="text-green-500 shrink-0">&#10003;</span>
                      <span>{ent}</span>
                    </p>
                  ))}
                  {agente.entregaveis.length > 4 && (
                    <p className="font-kanit text-xs text-blenduca-cinza-medio">
                      +{agente.entregaveis.length - 4} recursos
                    </p>
                  )}
                </div>

                {/* Pricing */}
                <div className="border-t border-gray-100 pt-4 mb-4 space-y-1">
                  <div className="flex justify-between text-xs font-kanit">
                    <span className="text-blenduca-cinza-medio">Setup:</span>
                    <span className="font-semibold text-blenduca-grafite">
                      {formatCurrency(setupTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-kanit">
                    <span className="text-blenduca-cinza-medio">Recorrencia:</span>
                    <span className="font-semibold text-blenduca-grafite">
                      {formatCurrency(mensalTotal)}/mes
                    </span>
                  </div>
                </div>

                {/* Extras for Mentor AI */}
                {agente.id === "mentor_ai" && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <label className="flex items-center justify-between text-xs font-kanit">
                      <span className="text-blenduca-cinza-medio">Acoes extras:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateExtras(agente.id, {
                              acoesExtras: Math.max(0, ((getExtrasValue(agente.id, "acoesExtras") as number) || 0) - 1),
                            })
                          }
                          className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">
                          {(getExtrasValue(agente.id, "acoesExtras") as number) || 0}
                        </span>
                        <button
                          onClick={() =>
                            updateExtras(agente.id, {
                              acoesExtras: ((getExtrasValue(agente.id, "acoesExtras") as number) || 0) + 1,
                            })
                          }
                          className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </label>
                    <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-1">
                      +{formatCurrency(agente.investimento.setupAdicionalPorAcao ?? 0)} por acao no setup
                    </p>
                  </div>
                )}

                {/* Extras for Comercial AI */}
                {agente.id === "comercial_ai" && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-3">
                    {/* Integracoes */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-kanit">
                        <span className="text-blenduca-cinza-medio">Integracoes (ERP/CRM):</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateExtras(agente.id, {
                                integracoesExtras: Math.max(0, ((getExtrasValue(agente.id, "integracoesExtras") as number) || 0) - 1),
                              })
                            }
                            className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {(getExtrasValue(agente.id, "integracoesExtras") as number) || 0}
                          </span>
                          <button
                            onClick={() =>
                              updateExtras(agente.id, {
                                integracoesExtras: ((getExtrasValue(agente.id, "integracoesExtras") as number) || 0) + 1,
                              })
                            }
                            className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </label>
                      <p className="font-kanit text-[10px] text-blenduca-cinza-medio">
                        +{formatCurrency(agente.investimento.setupAdicionalPorIntegracao ?? 0)} por integracao no setup
                      </p>
                    </div>

                    {/* Numeros extras */}
                    <div>
                      <label className="flex items-center justify-between text-xs font-kanit">
                        <span className="text-blenduca-cinza-medio">Numeros WhatsApp:</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateExtras(agente.id, {
                                numerosExtras: Math.max(0, ((getExtrasValue(agente.id, "numerosExtras") as number) || 0) - 1),
                              })
                            }
                            className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {(getExtrasValue(agente.id, "numerosExtras") as number) || 0}
                          </span>
                          <button
                            onClick={() =>
                              updateExtras(agente.id, {
                                numerosExtras: ((getExtrasValue(agente.id, "numerosExtras") as number) || 0) + 1,
                              })
                            }
                            className="w-6 h-6 rounded bg-gray-200 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </label>
                      <p className="font-kanit text-[10px] text-blenduca-cinza-medio">
                        +{formatCurrency(agente.investimento.adicionalPorNumero ?? 0)}/mes por numero extra
                      </p>
                    </div>

                    {/* Prospeccao */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(getExtrasValue(agente.id, "prospeccaoAtiva") as boolean) || false}
                        onChange={(e) =>
                          updateExtras(agente.id, { prospeccaoAtiva: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-blenduca-vermelho focus:ring-blenduca-vermelho"
                      />
                      <span className="font-kanit text-xs text-blenduca-grafite">
                        Prospeccao Ativa (+{formatCurrency(agente.investimento.prospeccaoAtiva ?? 0)}/mes)
                      </span>
                    </label>
                  </div>
                )}

                {/* Toggle button */}
                <button
                  onClick={() => handleToggleAgente(agente)}
                  className={`w-full py-2.5 rounded-lg font-kanit font-semibold text-sm transition-all ${
                    isAdded
                      ? "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
                      : "text-white"
                  }`}
                  style={{
                    backgroundColor: !isAdded ? agente.cor : undefined,
                  }}
                >
                  {isAdded ? "Remover" : "Adicionar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 py-3 rounded-lg border border-gray-200 bg-white font-kanit font-semibold text-sm text-blenduca-cinza-medio hover:bg-gray-50 transition-all"
        >
          Voltar
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 py-3 rounded-lg bg-blenduca-vermelho text-white font-kanit font-semibold text-sm hover:bg-blenduca-vermelho-dark shadow-lg shadow-blenduca-vermelho/20 transition-all"
        >
          {agentes.length === 0 ? "Pular e Continuar" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
