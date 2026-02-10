"use client";

import { useCartStore } from "@/store/useCartStore";
import { niveis, modalidades } from "@/data/modalidades";
import { precosMatriz } from "@/data/precosMatriz";
import { tecnologiaInclusa } from "@/data/tecnologiaInclusa";
import { formatCurrency } from "@/utils/formatting";
import type { NivelId } from "@/types";

export default function NivelSelector() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setNivel = useCartStore((s) => s.setNivel);
  const setStep = useCartStore((s) => s.setStep);

  const { modalidade, nivel: nivelSelecionado } = carrinho;

  if (!modalidade) return null;

  const modalidadeInfo = modalidades[modalidade];

  const handleSelect = (nivelId: NivelId) => {
    setNivel(nivelId);
    // If EXPERT, go to customizations; otherwise go to agentes
    if (modalidade === "expert") {
      setStep("customizacoes");
    } else {
      setStep("agentes");
    }
  };

  const handleBack = () => {
    setStep("modalidade");
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
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
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full" style={{ backgroundColor: `${modalidadeInfo.cor}15` }}>
          <span>{modalidadeInfo.icone}</span>
          <span className="font-kanit font-semibold text-sm" style={{ color: modalidadeInfo.cor }}>
            {modalidadeInfo.nome.split(" - ")[0]}
          </span>
        </div>
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Escolha o nivel ideal para o seu momento
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Cada nivel foi projetado para uma fase especifica do seu negocio
        </p>
      </div>

      {/* Comparison Table (Desktop) */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-kanit font-semibold text-sm text-blenduca-grafite">
                Nivel
              </th>
              <th className="text-left px-4 py-3 font-kanit font-semibold text-sm text-blenduca-grafite">
                Faturamento
              </th>
              <th className="text-left px-4 py-3 font-kanit font-semibold text-sm text-blenduca-grafite">
                Persona
              </th>
              <th className="text-right px-4 py-3 font-kanit font-semibold text-sm text-blenduca-grafite">
                Investimento
              </th>
            </tr>
          </thead>
          <tbody>
            {niveis.map((nivel) => {
              const preco = precosMatriz[nivel.id][modalidade];
              return (
                <tr
                  key={nivel.id}
                  className={`border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors ${
                    nivelSelecionado === nivel.id ? "bg-blenduca-vermelho/5" : ""
                  }`}
                  onClick={() => handleSelect(nivel.id)}
                >
                  <td className="px-4 py-3">
                    <span
                      className="font-kanit font-bold text-sm px-2 py-1 rounded"
                      style={{ backgroundColor: `${nivel.cor}15`, color: nivel.cor }}
                    >
                      {nivel.nome}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-kanit text-sm text-blenduca-cinza-medio">
                    {nivel.faturamento}
                  </td>
                  <td className="px-4 py-3 font-kanit text-sm text-blenduca-grafite">
                    {nivel.persona}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {preco.entrada > 0 && (
                      <p className="font-kanit text-xs text-blenduca-cinza-medio">
                        Entrada: {formatCurrency(preco.entrada)}
                      </p>
                    )}
                    <p className="font-kanit font-bold text-sm text-blenduca-grafite">
                      {formatCurrency(preco.mensal)}/mes
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {niveis.map((nivel) => {
          const preco = precosMatriz[nivel.id][modalidade];
          const tech = modalidade === "expert" ? tecnologiaInclusa[nivel.id] : null;

          return (
            <div
              key={nivel.id}
              className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${
                nivelSelecionado === nivel.id
                  ? "shadow-lg"
                  : "border-gray-100"
              }`}
              style={{
                borderColor: nivelSelecionado === nivel.id ? nivel.cor : undefined,
              }}
              onClick={() => handleSelect(nivel.id)}
            >
              <div className="h-1.5 rounded-t-xl" style={{ backgroundColor: nivel.cor }} />

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-play text-[10px] font-bold tracking-wider px-2 py-1 rounded text-white"
                    style={{ backgroundColor: nivel.cor }}
                  >
                    {nivel.nome}
                  </span>
                </div>

                <p className="font-kanit text-xs text-blenduca-cinza-medio mb-1">
                  {nivel.faturamento}
                </p>
                <p className="font-kanit text-sm font-medium text-blenduca-grafite mb-4">
                  {nivel.persona}
                </p>

                {/* Pricing */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  {preco.entrada > 0 && (
                    <p className="font-kanit text-xs text-blenduca-cinza-medio mb-1">
                      Entrada: {formatCurrency(preco.entrada)}
                    </p>
                  )}
                  <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                    {formatCurrency(preco.mensal)}
                    <span className="text-sm font-normal text-blenduca-cinza-medio">/mes</span>
                  </p>
                </div>

                {/* Technology included (EXPERT only) */}
                {tech && (
                  <div className="bg-green-50/50 rounded-lg p-3 mb-4">
                    <p className="font-kanit text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1.5">
                      Tecnologia Inclusa
                    </p>
                    <p className="font-kanit text-xs text-blenduca-cinza-medio">
                      {tech.experienceFlix.plano} + {tech.funnelPages.quantidade.funis} funis
                    </p>
                    <p className="font-kanit text-[10px] text-green-600 mt-1">
                      Valor avulso: {formatCurrency(tech.totalTecnologia.mensal)}/mes
                    </p>
                  </div>
                )}

                <button
                  className="w-full py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all"
                  style={{ backgroundColor: nivel.cor }}
                >
                  Selecionar {nivel.nome}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
