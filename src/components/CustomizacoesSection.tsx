"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { niveisMap } from "@/data/modalidades";
import { tecnologiaInclusa, upgradeExperienceFlixOpcoes, funisAdicionaisConfig } from "@/data/tecnologiaInclusa";
import { getPilaresParaModalidadeENivel, contarEntregaveisParaModalidade } from "@/data/entregaveis";
import { SERVICOS_EXTRAS } from "@/data/servicosExtras";
import { formatCurrency } from "@/utils/formatting";
import type { NivelId, CoProdutorConfig } from "@/types";

export default function CustomizacoesSection() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setUpgradeExperienceFlix = useCartStore((s) => s.setUpgradeExperienceFlix);
  const setFunisExtras = useCartStore((s) => s.setFunisExtras);
  const setCoprodutor = useCartStore((s) => s.setCoprodutor);
  const setExpertPlanning = useCartStore((s) => s.setExpertPlanning);
  const setSessaoMentoriaQtd = useCartStore((s) => s.setSessaoMentoriaQtd);
  const setStep = useCartStore((s) => s.setStep);

  const { modalidade, nivel, upgradeExperienceFlix, funisExtras, coprodutor, servicosExtras } = carrinho;

  // Track if entregaveis section is expanded
  const [entregaveisExpanded, setEntregaveisExpanded] = useState(false);

  // Only show for Pacote Completo modalidade
  if (modalidade !== "completo" || !nivel) {
    return null;
  }

  const nivelInfo = niveisMap[nivel];
  const tech = tecnologiaInclusa[nivel];

  // Find available upgrade
  const upgradeOpcao = upgradeExperienceFlixOpcoes.find((u) => u.de === nivel);
  const proximoNivel = upgradeOpcao?.para;
  const proximoNivelInfo = proximoNivel ? niveisMap[proximoNivel] : null;

  // Co-produtor is only available for Business and Scale
  const coprodutorDisponivel = nivel === "business" || nivel === "scale";
  const totalEntregaveis = contarEntregaveisParaModalidade(modalidade, nivel);
  const pilaresVisiveis = getPilaresParaModalidadeENivel(modalidade, nivel);

  const handleBack = () => {
    setStep("nivel");
  };

  const handleContinue = () => {
    setStep("agentes");
  };

  const handleUpgradeToggle = () => {
    if (upgradeExperienceFlix) {
      setUpgradeExperienceFlix(null);
    } else if (proximoNivel) {
      setUpgradeExperienceFlix(proximoNivel);
    }
  };

  const handleCoprodutorToggle = () => {
    if (coprodutor?.ativo) {
      setCoprodutor(null);
    } else {
      setCoprodutor({
        ativo: true,
        nome: "",
        email: "",
        percentualComissao: 10,
        observacoes: "",
      });
    }
  };

  const handleCoprodutorChange = (field: keyof CoProdutorConfig, value: string | number | boolean) => {
    if (!coprodutor) return;
    setCoprodutor({
      ...coprodutor,
      [field]: value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
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
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Personalize seu pacote
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Adicione upgrades e recursos extras ao seu pacote {nivelInfo.nome}
        </p>
      </div>

      {/* Current technology */}
      <div className="bg-green-50/50 border border-green-100 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💻</span>
          <div>
            <h3 className="font-kanit font-bold text-base text-blenduca-grafite">
              Tecnologia Inclusa no seu Pacote
            </h3>
            <p className="font-kanit text-xs text-blenduca-cinza-medio">
              Tudo isso ja esta incluso no Pacote Completo {nivelInfo.nome}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Experience Flix */}
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🎬</span>
              <div>
                <p className="font-kanit font-semibold text-sm text-blenduca-grafite">
                  Experience Flix
                </p>
                <span className="font-play text-[9px] font-bold tracking-wider text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: nivelInfo.cor }}>
                  {tech.experienceFlix.plano}
                </span>
              </div>
            </div>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
              {tech.experienceFlix.descricao}
            </p>
            <p className="font-kanit text-xs text-green-600">
              Valor avulso: {formatCurrency(tech.experienceFlix.valorAvulso.mensal)}/mes
            </p>
          </div>

          {/* Funnel Pages */}
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📄</span>
              <div>
                <p className="font-kanit font-semibold text-sm text-blenduca-grafite">
                  Funnel Pages
                </p>
                <span className="font-play text-[9px] font-bold tracking-wider text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: nivelInfo.cor }}>
                  {tech.funnelPages.plano}
                </span>
              </div>
            </div>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
              {tech.funnelPages.descricao}
            </p>
            <p className="font-kanit text-xs text-green-600">
              Valor avulso: {formatCurrency(tech.funnelPages.valorAvulso.mensal)}/mes
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-green-100 flex justify-between items-center">
          <span className="font-kanit text-sm text-blenduca-grafite">
            Total em Tecnologia Inclusa:
          </span>
          <span className="font-kanit font-bold text-lg text-green-600">
            {formatCurrency(tech.totalTecnologia.mensal)}/mes
          </span>
        </div>
      </div>

      {/* Entregaveis Expansion Button */}
      <button
        onClick={() => setEntregaveisExpanded(!entregaveisExpanded)}
        className="w-full mb-6 py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-kanit text-sm text-blenduca-grafite"
      >
        <span>{entregaveisExpanded ? "▲" : "📋"}</span>
        <span>
          {entregaveisExpanded
            ? "Fechar entregaveis"
            : `Ver todos os ${totalEntregaveis} entregaveis inclusos no ${nivelInfo.nome}`}
        </span>
      </button>

      {/* Expanded Entregaveis */}
      {entregaveisExpanded && (
        <div className="mb-6 bg-white border border-gray-100 rounded-xl p-5 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📋</span>
            <div>
              <h3 className="font-kanit font-bold text-base text-blenduca-grafite">
                Entregaveis do Pacote {nivelInfo.nome}
              </h3>
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                {totalEntregaveis} entregaveis inclusos no seu nivel
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {pilaresVisiveis.map((pilar) => {
              // pilaresVisiveis already has filtered entregaveis by modalidade and nivel
              if (pilar.entregaveis.length === 0) return null;

              return (
                <div key={pilar.id} className="border-t border-gray-100 pt-4">
                  {/* Pilar Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{pilar.icone}</span>
                    <h4
                      className="font-kanit font-bold text-sm uppercase tracking-wide"
                      style={{ color: pilar.cor }}
                    >
                      {pilar.nome}
                    </h4>
                  </div>

                  {/* Entregaveis - without significado */}
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

                            {/* Detalhes do nivel - only this, no significado */}
                            {entregavel.detalhesNivel?.[nivel] && (
                              <div className="bg-blue-50/50 rounded p-2">
                                <p className="font-kanit text-[10px] font-bold text-blue-700 uppercase mb-1">
                                  No seu nivel ({nivelInfo.nome})
                                </p>
                                <p className="font-kanit text-xs text-blenduca-grafite whitespace-pre-line">
                                  {entregavel.detalhesNivel[nivel]}
                                </p>
                              </div>
                            )}

                            {/* Frequencia */}
                            {entregavel.frequencia && !entregavel.detalhesNivel?.[nivel] && (
                              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                                {entregavel.frequencia}
                              </p>
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

      {/* Upgrade Experience Flix */}
      {upgradeOpcao && proximoNivelInfo && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-kanit font-bold text-base text-blenduca-grafite">
                Upgrade Experience Flix
              </h3>
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                Aumente a capacidade da sua plataforma
              </p>
            </div>
          </div>

          <label className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            upgradeExperienceFlix
              ? "border-blenduca-vermelho bg-blenduca-vermelho/5"
              : "border-gray-100 hover:border-gray-200"
          }`}>
            <input
              type="checkbox"
              checked={!!upgradeExperienceFlix}
              onChange={handleUpgradeToggle}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-blenduca-vermelho focus:ring-blenduca-vermelho"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                  Upgrade para {proximoNivelInfo.nome}
                </span>
                <span className="font-play text-[9px] font-bold tracking-wider text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: proximoNivelInfo.cor }}>
                  {proximoNivelInfo.nome}
                </span>
              </div>
              <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                {upgradeOpcao.descricao}
              </p>
              <p className="font-kanit font-semibold text-sm text-blenduca-vermelho">
                +{formatCurrency(upgradeOpcao.diferencaMensal)}/mes
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Funis Adicionais */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📄</span>
          <div>
            <h3 className="font-kanit font-bold text-base text-blenduca-grafite">
              {funisAdicionaisConfig.nome}
            </h3>
            <p className="font-kanit text-xs text-blenduca-cinza-medio">
              Seu pacote inclui {tech.funnelPages.quantidade.funis} funis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <label className="font-kanit text-sm text-blenduca-grafite">
            Adicionar funis extras:
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFunisExtras(funisExtras - 1)}
              disabled={funisExtras <= 0}
              className="w-8 h-8 rounded-lg bg-gray-100 text-blenduca-grafite font-bold flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={funisExtras}
              onChange={(e) => setFunisExtras(parseInt(e.target.value) || 0)}
              min={0}
              max={20}
              className="w-16 h-8 text-center border border-gray-200 rounded-lg font-kanit font-medium text-blenduca-grafite"
            />
            <button
              onClick={() => setFunisExtras(funisExtras + 1)}
              disabled={funisExtras >= 20}
              className="w-8 h-8 rounded-lg bg-gray-100 text-blenduca-grafite font-bold flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
          {formatCurrency(funisAdicionaisConfig.precoPorFunil)}/mes por funil adicional
        </p>

        {funisExtras > 0 && (
          <div className="bg-amber-50/50 rounded-lg p-3 mt-3">
            <p className="font-kanit text-sm text-blenduca-grafite">
              {funisExtras} funis x {formatCurrency(funisAdicionaisConfig.precoPorFunil)} ={" "}
              <strong className="text-blenduca-vermelho">
                {formatCurrency(funisExtras * funisAdicionaisConfig.precoPorFunil)}/mes
              </strong>
            </p>
          </div>
        )}

        <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-3">
          {funisAdicionaisConfig.observacao}
        </p>
      </div>

      {/* Co-produtor Section (Business/Scale only) */}
      {coprodutorDisponivel && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🤝</span>
            <div>
              <h3 className="font-kanit font-bold text-base text-blenduca-grafite">
                Co-produtor
              </h3>
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                Adicione um co-produtor ao projeto (disponivel para {nivel === "business" ? "Business" : "Scale"})
              </p>
            </div>
          </div>

          <label className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            coprodutor?.ativo
              ? "border-blenduca-vermelho bg-blenduca-vermelho/5"
              : "border-gray-100 hover:border-gray-200"
          }`}>
            <input
              type="checkbox"
              checked={coprodutor?.ativo ?? false}
              onChange={handleCoprodutorToggle}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-blenduca-vermelho focus:ring-blenduca-vermelho"
            />
            <div className="flex-1">
              <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                Ativar co-produtor
              </span>
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                Inclua um parceiro de negocio com percentual de comissao
              </p>
            </div>
          </label>

          {/* Co-produtor Form */}
          {coprodutor?.ativo && (
            <div className="mt-4 space-y-4 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-1">
                    Nome do Co-produtor *
                  </label>
                  <input
                    type="text"
                    value={coprodutor.nome}
                    onChange={(e) => handleCoprodutorChange("nome", e.target.value)}
                    placeholder="Nome completo"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/20 focus:border-blenduca-vermelho"
                  />
                </div>
                <div>
                  <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-1">
                    Email do Co-produtor
                  </label>
                  <input
                    type="email"
                    value={coprodutor.email}
                    onChange={(e) => handleCoprodutorChange("email", e.target.value)}
                    placeholder="email@exemplo.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/20 focus:border-blenduca-vermelho"
                  />
                </div>
              </div>

              <div>
                <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-1">
                  Percentual de Comissao: {coprodutor.percentualComissao}%
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={coprodutor.percentualComissao}
                  onChange={(e) => handleCoprodutorChange("percentualComissao", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blenduca-vermelho"
                />
                <div className="flex justify-between font-kanit text-[10px] text-blenduca-cinza-medio mt-1">
                  <span>1%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-1">
                  Observacoes
                </label>
                <textarea
                  value={coprodutor.observacoes}
                  onChange={(e) => handleCoprodutorChange("observacoes", e.target.value)}
                  placeholder="Observacoes sobre a parceria..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/20 focus:border-blenduca-vermelho resize-none"
                />
              </div>

              {coprodutor.nome === "" && (
                <p className="font-kanit text-xs text-amber-600">
                  * O nome do co-produtor e obrigatorio
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Servicos Extras V0.18 */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✨</span>
          <div>
            <h3 className="font-kanit font-bold text-base text-blenduca-grafite">
              Servicos Extras
            </h3>
            <p className="font-kanit text-xs text-blenduca-cinza-medio">
              Adicione servicos complementares a sua proposta
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Expert Planning */}
          <label className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            servicosExtras.expertPlanning
              ? "border-blenduca-vermelho bg-blenduca-vermelho/5"
              : "border-gray-100 hover:border-gray-200"
          }`}>
            <input
              type="checkbox"
              checked={servicosExtras.expertPlanning}
              onChange={(e) => setExpertPlanning(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-blenduca-vermelho focus:ring-blenduca-vermelho"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">📋</span>
                <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                  {SERVICOS_EXTRAS.expertPlanning.nome}
                </span>
                <span className="px-2 py-0.5 bg-blenduca-vermelho/10 text-blenduca-vermelho text-[10px] font-play font-bold tracking-wider rounded-full uppercase">
                  {SERVICOS_EXTRAS.expertPlanning.categoria}
                </span>
              </div>
              <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                {SERVICOS_EXTRAS.expertPlanning.descricao}
              </p>
              <p className="font-kanit font-semibold text-sm text-blenduca-vermelho">
                {formatCurrency(SERVICOS_EXTRAS.expertPlanning.precos[nivel])}
                <span className="font-normal text-blenduca-cinza-medio text-xs ml-1">(unico)</span>
              </p>
            </div>
          </label>

          {/* Sessao de Mentoria */}
          <div className={`p-4 rounded-lg border-2 transition-all ${
            servicosExtras.sessaoMentoriaQtd > 0
              ? "border-blenduca-vermelho bg-blenduca-vermelho/5"
              : "border-gray-100"
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 mt-1 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🎯</span>
                  <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                    {SERVICOS_EXTRAS.sessaoMentoria.nome}
                  </span>
                  <span className="px-2 py-0.5 bg-blenduca-vermelho/10 text-blenduca-vermelho text-[10px] font-play font-bold tracking-wider rounded-full uppercase">
                    {SERVICOS_EXTRAS.sessaoMentoria.categoria}
                  </span>
                </div>
                <p className="font-kanit text-xs text-blenduca-cinza-medio mb-3">
                  {SERVICOS_EXTRAS.sessaoMentoria.descricao}
                </p>
                <div className="flex items-center gap-4">
                  <p className="font-kanit font-semibold text-sm text-blenduca-vermelho">
                    {formatCurrency(SERVICOS_EXTRAS.sessaoMentoria.precos[nivel])}
                    <span className="font-normal text-blenduca-cinza-medio text-xs ml-1">/ sessao</span>
                  </p>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="font-kanit text-xs text-blenduca-cinza-medio">Qtd:</span>
                    <button
                      onClick={() => setSessaoMentoriaQtd(servicosExtras.sessaoMentoriaQtd - 1)}
                      disabled={servicosExtras.sessaoMentoriaQtd === 0}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-kanit font-bold text-blenduca-grafite text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-kanit font-bold text-blenduca-grafite">
                      {servicosExtras.sessaoMentoriaQtd}
                    </span>
                    <button
                      onClick={() => setSessaoMentoriaQtd(servicosExtras.sessaoMentoriaQtd + 1)}
                      disabled={servicosExtras.sessaoMentoriaQtd >= 20}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-kanit font-bold text-blenduca-grafite text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                {servicosExtras.sessaoMentoriaQtd > 0 && (
                  <p className="font-kanit text-xs text-blenduca-grafite mt-2">
                    {servicosExtras.sessaoMentoriaQtd}x {formatCurrency(SERVICOS_EXTRAS.sessaoMentoria.precos[nivel])} ={" "}
                    <strong className="text-blenduca-vermelho">
                      {formatCurrency(SERVICOS_EXTRAS.sessaoMentoria.precos[nivel] * servicosExtras.sessaoMentoriaQtd)}
                    </strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 py-3 rounded-lg border border-gray-200 bg-white font-kanit font-semibold text-sm text-blenduca-cinza-medio hover:bg-gray-50 transition-all"
        >
          Voltar
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 py-3 rounded-lg bg-blenduca-vermelho text-white font-kanit font-semibold text-sm hover:bg-blenduca-vermelho-dark shadow-lg shadow-blenduca-vermelho/20 transition-all"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
