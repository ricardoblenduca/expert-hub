import jsPDF from "jspdf";
import type { Proposta, NivelId } from "@/types";
import { formatCurrency, formatDate } from "./formatting";
import { modalidades, niveisMap } from "@/data/modalidades";
import { tecnologiaInclusa, upgradeExperienceFlixOpcoes, funisAdicionaisConfig } from "@/data/tecnologiaInclusa";
import { getPilaresParaModalidadeENivel } from "@/data/entregaveis";
import { SERVICOS_EXTRAS } from "@/data/servicosExtras";

const COLORS = {
  grafite: [34, 34, 34] as [number, number, number],
  vermelho: [194, 34, 53] as [number, number, number],
  verde: [34, 139, 34] as [number, number, number],
  azul: [17, 63, 75] as [number, number, number],
  cinza: [102, 102, 102] as [number, number, number],
  cinzaClaro: [234, 227, 220] as [number, number, number],
  branco: [255, 255, 255] as [number, number, number],
  bgLight: [247, 244, 241] as [number, number, number],
};

export async function generateProposalPDF(proposta: Proposta) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  const { carrinho, resumo, cliente, consultor } = proposta;
  const { modalidade, nivel, upgradeExperienceFlix, funisExtras, centralInteligencia, agentes, coprodutor, servicosExtras, descontoMensal, descontoSetup } = carrinho;

  // Helper function to strip emojis for PDF (jsPDF doesn't render emojis well)
  function stripEmoji(text: string): string {
    return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu, "").trim();
  }

  const modalidadeData = modalidade ? modalidades[modalidade] : null;
  const nivelData = nivel ? niveisMap[nivel] : null;
  const techData = nivel && modalidade === "completo" ? tecnologiaInclusa[nivel as NivelId] : null;
  const upgradeFlixInfo = upgradeExperienceFlix && nivel
    ? upgradeExperienceFlixOpcoes.find((u) => u.de === nivel && u.para === upgradeExperienceFlix)
    : null;

  function checkPageBreak(needed: number) {
    if (y + needed > pageHeight - 30) {
      addFooter();
      doc.addPage();
      y = 20;
    }
  }

  // V0.17: Complete footer with 3 lines (email and site)
  function addFooter() {
    doc.setDrawColor(...COLORS.vermelho);
    doc.setLineWidth(0.8);
    doc.line(margin, pageHeight - 24, pageWidth - margin, pageHeight - 24);

    // Line 1: Main phrase
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.vermelho);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Somos a Blenduca, Experts em Negocios de Conhecimento!",
      pageWidth / 2,
      pageHeight - 18,
      { align: "center" }
    );

    // Line 2: Hashtag
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.vermelho);
    doc.setFont("helvetica", "bold");
    doc.text(
      "#OMelhorDeCadaExpert",
      pageWidth / 2,
      pageHeight - 12,
      { align: "center" }
    );

    // Line 3: Website and email
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.vermelho);
    doc.setFont("helvetica", "normal");
    doc.text(
      "blenduca.com.br | comercial@blenduca.com.br",
      pageWidth / 2,
      pageHeight - 6,
      { align: "center" }
    );
  }

  function sectionTitle(title: string) {
    checkPageBreak(15);
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.vermelho);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, y);
    y += 2;
    doc.setDrawColor(...COLORS.cinzaClaro);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  }

  function bodyText(text: string, bold = false, indent = 0) {
    checkPageBreak(6);
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    doc.text(lines, margin + indent, y);
    y += lines.length * 4.5;
  }

  function labelValue(label: string, value: string) {
    checkPageBreak(6);
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text(label, margin, y);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(value, margin + 40, y);
    y += 5;
  }

  function bulletPoint(text: string, indent = 5, color = COLORS.vermelho) {
    checkPageBreak(6);
    doc.setFontSize(8.5);
    doc.setTextColor(...color);
    doc.setFont("helvetica", "normal");
    doc.text("\u2022", margin + indent, y);
    doc.setTextColor(...COLORS.grafite);
    const lines = doc.splitTextToSize(text, contentWidth - indent - 5);
    doc.text(lines, margin + indent + 4, y);
    y += lines.length * 4.5;
  }

  // ========= HEADER =========
  doc.setFillColor(...COLORS.grafite);
  doc.rect(0, 0, pageWidth, 40, "F");

  // Logo "B"
  doc.setFillColor(...COLORS.vermelho);
  doc.roundedRect(margin, 10, 14, 14, 2, 2, "F");
  doc.setTextColor(...COLORS.branco);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("B", margin + 4.2, 21);

  // Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("BLENDUCA", margin + 18, 17);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(160, 160, 160);
  doc.text("EXPERTS EM NEGOCIOS DE CONHECIMENTO", margin + 18, 23);

  // Right side
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.branco);
  doc.setFont("helvetica", "bold");
  doc.text("PROPOSTA COMERCIAL", pageWidth - margin, 15, { align: "right" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 180);
  doc.text(`Data: ${formatDate(proposta.data)}`, pageWidth - margin, 22, {
    align: "right",
  });
  doc.text(
    `Validade: ${formatDate(proposta.validade)}`,
    pageWidth - margin,
    27,
    { align: "right" }
  );
  doc.text(`Consultor: ${consultor}`, pageWidth - margin, 32, {
    align: "right",
  });

  // Red accent line
  doc.setFillColor(...COLORS.vermelho);
  doc.rect(0, 40, pageWidth, 1.5, "F");

  y = 52;

  // ========= DADOS DO CLIENTE =========
  sectionTitle("DADOS DO CLIENTE");
  labelValue("Nome:", cliente.nome);
  if (cliente.empresa) {
    labelValue("Empresa:", cliente.empresa);
  }
  labelValue("Email:", cliente.email);
  labelValue("Telefone:", cliente.telefone);
  if (cliente.faturamentoAtual) {
    labelValue("Faturamento:", cliente.faturamentoAtual);
  }
  y += 4;

  // ========= CONTEXTO E OBJETIVOS =========
  sectionTitle("CONTEXTO E OBJETIVOS");
  const reuniaoDate = cliente.dataReuniao
    ? formatDate(new Date(cliente.dataReuniao + "T12:00:00"))
    : "---";
  bodyText(
    `Apos nossa sessao estrategica realizada em ${reuniaoDate}, identificamos as seguintes necessidades:`
  );
  y += 3;

  bodyText("Objetivos Principais:", true);
  cliente.objetivosPrincipais
    .filter((obj) => obj.trim() !== "")
    .forEach((obj) => {
      bulletPoint(obj);
    });
  y += 2;

  bodyText("Desafios Atuais:", true);
  bodyText(cliente.desafiosAtuais, false, 2);
  y += 2;

  bodyText("Resultado Esperado:", true);
  bodyText(cliente.resultadoEsperado, false, 2);
  y += 4;

  // ========= SOLUCAO PROPOSTA =========
  sectionTitle("SOLUCAO PROPOSTA");

  // V0.17 Updated: Program names, colors, and descriptions
  const PROGRAMAS: Record<string, { nome: string; cor: [number, number, number] }> = {
    starter: { nome: "VIDA DE EXPERT", cor: [194, 34, 53] },        // #C22235 Vermelho
    professional: { nome: "ACELERA EXPERT", cor: [95, 91, 66] },    // #5F5B42 Marrom/Dourado
    business: { nome: "EXPERT BUSINESS", cor: [17, 63, 75] },       // #113F4B Azul petroleo
    scale: { nome: "EXPERT CONSULTING", cor: [34, 34, 34] },        // #222222 Preto/Carvao
  };

  const DESCRICOES_PROGRAMAS: Record<string, string> = {
    starter: "O programa inicial para experts que estao comecando a estruturar seu negocio de conhecimento com base solida e metodologia validada.",
    professional: "O programa de aceleracao para experts que querem crescer rapidamente, escalar sua operacao e conquistar posicionamento de autoridade no mercado.",
    business: "O programa completo para experts que ja possuem estrutura e querem expandir com estrategias avancadas, automacao e gestao profissional do negocio.",
    scale: "O programa premium de consultoria especializada para experts que buscam maxima performance, expansao internacional e criacao de legado duradouro.",
  };

  let sectionNum = 1;

  // V0.17 Updated: Solution Emphasis with dynamic colors
  if (modalidadeData && nivelData && nivel && modalidade) {
    checkPageBreak(35);
    // Dynamic color based on nivel
    const corPrograma = PROGRAMAS[nivel]?.cor || [194, 34, 53];
    doc.setFillColor(...corPrograma);
    doc.roundedRect(margin, y - 2, contentWidth, 28, 2, 2, "F");

    // Badge
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("SOLUCAO PROPOSTA", pageWidth / 2, y + 4, { align: "center" });

    // Program Name
    const programName = PROGRAMAS[nivel]?.nome || "";
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(`${nivelData.nome.toUpperCase()} - ${programName}`, pageWidth / 2, y + 14, { align: "center" });

    // Description - use the custom description
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const descricao = DESCRICOES_PROGRAMAS[nivel] || modalidadeData.descricao;
    const descLines = doc.splitTextToSize(descricao, contentWidth - 20);
    doc.text(descLines.slice(0, 2), pageWidth / 2, y + 22, { align: "center" });

    y += 32;
  }

  // Package - Modalidade + Nivel
  if (modalidadeData && nivelData) {
    checkPageBreak(30);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. ${modalidadeData.id.toUpperCase()} - ${nivelData.nome}`,
      margin + 3,
      y + 4
    );
    y += 12;
    sectionNum++;

    bodyText(modalidadeData.descricao, false, 3);
    y += 2;

    // Pricing
    if (resumo.pacoteEntrada > 0) {
      bodyText(`Taxa de Entrada: ${formatCurrency(resumo.pacoteEntrada)}`, false, 3);
    }
    bodyText(`Investimento Mensal: ${formatCurrency(resumo.pacoteMensal)}/mes`, true, 3);
    y += 3;

    // Features
    const features = [];
    if (modalidadeData.inclui.consultoriaIndividual) features.push("Consultoria Individual");
    if (modalidadeData.inclui.comunidadeEventos) features.push("Comunidade Expert Hub");
    if (modalidadeData.inclui.tecnologiaCompleta) features.push("Tecnologia Inclusa");
    features.forEach((feat) => {
      bulletPoint(feat, 6, COLORS.verde);
    });
    y += 4;
  }

  // Technology included (Pacote Completo only)
  if (modalidade === "completo" && techData) {
    checkPageBreak(40);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. TECNOLOGIA INCLUSA`,
      margin + 3,
      y + 4
    );
    if (resumo.economia > 0) {
      doc.setTextColor(...COLORS.verde);
      doc.setFontSize(8);
      doc.text(
        `(Economia de ${formatCurrency(resumo.economia)}/mes)`,
        margin + 65,
        y + 4
      );
    }
    y += 14;
    sectionNum++;

    // Experience Flix
    bodyText(`Experience Flix - ${techData.experienceFlix.plano}`, true, 3);
    bodyText(techData.experienceFlix.descricao, false, 6);
    techData.experienceFlix.recursos.forEach((rec) => {
      bulletPoint(rec, 6, COLORS.verde);
    });
    y += 3;

    // Funnel Pages
    bodyText(`Funnel Pages - ${techData.funnelPages.plano}`, true, 3);
    bodyText(techData.funnelPages.descricao, false, 6);
    techData.funnelPages.funis.forEach((funil) => {
      bulletPoint(funil, 6, COLORS.verde);
    });
    y += 3;

    // Genius AI (Scale only)
    if (techData.geniusAI) {
      bodyText(`Genius A.I - ${techData.geniusAI.plano}`, true, 3);
      bodyText(techData.geniusAI.descricao, false, 6);
      techData.geniusAI.recursos.forEach((rec) => {
        bulletPoint(rec, 6, COLORS.azul);
      });
      y += 3;
    }
    y += 2;
  }

  // Upgrades
  if (resumo.upgradeFlixMensal > 0 || resumo.funisExtrasMensal > 0) {
    checkPageBreak(20);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. UPGRADES`,
      margin + 3,
      y + 4
    );
    y += 14;
    sectionNum++;

    if (upgradeFlixInfo) {
      bodyText("Upgrade Experience Flix", true, 3);
      bodyText(upgradeFlixInfo.descricao, false, 6);
      bodyText(`Investimento: +${formatCurrency(resumo.upgradeFlixMensal)}/mes`, false, 6);
      y += 2;
    }

    if (funisExtras > 0) {
      bodyText(`${funisExtras} Funis Adicionais`, true, 3);
      bodyText(funisAdicionaisConfig.observacao, false, 6);
      bodyText(`Investimento: +${formatCurrency(resumo.funisExtrasMensal)}/mes`, false, 6);
      y += 2;
    }
    y += 2;
  }

  // AI Agents
  if (agentes.length > 0) {
    checkPageBreak(20);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. AGENTES A.I`,
      margin + 3,
      y + 4
    );
    y += 14;
    sectionNum++;

    agentes.forEach((item) => {
      checkPageBreak(30);
      bodyText(`${item.agente.nome}`, true, 3);
      bodyText(item.agente.descricao, false, 6);
      y += 1;

      // Setup and monthly
      bodyText(`Setup: ${formatCurrency(item.setupTotal)}`, false, 6);

      // Extras
      if ((item.acoesExtras ?? 0) > 0) {
        bodyText(`Acoes Extras: ${item.acoesExtras}x`, false, 6);
      }
      if ((item.integracoesExtras ?? 0) > 0) {
        bodyText(`Integracoes Extras: ${item.integracoesExtras}x`, false, 6);
      }
      if ((item.numerosExtras ?? 0) > 0) {
        bodyText(`Numeros Extras: ${item.numerosExtras}x`, false, 6);
      }
      if (item.prospeccaoAtiva) {
        bodyText("Prospeccao Ativa: Incluso", false, 6);
      }

      bodyText(`Mensal: ${formatCurrency(item.mensalTotal)}/mes`, true, 6);
      y += 2;

      // Deliverables
      item.agente.entregaveis.forEach((ent) => {
        bulletPoint(ent, 6);
      });
      y += 3;
    });
  }

  // Co-produtor section V0.12: sem calculo de comissao
  if (coprodutor?.ativo) {
    checkPageBreak(25);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. CO-PRODUTOR`,
      margin + 3,
      y + 4
    );
    y += 14;
    sectionNum++;

    bodyText(`Nome: ${coprodutor.nome || "Nao informado"}`, false, 3);
    if (coprodutor.email) {
      bodyText(`Email: ${coprodutor.email}`, false, 3);
    }
    bodyText(`Percentual de Comissao: ${coprodutor.percentualComissao}%`, false, 3);

    if (coprodutor.observacoes) {
      y += 2;
      bodyText(`Observacoes: ${coprodutor.observacoes}`, false, 3);
    }
    y += 2;
    bodyText("Os detalhes da parceria serao tratados separadamente.", false, 3);
    y += 4;
  }

  // Central de Inteligencia V0.12 (V0.14: detailed info with extras)
  if (centralInteligencia?.pacoteSelecionado) {
    checkPageBreak(40);
    doc.setFillColor(240, 248, 255); // Light blue
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. CENTRAL DE INTELIGENCIA`,
      margin + 3,
      y + 4
    );
    y += 14;
    sectionNum++;

    bodyText("Assistentes de IA personalizados para automatizar processos e potencializar resultados do seu negocio.", false, 3);
    y += 2;

    const baseAssistentes = centralInteligencia.pacoteSelecionado === "pacote_5" ? 5 : 10;
    const pacoteNome = centralInteligencia.pacoteSelecionado === "pacote_5"
      ? "5 Assistentes"
      : "10 Assistentes";

    bodyText(`Pacote Base: ${pacoteNome}`, false, 3);

    if (centralInteligencia.assistentesExtras > 0) {
      bodyText(`Assistentes Extras: +${centralInteligencia.assistentesExtras} assistentes`, false, 3);
    }

    const totalAssistentes = baseAssistentes + centralInteligencia.assistentesExtras;
    bodyText(`Total de Assistentes: ${totalAssistentes}`, true, 3);
    bodyText(`Investimento (Setup): ${formatCurrency(resumo.centralInteligenciaSetup)}`, true, 3);
    y += 2;

    // Features
    const features = [
      "Assistentes de IA personalizados",
      "Integracao com Experience Flix",
      "Treinamento incluido",
      "Suporte na configuracao",
    ];
    features.forEach((feat) => {
      bulletPoint(feat, 6, COLORS.azul);
    });
    y += 4;
  }

  // Servicos Extras V0.18
  if (resumo.servicosExtrasTotal > 0 && nivel) {
    checkPageBreak(35);
    doc.setFillColor(255, 237, 213); // Light orange
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. SERVICOS EXTRAS`,
      margin + 3,
      y + 4
    );
    y += 14;
    sectionNum++;

    bodyText("Servicos adicionais para potencializar os resultados do seu negocio de conhecimento.", false, 3);
    y += 2;

    if (servicosExtras.expertPlanning) {
      bodyText(SERVICOS_EXTRAS.expertPlanning.nome, true, 3);
      bodyText(SERVICOS_EXTRAS.expertPlanning.descricao, false, 6);
      bodyText(`Investimento: ${formatCurrency(SERVICOS_EXTRAS.expertPlanning.precos[nivel])} (unico)`, true, 6);
      y += 2;
    }

    if (servicosExtras.sessaoMentoriaQtd > 0) {
      bodyText(`${servicosExtras.sessaoMentoriaQtd}x ${SERVICOS_EXTRAS.sessaoMentoria.nome}`, true, 3);
      bodyText(SERVICOS_EXTRAS.sessaoMentoria.descricao, false, 6);
      bodyText(
        `Investimento: ${servicosExtras.sessaoMentoriaQtd}x ${formatCurrency(SERVICOS_EXTRAS.sessaoMentoria.precos[nivel])} = ${formatCurrency(SERVICOS_EXTRAS.sessaoMentoria.precos[nivel] * servicosExtras.sessaoMentoriaQtd)}`,
        true,
        6
      );
      y += 2;
    }

    bodyText(`Total Servicos Extras: ${formatCurrency(resumo.servicosExtrasTotal)}`, true, 3);
    y += 4;
  }

  // ========= ENTREGAVEIS DO PACOTE =========
  if (nivel && modalidade) {
    y += 2;
    sectionTitle(`ENTREGAVEIS DO PACOTE ${nivelData?.nome || ""}`);

    // Filter pilares by modalidade AND nivel
    const pilaresVisiveis = getPilaresParaModalidadeENivel(modalidade, nivel as NivelId);

    pilaresVisiveis.forEach((pilar) => {
      // Already filtered by modalidade and nivel
      if (pilar.entregaveis.length === 0) return;

      // Pilar header
      checkPageBreak(15);
      doc.setFillColor(...COLORS.bgLight);
      doc.roundedRect(margin, y - 2, contentWidth, 8, 1, 1, "F");
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.grafite);
      doc.setFont("helvetica", "bold");
      doc.text(`${stripEmoji(pilar.nome)}`, margin + 3, y + 3);
      y += 10;

      // Entregaveis
      pilar.entregaveis.forEach((entregavel) => {
        checkPageBreak(25);

        // Nome
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.grafite);
        doc.setFont("helvetica", "bold");
        doc.text(`${stripEmoji(entregavel.nome)}`, margin + 3, y);
        y += 4;

        // Descricao
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.cinza);
        doc.setFont("helvetica", "normal");
        const descLines = doc.splitTextToSize(entregavel.descricao, contentWidth - 6);
        doc.text(descLines, margin + 3, y);
        y += descLines.length * 3.5 + 2;

        // Significado (highlighted)
        checkPageBreak(15);
        doc.setFillColor(255, 249, 240);
        const sigLines = doc.splitTextToSize(entregavel.significado, contentWidth - 12);
        const sigHeight = sigLines.length * 3.5 + 6;
        doc.roundedRect(margin + 3, y - 2, contentWidth - 6, sigHeight, 1, 1, "F");
        doc.setDrawColor(255, 193, 7);
        doc.setLineWidth(0.8);
        doc.line(margin + 3, y - 2, margin + 3, y - 2 + sigHeight);

        doc.setFontSize(7);
        doc.setTextColor(180, 120, 0);
        doc.setFont("helvetica", "bold");
        doc.text("O QUE ISSO SIGNIFICA PARA VOCE:", margin + 6, y + 2);
        y += 5;

        doc.setFontSize(8);
        doc.setTextColor(...COLORS.grafite);
        doc.setFont("helvetica", "normal");
        doc.text(sigLines, margin + 6, y);
        y += sigLines.length * 3.5 + 4;

        // Detalhes do nivel
        if (entregavel.detalhesNivel?.[nivel as NivelId]) {
          checkPageBreak(12);
          doc.setFillColor(240, 248, 255);
          const detLines = doc.splitTextToSize(
            entregavel.detalhesNivel[nivel as NivelId]!,
            contentWidth - 12
          );
          const detHeight = Math.min(detLines.length * 3.5 + 6, 25);
          doc.roundedRect(margin + 3, y - 2, contentWidth - 6, detHeight, 1, 1, "F");

          doc.setFontSize(7);
          doc.setTextColor(17, 63, 75);
          doc.setFont("helvetica", "bold");
          doc.text(`NO SEU NIVEL (${nivelData?.nome || ""}):`, margin + 6, y + 2);
          y += 5;

          doc.setFontSize(8);
          doc.setTextColor(...COLORS.grafite);
          doc.setFont("helvetica", "normal");
          doc.text(detLines.slice(0, 5), margin + 6, y);
          y += Math.min(detLines.length, 5) * 3.5 + 4;
        }

        y += 2;
      });

      y += 4;
    });
  }

  // V0.17: Page break before INVESTIMENTO
  addFooter();
  doc.addPage();
  y = 20;

  // ========= INVESTIMENTO - V0.16: Compact Layout =========
  sectionTitle("INVESTIMENTO");

  // V0.16: Calculate compact box height (reduced spacing)
  let boxHeight = 16; // Reduced base
  if (resumo.subtotalSetup > 0) boxHeight += 18; // Reduced from 24
  if (resumo.centralInteligenciaSetup > 0) boxHeight += 5; // Reduced from 6
  if (resumo.servicosExtrasTotal > 0) boxHeight += (servicosExtras.expertPlanning ? 5 : 0) + (servicosExtras.sessaoMentoriaQtd > 0 ? 5 : 0); // V0.18
  if (resumo.valorDescontoSetup > 0) boxHeight += 10; // Reduced from 12
  if (resumo.totalUpgradesMensal > 0) boxHeight += 5;
  if (resumo.agentesMensal > 0) boxHeight += 5;
  if (resumo.valorDescontoMensal > 0) boxHeight += 10; // Reduced from 14
  if (resumo.economia > 0) boxHeight += 5;
  if (resumo.economiaAnualTotal > 0) boxHeight += 10; // V0.16: economia total with details

  checkPageBreak(boxHeight + 5);
  const boxY = y - 2;
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, boxY, contentWidth, boxHeight, 2, 2, "F");
  doc.setDrawColor(...COLORS.cinzaClaro);
  doc.roundedRect(margin, boxY, contentWidth, boxHeight, 2, 2, "S");

  const boxMargin = margin + 4; // Reduced margin
  const boxRight = pageWidth - margin - 4;

  // Initial investment V0.16: Compact
  if (resumo.subtotalSetup > 0) {
    doc.setFontSize(7); // Reduced from 8
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "bold");
    doc.text("INVESTIMENTO INICIAL", boxMargin, y + 3);
    y += 5; // Reduced from 7

    if (resumo.totalEntrada > 0) {
      doc.setFontSize(8); // Reduced from 9
      doc.setTextColor(...COLORS.cinza);
      doc.setFont("helvetica", "normal");
      doc.text("Taxa de Entrada:", boxMargin, y + 3);
      doc.setTextColor(...COLORS.grafite);
      doc.setFont("helvetica", "bold");
      doc.text(formatCurrency(resumo.totalEntrada), boxRight, y + 3, { align: "right" });
      y += 5;
    }

    if (resumo.centralInteligenciaSetup > 0) {
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.cinza);
      doc.setFont("helvetica", "normal");
      doc.text(`Central Inteligencia (${resumo.centralInteligenciaQuantidade}):`, boxMargin, y + 3);
      doc.setTextColor(...COLORS.azul);
      doc.setFont("helvetica", "bold");
      doc.text(formatCurrency(resumo.centralInteligenciaSetup), boxRight, y + 3, { align: "right" });
      y += 5;
    }

    if (resumo.agentesSetup > 0) {
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.cinza);
      doc.setFont("helvetica", "normal");
      doc.text("Setup Agentes A.I:", boxMargin, y + 3);
      doc.setTextColor(...COLORS.grafite);
      doc.setFont("helvetica", "bold");
      doc.text(formatCurrency(resumo.agentesSetup), boxRight, y + 3, { align: "right" });
      y += 5;
    }

    // Servicos Extras V0.18
    if (resumo.servicosExtrasTotal > 0 && nivel) {
      if (servicosExtras.expertPlanning) {
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.cinza);
        doc.setFont("helvetica", "normal");
        doc.text("Expert Planning Anual:", boxMargin, y + 3);
        doc.setTextColor(180, 80, 0); // orange
        doc.setFont("helvetica", "bold");
        doc.text(formatCurrency(SERVICOS_EXTRAS.expertPlanning.precos[nivel]), boxRight, y + 3, { align: "right" });
        y += 5;
      }
      if (servicosExtras.sessaoMentoriaQtd > 0) {
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.cinza);
        doc.setFont("helvetica", "normal");
        doc.text(`Sessoes de Mentoria (${servicosExtras.sessaoMentoriaQtd}x):`, boxMargin, y + 3);
        doc.setTextColor(180, 80, 0); // orange
        doc.setFont("helvetica", "bold");
        doc.text(formatCurrency(SERVICOS_EXTRAS.sessaoMentoria.precos[nivel] * servicosExtras.sessaoMentoriaQtd), boxRight, y + 3, { align: "right" });
        y += 5;
      }
    }

    // Desconto Setup V0.16: Compact
    if (resumo.valorDescontoSetup > 0) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(boxMargin, y + 1, boxRight, y + 1);
      y += 3;

      doc.setFontSize(8);
      doc.setTextColor(...COLORS.cinza);
      doc.setFont("helvetica", "normal");
      doc.text("Subtotal:", boxMargin, y + 3);
      doc.setTextColor(...COLORS.grafite);
      doc.setFont("helvetica", "bold");
      doc.text(formatCurrency(resumo.subtotalSetup), boxRight, y + 3, { align: "right" });
      y += 5;

      // Desconto Setup label
      let descontoSetupLabel = "Desc. Setup";
      if (descontoSetup.tipo === "percentual") descontoSetupLabel += ` (${descontoSetup.valor}%)`;
      if (resumo.motivoDescontoSetup) descontoSetupLabel += `: ${resumo.motivoDescontoSetup}`;

      doc.setFontSize(8);
      doc.setTextColor(128, 0, 128);
      doc.setFont("helvetica", "bold");
      doc.text(descontoSetupLabel, boxMargin, y + 3);
      doc.text(`-${formatCurrency(resumo.valorDescontoSetup)}`, boxRight, y + 3, { align: "right" });
      y += 5;
    }

    // Total initial
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(boxMargin, y + 1, boxRight, y + 1);
    y += 3;

    doc.setFontSize(9);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text("Total Inicial:", boxMargin, y + 3);
    const totalInicial = resumo.valorDescontoSetup > 0 ? resumo.totalInicialComDesconto : resumo.subtotalSetup;
    doc.text(formatCurrency(totalInicial), boxRight, y + 3, { align: "right" });
    y += 6;
  }

  // Monthly investment V0.16: Compact
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.cinza);
  doc.setFont("helvetica", "bold");
  doc.text("INVESTIMENTO MENSAL", boxMargin, y + 3);
  y += 5;

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.cinza);
  doc.setFont("helvetica", "normal");
  doc.text("Pacote Base:", boxMargin, y + 3);
  doc.setTextColor(...COLORS.grafite);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(resumo.pacoteMensal), boxRight, y + 3, { align: "right" });
  y += 5;

  if (resumo.totalUpgradesMensal > 0) {
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Upgrades:", boxMargin, y + 3);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.totalUpgradesMensal), boxRight, y + 3, { align: "right" });
    y += 5;
  }

  if (resumo.agentesMensal > 0) {
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Agentes A.I:", boxMargin, y + 3);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.agentesMensal), boxRight, y + 3, { align: "right" });
    y += 5;
  }

  // Subtotal and Desconto Mensal V0.16: Compact
  if (resumo.valorDescontoMensal > 0) {
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(boxMargin, y + 1, boxRight, y + 1);
    y += 3;

    doc.setFontSize(8);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal Mensal:", boxMargin, y + 3);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.subtotalMensal), boxRight, y + 3, { align: "right" });
    y += 5;

    // Desconto Mensal label
    let descontoLabel = "Desc. Mensal";
    if (descontoMensal.tipo === "percentual") descontoLabel += ` (${descontoMensal.valor}%)`;
    if (resumo.motivoDescontoMensal) descontoLabel += `: ${resumo.motivoDescontoMensal}`;

    doc.setFontSize(8);
    doc.setTextColor(...COLORS.verde);
    doc.setFont("helvetica", "bold");
    doc.text(descontoLabel, boxMargin, y + 3);
    doc.text(`-${formatCurrency(resumo.valorDescontoMensal)}`, boxRight, y + 3, { align: "right" });
    y += 5;
  }

  // Final total separator
  doc.setDrawColor(...COLORS.grafite);
  doc.setLineWidth(0.6);
  doc.line(boxMargin, y + 1, boxRight, y + 1);
  y += 4;

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.grafite);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL MENSAL:", boxMargin, y + 3);
  doc.setTextColor(...COLORS.vermelho);
  doc.setFontSize(12);
  doc.text(formatCurrency(resumo.totalMensal), boxRight, y + 3, { align: "right" });
  y += 5;

  doc.setFontSize(7);
  doc.setTextColor(...COLORS.cinza);
  doc.setFont("helvetica", "normal");
  doc.text("Total Anual (12x):", boxMargin, y + 3);
  doc.setTextColor(...COLORS.grafite);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(resumo.totalAnual), boxRight, y + 3, { align: "right" });
  y += 5;

  if (resumo.economia > 0) {
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.verde);
    doc.setFont("helvetica", "normal");
    doc.text("Economia (Tecnologia):", boxMargin, y + 3);
    doc.setFont("helvetica", "bold");
    doc.text(`${formatCurrency(resumo.economia)}/mes`, boxRight, y + 3, { align: "right" });
    y += 5;
  }

  // V0.16: Economia Total Anual with detailing
  if (resumo.economiaAnualTotal > 0) {
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(boxMargin - 2, y, boxRight - boxMargin + 4, 9, 1, 1, "F");
    doc.setFontSize(8);
    doc.setTextColor(21, 128, 61);
    doc.setFont("helvetica", "bold");

    // Detail line (compact)
    let detailText = "ECONOMIA TOTAL ANUAL";
    if (resumo.valorDescontoSetup > 0 && resumo.economiaAnualDescontoMensal > 0) {
      detailText += ` (Setup + 12x Mensal)`;
    }
    doc.text(detailText + ":", boxMargin, y + 6);
    doc.text(formatCurrency(resumo.economiaAnualTotal), boxRight, y + 6, { align: "right" });
    y += 10;
  }

  y = boxY + boxHeight + 4;

  // V0.17: Page break before CONDIÇÕES COMERCIAIS
  addFooter();
  doc.addPage();
  y = 20;

  // ========= CONDICOES COMERCIAIS =========
  sectionTitle("CONDICOES COMERCIAIS");

  bulletPoint("Duracao: Contrato de 12 meses");
  bulletPoint("Periodo Minimo: 6 meses");
  bulletPoint("Aviso Previo: 30 dias");
  bulletPoint("Multa por Rescisao Antecipada: 20% das parcelas restantes (primeiro ano)");
  if (carrinho.condicaoPagamento === "revenue_share") {
    let revenueText = "Condicao Especial: Revenue Share";
    if (carrinho.revenueShareObservacoes) {
      revenueText += ` - ${carrinho.revenueShareObservacoes}`;
    }
    bulletPoint(revenueText);
  }
  y += 4;

  // ========= PROXIMOS PASSOS =========
  sectionTitle("PROXIMOS PASSOS");

  const steps = [
    "Aprovacao da proposta",
    "Assinatura do contrato",
    "Onboarding e kick-off",
    "Inicio da implementacao",
  ];
  steps.forEach((step, i) => {
    checkPageBreak(6);
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.vermelho);
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}.`, margin + 3, y);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "normal");
    doc.text(step, margin + 10, y);
    y += 5;
  });

  // Final footer
  addFooter();

  // Save
  const fileName = `Proposta_${cliente.nome.replace(/\s+/g, "_")}_${formatDate(proposta.data).replace(/\//g, "-")}.pdf`;
  doc.save(fileName);
}
