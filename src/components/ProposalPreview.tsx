"use client";

import { useState, useCallback } from "react";
import { useCartStore } from "@/store/useCartStore";
import { calcularResumo } from "@/utils/calculations";
import { formatCurrency, formatDate, generateId } from "@/utils/formatting";
import type { Produto, ServicoAdicional, Proposta } from "@/types";

export default function ProposalPreview() {
  const carrinho = useCartStore((s) => s.carrinho);
  const dadosCliente = useCartStore((s) => s.dadosCliente);
  const consultor = useCartStore((s) => s.consultor);
  const setStep = useCartStore((s) => s.setStep);
  const addToast = useCartStore((s) => s.addToast);
  const [generating, setGenerating] = useState(false);

  const resumo = calcularResumo(carrinho);
  const produtoItem = carrinho.find((i) => i.tipo === "produto");
  const servicos = carrinho.filter((i) => i.tipo === "servico");
  const produto = produtoItem?.item as Produto | undefined;

  const hoje = new Date();
  const validade = new Date(hoje);
  validade.setDate(validade.getDate() + 15);

  const proposta: Proposta = {
    id: generateId(),
    data: hoje,
    validade,
    cliente: dadosCliente,
    itens: carrinho,
    subtotal: resumo.subtotal,
    desconto: resumo.desconto,
    total: resumo.total,
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
        total: proposta.total,
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
                  {dadosCliente.objetivosPrincipais.map((obj, i) => (
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

            {/* Main product */}
            {produto && (
              <div className="mb-6 bg-blenduca-cinza/30 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-play text-[10px] font-bold tracking-wider uppercase bg-blenduca-vermelho text-white px-2 py-1 rounded">
                    PRODUTO PRINCIPAL
                  </span>
                </div>
                <h3 className="font-kanit font-bold text-lg text-blenduca-grafite mb-1">
                  {produto.nome}
                </h3>
                <p className="font-kanit text-sm text-blenduca-cinza-medio mb-4">
                  Investimento: {formatCurrency(produto.investimento.mensal)}/mes
                </p>

                {/* Deliverables by pillar */}
                <div className="space-y-3">
                  {produto.entregaveis.map((pilar) => (
                    <div key={pilar.pilar}>
                      <h4 className="font-kanit font-semibold text-xs uppercase tracking-wide text-blenduca-grafite mb-1">
                        {pilar.pilar}
                      </h4>
                      <ul className="space-y-0.5">
                        {pilar.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
                          >
                            <svg className="w-3 h-3 text-blenduca-vermelho mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>
                              {item.descricao}
                              {item.frequencia && ` (${item.frequencia})`}
                              {item.tipo && ` [${item.tipo}]`}
                              {item.quantidade && ` - ${item.quantidade}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional services */}
            {servicos.length > 0 && (
              <div>
                <h3 className="font-kanit font-semibold text-base text-blenduca-grafite mb-3">
                  Servicos Adicionais
                </h3>
                <div className="space-y-3">
                  {servicos.map((item, index) => {
                    const servico = item.item as ServicoAdicional;
                    return (
                      <div
                        key={servico.id}
                        className="border border-gray-100 rounded-lg p-4"
                      >
                        <h4 className="font-kanit font-semibold text-sm text-blenduca-grafite mb-1">
                          {index + 1}. {servico.nome}
                          {item.quantidade > 1 && ` (x${item.quantidade})`}
                        </h4>
                        <p className="font-kanit text-xs text-blenduca-cinza-medio mb-2">
                          Investimento:{" "}
                          {formatCurrency(servico.preco * item.quantidade)}/
                          {servico.tipo === "mensal" ? "mes" : "unico"}
                        </p>
                        {servico.entregaveis.length > 0 && (
                          <ul className="space-y-0.5">
                            {servico.entregaveis.map((ent, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs font-kanit text-blenduca-cinza-medio"
                              >
                                <span className="text-blenduca-vermelho shrink-0">
                                  •
                                </span>
                                {ent}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* Investment summary */}
          <section>
            <SectionTitle>Investimento</SectionTitle>
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="space-y-2">
                {resumo.totalProduto > 0 && (
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Produto Principal:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.totalProduto)}
                    </span>
                  </div>
                )}
                {resumo.totalServicos > 0 && (
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Servicos Adicionais:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.totalServicos)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-cinza-medio">Subtotal Mensal:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.subtotal)}
                    </span>
                  </div>
                </div>
                {resumo.desconto > 0 && (
                  <div className="flex justify-between text-sm font-kanit">
                    <span className="text-blenduca-vermelho">Desconto:</span>
                    <span className="font-medium text-blenduca-vermelho">
                      - {formatCurrency(resumo.desconto)}
                    </span>
                  </div>
                )}
                <div className="border-t-2 border-blenduca-grafite pt-3 mt-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-kanit font-bold text-base text-blenduca-grafite">
                      TOTAL MENSAL:
                    </span>
                    <span className="font-kanit font-bold text-2xl text-blenduca-vermelho">
                      {formatCurrency(resumo.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-kanit mt-1">
                    <span className="text-blenduca-cinza-medio">Total Anual (12x):</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.totalAnual)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Commercial conditions */}
          <section>
            <SectionTitle>Condicoes Comerciais</SectionTitle>
            <ul className="space-y-1.5">
              {produto && (
                <>
                  <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                    <span className="text-blenduca-vermelho shrink-0">•</span>
                    Duracao: {produto.duracao}
                  </li>
                  <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                    <span className="text-blenduca-vermelho shrink-0">•</span>
                    Periodo Minimo: {produto.investimento.minimoMeses} meses
                  </li>
                </>
              )}
              <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                <span className="text-blenduca-vermelho shrink-0">•</span>
                Aviso Previo: 30 dias
              </li>
              {produto?.investimento.extras && (
                <li className="flex items-start gap-2 text-sm font-kanit text-blenduca-cinza-medio">
                  <span className="text-blenduca-vermelho shrink-0">•</span>
                  Extras: {produto.investimento.extras}
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
            <p className="font-kanit font-semibold text-sm text-blenduca-grafite">
              Blenduca - Experts em Negocios de Conhecimento
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mt-0.5">
              blenduca.com | contato@blenduca.com
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
