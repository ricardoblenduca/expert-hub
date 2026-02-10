"use client";

import { useCartStore, Step } from "@/store/useCartStore";

// V5.0: New step flow with entry points (V0.13: Added negociacao)
const STEPS: { id: Step; label: string; num: number }[] = [
  { id: "modalidade", label: "Programa", num: 1 },
  { id: "nivel", label: "Nivel", num: 2 },
  { id: "customizacoes", label: "Upgrades", num: 3 },
  { id: "agentes", label: "Agentes", num: 4 },
  { id: "negociacao", label: "Negociacao", num: 5 },
  { id: "cliente", label: "Cliente", num: 6 },
  { id: "preview", label: "Proposta", num: 7 },
];

// Steps for technology-only flow
const TECH_STEPS: { id: Step; label: string; num: number }[] = [
  { id: "tecnologia", label: "Tecnologia", num: 1 },
  { id: "agentes", label: "Agentes", num: 2 },
  { id: "negociacao", label: "Negociacao", num: 3 },
  { id: "cliente", label: "Cliente", num: 4 },
  { id: "preview", label: "Proposta", num: 5 },
];

// Steps for agents-only flow
const AGENT_STEPS: { id: Step; label: string; num: number }[] = [
  { id: "agentes", label: "Agentes", num: 1 },
  { id: "negociacao", label: "Negociacao", num: 2 },
  { id: "cliente", label: "Cliente", num: 3 },
  { id: "preview", label: "Proposta", num: 4 },
];

export default function Header() {
  const carrinho = useCartStore((s) => s.carrinho);
  const step = useCartStore((s) => s.step);
  const setStep = useCartStore((s) => s.setStep);
  const setMobileCartOpen = useCartStore((s) => s.setMobileCartOpen);
  const mobileCartOpen = useCartStore((s) => s.mobileCartOpen);
  const resetCarrinho = useCartStore((s) => s.resetCarrinho);

  // Determine which step flow to use based on tipoProposta
  const getActiveSteps = () => {
    if (carrinho.tipoProposta === "tecnologia") return TECH_STEPS;
    if (carrinho.tipoProposta === "agentes") return AGENT_STEPS;
    return STEPS;
  };

  const activeSteps = getActiveSteps();
  const currentStepIndex = activeSteps.findIndex((s) => s.id === step);

  const hasSelection = carrinho.modalidade && carrinho.nivel;
  const hasTech = carrinho.tecnologiaAvulsa !== null;
  const hasAgents = carrinho.agentes.length > 0;
  const hasAnything = hasSelection || hasTech || hasAgents;

  return (
    <header className="sticky top-0 z-50 bg-blenduca-grafite text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => resetCarrinho()}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 bg-blenduca-vermelho rounded-lg flex items-center justify-center font-kanit font-bold text-lg">
                B
              </div>
              <div>
                <h1 className="font-kanit font-bold text-base leading-tight tracking-wide">
                  EXPERT HUB
                </h1>
                <p className="font-play text-[10px] tracking-widest text-gray-400 uppercase">
                  Calculator v5.0
                </p>
              </div>
            </button>
          </div>

          {/* Steps indicator - dynamic based on flow */}
          {step !== "home" && (
            <div className="hidden md:flex items-center gap-1">
              {activeSteps.map((s, i) => {
                const isActive = step === s.id ||
                  (s.id === "customizacoes" && step === "adicionar_tech");
                const isPast = currentStepIndex > i;

                // Determine if step is clickable
                const canClick = (() => {
                  if (i === 0) return true;
                  if (carrinho.tipoProposta === "programa") {
                    if (s.id === "nivel") return !!carrinho.modalidade;
                    if (s.id === "customizacoes" || s.id === "adicionar_tech") return hasSelection;
                    if (s.id === "agentes") return hasSelection;
                    if (s.id === "negociacao") return hasSelection;
                    if (s.id === "cliente") return hasAnything;
                    if (s.id === "preview") return false;
                  }
                  if (carrinho.tipoProposta === "tecnologia") {
                    if (s.id === "agentes") return hasTech;
                    if (s.id === "negociacao") return hasTech || hasAgents;
                    if (s.id === "cliente") return hasTech || hasAgents;
                    if (s.id === "preview") return false;
                  }
                  if (carrinho.tipoProposta === "agentes") {
                    if (s.id === "negociacao") return true;
                    if (s.id === "cliente") return true;
                    if (s.id === "preview") return false;
                  }
                  return isPast;
                })();

                return (
                  <div key={s.id} className="flex items-center">
                    {i > 0 && <div className="w-4 h-px bg-gray-600 mx-1" />}
                    <button
                      onClick={() => canClick && setStep(s.id)}
                      disabled={!canClick}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-kanit font-medium transition-all ${
                        isActive
                          ? "bg-blenduca-vermelho text-white"
                          : isPast
                            ? "text-green-400 hover:text-white hover:bg-white/10 cursor-pointer"
                            : canClick
                              ? "text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                              : "text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                          isActive
                            ? "bg-white text-blenduca-vermelho"
                            : isPast
                              ? "bg-green-500 text-white"
                              : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        {isPast ? "✓" : s.num}
                      </span>
                      <span className="hidden lg:inline">{s.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile cart toggle */}
          <button
            className="lg:hidden relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileCartOpen(!mobileCartOpen)}
            aria-label="Abrir carrinho"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            {hasAnything && (
              <span className="absolute -top-1 -right-1 bg-blenduca-vermelho text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                ✓
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
