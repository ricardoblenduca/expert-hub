import jsPDF from "jspdf";
import type { Proposta, NivelId } from "@/types";
import { formatCurrency, formatDate } from "./formatting";
import { modalidades, niveisMap } from "@/data/modalidades";
import { tecnologiaInclusa, upgradeExperienceFlixOpcoes, funisAdicionaisConfig } from "@/data/tecnologiaInclusa";
import { pilares, entregavelDisponivelNoNivel } from "@/data/entregaveis";

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
  const { modalidade, nivel, upgradeExperienceFlix, funisExtras, agentes, coprodutor } = carrinho;

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

  function addFooter() {
    doc.setDrawColor(...COLORS.cinzaClaro);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.cinza);
    doc.text(
      "Blenduca - Experts em Negocios de Conhecimento | blenduca.com | contato@blenduca.com",
      pageWidth / 2,
      pageHeight - 10,
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

  let sectionNum = 1;

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

  // Co-produtor section
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
    bodyText(`Comissao Estimada: ${formatCurrency(resumo.coprodutorComissao)}/mes`, true, 3);

    if (coprodutor.observacoes) {
      y += 2;
      bodyText(`Observacoes: ${coprodutor.observacoes}`, false, 3);
    }
    y += 4;
  }

  // ========= ENTREGAVEIS DO PACOTE =========
  if (nivel) {
    y += 2;
    sectionTitle(`ENTREGAVEIS DO PACOTE ${nivelData?.nome || ""}`);

    pilares.forEach((pilar) => {
      const entregaveisDisponiveis = pilar.entregaveis.filter((e) =>
        entregavelDisponivelNoNivel(e, nivel as NivelId)
      );

      if (entregaveisDisponiveis.length === 0) return;

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
      entregaveisDisponiveis.forEach((entregavel) => {
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

  // ========= INVESTIMENTO =========
  y += 2;
  sectionTitle("INVESTIMENTO");

  // Calculate dynamic box height
  let boxHeight = 20;
  if (resumo.totalEntrada > 0 || resumo.totalSetup > 0) boxHeight += 24;
  if (resumo.totalUpgradesMensal > 0) boxHeight += 6;
  if (resumo.agentesMensal > 0) boxHeight += 6;
  if (resumo.coprodutorComissao > 0) boxHeight += 6;
  if (resumo.economia > 0) boxHeight += 6;

  checkPageBreak(boxHeight + 5);
  const boxY = y - 2;
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, boxY, contentWidth, boxHeight, 2, 2, "F");
  doc.setDrawColor(...COLORS.cinzaClaro);
  doc.roundedRect(margin, boxY, contentWidth, boxHeight, 2, 2, "S");

  const boxMargin = margin + 5;
  const boxRight = pageWidth - margin - 5;

  // Initial investment
  if (resumo.totalEntrada > 0 || resumo.totalSetup > 0) {
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "bold");
    doc.text("INVESTIMENTO INICIAL", boxMargin, y + 4);
    y += 7;

    if (resumo.totalEntrada > 0) {
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.cinza);
      doc.setFont("helvetica", "normal");
      doc.text("Taxa de Entrada:", boxMargin, y + 4);
      doc.setTextColor(...COLORS.grafite);
      doc.setFont("helvetica", "bold");
      doc.text(formatCurrency(resumo.totalEntrada), boxRight, y + 4, {
        align: "right",
      });
      y += 6;
    }

    if (resumo.agentesSetup > 0) {
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.cinza);
      doc.setFont("helvetica", "normal");
      doc.text("Setup Agentes A.I:", boxMargin, y + 4);
      doc.setTextColor(...COLORS.grafite);
      doc.setFont("helvetica", "bold");
      doc.text(formatCurrency(resumo.agentesSetup), boxRight, y + 4, {
        align: "right",
      });
      y += 6;
    }

    // Total initial
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(boxMargin, y + 2, boxRight, y + 2);
    y += 5;

    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text("Total Inicial:", boxMargin, y + 4);
    doc.text(formatCurrency(resumo.totalEntrada + resumo.totalSetup), boxRight, y + 4, {
      align: "right",
    });
    y += 8;
  }

  // Monthly investment
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.cinza);
  doc.setFont("helvetica", "bold");
  doc.text("INVESTIMENTO MENSAL", boxMargin, y + 4);
  y += 7;

  doc.setFontSize(9);
  doc.setTextColor(...COLORS.cinza);
  doc.setFont("helvetica", "normal");
  doc.text("Pacote Base:", boxMargin, y + 4);
  doc.setTextColor(...COLORS.grafite);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(resumo.pacoteMensal), boxRight, y + 4, {
    align: "right",
  });
  y += 6;

  if (resumo.totalUpgradesMensal > 0) {
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Upgrades:", boxMargin, y + 4);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.totalUpgradesMensal), boxRight, y + 4, {
      align: "right",
    });
    y += 6;
  }

  if (resumo.agentesMensal > 0) {
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Agentes A.I:", boxMargin, y + 4);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.agentesMensal), boxRight, y + 4, {
      align: "right",
    });
    y += 6;
  }

  if (resumo.coprodutorComissao > 0) {
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text(`Comissao Co-produtor (${coprodutor?.percentualComissao}%):`, boxMargin, y + 4);
    doc.setTextColor(180, 120, 0); // Amber color
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.coprodutorComissao), boxRight, y + 4, {
      align: "right",
    });
    y += 6;
  }

  // Final total separator
  doc.setDrawColor(...COLORS.grafite);
  doc.setLineWidth(0.8);
  doc.line(boxMargin, y + 2, boxRight, y + 2);
  y += 6;

  doc.setFontSize(11);
  doc.setTextColor(...COLORS.grafite);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL MENSAL:", boxMargin, y + 4);
  doc.setTextColor(...COLORS.vermelho);
  doc.setFontSize(13);
  doc.text(formatCurrency(resumo.totalMensal), boxRight, y + 4, { align: "right" });
  y += 7;

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.cinza);
  doc.setFont("helvetica", "normal");
  doc.text("Total Anual (12x):", boxMargin, y + 4);
  doc.setTextColor(...COLORS.grafite);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(resumo.totalAnual), boxRight, y + 4, {
    align: "right",
  });
  y += 6;

  if (resumo.economia > 0) {
    doc.setTextColor(...COLORS.verde);
    doc.setFont("helvetica", "normal");
    doc.text("Economia (Tecnologia Inclusa):", boxMargin, y + 4);
    doc.setFont("helvetica", "bold");
    doc.text(`${formatCurrency(resumo.economia)}/mes`, boxRight, y + 4, {
      align: "right",
    });
    y += 6;
  }

  y = boxY + boxHeight + 6;

  // ========= CONDICOES COMERCIAIS =========
  sectionTitle("CONDICOES COMERCIAIS");

  bulletPoint("Duracao: Contrato de 12 meses");
  bulletPoint("Periodo Minimo: 3 meses");
  bulletPoint("Aviso Previo: 30 dias");
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
