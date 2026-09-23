import type { SiteConfig } from '@/types';

export const SITE: SiteConfig = {
  slug: 'toiture',
  name: 'Zeniva Toiture',
  short: 'Toiture',
  tagline: 'Toiture Pro',
  url: 'https://toiture.zeniva.ca',
  title: 'Zeniva Toiture | Bardeaux & tôle métallique — Québec',
  description:
    "Toiture neuve, réparation et inspection partout au Québec : bardeaux d'asphalte et tôle métallique. Estimation en ligne en 30 secondes, entrepreneur certifié RBQ, urgence 24/7.",
  accent: '#FF7A3D',
  accent2: '#FFB020',
  accentRgb: '255,122,61',
  hero: {
    image: '/images/toiture-hero.jpg',
    alt: 'Toiture résidentielle',
    eyebrow: 'Zeniva Toiture · Partout au Québec',
    h1a: 'Votre toiture,',
    h1b: 'estimée en 30 secondes.',
    sub: "Toiture neuve, réparation et inspection. Bardeaux d'asphalte et tôle métallique, matériaux haut de gamme.",
    trust: [
      { icon: 'shield', t: 'Garantie 10 à 50 ans' },
      { icon: 'map', t: 'Partout au Québec' },
      { icon: 'clock', t: 'Urgence 24/7' },
    ],
  },
  calc: {
    finishLabel: 'Type de couverture',
    surfaceLabel: 'Superficie de la toiture',
    finishes: [
      { id: 'bardeaux', name: "Bardeaux d'asphalte", price: 5.5, desc: 'Classique, durable, garantie 25 ans', image: '/images/toiture-bardeaux.jpg' },
      { id: 'metal', name: 'Tôle métallique', price: 8.5, desc: 'Durée de vie 50 ans, entretien minime', image: '/images/toiture-metal.jpg' },
    ],
  },
  shop: {
    title: 'Configurer votre toiture',
    priceRange: 'De 5,50 $ à 15,00 $ / pi² selon la couverture choisie',
    dateHint: 'Pose effectuée dans les plus brefs délais.',
    types: [
      {
        id: 'bardeaux',
        name: "Bardeaux d'asphalte",
        desc: 'Classique, durable, garantie 25 ans',
        optionsTitle: 'Choisissez votre bardeau',
        options: [
          { name: 'Bardeaux standard', image: '/images/toiture-bardeaux.jpg', price: 5.5 },
          { name: 'Bardeaux architecturaux', image: '/images/toiture-bardeaux.jpg', price: 6.5 },
          { name: 'Bardeaux premium', image: '/images/toiture-bardeaux.jpg', price: 7.5 },
        ],
      },
      {
        id: 'metal',
        name: 'Tôle métallique',
        desc: 'Durée de vie 50 ans, entretien minime',
        optionsTitle: 'Choisissez votre tôle',
        options: [
          { name: 'Tôle acier', image: '/images/toiture-metal.jpg', price: 8.5 },
          { name: 'Tôle aluminium', image: '/images/toiture-metal.jpg', price: 10.0 },
          { name: 'Tôle cuivre', image: '/images/toiture-metal.jpg', price: 15.0 },
        ],
      },
    ],
  },
  ticker: [
    'Bardeaux asphaltiques',
    'Tôle métallique',
    'Membrane TPO',
    'Membrane EPDM',
    'Réparation de fuites',
    'Remplacement complet',
    'Inspection avec rapport',
    'Ventilation de toiture',
    'Urgence 24/7',
  ],
  showcase: {
    eyebrow: 'Matériaux',
    title: 'Nos',
    titleAccent: 'matériaux.',
    sub: 'Deux familles de couvertures, choisies pour durer sous le climat québécois.',
    items: [
      { src: '/images/toiture-bardeaux.jpg', t: "Bardeaux d'asphalte", s: '5,50 $ – 7,50 $ / pi²' },
      { src: '/images/toiture-metal.jpg', t: 'Tôle métallique', s: '8,50 $ – 15,00 $ / pi²' },
    ],
  },
  gallery: [
    { src: '/images/toiture-realisation-1.jpg', t: 'Résidentiel', s: 'Toiture neuve' },
    { src: '/images/toiture-realisation-2.jpg', t: 'Commercial', s: 'Grande surface' },
    { src: '/images/reseau-toiture-1.jpg', t: 'Toiture neuve', s: 'Bardeaux architecturaux' },
    { src: '/images/reseau-toiture-4.jpg', t: 'Solins et bardeaux', s: 'Parfaitement scellé' },
  ],
  benefits: [
    { k: '50 ans', t: 'Durée de vie', d: 'Avec la tôle métallique, pour un entretien minime.' },
    { k: '24/7', t: 'Urgence', d: 'Fuite ou bris : on intervient rapidement.' },
    { k: 'RBQ', t: 'Certifié', d: 'Couvreur licencié et assuré.' },
    { k: '5,50 $', t: 'À partir de', d: "Par pied carré, bardeaux d'asphalte." },
  ],
  faq: [
    {
      q: 'Combien de temps dure une toiture de bardeaux ?',
      a: "Un bardeau architectural bien ventilé dure généralement de 25 à 30 ans au Québec. La ventilation de l'entretoit et la qualité des solins comptent souvent autant que le bardeau lui-même.",
    },
    {
      q: 'Réparer une section ou refaire la toiture ?',
      a: 'Une fuite localisée sur une toiture jeune se répare. Si les bardeaux sont cassants, granulés ou en fin de vie sur plusieurs versants, le remplacement complet coûte moins cher que des réparations répétées.',
    },
    {
      q: 'Puis-je faire inspecter ma toiture avant d’acheter ?',
      a: "Oui. L'inspection préventive avec rapport écrit documente l'état des bardeaux, des solins et de la ventilation, ce qui est utile lors d'une transaction immobilière.",
    },
    {
      q: 'Bardeaux ou tôle : quelle différence de prix à long terme ?',
      a: "Le bardeau coûte moins cher à l'installation. La tôle coûte plus au départ, mais sa durée de vie d'environ 50 ans et son entretien minime la rendent souvent plus avantageuse sur la durée.",
    },
  ],
  soumission: {
    projectTypes: ['Toiture neuve', 'Réparation / fuite', 'Inspection'],
    propertyTypes: ['Maison unifamiliale', 'Copropriété / condo', 'Immeuble commercial', 'Immeuble industriel'],
    dimsTitle: 'Dimensions de la toiture',
    descPlaceholder: 'Âge de la toiture, fuites, pente, type de couverture souhaité…',
  },
  pdf: {
    title: 'DEVIS ESTIMATIF',
    features: ['Garantie de 10 à 50 ans selon le matériau', 'Couvreur certifié RBQ', "Service d'urgence 24/7"],
  },
};
