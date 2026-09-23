import { ArrowLeft, Check, Phone, X } from 'lucide-react';
import { SITE } from '@/site';
import { PHONE, PHONE_HREF } from '@/lib/contact';

/** Page de retour après le paiement de l'acompte ZeniPay (succès ou annulation). */
export default function StatusPage({ ok }: { ok: boolean }) {
  return (
    <main className="grid min-h-[100svh] place-items-center px-4">
      <div className="frame-grad w-full max-w-lg">
        <div className="rounded-[25px] bg-gradient-to-b from-[#0E1524] to-[#070a12] p-8 text-center sm:p-10">
          <span
            className={`mx-auto grid h-16 w-16 animate-pop place-items-center rounded-full ${ok ? 'bg-accent' : 'bg-white/10'}`}
          >
            {ok ? <Check className="h-8 w-8 text-z-noir" strokeWidth={3} /> : <X className="h-8 w-8 text-white" />}
          </span>
          <h1 className="mt-6 font-heading text-3xl font-extrabold text-white">
            {ok ? 'Acompte reçu, merci !' : 'Paiement annulé'}
          </h1>
          <p className="mt-3 leading-relaxed text-z-dim">
            {ok
              ? `Votre projet ${SITE.short.toLowerCase()} est réservé. Un conseiller vous appelle sous 24 h pour confirmer la date.`
              : 'Aucun montant n’a été prélevé. Votre demande reste enregistrée : un conseiller vous rappelle sous 24 h.'}
          </p>
          <div className="mt-8 flex flex-col gap-2.5">
            <a href="/" className="btn-main">
              <ArrowLeft className="h-4 w-4" /> Retour au site
            </a>
            <a href={PHONE_HREF} className="btn-ghost font-mono">
              <Phone className="h-4 w-4 text-accent" /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
