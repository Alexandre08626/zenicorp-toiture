'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, Phone } from 'lucide-react';
import { SITE } from '@/site';
import { PHONE, PHONE_HREF } from '@/lib/contact';
import { sendLead, validateContact } from '@/lib/lead';

const STEPS = ['Projet', 'Adresse', 'Dimensions', 'Échéancier', 'Coordonnées'];

type Form = {
  projet: string;
  propriete: string;
  adresse: string;
  ville: string;
  codePostal: string;
  longueur: string;
  largeur: string;
  description: string;
  echeancier: string;
  nom: string;
  telephone: string;
  email: string;
  website: string;
};

const EMPTY: Form = {
  projet: '', propriete: '', adresse: '', ville: '', codePostal: '', longueur: '', largeur: '',
  description: '', echeancier: '', nom: '', telephone: '', email: '', website: '',
};

const TIMELINES = ['Le plus tôt possible', 'Ce mois-ci', 'Dans 1 à 3 mois', 'Juste pour une estimation'];

export default function SoumissionPage() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  // Les erreurs se mettent à jour pendant la saisie (seulement après une première tentative)
  useEffect(() => {
    if (Object.keys(errors).length) setErrors(validateContact(f));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const set = (k: keyof Form) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const surface =
    f.longueur && f.largeur ? Math.round(parseFloat(f.longueur) * parseFloat(f.largeur)) || 0 : 0;

  const canNext =
    (step === 1 && !!f.projet) || (step === 2 && !!f.ville.trim()) || step === 3 || (step === 4 && !!f.echeancier);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateContact(f);
    setErrors(v);
    if (Object.keys(v).length) return;
    setSending(true);
    setErr('');
    const r = await sendLead({
      nom: f.nom,
      telephone: f.telephone,
      email: f.email,
      adresse: f.adresse,
      ville: f.ville,
      codePostal: f.codePostal,
      superficie: surface ? `${surface} pi²` : undefined,
      message: f.description,
      website: f.website,
      origine: 'soumission détaillée',
      details: [
        `Type de projet : ${f.projet}`,
        f.propriete && `Propriété : ${f.propriete}`,
        surface ? `Dimensions : ${f.longueur} × ${f.largeur} pi (${surface} pi²)` : '',
        `Échéancier : ${f.echeancier}`,
      ].filter(Boolean) as string[],
    });
    setSending(false);
    if (r.ok) setSent(true);
    else setErr(r.error);
  }

  return (
    <main className="min-h-[100svh] pb-16">
      <header className="wrap flex h-[4.5rem] items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-[10px] object-contain ring-1 ring-white/15" />
          <span className="font-heading font-black text-white">
            ZENI<span className="grad-accent">VA</span> <span className="font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-z-faint">{SITE.short}</span>
          </span>
        </a>
        <a href={PHONE_HREF} className="btn-ghost px-3.5 py-2.5 font-mono text-[0.8rem]">
          <Phone className="h-4 w-4 text-accent" /> <span className="hidden sm:inline">{PHONE}</span>
        </a>
      </header>

      <div className="mx-auto w-full max-w-2xl px-4 pt-8 sm:px-8 sm:pt-12">
        <div className="text-center">
          <span className="chip">
            <span className="chip-dot" /> Division {SITE.short}
          </span>
          <h1 className="mt-5 font-heading text-[clamp(2.2rem,5vw,3.4rem)] font-black leading-[1.02] tracking-[-0.03em] text-white">
            Soumission <span className="grad-accent">gratuite.</span>
          </h1>
          <p className="mt-3 text-z-dim">5 étapes · 2 minutes · rappel sous 24 h</p>
        </div>

        {/* Progression */}
        {!sent && (
          <ol className="mt-10 grid grid-cols-5 gap-2" aria-label="Progression">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-col gap-2">
                <span className={`h-1.5 rounded-full transition-colors duration-500 ${i < step ? 'bg-accent' : 'bg-white/10'}`} />
                <span className={`hidden font-mono text-[0.62rem] uppercase tracking-[0.12em] sm:block ${i + 1 === step ? 'text-white' : 'text-z-faint'}`}>{s}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="frame-grad mt-6">
          <div className="rounded-[25px] bg-gradient-to-b from-[#0E1524] to-[#070a12] p-5 sm:p-8">
            {sent ? (
              <div className="animate-fade-up py-6 text-center">
                <span className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-accent shadow-[0_0_40px_rgb(var(--accent-rgb)/0.6)]">
                  <Check className="h-8 w-8 text-z-noir" strokeWidth={3} />
                </span>
                <h2 className="mt-6 font-heading text-3xl font-extrabold text-white">Demande bien reçue !</h2>
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-z-dim">
                  Merci <strong className="text-white">{f.nom.split(' ')[0]}</strong>. Un conseiller {SITE.short.toLowerCase()} vous rappelle sous 24 h ouvrées. Vous pourrez lui envoyer vos photos à ce moment.
                </p>
                <a href="/" className="btn-ghost mt-8">
                  <ArrowLeft className="h-4 w-4" /> Retour au site
                </a>
              </div>
            ) : (
              <form onSubmit={step === 5 ? submit : (e) => { e.preventDefault(); if (canNext) setStep(step + 1); }} noValidate>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">
                  Étape {step}/5
                </p>

                {step === 1 && (
                  <div className="animate-fade-up">
                    <h2 className="mt-2 font-heading text-2xl font-extrabold text-white">Quel type de projet ?</h2>
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                      {SITE.soumission.projectTypes.map((o) => (
                        <button type="button" key={o} data-on={f.projet === o} onClick={() => set('projet')(o)} className="choice min-h-[64px] justify-center font-semibold text-white">
                          {o}
                        </button>
                      ))}
                    </div>
                    <label className="label mt-6" htmlFor="s-prop">Type de propriété</label>
                    <select id="s-prop" className="field" value={f.propriete} onChange={(e) => set('propriete')(e.target.value)}>
                      <option value="">Sélectionnez…</option>
                      {SITE.soumission.propertyTypes.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-fade-up">
                    <h2 className="mt-2 font-heading text-2xl font-extrabold text-white">Où sont les travaux ?</h2>
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      <input className="field sm:col-span-2" placeholder="Numéro et rue (optionnel)" autoComplete="street-address" value={f.adresse} onChange={(e) => set('adresse')(e.target.value)} />
                      <input className="field" placeholder="Ville" autoComplete="address-level2" value={f.ville} onChange={(e) => set('ville')(e.target.value)} autoFocus />
                      <input className="field" placeholder="Code postal (optionnel)" autoComplete="postal-code" value={f.codePostal} onChange={(e) => set('codePostal')(e.target.value)} />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-fade-up">
                    <h2 className="mt-2 font-heading text-2xl font-extrabold text-white">{SITE.soumission.dimsTitle}</h2>
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      <input className="field" type="number" inputMode="numeric" placeholder="Longueur (pi)" value={f.longueur} onChange={(e) => set('longueur')(e.target.value)} />
                      <input className="field" type="number" inputMode="numeric" placeholder="Largeur (pi)" value={f.largeur} onChange={(e) => set('largeur')(e.target.value)} />
                    </div>
                    {surface > 0 && (
                      <p className="mt-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-white">
                        Surface estimée : <strong className="font-heading text-lg">{surface.toLocaleString('fr-CA')} pi²</strong>
                      </p>
                    )}
                    <label className="label mt-6" htmlFor="s-desc">Décrivez votre projet (optionnel)</label>
                    <textarea id="s-desc" className="field min-h-[120px] resize-y" placeholder={SITE.soumission.descPlaceholder} value={f.description} onChange={(e) => set('description')(e.target.value)} />
                  </div>
                )}

                {step === 4 && (
                  <div className="animate-fade-up">
                    <h2 className="mt-2 font-heading text-2xl font-extrabold text-white">Pour quand ?</h2>
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {TIMELINES.map((o) => (
                        <button type="button" key={o} data-on={f.echeancier === o} onClick={() => set('echeancier')(o)} className="choice min-h-[60px] justify-center font-semibold text-white">
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="animate-fade-up">
                    <h2 className="mt-2 font-heading text-2xl font-extrabold text-white">À qui envoyer la soumission ?</h2>
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      <input className="field sm:col-span-2" placeholder="Prénom et nom" autoComplete="name" value={f.nom} aria-invalid={errors.nom ? 'true' : undefined} onChange={(e) => set('nom')(e.target.value)} autoFocus />
                      <input className="field" placeholder="Téléphone" type="tel" inputMode="tel" autoComplete="tel" value={f.telephone} aria-invalid={errors.telephone ? 'true' : undefined} onChange={(e) => set('telephone')(e.target.value)} />
                      <input className="field" placeholder="Courriel" type="email" inputMode="email" autoComplete="email" value={f.email} aria-invalid={errors.email ? 'true' : undefined} onChange={(e) => set('email')(e.target.value)} />
                      <input tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" value={f.website} onChange={(e) => set('website')(e.target.value)} />
                    </div>
                    {Object.keys(errors).length > 0 && <p className="mt-2 text-xs text-red-300">À compléter : {Object.values(errors).join(', ')}.</p>}

                    <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-[rgba(120,160,255,0.14)] bg-black/30 p-4 text-sm">
                      {[
                        ['Projet', f.projet],
                        ['Ville', f.ville],
                        ['Surface', surface ? `${surface} pi²` : '—'],
                        ['Échéancier', f.echeancier],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-z-faint">{k}</p>
                          <p className="mt-0.5 truncate font-semibold text-white">{v || '—'}</p>
                        </div>
                      ))}
                    </div>
                    {err && <p role="alert" className="mt-3 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200">{err}</p>}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost">
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>
                  ) : (
                    <span />
                  )}
                  <button type="submit" disabled={step < 5 ? !canNext : sending} className="btn-main flex-1 py-4 text-base sm:flex-none sm:px-8">
                    {step < 5 ? (
                      <>
                        Continuer <ArrowRight className="h-4 w-4" />
                      </>
                    ) : sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
                      </>
                    ) : (
                      <>
                        Envoyer ma demande <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                {step === 5 && (
                  <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-z-faint">
                    <Lock className="h-3 w-3" /> Gratuit, sans engagement. Vos infos restent confidentielles.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
