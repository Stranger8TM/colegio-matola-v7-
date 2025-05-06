import jsPDF from "jspdf"

/**
 * Gera um boletim escolar em PDF
 * @param student Dados do aluno
 * @param grades Notas do aluno
 * @returns Documento PDF
 */
export function generateReportCard(student: any, grades: any[]) {
  const doc = new jsPDF()

  // Cabeçalho
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("Colégio Privado da Matola", 105, 20, { align: "center" })

  doc.setFontSize(14)
  doc.text("Boletim Escolar", 105, 30, { align: "center" })

  // Informações do aluno
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(`Aluno: ${student.name}`, 20, 50)
  doc.text(`Classe: ${student.class}`, 20, 60)
  doc.text(`Turma: ${student.grade || "A"}`, 20, 70)
  doc.text(`Data de emissão: ${new Date().toLocaleDateString("pt-BR")}`, 20, 80)

  // Tabela de notas
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Disciplina", 20, 100)
  doc.text("Nota", 120, 100)
  doc.text("Trimestre", 150, 100)
  doc.text("Situação", 180, 100)

  doc.line(20, 105, 190, 105)

  // Dados das notas
  doc.setFont("helvetica", "normal")
  let y = 115

  grades.forEach((grade, index) => {
    doc.text(grade.subject, 20, y)
    doc.text(grade.value.toString(), 120, y)
    doc.text(grade.term, 150, y)

    if (grade.value >= 14) {
      doc.setTextColor(0, 128, 0) // Verde
      doc.text("Excelente", 180, y)
    } else if (grade.value >= 10) {
      doc.setTextColor(0, 0, 255) // Azul
      doc.text("Aprovado", 180, y)
    } else {
      doc.setTextColor(255, 0, 0) // Vermelho
      doc.text("Reprovado", 180, y)
    }

    doc.setTextColor(0, 0, 0) // Resetar cor

    y += 10

    // Nova página se necessário
    if (y > 270) {
      doc.addPage()
      y = 20

      // Cabeçalho da nova página
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Disciplina", 20, y)
      doc.text("Nota", 120, y)
      doc.text("Trimestre", 150, y)
      doc.text("Situação", 180, y)

      doc.line(20, y + 5, 190, y + 5)
      y += 15
    }
  })

  // Calcular média geral
  const average = grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length

  y += 10
  doc.line(20, y, 190, y)
  y += 10

  doc.setFont("helvetica", "bold")
  doc.text("Média Geral:", 20, y)
  doc.text(average.toFixed(1), 120, y)

  // Situação final
  y += 20
  doc.text("Situação Final:", 20, y)

  if (average >= 14) {
    doc.setTextColor(0, 128, 0) // Verde
    doc.text("EXCELENTE", 70, y)
  } else if (average >= 10) {
    doc.setTextColor(0, 0, 255) // Azul
    doc.text("APROVADO", 70, y)
  } else {
    doc.setTextColor(255, 0, 0) // Vermelho
    doc.text("REPROVADO", 70, y)
  }

  // Rodapé
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Produzido por Gabriel Vieira - Sistema Escolar v2.1.0", 105, 280, { align: "center" })

  return doc
}

/**
 * Gera um relatório de desempenho da turma em PDF
 * @param className Nome da turma
 * @param subjects Lista de disciplinas
 * @param performanceData Dados de desempenho
 * @returns Documento PDF
 */
export function generateClassPerformanceReport(className: string, subjects: string[], performanceData: any[]) {
  const doc = new jsPDF()

  // Cabeçalho
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("Colégio Privado da Matola", 105, 20, { align: "center" })

  doc.setFontSize(14)
  doc.text(`Relatório de Desempenho - ${className}`, 105, 30, { align: "center" })

  // Informações gerais
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(`Data de emissão: ${new Date().toLocaleDateString("pt-BR")}`, 20, 50)
  doc.text(`Trimestre: ${performanceData[0]?.term || "1º Trimestre"}`, 20, 60)

  // Tabela de desempenho
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Disciplina", 20, 80)
  doc.text("Média", 80, 80)
  doc.text("Maior Nota", 110, 80)
  doc.text("Menor Nota", 145, 80)
  doc.text("% Aprovação", 180, 80)

  doc.line(20, 85, 190, 85)

  // Dados de desempenho
  doc.setFont("helvetica", "normal")
  let y = 95

  performanceData.forEach((data) => {
    doc.text(data.subject, 20, y)
    doc.text(data.average.toFixed(1), 80, y)
    doc.text(data.highest.toString(), 110, y)
    doc.text(data.lowest.toString(), 145, y)
    doc.text(`${data.passRate}%`, 180, y)

    y += 10
  })

  // Gráfico de barras simples
  y += 20
  doc.setFont("helvetica", "bold")
  doc.text("Gráfico de Desempenho por Disciplina", 105, y, { align: "center" })

  y += 15
  const barHeight = 10
  const maxBarWidth = 100
  const startX = 70

  performanceData.forEach((data) => {
    const barWidth = (data.average / 20) * maxBarWidth

    doc.setFont("helvetica", "normal")
    doc.text(data.subject, 20, y + barHeight / 2)

    // Barra de progresso
    doc.setFillColor(51, 102, 204) // Azul
    doc.rect(startX, y - barHeight / 2, barWidth, barHeight, "F")

    // Valor
    doc.text(`${data.average.toFixed(1)}`, startX + barWidth + 5, y + barHeight / 2 - 1)

    y += barHeight + 5
  })

  // Observações
  y += 20
  doc.setFont("helvetica", "bold")
  doc.text("Observações:", 20, y)

  y += 10
  doc.setFont("helvetica", "normal")
  doc.text("- Este relatório apresenta uma visão geral do desempenho da turma.", 20, y)
  y += 10
  doc.text("- Recomenda-se atenção especial às disciplinas com média abaixo de 10.", 20, y)
  y += 10
  doc.text("- Os dados são baseados nas avaliações registradas no sistema.", 20, y)

  // Rodapé
  doc.setFontSize(10)
  doc.text("Produzido por Gabriel Vieira - Sistema Escolar v2.1.0", 105, 280, { align: "center" })

  return doc
}
