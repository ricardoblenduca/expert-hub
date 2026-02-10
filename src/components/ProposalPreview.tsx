"use client";

import { useState, useCallback } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency, formatDate, generateId } from "@/utils/formatting";
import { modalidades, niveisMap } from "@/data/modalidades";
import { tecnologiaInclusa, upgradeExperienceFlixOpcoes, funisAdicionaisConfig } from "@/data/tecnologiaInclusa";
import { getPilaresParaModalidadeENivel } from "@/data/entregaveis";
import type { Proposta, NivelId } from "@/types";

export default function ProposalPreview() {
  const carrinho = useCartStore((s) => s.carrinho);
  const dadosCliente = useCartStore((s) => s.dadosCliente);
  const consultor = useCartStore((s) => s.consultor);
  const calcularResumo = useCartStore((s) => s.calcularResumo);
  const setStep = useCartStore((s) => s.setStep);
  const addToast = useCartStore((s) => s.addToast);
  const [generating, setGenerating] = useState(false);

  const resumo = calcularResumo();
  const { modalidade, nivel, upgradeExperienceFlix, funisExtras, centralInteligencia, agentes, coprodutor, desconto } = carrinho;

  const modalidadeData = modalidade ? modalidades[modalidade] : null;
  const nivelData = nivel ? niveisMap[nivel] : null;
  const techData = nivel && modalidade === "completo" ? tecnologiaInclusa[nivel] : null;

  const hoje = new Date();
  const validade = new Date(hoje);
  validade.setDate(validade.getDate() + 15);

  const proposta: Proposta = {
    id: generateId(),
    data: hoje,
    validade,
    cliente: dadosCliente,
    carrinho,
    resumo,
    consultor,
  };

  const handleDownloadPDF = useCallback(async () => {
    setGenerating(true);
    try {
      const { generateProposalPDF } = await import("@/utils/pdfGenerator");
      await generateProposalPDF(proposta);
      addToast("PDF gerado com sucesso!", "success");

      // Save to history
      const historico = JSON.parse(
        localStorage.getItem("propostas_historico") || "[]"
      );
      historico.push({
        id: proposta.id,
        clienteNome: proposta.cliente.nome,
        data: proposta.data.toISOString(),
        total: proposta.resumo.totalMensal,
        status: "enviada",
      });
      localStorage.setItem("propostas_historico", JSON.stringify(historico));
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      addToast("Erro ao gerar PDF. Tente novamente.", "error");
    } finally {
      setGenerating(false);
    }
  }, [proposta, addToast]);

  // Get upgrade description if exists
  const upgradeFlixInfo = upgradeExperienceFlix && nivel
    ? upgradeExperienceFlixOpcoes.find((u) => u.de === nivel && u.para === upgradeExperienceFlix)
    : null;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => setStep("cliente")}
          className="flex items-center gap-1.5 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar aos dados do cliente
        </button>
      </div>

      {/* PDF-like preview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Document header */}
        <div className="bg-blenduca-grafite text-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blenduca-vermelho rounded-lg flex items-center justify-center font-kanit font-bold text-xl">
                B
              </div>
              <div>
                <h1 className="font-kanit font-bold text-xl">BLENDUCA</h1>
                <p className="font-play text-[10px] tracking-widest text-gray-400 uppercase">
                  Experts em Negocios de Conhecimento
                </p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="font-kanit font-bold text-lg">
                PROPOSTA COMERCIAL
              </h2>
              <p className="font-kanit text-sm text-gray-400">
                Data: {formatDate(hoje)}
              </p>
              <p className="font-kanit text-sm text-gray-400">
                Validade: {formatDate(validade)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Client data */}
          <section>
            <SectionTitle>Dados do Cliente</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoLine label="Nome" value={dadosCliente.nome} />
              {dadosCliente.empresa && (
                <InfoLine label="Empresa" value={dadosCliente.empresa} />
              )}
              <InfoLine label="Email" value={dadosCliente.email} />
              <InfoLine label="Telefone" value={dadosCliente.telefone} />
              {dadosCliente.faturamentoAtual && (
                <InfoLine label="Faturamento Atual" value={dadosCliente.faturamentoAtual} />
              )}
              <InfoLine label="Consultor" value={consultor} />
            </div>
          </section>

          {/* Context and objectives */}
          <section>
            <SectionTitle>Contexto e Objetivos</SectionTitle>
            <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
              Apos nossa sessao estrategica realizada em{" "}
              <strong className="text-blenduca-grafite">
                {dadosCliente.dataReuniao
                  ? formatDate(new Date(dadosCliente.dataReuniao + "T12:00:00"))
                  : "---"}
              </strong>
              , identificamos as seguintes necessidades:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-2">
                  Objetivos Principais:
                </h4>
                <ul className="space-y-1">
                  {dadosCliente.objetivosPrincipais
                    .filter((obj) => obj.trim() !== "")
                    .map((obj, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm font-kanit text-blenduca-cinza-medio"
                      >
                        <span className="w-1.5 h-1.5 bg-blenduca-vermelho rounded-full shrink-0" />
                        {obj}
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                  Desafios Atuais:
                </h4>
                <p className="font-kanit text-sm text-blenduca-cinza-medio whitespace-pre-wrap">
                  {dadosCliente.desafiosAtuais}
                </p>
              </div>

              <div>
                <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                  Resultado Esperado:
                </h4>
                <p className="font-kanit text-sm text-blenduca-cinza-medio whitespace-pre-wrap">
                  {dadosCliente.resultadoEsperado}
                </p>
              </div>
            </div>
          </section>

          {/* Proposed solution */}
          <section>
            <SectionTitle>Solucao Proposta</SectionTitle>

            {/* Package - Modalidade + Nivel */}
            {modalidadeData && nivelData && (
              <div className="mb-6 bg-blenduca-cinza/30 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-play text-[10px] font-bold tracking-wider uppercase text-white px-2 py-1 rounded"
                    style={{ backgroundColor: modalidadeData.cor }}
                  >
                    {modalidadeData.id.toUpperCase()}
                  </span>
                  <span
                    className="font-play text-[10px] font-bold tracking-wider uppercase text-white px-2 py-1 rounded"
                    style={{ backgroundColor: nivelData.cor }}
                  >
                    {nivelData.nome}
                  </span>
                </div>
                <h3 className="font-kanit font-bold text-lg text-blenduca-grafite mb-1">
                  {modalidadeData.nome}
                </h3>
                <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
                  {modalidadeData.descricao}
                </p>

                {/* Pricing */}
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  {resumo.pacoteEntrada > 0 && (
                    <div className="flex justify-between text-sm font-kanit mb-2">
                      <span className="text-blenduca-cinza-medio">Taxa de Entrada:</span>
                      <span className="font-semibold text-blenduca-grafite">
                        {formatCurrency(resumo.pacoteEntrada)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Investimento Mensal:</span>
                    <span className="font-semibold text-blenduca-grafite">
                      {formatCurrency(resumo.pacoteMensal)}/mes
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <FeatureTag
                    label="Consultoria"
                    included={modalidadeData.inclui.consultoriaIndividual}
                  />
                  <FeatureTag
                    label="Comunidade"
                    included={modalidadeData.inclui.comunidadeEventos}
                  />
                  <FeatureTag
                    label="Tecnologia"
                    included={modalidadeData.inclui.tecnologiaCompleta}
                  />
                </div>
              </div>
            )}

            {/* Technology included (Pacote Completo only) */}
            {modalidade === "completo" && techData && (
              <div className="mb-6 border border-gray-100 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-blenduca-verde text-white px-2 py-1 rounded">
                    TECNOLOGIA INCLUSA
                  </span>
                  {resumo.economia > 0 && (
                    <span className="font-kanit text-xs text-blenduca-verde font-semibold">
                      Economia de {formatCurrency(resumo.economia)}/mes
                    </span>
                  )}
                </div>

                {/* Experience Flix */}
                <div className="mb-4">
                  <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                    Experience Flix - {techData.experienceFlix.plano}
                  </h4>
                  <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                    {techData.experienceFlix.descricao}
                  </p>
                  <ul className="space-y-0.5">
                    {techData.experienceFlix.recursos.map((rec, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
                      >
                        <span className="text-blenduca-verde shrink-0">&#10003;</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Funnel Pages */}
                <div>
                  <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                    Funnel Pages - {techData.funnelPages.plano}
                  </h4>
                  <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                    {techData.funnelPages.descricao}
                  </p>
                  <ul className="space-y-0.5">
                    {techData.funnelPages.funis.map((funil, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
                      >
                        <span className="text-blenduca-verde shrink-0">&#10003;</span>
                        {funil}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Genius AI (Scale only) */}
                {techData.geniusAI && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                      Genius A.I - {techData.geniusAI.plano}
                    </h4>
                    <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                      {techData.geniusAI.descricao}
                    </p>
                    <ul className="space-y-0.5">
                      {techData.geniusAI.recursos.map((rec, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
                        >
                          <span className="text-blenduca-azul shrink-0">&#10003;</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Upgrades */}
            {(resumo.upgradeFlixMensal > 0 || resumo.funisExtrasMensal > 0) && (
              <div className="mb-6 border border-gray-100 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-blenduca-azul text-white px-2 py-1 rounded">
                    UPGRADES
                  </span>
                </div>

                <div className="space-y-3">
                  {upgradeFlixInfo && (
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite">
                          Upgrade Experience Flix
                        </h4>
                        <p className="font-kanit text-xs text-blenduca-cinza-medio">
                          {upgradeFlixInfo.descricao}
                        </p>
                      </div>
                      <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                        +{formatCurrency(resumo.upgradeFlixMensal)}/mes
                      </span>
                    </div>
                  )}

                  {funisExtras > 0 && (
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite">
                          {funisExtras} Funis Adicionais
                        </h4>
                        <p className="font-kanit text-xs text-blenduca-cinza-medio">
                          {funisAdicionaisConfig.observacao}
                        </p>
                      </div>
                      <span className="font-kanit font-semibold text-sm text-blenduca-grafite">
                        +{formatCurrency(resumo.funisExtrasMensal)}/mes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Agents */}
            {agentes.length > 0 && (
              <div className="mb-6 border border-gray-100 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-blenduca-grafite text-white px-2 py-1 rounded">
                    AGENTES A.I
                  </span>
                </div>

                <div className="space-y-4">
                  {agentes.map((item) => (
                    <div key={item.agente.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite flex items-center gap-2">
                            <span>{item.agente.icone}</span>
                            {item.agente.nome}
                          </h4>
                          <p className="font-kanit text-xs text-blenduca-cinza-medio">
                            {item.agente.descricao}
                          </p>
                        </div>
                      </div>

                      {/* Agent extras */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-2">
                        <div className="flex justify-between text-xs font-kanit mb-1">
                          <span className="text-blenduca-cinza-medio">Setup:</span>
                          <span className="font-medium text-blenduca-grafite">
                            {formatCurrency(item.setupTotal)}
                          </span>
                        </div>
                        {(item.acoesExtras ?? 0) > 0 && (
                          <div className="flex justify-between text-xs font-kanit mb-1">
                            <span className="text-blenduca-cinza-medio">Acoes Extras:</span>
                            <span className="font-medium text-blenduca-grafite">
                              {item.acoesExtras}x
                            </span>
                          </div>
                        )}
                        {(item.integracoesExtras ?? 0) > 0 && (
                          <div className="flex justify-between text-xs font-kanit mb-1">
                            <span className="text-blenduca-cinza-medio">Integracoes Extras:</span>
                            <span className="font-medium text-blenduca-grafite">
                              {item.integracoesExtras}x
                            </span>
                          </div>
                        )}
                        {(item.numerosExtras ?? 0) > 0 && (
                          <div className="flex justify-between text-xs font-kanit mb-1">
                            <span className="text-blenduca-cinza-medio">Numeros Extras:</span>
                            <span className="font-medium text-blenduca-grafite">
                              {item.numerosExtras}x
                            </span>
                          </div>
                        )}
                        {item.prospeccaoAtiva && (
                          <div className="flex justify-between text-xs font-kanit mb-1">
                            <span className="text-blenduca-cinza-medio">Prospeccao Ativa:</span>
                            <span className="font-medium text-blenduca-grafite">Incluso</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-kanit border-t border-gray-200 pt-1 mt-1">
                          <span className="font-semibold text-blenduca-grafite">Mensal:</span>
                          <span className="font-bold text-blenduca-grafite">
                            {formatCurrency(item.mensalTotal)}/mes
                          </span>
                        </div>
                      </div>

                      {/* Deliverables */}
                      <ul className="space-y-0.5">
                        {item.agente.entregaveis.map((ent, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
                          >
                            <span className="text-blenduca-vermelho shrink-0">&#10003;</span>
                            {ent}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Co-produtor V0.12: sem calculo de valor */}
            {coprodutor?.ativo && (
              <div className="mb-6 border border-gray-100 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-amber-600 text-white px-2 py-1 rounded">
                    CO-PRODUTOR
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Nome:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {coprodutor.nome || "Nao informado"}
                    </span>
                  </div>
                  {coprodutor.email && (
                    <div className="flex justify-between text-sm font-kanit">
                      <span className="text-blenduca-cinza-medio">Email:</span>
                      <span className="font-medium text-blenduca-grafite">
                        {coprodutor.email}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Percentual de Comissao:</span>
                    <span className="font-semibold text-blenduca-grafite">
                      {coprodutor.percentualComissao}%
                    </span>
                  </div>
                  {coprodutor.observacoes && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="font-kanit text-xs text-blenduca-cinza-medio">
                        <strong>Observacoes:</strong> {coprodutor.observacoes}
                      </p>
                    </div>
                  )}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="font-kanit text-xs text-blue-600">
                      Os detalhes da parceria serao tratados separadamente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Central de Inteligência V0.12 */}
            {centralInteligencia.pacoteSelecionado && (
              <div className="mb-6 border border-blue-200 bg-blue-50/30 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-blue-600 text-white px-2 py-1 rounded">
                    CENTRAL DE INTELIGENCIA
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Pacote selecionado:</span>
                    <span className="font-semibold text-blenduca-grafite">
                      {centralInteligencia.pacoteSelecionado === "pacote_5"
                        ? "5 Assistentes"
                        : "10 Assistentes"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-kanit border-t border-blue-200 pt-2 mt-2">
                    <span className="text-blenduca-cinza-medio">Investimento (Setup):</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(centralInteligencia.setupTotal)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Entregaveis Section */}
          {nivel && modalidade && (
            <section>
              <SectionTitle>
                Entregaveis do seu Pacote - {nivelData?.nome}
              </SectionTitle>
              <div className="space-y-6">
                {getPilaresParaModalidadeENivel(modalidade, nivel as NivelId).map((pilar) => {
                  // Already filtered by modalidade and nivel
                  if (pilar.entregaveis.length === 0) return null;

                  return (
                    <div key={pilar.id}>
                      {/* Pilar Header */}
                      <div
                        className="flex items-center gap-2 mb-3 pb-2 border-b"
                        style={{ borderColor: `${pilar.cor}30` }}
                      >
                        <span className="text-lg">{pilar.icone}</span>
                        <h4
                          className="font-kanit font-bold text-sm uppercase tracking-wide"
                          style={{ color: pilar.cor }}
                        >
                          {pilar.nome}
                        </h4>
                      </div>

                      {/* Entregaveis */}
                      <div className="space-y-3">
                        {pilar.entregaveis.map((entregavel) => (
                          <div
                            key={entregavel.id}
                            className="bg-gray-50/50 border border-gray-100 rounded-lg p-4"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-lg shrink-0">{entregavel.icone}</span>
                              <div className="flex-1">
                                <h5 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                                  {entregavel.nome}
                                </h5>
                                <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                                  {entregavel.descricao}
                                </p>

                                {/* Significado */}
                                <div className="bg-amber-50/50 border-l-2 border-amber-400 p-2 rounded-r mb-2">
                                  <p className="font-kanit text-[10px] font-bold text-amber-700 uppercase mb-1">
                                    O que isso significa para voce
                                  </p>
                                  <p className="font-kanit text-xs text-blenduca-grafite">
                                    {entregavel.significado}
                                  </p>
                                </div>

                                {/* Detalhes do nivel */}
                                {entregavel.detalhesNivel?.[nivel as NivelId] && (
                                  <div className="bg-blue-50/50 rounded p-2">
                                    <p className="font-kanit text-[10px] font-bold text-blue-700 uppercase mb-1">
                                      No seu nivel ({nivelData?.nome})
                                    </p>
                                    <p className="font-kanit text-xs text-blenduca-grafite whitespace-pre-line">
                                      {entregavel.detalhesNivel[nivel as NivelId]}
                                    </p>
                                  </div>
                                )}

                                {/* Valor avulso (for tech) */}
                                {entregavel.valorAvulso?.[nivel as NivelId] && (
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="font-kanit text-xs text-blenduca-cinza-medio">
                                      Valor avulso: {formatCurrency(entregavel.valorAvulso[nivel as NivelId]!)}/mes
                                    </span>
                                    <span className="font-play text-[9px] font-bold bg-green-600 text-white px-2 py-0.5 rounded">
                                      INCLUSO NO PACOTE
                                    </span>
                                  </div>
                                )}

                                {/* Frequencia */}
                                {entregavel.frequencia && (
                                  <p className="font-kanit text-[10px] text-blenduca-cinza-medio mt-1">
                                    📅 {entregavel.frequencia}
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
            </section>
          )}

          {/* Investment summary */}
          <section>
            <SectionTitle>Investimento</SectionTitle>
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="space-y-2">
                {/* Setup costs */}
                {(resumo.totalSetup > 0 || resumo.totalEntrada > 0) && (
                  <>
                    <h4 className="font-kanit font-semibold text-xs uppercase tracking-wide text-blenduca-cinza-medio mb-2">
                      Investimento Inicial
                    </h4>
                    {resumo.totalEntrada > 0 && (
                      <div className="flex justify-between text-sm font-kanit">
                        <span className="text-blenduca-cinza-medio">Taxa de Entrada:</span>
                        <span className="font-medium text-blenduca-grafite">
                          {formatCurrency(resumo.totalEntrada)}
                        </span>
                      </div>
                    )}
                    {resumo.centralInteligenciaSetup > 0 && (
                      <div className="flex justify-between text-sm font-kanit">
                        <span className="text-blenduca-cinza-medio">Setup Central de Inteligencia ({resumo.centralInteligenciaPacote}):</span>
                        <span className="font-medium text-blue-600">
                          {formatCurrency(resumo.centralInteligenciaSetup)}
                        </span>
                      </div>
                    )}
                    {resumo.agentesSetup > 0 && (
                      <div className="flex justify-between text-sm font-kanit">
                        <span className="text-blenduca-cinza-medio">Setup Agentes A.I:</span>
                        <span className="font-medium text-blenduca-grafite">
                          {formatCurrency(resumo.agentesSetup)}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between text-sm font-kanit">
                        <span className="font-semibold text-blenduca-grafite">Total Inicial:</span>
                        <span className="font-bold text-blenduca-grafite">
                          {formatCurrency(resumo.totalEntrada + resumo.totalSetup)}
                        </span>
                      </div>
                    </div>
                    <div className="my-4 border-b border-gray-200" />
                  </>
                )}

                {/* Monthly costs */}
                <h4 className="font-kanit font-semibold text-xs uppercase tracking-wide text-blenduca-cinza-medio mb-2">
                  Investimento Mensal
                </h4>
                <div className="flex justify-between text-sm font-kanit">
                  <span className="text-blenduca-cinza-medio">Pacote Base:</span>
                  <span className="font-medium text-blenduca-grafite">
                    {formatCurrency(resumo.pacoteMensal)}
                  </span>
                </div>
                {resumo.totalUpgradesMensal > 0 && (
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Upgrades:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.totalUpgradesMensal)}
                    </span>
                  </div>
                )}
                {resumo.agentesMensal > 0 && (
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Agentes A.I:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.agentesMensal)}
                    </span>
                  </div>
                )}

                {/* Subtotal and Desconto */}
                {resumo.valorDesconto > 0 && (
                  <>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between text-sm font-kanit">
                        <span className="text-blenduca-cinza-medio">Subtotal:</span>
                        <span className="font-medium text-blenduca-grafite">
                          {formatCurrency(resumo.subtotalMensal)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm font-kanit bg-green-50 p-2 rounded -mx-2">
                      <span className="text-green-600 font-semibold">
                        Desconto {desconto.tipo === "percentual" ? `(${desconto.valor}%)` : ""}
                        {desconto.motivo && ` - ${desconto.motivo}`}:
                      </span>
                      <span className="font-bold text-green-600">
                        -{formatCurrency(resumo.valorDesconto)}
                      </span>
                    </div>
                  </>
                )}

                {/* Total */}
                <div className="border-t-2 border-blenduca-grafite pt-3 mt-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-kanit font-bold text-base text-blenduca-grafite">
                      TOTAL MENSAL:
                    </span>
                    <span className="font-kanit font-bold text-2xl text-blenduca-vermelho">
                      {formatCurrency(resumo.totalMensal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-kanit mt-1">
                    <span className="text-blenduca-cinza-medio">Total Anual (12x):</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.totalAnual)}
                    </span>
                  </div>
                  {resumo.economia > 0 && (
                    <div className="flex justify-between text-sm font-kanit mt-1">
                      <span className="text-blenduca-verde">Economia (Tecnologia Inclusa):</span>
                      <span className="font-medium text-blenduca-verde">
                        {formatCurrency(resumo.economia)}/mes
                      </span>
                    </div>
                  )}
                  {resumo.economiaAnualDesconto > 0 && (
                    <div className="flex justify-between text-sm font-kanit mt-1">
                      <span className="text-green-600">Economia Anual (Desconto):</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(resumo.economiaAnualDesconto)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Commercial conditions */}
          <section>
            <SectionTitle>Condicoes Comerciais</SectionTitle>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                <span className="text-blenduca-vermelho shrink-0">&#8226;</span>
                Duracao: Contrato de 12 meses
              </li>
              <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                <span className="text-blenduca-vermelho shrink-0">&#8226;</span>
                Periodo Minimo: 6 meses
              </li>
              <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                <span className="text-blenduca-vermelho shrink-0">&#8226;</span>
                Aviso Previo: 30 dias
              </li>
              <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                <span className="text-blenduca-vermelho shrink-0">&#8226;</span>
                Multa por Rescisao Antecipada: 20% das parcelas restantes (primeiro ano)
              </li>
              {carrinho.condicaoPagamento === "revenue_share" && (
                <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                  <span className="text-blenduca-vermelho shrink-0">&#8226;</span>
                  Condicao Especial: Revenue Share
                  {carrinho.revenueShareObservacoes && ` - ${carrinho.revenueShareObservacoes}`}
                </li>
              )}
            </ul>
          </section>

          {/* Next steps */}
          <section>
            <SectionTitle>Proximos Passos</SectionTitle>
            <ol className="space-y-1.5">
              {[
                "Aprovacao da proposta",
                "Assinatura do contrato",
                "Onboarding e kick-off",
                "Inicio da implementacao",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-kanit text-blenduca-cinza-medio"
                >
                  <span className="w-6 h-6 bg-blenduca-vermelho/10 text-blenduca-vermelho rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="font-kanit font-semibold text-sm text-blenduca-vermelho">
              Blenduca - Experts em Negocios de Conhecimento
            </p>
            <p className="font-kanit text-xs text-blenduca-grafite italic mt-1">
              Somos a Blenduca! Experts em negocios de conhecimento! #OMelhorDeCadaExpert
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mt-1">
              blenduca.com.br | comercial@blenduca.com.br
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-12">
        <button
          onClick={() => setStep("cliente")}
          className="px-6 py-3 rounded-lg border border-gray-200 bg-white font-kanit font-semibold text-sm text-blenduca-cinza-medio hover:bg-gray-50 transition-all"
        >
          Editar Dados
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={generating}
          className="flex-1 px-6 py-3 rounded-lg bg-blenduca-vermelho text-white font-kanit font-semibold text-sm hover:bg-blenduca-vermelho-dark shadow-lg shadow-blenduca-vermelho/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {generating ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Gerando PDF...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Baixar PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-kanit font-bold text-base text-blenduca-vermelho mb-3 pb-2 border-b border-blenduca-cinza">
      {children}
    </h3>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-kanit text-xs text-blenduca-cinza-medio">{label}:</span>
      <p className="font-kanit text-sm font-medium text-blenduca-grafite">{value}</p>
    </div>
  );
}

function FeatureTag({ label, included }: { label: string; included: boolean }) {
  return (
    <div
      className={`px-2 py-1 rounded text-xs font-kanit text-center ${
        included
          ? "bg-blenduca-verde/10 text-blenduca-verde"
          : "bg-gray-100 text-blenduca-cinza-medio line-through"
      }`}
    >
      {included ? "✓ " : ""}
      {label}
    </div>
  );
}
