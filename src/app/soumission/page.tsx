import type { Metadata } from 'next';
import { CheckCircle2, Camera, CalendarClock, User, Send, ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Soumission gratuite - Ã‰poxy | ZeniCorp',
  description: 'Obtenez votre soumission gratuite en 10 Ã©tapes. RÃ©ponse sous 24h.',
};

const steps = [
  'Type de projet',
  'Type de propriÃ©tÃ©',
  'Adresse',
  'Dimensions',
  'Description',
  'Photos',
  'Ã‰chÃ©ancier',
  'CoordonnÃ©es',
  'RÃ©sumÃ©',
  'Envoi',
];

export default function SoumissionPage() {
  return (
    <div className="container-zenicorp py-12 max-w-2xl">
      <div className="text-center mb-10">
        <p className="text-zenicorp-gold font-semibold uppercase tracking-[0.2em] text-xs mb-3">Division Ã‰poxy</p>
        <h1 className="heading-1">Soumission gratuite</h1>
        <p className="body-base mt-3">10 Ã©tapes Â· 2 minutes Â· RÃ©ponse sous 24h</p>
      </div>

      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              i === 0 ? 'bg-zenicorp-gold text-zenicorp-black' : 'bg-zenicorp-lightGray text-zenicorp-mediumGray'
            }`}>{i + 1}</div>
            {i < steps.length - 1 && <div className="w-4 h-0.5 bg-zenicorp-border mx-1" />}
          </div>
        ))}
      </div>

      <form className="card p-8">
        {/* Ã‰TAPE 1 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">1.</span> Type de projet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Garage rÃ©sidentiel', 'Commercial', 'Industriel'].map((o) => (
              <label key={o} className="border-2 border-zenicorp-border p-4 cursor-pointer hover:border-zenicorp-gold transition-colors flex items-center gap-2">
                <input type="radio" name="projet" className="accent-zenicorp-gold" />
                <span className="text-sm font-medium">{o}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ã‰TAPE 2 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">2.</span> Type de propriÃ©tÃ©
          </h2>
          <select className="input-field" defaultValue="">
            <option value="" disabled>SÃ©lectionnez...</option>
            <option>Maison unifamiliale</option>
            <option>CopropriÃ©tÃ© / Condo</option>
            <option>Immeuble commercial</option>
            <option>Immeuble industriel</option>
          </select>
        </div>

        {/* Ã‰TAPE 3 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">3.</span> Adresse du projet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input-field" placeholder="NumÃ©ro et rue" />
            <input className="input-field" placeholder="Ville" />
            <input className="input-field" placeholder="Province" />
            <input className="input-field" placeholder="Code postal" />
          </div>
        </div>

        {/* Ã‰TAPE 4 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">4.</span> Dimensions du toit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input-field" type="number" placeholder="Longueur (pi)" />
            <input className="input-field" type="number" placeholder="Largeur (pi)" />
          </div>
        </div>

        {/* Ã‰TAPE 5 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">5.</span> Description du projet
          </h2>
          <textarea className="input-field min-h-32" placeholder="DÃ©crivez votre projet : Ã©tat du plancher, fissures, taches d'huile, couleur souhaitÃ©e, paillettes..." />
        </div>

        {/* Ã‰TAPE 6 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">6.</span> Photos du toit
          </h2>
          <label className="border-2 border-dashed border-zenicorp-border p-8 flex flex-col items-center justify-center cursor-pointer hover:border-zenicorp-gold transition-colors">
            <Camera className="w-10 h-10 text-zenicorp-silver mb-2" />
            <span className="text-sm font-medium">Glissez vos photos ici (1-10)</span>
            <span className="text-xs text-zenicorp-mediumGray mt-1">JPG, PNG - max 10 photos ou 1 vidÃ©o</span>
            <input type="file" multiple accept="image/*,video/*" className="hidden" />
          </label>
        </div>

        {/* Ã‰TAPE 7 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">7.</span> Ã‰chÃ©ancier souhaitÃ©
          </h2>
          <select className="input-field" defaultValue="">
            <option value="" disabled>SÃ©lectionnez...</option>
            <option>Le plus tÃ´t possible</option>
            <option>Ce mois-ci</option>
            <option>Dans 1-3 mois</option>
            <option>Juste pour une estimation</option>
          </select>
        </div>

        {/* Ã‰TAPE 8 */}
        <div className="mb-8">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">8.</span> Vos coordonnÃ©es
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input-field" placeholder="PrÃ©nom et nom" />
            <input className="input-field" type="tel" placeholder="TÃ©lÃ©phone" />
            <input className="input-field sm:col-span-2" type="email" placeholder="Courriel" />
          </div>
        </div>

        {/* Ã‰TAPE 9 */}
        <div className="mb-8 bg-zenicorp-lightGray border border-zenicorp-border p-6">
          <h2 className="heading-3 mb-4 flex items-center gap-2">
            <span className="text-zenicorp-gold font-bold">9.</span> RÃ©sumÃ© de votre demande
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Type de projet', 'Garage rÃ©sidentiel'],
              ['PropriÃ©tÃ©', 'Maison unifamiliale'],
              ['Ville', 'â€”'],
              ['Surface', 'â€”'],
              ['Ã‰chÃ©ancier', 'â€”'],
              ['Photos', '0'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-zenicorp-border pb-2">
                <span className="text-zenicorp-mediumGray">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ã‰TAPE 10 */}
        <button type="submit" className="btn-gold w-full !py-4 text-base">
          <Send className="w-5 h-5 mr-2" />
          Envoyer ma demande de soumission
        </button>
        <p className="text-center text-xs text-zenicorp-mediumGray mt-4 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-zenicorp-gold" /> RÃ©ponse garantie sous 24h ouvrÃ©es. Aucun engagement.
        </p>
      </form>
    </div>
  );
}
