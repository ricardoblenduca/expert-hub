"use client";

import { useCartStore } from "@/store/useCartStore";
import Header from "@/components/Header";
import ModalidadeSelector from "@/components/ModalidadeSelector";
import NivelSelector from "@/components/NivelSelector";
import CustomizacoesSection from "@/components/CustomizacoesSection";
import AgentesSection from "@/components/AgentesSection";
import CartSidebar from "@/components/CartSidebar";
import ClientForm from "@/components/ClientForm";
import ProposalPreview from "@/components/ProposalPreview";
import Toast from "@/components/Toast";

export default function Home() {
  const step = useCartStore((s) => s.step);

  const showSidebar = ["modalidade", "nivel", "customizacoes", "agentes"].includes(step);

  return (
    <div className="min-h-screen bg-blenduca-bg font-kanit">
      <Header />
      <Toast />

      {showSidebar ? (
        <div className="flex">
          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-full lg:max-w-[calc(100%-24rem)]">
            {step === "modalidade" && <ModalidadeSelector />}
            {step === "nivel" && <NivelSelector />}
            {step === "customizacoes" && <CustomizacoesSection />}
            {step === "agentes" && <AgentesSection />}
          </main>

          {/* Cart sidebar */}
          <CartSidebar />
        </div>
      ) : (
        <main className="p-4 md:p-6 lg:p-8">
          {step === "cliente" && <ClientForm />}
          {step === "preview" && <ProposalPreview />}
        </main>
      )}
    </div>
  );
}
