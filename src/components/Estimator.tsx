'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Download, Loader2, Lock, Phone } from 'lucide-react';
import { SITE } from '@/site';
import { PHONE, PHONE_HREF, fmtMoney, fmtRate } from '@/lib/contact';
import { sendLead, validateContact } from '@/lib/lead';
import { downloadQuotePdf } from '@/lib/pdf';

const PRESETS = [250, 500, 1000];

/**
 * Estimateur du hero — l'aimant à leads du site.
 * 1) Finition + surface → prix en direct   2) Coordonnées → lead envoyé   3) Merci + devis PDF
 */
export default function Estimator() {
  const finishes = SITE.calc.finishes;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [finishId, setFinishId] = useState(finishes[0].id);
  const [sqft, setSqft] = useState('');
  const [c, setC] = useState({ nom: '', telephone: '', email: '', ville: '', website: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  // Les erreurs se mettent à jour pendant la saisie (seulement après une première tentative)
  useEffect(() => {
    if (Object.keys(errors).length) setErrors(validateContact(c));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c]);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');

  const finish = finishes.find((f) => f.id === finishId) ?? finishes[0];
  const surface = Math.max(0, Math.min(200000, parseFloat(sqft) || 0));
  const total = surface * finish.price;
  const shown = useCountUp(total);

  const canNext = surface > 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateContact(c);
    setErrors(v);
    if (Object.keys(v).length) return;
    setSending(true);
    setErr('');
    const r = await sendLead({
      ...c,
      superficie: `${surface} pi²`,
      origine: 'calculateur (hero)',
      details: [
        `${SITE.calc.finishLabel} : ${finish.name} (${fmtRate(finish.price)}/pi²)`,
        `Surface : ${surface} pi²`,
        `Estimation affichée : ${fmtMoney(total)}`,
      ],
    });
    setSending(false);
    if (r.ok) setStep(3);
    else setErr(r.error);
  }

  return (
    <div className="frame-grad shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]" id="estimation">
      <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-b from-[#0E1524] to-[#070a12] p-5 sm:p-7">
        <div aria-hidden className="absolute inset-0 bp-grid opacity-40" />

        {/* En-tête + progression */}
        <div className="relative flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">Estimation gratuite</p>
            <p className="mt-1 font-heading text-lg font-extrabold text-white sm:text-xl">
              {step === 1 && 'Votre prix en 30 secondes'}
              {step === 2 && 'Où envoyer votre devis ?'}
              {step === 3 && 'C’est envoyé !'}
            </p>
          </div>
          <div className="flex items-center gap-1.5" aria-label={`Étape ${step} sur 3`}>
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1.5 rounded-full transition-all duration-500 ${n <= step ? 'w-6 bg-accent' : 'w-3 bg-white/15'}`}
              />
            ))}
          </div>
        </div>

        {/* ─── ÉTAPE 1 ─── */}
        {step === 1 && (
          <div className="relative mt-5 animate-fade-up">
            <p className="label">{SITE.calc.finishLabel}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {finishes.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  data-on={f.id === finishId}
                  onClick={() => setFinishId(f.id)}
                  className="choice overflow-hidden !p-0"
                >
                  <span className="relative block h-16 w-full overflow-hidden sm:h-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#070a12] to-transparent" />
                    {f.id === finishId && (
                      <span className="absolute right-2 top-2 grid h-5 w-5 animate-pop place-items-center rounded-full bg-accent">
                        <Check className="h-3 w-3 text-z-noir" strokeWidth={3} />
                      </span>
                    )}
                  </span>
                  <span className="block px-3 pb-3 pt-1">
                    <span className="block text-sm font-bold leading-tight text-white">{f.name}</span>
                    <span className="mt-1 block font-mono text-xs text-accent">
                      {fmtRate(f.price)}
                      <span className="text-z-faint">/pi²</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <label htmlFor="est-sqft" className="label mt-5">
              {SITE.calc.surfaceLabel}
            </label>
            <div className="relative">
              <input
                id="est-sqft"
                type="number"
                inputMode="numeric"
                min={0}
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="Ex. 500"
                className="field pr-14 font-heading text-2xl font-extrabold tnum"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-z-faint">
                pi²
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSqft(String(p))}
                  className="rounded-lg border border-[rgba(120,160,255,0.2)] px-2.5 py-1 font-mono text-[0.7rem] text-z-dim transition-colors hover:border-accent/60 hover:text-white"
                >
                  {p} pi²
                </button>
              ))}
            </div>

            {/* Prix en direct */}
            <div className="mt-5 flex items-end justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-4 py-4">
              <div className="min-w-0">
                <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-z-faint">Estimation</p>
                <p className="mt-1 truncate font-heading text-[2rem] font-black leading-none text-white tnum sm:text-[2.4rem]">
                  {fmtMoney(shown)}
                </p>
              </div>
              <p className="shrink-0 text-right font-mono text-[0.7rem] leading-relaxed text-z-dim">
                {fmtRate(finish.price)}/pi²
                <br />
                <span className="text-z-faint">{surface ? `${surface.toLocaleString('fr-CA')} pi²` : '—'}</span>
              </p>
            </div>

            <button type="button" disabled={!canNext} onClick={() => setStep(2)} className="btn-main mt-4 w-full py-4 text-base">
              Recevoir mon devis détaillé
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-[0.72rem] text-z-faint">Gratuit · sans engagement · PDF immédiat</p>
          </div>
        )}

        {/* ─── ÉTAPE 2 ─── */}
        {step === 2 && (
          <form className="relative mt-5 animate-fade-up" onSubmit={submit} noValidate>
            <div className="mb-4 flex items-center justify-between rounded-xl border border-[rgba(120,160,255,0.16)] bg-black/30 px-3.5 py-2.5 text-sm">
              <span className="truncate text-z-dim">
                {finish.name} · {surface.toLocaleString('fr-CA')} pi²
              </span>
              <span className="ml-3 shrink-0 font-heading font-extrabold text-white tnum">{fmtMoney(total)}</span>
            </div>

            <div className="grid gap-2.5">
              <Input label="Nom complet" autoComplete="name" value={c.nom} error={errors.nom} onChange={(v) => setC({ ...c, nom: v })} />
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Input
                  label="Téléphone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={c.telephone}
                  error={errors.telephone}
                  onChange={(v) => setC({ ...c, telephone: v })}
                />
                <Input label="Ville" autoComplete="address-level2" value={c.ville} onChange={(v) => setC({ ...c, ville: v })} optional />
              </div>
              <Input
                label="Courriel (pour recevoir le devis)"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={c.email}
                error={errors.email}
                onChange={(v) => setC({ ...c, email: v })}
              />
              {/* Piège à robots : invisible pour un humain */}
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                value={c.website}
                onChange={(e) => setC({ ...c, website: e.target.value })}
              />
            </div>

            {err && (
              <p role="alert" className="mt-3 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200">
                {err}
              </p>
            )}

            <button type="submit" disabled={sending} className="btn-main mt-4 w-full py-4 text-base">
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
                </>
              ) : (
                <>
                  Envoyer et recevoir mon devis
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <div className="mt-3 flex items-center justify-between gap-2">
              <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-xs text-z-faint hover:text-white">
                <ArrowLeft className="h-3.5 w-3.5" /> Modifier
              </button>
              <p className="flex items-center gap-1.5 text-[0.72rem] text-z-faint">
                <Lock className="h-3 w-3" /> Vos infos restent confidentielles
              </p>
            </div>
          </form>
        )}

        {/* ─── ÉTAPE 3 ─── */}
        {step === 3 && (
          <div className="relative mt-6 animate-fade-up text-center">
            <span className="mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full bg-accent shadow-[0_0_40px_rgb(var(--accent-rgb)/0.6)]">
              <Check className="h-8 w-8 text-z-noir" strokeWidth={3} />
            </span>
            <p className="mt-5 font-heading text-2xl font-extrabold text-white">Merci {c.nom.split(' ')[0]} !</p>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-z-dim">
              Votre demande est reçue. Un conseiller vous rappelle sous 24 h pour planifier la visite et confirmer le prix.
            </p>
            <button
              type="button"
              onClick={() =>
                downloadQuotePdf({ nom: c.nom, telephone: c.telephone, email: c.email, finish: finish.name, surface, rate: finish.price })
              }
              className="btn-main mt-6 w-full py-4 text-base"
            >
              <Download className="h-4 w-4" /> Télécharger mon devis PDF
            </button>
            <a href={PHONE_HREF} className="btn-ghost mt-2.5 w-full py-3.5 font-mono">
              <Phone className="h-4 w-4 text-accent" /> {PHONE}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  optional,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  const id = useMemo(() => 'f-' + label.toLowerCase().replace(/[^a-z]+/g, '-'), [label]);
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={optional ? `${label} (optionnel)` : label}
        aria-invalid={error ? 'true' : undefined}
        className="field"
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}

/** Compteur animé vers la valeur cible */
function useCountUp(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 450);
      const e = 1 - Math.pow(1 - t, 3);
      const cur = a + (target - a) * e;
      setV(cur);
      from.current = cur;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}
