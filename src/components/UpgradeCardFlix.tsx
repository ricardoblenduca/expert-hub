"use client";

import { useState } from "react";
import type { UpgradePlataforma } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatting";

const PLAN_COLORS: Record<string, string> = {
  STARTER: "bg-blenduca-vermelho",
  PROFESSIONAL: "bg-blenduca-verde",
  BUSINESS: "bg-blenduca-azul",
};

export default function UpgradeCardFlix({
  upgrade,
}: {
  upgrade: UpgradePlataforma;
}) {
  const carrinho = useCartStore((s) => s.carrinho);
  const adicionarFlix = useCartStore((s) => s.adicionarFlix);
  const removerItem = useCartStore((s) => s.removerItem);

  const isInCart = carrinho.some(
    (i) => i.tipo === "upgrade_flix" && i.item.id === upgrade.id
  );
  const hasFlixInCart = carrinho.some((i) => i.tipo === "upgrade_flix");

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up relative overflow-hidden ${
        isInCart
          ? "ring-2 shadow-lg"
          : hasFlixInCart
            ? "opacity-60 border border-gray-100"
            : "border border-gray-100"
      }`}
      style={{
        borderColor: isInCart ? upgrade.cor : undefined,
        boxShadow: isInCart ? `0 8px 24px ${upgrade.cor}15` : undefined,
      }}
    >
      {/* Top gradient bar */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, ${upgrade.cor}, ${upgrade.cor}80)`,
        }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-blenduca-grafite text-white px-2.5 py-1 rounded">
            EXPERIENCE FLIX
          </span>
          <span
            className={`font-play text-[10px] font-bold tracking-wider uppercase text-white px-2.5 py-1 rounded ${PLAN_COLORS[upgrade.plano] ?? "bg-blenduca-grafite"}`}
          >
            {upgrade.plano}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-kanit font-bold text-base text-blenduca-grafite leading-snug mb-1.5">
          {upgrade.nome}
        </h3>
        <p className="font-kanit text-xs text-blenduca-cinza-medio mb-3 line-clamp-2">
          {upgrade.descricao}
        </p>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="font-kanit text-xs text-blenduca-cinza-medio">
              R$
            </span>
            <span className="font-kanit font-bold text-2xl text-blenduca-grafite">
              {upgrade.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="font-kanit text-xs text-blenduca-cinza-medio">
              /mes
            </span>
          </div>
          <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-0.5">
            Plano de {upgrade.duracaoMinima} meses
          </p>
        </div>

        {/* Plan limits */}
        {upgrade.limitesPlano && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="font-kanit font-semibold text-xs text-blenduca-grafite mb-2">
              Limites do Plano:
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-kanit">
                <span className="text-blenduca-cinza-medio">
                  Areas de Membros:
                </span>
                <span className="font-semibold text-blenduca-grafite">
                  {upgrade.limitesPlano.areasMembrosBD}
                </span>
              </div>
              <div className="flex justify-between text-xs font-kanit">
                <span className="text-blenduca-cinza-medio">
                  Membros Ativos/mes:
                </span>
                <span className="font-semibold text-blenduca-grafite">
                  {upgrade.limitesPlano.membrosAtivosMes}
                </span>
              </div>
              {upgrade.limitesPlano.relatoriosPersonalizadosBD > 0 && (
                <div className="flex justify-between text-xs font-kanit">
                  <span className="text-blenduca-cinza-medio">
                    Relatorios Personalizados:
                  </span>
                  <span className="font-semibold text-blenduca-grafite">
                    {upgrade.limitesPlano.relatoriosPersonalizadosBD}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Differentials */}
        {upgrade.diferenciais && upgrade.diferenciais.length > 0 && (
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-3 mb-4">
            <h4 className="font-kanit font-semibold text-xs text-blenduca-vermelho mb-1.5">
              Diferenciais deste plano:
            </h4>
            <ul className="space-y-0.5">
              {upgrade.diferenciais.map((diff, idx) => (
                <li
                  key={idx}
                  className="text-[11px] font-kanit text-blenduca-grafite"
                >
                  {diff}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resources toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 text-xs font-kanit font-medium text-blenduca-azul mb-3 hover:underline"
        >
          <svg
            className={`w-3 h-3 transition-transform ${showDetails ? "rotate-90" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {showDetails ? "Ocultar recursos" : "Ver recursos inclusos"}
        </button>

        {showDetails && (
          <div className="mb-4 animate-fade-in-up">
            <ul className="space-y-1">
              {upgrade.entregaveisBase.map((ent, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
                >
                  <svg
                    className="w-3.5 h-3.5 text-blenduca-azul mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{ent}</span>
                </li>
              ))}
            </ul>

            {/* What's not included */}
            {upgrade.naoInclui && upgrade.naoInclui.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="font-kanit text-[10px] font-semibold text-gray-400 mb-1">
                  Nao inclui:
                </p>
                {upgrade.naoInclui.map((item, idx) => (
                  <p
                    key={idx}
                    className="font-kanit text-[10px] text-gray-400 flex items-start gap-1.5"
                  >
                    <span className="shrink-0">-</span>
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() =>
            isInCart ? removerItem(upgrade.id) : adicionarFlix(upgrade)
          }
          disabled={!isInCart && hasFlixInCart}
          className={`w-full py-2.5 rounded-lg font-kanit font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isInCart
              ? "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
              : "text-white shadow-md hover:opacity-90"
          }`}
          style={{
            backgroundColor: !isInCart ? upgrade.cor : undefined,
          }}
        >
          {isInCart ? "Remover" : "Adicionar ao Pacote"}
        </button>

        {/* Notes */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          {upgrade.observacoes.map((obs, i) => (
            <p
              key={i}
              className="font-kanit text-[10px] text-gray-400 leading-relaxed"
            >
              {obs}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
