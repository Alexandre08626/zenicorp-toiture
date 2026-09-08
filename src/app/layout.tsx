import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Zeniva Toiture | Bardeaux & tôle métallique',
  description: 'Installation, réparation et inspection de toiture. Bardeaux d\'asphalte, tôle métallique. Résidentiel et commercial. Québec.',
};

export const viewport: Viewport = { themeColor: '#0f0a0a' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${inter.variable} dark`}>
      <body className="bg-[#0f0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}