export const PHONE = '581-748-7017';
export const PHONE_HREF = 'tel:+15817487017';
export const EMAIL = 'info@zeniva.ca';

export const fmtMoney = (n: number) =>
  n.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

export const fmtRate = (n: number) =>
  n.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2 });

/** Autres divisions du réseau (liens croisés du pied de page) */
export const DIVISIONS = [
  { slug: 'epoxy', name: 'Époxy', url: 'https://epoxy.zeniva.ca', color: '#3CE1FF' },
  { slug: 'toiture', name: 'Toiture', url: 'https://toiture.zeniva.ca', color: '#FF6B1A' },
  { slug: 'asphalte', name: 'Asphalte', url: 'https://asphalte.zeniva.ca', color: '#FFB020' },
  { slug: 'isolation', name: 'Isolation', url: 'https://isolation.zeniva.ca', color: '#34D399' },
] as const;
