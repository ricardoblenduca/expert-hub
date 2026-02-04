import jsPDF from "jspdf";
import type { Proposta, Produto, UpgradePlataforma } from "@/types";
import { calcularResumo } from "./calculations";
import { formatCurrency, formatDate } from "./formatting";

const COLORS = {
  grafite: [34, 34, 34] as [number, number, number],
  vermelho: [194, 34, 53] as [number, number, number],
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

  const resumo = calcularResumo(proposta.itens);
  const produtoItem = proposta.itens.find((i) => i.tipo === "produto");
  const funnelItem = proposta.itens.find((i) => i.tipo === "upgrade_funnel");
  const flixItem = proposta.itens.find((i) => i.tipo === "upgrade_flix");
  const produto = produtoItem?.item as Produto | undefined;
  const funnel = funnelItem?.item as UpgradePlataforma | undefined;
  const flix = flixItem?.item as UpgradePlataforma | undefined;

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

  function bulletPoint(text: string, indent = 5) {
    checkPageBreak(6);
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.vermelho);
    doc.setFont("helvetica", "normal");
    doc.text("\u2022", margin + indent, y);
    doc.setTextColor(...COLORS.grafite);
    const lines = doc.splitTextToSize(text, contentWidth - indent - 5);
    doc.text(lines, margin + indent + 4, y);
    y += lines.length * 4.5;
  }

  // ========= HEADER =========
  // Background bar
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
  doc.text(`Consultor: ${proposta.consultor}`, pageWidth - margin, 32, {
    align: "right",
  });

  // Red accent line
  doc.setFillColor(...COLORS.vermelho);
  doc.rect(0, 40, pageWidth, 1.5, "F");

  y = 52;

  // ========= DADOS DO CLIENTE =========
  sectionTitle("DADOS DO CLIENTE");
  labelValue("Nome:", proposta.cliente.nome);
  if (proposta.cliente.empresa) {
    labelValue("Empresa:", proposta.cliente.empresa);
  }
  labelValue("Email:", proposta.cliente.email);
  labelValue("Telefone:", proposta.cliente.telefone);
  if (proposta.cliente.faturamentoAtual) {
    labelValue("Faturamento:", proposta.cliente.faturamentoAtual);
  }
  y += 4;

  // ========= CONTEXTO E OBJETIVOS =========
  sectionTitle("CONTEXTO E OBJETIVOS");
  const reuniaoDate = proposta.cliente.dataReuniao
    ? formatDate(new Date(proposta.cliente.dataReuniao + "T12:00:00"))
    : "---";
  bodyText(
    `Apos nossa sessao estrategica realizada em ${reuniaoDate}, identificamos as seguintes necessidades:`
  );
  y += 3;

  bodyText("Objetivos Principais:", true);
  proposta.cliente.objetivosPrincipais.forEach((obj) => {
    bulletPoint(obj);
  });
  y += 2;

  bodyText("Desafios Atuais:", true);
  bodyText(proposta.cliente.desafiosAtuais, false, 2);
  y += 2;

  bodyText("Resultado Esperado:", true);
  bodyText(proposta.cliente.resultadoEsperado, false, 2);
  y += 4;

  // ========= SOLUCAO PROPOSTA =========
  sectionTitle("SOLUCAO PROPOSTA");

  let sectionNum = 1;

  if (produto) {
    // Product header
    checkPageBreak(12);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. PRODUTO PRINCIPAL: ${produto.nome}`,
      margin + 3,
      y + 4
    );
    y += 12;
    sectionNum++;

    bodyText(
      `Investimento: ${formatCurrency(produto.investimento.mensal)}/mes`,
      false,
      3
    );
    y += 2;

    // Deliverables by pillar
    produto.entregaveis.forEach((pilar) => {
      checkPageBreak(10);
      doc.setFontSize(8.5);
      doc.setTextColor(...COLORS.vermelho);
      doc.setFont("helvetica", "bold");
      doc.text(pilar.pilar, margin + 3, y);
      y += 4;

      pilar.items.forEach((item) => {
        let desc = item.descricao;
        if (item.frequencia) desc += ` (${item.frequencia})`;
        if (item.tipo) desc += ` [${item.tipo}]`;
        if (item.quantidade) desc += ` - ${item.quantidade}`;
        bulletPoint(desc, 6);
      });
      y += 1;
    });
    y += 3;
  }

  // Funnel Pages upgrade
  if (funnel && funnelItem) {
    checkPageBreak(12);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. FUNNEL PAGES - ${funnel.plano}`,
      margin + 3,
      y + 4
    );
    y += 14;
    sectionNum++;

    bodyText(funnel.descricao, false, 3);
    y += 2;

    // Pricing breakdown
    bodyText("Investimento:", true, 3);
    bodyText(
      `Plano Base: ${formatCurrency(funnelItem.precoBase ?? funnel.preco)}/mes`,
      false,
      6
    );
    if ((funnelItem.funisExtras ?? 0) > 0) {
      bodyText(
        `Funis Extras (${funnelItem.funisExtras}x): ${formatCurrency(funnelItem.precoExtras ?? 0)}/mes`,
        false,
        6
      );
    }
    bodyText(
      `Total: ${formatCurrency(funnelItem.precoTotal ?? funnel.preco)}/mes`,
      true,
      6
    );
    y += 2;

    // Deliverables
    bodyText("Recursos inclusos:", true, 3);
    funnel.entregaveisBase.forEach((ent) => {
      bulletPoint(ent, 6);
    });

    // Observations
    if (funnel.observacoes.length > 0) {
      y += 2;
      funnel.observacoes.forEach((obs) => {
        checkPageBreak(5);
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.cinza);
        doc.setFont("helvetica", "italic");
        const lines = doc.splitTextToSize(obs, contentWidth - 6);
        doc.text(lines, margin + 6, y);
        y += lines.length * 3.5;
      });
    }
    y += 4;
  }

  // Experience Flix upgrade
  if (flix && flixItem) {
    checkPageBreak(12);
    doc.setFillColor(...COLORS.bgLight);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${sectionNum}. EXPERIENCE FLIX - ${flix.plano}`,
      margin + 3,
      y + 4
    );
    y += 14;
    sectionNum++;

    bodyText(flix.descricao, false, 3);
    y += 2;

    // Price
    bodyText(
      `Investimento: ${formatCurrency(flixItem.precoTotal ?? flix.preco)}/mes`,
      true,
      3
    );
    y += 2;

    // Plan limits
    if (flix.limitesPlano) {
      bodyText("Limites do Plano:", true, 3);
      bulletPoint(
        `Areas de Membros: ${flix.limitesPlano.areasMembrosBD}`,
        6
      );
      bulletPoint(
        `Membros Ativos/mes: ${flix.limitesPlano.membrosAtivosMes}`,
        6
      );
      if (flix.limitesPlano.relatoriosPersonalizadosBD > 0) {
        bulletPoint(
          `Relatorios Personalizados: ${flix.limitesPlano.relatoriosPersonalizadosBD}`,
          6
        );
      }
      y += 2;
    }

    // Deliverables
    bodyText("Recursos inclusos:", true, 3);
    flix.entregaveisBase.forEach((ent) => {
      bulletPoint(ent, 6);
    });

    // What's not included
    if (flix.naoInclui && flix.naoInclui.length > 0) {
      y += 2;
      bodyText("Nao inclui:", true, 3);
      flix.naoInclui.forEach((item) => {
        checkPageBreak(5);
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.cinza);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(`- ${item}`, contentWidth - 8);
        doc.text(lines, margin + 6, y);
        y += lines.length * 4;
      });
    }

    // Observations
    if (flix.observacoes.length > 0) {
      y += 2;
      flix.observacoes.forEach((obs) => {
        checkPageBreak(5);
        doc.setFontSize(7);
        doc.setTextColor(...COLORS.cinza);
        doc.setFont("helvetica", "italic");
        const lines = doc.splitTextToSize(obs, contentWidth - 6);
        doc.text(lines, margin + 6, y);
        y += lines.length * 3.5;
      });
    }
    y += 4;
  }

  // ========= INVESTIMENTO =========
  y += 2;
  sectionTitle("INVESTIMENTO");

  // Calculate dynamic box height
  let boxHeight = 14; // base for subtotal + total sections
  if (resumo.totalProduto > 0) boxHeight += 6;
  if (resumo.totalFunnel > 0) boxHeight += 6;
  if (resumo.totalFlix > 0) boxHeight += 6;
  if (resumo.desconto > 0) boxHeight += 6;
  boxHeight += 18; // total + annual

  checkPageBreak(boxHeight + 5);
  const boxY = y - 2;
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, boxY, contentWidth, boxHeight, 2, 2, "F");
  doc.setDrawColor(...COLORS.cinzaClaro);
  doc.roundedRect(margin, boxY, contentWidth, boxHeight, 2, 2, "S");

  const boxMargin = margin + 5;
  const boxRight = pageWidth - margin - 5;

  if (resumo.totalProduto > 0) {
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Produto Principal:", boxMargin, y + 4);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.totalProduto), boxRight, y + 4, {
      align: "right",
    });
    y += 6;
  }

  if (resumo.totalFunnel > 0) {
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Funnel Pages:", boxMargin, y + 4);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.totalFunnel), boxRight, y + 4, {
      align: "right",
    });
    y += 6;
  }

  if (resumo.totalFlix > 0) {
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.cinza);
    doc.setFont("helvetica", "normal");
    doc.text("Experience Flix:", boxMargin, y + 4);
    doc.setTextColor(...COLORS.grafite);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(resumo.totalFlix), boxRight, y + 4, {
      align: "right",
    });
    y += 6;
  }

  // Separator
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(boxMargin, y + 2, boxRight, y + 2);
  y += 5;

  doc.setTextColor(...COLORS.cinza);
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal Mensal:", boxMargin, y + 4);
  doc.setTextColor(...COLORS.grafite);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(resumo.subtotal), boxRight, y + 4, {
    align: "right",
  });
  y += 6;

  if (resumo.desconto > 0) {
    doc.setTextColor(...COLORS.vermelho);
    doc.setFont("helvetica", "normal");
    doc.text("Desconto:", boxMargin, y + 4);
    doc.setFont("helvetica", "bold");
    doc.text(`- ${formatCurrency(resumo.desconto)}`, boxRight, y + 4, {
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
  doc.text(formatCurrency(resumo.total), boxRight, y + 4, { align: "right" });
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

  y = boxY + boxHeight + 6;

  // ========= CONDICOES COMERCIAIS =========
  sectionTitle("CONDICOES COMERCIAIS");

  if (produto) {
    bulletPoint(`Duracao: ${produto.duracao}`);
    bulletPoint(`Periodo Minimo: ${produto.investimento.minimoMeses} meses`);
  }
  if (funnel) {
    bulletPoint(`Funnel Pages: Contrato de ${funnel.duracaoMinima} meses`);
  }
  if (flix) {
    bulletPoint(`Experience Flix: Contrato de ${flix.duracaoMinima} meses`);
  }
  bulletPoint("Aviso Previo: 30 dias");
  if (produto?.investimento.extras) {
    bulletPoint(`Extras: ${produto.investimento.extras}`);
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
  const fileName = `Proposta_${proposta.cliente.nome.replace(/\s+/g, "_")}_${formatDate(proposta.data).replace(/\//g, "-")}.pdf`;
  doc.save(fileName);
}
