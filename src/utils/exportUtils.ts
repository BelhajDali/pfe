import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface ExportData {
  title: string;
  headers: string[];
  data: any[];
}

export const exportToPDF = ({ title, headers, data }: ExportData) => {
  const doc = new jsPDF();
  
  // Ajouter le titre
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  
  // Ajouter la date
  doc.setFontSize(10);
  doc.text(`Exporté le: ${new Date().toLocaleDateString()}`, 14, 25);
  
  // Générer le tableau
  (doc as any).autoTable({
    head: [headers],
    body: data,
    startY: 30,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 10 },
  });
  
  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = ({ title, headers, data }: ExportData) => {
  const ws = XLSX.utils.aoa_to_sheet([
    [title],
    [`Exporté le: ${new Date().toLocaleDateString()}`],
    [],
    headers,
    ...data
  ]);
  
  // Fusionner les cellules pour le titre
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } }
  ];
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Export');
  
  XLSX.writeFile(wb, `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`);
}; 