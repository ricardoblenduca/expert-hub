"use client";

import { useState } from "react";
import type { UpgradePlataforma } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatting";

const PLAN_COLORS: Record<string, string> = {
  STARTER: "bg-blenduca-vermelho",
  PROFESSIONAL: "bg-blenduca-verde",
};

export default function UpgradeCardFunnel({
  upgrade,
}: {
  upgrade: UpgradePlataforma;
}) {
  const carrinho = useCartStore((s) => s.carrinho);
  const adicionarFunnel = useCartStore((s) => s.adicionarFunnel);
  const removerItem = useCartStore((s) => s.removerItem);

  const isInCart = carrinho.some(
    (i) => i.tipo === "upgrade_funnel" && i.item.id === upgrade.id
  );
  const hasFunnelInCart = carrinho.some((i) => i.tipo === "upgrade_funnel");

  const [funisExtras, setFunisExtras] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const precoPorFunil =
    upgrade.upgrades?.funisExtras.precoPorUnidade ?? 100;
  const precoTotal = upgrade.preco + funisExtras * precoPorFunil;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up relative overflow-hidden ${
        isInCart
          ? "ring-2 shadow-lg"
          : hasFunnelInCart
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
            FUNNEL PAGES
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

        {/* Deliverables toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 text-xs font-kanit font-medium text-blenduca-vermelho mb-3 hover:underline"
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
          <ul className="mb-4 space-y-1 animate-fade-in-up">
            {upgrade.entregaveisBase.map((ent, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
              >
                <svg
                  className="w-3.5 h-3.5 text-blenduca-vermelho mt-0.5 shrink-0"
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
        )}

        {/* Extras section */}
        {upgrade.upgrades?.funisExtras.disponivel && !isInCart && (
          <div className="bg-gray-50 rounded-lg p-3.5 mb-4 border-l-4 border-blenduca-vermelho">
            <h4 className="font-kanit font-semibold text-xs text-blenduca-grafite mb-2">
              Adicione Funis Extras
            </h4>
            <p className="font-kanit text-[10px] text-blenduca-cinza-medio mb-3">
              Alem dos funis inclusos, adicione quantos precisar:
            </p>

            <div className="flex items-center gap-3 mb-2">
              <label className="font-kanit text-xs text-blenduca-cinza-medio shrink-0">
                Quantidade:
              </label>
              <div className="flex items-center border border-gray-200 rounded-md">
                <button
                  onClick={() => setFunisExtras(Math.max(0, funisExtras - 1))}
                  className="w-8 h-8 flex items-center justify-center text-blenduca-vermelho font-bold hover:bg-blenduca-vermelho hover:text-white transition-colors rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  value={funisExtras}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 0;
                    setFunisExtras(Math.max(0, Math.min(20, v)));
                  }}
                  className="w-12 h-8 text-center text-sm font-kanit font-semibold text-blenduca-grafite border-x border-gray-200 focus:outline-none"
                  min={0}
                  max={20}
                />
                <button
                  onClick={() => setFunisExtras(Math.min(20, funisExtras + 1))}
                  className="w-8 h-8 flex items-center justify-center text-blenduca-vermelho font-bold hover:bg-blenduca-vermelho hover:text-white transition-colors rounded-r-md"
                >
                  +
                </button>
              </div>
              <span className="font-kanit text-[10px] text-blenduca-cinza-medio">
                R$ {precoPorFunil.toFixed(0)}/mes cada
              </span>
            </div>

            {/* Dynamic calculation */}
            {funisExtras > 0 && (
              <div className="bg-white rounded-md p-3 border border-gray-100 mt-3">
                <div className="flex justify-between text-xs font-kanit text-blenduca-cinza-medio mb-1">
                  <span>Plano Base:</span>
                  <span>{formatCurrency(upgrade.preco)}</span>
                </div>
                <div className="flex justify-between text-xs font-kanit text-blenduca-vermelho font-semibold mb-1">
                  <span>
                    {funisExtras}x Funis Extras:
                  </span>
                  <span>{formatCurrency(funisExtras * precoPorFunil)}</span>
                </div>
                <div className="flex justify-between text-sm font-kanit font-bold text-blenduca-grafite pt-2 mt-2 border-t border-gray-100">
                  <span>Total:</span>
                  <span className="text-blenduca-vermelho">
                    {formatCurrency(precoTotal)}/mes
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() =>
            isInCart
              ? removerItem(upgrade.id)
              : adicionarFunnel(upgrade, funisExtras)
          }
          disabled={!isInCart && hasFunnelInCart}
          className={`w-full py-2.5 rounded-lg font-kanit font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isInCart
              ? "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
              : "text-white shadow-md hover:opacity-90"
          }`}
          style={{
            backgroundColor: !isInCart ? upgrade.cor : undefined,
          }}
        >
          {isInCart
            ? "Remover"
            : funisExtras > 0
              ? `Adicionar (+${funisExtras} extras)`
              : "Adicionar Plano Base"}
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
