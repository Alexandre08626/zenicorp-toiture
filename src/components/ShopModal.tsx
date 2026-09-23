'use client';

import { useEffect, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react';
import { SITE } from '@/site';
import { PHONE, fmtMoney, fmtRate } from '@/lib/contact';
import { sendLead, validateContact } from '@/lib/lead';

const STEPS = ['Surface', 'Type', 'Option', 'Date & contact', 'Récapitulatif'];
const DEPOSIT = 0.3;

/**
 * Configurateur de projet + acompte ZeniPay.
 * Le lead est envoyé à l'étape 4 (avant le paiement) : même si le client ne paie
 * pas, l'équipe a ses coordonnées et son projet.
 */
export default function ShopModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [sqft, setSqft] = useState('');
  const [typeId, setTypeId] = useState<string | null>(null);
  const [option, setOption] = useState<{ name: string; price: number } | null>(null);
  const [date, setDate] = useState('');
  const [c, setC] = useState({ nom: '', telephone: '', email: '', website: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  // Les erreurs se mettent à jour pendant la saisie (seulement après une première tentative)
  useEffect(() => {
    if (Object.keys(errors).length) setErrors(validateContact(c));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const type = SITE.shop.types.find((t) => t.id === typeId) ?? null;
  const surface = parseFloat(sqft) || 0;
  const total = surface * (option?.price ?? 0);
  const deposit = total * DEPOSIT;

  const reset = () => {
    setStep(1);
    setSqft('');
    setTypeId(null);
    setOption(null);
    setDate('');
    setErr('');
    setBusy(false);
  };
  const close = () => {
    onClose();
    setTimeout(reset, 300);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function toRecap(e: React.FormEvent) {
    e.preventDefault();
    const v = validateContact(c);
    setErrors(v);
    if (Object.keys(v).length || !date) return;
    setBusy(true);
    setErr('');
    const r = await sendLead({
      ...c,
      superficie: `${surface} pi²`,
      origine: 'configurateur (boutique)',
      details: [
        `Type : ${type?.name}`,
        `Option : ${option?.name} (${fmtRate(option?.price ?? 0)}/pi²)`,
        `Surface : ${surface} pi²`,
        `Date souhaitée : ${date}`,
        `Total configuré : ${fmtMoney(total)} — acompte 30 % : ${fmtMoney(deposit)}`,
      ],
    });
    setBusy(false);
    if (r.ok) setStep(5);
    else setErr(r.error);
  }

  async function pay() {
    setBusy(true);
    setErr('');
    const paymentData = {
      amount: Math.round(deposit * 100) / 100,
      currency: 'CAD',
      description: `Acompte Projet ${SITE.short} - ${option?.name} (${surface} pi²)`,
      metadata: {
        project_surface: String(surface),
        project_type: typeId,
        project_option: option?.name,
        install_date: date,
        total_amount: total,
        deposit_amount: deposit,
        client_name: c.nom,
        client_phone: c.telephone,
        client_email: c.email,
      },
      success_url: `${SITE.url}/paiement/success`,
      cancel_url: `${SITE.url}/paiement/annule`,
    };
    try {
      const res = await fetch('https://api.zenipay.ca/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZENIPAY_PUBLIC_KEY}`,
        },
        body: JSON.stringify(paymentData),
      });
      const result = await res.json();
      if (result?.url) {
        window.location.href = result.url;
        return;
      }
      setErr(`Le paiement en ligne n'est pas disponible pour le moment. Votre demande est bien reçue : on vous rappelle, ou appelez le ${PHONE}.`);
    } catch {
      setErr(`Le paiement en ligne n'est pas disponible pour le moment. Votre demande est bien reçue : on vous rappelle, ou appelez le ${PHONE}.`);
    }
    setBusy(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-6" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={SITE.shop.title}
        onClick={(e) => e.stopPropagation()}
        className="frame-grad max-h-[94svh] w-full max-w-2xl animate-fade-up rounded-b-none sm:rounded-[26px]"
      >
        <div className="relative max-h-[calc(94svh-2px)] overflow-y-auto rounded-t-[25px] bg-gradient-to-b from-[#0E1524] to-[#070a12] p-5 sm:rounded-[25px] sm:p-8">
          {/* En-tête */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">
                Étape {step}/5 · {STEPS[step - 1]}
              </p>
              <h2 className="mt-1.5 font-heading text-2xl font-extrabold text-white sm:text-3xl">{SITE.shop.title}</h2>
            </div>
            <button onClick={close} aria-label="Fermer" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[rgba(120,160,255,0.28)] text-z-dim hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-5 grid grid-cols-5 gap-1.5">
            {STEPS.map((s, i) => (
              <span key={s} className={`h-1.5 rounded-full transition-colors duration-500 ${i < step ? 'bg-accent' : 'bg-white/10'}`} />
            ))}
          </div>

          <div className="mt-7">
            {step === 1 && (
              <div className="animate-fade-up">
                <h3 className="text-lg font-bold text-white">Quelle surface faut-il couvrir ?</h3>
                <div className="relative mt-4">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    placeholder="Ex. 500"
                    className="field py-5 pr-16 text-center font-heading text-3xl font-black tnum"
                    autoFocus
                  />
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-mono text-z-faint">pi²</span>
                </div>
                <p className="mt-3 text-center text-sm text-z-faint">{SITE.shop.priceRange}</p>
                <button disabled={surface <= 0} onClick={() => setStep(2)} className="btn-main mt-6 w-full py-4 text-base">
                  Continuer <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="grid animate-fade-up gap-3 sm:grid-cols-2">
                {SITE.shop.types.map((t) => {
                  const min = Math.min(...t.options.map((o) => o.price));
                  const max = Math.max(...t.options.map((o) => o.price));
                  return (
                    <button
                      key={t.id}
                      data-on={t.id === typeId}
                      onClick={() => {
                        setTypeId(t.id);
                        setOption(null);
                        setStep(3);
                      }}
                      className="choice p-5"
                    >
                      <span className="text-lg font-extrabold text-white">{t.name}</span>
                      <span className="mt-2 font-heading text-2xl font-black text-accent">
                        {min === max ? fmtRate(min) : `${fmtRate(min)} – ${fmtRate(max)}`}
                        <span className="font-sans text-sm font-normal text-z-faint">/pi²</span>
                      </span>
                      <span className="mt-2 text-sm text-z-dim">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 3 && type && (
              <div className="animate-fade-up">
                <h3 className="text-lg font-bold text-white">{type.optionsTitle}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {type.options.map((o) => (
                    <button
                      key={o.name}
                      data-on={option?.name === o.name}
                      onClick={() => {
                        setOption({ name: o.name, price: o.price });
                        setStep(4);
                      }}
                      className="choice overflow-hidden !p-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={o.image} alt="" className="aspect-[4/3] w-full object-cover" />
                      <span className="block p-3">
                        <span className="block text-sm font-bold leading-tight text-white">{o.name}</span>
                        <span className="mt-1 block font-mono text-xs text-accent">{fmtRate(o.price)}/pi²</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <form className="animate-fade-up" onSubmit={toRecap} noValidate>
                <label className="label" htmlFor="shop-date">
                  Date d&apos;installation souhaitée
                </label>
                <input
                  id="shop-date"
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="field"
                  aria-invalid={!date && Object.keys(errors).length ? 'true' : undefined}
                />
                <p className="mt-2 text-xs text-z-faint">{SITE.shop.dateHint}</p>

                <p className="label mt-6">Vos coordonnées</p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <input className="field sm:col-span-2" placeholder="Nom complet" autoComplete="name" value={c.nom} aria-invalid={errors.nom ? 'true' : undefined} onChange={(e) => setC({ ...c, nom: e.target.value })} />
                  <input className="field" placeholder="Téléphone" type="tel" inputMode="tel" autoComplete="tel" value={c.telephone} aria-invalid={errors.telephone ? 'true' : undefined} onChange={(e) => setC({ ...c, telephone: e.target.value })} />
                  <input className="field" placeholder="Courriel" type="email" inputMode="email" autoComplete="email" value={c.email} aria-invalid={errors.email ? 'true' : undefined} onChange={(e) => setC({ ...c, email: e.target.value })} />
                  <input tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" value={c.website} onChange={(e) => setC({ ...c, website: e.target.value })} />
                </div>
                {Object.keys(errors).length > 0 && (
                  <p className="mt-2 text-xs text-red-300">À compléter : {Object.values(errors).join(', ')}{!date ? ', date' : ''}.</p>
                )}
                {err && <p role="alert" className="mt-3 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200">{err}</p>}
                <button type="submit" disabled={busy || !date} className="btn-main mt-6 w-full py-4 text-base">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Voir le récapitulatif <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            )}

            {step === 5 && (
              <div className="animate-fade-up">
                <div className="rounded-2xl border border-[rgba(120,160,255,0.16)] bg-black/30 p-5">
                  {[
                    ['Surface', `${surface.toLocaleString('fr-CA')} pi²`],
                    ['Type', type?.name ?? '—'],
                    ['Option', option?.name ?? '—'],
                    ['Date souhaitée', date ? new Date(date + 'T12:00').toLocaleDateString('fr-CA') : '—'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-white/5 py-2.5 text-sm last:border-0">
                      <span className="text-z-faint">{k}</span>
                      <span className="text-right font-semibold text-white">{v}</span>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-z-dim">Total projet</span>
                    <span className="font-heading text-2xl font-black text-white tnum">{fmtMoney(total)}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-accent/40 bg-accent/10 p-5">
                  <div>
                    <p className="font-bold text-white">Acompte (30 %)</p>
                    <p className="text-xs text-z-dim">Solde payable après l&apos;installation</p>
                  </div>
                  <span className="font-heading text-3xl font-black text-accent tnum">{fmtMoney(deposit)}</span>
                </div>

                <p className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                  <Check className="h-4 w-4 shrink-0" /> Votre demande est enregistrée — un conseiller vous rappelle sous 24 h.
                </p>
                {err && <p role="alert" className="mt-3 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm text-amber-100">{err}</p>}

                <button onClick={pay} disabled={busy} className="btn-main mt-5 w-full py-4 text-base">
                  {busy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Connexion à ZeniPay…
                    </>
                  ) : (
                    <>Réserver avec l&apos;acompte · {fmtMoney(deposit)}</>
                  )}
                </button>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-z-faint">
                  <ShieldCheck className="h-3.5 w-3.5" /> Paiement sécurisé par ZeniPay
                </p>
                <button onClick={() => setStep(1)} className="btn-ghost mt-3 w-full">
                  Modifier le projet
                </button>
              </div>
            )}

            {step > 1 && step < 5 && (
              <button onClick={() => setStep(step - 1)} className="mt-5 inline-flex items-center gap-1.5 text-sm text-z-faint hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Étape précédente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
