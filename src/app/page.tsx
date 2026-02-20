"use client";

import { useCartStore } from "@/store/useCartStore";
import Header from "@/components/Header";
import HomeScreen from "@/components/HomeScreen";
import ModalidadeSelector from "@/components/ModalidadeSelector";
import NivelSelector from "@/components/NivelSelector";
import CustomizacoesSection from "@/components/CustomizacoesSection";
import TecnologiaAvulsa from "@/components/TecnologiaAvulsa";
import AgentesSection from "@/components/AgentesSection";
import NegociacaoSection from "@/components/NegociacaoSection";
import CartSidebar from "@/components/CartSidebar";
import ServicosExtrasSection from "@/components/ServicosExtrasSection";
import ClientForm from "@/components/ClientForm";
import ProposalPreview from "@/components/ProposalPreview";
import Toast from "@/components/Toast";

export default function Home() {
  const step = useCartStore((s) => s.step);

  // Steps that show sidebar (cart visible)
  const showSidebar = [
    "modalidade",
    "nivel",
    "customizacoes",
    "adicionar_tech",
    "tecnologia",
    "agentes",
    "extras",
    "negociacao",
  ].includes(step);

  // Steps that are full-width without sidebar
  const isFullWidth = ["home", "cliente", "preview"].includes(step);

  return (
    <div className="min-h-screen bg-blenduca-bg font-kanit">
      <Header />
      <Toast />

      {isFullWidth ? (
        <main className="p-4 md:p-6 lg:p-8">
          {step === "home" && <HomeScreen />}
          {step === "cliente" && <ClientForm />}
          {step === "preview" && <ProposalPreview />}
        </main>
      ) : showSidebar ? (
        <div className="flex">
          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-full lg:max-w-[calc(100%-24rem)]">
            {step === "modalidade" && <ModalidadeSelector />}
            {step === "nivel" && <NivelSelector />}
            {step === "customizacoes" && <CustomizacoesSection />}
            {step === "adicionar_tech" && <TecnologiaAvulsa />}
            {step === "tecnologia" && <TecnologiaAvulsa />}
            {step === "agentes" && <AgentesSection />}
            {step === "extras" && <ServicosExtrasSection />}
            {step === "negociacao" && <NegociacaoSection />}
          </main>

          {/* Cart sidebar */}
          <CartSidebar />
        </div>
      ) : null}
    </div>
  );
}
