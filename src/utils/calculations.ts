import type { ItemCarrinho, Produto, ServicoAdicional, ResumoCarrinho } from "@/types";

export function aplicarDesconto(subtotal: number): number {
  if (subtotal >= 50000) return subtotal * 0.1;
  if (subtotal >= 30000) return subtotal * 0.07;
  if (subtotal >= 20000) return subtotal * 0.05;
  return 0;
}

export function calcularResumo(carrinho: ItemCarrinho[]): ResumoCarrinho {
  const produtoPrincipal = carrinho.find((i) => i.tipo === "produto");
  const servicosAdicionais = carrinho.filter((i) => i.tipo === "servico");

  const totalProduto = produtoPrincipal
    ? (produtoPrincipal.item as Produto).investimento.mensal
    : 0;

  const totalServicos = servicosAdicionais.reduce((acc, curr) => {
    return acc + (curr.item as ServicoAdicional).preco * curr.quantidade;
  }, 0);

  const subtotal = totalProduto + totalServicos;
  const desconto = aplicarDesconto(subtotal);
  const total = subtotal - desconto;

  return {
    totalProduto,
    totalServicos,
    subtotal,
    desconto,
    total,
    totalAnual: total * 12,
  };
}
