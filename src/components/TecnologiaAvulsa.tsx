"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { experienceFlixAvulso, funnelPagesAvulso } from "@/data/tecnologiaAvulsa";
import { niveis } from "@/data/modalidades";
import { formatCurrency } from "@/utils/formatting";
import type { NivelId } from "@/types";

type FunnelModo = "pacote" | "custom";

export default function TecnologiaAvulsa() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setStep = useCartStore((s) => s.setStep);
  const setExperienceFlixAvulso = useCartStore((s) => s.setExperienceFlixAvulso);
  const setFunnelPagesAvulso = useCartStore((s) => s.setFunnelPagesAvulso);

  // Local state for Funnel Pages selection
  const [funnelModo, setFunnelModo] = useState<FunnelModo>("pacote");
  const [funnelCustomQtd, setFunnelCustomQtd] = useState(1);
  const [selectedFunnelPacote, setSelectedFunnelPacote] = useState<string | null>(null);

  // Determine context
  const isStandalone = carrinho.tipoProposta === "tecnologia";
  const isAddingToProgram = carrinho.tipoProposta === "programa" || carrinho.tipoProposta === "combinado";

  // Current selections
  const selectedFlix = carrinho.tecnologiaAvulsa?.experienceFlix?.plano;
  const selectedFunnel = carrinho.tecnologiaAvulsa?.funnelPages;

  const handleBack = () => {
    if (isStandalone) {
      setStep("home");
    } else {
      setStep("nivel");
    }
  };

  const handleContinue = () => {
    setStep("agentes");
  };

  const handleSkip = () => {
    setStep("agentes");
  };

  const handleSelectFlix = (plano: NivelId | null) => {
    setExperienceFlixAvulso(plano);
  };

  const handleSelectFunnelPacote = (pacoteId: string) => {
    const pacote = funnelPagesAvulso.pacotesSugeridos.find((p) => p.id === pacoteId);
    if (pacote) {
      setSelectedFunnelPacote(pacoteId);
      setFunnelPagesAvulso({
        modo: "pacote",
        pacoteId,
        quantidade: pacote.funis,
        tipos: pacote.tipos,
        mensal: pacote.preco,
      });
    }
  };

  const handleSelectFunnelCustom = () => {
    const preco = funnelCustomQtd * funnelPagesAvulso.precoBase.precoPorFunil;
    setFunnelPagesAvulso({
      modo: "custom",
      quantidade: funnelCustomQtd,
      mensal: preco,
    });
  };

  const handleRemoveFunnel = () => {
    setFunnelPagesAvulso(null);
    setSelectedFunnelPacote(null);
  };

  const hasTech = selectedFlix || selectedFunnel;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {isStandalone ? "Voltar ao inicio" : "Voltar para niveis"}
      </button>

      <div className="text-center mb-8">
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          {isAddingToProgram ? "Adicionar Tecnologia ao seu Pacote" : "Escolha sua Tecnologia"}
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          {isAddingToProgram
            ? "Tecnologia opcional para potencializar seu programa de mentoria"
            : "Plataformas profissionais para escalar seu negocio digital"}
        </p>
      </div>

      {/* EXPERIENCE FLIX SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📺</span>
          <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
            Experience Flix
          </h3>
        </div>
        <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
          Plataforma de cursos online estilo Netflix - crie sua propria area de membros
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {niveis.map((nivel) => {
            const flix = experienceFlixAvulso[nivel.id];
            const isSelected = selectedFlix === nivel.id;

            return (
              <div
                key={nivel.id}
                className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  isSelected ? "border-blenduca-azul shadow-lg" : "border-gray-100 hover:border-blenduca-azul/50"
                }`}
                onClick={() => handleSelectFlix(isSelected ? null : nivel.id)}
              >
                <div className="h-1.5 rounded-t-xl" style={{ backgroundColor: nivel.cor }} />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-play text-[10px] font-bold tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: nivel.cor }}
                    >
                      {nivel.nome}
                    </span>
                    {isSelected && (
                      <span className="text-green-500 text-lg">✓</span>
                    )}
                  </div>

                  <p className="font-kanit text-xs text-blenduca-cinza-medio mb-3">
                    {flix.descricao}
                  </p>

                  <div className="space-y-1 mb-3">
                    <p className="font-kanit text-xs text-blenduca-grafite">
                      {typeof flix.limites.areas === "number"
                        ? `${flix.limites.areas} área${flix.limites.areas > 1 ? "s" : ""} de membros`
                        : "Áreas ilimitadas"}
                    </p>
                    <p className="font-kanit text-xs text-blenduca-grafite">
                      {typeof flix.limites.usuariosAtivos === "number"
                        ? `Até ${flix.limites.usuariosAtivos} usuarios ativos`
                        : "Usuarios ilimitados"}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    {flix.investimento.entrada && flix.investimento.entrada > 0 && (
                      <p className="font-kanit text-xs text-blenduca-cinza-medio">
                        Entrada: {formatCurrency(flix.investimento.entrada)}
                      </p>
                    )}
                    <p className="font-kanit font-bold text-lg text-blenduca-grafite">
                      {formatCurrency(flix.investimento.mensal)}
                      <span className="text-xs font-normal text-blenduca-cinza-medio">/mes</span>
                    </p>
                  </div>

                  <button
                    className={`w-full mt-3 py-2 rounded-lg font-kanit font-semibold text-sm transition-all ${
                      isSelected
                        ? "bg-blenduca-azul text-white"
                        : "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
                    }`}
                  >
                    {isSelected ? "Selecionado ✓" : "Selecionar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FUNNEL PAGES SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🚀</span>
          <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
            Funnel Pages
          </h3>
        </div>
        <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
          Funis de vendas profissionais - copy, design e desenvolvimento inclusos
        </p>

        {/* Funnel mode tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFunnelModo("pacote")}
            className={`px-4 py-2 rounded-lg font-kanit text-sm font-medium transition-all ${
              funnelModo === "pacote"
                ? "bg-blenduca-grafite text-white"
                : "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
            }`}
          >
            Pacotes Sugeridos
          </button>
          <button
            onClick={() => setFunnelModo("custom")}
            className={`px-4 py-2 rounded-lg font-kanit text-sm font-medium transition-all ${
              funnelModo === "custom"
                ? "bg-blenduca-grafite text-white"
                : "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
            }`}
          >
            Montar Customizado
          </button>
        </div>

        {funnelModo === "pacote" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {funnelPagesAvulso.pacotesSugeridos.map((pacote) => {
              const isSelected = selectedFunnelPacote === pacote.id;

              return (
                <div
                  key={pacote.id}
                  className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    isSelected ? "border-blenduca-vermelho shadow-lg" : "border-gray-100 hover:border-blenduca-vermelho/50"
                  }`}
                  onClick={() => handleSelectFunnelPacote(pacote.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-play text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-blenduca-vermelho/10 text-blenduca-vermelho">
                        {pacote.nome}
                      </span>
                      {isSelected && (
                        <span className="text-green-500 text-lg">✓</span>
                      )}
                    </div>

                    <p className="font-kanit text-sm font-medium text-blenduca-grafite mb-2">
                      {pacote.descricao}
                    </p>

                    {pacote.tipos && (
                      <div className="space-y-1 mb-3">
                        {pacote.tipos.map((tipo, i) => (
                          <p key={i} className="font-kanit text-xs text-blenduca-cinza-medio flex items-start gap-1">
                            <span className="text-green-500 mt-0.5">•</span>
                            {tipo}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-3">
                      <p className="font-kanit font-bold text-lg text-blenduca-grafite">
                        {formatCurrency(pacote.preco)}
                        <span className="text-xs font-normal text-blenduca-cinza-medio">/mes</span>
                      </p>
                    </div>

                    <button
                      className={`w-full mt-3 py-2 rounded-lg font-kanit font-semibold text-sm transition-all ${
                        isSelected
                          ? "bg-blenduca-vermelho text-white"
                          : "bg-gray-100 text-blenduca-grafite hover:bg-gray-200"
                      }`}
                    >
                      {isSelected ? "Selecionado ✓" : "Selecionar"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h4 className="font-kanit font-semibold text-lg text-blenduca-grafite mb-4">
              Monte seu pacote personalizado
            </h4>
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Cada funil inclui: Copy + Design + Desenvolvimento + Integracao
            </p>

            <div className="flex items-center gap-4 mb-4">
              <label className="font-kanit text-sm text-blenduca-grafite">
                Quantidade de funis:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFunnelCustomQtd(Math.max(1, funnelCustomQtd - 1))}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-kanit font-bold text-lg">
                  {funnelCustomQtd}
                </span>
                <button
                  onClick={() => setFunnelCustomQtd(Math.min(20, funnelCustomQtd + 1))}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-kanit text-sm text-blenduca-cinza-medio">
                  {funnelCustomQtd} funil{funnelCustomQtd > 1 ? "s" : ""} x {formatCurrency(100)}/mes
                </p>
                <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                  {formatCurrency(funnelCustomQtd * 100)}/mes
                </p>
              </div>
              <button
                onClick={handleSelectFunnelCustom}
                className="px-4 py-2 bg-blenduca-vermelho text-white font-kanit font-semibold rounded-lg hover:bg-blenduca-vermelho-dark transition-colors"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        )}

        {/* Remove funnel button */}
        {selectedFunnel && (
          <button
            onClick={handleRemoveFunnel}
            className="mt-4 px-4 py-2 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-vermelho transition-colors"
          >
            Remover Funnel Pages do carrinho
          </button>
        )}
      </div>

      {/* What's included */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <h4 className="font-kanit font-semibold text-lg text-blenduca-grafite mb-4">
          O que cada funil inclui
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {funnelPagesAvulso.oqueCadaFunilInclui.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-kanit font-medium text-sm text-blenduca-grafite">
                  {item.item}
                </p>
                <p className="font-kanit text-xs text-blenduca-cinza-medio">
                  {item.significado}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {isAddingToProgram && (
          <button
            onClick={handleSkip}
            className="px-6 py-3 font-kanit font-medium text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors"
          >
            Pular esta etapa →
          </button>
        )}

        <button
          onClick={handleContinue}
          disabled={!hasTech && isStandalone}
          className={`px-6 py-3 rounded-lg font-kanit font-semibold transition-all ${
            hasTech || isAddingToProgram
              ? "bg-blenduca-vermelho text-white hover:bg-blenduca-vermelho-dark"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {hasTech ? "Continuar para Agentes A.I →" : "Selecione pelo menos uma tecnologia"}
        </button>
      </div>
    </div>
  );
}
