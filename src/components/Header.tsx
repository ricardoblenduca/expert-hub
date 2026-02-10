"use client";

import { useCartStore, Step } from "@/store/useCartStore";

const STEPS: { id: Step; label: string; num: number }[] = [
  { id: "modalidade", label: "Modalidade", num: 1 },
  { id: "nivel", label: "Nivel", num: 2 },
  { id: "customizacoes", label: "Upgrades", num: 3 },
  { id: "agentes", label: "Agentes", num: 4 },
  { id: "cliente", label: "Cliente", num: 5 },
  { id: "preview", label: "Proposta", num: 6 },
];

export default function Header() {
  const carrinho = useCartStore((s) => s.carrinho);
  const step = useCartStore((s) => s.step);
  const setStep = useCartStore((s) => s.setStep);
  const setMobileCartOpen = useCartStore((s) => s.setMobileCartOpen);
  const mobileCartOpen = useCartStore((s) => s.mobileCartOpen);

  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  const hasSelection = carrinho.modalidade && carrinho.nivel;

  return (
    <header className="sticky top-0 z-50 bg-blenduca-grafite text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("modalidade")}
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
                  Calculator v4.0
                </p>
              </div>
            </button>
          </div>

          {/* Steps indicator (simplified) */}
          <div className="hidden md:flex items-center gap-1">
            {STEPS.slice(0, 4).map((s, i) => {
              const isActive = step === s.id;
              const isPast = currentStepIndex > i;
              const canClick = i === 0 || (i === 1 && carrinho.modalidade) || (i > 1 && hasSelection);

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

            {/* Separator before cliente/preview */}
            <div className="w-4 h-px bg-gray-600 mx-1" />

            {/* Cliente step */}
            <button
              onClick={() => hasSelection && setStep("cliente")}
              disabled={!hasSelection}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-kanit font-medium transition-all ${
                step === "cliente"
                  ? "bg-blenduca-vermelho text-white"
                  : step === "preview"
                    ? "text-green-400 cursor-pointer"
                    : hasSelection
                      ? "text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                      : "text-gray-500 cursor-not-allowed"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  step === "cliente"
                    ? "bg-white text-blenduca-vermelho"
                    : step === "preview"
                      ? "bg-green-500 text-white"
                      : "bg-gray-600 text-gray-300"
                }`}
              >
                {step === "preview" ? "✓" : "5"}
              </span>
              <span className="hidden lg:inline">Cliente</span>
            </button>

            <div className="w-4 h-px bg-gray-600 mx-1" />

            {/* Preview step */}
            <button
              disabled
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-kanit font-medium ${
                step === "preview"
                  ? "bg-blenduca-vermelho text-white"
                  : "text-gray-500 cursor-not-allowed"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  step === "preview" ? "bg-white text-blenduca-vermelho" : "bg-gray-600 text-gray-300"
                }`}
              >
                6
              </span>
              <span className="hidden lg:inline">Proposta</span>
            </button>
          </div>

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
            {hasSelection && (
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
