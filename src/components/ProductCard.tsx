"use client";

import { useState } from "react";
import type { Produto } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatting";

const PILAR_ICONS: Record<string, string> = {
  IMPLEMENTACAO: "🚀",
  CONSULTORIA: "📋",
  ACOMPANHAMENTO: "📊",
  EDUCACAO: "🎓",
  TECNOLOGIA: "💻",
  COMUNIDADE: "🤝",
  PLATAFORMA: "🌐",
  "SERVICO / TECNOLOGIA": "⚙️",
  "CONSULTORIA / TECNOLOGIA": "📈",
};

export default function ProductCard({ produto }: { produto: Produto }) {
  const [expanded, setExpanded] = useState(false);
  const carrinho = useCartStore((s) => s.carrinho);
  const adicionarProduto = useCartStore((s) => s.adicionarProduto);

  const isSelected = carrinho.some(
    (i) => i.tipo === "produto" && i.item.id === produto.id
  );

  const badgeColorClass =
    produto.id === "starter"
      ? "bg-blenduca-vermelho"
      : produto.id === "professional"
        ? "bg-blenduca-verde"
        : produto.id === "business"
          ? "bg-blenduca-azul"
          : "bg-blenduca-grafite";

  const totalEntregaveis = produto.entregaveis.reduce(
    (acc, p) => acc + p.items.length,
    0
  );

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up ${
        isSelected
          ? "ring-2 ring-blenduca-vermelho shadow-lg shadow-blenduca-vermelho/10"
          : "border border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`font-play text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded text-white ${badgeColorClass}`}
        >
          {produto.categoria}
        </span>
        {isSelected && (
          <span className="text-[11px] font-kanit font-medium text-blenduca-vermelho bg-blenduca-vermelho/10 px-2 py-1 rounded">
            Selecionado
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-kanit font-bold text-lg text-blenduca-grafite leading-snug mb-1">
        {produto.nome}
      </h3>
      <p className="font-kanit text-sm text-blenduca-cinza-medio mb-3">
        {produto.tagline}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-[11px] font-kanit bg-blenduca-cinza/60 text-blenduca-grafite px-2 py-1 rounded">
          {produto.faturamento}
        </span>
        <span className="text-[11px] font-kanit bg-blenduca-cinza/60 text-blenduca-grafite px-2 py-1 rounded">
          Min. {produto.investimento.minimoMeses} meses
        </span>
        {produto.investimento.extras && (
          <span className="text-[11px] font-kanit bg-blenduca-vermelho/10 text-blenduca-vermelho px-2 py-1 rounded">
            + {produto.investimento.extras}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="font-kanit text-sm text-blenduca-cinza-medio">
            R$
          </span>
          <span className="font-kanit font-bold text-3xl text-blenduca-grafite">
            {produto.investimento.mensal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="font-kanit text-sm text-blenduca-cinza-medio">
            /mes
          </span>
        </div>
      </div>

      {/* Pillar summary */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {produto.entregaveis.map((pilar) => (
          <span
            key={pilar.pilar}
            className="text-[10px] font-play font-bold tracking-wider uppercase bg-gray-50 text-blenduca-cinza-medio px-2 py-1 rounded"
          >
            {PILAR_ICONS[pilar.pilar] || "📌"} {pilar.pilar}
          </span>
        ))}
      </div>

      {/* Expandable deliverables */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left mb-4 group"
      >
        <div className="flex items-center justify-between text-sm font-kanit font-medium text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors">
          <span>
            {totalEntregaveis} entregaveis inclusos
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="mb-4 space-y-3 animate-fade-in-up">
          {produto.entregaveis.map((pilar) => (
            <div key={pilar.pilar}>
              <h4 className="font-kanit font-semibold text-xs uppercase tracking-wide text-blenduca-grafite mb-1.5">
                {PILAR_ICONS[pilar.pilar] || "📌"} {pilar.pilar}
              </h4>
              <ul className="space-y-1">
                {pilar.items.map((item, idx) => (
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
                    <span>
                      {item.descricao}
                      {item.frequencia && (
                        <span className="text-blenduca-vermelho ml-1">
                          ({item.frequencia})
                        </span>
                      )}
                      {item.tipo && (
                        <span className="text-blenduca-verde ml-1">
                          [{item.tipo}]
                        </span>
                      )}
                      {item.quantidade && (
                        <span className="text-blenduca-azul ml-1">
                          - {item.quantidade}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => adicionarProduto(produto)}
        className={`w-full py-3 rounded-lg font-kanit font-semibold text-sm transition-all duration-300 cursor-pointer ${
          isSelected
            ? "bg-blenduca-grafite text-white hover:bg-gray-700"
            : "bg-blenduca-vermelho text-white hover:bg-blenduca-vermelho-dark shadow-md shadow-blenduca-vermelho/20 hover:shadow-lg hover:-translate-y-0.5"
        }`}
      >
        {isSelected ? "Selecionado" : "Selecionar Plano"}
      </button>
    </div>
  );
}
