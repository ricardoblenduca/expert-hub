"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { produtos } from "@/data/produtos";
import { upgradesPlataforma } from "@/data/servicos";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import UpgradeCardFunnel from "@/components/UpgradeCardFunnel";
import UpgradeCardFlix from "@/components/UpgradeCardFlix";
import CartSidebar from "@/components/CartSidebar";
import ClientForm from "@/components/ClientForm";
import ProposalPreview from "@/components/ProposalPreview";
import Toast from "@/components/Toast";

export default function Home() {
  const step = useCartStore((s) => s.step);
  const carrinho = useCartStore((s) => s.carrinho);
  const setDadosCliente = useCartStore((s) => s.setDadosCliente);
  const setConsultor = useCartStore((s) => s.setConsultor);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (carrinho.length > 0) {
        const state = useCartStore.getState();
        localStorage.setItem(
          "proposta_rascunho",
          JSON.stringify({
            carrinho: state.carrinho,
            dadosCliente: state.dadosCliente,
            consultor: state.consultor,
            timestamp: new Date().toISOString(),
          })
        );
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [carrinho]);

  // Recover draft on load
  useEffect(() => {
    try {
      const rascunho = localStorage.getItem("proposta_rascunho");
      if (rascunho) {
        const data = JSON.parse(rascunho);
        if (data.dadosCliente) setDadosCliente(data.dadosCliente);
        if (data.consultor) setConsultor(data.consultor);
      }
    } catch {
      // ignore parse errors
    }
  }, [setDadosCliente, setConsultor]);

  const funnelUpgrades = upgradesPlataforma.filter(
    (u) => u.tipo === "funnel_pages"
  );
  const flixUpgrades = upgradesPlataforma.filter(
    (u) => u.tipo === "experience_flix"
  );

  return (
    <div className="min-h-screen bg-blenduca-bg font-kanit">
      <Header />
      <Toast />

      {step === "catalogo" && (
        <div className="flex">
          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-full lg:max-w-[calc(100%-24rem)]">
            {/* Products section */}
            <section className="mb-10">
              <div className="mb-6">
                <h2 className="font-kanit font-bold text-2xl text-blenduca-grafite">
                  Produtos Principais
                </h2>
                <p className="font-kanit text-sm text-blenduca-cinza-medio mt-1">
                  Selecione o plano ideal para o seu cliente
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {produtos.map((produto, index) => (
                  <div
                    key={produto.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard produto={produto} />
                  </div>
                ))}
              </div>
            </section>

            {/* Upgrades de Plataforma */}
            <section className="mb-10">
              <div className="mb-6">
                <h2 className="font-kanit font-bold text-2xl text-blenduca-grafite">
                  Upgrades de Plataforma
                </h2>
                <p className="font-kanit text-sm text-blenduca-cinza-medio mt-1">
                  Adicione ferramentas de plataforma ao pacote do cliente
                </p>
              </div>

              {/* Funnel Pages */}
              <div className="mb-8">
                <h3 className="font-play text-xs font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-4">
                  FUNNEL PAGES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {funnelUpgrades.map((upgrade, index) => (
                    <div
                      key={upgrade.id}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <UpgradeCardFunnel upgrade={upgrade} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Flix */}
              <div>
                <h3 className="font-play text-xs font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-4">
                  EXPERIENCE FLIX
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {flixUpgrades.map((upgrade, index) => (
                    <div
                      key={upgrade.id}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <UpgradeCardFlix upgrade={upgrade} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* Cart sidebar */}
          <CartSidebar />
        </div>
      )}

      {step === "cliente" && (
        <main className="p-4 md:p-6 lg:p-8">
          <ClientForm />
        </main>
      )}

      {step === "preview" && (
        <main className="p-4 md:p-6 lg:p-8">
          <ProposalPreview />
        </main>
      )}
    </div>
  );
}
