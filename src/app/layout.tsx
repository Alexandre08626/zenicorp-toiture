import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ZeniCorp Époxy | Finitions métalliques, flocons & naturel',
  description: 'Installation professionnelle et vente de matériel époxy premium. Métallique, flocons, naturel. Québec.',
};

export const viewport: Viewport = { themeColor: '#0a0a0f' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${inter.variable} dark`}>
      <body className="bg-[#0a0a0f] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
