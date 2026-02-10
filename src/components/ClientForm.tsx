"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/useCartStore";
import { formatPhone } from "@/utils/formatting";

const OBJETIVOS_OPTIONS = [
  "Aumentar faturamento",
  "Estruturar negocio",
  "Escalar operacao",
  "Criar produtos digitais",
  "Posicionamento de marca",
  "Automatizar processos",
];

const clienteSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no minimo 3 caracteres"),
  empresa: z.string().optional(),
  email: z.string().email("Email invalido"),
  telefone: z.string().min(14, "Telefone invalido"),
  dataReuniao: z.string().min(1, "Data da reuniao e obrigatoria"),
  objetivosPrincipais: z
    .array(z.string())
    .min(1, "Selecione ao menos um objetivo"),
  desafiosAtuais: z
    .string()
    .min(10, "Descreva os desafios com mais detalhes"),
  resultadoEsperado: z
    .string()
    .min(10, "Descreva o resultado esperado"),
  faturamentoAtual: z.string().optional(),
  observacoes: z.string().optional(),
  prazoImplementacao: z.string().optional(),
  condicoesEspeciais: z.string().optional(),
  consultor: z.string().min(2, "Nome do consultor e obrigatorio"),
});

type FormData = z.infer<typeof clienteSchema>;

export default function ClientForm() {
  const setDadosCliente = useCartStore((s) => s.setDadosCliente);
  const setConsultor = useCartStore((s) => s.setConsultor);
  const setStep = useCartStore((s) => s.setStep);
  const dadosCliente = useCartStore((s) => s.dadosCliente);
  const consultor = useCartStore((s) => s.consultor);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: dadosCliente.nome,
      empresa: dadosCliente.empresa,
      email: dadosCliente.email,
      telefone: dadosCliente.telefone,
      dataReuniao: dadosCliente.dataReuniao,
      objetivosPrincipais: dadosCliente.objetivosPrincipais,
      desafiosAtuais: dadosCliente.desafiosAtuais,
      resultadoEsperado: dadosCliente.resultadoEsperado,
      faturamentoAtual: dadosCliente.faturamentoAtual,
      observacoes: dadosCliente.observacoes,
      prazoImplementacao: dadosCliente.prazoImplementacao,
      condicoesEspeciais: dadosCliente.condicoesEspeciais,
      consultor: consultor,
    },
  });

  const selectedObjetivos = watch("objetivosPrincipais") || [];

  const onSubmit = (data: FormData) => {
    setDadosCliente({
      nome: data.nome,
      empresa: data.empresa || "",
      email: data.email,
      telefone: data.telefone,
      dataReuniao: data.dataReuniao,
      objetivosPrincipais: data.objetivosPrincipais,
      desafiosAtuais: data.desafiosAtuais,
      resultadoEsperado: data.resultadoEsperado,
      faturamentoAtual: data.faturamentoAtual || "",
      observacoes: data.observacoes || "",
      prazoImplementacao: data.prazoImplementacao || "",
      condicoesEspeciais: data.condicoesEspeciais || "",
    });
    setConsultor(data.consultor);
    setStep("preview");
  };

  const toggleObjetivo = (obj: string) => {
    const current = selectedObjetivos;
    const next = current.includes(obj)
      ? current.filter((o) => o !== obj)
      : [...current, obj];
    setValue("objetivosPrincipais", next, { shouldValidate: true });
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <button
          onClick={() => setStep("agentes")}
          className="flex items-center gap-1.5 text-sm font-kanit text-blenduca-cinza-medio hover:text-blenduca-grafite transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar aos agentes
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="font-kanit font-bold text-2xl text-blenduca-grafite mb-1">
          Dados do Cliente
        </h2>
        <p className="font-kanit text-sm text-blenduca-cinza-medio mb-6">
          Preencha as informacoes para gerar a proposta comercial
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Consultant */}
          <div className="bg-blenduca-cinza/30 rounded-lg p-4">
            <label
              htmlFor="consultor"
              className="block font-kanit font-semibold text-sm text-blenduca-grafite mb-1.5"
            >
              Nome do Consultor *
            </label>
            <input
              id="consultor"
              {...register("consultor")}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all"
              placeholder="Seu nome"
            />
            {errors.consultor && (
              <p className="text-xs font-kanit text-red-500 mt-1">
                {errors.consultor.message}
              </p>
            )}
          </div>

          {/* Client info */}
          <fieldset>
            <legend className="font-kanit font-semibold text-base text-blenduca-grafite mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-blenduca-vermelho text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              Informacoes do Cliente
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Nome Completo *
                </label>
                <input
                  id="nome"
                  {...register("nome")}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all"
                  placeholder="Nome do cliente"
                />
                {errors.nome && (
                  <p className="text-xs font-kanit text-red-500 mt-1">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="empresa" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Empresa
                </label>
                <input
                  id="empresa"
                  {...register("empresa")}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all"
                  placeholder="email@exemplo.com"
                />
                {errors.email && (
                  <p className="text-xs font-kanit text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="telefone" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Telefone *
                </label>
                <Controller
                  name="telefone"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="telefone"
                      {...field}
                      onChange={(e) => field.onChange(formatPhone(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all"
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                    />
                  )}
                />
                {errors.telefone && (
                  <p className="text-xs font-kanit text-red-500 mt-1">{errors.telefone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="faturamentoAtual" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Faturamento Atual
                </label>
                <input
                  id="faturamentoAtual"
                  {...register("faturamentoAtual")}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all"
                  placeholder="Ex: R$ 30.000/mes"
                />
              </div>

              <div>
                <label htmlFor="dataReuniao" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Data da Reuniao *
                </label>
                <input
                  id="dataReuniao"
                  type="date"
                  {...register("dataReuniao")}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all"
                />
                {errors.dataReuniao && (
                  <p className="text-xs font-kanit text-red-500 mt-1">{errors.dataReuniao.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Strategic session */}
          <fieldset>
            <legend className="font-kanit font-semibold text-base text-blenduca-grafite mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-blenduca-vermelho text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              Sessao Estrategica
            </legend>

            <div className="space-y-4">
              {/* Objectives */}
              <div>
                <label className="block font-kanit text-sm text-blenduca-cinza-medio mb-2">
                  Objetivos Principais *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OBJETIVOS_OPTIONS.map((obj) => (
                    <button
                      key={obj}
                      type="button"
                      onClick={() => toggleObjetivo(obj)}
                      className={`px-3 py-2 rounded-lg border text-left text-sm font-kanit transition-all ${
                        selectedObjetivos.includes(obj)
                          ? "border-blenduca-vermelho bg-blenduca-vermelho/5 text-blenduca-vermelho"
                          : "border-gray-200 text-blenduca-cinza-medio hover:border-gray-300"
                      }`}
                    >
                      <span className="mr-2">
                        {selectedObjetivos.includes(obj) ? "✓" : "○"}
                      </span>
                      {obj}
                    </button>
                  ))}
                </div>
                {errors.objetivosPrincipais && (
                  <p className="text-xs font-kanit text-red-500 mt-1">
                    {errors.objetivosPrincipais.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="desafiosAtuais" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Desafios Atuais *
                </label>
                <textarea
                  id="desafiosAtuais"
                  {...register("desafiosAtuais")}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all resize-none"
                  placeholder="Descreva os principais desafios identificados..."
                />
                {errors.desafiosAtuais && (
                  <p className="text-xs font-kanit text-red-500 mt-1">{errors.desafiosAtuais.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="resultadoEsperado" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Resultado Esperado *
                </label>
                <textarea
                  id="resultadoEsperado"
                  {...register("resultadoEsperado")}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-vermelho/30 focus:border-blenduca-vermelho transition-all resize-none"
                  placeholder="Qual resultado o cliente espera alcançar..."
                />
                {errors.resultadoEsperado && (
                  <p className="text-xs font-kanit text-red-500 mt-1">{errors.resultadoEsperado.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Internal notes */}
          <fieldset>
            <legend className="font-kanit font-semibold text-base text-blenduca-grafite mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-blenduca-azul text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              Notas Internas
              <span className="text-xs font-normal text-blenduca-cinza-medio">(nao aparece no PDF)</span>
            </legend>

            <div className="space-y-4">
              <div>
                <label htmlFor="observacoes" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                  Observacoes
                </label>
                <textarea
                  id="observacoes"
                  {...register("observacoes")}
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-azul/30 focus:border-blenduca-azul transition-all resize-none"
                  placeholder="Notas privadas do consultor..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prazoImplementacao" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                    Prazo de Implementacao
                  </label>
                  <input
                    id="prazoImplementacao"
                    {...register("prazoImplementacao")}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-azul/30 focus:border-blenduca-azul transition-all"
                    placeholder="Ex: 30 dias"
                  />
                </div>
                <div>
                  <label htmlFor="condicoesEspeciais" className="block font-kanit text-sm text-blenduca-cinza-medio mb-1">
                    Condicoes Especiais
                  </label>
                  <input
                    id="condicoesEspeciais"
                    {...register("condicoesEspeciais")}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 font-kanit text-sm text-blenduca-grafite focus:outline-none focus:ring-2 focus:ring-blenduca-azul/30 focus:border-blenduca-azul transition-all"
                    placeholder="Ex: Desconto especial"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setStep("agentes")}
              className="px-6 py-3 rounded-lg border border-gray-200 font-kanit font-semibold text-sm text-blenduca-cinza-medio hover:bg-gray-50 transition-all"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-blenduca-vermelho text-white font-kanit font-semibold text-sm hover:bg-blenduca-vermelho-dark shadow-lg shadow-blenduca-vermelho/20 transition-all cursor-pointer"
            >
              Gerar Proposta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
