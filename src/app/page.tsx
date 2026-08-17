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
} from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Toiture rÃ©sidentielle',
    desc: 'RÃ©paration et remplacement de toits pour maisons unifamiliales, jumelÃ©es et copropriÃ©tÃ©s.',
    features: ['Bardeaux d\'asphalte premium', 'Ventilation adÃ©quate', 'Inspection incluse', 'Garantie 10 ans'],
  },
  {
    icon: Building2,
    title: 'Toiture commerciale',
    desc: 'SystÃ¨mes de membrane pour toits plats et faible pente. Installations sans interruption de vos opÃ©rations.',
    features: ['Membrane PVC / TPO / bitumineuse', 'Isolation thermique', 'Drainage optimisÃ©', 'Entretien prÃ©ventif'],
  },
  {
    icon: Droplet,
    title: 'RÃ©paration de fuites',
    desc: 'Intervention rapide pour fuites et infiltrations. Localisation prÃ©cise et rÃ©paration durable.',
    features: ['DÃ©tection professionnelle', 'RÃ©paration garantie', 'Service prioritaire', 'Rapport photo'],
  },
  {
    icon: Search,
    title: 'Inspection de toiture',
    desc: 'Rapport complet avec photos, Ã©tat des matÃ©riaux et recommandations chiffrÃ©es. Pour acheteurs et propriÃ©taires.',
    features: ['Rapport dÃ©taillÃ© 20+ points', 'Photos haute rÃ©solution', 'Estimation durÃ©e de vie', 'Recommandations'],
  },
];

const realisations = [
  { title: 'Remplacement complet - QuÃ©bec', desc: 'Bardeaux architectural 30 ans', value: '14 500 $' },
  { title: 'Toit plat commercial - LÃ©vis', desc: 'Membrane PVC + isolation', value: '52 000 $' },
  { title: 'RÃ©paration urgence - MontrÃ©al', desc: 'Fuite toiture, intervention 24h', value: '2 800 $' },
  { title: 'Toiture 2 Ã©tages - Trois-RiviÃ¨res', desc: 'Remplacement + cheminÃ©e', value: '19 200 $' },
];

const faqs = [
  {
    q: 'Quand faut-il remplacer sa toiture ?',
    a: 'En gÃ©nÃ©ral tous les 20-25 ans pour les bardeaux d\'asphalte. Signes : bardeaux recourbÃ©s, granules dans les gouttiÃ¨res, fuites.',
  },
  {
    q: 'Travaillez-vous en hiver ?',
    a: 'Oui pour les urgences et rÃ©parations. Les remplacements complets se font de prÃ©fÃ©rence en saison chaude (mai-octobre).',
  },
  {
    q: 'La garantie est-elle transfÃ©rable ?',
    a: 'Oui, notre garantie de 10 ans sur l\'installation est transfÃ©rable si vous vendez votre maison. Un atout majeur Ã  la revente.',
  },
  {
    q: 'Couverture d\'assurance ?',
    a: 'ZeniCorp est entiÃ¨rement assurÃ© (responsabilitÃ© civile 2M$, CNESST). Certificat disponible sur demande.',
  },
];

export default function ToiturePage() {
  return (
    <>
      {/* BANDEAU URGENCE */}
      <div className="bg-zenicorp-gold text-zenicorp-black">
        <div className="container-zenicorp py-3 flex items-center justify-center gap-3 text-sm font-semibold">
          <AlertTriangle className="w-5 h-5" />
          Fuite de toiture ? Urgence 24/7 - Appelez le 1-800-ZENICORP
        </div>
      </div>

      {/* HERO */}
      <section className="relative bg-zenicorp-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-zenicorp-black via-zenicorp-darkGray to-zenicorp-black"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EF4444 0px, #EF4444 1px, transparent 1px, transparent 60px)' }}></div>
        <div className="container-zenicorp relative py-20 lg:py-28">
          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-zenicorp-gold/10 border border-zenicorp-gold/40 px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-zenicorp-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zenicorp-gold">Division Toiture de ZeniCorp</span>
            </div>
            <h1 className="heading-1 text-white !text-4xl sm:!text-5xl lg:!text-6xl mb-6">
              Une toiture solide.
              <span className="block text-zenicorp-gold">La tÃªte tranquille.</span>
            </h1>
            <p className="text-lg text-zenicorp-silver mb-8 max-w-2xl">
              RÃ©paration, remplacement et inspection de toiture rÃ©sidentielle et commerciale.
              MatÃ©riaux premium, pose soignÃ©e, garantie 10 ans.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/soumission" className="btn-gold">Obtenir une soumission gratuite</a>
              <a href="tel:18009364267" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-zenicorp-black">
                <Phone className="w-4 h-4 mr-2" /> 1-800-ZENICORP
              </a>
            </div>
            <div className="flex flex-wrap gap-8 mt-12">
              <div className="flex items-center gap-2 text-sm text-zenicorp-silver">
                <CheckCircle2 className="w-5 h-5 text-zenicorp-gold" /> Garantie 10 ans
              </div>
              <div className="flex items-center gap-2 text-sm text-zenicorp-silver">
                <CheckCircle2 className="w-5 h-5 text-zenicorp-gold" /> Soumission sous 24h
              </div>
              <div className="flex items-center gap-2 text-sm text-zenicorp-silver">
                <CheckCircle2 className="w-5 h-5 text-zenicorp-gold" /> Urgence 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU AVANTAGES */}
      <section className="bg-white border-b border-zenicorp-border">
        <div className="container-zenicorp py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-zenicorp-gold flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Garantie 10 ans</p>
              <p className="text-xs text-zenicorp-mediumGray">Transferable</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-zenicorp-gold flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Respect Ã©chÃ©ancier</p>
              <p className="text-xs text-zenicorp-mediumGray">DÃ©lais tenus</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="w-8 h-8 text-zenicorp-gold flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">MatÃ©riaux premium</p>
              <p className="text-xs text-zenicorp-mediumGray">Bardeaux 30 ans</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-zenicorp-gold flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">AssurÃ© 2M$</p>
              <p className="text-xs text-zenicorp-mediumGray">CNESST + RC</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding bg-zenicorp-lightGray">
        <div className="container-zenicorp">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-zenicorp-gold font-semibold uppercase tracking-[0.2em] text-xs mb-3">Nos services</p>
            <h2 className="heading-2">Protection complÃ¨te du dessus de votre bÃ¢timent</h2>
            <p className="body-base mt-4">RÃ©sidentiel, commercial et industriel. Une seule Ã©quipe pour tout.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card p-6">
                <div className="w-12 h-12 bg-zenicorp-black flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-zenicorp-gold" />
                </div>
                <h3 className="heading-3 mb-3">{service.title}</h3>
                <p className="body-base text-sm mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zenicorp-mediumGray">
                      <CheckCircle2 className="w-4 h-4 text-zenicorp-gold" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RÃ‰ALISATIONS */}
      <section id="realisations" className="section-padding bg-white">
        <div className="container-zenicorp">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-zenicorp-gold font-semibold uppercase tracking-[0.2em] text-xs mb-3">RÃ©alisations</p>
            <h2 className="heading-2">Des projets rÃ©cents</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {realisations.map((r) => (
              <div key={r.title} className="card p-6">
                <div className="h-32 bg-gradient-to-br from-zenicorp-darkGray to-zenicorp-black flex items-center justify-center mb-4">
                  <Paintbrush className="w-10 h-10 text-zenicorp-gold" />
                </div>
                <h3 className="font-semibold text-sm">{r.title}</h3>
                <p className="text-xs text-zenicorp-mediumGray mt-1">{r.desc}</p>
                <p className="text-zenicorp-gold font-bold text-sm mt-2">{r.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="section-padding bg-zenicorp-black text-white">
        <div className="container-zenicorp">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-zenicorp-gold font-semibold uppercase tracking-[0.2em] text-xs mb-3">Comment Ã§a marche</p>
            <h2 className="heading-2 text-white">3 Ã©tapes simples</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Soumission', d: 'Formulaire en 2 minutes. RÃ©ponse sous 24h avec prix dÃ©taillÃ©.' },
              { n: '02', t: 'Inspection gratuite', d: 'Ã‰valuation de l\'Ã©tat du toit, des matÃ©riaux et de la structure par nos experts.' },
              { n: '03', t: 'Installation', d: 'Pose professionnelle, nettoyage complet du chantier et garantie 10 ans.' },
            ].map((s) => (
              <div key={s.n} className="border border-zenicorp-mediumGray p-6">
                <span className="font-heading text-5xl text-zenicorp-gold font-bold">{s.n}</span>
                <h3 className="text-xl font-semibold mt-4 mb-2">{s.t}</h3>
                <p className="text-sm text-zenicorp-silver">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-zenicorp-lightGray">
        <div className="container-zenicorp max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-zenicorp-gold font-semibold uppercase tracking-[0.2em] text-xs mb-3">FAQ</p>
            <h2 className="heading-2">Questions frÃ©quentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="card p-6 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold">
                  {f.q}
                  <span className="text-zenicorp-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="body-base text-sm mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-zenicorp-black text-white">
        <div className="container-zenicorp py-16 text-center">
          <h2 className="heading-2 text-white mb-4">ProtÃ©gez ce qu\'il y a au-dessus de votre tÃªte ?</h2>
          <p className="text-zenicorp-silver mb-8">Soumission gratuite sous 24h. Urgence 24/7.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/soumission" className="btn-gold">Obtenir ma soumission gratuite</a>
            <a href="tel:18009364267" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-zenicorp-black">
              <Phone className="w-4 h-4 mr-2" /> 1-800-ZENICORP
            </a>
          </div>
        </div>
      </section>
    </>
  );
}