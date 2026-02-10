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

  const getPrecoMinimo = (modalidadeId: ModalidadeId) => {
    return precosMatriz.starter[modalidadeId].mensal;
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="font-kanit font-bold text-2xl md:text-3xl text-blenduca-grafite mb-2">
          Como voce quer estruturar seu investimento?
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio">
          Escolha a modalidade ideal para o momento do seu negocio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* EXPERT - Featured */}
        <div
          className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 relative overflow-hidden ${
            carrinhoModalidade === "expert"
              ? "border-blenduca-vermelho shadow-lg"
              : "border-gray-100 hover:border-blenduca-vermelho/50"
          }`}
          onClick={() => handleSelect("expert")}
        >
          <div className="absolute top-0 right-0 bg-blenduca-vermelho text-white text-[10px] font-play font-bold tracking-wider px-3 py-1 rounded-bl-lg">
            MAIS COMPLETO
          </div>

          <div className="p-6">
            <div className="text-4xl mb-3">{modalidades.expert.icone}</div>
            <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
              EXPERT
            </h3>
            <p className="font-kanit text-sm text-blenduca-vermelho font-medium mb-2">
              Programa Completo
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-4 min-h-[40px]">
              {modalidades.expert.descricao}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Consultoria Individual</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Comunidade & Eventos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Experience Flix (Plataforma)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Funnel Pages (Funis)</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="font-kanit text-xs text-blenduca-cinza-medio">A partir de</p>
              <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                {formatCurrency(getPrecoMinimo("expert"))}/mes
              </p>
            </div>

            <button
              className="w-full py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: modalidades.expert.cor }}
            >
              Selecionar EXPERT
            </button>
          </div>
        </div>

        {/* EXPER */}
        <div
          className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
            carrinhoModalidade === "exper"
              ? "border-blenduca-verde shadow-lg"
              : "border-gray-100 hover:border-blenduca-verde/50"
          }`}
          onClick={() => handleSelect("exper")}
        >
          <div className="p-6">
            <div className="text-4xl mb-3">{modalidades.exper.icone}</div>
            <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
              EXPER
            </h3>
            <p className="font-kanit text-sm font-medium mb-2" style={{ color: modalidades.exper.cor }}>
              Sem Tecnologia
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-4 min-h-[40px]">
              {modalidades.exper.descricao}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Consultoria Individual</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Comunidade & Eventos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-gray-300">&#10007;</span>
                <span className="text-gray-400 line-through">Experience Flix</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-gray-300">&#10007;</span>
                <span className="text-gray-400 line-through">Funnel Pages</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="font-kanit text-xs text-blenduca-cinza-medio">A partir de</p>
              <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                {formatCurrency(getPrecoMinimo("exper"))}/mes
              </p>
            </div>

            <button
              className="w-full py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: modalidades.exper.cor }}
            >
              Selecionar EXPER
            </button>

            <p className="font-kanit text-[10px] text-blenduca-cinza-medio text-center mt-3">
              💡 Tecnologia pode ser adicionada depois
            </p>
          </div>
        </div>

        {/* XPER */}
        <div
          className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
            carrinhoModalidade === "xper"
              ? "border-blenduca-azul shadow-lg"
              : "border-gray-100 hover:border-blenduca-azul/50"
          }`}
          onClick={() => handleSelect("xper")}
        >
          <div className="p-6">
            <div className="text-4xl mb-3">{modalidades.xper.icone}</div>
            <h3 className="font-kanit font-bold text-xl text-blenduca-grafite">
              XPER
            </h3>
            <p className="font-kanit text-sm font-medium mb-2" style={{ color: modalidades.xper.cor }}>
              Acesso a Comunidade
            </p>
            <p className="font-kanit text-xs text-blenduca-cinza-medio mb-4 min-h-[40px]">
              {modalidades.xper.descricao}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-gray-300">&#10007;</span>
                <span className="text-gray-400 line-through">Consultoria Individual</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Comunidade & Eventos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Educacao (B&#39;Academy)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-kanit">
                <span className="text-green-500">&#10003;</span>
                <span className="text-blenduca-grafite">Performance em Grupo</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="font-kanit text-xs text-blenduca-cinza-medio">A partir de</p>
              <p className="font-kanit font-bold text-xl text-blenduca-grafite">
                {formatCurrency(getPrecoMinimo("xper"))}/mes
              </p>
            </div>

            <button
              className="w-full py-2.5 rounded-lg font-kanit font-semibold text-sm text-white transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: modalidades.xper.cor }}
            >
              Selecionar XPER
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
