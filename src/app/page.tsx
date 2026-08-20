'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Shield, Clock, Award, Phone, CheckCircle2, Home, Building2, AlertTriangle,
  Layers, Droplet, Search, Star, Zap, ArrowRight, Calculator
} from 'lucide-react';

const Counter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
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

const Particle = ({ color, delay, x, y }: { color: string; delay: number; x: string; y: string }) => (
  <div className="absolute w-2 h-2 rounded-full opacity-60" style={{ background: color, left: x, top: y, animation: `float ${3 + delay}s ease-in-out infinite`, animationDelay: `${delay}s`, filter: 'blur(1px)' }} />
);

const services = [
  { icon: Home, title: 'Résidentielle', desc: 'Bardeaux architectural premium', price: '8,500$', features: ['Bardeaux 30 ans', 'Ventilation', 'Garantie 25 ans', 'Inspection'], color: 'from-amber-300 to-orange-300' },
  { icon: Building2, title: 'Commerciale', desc: 'Membrane PVC/TPO', price: 'Sur devis', features: ['Membrane premium', 'Isolation', 'Drainage', 'Sans interruption'], color: 'from-rose-300 to-pink-300' },
  { icon: Droplet, title: 'Réparation Fuites', desc: 'Intervention urgente', price: '450$', features: ['Détection pro', 'Réparation durable', '24/7', 'Rapport'], color: 'from-violet-300 to-purple-300' },
  { icon: Search, title: 'Inspection', desc: 'Rapport complet', price: '350$', features: ['Photos HD', 'État matériaux', 'Durée vie', 'Recommandations'], color: 'from-cyan-300 to-blue-300' },
];

const realisations = [
  { title: 'Remplacement Québec', desc: 'Bardeaux architectural', value: '14,500 $', color: 'bg-amber-100' },
  { title: 'Toit plat Lévis', desc: 'Membrane PVC + iso', value: '52,000 $', color: 'bg-rose-100' },
  { title: 'Urgence Montréal', desc: 'Fuite réparée 24h', value: '2,800 $', color: 'bg-violet-100' },
  { title: 'Résidence TR', desc: 'Remplacement 2 étages', value: '19,200 $', color: 'bg-cyan-100' },
];

export default function ToiturePale() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-slate-800 overflow-x-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(245,158,11,0.3) 2px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white py-3 relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 text-sm font-bold">
          <AlertTriangle className="w-4 h-4" />
          Fuite de toiture ? Urgence 24/7 - 1-800-ZENICORP
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-12 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-amber-200/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-2xl shadow-amber-400/40 ring-8 ring-amber-100">
                <Home className="w-10 h-10 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">ZENICORP</span>
                <span className="block text-[10px] text-amber-600/70 tracking-[0.3em] uppercase font-medium">Toiture Premium</span>
              </div>
            </Link>
            <a href="/soumission" className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold rounded-full shadow-lg shadow-amber-400/30 hover:shadow-xl transition-all ring-2 ring-amber-200">
              Devis gratuit
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Particle color="#fbbf24" delay={0} x="80%" y="20%" />
              <Particle color="#fb923c" delay={0.5} x="90%" y="60%" />
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200">
                <Shield className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-amber-700 font-medium">Garantie 25 ans incluse</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-slate-800">
                Toiture{' '}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Premium</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl">Résidentiel et commercial. Bardeaux architectural, membrane PVC/TPO. Garantie 25 ans.</p>

              <div className="flex flex-wrap gap-4">
                <a href="/soumission" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-full shadow-xl shadow-amber-400/40 hover:shadow-2xl hover:scale-105 transition-all">
                  <Calculator className="w-5 h-5" />
                  Devis gratuit
                </a>
                <a href="tel:18009364267" className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-amber-200 text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-all">
                  <Phone className="w-5 h-5" />
                  Urgence 24/7
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-amber-200/50 ring-4 ring-white">
                <img src="https://images.pexels.com/photos/33404248/pexels-photo-33404248.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Toiture" className="w-full h-[700px] object-cover" />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 p-6 rounded-2xl bg-white shadow-xl border border-amber-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-2xl font-bold text-amber-600">25</p><p className="text-xs text-slate-500">Ans garantie</p></div>
                  <div><p className="text-2xl font-bold text-amber-600">24h</p><p className="text-xs text-slate-500">Soumission</p></div>
                  <div><p className="text-2xl font-bold text-amber-600">2M$</p><p className="text-xs text-slate-500">Assurance</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 1800, suffix: '+', label: 'Toitures', icon: Home, color: 'from-amber-300 to-orange-300' },
              { value: 25, suffix: ' ans', label: 'Garantie', icon: Award, color: 'from-rose-300 to-pink-300' },
              { value: 24, suffix: '/7', label: 'Urgence', icon: Clock, color: 'from-violet-300 to-purple-300' },
              { value: 15, suffix: '+', label: 'Ans exp.', icon: Shield, color: 'from-cyan-300 to-blue-300' },
            ].map((stat) => (
              <div key={stat.label} className="group p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-amber-200 transition-all shadow-lg hover:shadow-xl text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-slate-800"><Counter end={stat.value} suffix={stat.suffix} /></p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Nos <span className="text-amber-500">services</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="group p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-amber-200 transition-all shadow-lg hover:shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
                    <p className="text-slate-500">{service.desc}</p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold">{service.price}</span>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Protégez votre <span className="text-amber-500">toit</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/soumission" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-full shadow-xl shadow-amber-400/40 hover:shadow-2xl transition-all">Devis gratuit</a>
            <a href="tel:18009364267" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-700 font-bold rounded-full shadow-lg border-2 border-slate-200">1-800-ZENICORP</a>
          </div>
        </div>
      </section>
    </div>
  );
}
