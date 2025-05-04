import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { formatDate } from "./utils"

// Função para gerar boletim escolar em PDF
export function generateReportCard(studentData: any, grades: any[]) {
  const doc = new jsPDF()

  // Adicionar cabeçalho
  doc.setFontSize(18)
  doc.setTextColor(0, 51, 153)
  doc.text("Escola Privada da Matola", 105, 20, { align: "center" })

  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text("Boletim Escolar", 105, 30, { align: "center" })

  // Adicionar informações do aluno
  doc.setFontSize(12)
  doc.text(`Aluno: ${studentData.name}`, 20, 45)
  doc.text(`Classe: ${studentData.class}`, 20, 52)
  doc.text(`Turma: ${studentData.grade || "N/A"}`, 20, 59)
  doc.text(`Data de emissão: ${formatDate(new Date())}`, 20, 66)

  // Adicionar tabela de notas
  const tableColumn = ["Disciplina", "Nota", "Trimestre", "Data", "Professor", "Observações"]
  const tableRows: any[] = []

  grades.forEach((grade) => {
    const gradeData = [
      grade.subject,
      grade.value.toString(),
      grade.term,
      formatDate(new Date(grade.date)),
      grade.teacher?.name || "N/A",
      grade.comments || "-",
    ]
    tableRows.push(gradeData)
  })

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 75,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [0, 51, 153],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [0, 51, 153],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  })

  // Adicionar rodapé
  const finalY = (doc as any).lastAutoTable.finalY || 75
  doc.setFontSize(10)
  doc.text("Este documento é uma versão digital do boletim escolar.", 105, finalY + 20, { align: "center" })
  doc.text("Escola Privada da Matola - Educação de Excelência", 105, finalY + 25, { align: "center" })
  doc.text(`Produzido por Gabriel Vieira - ${new Date().getFullYear()}`, 105, finalY + 30, { align: "center" })

  return doc
}

// Função para gerar lista de alunos em PDF
export function generateStudentList(students: any[], className: string) {
  const doc = new jsPDF()

  // Adicionar cabeçalho
  doc.setFontSize(18)
  doc.setTextColor(0, 51, 153)
  doc.text("Escola Privada da Matola", 105, 20, { align: "center" })

  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text(`Lista de Alunos - ${className}`, 105, 30, { align: "center" })

  // Adicionar data
  doc.setFontSize(10)
  doc.text(`Data de emissão: ${formatDate(new Date())}`, 20, 40)

  // Adicionar tabela de alunos
  const tableColumn = ["Nome", "Classe", "Turma", "Status"]
  const tableRows: any[] = []

  students.forEach((student) => {
    const studentData = [student.name, student.class, student.grade || "N/A", student.status || "Ativo"]
    tableRows.push(studentData)
  })

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [0, 51, 153],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [0, 51, 153],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  })

  // Adicionar rodapé
  const finalY = (doc as any).lastAutoTable.finalY || 45
  doc.setFontSize(10)
  doc.text("Documento gerado pelo sistema de gestão escolar.", 105, finalY + 20, { align: "center" })
  doc.text("Escola Privada da Matola - Educação de Excelência", 105, finalY + 25, { align: "center" })
  doc.text(`Produzido por Gabriel Vieira - ${new Date().getFullYear()}`, 105, finalY + 30, { align: "center" })

  return doc
}

// Função para gerar relatório de desempenho da turma
export function generateClassPerformanceReport(className: string, subjects: string[], performanceData: any[]) {
  const doc = new jsPDF()

  // Adicionar cabeçalho
  doc.setFontSize(18)
  doc.setTextColor(0, 51, 153)
  doc.text("Escola Privada da Matola", 105, 20, { align: "center" })

  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text(`Relatório de Desempenho - ${className}`, 105, 30, { align: "center" })

  // Adicionar data
  doc.setFontSize(10)
  doc.text(`Data de emissão: ${formatDate(new Date())}`, 20, 40)
  doc.text(`Período: ${performanceData[0]?.term || "Atual"}`, 20, 45)

  // Adicionar tabela de desempenho
  const tableColumn = ["Disciplina", "Média da Turma", "Nota Mais Alta", "Nota Mais Baixa", "% Aprovação"]
  const tableRows: any[] = []

  performanceData.forEach((data) => {
    const rowData = [
      data.subject,
      data.average.toFixed(1),
      data.highest.toFixed(1),
      data.lowest.toFixed(1),
      `${data.passRate}%`,
    ]
    tableRows.push(rowData)
  })

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 55,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [0, 51, 153],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [0, 51, 153],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  })

  // Adicionar rodapé
  const finalY = (doc as any).lastAutoTable.finalY || 55
  doc.setFontSize(10)
  doc.text("Este relatório apresenta o desempenho médio da turma por disciplina.", 105, finalY + 20, {
    align: "center",
  })
  doc.text("Escola Privada da Matola - Educação de Excelência", 105, finalY + 25, { align: "center" })
  doc.text(`Produzido por Gabriel Vieira - ${new Date().getFullYear()}`, 105, finalY + 30, { align: "center" })

  return doc
}
