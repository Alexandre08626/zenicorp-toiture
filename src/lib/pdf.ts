import { SITE } from '@/site';
import { PHONE } from './contact';

type QuoteInput = {
  nom: string;
  telephone: string;
  email: string;
  finish: string;
  surface: number;
  rate: number;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};

const money = (n: number) =>
  n.toLocaleString('fr-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ | /g, ' ') + ' $';

/** Devis estimatif PDF téléchargé après l'envoi du calculateur (jsPDF chargé à la demande). */
export async function downloadQuotePdf(q: QuoteInput) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  const W = doc.internal.pageSize.getWidth();
  const cx = W / 2;
  const accent = hexToRgb(SITE.accent);
  const total = q.surface * q.rate;
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });

  // En-tête
  doc.setFillColor(7, 9, 14);
  doc.rect(0, 0, W, 50, 'F');
  doc.setDrawColor(...accent);
  doc.setLineWidth(2);
  doc.line(0, 50, W, 50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text('ZENIVA', cx, 25, { align: 'center' });
  doc.setFontSize(13);
  doc.setTextColor(...accent);
  doc.text(SITE.short.toUpperCase(), cx, 37, { align: 'center' });

  doc.setTextColor(15, 15, 20);
  doc.setFontSize(22);
  doc.text(SITE.pdf.title, cx, 70, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 110);
  doc.text(`Date : ${dateStr}`, 20, 82);
  doc.text(`Tél. : ${PHONE}`, W - 20, 82, { align: 'right' });

  // Client
  doc.setFillColor(246, 248, 251);
  doc.roundedRect(15, 92, W - 30, 36, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 15, 20);
  doc.text('CLIENT', 20, 102);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 70);
  doc.text(`Nom : ${q.nom}`, 20, 112);
  doc.text(`Téléphone : ${q.telephone}`, 20, 120);
  doc.text(`Courriel : ${q.email}`, W - 20, 120, { align: 'right' });

  // Projet
  doc.setFillColor(246, 248, 251);
  doc.roundedRect(15, 136, W - 30, 44, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 15, 20);
  doc.text('DÉTAILS DU PROJET', 20, 146);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 70);
  doc.text(`Type : ${q.finish}`, 20, 157);
  doc.text(`Surface : ${q.surface.toLocaleString('fr-CA')} pieds carrés`, 20, 165);
  doc.text(`Taux unitaire : ${money(q.rate)} / pied carré`, 20, 173);

  // Total
  doc.setFillColor(...accent);
  doc.roundedRect(15, 190, W - 30, 30, 4, 4, 'F');
  doc.setTextColor(7, 9, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('TOTAL ESTIMÉ', 25, 209);
  doc.setFontSize(21);
  doc.text(money(total), W - 25, 210, { align: 'right' });

  // Arguments
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 70);
  SITE.pdf.features.forEach((f, i) => doc.text(`•  ${f}`, 20, 236 + i * 8));

  doc.setTextColor(120, 120, 130);
  doc.setFontSize(8.5);
  doc.text('Ce devis est une estimation préliminaire basée sur les informations fournies.', cx, 270, { align: 'center' });
  doc.text('Une visite sur place confirme le prix final.', cx, 276, { align: 'center' });
  doc.setDrawColor(...accent);
  doc.setLineWidth(0.8);
  doc.line(20, 283, W - 20, 283);
  doc.text(`${SITE.url.replace('https://', '')}  |  ${PHONE}`, cx, 290, { align: 'center' });

  doc.save(`devis-zeniva-${SITE.slug}-${now.getTime()}.pdf`);
}
