import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'ZeniCorp Toiture | Toiture résidentielle, commerciale et réparation',
  description: 'Toiture professionnelle. Résidentiel, commercial, réparation de fuites, inspection. Garantie, installation rapide, matériaux de qualité. Soumission gratuite 24h.',
};

export const viewport: Viewport = { themeColor: '#030303' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#030303] text-white">
        {children}
      </body>
    </html>
  );
}
