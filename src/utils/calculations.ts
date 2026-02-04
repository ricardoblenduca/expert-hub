import type { ItemCarrinho, Produto, ResumoCarrinho } from "@/types";

export function aplicarDesconto(subtotal: number): number {
  if (subtotal >= 50000) return subtotal * 0.1;
  if (subtotal >= 30000) return subtotal * 0.07;
  if (subtotal >= 20000) return subtotal * 0.05;
  return 0;
}

export function calcularResumo(carrinho: ItemCarrinho[]): ResumoCarrinho {
  const produtoPrincipal = carrinho.find((i) => i.tipo === "produto");
  const upgradeFunnel = carrinho.find((i) => i.tipo === "upgrade_funnel");
  const upgradeFlix = carrinho.find((i) => i.tipo === "upgrade_flix");

  const totalProduto = produtoPrincipal
    ? (produtoPrincipal.item as Produto).investimento.mensal
    : 0;

  const totalFunnel = upgradeFunnel?.precoTotal ?? 0;
  const totalFlix = upgradeFlix?.precoTotal ?? 0;
  const totalUpgrades = totalFunnel + totalFlix;

  const subtotal = totalProduto + totalUpgrades;
  const desconto = aplicarDesconto(subtotal);
  const total = subtotal - desconto;

  return {
    totalProduto,
    totalFunnel,
    totalFlix,
    totalUpgrades,
    subtotal,
    desconto,
    total,
    totalAnual: total * 12,
  };
}
