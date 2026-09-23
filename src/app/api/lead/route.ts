import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/site';
import { PHONE } from '@/lib/contact';

export const dynamic = 'force-dynamic';

/**
 * Réception des leads du site de division.
 *
 * Le navigateur poste ici (même origine : aucun problème de CORS), puis le serveur
 * transmet à zeniva.ca/api/soumission, qui enregistre la demande (Supabase), la pousse
 * dans le Command Center Zenitech (projet zenicorp-<division>) et envoie les courriels
 * de confirmation au client et à l'équipe.
 */
const UPSTREAM = process.env.ZENIVA_SOUMISSION_URL || 'https://www.zeniva.ca/api/soumission';

const clip = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Requête invalide.' }, { status: 400 });
  }

  // Champ piège invisible : un robot le remplit, un humain non.
  if (clip(body.website, 200)) return NextResponse.json({ success: true });

  const nom = clip(body.nom, 120);
  const telephone = clip(body.telephone, 40);
  const email = clip(body.email, 160).toLowerCase();

  if (!nom) return NextResponse.json({ success: false, error: 'Votre nom est requis.' }, { status: 400 });
  if (telephone.replace(/\D/g, '').length < 10)
    return NextResponse.json({ success: false, error: 'Un numéro de téléphone valide est requis.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json({ success: false, error: 'Un courriel valide est requis.' }, { status: 400 });

  const details = Array.isArray(body.details) ? (body.details as unknown[]).map((d) => clip(d, 300)).filter(Boolean) : [];
  const origine = clip(body.origine, 60) || 'site';
  const description = [
    `Demande ${SITE.name} (${SITE.url.replace('https://', '')}) — ${origine}`,
    ...details,
    clip(body.message, 1500) && `Message : ${clip(body.message, 1500)}`,
  ]
    .filter(Boolean)
    .join('\n');

  const payload = {
    division: SITE.slug,
    nom,
    telephone,
    email,
    adresse: clip(body.adresse, 200) || undefined,
    ville: clip(body.ville, 80) || undefined,
    codePostal: clip(body.codePostal, 12) || undefined,
    superficie: clip(body.superficie, 40) || undefined,
    description,
  };

  try {
    const res = await fetch(UPSTREAM, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success) return NextResponse.json({ success: true });
    console.error('[lead] refus amont', res.status, data);
    return NextResponse.json(
      { success: false, error: `L'envoi n'a pas abouti. Appelez-nous au ${PHONE}, on s'en occupe tout de suite.` },
      { status: 502 }
    );
  } catch (e) {
    console.error('[lead] erreur réseau', e);
    return NextResponse.json(
      { success: false, error: `Problème de connexion. Appelez-nous au ${PHONE}.` },
      { status: 502 }
    );
  }
}
