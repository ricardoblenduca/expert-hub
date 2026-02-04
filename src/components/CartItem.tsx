"use client";

import type { ItemCarrinho, Produto, ServicoAdicional } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatting";

export default function CartItem({ item }: { item: ItemCarrinho }) {
  const removerItem = useCartStore((s) => s.removerItem);
  const atualizarQuantidade = useCartStore((s) => s.atualizarQuantidade);

  const isProduto = item.tipo === "produto";
  const nome = isProduto
    ? (item.item as Produto).categoria
    : (item.item as ServicoAdicional).nome;
  const preco = isProduto
    ? (item.item as Produto).investimento.mensal
    : (item.item as ServicoAdicional).preco * item.quantidade;
  const tipo = isProduto
    ? "mensal"
    : (item.item as ServicoAdicional).tipo;

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 transition-all hover:border-gray-200">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            {isProduto && (
              <span className="w-2 h-2 rounded-full bg-blenduca-vermelho shrink-0" />
            )}
            <h4 className="font-kanit font-medium text-sm text-blenduca-grafite truncate">
              {nome}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-kanit font-bold text-sm text-blenduca-grafite">
              {formatCurrency(preco)}
            </span>
            <span className="font-kanit text-[10px] text-blenduca-cinza-medio">
              /{tipo === "mensal" ? "mes" : "unico"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quantity controls for services */}
          {!isProduto && (
            <div className="flex items-center border border-gray-200 rounded">
              <button
                onClick={() =>
                  atualizarQuantidade(item.item.id, item.quantidade - 1)
                }
                className="px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Diminuir quantidade"
              >
                -
              </button>
              <span className="px-2 py-0.5 text-xs font-kanit font-medium text-blenduca-grafite border-x border-gray-200">
                {item.quantidade}
              </span>
              <button
                onClick={() =>
                  atualizarQuantidade(item.item.id, item.quantidade + 1)
                }
                className="px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          )}

          {/* Remove */}
          <button
            onClick={() => removerItem(item.item.id)}
            className="p-1 text-gray-400 hover:text-blenduca-vermelho transition-colors rounded"
            aria-label="Remover item"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
