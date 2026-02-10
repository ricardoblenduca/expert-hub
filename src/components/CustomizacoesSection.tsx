"use client";

import { useCartStore } from "@/store/useCartStore";
import { niveisMap } from "@/data/modalidades";
import { tecnologiaInclusa, upgradeExperienceFlixOpcoes, funisAdicionaisConfig } from "@/data/tecnologiaInclusa";
import { formatCurrency } from "@/utils/formatting";
import type { NivelId } from "@/types";

export default function CustomizacoesSection() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setUpgradeExperienceFlix = useCartStore((s) => s.setUpgradeExperienceFlix);
  const setFunisExtras = useCartStore((s) => s.setFunisExtras);
  const setStep = useCartStore((s) => s.setStep);

  const { modalidade, nivel, upgradeExperienceFlix, funisExtras } = carrinho;

  // Only show for EXPERT modalidade
  if (modalidade !== "expert" || !nivel) {
    return null;
  }

  const nivelInfo = niveisMap[nivel];
  const tech = tecnologiaInclusa[nivel];

  // Find available upgrade
  const upgradeOpcao = upgradeExperienceFlixOpcoes.find((u) => u.de === nivel);
  const proximoNivel = upgradeOpcao?.para;
  const proximoNivelInfo = proximoNivel ? niveisMap[proximoNivel] : null;

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
              Tudo isso ja esta incluso no EXPERT {nivelInfo.nome}
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
          💡 {funisAdicionaisConfig.observacao}
        </p>
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
