"use client";

import type { ServicoAdicional } from "@/types";
import { useCartStore } from "@/store/useCartStore";

export default function ServiceCard({ servico }: { servico: ServicoAdicional }) {
  const carrinho = useCartStore((s) => s.carrinho);
  const adicionarServico = useCartStore((s) => s.adicionarServico);
  const removerItem = useCartStore((s) => s.removerItem);

  const isInCart = carrinho.some(
    (i) => i.tipo === "servico" && i.item.id === servico.id
  );

  return (
    <div
      className={`bg-white rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up ${
        isInCart
          ? "ring-2 ring-blenduca-azul shadow-lg shadow-blenduca-azul/10"
          : "border border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-blenduca-grafite text-white px-2.5 py-1 rounded">
          {servico.categoria}
        </span>
        <span
          className={`text-[10px] font-play font-bold tracking-wider uppercase px-2 py-1 rounded ${
            servico.tipo === "mensal"
              ? "bg-blenduca-azul/10 text-blenduca-azul"
              : "bg-blenduca-vermelho/10 text-blenduca-vermelho"
          }`}
        >
          {servico.tipo === "mensal" ? "MENSAL" : "UNICO"}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-kanit font-bold text-base text-blenduca-grafite leading-snug mb-1.5">
        {servico.nome}
      </h3>
      <p className="font-kanit text-xs text-blenduca-cinza-medio mb-3 line-clamp-2">
        {servico.descricao}
      </p>

      {/* Dedication level */}
      {servico.nivelDedicacao && (
        <div className="mb-3">
          <span className="text-[10px] font-kanit text-blenduca-cinza-medio">
            Dedicacao:
          </span>
          <span className="text-[11px] font-kanit font-medium text-blenduca-grafite ml-1">
            {servico.nivelDedicacao}
          </span>
        </div>
      )}

      {/* Price */}
      <div className="mb-3">
        <div className="flex items-baseline gap-1">
          <span className="font-kanit text-xs text-blenduca-cinza-medio">
            R$
          </span>
          <span className="font-kanit font-bold text-2xl text-blenduca-grafite">
            {servico.preco.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="font-kanit text-xs text-blenduca-cinza-medio">
            /{servico.tipo === "mensal" ? "mes" : "unico"}
          </span>
        </div>
      </div>

      {/* Deliverables */}
      {servico.entregaveis.length > 0 && (
        <ul className="mb-4 space-y-1">
          {servico.entregaveis.map((ent, idx) => (
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

      {/* CTA */}
      <button
        onClick={() => (isInCart ? removerItem(servico.id) : adicionarServico(servico))}
        className={`w-full py-2.5 rounded-lg font-kanit font-semibold text-sm transition-all duration-300 cursor-pointer ${
          isInCart
            ? "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
            : "bg-blenduca-azul text-white hover:opacity-90 shadow-md shadow-blenduca-azul/20"
        }`}
      >
        {isInCart ? "Remover" : "Adicionar"}
      </button>
    </div>
  );
}
