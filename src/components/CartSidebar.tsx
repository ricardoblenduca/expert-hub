"use client";

import { useCartStore } from "@/store/useCartStore";
import { modalidades, niveisMap } from "@/data/modalidades";
import { tecnologiaInclusa } from "@/data/tecnologiaInclusa";
import { SERVICOS_EXTRAS } from "@/data/servicosExtras";
import { formatCurrency } from "@/utils/formatting";

export default function CartSidebar() {
  const carrinho = useCartStore((s) => s.carrinho);
  const calcularResumo = useCartStore((s) => s.calcularResumo);
  const setStep = useCartStore((s) => s.setStep);
  const mobileCartOpen = useCartStore((s) => s.mobileCartOpen);
  const setMobileCartOpen = useCartStore((s) => s.setMobileCartOpen);
  const addToast = useCartStore((s) => s.addToast);

  const { modalidade, nivel, upgradeExperienceFlix, funisExtras, agentes, tecnologiaAvulsa, tipoProposta, centralInteligencia, servicosExtras } = carrinho;
  const resumo = calcularResumo();

  const modalidadeInfo = modalidade ? modalidades[modalidade] : null;
  const nivelInfo = nivel ? niveisMap[nivel] : null;
  const tech = modalidade === "completo" && nivel ? tecnologiaInclusa[nivel] : null;

  // Determine if we have anything to show
  const hasPrograma = modalidade && nivel;
  const hasTech = tecnologiaAvulsa !== null;
  const hasAgents = agentes.length > 0;
  const hasCentralInteligencia = centralInteligencia.pacoteSelecionado !== null;
  const hasServicosExtras = servicosExtras.expertPlanning || servicosExtras.sessaoMentoriaQtd > 0;
  const hasAnything = hasPrograma || hasTech || hasAgents || hasCentralInteligencia || hasServicosExtras;

  const handleFinalize = () => {
    if (!hasAnything) {
      addToast("Adicione pelo menos um item ao carrinho", "warning");
      return;
    }
    setStep("cliente");
    setMobileCartOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="font-kanit font-bold text-lg text-blenduca-grafite">
            Resumo da Proposta
          </h2>
          <button
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setMobileCartOpen(false)}
            aria-label="Fechar carrinho"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!hasAnything ? (
          <div className="text-center py-12">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <p className="font-kanit text-sm text-blenduca-cinza-medio">
              Carrinho vazio
            </p>
            <p className="font-kanit text-xs text-gray-400 mt-1">
              Adicione itens para visualizar o resumo
            </p>
          </div>
        ) : (
          <>
            {/* Pacote Base */}
            <div className="bg-gray-50/50 rounded-lg p-4">
              <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-3">
                PACOTE BASE
              </h3>

              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: modalidadeInfo?.cor }}
                />
                <div className="flex-1">
                  <p className="font-kanit font-semibold text-sm text-blenduca-grafite">
                    {modalidadeInfo?.nome.split(" - ")[0]} - {nivelInfo?.nome}
                  </p>
                  <p className="font-kanit text-xs text-blenduca-cinza-medio">
                    {modalidadeInfo?.descricao}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                {resumo.pacoteEntrada > 0 && (
                  <div className="flex justify-between text-xs font-kanit">
                    <span className="text-blenduca-cinza-medio">Entrada:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.pacoteEntrada)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-kanit">
                  <span className="text-blenduca-cinza-medio">Mensal:</span>
                  <span className="font-semibold text-blenduca-grafite">
                    {formatCurrency(resumo.pacoteMensal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tecnologia Inclusa (Pacote Completo only) */}
            {tech && (
              <div className="bg-green-50/50 border border-green-100 rounded-lg p-4">
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-green-700 mb-3">
                  💻 TECNOLOGIA INCLUSA
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-kanit">
                    <span className="text-blenduca-grafite">
                      🎬 Experience Flix {tech.experienceFlix.plano}
                    </span>
                    <span className="text-green-600">Incluso</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-kanit">
                    <span className="text-blenduca-grafite">
                      📄 Funnel Pages ({tech.funnelPages.quantidade.funis} funis)
                    </span>
                    <span className="text-green-600">Incluso</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-green-100">
                  <p className="font-kanit text-[10px] text-green-600">
                    Valor avulso: {formatCurrency(tech.totalTecnologia.mensal)}/mes
                  </p>
                </div>
              </div>
            )}

            {/* Tecnologia Avulsa */}
            {tecnologiaAvulsa && (
              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-3">
                  💻 TECNOLOGIA
                </h3>

                <div className="space-y-2">
                  {tecnologiaAvulsa.experienceFlix && (
                    <div className="flex items-center justify-between text-xs font-kanit">
                      <span className="text-blenduca-grafite">
                        📺 Experience Flix {tecnologiaAvulsa.experienceFlix.plano.toUpperCase()}
                      </span>
                      <span className="font-medium text-blenduca-grafite">
                        {formatCurrency(tecnologiaAvulsa.experienceFlix.mensal)}/mes
                      </span>
                    </div>
                  )}
                  {tecnologiaAvulsa.funnelPages && (
                    <div className="flex items-center justify-between text-xs font-kanit">
                      <span className="text-blenduca-grafite">
                        🚀 Funnel Pages ({tecnologiaAvulsa.funnelPages.quantidade} funis)
                      </span>
                      <span className="font-medium text-blenduca-grafite">
                        {formatCurrency(tecnologiaAvulsa.funnelPages.mensal)}/mes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upgrades */}
            {(upgradeExperienceFlix || funisExtras > 0) && (
              <div>
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-2">
                  UPGRADES
                </h3>

                <div className="space-y-2">
                  {upgradeExperienceFlix && (
                    <div className="flex justify-between text-xs font-kanit">
                      <span className="text-blenduca-grafite">
                        Upgrade Flix → {niveisMap[upgradeExperienceFlix]?.nome}
                      </span>
                      <span className="font-medium text-blenduca-vermelho">
                        +{formatCurrency(resumo.upgradeFlixMensal)}/mes
                      </span>
                    </div>
                  )}
                  {funisExtras > 0 && (
                    <div className="flex justify-between text-xs font-kanit">
                      <span className="text-blenduca-grafite">
                        {funisExtras}x Funis Extras
                      </span>
                      <span className="font-medium text-blenduca-vermelho">
                        +{formatCurrency(resumo.funisExtrasMensal)}/mes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Agentes AI */}
            {agentes.length > 0 && (
              <div>
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-blenduca-cinza-medio mb-2">
                  AGENTES A.I
                </h3>

                <div className="space-y-2">
                  {agentes.map((a) => (
                    <div key={a.agente.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-kanit font-medium text-xs text-blenduca-grafite mb-1">
                        {a.agente.icone} {a.agente.nome}
                      </p>
                      <div className="flex justify-between text-[11px] font-kanit">
                        <span className="text-blenduca-cinza-medio">Setup:</span>
                        <span className="text-blenduca-grafite">{formatCurrency(a.setupTotal)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-kanit">
                        <span className="text-blenduca-cinza-medio">Mensal:</span>
                        <span className="text-blenduca-grafite">{formatCurrency(a.mensalTotal)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Servicos Extras - V0.18/V0.19: Updated to support avulso mode */}
            {hasServicosExtras && (nivel || servicosExtras.expertPlanningNivel || servicosExtras.sessaoMentoriaQtd > 0) && (
              <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-4">
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-orange-700 mb-3">
                  ✨ SERVICOS ADICIONAIS
                </h3>

                <div className="space-y-2">
                  {servicosExtras.expertPlanning && (nivel || servicosExtras.expertPlanningNivel) && (
                    <div className="bg-amber-50 rounded-lg p-2 border-l-4 border-amber-400">
                      <div className="flex items-center justify-between text-xs font-kanit">
                        <div className="flex items-center gap-2">
                          <span className="text-blenduca-grafite">
                            📋 Expert Planning Anual
                          </span>
                          <span className="px-1.5 py-0.5 bg-blenduca-vermelho text-white text-[9px] font-bold rounded uppercase">
                            {(nivel || servicosExtras.expertPlanningNivel)!.toUpperCase()}
                          </span>
                        </div>
                        <span className="font-semibold text-blenduca-grafite">
                          {formatCurrency(
                            SERVICOS_EXTRAS.expertPlanning.precos[
                              (nivel || servicosExtras.expertPlanningNivel)!
                            ]
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {servicosExtras.sessaoMentoriaQtd > 0 && (
                    <div className="flex flex-col text-xs font-kanit">
                      <div className="flex items-center justify-between">
                        <span className="text-blenduca-grafite">
                          🎯 {servicosExtras.sessaoMentoriaQtd}x Sessao Individual
                        </span>
                        <span className="font-medium text-blenduca-grafite">
                          {formatCurrency(
                            nivel
                              ? SERVICOS_EXTRAS.sessaoMentoria.precos[nivel] * servicosExtras.sessaoMentoriaQtd
                              : 750 * servicosExtras.sessaoMentoriaQtd
                          )}
                        </span>
                      </div>
                      {!nivel && (
                        <span className="text-[10px] text-blenduca-cinza-medio mt-0.5">
                          (R$ 750/sessao - valor avulso)
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs font-kanit pt-2 border-t border-orange-100">
                    <span className="text-blenduca-cinza-medio">Total extras:</span>
                    <span className="font-semibold text-orange-700">
                      {formatCurrency(resumo.servicosExtrasTotal)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Central de Inteligencia - V0.15 */}
            {hasCentralInteligencia && (
              <div className="bg-purple-50/50 border border-purple-100 rounded-lg p-4">
                <h3 className="font-play text-[10px] font-bold tracking-wider uppercase text-purple-700 mb-3">
                  🧠 CENTRAL DE INTELIGENCIA
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-kanit">
                    <span className="text-blenduca-grafite">
                      {resumo.centralInteligenciaPacote}
                    </span>
                  </div>
                  {resumo.centralInteligenciaExtras > 0 && (
                    <div className="flex items-center justify-between text-xs font-kanit">
                      <span className="text-blenduca-grafite">
                        +{resumo.centralInteligenciaExtras} assistentes extras
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs font-kanit pt-2 border-t border-purple-100">
                    <span className="text-blenduca-cinza-medio">Total assistentes:</span>
                    <span className="font-medium text-purple-700">
                      {resumo.centralInteligenciaQuantidade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-kanit">
                    <span className="text-blenduca-cinza-medio">Setup:</span>
                    <span className="font-medium text-blenduca-grafite">
                      {formatCurrency(resumo.centralInteligenciaSetup)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Summary Footer */}
      {hasAnything && (
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/50">
          {/* Breakdown - Investimento Inicial */}
          <div className="space-y-1.5">
            {resumo.subtotalSetup > 0 && (
              <>
                <div className="flex justify-between text-xs font-kanit">
                  <span className="text-blenduca-cinza-medio">Investimento Inicial:</span>
                  <span className="font-medium text-blenduca-grafite">
                    {formatCurrency(resumo.subtotalSetup)}
                  </span>
                </div>
                {/* Desconto Setup - V0.15 */}
                {resumo.valorDescontoSetup > 0 && (
                  <div className="flex justify-between text-xs font-kanit">
                    <span className="text-purple-600">
                      Desconto Setup{resumo.motivoDescontoSetup ? ` (${resumo.motivoDescontoSetup})` : ""}:
                    </span>
                    <span className="font-medium text-purple-600">
                      -{formatCurrency(resumo.valorDescontoSetup)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-kanit border-t border-gray-200 pt-1">
                  <span className="text-blenduca-grafite font-medium">Total Inicial:</span>
                  <span className="font-semibold text-blenduca-grafite">
                    {formatCurrency(resumo.totalInicialComDesconto)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Breakdown - Mensal */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-kanit">
              <span className="text-blenduca-cinza-medio">Subtotal Mensal:</span>
              <span className="font-medium text-blenduca-grafite">
                {formatCurrency(resumo.subtotalMensal)}
              </span>
            </div>
            {/* Desconto Mensal - V0.15 */}
            {resumo.valorDescontoMensal > 0 && (
              <div className="flex justify-between text-xs font-kanit">
                <span className="text-amber-600">
                  Desconto Mensal{resumo.motivoDescontoMensal ? ` (${resumo.motivoDescontoMensal})` : ""}:
                </span>
                <span className="font-medium text-amber-600">
                  -{formatCurrency(resumo.valorDescontoMensal)}
                </span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="border-t-2 border-blenduca-grafite pt-3">
            <div className="flex justify-between items-baseline">
              <span className="font-kanit font-bold text-sm text-blenduca-grafite">
                TOTAL MENSAL
              </span>
              <span className="font-kanit font-bold text-2xl text-blenduca-vermelho animate-count-up">
                {formatCurrency(resumo.totalMensal)}
              </span>
            </div>
            <div className="flex justify-between text-xs font-kanit text-blenduca-cinza-medio mt-1">
              <span>Total Anual (12x):</span>
              <span>{formatCurrency(resumo.totalAnual)}</span>
            </div>
          </div>

          {/* Economia - V0.15: updated to show economiaAnualTotal */}
          {(resumo.economia > 0 || resumo.economiaAnualTotal > 0) && (
            <div className="bg-green-50 rounded-lg p-3 text-center">
              {resumo.economia > 0 && (
                <>
                  <p className="font-kanit text-xs text-green-700">
                    💰 Economia em tecnologia inclusa:
                  </p>
                  <p className="font-kanit font-bold text-sm text-green-600">
                    {formatCurrency(resumo.economia)}/mes
                  </p>
                </>
              )}
              {resumo.economiaAnualTotal > 0 && (
                <div className={resumo.economia > 0 ? "mt-2 pt-2 border-t border-green-200" : ""}>
                  <p className="font-kanit text-xs text-green-700">
                    🎉 Economia Total Anual (descontos):
                  </p>
                  <p className="font-kanit font-bold text-sm text-green-600">
                    {formatCurrency(resumo.economiaAnualTotal)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Smart Upgrade Suggestion */}
          {resumo.sugestaoUpgrade?.mostrar && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="font-kanit text-xs text-amber-700 whitespace-pre-line">
                {resumo.sugestaoUpgrade.mensagem}
              </p>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleFinalize}
            disabled={!hasAnything}
            className="w-full py-3 bg-blenduca-vermelho text-white rounded-lg font-kanit font-semibold text-sm transition-all duration-300 hover:bg-blenduca-vermelho-dark shadow-lg shadow-blenduca-vermelho/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Finalizar Proposta
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-96 bg-white border-l border-gray-100 shadow-sm h-[calc(100vh-4rem)] sticky top-16 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileCartOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden animate-slide-in-right shadow-2xl">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}
