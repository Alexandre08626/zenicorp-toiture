import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE } from '@/site';
import { PHONE } from '@/lib/contact';
import Backdrop from '@/components/Backdrop';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const display = Archivo({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
});
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.hero.image }],
  },
};

export const viewport: Viewport = { themeColor: '#07090E', width: 'device-width', initialScale: 1 };

// Entité de la division, rattachée à ZeniCorp (même @id que sur zeniva.ca).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'HomeAndConstructionBusiness'],
  '@id': `https://www.zeniva.ca/${SITE.slug}#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}${SITE.hero.image}`,
  description: SITE.description,
  telephone: PHONE,
  email: 'info@zeniva.ca',
  areaServed: { '@type': 'AdministrativeArea', name: 'Québec, Canada' },
  parentOrganization: { '@id': 'https://www.zeniva.ca/#organization' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const vars = {
    '--accent': SITE.accent,
    '--accent2': SITE.accent2,
    '--accent-rgb': SITE.accentRgb.replace(/,/g, ' '),
  } as React.CSSProperties;

  return (
    <html lang="fr-CA" className={`${inter.variable} ${display.variable} ${mono.variable}`} style={vars}>
      <head>
        {/* Active les révélations au défilement seulement si JS tourne (sinon tout reste visible) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Backdrop />
        {children}
        {/* Orvel AI — assistant de conversation, servi par zenitech.dev */}
        <Script
          src="https://zenitech.dev/widget/orvel.js"
          data-orvel-site="toiture"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
