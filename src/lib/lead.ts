export type LeadInput = {
  nom: string;
  telephone: string;
  email: string;
  ville?: string;
  adresse?: string;
  codePostal?: string;
  superficie?: string;
  message?: string;
  /** Lignes de détail ajoutées à la description (finition, estimation, date…) */
  details?: string[];
  /** D'où vient le lead : calculateur, configurateur, soumission… */
  origine: string;
  /** Champ piège anti-robot (doit rester vide) */
  website?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

export async function sendLead(input: LeadInput): Promise<LeadResult> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success) return { ok: true };
    return { ok: false, error: data?.error || 'Erreur lors de l’envoi. Appelez-nous au 581-748-7017.' };
  } catch {
    return { ok: false, error: 'Problème de connexion. Appelez-nous au 581-748-7017.' };
  }
}

/** Validation côté client — mêmes règles que la route serveur */
export function validateContact(c: { nom: string; telephone: string; email: string }) {
  const errors: Partial<Record<'nom' | 'telephone' | 'email', string>> = {};
  if (!c.nom.trim()) errors.nom = 'Votre nom';
  if (c.telephone.replace(/\D/g, '').length < 10) errors.telephone = 'Numéro à 10 chiffres';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.trim())) errors.email = 'Courriel valide';
  return errors;
}
