"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { experienceFlixAvulso, funnelPagesAvulso } from "@/data/tecnologiaAvulsa";
import { getPilaresParaModalidadeENivel, contarEntregaveisParaModalidade } from "@/data/entregaveis";
import { niveis, niveisMap, modalidades } from "@/data/modalidades";
import { formatCurrency } from "@/utils/formatting";
import type { NivelId } from "@/types";

// Significados for Experience Flix plans (from V0.8 spec)
const FLIX_SIGNIFICADOS: Record<NivelId, string> = {
  starter: "Sua propria Netflix de cursos. Plataforma profissional, 100% whitelabel, com sua marca e dominio. Seus alunos acham que voce desenvolveu do zero. Engajamento sobe, cancelamentos caem.",
  professional: "3 plataformas rodando + servico completo de design e postagem. E como ter uma produtora no bolso. Voce cria multiplos produtos (basico, intermediario, avancado) ou segmenta audiencias diferentes.",
  business: "Membros ilimitados + comunidade integrada. Infraestrutura enterprise. Escale sem se preocupar com custos por aluno. Ideal para quem ja tem audiencia grande ou quer crescer sem limites.",
  scale: "Ecossistema completo com app nativo. Seus alunos baixam SEU app nas lojas. Infraestrutura de unicornio. Aulas ao vivo integradas. E o nivel maximo de profissionalismo e tecnologia.",
};

// Significados for Funnel Pages plans (from V0.8 spec)
const FUNNEL_SIGNIFICADOS: Record<string, string> = {
  funnel_starter: "Funil profissional completo. Squad desenvolve tudo: copy persuasivo, design que converte, codigo otimizado. Voce so valida e publica. Economia de dezenas de milhares em agencias.",
  funnel_professional: "3 funis profissionais + automacoes completas. Voce tem funil para cada etapa da jornada: captura (isca), aquecimento (evento) e conversao (sessao/aplicacao). Maquina de conversao montada.",
  funnel_business: "5 funis + nutricao automatizada. Funil completo de conversao em multiplos produtos. Voce pode vender diferentes solucoes ou testar variacoes do mesmo funil. Sequencias de e-mail automaticas nutrem seus leads.",
  funnel_scale: "7 funis + IA de pre-vendas. Maquina de conversao automatizada. Multiplos funis para diferentes publicos, produtos e testes. IA qualifica leads antes de chegarem em voce. Eficiencia maxima.",
};

export default function TecnologiaAvulsa() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setStep = useCartStore((s) => s.setStep);
  const setExperienceFlixAvulso = useCartStore((s) => s.setExperienceFlixAvulso);
  const setFunnelPagesAvulso = useCartStore((s) => s.setFunnelPagesAvulso);

  // Local state for selections
  const [selectedFunnelPacote, setSelectedFunnelPacote] = useState<string | null>(null);
  const [funisExtras, setFunisExtras] = useState(0);
  const [showEntregaveis, setShowEntregaveis] = useState(false);
  const [expandedFlix, setExpandedFlix] = useState<NivelId | null>(null);
  const [expandedFunnel, setExpandedFunnel] = useState<string | null>(null);
  // V0.9: Toggle for showing/hiding resources
  const [showFlixRecursos, setShowFlixRecursos] = useState<Record<string, boolean>>({});
  const [showFunnelRecursos, setShowFunnelRecursos] = useState<Record<string, boolean>>({});

  // Determine context
  const { modalidade, nivel } = carrinho;

  // Current selections
  const selectedFlix = carrinho.tecnologiaAvulsa?.experienceFlix?.plano;
  const selectedFunnel = carrinho.tecnologiaAvulsa?.funnelPages;

  // Get entregaveis for this modalidade and nivel
  const pilaresVisiveis = modalidade && nivel
    ? getPilaresParaModalidadeENivel(modalidade, nivel)
    : [];
  const totalEntregaveis = modalidade && nivel
    ? contarEntregaveisParaModalidade(modalidade, nivel)
    : 0;

  const modalidadeInfo = modalidade ? modalidades[modalidade] : null;
  const nivelInfo = nivel ? niveisMap[nivel] : null;

  // V0.17: Fix standalone technology navigation
  const handleBack = () => {
    // If no modalidade selected (standalone technology), go back to home
    if (!modalidade) {
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
    if (plano) {
      setExpandedFlix(plano);
    }
  };

  const handleSelectFunnelPacote = (pacoteId: string) => {
    const pacote = funnelPagesAvulso.pacotesSugeridos.find((p) => p.id === pacoteId);
    if (pacote) {
      setSelectedFunnelPacote(pacoteId);
      setExpandedFunnel(pacoteId);
      // Calculate total with extras
      const totalFunis = pacote.funis + funisExtras;
      const precoExtras = funisExtras * 100;
      setFunnelPagesAvulso({
        modo: "pacote",
        pacoteId,
        quantidade: totalFunis,
        tipos: pacote.tipos,
        mensal: pacote.preco + precoExtras,
      });
    }
  };

  const handleFunisExtrasChange = (delta: number) => {
    const newValue = Math.max(0, Math.min(20, funisExtras + delta));
    setFunisExtras(newValue);

    // Update funnel pages if a package is selected
    if (selectedFunnelPacote) {
      const pacote = funnelPagesAvulso.pacotesSugeridos.find((p) => p.id === selectedFunnelPacote);
      if (pacote) {
        const totalFunis = pacote.funis + newValue;
        const precoExtras = newValue * 100;
        setFunnelPagesAvulso({
          modo: "pacote",
          pacoteId: selectedFunnelPacote,
          quantidade: totalFunis,
          tipos: pacote.tipos,
          mensal: pacote.preco + precoExtras,
        });
      }
    }
  };

  const handleRemoveFlix = () => {
    setExperienceFlixAvulso(null);
    setExpandedFlix(null);
  };

  const handleRemoveFunnel = () => {
    setFunnelPagesAvulso(null);
    setSelectedFunnelPacote(null);
    setFunisExtras(0);
    setExpandedFunnel(null);
  };

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
        Voltar para niveis
      </button>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          {modalidadeInfo && (
            <span
              className="font-play text-xs font-bold tracking-wider px-3 py-1 rounded text-white"
              style={{ backgroundColor: modalidadeInfo.cor }}
            >
              {modalidadeInfo.nome}
            </span>
          )}
          {nivelInfo && (
            <span
              className="font-play text-xs font-bold tracking-wider px-3 py-1 rounded text-white"
              style={{ backgroundColor: nivelInfo.cor }}
            >
              {nivelInfo.nome}
            </span>
          )}
        </div>
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Personalize seu {modalidadeInfo?.nome}
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Adicione tecnologia para potencializar seu programa de mentoria
        </p>
      </div>

      {/* ENTREGAVEIS TOGGLE BUTTON - V0.10: Hide when 0 entregaveis */}
      {totalEntregaveis > 0 && (
        <button
          onClick={() => setShowEntregaveis(!showEntregaveis)}
          className="w-full mb-6 py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-kanit text-sm text-blenduca-grafite"
        >
          <span>{showEntregaveis ? "▲" : "📋"}</span>
          <span>
            {showEntregaveis
              ? "Fechar entregaveis"
              : `Ver todos os ${totalEntregaveis} entregaveis inclusos`}
          </span>
        </button>
      )}

      {/* ENTREGAVEIS SECTION (filtered by modalidade) */}
      {showEntregaveis && (
        <div className="mb-8 bg-white border border-gray-100 rounded-xl p-5 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📋</span>
            <div>
              <h3 className="font-kanit font-bold text-base text-blenduca-grafite">
                Entregaveis do {modalidadeInfo?.nome} {nivelInfo?.nome}
              </h3>
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                {totalEntregaveis} entregaveis inclusos no seu pacote
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {pilaresVisiveis.map((pilar) => {
              if (pilar.entregaveis.length === 0) return null;

              return (
                <div key={pilar.id} className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{pilar.icone}</span>
                    <h4
                      className="font-kanit font-bold text-sm uppercase tracking-wide"
                      style={{ color: pilar.cor }}
                    >
                      {pilar.nome}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pilar.entregaveis.map((entregavel) => (
                      <div
                        key={entregavel.id}
                        className="bg-gray-50/50 border border-gray-100 rounded-lg p-3"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-base shrink-0">{entregavel.icone}</span>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                              {entregavel.nome}
                            </h5>
                            {nivel && entregavel.detalhesNivel?.[nivel] && (
                              <div className="bg-blue-50/50 rounded p-2">
                                <p className="font-kanit text-[10px] font-bold text-blue-700 uppercase mb-1">
                                  No seu nivel ({nivelInfo?.nome})
                                </p>
                                <p className="font-kanit text-xs text-blenduca-grafite whitespace-pre-line">
                                  {entregavel.detalhesNivel[nivel]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXPERIENCE FLIX SECTION */}
      <div className="mb-10 bg-white border border-gray-100 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎬</span>
          <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
            Experience Flix - Plataforma de Cursos
          </h3>
        </div>
        <p className="font-kanit text-sm text-blenduca-cinza-medio mb-6">
          Sua propria Netflix de cursos - plataforma 100% whitelabel
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {niveis.map((nivelItem) => {
            const flix = experienceFlixAvulso[nivelItem.id];
            const isSelected = selectedFlix === nivelItem.id;

            return (
              <label
                key={nivelItem.id}
                className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  isSelected ? "border-blenduca-azul shadow-lg" : "border-gray-100 hover:border-blenduca-azul/50"
                }`}
              >
                <div className="h-1.5 rounded-t-xl" style={{ backgroundColor: nivelItem.cor }} />
                <div className="p-4">
                  {/* V0.10: Checkbox instead of toggle button */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-play text-[10px] font-bold tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: nivelItem.cor }}
                    >
                      {nivelItem.nome}
                    </span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectFlix(isSelected ? null : nivelItem.id)}
                      className="w-5 h-5 rounded border-gray-300 text-blenduca-azul focus:ring-blenduca-azul cursor-pointer"
                    />
                  </div>

                  <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                    {flix.descricao}
                  </p>

                  {/* V0.9: Limites do plano */}
                  <div className="bg-gray-50 rounded-lg p-2 mb-3 text-[10px]">
                    <div className="flex justify-between font-kanit text-blenduca-cinza-medio">
                      <span>Areas:</span>
                      <span className="font-semibold text-blenduca-grafite">{flix.limites.areas}</span>
                    </div>
                    <div className="flex justify-between font-kanit text-blenduca-cinza-medio">
                      <span>Membros:</span>
                      <span className="font-semibold text-blenduca-grafite">
                        {typeof flix.limites.usuariosAtivos === "number" ? `Até ${flix.limites.usuariosAtivos}` : flix.limites.usuariosAtivos}
                      </span>
                    </div>
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

                  <div
                    className={`w-full mt-3 py-2 rounded-lg font-kanit font-semibold text-sm text-center transition-all ${
                      isSelected
                        ? "bg-blenduca-azul text-white"
                        : "bg-gray-100 text-blenduca-grafite"
                    }`}
                  >
                    {isSelected ? "Selecionado ✓" : "Selecionar"}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Expanded Flix Details - V0.9 */}
        {selectedFlix && experienceFlixAvulso[selectedFlix] && (() => {
          const flixData = experienceFlixAvulso[selectedFlix];
          const showRecursos = showFlixRecursos[selectedFlix] ?? false;
          return (
          <div className="mt-4 bg-gray-50 rounded-lg p-4 animate-fade-in-up">
            <h4 className="font-kanit font-bold text-sm text-blenduca-grafite mb-3">
              {flixData.nome} - Detalhes
            </h4>

            {/* V0.9: Limites do plano */}
            <div className="bg-white rounded-lg p-3 border border-gray-100 mb-4">
              <p className="font-kanit text-[10px] font-bold text-blenduca-cinza-medio uppercase mb-2">
                Limites do Plano
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="font-kanit text-xs text-blenduca-cinza-medio">Areas de Membros</p>
                  <p className="font-kanit font-bold text-lg text-blenduca-grafite">{flixData.limites.areas}</p>
                </div>
                <div className="text-center">
                  <p className="font-kanit text-xs text-blenduca-cinza-medio">Membros Ativos/mes</p>
                  <p className="font-kanit font-bold text-lg text-blenduca-grafite">
                    {typeof flixData.limites.usuariosAtivos === "number" ? `Até ${flixData.limites.usuariosAtivos}` : flixData.limites.usuariosAtivos}
                  </p>
                </div>
              </div>
              {flixData.limites.custoExcedente > 0 && (
                <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-2 text-center">
                  Excedente: R$ {flixData.limites.custoExcedente.toFixed(2)}/membro adicional
                </p>
              )}
            </div>

            {/* V0.9: Diferenciais */}
            {flixData.diferenciais && flixData.diferenciais.length > 0 && (
              <div className="bg-green-50/50 border-l-2 border-green-400 p-3 rounded-r mb-4">
                <p className="font-kanit text-[10px] font-bold text-green-700 uppercase mb-2">
                  Diferenciais deste plano
                </p>
                <ul className="space-y-1">
                  {flixData.diferenciais.map((dif, i) => (
                    <li key={i} className="flex items-start gap-2 font-kanit text-xs text-blenduca-grafite">
                      <span className="text-green-500 mt-0.5">+</span>
                      {dif}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Significado */}
            <div className="bg-amber-50/50 border-l-2 border-amber-400 p-3 rounded-r mb-4">
              <p className="font-kanit text-[10px] font-bold text-amber-700 uppercase mb-1">
                O que isso significa para voce
              </p>
              <p className="font-kanit text-xs text-blenduca-grafite">
                {FLIX_SIGNIFICADOS[selectedFlix]}
              </p>
            </div>

            {/* V0.9: Toggle recursos */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowFlixRecursos({ ...showFlixRecursos, [selectedFlix]: !showRecursos }); }}
              className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-kanit text-xs text-blenduca-grafite mb-4"
            >
              {showRecursos ? "▲ Ocultar recursos" : "▼ Ver recursos"}
            </button>

            {/* Recursos (colapsável) */}
            {showRecursos && (
              <div className="mb-4 animate-fade-in-up">
                <p className="font-kanit text-xs font-bold text-blenduca-grafite mb-2">
                  Recursos inclusos:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {flixData.recursos.map((recurso, i) => (
                    <li key={i} className="flex items-start gap-2 font-kanit text-xs text-blenduca-cinza-medio">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {recurso}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* V0.9: Detalhes adicionais */}
            {flixData.detalhes && (
              <div className="bg-gray-100 rounded-lg p-3 mb-4 text-xs">
                <div className="flex justify-between font-kanit text-blenduca-cinza-medio mb-1">
                  <span>Contrato:</span>
                  <span className="text-blenduca-grafite">{flixData.detalhes.contrato}</span>
                </div>
                <div className="flex justify-between font-kanit text-blenduca-cinza-medio">
                  <span>Ideal para:</span>
                  <span className="text-blenduca-grafite">{flixData.detalhes.idealPara}</span>
                </div>
              </div>
            )}

            {/* V0.10: Upgrade cards for Pacote Completo */}
            {modalidade === "completo" && flixData.upgrades && Object.keys(flixData.upgrades).length > 0 && (
              <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="font-kanit text-[10px] font-bold text-blue-700 uppercase mb-3">
                  Upgrades disponiveis
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(flixData.upgrades).map(([key, upgrade]) => {
                    const nivelUpgrade = niveisMap[upgrade.planoDestino];
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-lg p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                        onClick={() => handleSelectFlix(upgrade.planoDestino)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="font-play text-[9px] font-bold tracking-wider px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: nivelUpgrade?.cor || "#666" }}
                          >
                            {nivelUpgrade?.nome || upgrade.planoDestino}
                          </span>
                          <span className="font-kanit text-xs font-bold text-blue-600">
                            +{formatCurrency(upgrade.custoAdicional)}/mes
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {upgrade.diferenciais.slice(0, 3).map((dif, i) => (
                            <li key={i} className="flex items-start gap-1 font-kanit text-[10px] text-blenduca-cinza-medio">
                              <span className="text-blue-500 mt-0.5">+</span>
                              {dif}
                            </li>
                          ))}
                          {upgrade.diferenciais.length > 3 && (
                            <li className="font-kanit text-[10px] text-blue-500">
                              +{upgrade.diferenciais.length - 3} mais...
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Investimento */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <div>
                {flixData.investimento.entrada && flixData.investimento.entrada > 0 && (
                  <p className="font-kanit text-xs text-blenduca-cinza-medio">
                    Entrada: {formatCurrency(flixData.investimento.entrada)}
                  </p>
                )}
                <p className="font-kanit font-bold text-lg text-blenduca-grafite">
                  {formatCurrency(flixData.investimento.mensal)}/mes
                </p>
              </div>
              <button
                onClick={handleRemoveFlix}
                className="px-3 py-1 text-xs font-kanit text-blenduca-cinza-medio hover:text-blenduca-vermelho transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
          );
        })()}
      </div>

      {/* FUNNEL PAGES SECTION */}
      <div className="mb-10 bg-white border border-gray-100 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📄</span>
          <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
            Funnel Pages - Funis de Vendas
          </h3>
        </div>
        <p className="font-kanit text-sm text-blenduca-cinza-medio mb-6">
          Funis profissionais completos: copy + design + desenvolvimento
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {funnelPagesAvulso.pacotesSugeridos.map((pacote) => {
            const isSelected = selectedFunnelPacote === pacote.id;

            return (
              <label
                key={pacote.id}
                className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  isSelected ? "border-blenduca-vermelho shadow-lg" : "border-gray-100 hover:border-blenduca-vermelho/50"
                }`}
              >
                <div className="p-4">
                  {/* V0.10: Checkbox instead of toggle button */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-play text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-blenduca-vermelho/10 text-blenduca-vermelho">
                      {pacote.nome}
                    </span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          handleRemoveFunnel();
                        } else {
                          handleSelectFunnelPacote(pacote.id);
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-blenduca-vermelho focus:ring-blenduca-vermelho cursor-pointer"
                    />
                  </div>

                  <p className="font-kanit text-sm font-medium text-blenduca-grafite mb-2">
                    {pacote.descricao}
                  </p>

                  <p className="font-kanit text-xs text-blenduca-cinza-medio mb-3">
                    {pacote.funis} funis inclusos
                  </p>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="font-kanit font-bold text-lg text-blenduca-grafite">
                      {formatCurrency(pacote.preco)}
                      <span className="text-xs font-normal text-blenduca-cinza-medio">/mes</span>
                    </p>
                  </div>

                  <div
                    className={`w-full mt-3 py-2 rounded-lg font-kanit font-semibold text-sm text-center transition-all ${
                      isSelected
                        ? "bg-blenduca-vermelho text-white"
                        : "bg-gray-100 text-blenduca-grafite"
                    }`}
                  >
                    {isSelected ? "Selecionado ✓" : "Selecionar"}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Expanded Funnel Details - V0.9 */}
        {selectedFunnelPacote && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4 animate-fade-in-up">
            {(() => {
              const pacote = funnelPagesAvulso.pacotesSugeridos.find((p) => p.id === selectedFunnelPacote);
              if (!pacote) return null;
              const showRecursos = showFunnelRecursos[selectedFunnelPacote] ?? false;

              return (
                <>
                  <h4 className="font-kanit font-bold text-sm text-blenduca-grafite mb-1">
                    {pacote.nome} - Detalhes
                  </h4>
                  <p className="font-kanit text-xs text-blenduca-cinza-medio mb-3">
                    {pacote.descricao}
                  </p>

                  {/* V0.9: Limites do plano */}
                  <div className="bg-white rounded-lg p-3 border border-gray-100 mb-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <p className="font-kanit text-xs text-blenduca-cinza-medio">Funis Inclusos</p>
                        <p className="font-kanit font-bold text-lg text-blenduca-vermelho">{pacote.funis}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-kanit text-xs text-blenduca-cinza-medio">Maximo Total</p>
                        <p className="font-kanit font-bold text-lg text-blenduca-grafite">20 funis</p>
                      </div>
                    </div>
                  </div>

                  {/* Significado */}
                  <div className="bg-amber-50/50 border-l-2 border-amber-400 p-3 rounded-r mb-4">
                    <p className="font-kanit text-[10px] font-bold text-amber-700 uppercase mb-1">
                      O que isso significa para voce
                    </p>
                    <p className="font-kanit text-xs text-blenduca-grafite">
                      {pacote.significado || FUNNEL_SIGNIFICADOS[pacote.id]}
                    </p>
                  </div>

                  {/* Tipos de funis */}
                  {pacote.tipos && (
                    <div className="mb-4">
                      <p className="font-kanit text-xs font-bold text-blenduca-grafite mb-2">
                        Tipos de funis inclusos:
                      </p>
                      <ul className="space-y-1">
                        {pacote.tipos.map((tipo, i) => (
                          <li key={i} className="flex items-start gap-2 font-kanit text-xs text-blenduca-cinza-medio">
                            <span className="text-blenduca-vermelho mt-0.5">•</span>
                            {tipo}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* V0.9: Toggle recursos */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowFunnelRecursos({ ...showFunnelRecursos, [selectedFunnelPacote]: !showRecursos }); }}
                    className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-kanit text-xs text-blenduca-grafite mb-4"
                  >
                    {showRecursos ? "▲ Ocultar recursos" : "▼ Ver recursos"}
                  </button>

                  {/* Recursos (colapsável) */}
                  {showRecursos && (
                    <div className="mb-4 animate-fade-in-up">
                      <p className="font-kanit text-xs font-bold text-blenduca-grafite mb-2">
                        O que cada funil inclui:
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {funnelPagesAvulso.oqueCadaFunilInclui.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-kanit text-xs text-blenduca-cinza-medio">
                            <span className="text-green-500 mt-0.5">✓</span>
                            {item.item}
                          </li>
                        ))}
                      </ul>
                      {/* V0.9: Recursos do pacote se disponíveis */}
                      {pacote.recursos && pacote.recursos.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="font-kanit text-xs font-bold text-blenduca-grafite mb-2">
                            Recursos do {pacote.nome}:
                          </p>
                          <ul className="space-y-1">
                            {pacote.recursos.map((recurso, i) => (
                              <li key={i} className="flex items-start gap-2 font-kanit text-xs text-blenduca-cinza-medio">
                                <span className="text-green-500 mt-0.5">✓</span>
                                {recurso}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* V0.10: Upgrade cards for Pacote Completo */}
                  {modalidade === "completo" && pacote.upgrades && Object.keys(pacote.upgrades).length > 0 && (
                    <div className="bg-red-50/50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="font-kanit text-[10px] font-bold text-red-700 uppercase mb-3">
                        Upgrades disponiveis
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Object.entries(pacote.upgrades).map(([key, upgrade]) => {
                          const upgradePacote = funnelPagesAvulso.pacotesSugeridos.find((p) => p.id === upgrade.planoDestino);
                          return (
                            <div
                              key={key}
                              className="bg-white rounded-lg p-3 border border-red-100 hover:border-red-300 transition-all cursor-pointer"
                              onClick={() => {
                                if (upgradePacote) {
                                  handleSelectFunnelPacote(upgradePacote.id);
                                }
                              }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-play text-[9px] font-bold tracking-wider px-2 py-0.5 rounded bg-blenduca-vermelho/10 text-blenduca-vermelho">
                                  {upgradePacote?.nome || key}
                                </span>
                                <span className="font-kanit text-xs font-bold text-red-600">
                                  +{formatCurrency(upgrade.custoAdicional)}/mes
                                </span>
                              </div>
                              <ul className="space-y-1">
                                {upgrade.diferenciais.slice(0, 3).map((dif, i) => (
                                  <li key={i} className="flex items-start gap-1 font-kanit text-[10px] text-blenduca-cinza-medio">
                                    <span className="text-red-500 mt-0.5">+</span>
                                    {dif}
                                  </li>
                                ))}
                                {upgrade.diferenciais.length > 3 && (
                                  <li className="font-kanit text-[10px] text-red-500">
                                    +{upgrade.diferenciais.length - 3} mais...
                                  </li>
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Funis Extras - V0.8 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">➕</span>
                      <h5 className="font-kanit font-semibold text-sm text-blenduca-grafite">
                        Adicionar funis extras
                      </h5>
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                      <label className="font-kanit text-sm text-blenduca-grafite">
                        Funis adicionais:
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleFunisExtrasChange(-1); }}
                          disabled={funisExtras <= 0}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-kanit font-bold text-lg">
                          {funisExtras}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleFunisExtrasChange(1); }}
                          disabled={(pacote.funis + funisExtras) >= 20}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="font-kanit text-xs text-blenduca-cinza-medio mb-3">
                      R$ 100/mes por funil adicional
                    </p>

                    {funisExtras > 0 && (
                      <div className="bg-amber-50/50 rounded-lg p-3">
                        <div className="flex justify-between font-kanit text-xs mb-1">
                          <span className="text-blenduca-cinza-medio">Pacote {pacote.nome}:</span>
                          <span className="text-blenduca-grafite">{pacote.funis} funis</span>
                        </div>
                        <div className="flex justify-between font-kanit text-xs mb-1">
                          <span className="text-blenduca-cinza-medio">Funis extras:</span>
                          <span className="text-blenduca-grafite">+{funisExtras} funis (+{formatCurrency(funisExtras * 100)}/mes)</span>
                        </div>
                        <div className="flex justify-between font-kanit text-sm font-semibold border-t border-amber-200 pt-2 mt-2">
                          <span className="text-blenduca-grafite">Total de funis:</span>
                          <span className="text-blenduca-vermelho">{pacote.funis + funisExtras} funis</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Investimento */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <div>
                      <p className="font-kanit text-xs text-blenduca-cinza-medio">
                        {pacote.funis} funis base + {funisExtras} extras
                      </p>
                      <p className="font-kanit font-bold text-lg text-blenduca-grafite">
                        {formatCurrency(pacote.preco + (funisExtras * 100))}/mes
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFunnel}
                      className="px-3 py-1 text-xs font-kanit text-blenduca-cinza-medio hover:text-blenduca-vermelho transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleSkip}
          className="px-6 py-3 font-kanit font-medium text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors"
        >
          Pular esta etapa →
        </button>

        <button
          onClick={handleContinue}
          className="px-6 py-3 rounded-lg font-kanit font-semibold bg-blenduca-vermelho text-white hover:bg-blenduca-vermelho-dark transition-all"
        >
          Continuar para Agentes A.I →
        </button>
      </div>
    </div>
  );
}
