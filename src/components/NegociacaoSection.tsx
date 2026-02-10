"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/formatting";
import type { CoProdutorConfig } from "@/types";

export default function NegociacaoSection() {
  const carrinho = useCartStore((s) => s.carrinho);
  const setStep = useCartStore((s) => s.setStep);
  const setCoprodutor = useCartStore((s) => s.setCoprodutor);
  const setDescontoAtivo = useCartStore((s) => s.setDescontoAtivo);
  const setDescontoTipo = useCartStore((s) => s.setDescontoTipo);
  const setDescontoValor = useCartStore((s) => s.setDescontoValor);
  const setDescontoMotivo = useCartStore((s) => s.setDescontoMotivo);
  const calcularResumo = useCartStore((s) => s.calcularResumo);

  const { nivel, coprodutor, desconto } = carrinho;
  const resumo = calcularResumo();

  // Co-produtor is only available for Business and Scale
  const coprodutorDisponivel = nivel === "business" || nivel === "scale";

  const handleBack = () => {
    setStep("agentes");
  };

  const handleContinue = () => {
    setStep("cliente");
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
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para Agentes
      </button>

      <div className="text-center mb-8">
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Negociacao
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Configure descontos e parcerias para esta proposta
        </p>
      </div>

      {/* DESCONTO SECTION */}
      <div className="mb-10 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-2 border-amber-300 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💰</span>
          <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
            Desconto
          </h3>
        </div>
        <p className="font-kanit text-sm text-blenduca-cinza-medio mb-6">
          Aplicar desconto comercial no valor total
        </p>

        {/* Toggle para ativar desconto */}
        <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all mb-6 ${
          desconto.ativo
            ? "border-green-500 bg-green-50/50"
            : "border-gray-200 hover:border-gray-300 bg-white"
        }`}>
          <input
            type="checkbox"
            checked={desconto.ativo}
            onChange={(e) => setDescontoAtivo(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer"
          />
          <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
            Aplicar desconto nesta proposta
          </span>
        </label>

        {/* Formulario de desconto (se ativo) */}
        {desconto.ativo && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Tipo de desconto */}
            <div>
              <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-3">
                Tipo de desconto
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  desconto.tipo === "percentual"
                    ? "border-blenduca-vermelho bg-blenduca-vermelho/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}>
                  <input
                    type="radio"
                    checked={desconto.tipo === "percentual"}
                    onChange={() => setDescontoTipo("percentual")}
                    className="w-4 h-4 text-blenduca-vermelho focus:ring-blenduca-vermelho cursor-pointer"
                  />
                  <div>
                    <span className="text-lg mr-2">📊</span>
                    <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                      Percentual (%)
                    </span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  desconto.tipo === "valor"
                    ? "border-blenduca-vermelho bg-blenduca-vermelho/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}>
                  <input
                    type="radio"
                    checked={desconto.tipo === "valor"}
                    onChange={() => setDescontoTipo("valor")}
                    className="w-4 h-4 text-blenduca-vermelho focus:ring-blenduca-vermelho cursor-pointer"
                  />
                  <div>
                    <span className="text-lg mr-2">💵</span>
                    <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                      Valor fixo (R$)
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Valor do desconto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-2">
                  {desconto.tipo === "percentual" ? "Percentual de desconto" : "Valor de desconto"}
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-blenduca-vermelho">
                  {desconto.tipo === "valor" && (
                    <span className="px-4 py-3 bg-gray-100 font-kanit font-semibold text-blenduca-cinza-medio border-r border-gray-200">
                      R$
                    </span>
                  )}
                  <input
                    type="number"
                    value={desconto.valor || ""}
                    onChange={(e) => setDescontoValor(parseFloat(e.target.value) || 0)}
                    min={0}
                    max={desconto.tipo === "percentual" ? 100 : resumo.subtotalMensal}
                    step={desconto.tipo === "percentual" ? 1 : 0.01}
                    placeholder={desconto.tipo === "percentual" ? "Ex: 10" : "Ex: 500.00"}
                    className="flex-1 px-4 py-3 font-kanit text-sm text-blenduca-grafite focus:outline-none"
                  />
                  {desconto.tipo === "percentual" && (
                    <span className="px-4 py-3 bg-gray-100 font-kanit font-semibold text-blenduca-cinza-medio border-l border-gray-200">
                      %
                    </span>
                  )}
                </div>
                <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-1">
                  {desconto.tipo === "percentual"
                    ? "Digite um valor entre 0% e 100%"
                    : `Digite um valor ate ${formatCurrency(resumo.subtotalMensal)}`}
                </p>
              </div>

              {/* Preview do desconto */}
              <div>
                <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-2">
                  Valor do desconto
                </label>
                <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <span className="font-kanit text-xs text-blenduca-cinza-medio">Desconto:</span>
                  <span className="font-kanit font-bold text-lg text-green-600">
                    - {formatCurrency(resumo.valorDesconto)}
                  </span>
                </div>
                {desconto.tipo === "percentual" && desconto.valor > 0 && (
                  <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-1">
                    {desconto.valor}% de {formatCurrency(resumo.subtotalMensal)}
                  </p>
                )}
              </div>
            </div>

            {/* Motivo do desconto (opcional) */}
            <div>
              <label className="block font-kanit text-xs text-blenduca-cinza-medio mb-2">
                Motivo do desconto (opcional)
              </label>
              <input
                type="text"
                value={desconto.motivo}
                onChange={(e) => setDescontoMotivo(e.target.value)}
                placeholder="Ex: Desconto de lancamento, Parceria estrategica, etc."
                maxLength={100}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-kanit text-sm text-blenduca-grafite focus:outline-none focus:border-blenduca-vermelho"
              />
              <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-1">
                Este motivo aparecera na proposta comercial
              </p>
            </div>

            {/* Resumo visual do desconto */}
            <div className="bg-white rounded-lg p-5 border-2 border-blenduca-vermelho">
              <div className="space-y-3">
                <div className="flex justify-between font-kanit text-sm">
                  <span className="text-blenduca-cinza-medio">Subtotal (sem desconto):</span>
                  <span className="text-blenduca-grafite">{formatCurrency(resumo.subtotalMensal)}</span>
                </div>

                <div className="flex justify-between font-kanit text-sm text-green-600 font-semibold">
                  <span>
                    Desconto {desconto.tipo === "percentual" ? `(${desconto.valor}%)` : ""}:
                  </span>
                  <span>- {formatCurrency(resumo.valorDesconto)}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t-2 border-blenduca-vermelho">
                  <span className="font-kanit font-semibold text-blenduca-grafite">Total com desconto:</span>
                  <span className="font-kanit font-bold text-2xl text-blenduca-vermelho">
                    {formatCurrency(resumo.totalMensal)}
                  </span>
                </div>
              </div>

              {/* Badge de economia */}
              {resumo.valorDesconto > 0 && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
                  <span className="text-lg">🎉</span>
                  <span className="font-kanit text-sm">
                    Economia de{" "}
                    <strong>
                      {desconto.tipo === "percentual"
                        ? `${desconto.valor}%`
                        : formatCurrency(resumo.valorDesconto)}
                    </strong>
                    {" "}({formatCurrency(resumo.economiaAnualDesconto)}/ano)
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CO-PRODUTOR SECTION (Business/Scale only) */}
      {coprodutorDisponivel && (
        <div className="mb-10 bg-white border border-gray-100 rounded-xl p-6">
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
                Inclua um parceiro de negocio na proposta
              </p>
            </div>
          </label>

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

              {/* V0.12: Info about co-produtor in proposal */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-kanit text-xs text-blue-700">
                  <strong>Nota:</strong> O co-produtor sera mencionado na proposta comercial. Os valores de comissao e detalhes da parceria serao tratados separadamente.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
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
          Continuar para Dados do Cliente →
        </button>
      </div>
    </div>
  );
}
