'use client';

import { useState, useEffect } from 'react';
import { Phone, Check, ArrowRight, Calculator, MapPin, Clock, Shield, X, Package } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function ToiturePage() {
  const [mounted, setMounted] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showShop, setShowShop] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);

  const [sqft, setSqft] = useState('');
  const [finishType, setFinishType] = useState<'bardeaux' | 'metal'>('bardeaux');
  const pricePerSqft = finishType === 'bardeaux' ? 5.50 : 8.50;
  const estimatedTotal = sqft ? parseFloat(sqft) * pricePerSqft : 0;
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({ src: '', alt: '' });
  
  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage({ src: '', alt: '' });
  };
  
  const [shopStep, setShopStep] = useState(1);
  const [projectSqft, setProjectSqft] = useState('');
  const [projectFinish, setProjectFinish] = useState<'bardeaux' | 'metal' | null>(null);
  const [projectOption, setProjectOption] = useState('');
  const [installDate, setInstallDate] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  const resetShop = () => {
    setShopStep(1);
    setProjectSqft('');
    setProjectFinish(null);
    setProjectOption('');
    setInstallDate('');
    setPaymentProcessing(false);
  };
  
  const getPricePerSqft = () => {
    if (projectFinish === 'bardeaux') return 5.50;
    return 8.50;
  };
  
  const getProjectTotal = () => {
    const sqftNum = parseFloat(projectSqft) || 0;
    return sqftNum * getPricePerSqft();
  };
  
  const getDepositAmount = () => {
    return getProjectTotal() * 0.30;
  };
  
  const bardeauxOptions = [
    { name: 'Bardeaux Standard', image: '/images/toiture-bardeaux.jpg', price: 5.50 },
    { name: 'Bardeaux Architecturaux', image: '/images/toiture-bardeaux.jpg', price: 6.50 },
    { name: 'Bardeaux Premium', image: '/images/toiture-bardeaux.jpg', price: 7.50 },
  ];
  
  const metalOptions = [
    { name: 'Tole Acier', image: '/images/toiture-metal.jpg', price: 8.50 },
    { name: 'Tole Aluminum', image: '/images/toiture-metal.jpg', price: 10.00 },
    { name: 'Tole Cuivre', image: '/images/toiture-metal.jpg', price: 15.00 },
  ];

  const submitLeadToDashboard = async () => {
    const surface = Number.parseFloat(sqft || '0');
    const total = surface * pricePerSqft;
    const finishLabel = finishType === 'bardeaux' ? 'Bardeaux' : 'Tole metallique';
    
    const leadData = {
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      service: 'toiture',
      surface: surface,
      finishType: finishLabel,
      estimatedTotal: total,
      source: 'website-calculator',
      date: new Date().toISOString()
    };
    
    try {
      await fetch('https://zeniva-dev-dashboard.vercel.app/api/leads/toiture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
    } catch (e) {
      console.error('Lead submission error:', e);
    }
  };

  const downloadQuotePdf = async () => {
    const surface = Number.parseFloat(sqft || '0');
    const total = surface * pricePerSqft;
    const finishLabel = finishType === 'bardeaux' ? 'Bardeaux d\'asphalte' : 'Tole metallique';
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });

    await submitLeadToDashboard();

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
    
    doc.setFillColor(15, 10, 10);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    doc.setDrawColor(249, 115, 22);
    doc.setLineWidth(2);
    doc.line(0, 50, pageWidth, 50);
    
    doc.setTextColor(249, 115, 22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text('ZENICORP', centerX, 25, { align: 'center' });
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('TOITURE PRO', centerX, 38, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.text('DEVIS TOITURE', centerX, 70, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${dateStr}`, 20, 82);
    doc.text('Tel: 581-748-7017', pageWidth - 20, 82, { align: 'right' });
    
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(15, 95, pageWidth - 30, 35, 3, 3, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('CLIENT', 20, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Nom: ${clientName || '_______________________________'}`, 20, 115);
    doc.text(`Telephone: ${clientPhone || '_______________________________'}`, 20, 123);
    doc.text(`Courriel: ${clientEmail || '_______________________________'}`, pageWidth - 20, 123, { align: 'right' });
    
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(15, 140, pageWidth - 30, 45, 3, 3, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('DETAILS DU PROJET', 20, 150);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Type de couverture: ${finishLabel}`, 20, 162);
    doc.text(`Surface totale: ${surface.toFixed(2)} pieds carres`, 20, 170);
    doc.text(`Taux unitaire: $${pricePerSqft.toFixed(2)} / pied carre`, 20, 178);
    
    doc.setFillColor(249, 115, 22);
    doc.roundedRect(15, 200, pageWidth - 30, 30, 5, 5, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('TOTAL ESTIME:', 25, 215);
    doc.setFontSize(22);
    doc.text(`$${total.toFixed(2)}`, pageWidth - 25, 218, { align: 'right' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(' taxes incluses', pageWidth - 25, 225, { align: 'right' });
    
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text('✓ Garantie 10-50 ans', 20, 250);
    doc.text('✓ Service d\'urgence 24/7', 20, 258);
    doc.text('✓ Entrepreneurs certifies RBQ', 20, 266);
    
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.text('Ce devis est une estimation preliminaire basee sur les informations fournies.', centerX, 285, { align: 'center' });
    doc.text('Une visite sur place sera necessaire pour confirmer le prix final.', centerX, 292, { align: 'center' });
    
    doc.setDrawColor(249, 115, 22);
    doc.setLineWidth(1);
    doc.line(20, 300, pageWidth - 20, 300);
    doc.text('zenicorp-toiture.vercel.app  |  581-748-7017', centerX, 310, { align: 'center' });

    doc.save(`devis-zenicorp-toiture-${now.getTime()}.pdf`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0f0a0a] text-white overflow-hidden">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 sm:py-3 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ZeniCorp" className="w-7 h-7 sm:w-8 sm:h-8 object-contain flex-shrink-0" />
            <div className="leading-none">
              <div className="font-bold text-sm sm:text-base tracking-tight">ZENI<span className="text-orange-400">CORP</span></div>
              <div className="text-[8px] sm:text-[9px] text-white/40 tracking-widest uppercase">Toiture Pro</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <button 
              onClick={() => setShowShop(true)}
              className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Configurer</span>
            </button>

            <a 
              href="tel:5817487017"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-xs sm:text-sm font-bold hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">581-748-7017</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-end pb-20">
        <div className="absolute inset-0">
          <img src="/images/toiture-hero.jpg" alt="Toiture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a0a] via-[#0f0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a0a]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <span className="text-sm font-medium">Experts en toiture residentielle & commerciale</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-6">
              <span className="block text-white">ZENICORP</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-300">TOITURE</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-8 max-w-xl leading-relaxed">
              Toiture neuve, reparation et inspection. Materiaux haut de gamme.
              <span className="text-orange-400 font-semibold"> Garantie 10-50 ans.</span>
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 mb-12">
              <button 
                onClick={() => setShowQuote(true)}
                className="group flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-orange-500 hover:bg-orange-400 text-black font-black text-base sm:text-lg rounded-full transition-all hover:scale-105 shadow-2xl shadow-orange-500/50"
              >
                DEVIS GRATUIT
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setShowShop(true)}
                className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-4 sm:py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-base sm:text-lg rounded-full transition-all"
              >
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                Configurer
              </button>

              <a 
                href="tel:5817487017"
                className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-4 sm:py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-base sm:text-lg rounded-full transition-all"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sm:hidden">Appeler</span>
                <span className="hidden sm:inline">581-748-7017</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="w-5 h-5 text-orange-400" />
                <span>Garantie 10-50 ans</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Quebec & Environs</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-5 h-5 text-orange-400" />
                <span>Urgence 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATEUR */}
      <section className="py-20 px-4 sm:px-6 bg-[#120d0d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Calculateur de <span className="text-orange-400">Devis Toiture</span></h2>
          <p className="text-white/60 text-center mb-12">Estimez le cout de votre toiture en quelques secondes</p>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12">
            <div className="mb-8">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Type de couverture</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setFinishType('bardeaux')}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${finishType === 'bardeaux' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                >
                  <div className="font-bold text-xl mb-2">Bardeaux d'asphalte</div>
                  <div className="text-3xl font-black text-orange-400">$5.50<span className="text-base text-white/60 font-normal">/pied²</span></div>
                  <p className="text-sm text-white/40 mt-2">Classique, durable, garantie 25 ans</p>
                </button>

                <button 
                  onClick={() => setFinishType('metal')}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${finishType === 'metal' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                >
                  <div className="font-bold text-xl mb-2">Tole metallique</div>
                  <div className="text-3xl font-black text-orange-400">$8.50<span className="text-base text-white/60 font-normal">/pied²</span></div>
                  <p className="text-sm text-white/40 mt-2">Duree de vie 50 ans, entretien minime</p>
                </button>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 block">Superficie (pieds carres)</label>
              <input 
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="Ex: 2000"
                className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-2xl text-white text-2xl font-bold focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="p-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Estimation totale</p>
                  <p className="text-5xl font-black text-white">${estimatedTotal.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-sm">Prix au pied carre</p>
                  <p className="text-2xl font-bold text-orange-400">${pricePerSqft.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowQuote(true)}
              className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <Calculator className="w-6 h-6" />
              TELECHARGER DEVIS PDF
            </button>
          </div>
        </div>
      </section>

      {/* MATERIAUX */}
      <section className="py-20 px-4 sm:px-6 bg-[#0f0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Nos <span className="text-orange-400">Materiaux</span></h2>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Choix de qualite pour votre toiture. Garantie eteinte sur tous nos produits.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group cursor-pointer" onClick={() => openLightbox('/images/toiture-bardeaux.jpg', 'Bardeaux')}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                <img src="/images/toiture-bardeaux.jpg" alt="Bardeaux" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold text-center">Bardeaux d'asphalte</h3>
              <p className="text-orange-400 text-center">$5.50 - $7.50 / pied²</p>
            </div>
            
            <div className="group cursor-pointer" onClick={() => openLightbox('/images/toiture-metal.jpg', 'Tole metallique')}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                <img src="/images/toiture-metal.jpg" alt="Tole metallique" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold text-center">Tole metallique</h3>
              <p className="text-orange-400 text-center">$8.50 - $15.00 / pied²</p>
            </div>
          </div>
        </div>
      </section>

      {/* REALISATIONS */}
      <section className="py-20 px-4 sm:px-6 bg-[#120d0d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Nos <span className="text-orange-400">Realisations</span></h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer" onClick={() => openLightbox('/images/toiture-realisation-1.jpg', 'Residentiel')}>
              <img src="/images/toiture-realisation-1.jpg" alt="Residentiel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
                <p className="text-2xl sm:text-3xl font-black text-white">Residentiel</p>
                <p className="text-orange-400">Toiture neuve</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer" onClick={() => openLightbox('/images/toiture-realisation-2.jpg', 'Commercial')}>
              <img src="/images/toiture-realisation-2.jpg" alt="Commercial" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
                <p className="text-2xl sm:text-3xl font-black text-white">Commercial</p>
                <p className="text-orange-400">Grande surface</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEVIS MODAL */}
      {showQuote && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6" onClick={() => setShowQuote(false)}>
          <div className="w-full max-w-lg bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-white/10" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-black mb-6 text-center">Devis Rapide Toiture</h2>
            <form className="space-y-4">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nom complet"
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white text-lg focus:border-orange-500 focus:outline-none"
              />
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="Telephone"
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white text-lg focus:border-orange-500 focus:outline-none"
              />
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white text-lg focus:border-orange-500 focus:outline-none"
              />
              <button 
                type="button"
                onClick={() => { downloadQuotePdf(); setShowQuote(false); }}
                className="w-full py-5 bg-orange-500 text-black font-black text-xl rounded-xl"
              >
                TELECHARGER LE DEVIS PDF
              </button>
            </form>
            <p className="text-center text-white/40 text-sm mt-4">
              Ou appelle: <a href="tel:5817487017" className="text-orange-400 font-bold">581-748-7017</a>
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-8 px-4 sm:px-6 border-t border-white/10 bg-[#0f0a0a]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.png" alt="ZeniCorp" className="w-8 h-8 object-contain" />
            <span className="font-bold text-xl">ZENICORP TOITURE</span>
          </div>
          <p className="text-2xl font-black text-orange-400 mb-2">581-748-7017</p>
          <p className="text-white/40">Garantie 10-50 ans - Prix: $5.50 - $15.00/pied carre</p>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 z-10">
            <X className="w-8 h-8" />
          </button>
          <img src={lightboxImage.src} alt={lightboxImage.alt} className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

    </div>
  );
}
