'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Clock,
  Award,
  Phone,
  CheckCircle2,
  Home,
  Building2,
  AlertTriangle,
  Search,
  Layers,
  Paintbrush,
  Droplet,
  Star,
  Zap,
  ArrowRight,
  Calculator,
  Users,
  Calendar,
  Menu,
  X,
} from 'lucide-react';

const AnimatedCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start: number;
    const animate = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

import { useRef } from 'react';

const MouseGlow = ({ color = 'rgba(245,158,11,0.3)' }: { color?: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return <div className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-50 opacity-20 blur-[100px]" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, left: pos.x - 250, top: pos.y - 250 }} />;
};

const services = [
  { icon: Home, title: 'Résidentielle', desc: 'Bardeaux architectural premium', price: 'À partir 8,500$', features: ['Bardeaux 30 ans', 'Ventilation optimale', 'Garantie 25 ans', 'Inspection'] },
  { icon: Building2, title: 'Commerciale', desc: 'Membrane PVC/TPO', price: 'Sur devis', features: ['Membrane premium', 'Isolation incluse', 'Drainage optimisé', 'Sans interruption'] },
  { icon: Droplet, title: 'Réparation Fuites', desc: 'Intervention urgente', price: 'À partir 450$', features: ['Détection pro', 'Réparation durable', '24/7 disponible', 'Rapport photo'] },
  { icon: Search, title: 'Inspection', desc: 'Rapport complet 20+ points', price: 'À partir 350$', features: ['Photos HD', 'État matériaux', 'Durée de vie', 'Recommandations'] },
];

const realisations = [
  { title: 'Remplacement Québec', desc: 'Bardeaux architectural', value: '14,500 $', img: 'https://images.pexels.com/photos/237907/pexels-photo-237907.jpeg?auto=compress&w=800' },
  { title: 'Toit plat Lévis', desc: 'Membrane PVC + iso', value: '52,000 $', img: 'https://images.pexels.com/photos/5993912/pexels-photo-5993912.jpeg?auto=compress&w=800' },
  { title: 'Urgence Montréal', desc: 'Fuite réparée 24h', value: '2,800 $', img: 'https://images.pexels.com/photos/38218884/pexels-photo-38218884.jpeg?auto=compress&w=800' },
  { title: 'Résidence Trois-Rivières', desc: 'Remplacement 2 étages', value: '19,200 $', img: 'https://images.pexels.com/photos/14064712/pexels-photo-14064712.jpeg?auto=compress&w=800' },
];

const faqs = [
  { q: 'Quand remplacer sa toiture ?', a: 'Tous les 20-25 ans pour les bardeaux. Signes : bardeaux recourbés, granules dans gouttières, fuites.' },
  { q: 'Travaillez-vous en hiver ?', a: 'Oui pour urgences. Remplacements complets de mai à octobre.' },
  { q: 'Garantie transférable ?', a: 'Oui ! Notre garantie 25 ans est transférable lors de la revente.' },
  { q: 'Assurance ?', a: '2M$ responsabilité civile + CNESST. Certificat sur demande.' },
];

export default function ToitureMega() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <MouseGlow color="rgba(245,158,11,0.3)" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Alert Banner */}
      <div className="bg-amber-500 text-black py-2 relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 text-sm font-semibold">
          <AlertTriangle className="w-4 h-4" />
          Fuite de toiture ? Urgence 24/7 - 1-800-ZENICORP
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 ${scrollY > 50 ? 'bg-[#030303]/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">ZENI<span className="text-amber-400">CORP</span></span>
                <span className="block text-[10px] text-white/40 tracking-[0.3em] uppercase">Toiture Premium</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Réalisations', 'Garantie', 'FAQ'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a href="tel:18009364267" className="hidden sm:block text-sm text-white/60">1-800-ZENICORP</a>
              <a href="/soumission" className="px-6 py-2.5 bg-amber-500 text-black text-sm font-bold rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/25">Soumission</a>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2">{mobileMenu ? <X /> : <Menu />}</button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-[#030303]/95 backdrop-blur-xl pt-28 px-6 md:hidden">
          {['Services', 'Réalisations', 'Garantie', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block text-2xl font-medium py-4 border-b border-white/10">{item}</a>
          ))}
        </div>
      )}

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-28">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-300">Garantie 25 ans incluse</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                Toiture
                <span className="block text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text">Premium</span>
              </h1>

              <p className="text-lg text-white/60 max-w-xl">Résidentiel et commercial. Bardeaux architectural, membrane PVC/TPO. Garantie 25 ans, installation rapide, matériaux certifiés.</p>

              <div className="flex flex-wrap gap-4">
                <a href="/soumission" className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30 hover:scale-105">
                  <Calculator className="w-5 h-5" />
                  Devis gratuit
                </a>
                <a href="tel:18009364267" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all">
                  <Phone className="w-5 h-5" />
                  Urgence 24/7
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030303] bg-amber-500/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-400" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-white/50 mt-1">4.9/5 - 1,800+ toitures</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img src="https://images.pexels.com/photos/33404248/pexels-photo-33404248.jpeg?auto=compress&w=1200" alt="Toiture" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-2xl font-bold text-amber-400">25</p><p className="text-xs text-white/50">Ans garantie</p></div>
                  <div><p className="text-2xl font-bold text-amber-400">24h</p><p className="text-xs text-white/50">Soumission</p></div>
                  <div><p className="text-2xl font-bold text-amber-400">2M$</p><p className="text-xs text-white/50">Assurance</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 1800, suffix: '+', label: 'Toitures', icon: Home },
              { value: 25, suffix: ' ans', label: 'Garantie', icon: Award },
              { value: 24, suffix: '/7', label: 'Urgence', icon: Clock },
              { value: 15, suffix: '+', label: 'Ans exp.', icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-amber-400" />
                </div>
                <p className="text-4xl font-bold"><AnimatedCounter end={stat.value} suffix={stat.suffix} /></p>
                <p className="text-sm text-white/50 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300 mb-6">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Nos <span className="text-amber-400">services</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-amber-500/20 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-white/50">{service.desc}</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-amber-500 text-black font-bold text-sm">{service.price}</div>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section id="realisations" className="py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Réalisations <span className="text-amber-400">récentes</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {realisations.map((r) => (
              <div key={r.title} className="group rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-black font-bold text-sm">{r.value}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold">{r.title}</h3>
                  <p className="text-sm text-white/50">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Notre <span className="text-amber-400">processus</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Soumission', desc: 'Formulaire en 2 min. Réponse sous 24h.' },
              { n: '02', title: 'Inspection', desc: 'Évaluation gratuite de votre toiture.' },
              { n: '03', title: 'Installation', desc: 'Pose professionnelle. Garantie 25 ans.' },
            ].map((step) => (
              <div key={step.n} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center group hover:border-amber-500/30 transition-all">
                <span className="text-6xl font-bold text-amber-400/20">{step.n}</span>
                <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                <p className="text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">FAQ <span className="text-amber-400">Toiture</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-lg group-hover:text-amber-400 transition-colors">
                  {faq.q}
                  <span className="text-amber-400 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-white/60">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Protégez votre <span className="text-amber-400">toit</span></h2>
          <p className="text-xl text-white/60 mb-10">Soumission gratuite sous 24h. Urgence 24/7.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/soumission" className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30 hover:scale-105">Devis gratuit</a>
            <a href="tel:18009364267" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all">1-800-ZENICORP</a>
          </div>
        </div>
      </section>
    </div>
  );
}
