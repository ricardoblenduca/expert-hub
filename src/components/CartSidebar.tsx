"use client";

import { useCartStore } from "@/store/useCartStore";
import { calcularResumo } from "@/utils/calculations";
import { formatCurrency } from "@/utils/formatting";
import CartItem from "./CartItem";
import type { Produto, ServicoAdicional } from "@/types";

export default function CartSidebar() {
  const carrinho = useCartStore((s) => s.carrinho);
  const step = useCartStore((s) => s.step);
  const setStep = useCartStore((s) => s.setStep);
  const mobileCartOpen = useCartStore((s) => s.mobileCartOpen);
  const setMobileCartOpen = useCartStore((s) => s.setMobileCartOpen);
  const addToast = useCartStore((s) => s.addToast);

  const resumo = calcularResumo(carrinho);
  const produtoItem = carrinho.find((i) => i.tipo === "produto");
  const servicos = carrinho.filter((i) => i.tipo === "servico");

  const handleFinalize = () => {
    if (carrinho.length === 0) {
      addToast("Adicione ao menos um produto ao carrinho", "warning");
      return;
    }
    if (!produtoItem) {
      addToast("Selecione um produto principal", "warning");
      return;
    }
    setStep("cliente");
    setMobileCartOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="font-kanit font-bold text-lg text-blenduca-grafite">
            Carrinho
            {carrinho.length > 0 && (
              <span className="ml-2 bg-blenduca-vermelho text-white text-xs font-bold rounded-full px-2 py-0.5">
                {carrinho.length}
              </span>
            )}
          </h2>
          <button
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setMobileCartOpen(false)}
            aria-label="Fechar carrinho"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {carrinho.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <p className="font-kanit text-sm text-blenduca-cinza-medio">
              Seu carrinho esta vazio
            </p>
            <p className="font-kanit text-xs text-gray-400 mt-1">
              Selecione um produto principal para comecar
            </p>
          </div>
        ) : (
          <>
            {/* Main product */}
            {produtoItem && (
              <div>
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-2">
                  PRODUTO PRINCIPAL
                </h3>
                <CartItem item={produtoItem} />
              </div>
            )}

            {/* Additional services */}
            {servicos.length > 0 && (
              <div>
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-2 mt-4">
                  SERVICOS ADICIONAIS
                </h3>
                <div className="space-y-2">
                  {servicos.map((item) => (
                    <CartItem key={item.item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Summary */}
      {carrinho.length > 0 && (
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/50">
          {/* Subtotals */}
          <div className="space-y-1.5">
            {resumo.totalProduto > 0 && (
              <div className="flex justify-between text-sm font-kanit">
                <span className="text-blenduca-cinza-medio">Produto Principal:</span>
                <span className="font-medium text-blenduca-grafite">
                  {formatCurrency(resumo.totalProduto)}
                </span>
              </div>
            )}
            {resumo.totalServicos > 0 && (
              <div className="flex justify-between text-sm font-kanit">
                <span className="text-blenduca-cinza-medio">Servicos Adicionais:</span>
                <span className="font-medium text-blenduca-grafite">
                  {formatCurrency(resumo.totalServicos)}
                </span>
              </div>
            )}
          </div>

          {/* Discount */}
          {resumo.desconto > 0 && (
            <div className="flex justify-between text-sm font-kanit border-t border-dashed border-gray-200 pt-2">
              <span className="text-blenduca-vermelho">Desconto:</span>
              <span className="font-medium text-blenduca-vermelho">
                - {formatCurrency(resumo.desconto)}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="border-t-2 border-blenduca-grafite pt-3">
            <div className="flex justify-between items-baseline">
              <span className="font-kanit font-bold text-sm text-blenduca-grafite">
                TOTAL MENSAL
              </span>
              <span className="font-kanit font-bold text-2xl text-blenduca-vermelho animate-count-up">
                {formatCurrency(resumo.total)}
              </span>
            </div>
            <div className="flex justify-between text-xs font-kanit text-blenduca-cinza-medio mt-1">
              <span>Total Anual (12x):</span>
              <span>{formatCurrency(resumo.totalAnual)}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleFinalize}
            disabled={carrinho.length === 0}
            className="w-full py-3 bg-blenduca-vermelho text-white rounded-lg font-kanit font-semibold text-sm transition-all duration-300 hover:bg-blenduca-vermelho-dark shadow-lg shadow-blenduca-vermelho/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Finalizar Proposta
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-96 bg-white border-l border-gray-100 shadow-sm h-[calc(100vh-4rem)] sticky top-16 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileCartOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden animate-slide-in-right shadow-2xl">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}
