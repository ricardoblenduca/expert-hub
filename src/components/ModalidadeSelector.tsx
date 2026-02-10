"use client";

import { useCartStore } from "@/store/useCartStore";
import { modalidades } from "@/data/modalidades";
import { precosMatriz } from "@/data/precosMatriz";
import { formatCurrency } from "@/utils/formatting";
import type { ModalidadeId } from "@/types";

export default function ModalidadeSelector() {
  const setModalidade = useCartStore((s) => s.setModalidade);
  const setStep = useCartStore((s) => s.setStep);
  const carrinhoModalidade = useCartStore((s) => s.carrinho.modalidade);

  const handleSelect = (modalidadeId: ModalidadeId) => {
    setModalidade(modalidadeId);
    setStep("nivel");
  };

  const handleVoltar = () => {
    setStep("home");
  };

  const getPrecoMinimo = (modalidadeId: ModalidadeId) => {
    return precosMatriz.starter[modalidadeId].mensal;
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={handleVoltar}
          className="flex items-center gap-1.5 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Escolha seu Programa de Mentoria
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Selecione a modalidade ideal para o momento do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* PACOTE COMPLETO - Featured */}
        <div
          className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 relative overflow-hidden ${
            carrinhoModalidade === "completo"
              ? "border-blenduca-vermelho shadow-lg"
              : "border-gray-100 hover:border-blenduca-vermelho/50"
          }`}
          onClick={() => handleSelect("completo")}
        >
          <div className="absolute top-0 right-0 bg-blenduca-vermelho text-white text-[10px] font-play font-bold tracking-wider px-3 py-1 rounded-bl-lg">
            TUDO INCLUÍDO
          </div>

          <div className="p-6">
            <div className="text-4xl mb-3">{modalidades.completo.icone}</div>
            <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
              {modalidades.completo.nome}
            </h3>
            <p className="font-kanit text-sm text-blenduca-vermelho font-medium mb-2">
              {modalidades.completo.tagline}
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-4 min-h-[48px]">
              {modalidades.completo.descricao}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Consultoria Individual
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Comunidade & Eventos
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Experience Flix (Plataforma)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Funnel Pages (Funis)
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                A partir de
              </p>
              <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                {formatCurrency(getPrecoMinimo("completo"))}/mês
              </p>
            </div>

            <button
              className="w-full py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: modalidades.completo.cor }}
            >
              Selecionar Pacote Completo
            </button>
          </div>
        </div>

        {/* PACOTE CONSULTORIA */}
        <div
          className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
            carrinhoModalidade === "consultoria"
              ? "border-[#5F5B42] shadow-lg"
              : "border-gray-100 hover:border-[#5F5B42]/50"
          }`}
          onClick={() => handleSelect("consultoria")}
        >
          <div className="p-6">
            <div className="text-4xl mb-3">{modalidades.consultoria.icone}</div>
            <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
              {modalidades.consultoria.nome}
            </h3>
            <p
              className="font-kanit text-sm font-medium mb-2"
              style={{ color: modalidades.consultoria.cor }}
            >
              {modalidades.consultoria.tagline}
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-4 min-h-[48px]">
              {modalidades.consultoria.descricao}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Consultoria Individual
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Comunidade & Eventos
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-gray-300">✗</span>
                <span className="text-gray-400 line-through">
                  Experience Flix
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-gray-300">✗</span>
                <span className="text-gray-400 line-through">Funnel Pages</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                A partir de
              </p>
              <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                {formatCurrency(getPrecoMinimo("consultoria"))}/mês
              </p>
            </div>

            <button
              className="w-full py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: modalidades.consultoria.cor }}
            >
              Selecionar Pacote Consultoria
            </button>

            <p className="font-kanit text-[10px] text-blenduca-cinza-medio text-center mt-3">
              💡 Tecnologia pode ser adicionada depois
            </p>
          </div>
        </div>

        {/* PACOTE COMUNIDADE */}
        <div
          className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
            carrinhoModalidade === "comunidade"
              ? "border-blenduca-azul shadow-lg"
              : "border-gray-100 hover:border-blenduca-azul/50"
          }`}
          onClick={() => handleSelect("comunidade")}
        >
          <div className="p-6">
            <div className="text-4xl mb-3">{modalidades.comunidade.icone}</div>
            <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
              {modalidades.comunidade.nome}
            </h3>
            <p
              className="font-kanit text-sm font-medium mb-2"
              style={{ color: modalidades.comunidade.cor }}
            >
              {modalidades.comunidade.tagline}
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-4 min-h-[48px]">
              {modalidades.comunidade.descricao}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-gray-300">✗</span>
                <span className="text-gray-400 line-through">
                  Consultoria Individual
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Comunidade & Eventos
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Educação (B&apos;Academy)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">✓</span>
                <span className="text-blenduca-grafite">
                  Performance em Grupo
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="font-kanit text-xs text-blenduca-cinza-medio">
                A partir de
              </p>
              <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                {formatCurrency(getPrecoMinimo("comunidade"))}/mês
              </p>
            </div>

            <button
              className="w-full py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: modalidades.comunidade.cor }}
            >
              Selecionar Pacote Comunidade
            </button>

            <p className="font-kanit text-[10px] text-blenduca-cinza-medio text-center mt-3">
              💡 Foco em aprendizado coletivo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
