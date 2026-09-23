'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Clock,
  Loader2,
  MapPin,
  Package,
  Phone,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';
import { SITE } from '@/site';
import type { Img } from '@/types';
import { DIVISIONS, PHONE, PHONE_HREF, EMAIL, fmtRate } from '@/lib/contact';
import { sendLead, validateContact } from '@/lib/lead';
import Estimator from '@/components/Estimator';
import ShopModal from '@/components/ShopModal';

const ICONS = { shield: ShieldCheck, map: MapPin, clock: Clock, award: Award };

export default function Home() {
  const [shop, setShop] = useState(false);
  const [lightbox, setLightbox] = useState<Img | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const minPrice = Math.min(...SITE.calc.finishes.map((f) => f.price));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <div className="overflow-x-clip pb-20 lg:pb-0">
      {/* ═══════════════ HEADER ═══════════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? 'border-[rgba(120,160,255,0.14)] bg-[rgba(5,7,11,0.75)] backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <div className={`wrap flex items-center justify-between gap-3 transition-all duration-500 ${scrolled ? 'h-16' : 'h-[4.5rem]'}`}>
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name}, haut de page`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-[10px] object-contain ring-1 ring-white/15" />
            <span className="leading-none">
              <span className="block font-heading text-base font-black tracking-tight text-white">
                ZENI<span className="grad-accent">VA</span>
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.26em] text-white/50">{SITE.tagline}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {[
              ['#estimation', 'Estimation'],
              ['#vitrine', SITE.showcase.eyebrow],
              ['#realisations', 'Réalisations'],
              ['#faq', 'FAQ'],
            ].map(([h, l]) => (
              <a key={h} href={h} className="rounded-[10px] px-3.5 py-2.5 text-[0.86rem] font-semibold text-z-dim transition-colors hover:bg-[rgba(120,160,255,0.08)] hover:text-white">
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setShop(true)} className="btn-ghost hidden px-4 py-2.5 sm:inline-flex">
              <Package className="h-4 w-4 text-accent" /> Configurer
            </button>
            <a href={PHONE_HREF} className="btn-ghost px-3.5 py-2.5 font-mono text-[0.8rem]" aria-label={`Appeler le ${PHONE}`}>
              <Phone className="h-4 w-4 text-accent" />
              <span className="hidden md:inline">{PHONE}</span>
            </a>
            <a href="#estimation" className="btn-main hidden px-5 py-2.5 sm:inline-flex">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="top" className="relative">
        {/* Photo en fond, fondue vers la gauche et le bas */}
        <div aria-hidden className="absolute inset-0 -z-[1] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.hero.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-z-void via-z-void/85 to-z-void/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-z-void via-z-void/20 to-z-void/60" />
          <div className="absolute inset-0 bp-grid opacity-60" />
        </div>

        <div className="wrap grid items-center gap-10 pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-12 lg:pb-20">
          <div className="min-w-0 lg:col-span-7">
            <span className="chip">
              <span className="chip-dot" />
              {SITE.hero.eyebrow}
            </span>

            <h1 className="mt-6 font-heading text-[clamp(2.4rem,5vw,4.3rem)] font-black leading-[0.98] tracking-[-0.035em] text-white">
              {SITE.hero.h1a}
              <br />
              <span className="grad-accent">{SITE.hero.h1b}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-z-dim sm:text-xl">{SITE.hero.sub}</p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {SITE.hero.trust.map(({ icon, t }) => {
                const I = ICONS[icon];
                return (
                  <li key={t} className="flex items-center gap-2 text-sm font-medium text-white/85">
                    <I className="h-[18px] w-[18px] text-accent" />
                    {t}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#estimation" className="btn-main py-4 text-base lg:hidden">
                Estimer mon projet <ArrowRight className="h-4 w-4" />
              </a>
              <button onClick={() => setShop(true)} className="btn-ghost py-4 text-base">
                <Package className="h-4 w-4 text-accent" /> Configurer et réserver
              </button>
              <a href={PHONE_HREF} className="btn-ghost py-4 font-mono text-base">
                <Phone className="h-4 w-4 text-accent" /> {PHONE}
              </a>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[rgba(120,160,255,0.14)] pt-6">
              {[
                { k: fmtRate(minPrice), l: 'À partir de /pi²' },
                { k: 'RBQ', l: 'Entrepreneur certifié' },
                { k: '24 h', l: 'Rappel garanti' },
              ].map((m) => (
                <div key={m.l} className="flex flex-col gap-1">
                  <dt className="order-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-z-faint">{m.l}</dt>
                  <dd className="order-1 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-[1.7rem]">{m.k}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0 scroll-mt-24 lg:col-span-5">
            <Estimator />
          </div>
        </div>
      </section>

      {/* ═══════════════ TICKER ═══════════════ */}
      <div className="relative overflow-hidden border-y border-[rgba(120,160,255,0.14)] bg-z-noir/60 py-4 mask-fade-edges" aria-hidden>
        <div className="flex w-max animate-marquee gap-11 hover:[animation-play-state:paused]">
          {[...SITE.ticker, ...SITE.ticker, ...SITE.ticker, ...SITE.ticker].map((s, i) => (
            <span key={i} className="flex items-center gap-4 whitespace-nowrap font-mono text-[0.8rem] font-medium tracking-[0.05em] text-z-dim">
              {s}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ AVANTAGES ═══════════════ */}
      <section className="sec">
        <div className="wrap">
          <div data-reveal className="max-w-2xl">
            <span className="eyebrow">Pourquoi Zeniva</span>
            <h2 className="h2 mt-5">
              Un travail propre. <span className="grad-accent">Un prix clair.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.benefits.map((b, i) => (
              <div key={b.t} data-reveal style={{ ['--rd' as string]: `${i * 70}ms` }} className="spot panel relative overflow-hidden p-7">
                <span aria-hidden className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full opacity-30 blur-2xl" style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }} />
                <p className="relative font-heading text-4xl font-black tracking-tight text-white">{b.k}</p>
                <p className="relative mt-3 font-mono text-label uppercase text-accent">{b.t}</p>
                <p className="relative mt-2 text-sm leading-relaxed text-z-dim">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VITRINES ═══════════════ */}
      <Showcase id="vitrine" data={SITE.showcase} onOpen={setLightbox} />
      {SITE.showcase2 && <Showcase data={SITE.showcase2} onOpen={setLightbox} />}

      {/* ═══════════════ PROCESSUS ═══════════════ */}
      <section className="relative border-t border-[rgba(120,160,255,0.1)]">
        <div aria-hidden className="hazard h-2 w-full opacity-80" />
        <div className="wrap sec">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div data-reveal className="lg:col-span-5">
              <span className="eyebrow">Comment ça marche</span>
              <h2 className="h2 mt-5">
                Trois étapes. <span className="grad-build">Zéro casse-tête.</span>
              </h2>
              <p className="lead mt-5 max-w-md">De l&apos;estimation en ligne au plancher, au toit ou au terrain terminé : un seul interlocuteur du début à la fin.</p>
              <a href="#estimation" className="btn-main mt-8">
                Obtenir mon prix <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ol className="grid gap-3 lg:col-span-7">
              {[
                { t: 'Estimation en ligne', d: 'Choisissez votre option et votre surface : le prix s’affiche en direct. Devis PDF immédiat.' },
                { t: 'Visite et prix ferme', d: 'Un conseiller vous rappelle sous 24 h, planifie la visite et confirme le prix final.' },
                { t: 'Travaux exécutés', d: 'Entrepreneur certifié RBQ, chantier propre, garantie écrite à la fin des travaux.' },
              ].map((s, i) => (
                <li key={s.t} data-reveal style={{ ['--rd' as string]: `${i * 80}ms` }} className="spot panel flex gap-5 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-accent/50 bg-z-noir font-mono text-sm font-bold text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-extrabold text-white sm:text-xl">{s.t}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-z-dim">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div aria-hidden className="hazard h-2 w-full opacity-80" />
      </section>

      {/* ═══════════════ RÉALISATIONS ═══════════════ */}
      <section id="realisations" className="sec scroll-mt-16">
        <div className="wrap">
          <div data-reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Réalisations</span>
              <h2 className="h2 mt-5">
                Le résultat <span className="grad-accent">parle de lui-même.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-z-faint">Cliquez sur une photo pour l&apos;agrandir.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SITE.gallery.map((g, i) => (
              <button
                key={g.src + i}
                data-reveal
                style={{ ['--rd' as string]: `${(i % 2) * 80}ms` }}
                onClick={() => setLightbox(g)}
                className="hud group relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[rgba(120,160,255,0.12)] text-left"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-3">
                  <span>
                    <span className="block font-heading text-2xl font-extrabold text-white sm:text-3xl">{g.t}</span>
                    {g.s && <span className="mt-1 block text-sm font-medium text-accent">{g.s}</span>}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-black/40 backdrop-blur transition-colors group-hover:border-accent">
                    <Plus className="h-4 w-4 text-white" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" className="sec scroll-mt-16 border-t border-[rgba(120,160,255,0.1)]">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="h2 mt-5">
              Vous vous <span className="grad-accent">demandez…</span>
            </h2>
            <p className="lead mt-5">Une autre question ? Un conseiller répond au téléphone.</p>
            <a href={PHONE_HREF} className="btn-ghost mt-6 font-mono">
              <Phone className="h-4 w-4 text-accent" /> {PHONE}
            </a>
          </div>
          <div className="lg:col-span-8">
            {SITE.faq.map((f, i) => (
              <details key={f.q} data-reveal style={{ ['--rd' as string]: `${i * 50}ms` }} className="group border-t border-[rgba(120,160,255,0.14)] last:border-b" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-heading text-lg font-bold leading-snug text-white sm:text-xl">{f.q}</span>
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-[rgba(120,160,255,0.28)] transition-transform duration-300 group-open:rotate-45 group-open:border-accent">
                    <Plus className="h-4 w-4 text-accent" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 leading-relaxed text-z-dim">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="pb-20 sm:pb-28">
        <div className="wrap">
          <div data-reveal className="frame-grad">
            <div className="relative grid gap-10 overflow-hidden rounded-[25px] bg-gradient-to-br from-[#0E1524] to-[#070a12] px-5 py-10 sm:px-12 sm:py-14 lg:grid-cols-2 lg:items-center lg:px-14">
              <div aria-hidden className="absolute -left-40 -top-52 h-[520px] w-[520px] rounded-full blur-[30px]" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.22), transparent 65%)' }} />
              <div aria-hidden className="absolute -bottom-52 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.18),transparent_65%)] blur-[30px]" />
              <div className="relative">
                <span className="eyebrow">On vous rappelle</span>
                <h2 className="h2 mt-5">
                  Parlons de votre projet <span className="grad-build">{SITE.short.toLowerCase()}.</span>
                </h2>
                <p className="lead mt-5 max-w-md">Laissez vos coordonnées : un conseiller vous rappelle sous 24 h. Gratuit et sans engagement.</p>
                <ul className="mt-6 space-y-2.5">
                  {['Soumission gratuite', 'Entrepreneur certifié RBQ', 'Partout au Québec'].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-white/85">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-accent/15">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <CallbackForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PIED DE PAGE ═══════════════ */}
      <footer className="relative border-t border-[rgba(120,160,255,0.14)] bg-z-noir/80">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,var(--accent) 30%,#ff6b1a 70%,transparent)' }} />
        <div className="wrap grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className="h-10 w-10 rounded-[10px] object-contain ring-1 ring-white/15" />
              <span className="font-heading text-lg font-black text-white">{SITE.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-z-dim">
              Une division de Zeniva, la plateforme de construction et de rénovation au Québec. Entrepreneurs certifiés RBQ.
            </p>
            <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[rgba(120,160,255,0.28)] bg-z-surface/70 px-5 py-3.5 font-mono text-xl text-white transition-colors hover:border-accent">
              <Phone className="h-5 w-5 text-accent" /> {PHONE}
            </a>
          </div>
          <div className="md:col-span-3">
            <p className="label">Réseau Zeniva</p>
            <ul className="mt-4 space-y-1">
              {DIVISIONS.map((d) => (
                <li key={d.slug}>
                  <a href={d.url} className={`group flex items-center justify-between border-b border-[rgba(120,160,255,0.1)] py-2.5 text-sm transition-colors hover:text-white ${d.slug === SITE.slug ? 'text-white' : 'text-z-dim'}`}>
                    <span className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
                      {d.name}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="label">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-z-dim">
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> Partout au Québec</li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
              <li><a href="/soumission" className="hover:text-white">Soumission détaillée →</a></li>
              <li><a href="https://www.zeniva.ca" className="hover:text-white">zeniva.ca — la plateforme ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="wrap flex flex-col gap-2 border-t border-[rgba(120,160,255,0.1)] py-6 text-xs text-z-faint sm:flex-row sm:justify-between">
          <p className="font-mono uppercase tracking-widest">© {new Date().getFullYear()} Zeniva — Tous droits réservés</p>
          <p>Prix indicatifs ; une visite confirme le prix final.</p>
        </div>
      </footer>

      {/* ═══════════════ BARRE MOBILE ═══════════════ */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(120,160,255,0.2)] bg-[rgba(5,7,11,0.92)] p-3 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-[auto_1fr] gap-2.5">
          <a href={PHONE_HREF} className="btn-ghost px-5 py-3.5" aria-label={`Appeler le ${PHONE}`}>
            <Phone className="h-5 w-5 text-accent" /> Appeler
          </a>
          <a href="#estimation" className="btn-main py-3.5 text-[0.95rem]">
            Estimation gratuite <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <ShopModal open={shop} onClose={() => setShop(false)} />

      {lightbox && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Fermer" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt={lightbox.t} className="max-h-[82vh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center font-heading text-lg font-bold text-white">
              {lightbox.t} {lightbox.s && <span className="font-sans text-sm font-normal text-accent">· {lightbox.s}</span>}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

function Showcase({
  id,
  data,
  onOpen,
}: {
  id?: string;
  data: NonNullable<typeof SITE.showcase2>;
  onOpen: (i: Img) => void;
}) {
  const n = data.items.length;
  const cols = n === 2 ? 'sm:grid-cols-2' : n % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  const aspect = n === 2 ? 'aspect-[4/3]' : data.square ? 'aspect-square' : 'aspect-[4/5]';
  return (
    <section id={id} className="sec scroll-mt-16 border-t border-[rgba(120,160,255,0.1)]">
      <div className="wrap">
        <div data-reveal className="max-w-2xl">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="h2 mt-5">
            {data.title} <span className="grad-accent">{data.titleAccent}</span>
          </h2>
          <p className="lead mt-5">{data.sub}</p>
        </div>
        <div className={`mt-12 grid gap-3 sm:gap-4 ${n === 2 ? 'grid-cols-1' : 'grid-cols-2'} ${cols}`}>
          {data.items.map((it, i) => (
            <button
              key={it.src + it.t}
              data-reveal
              style={{ ['--rd' as string]: `${(i % 4) * 60}ms` }}
              onClick={() => onOpen(it)}
              className={`spot group relative overflow-hidden rounded-[20px] border border-[rgba(120,160,255,0.14)] bg-z-card text-left ${aspect}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
              <span className="absolute inset-x-4 bottom-4">
                <span className="block font-heading text-base font-extrabold text-white sm:text-lg">{it.t}</span>
                {it.s && <span className="mt-0.5 block font-mono text-[0.7rem] text-accent">{it.s}</span>}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallbackForm() {
  const [c, setC] = useState({ nom: '', telephone: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  // Les erreurs se mettent à jour pendant la saisie (seulement après une première tentative)
  useEffect(() => {
    if (Object.keys(errors).length) setErrors(validateContact(c));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c]);
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateContact(c);
    setErrors(v);
    if (Object.keys(v).length) return;
    setState('sending');
    setErr('');
    const r = await sendLead({ ...c, origine: 'formulaire de rappel' });
    if (r.ok) setState('done');
    else {
      setState('idle');
      setErr(r.error);
    }
  }

  if (state === 'done')
    return (
      <div className="relative rounded-2xl border border-accent/40 bg-accent/10 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 animate-pop place-items-center rounded-full bg-accent">
          <Check className="h-7 w-7 text-z-noir" strokeWidth={3} />
        </span>
        <p className="mt-4 font-heading text-2xl font-extrabold text-white">Merci {c.nom.split(' ')[0]} !</p>
        <p className="mt-2 text-z-dim">On vous rappelle sous 24 h.</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-2.5">
      <input className="field" placeholder="Nom complet" autoComplete="name" value={c.nom} aria-invalid={errors.nom ? 'true' : undefined} onChange={(e) => setC({ ...c, nom: e.target.value })} />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <input className="field" placeholder="Téléphone" type="tel" inputMode="tel" autoComplete="tel" value={c.telephone} aria-invalid={errors.telephone ? 'true' : undefined} onChange={(e) => setC({ ...c, telephone: e.target.value })} />
        <input className="field" placeholder="Courriel" type="email" inputMode="email" autoComplete="email" value={c.email} aria-invalid={errors.email ? 'true' : undefined} onChange={(e) => setC({ ...c, email: e.target.value })} />
      </div>
      <textarea className="field min-h-[96px] resize-y" placeholder="Votre projet en quelques mots (optionnel)" value={c.message} onChange={(e) => setC({ ...c, message: e.target.value })} />
      <input tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" value={c.website} onChange={(e) => setC({ ...c, website: e.target.value })} />
      {Object.keys(errors).length > 0 && <p className="text-xs text-red-300">À compléter : {Object.values(errors).join(', ')}.</p>}
      {err && <p role="alert" className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200">{err}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn-main mt-1 py-4 text-base">
        {state === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Me faire rappeler <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
