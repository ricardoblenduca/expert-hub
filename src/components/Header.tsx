"use client";

import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const carrinho = useCartStore((s) => s.carrinho);
  const step = useCartStore((s) => s.step);
  const setStep = useCartStore((s) => s.setStep);
  const setMobileCartOpen = useCartStore((s) => s.setMobileCartOpen);
  const mobileCartOpen = useCartStore((s) => s.mobileCartOpen);

  return (
    <header className="sticky top-0 z-50 bg-blenduca-grafite text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("catalogo")}
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
                  Calculator
                </p>
              </div>
            </button>
          </div>

          {/* Steps indicator */}
          <div className="hidden md:flex items-center gap-2">
            <StepIndicator
              label="Catalogo"
              num={1}
              active={step === "catalogo"}
              onClick={() => setStep("catalogo")}
            />
            <div className="w-8 h-px bg-gray-600" />
            <StepIndicator
              label="Cliente"
              num={2}
              active={step === "cliente"}
              onClick={() => carrinho.length > 0 && setStep("cliente")}
              disabled={carrinho.length === 0}
            />
            <div className="w-8 h-px bg-gray-600" />
            <StepIndicator
              label="Proposta"
              num={3}
              active={step === "preview"}
              onClick={() => {}}
              disabled
            />
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
            {carrinho.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blenduca-vermelho text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {carrinho.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function StepIndicator({
  label,
  num,
  active,
  onClick,
  disabled,
}: {
  label: string;
  num: number;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-kanit font-medium transition-all ${
        active
          ? "bg-blenduca-vermelho text-white"
          : disabled
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
          active ? "bg-white text-blenduca-vermelho" : "bg-gray-600 text-gray-300"
        }`}
      >
        {num}
      </span>
      {label}
    </button>
  );
}
