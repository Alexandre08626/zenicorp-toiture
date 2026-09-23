'use client';

import { useEffect, useRef } from 'react';

/**
 * Fond global : grille de plan, halos (accent de la division + orange chantier),
 * lueur qui suit le curseur. Pose aussi --mx/--my sur la carte `.spot` survolée
 * et révèle les éléments `[data-reveal]` à l'entrée dans l'écran.
 */
export default function Backdrop() {
  const glow = useRef<HTMLDivElement>(null);

  // Révélations au défilement
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // Lueur curseur + spotlight
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const card = (e.target as Element | null)?.closest?.('.spot') as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${x - r.left}px`);
        card.style.setProperty('--my', `${y - r.top}px`);
      }
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (glow.current) {
            glow.current.style.opacity = '1';
            glow.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          }
        });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -inset-px bp-grid"
        style={{
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, #000 25%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, #000 25%, transparent 100%)',
        }}
      />
      <div
        className="absolute -left-44 -top-40 h-[640px] w-[640px] animate-drift rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.28), transparent 65%)' }}
      />
      <div
        className="absolute -right-40 top-28 h-[560px] w-[560px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.2),transparent_65%)] blur-[90px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute left-[35%] top-[70vh] h-[520px] w-[520px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(70,150,255,0.14),transparent_65%)] blur-[90px]"
        style={{ animationDelay: '-12s' }}
      />
      <div
        ref={glow}
        className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.09), rgba(255,107,26,0.05) 40%, transparent 70%)' }}
      />
    </div>
  );
}
