import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'ZeniCorp Toiture | Toiture résidentielle, commerciale et réparation',
  description: 'Toiture professionnelle. Résidentiel, commercial, réparation de fuites, inspection. Garantie, installation rapide, matériaux de qualité. Soumission gratuite 24h.',
  keywords: ['toiture', 'bardeaux', 'réparation fuites', 'toit plat', 'inspection', 'ZeniCorp', 'Québec'],
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    siteName: 'ZeniCorp Toiture',
    title: 'ZeniCorp Toiture | Réparation, inspection et remplacement',
    description: 'Réparation, inspection, remplacement. Garantie incluse. Soumission gratuite.',
  },
};

export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <header className="bg-zenicorp-black text-white sticky top-0 z-50">
          <div className="container-zenicorp flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="ZeniCorp" className="h-10 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <Link href="/#services" className="hover:text-zenicorp-gold transition-colors">Services</Link>
              <Link href="/#realisations" className="hover:text-zenicorp-gold transition-colors">Réalisations</Link>
              <Link href="/#garantie" className="hover:text-zenicorp-gold transition-colors">Garantie</Link>
              <Link href="/#faq" className="hover:text-zenicorp-gold transition-colors">FAQ</Link>
            </nav>
            <a href="/soumission" className="btn-gold !px-4 !py-2 text-sm">Soumission gratuite</a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-zenicorp-black text-white">
          <div className="container-zenicorp py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="ZeniCorp" className="h-9 w-auto" />
              </div>
              <p className="text-sm text-zenicorp-silver">Division Toiture. Une division de ZeniCorp Groupe Construction.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-zenicorp-gold">Services</h3>
              <ul className="space-y-2 text-sm text-zenicorp-silver">
                <li><Link href="/#services" className="hover:text-white">Toiture résidentielle</Link></li>
                <li><Link href="/#services" className="hover:text-white">Toiture commerciale</Link></li>
                <li><Link href="/#services" className="hover:text-white">Réparation de fuites</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-zenicorp-gold">ZeniCorp</h3>
              <ul className="space-y-2 text-sm text-zenicorp-silver">
                <li><a href="https://zenicorp.ca" className="hover:text-white" target="_blank" rel="noopener">Site principal</a></li>
                <li><a href="https://zenicorp.ca/asphalte" className="hover:text-white" target="_blank" rel="noopener">Asphalte</a></li>
                <li><a href="https://zenicorp.ca/toiture" className="hover:text-white" target="_blank" rel="noopener">Toiture</a></li>
                <li><a href="https://zenicorp.ca/isolation" className="hover:text-white" target="_blank" rel="noopener">Isolation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-zenicorp-gold">Contact</h3>
              <ul className="space-y-2 text-sm text-zenicorp-silver">
                <li>info@zenicorp.ca</li>
                <li>1-800-ZENICORP</li>
                <li>Québec, Canada</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zenicorp-mediumGray">
            <div className="container-zenicorp py-4 text-xs text-zenicorp-silver">
              © {new Date().getFullYear()} ZeniCorp Groupe Construction. Tous droits réservés.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}