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

const px = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const HERO_IMG = px(33404248, 1920);

const services = [
  {
    icon: Home,
    title: 'Toiture résidentielle',
    desc: 'Réparation et remplacement de toits pour maisons unifamiliales, jumelées et copropriétés.',
    features: ['Bardeaux d\'asphalte premium', 'Ventilation adéquate', 'Inspection incluse', 'Garantie 10 ans'],
    img: px(18098285),
  },
  {
    icon: Building2,
    title: 'Toiture commerciale',
    desc: 'Systèmes de membrane pour toits plats et faible pente. Installations sans interruption de vos opérations.',
    features: ['Membrane PVC / TPO / bitumineuse', 'Isolation thermique', 'Drainage optimisé', 'Entretien préventif'],
    img: px(31763541),
  },
  {
    icon: Droplet,
    title: 'Réparation de fuites',
    desc: 'Intervention rapide pour fuites et infiltrations. Localisation précise et réparation durable.',
    features: ['Détection professionnelle', 'Réparation garantie', 'Service prioritaire', 'Rapport photo'],
    img: px(210538),
  },
  {
    icon: Search,
    title: 'Inspection de toiture',
    desc: 'Rapport complet avec photos, état des matériaux et recommandations chiffrées. Pour acheteurs et propriétaires.',
    features: ['Rapport détaillé 20+ points', 'Photos haute résolution', 'Estimation durée de vie', 'Recommandations'],
    img: px(38629153),
  },
];

const realisations = [
  { title: 'Remplacement complet - Québec', desc: 'Bardeaux architectural 30 ans', value: '14 500 $', img: px(237907, 600) },
  { title: 'Toit plat commercial - Lévis', desc: 'Membrane PVC + isolation', value: '52 000 $', img: px(5993912, 600) },
  { title: 'Réparation urgence - Montréal', desc: 'Fuite toiture, intervention 24h', value: '2 800 $', img: px(38218884, 600) },
  { title: 'Toiture 2 étages - Trois-Rivières', desc: 'Remplacement + cheminée', value: '19 200 $', img: px(14064712, 600) },
];

const faqs = [
  {
    q: 'Quand faut-il remplacer sa toiture ?',
    a: 'En général tous les 20-25 ans pour les bardeaux d\'asphalte. Signes : bardeaux recourbés, granules dans les gouttières, fuites.',
  },
  {
    q: 'Travaillez-vous en hiver ?',
    a: 'Oui pour les urgences et réparations. Les remplacements complets se font de préférence en saison chaude (mai-octobre).',
  },
  {
    q: 'La garantie est-elle transférable ?',
    a: 'Oui, notre garantie de 10 ans sur l\'installation est transférable si vous vendez votre maison. Un atout majeur à la revente.',
  },
  {
    q: 'Couverture d\'assurance ?',
    a: 'ZeniCorp est entièrement assuré (responsabilité civile 2M$, CNESST). Certificat disponible sur demande.',
  },
];

export default function ToiturePage() {
  return (
    <>
      {/* BANDEAU URGENCE */}
      <div className="bg-zenicorp-gold text-white">
        <div className="container-zenicorp py-3 flex items-center justify-center gap-3 text-sm font-semibold">
          <AlertTriangle className="w-5 h-5" />
          Fuite de toiture ? Urgence 24/7 - Appelez le 1-800-ZENICORP
        </div>
      </div>

      {/* HERO */}
      <section className="relative bg-zenicorp-black text-white">
        <img src={HERO_IMG} alt="Couvreur installant des bardeaux d'asphalte avec une cloueuse" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-zenicorp-black via-zenicorp-black/80 to-zenicorp-black/30"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #991B1B 0px, #991B1B 1px, transparent 1px, transparent 60px)' }}></div>
        <div className="container-zenicorp relative py-20 lg:py-28">
          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-zenicorp-gold/10 border border-zenicorp-gold/40 px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-zenicorp-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zenicorp-gold">Division Toiture de ZeniCorp</span>
            </div>
            <h1 className="heading-1 text-white !text-4xl sm:!text-5xl lg:!text-6xl mb-6">
              Une toiture solide.
              <span className="block text-zenicorp-gold">La tête tranquille.</span>
            </h1>
            <p className="text-lg text-zenicorp-silver mb-8 max-w-2xl">
              Réparation, remplacement et inspection de toiture résidentielle et commerciale.
              Matériaux premium, pose soignée, garantie 10 ans.
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
              <p className="font-semibold text-sm">Respect échéancier</p>
              <p className="text-xs text-zenicorp-mediumGray">Délais tenus</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="w-8 h-8 text-zenicorp-gold flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Matériaux premium</p>
              <p className="text-xs text-zenicorp-mediumGray">Bardeaux 30 ans</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-zenicorp-gold flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Assuré 2M$</p>
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
            <h2 className="heading-2">Protection complète du dessus de votre bâtiment</h2>
            <p className="body-base mt-4">Résidentiel, commercial et industriel. Une seule équipe pour tout.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card overflow-hidden p-0 group">
                <div className="relative h-44 overflow-hidden">
                  <img src={service.img} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-zenicorp-gold flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-zenicorp-black" />
                    </div>
                    <h3 className="text-white font-semibold drop-shadow">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="body-base text-sm mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zenicorp-mediumGray">
                        <CheckCircle2 className="w-4 h-4 text-zenicorp-gold" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section id="realisations" className="section-padding bg-white">
        <div className="container-zenicorp">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-zenicorp-gold font-semibold uppercase tracking-[0.2em] text-xs mb-3">Réalisations</p>
            <h2 className="heading-2">Des projets récents</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {realisations.map((r) => (
              <div key={r.title} className="card overflow-hidden p-0 group">
                <div className="relative h-40 overflow-hidden">
                  <img src={r.img} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-3 right-3 bg-zenicorp-gold text-zenicorp-black text-xs font-bold px-2 py-1">{r.value}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm">{r.title}</h3>
                  <p className="text-xs text-zenicorp-mediumGray mt-1">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="section-padding bg-zenicorp-black text-white">
        <div className="container-zenicorp">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-zenicorp-gold font-semibold uppercase tracking-[0.2em] text-xs mb-3">Comment ça marche</p>
            <h2 className="heading-2 text-white">3 étapes simples</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Soumission', d: 'Formulaire en 2 minutes. Réponse sous 24h avec prix détaillé.' },
              { n: '02', t: 'Inspection gratuite', d: 'Évaluation de l\'état du toit, des matériaux et de la structure par nos experts.' },
              { n: '03', t: 'Installation', d: 'Pose professionnelle, nettoyage complet du chantier et garantie 10 ans.' },
            ].map((s) => (
              <div key={s.n} className="border border-zenicorp-mediumGray p-6 hover:border-zenicorp-gold/60 transition-colors">
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
            <h2 className="heading-2">Questions fréquentes</h2>
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
          <h2 className="heading-2 text-white mb-4">Protégez ce qu\'il y a au-dessus de votre tête ?</h2>
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