/**
 * Configuration d'un site de division Zeniva.
 * Tout ce qui change d'une division à l'autre vit dans `src/site.ts` ;
 * les composants, eux, sont identiques sur les quatre sites.
 */

export type Img = { src: string; t: string; s?: string };

export type Finish = {
  id: string;
  name: string;
  /** Prix au pied carré utilisé par le calculateur */
  price: number;
  desc: string;
  image: string;
};

export type ShopType = {
  id: string;
  name: string;
  desc: string;
  /** Titre de l'étape « option » pour ce type */
  optionsTitle: string;
  options: { name: string; image: string; price: number }[];
};

export type Faq = { q: string; a: string };

export type SiteConfig = {
  /** Slug de division reconnu par zeniva.ca/api/soumission */
  slug: 'epoxy' | 'toiture' | 'asphalte' | 'isolation';
  name: string;
  short: string;
  /** Sous-titre sous le logo (ex. « Epoxy Pro ») */
  tagline: string;
  url: string;
  title: string;
  description: string;
  /** Couleur d'accent de la division + teinte secondaire pour les dégradés */
  accent: string;
  accent2: string;
  /** Couleur d'accent en « r,g,b » pour les rgba() */
  accentRgb: string;
  hero: {
    image: string;
    alt: string;
    eyebrow: string;
    h1a: string;
    h1b: string;
    sub: string;
    trust: { icon: 'shield' | 'map' | 'clock' | 'award'; t: string }[];
  };
  calc: {
    finishLabel: string;
    surfaceLabel: string;
    finishes: Finish[];
  };
  shop: {
    title: string;
    priceRange: string;
    dateHint: string;
    types: ShopType[];
  };
  ticker: string[];
  /** Section vitrine principale (couleurs, matériaux, services…) */
  showcase: { eyebrow: string; title: string; titleAccent: string; sub: string; items: Img[]; square?: boolean };
  /** Seconde vitrine optionnelle (ex. flocons pour l'époxy) */
  showcase2?: { eyebrow: string; title: string; titleAccent: string; sub: string; items: Img[]; square?: boolean };
  gallery: Img[];
  benefits: { k: string; t: string; d: string }[];
  faq: Faq[];
  soumission: {
    projectTypes: string[];
    propertyTypes: string[];
    dimsTitle: string;
    descPlaceholder: string;
  };
  pdf: { title: string; features: string[] };
};
