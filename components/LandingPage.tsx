
import React, { useState } from 'react';
import { Heart, Sparkles, Check, Star, Mail, Camera, Calendar, Flower, ChevronRight, Menu, X, Smile, ShieldCheck, Quote, Code, Globe } from 'lucide-react';
import { AppState } from '../types';

interface LandingPageProps {
  onAccept: () => void;
  onNavigate: (view: AppState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccept, onNavigate }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x: newX, y: newY });
    setYesScale(prev => Math.min(prev + 0.1, 2.5));
    setNoCount(prev => prev + 1);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const features = [
    { id: 'letter', icon: <Mail className="w-6 h-6" />, title: "Letter Studio", desc: "AI-powered prose that captures your deepest emotions." },
    { id: 'memories', icon: <Camera className="w-6 h-6" />, title: "Memory Curator", desc: "Turn simple photos into timeless poetic narratives." },
    { id: 'planner', icon: <Calendar className="w-6 h-6" />, title: "Date Planner", desc: "Bespoke itineraries for your unique connection." },
    { id: 'bouquet', icon: <Flower className="w-6 h-6" />, title: "Virtual Florist", desc: "Flowers that never fade, meanings that never end." }
  ];

  const testimonials = [
    { name: "Juma & Achieng", role: "Nairobi, Kenya", text: "Finally, a platform that understands the high-tech needs of modern romance in the city." },
    { name: "Mwangi & Wanjiku", role: "Mombasa, Kenya", text: "The date planner changed our beach anniversary forever. 10/10 would say yes again." },
    { name: "Kipchoge & Chebet", role: "Eldoret, Kenya", text: "Beautifully designed. It captures our memories with the same speed and grace we value." }
  ];

  return (
    <div id="hero" className="min-h-screen bg-slate-950 text-white scroll-smooth selection:bg-rose-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <span className="text-2xl font-romantic font-bold tracking-tight">Aura Love</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('features')} className="hover:text-rose-400 transition-colors">Features</button>
            <button onClick={() => scrollToSection('stories')} className="hover:text-rose-400 transition-colors">Stories</button>
            <button onClick={() => scrollToSection('investment')} className="hover:text-rose-400 transition-colors">Investment</button>
            <button 
              onClick={() => onNavigate('official-proposal')}
              className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold transition-all shadow-lg shadow-rose-900/20"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 flex flex-col space-y-4 animate-fadeIn">
            <button onClick={() => scrollToSection('features')} className="text-left text-lg hover:text-rose-400">Features</button>
            <button onClick={() => scrollToSection('stories')} className="text-left text-lg hover:text-rose-400">Stories</button>
            <button onClick={() => scrollToSection('investment')} className="text-left text-lg hover:text-rose-400">Investment</button>
            <button 
              onClick={() => onNavigate('official-proposal')}
              className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex flex-col items-center justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-rose-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-rose-400 mb-8 tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            <span>The Operating System for Romance</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-elegant font-bold mb-8 leading-tight">
            Our Love Story, <br />
            <span className="text-glow text-rose-500">Perfectly Crafted.</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Beautifully designed interactions and AI-powered empathy for the moments that matter most. Will you embark on this journey with me?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 min-h-[160px]">
            <button
              onClick={onAccept}
              style={{ transform: `scale(${yesScale})` }}
              className="px-14 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold text-2xl shadow-[0_0_40px_rgba(244,63,94,0.4)] transition-all duration-300 active:scale-95 z-30 flex items-center gap-3"
            >
              Say Yes! <Heart className="w-6 h-6 fill-white" />
            </button>
            
            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              style={{ 
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              className="px-10 py-5 bg-white/5 border border-white/10 text-slate-400 rounded-full font-semibold text-lg hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap z-20 backdrop-blur-sm flex items-center gap-2"
            >
              {noCount === 0 ? "Not Today" : "Nice Try!"} 
              <Smile className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-elegant font-bold mb-6">Built for Our Connection</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">A suite of tools designed to preserve our history and plan our future together.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate(f.id as AppState)}
                className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-rose-500/40 transition-all group hover:-translate-y-2 duration-300 text-left"
              >
                <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 mb-8 group-hover:scale-110 transition-transform shadow-inner">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{f.desc}</p>
                <div className="mt-6 flex items-center text-rose-400 text-sm font-bold gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   Open Tool <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-16 gap-3">
             <div className="h-px w-12 bg-rose-500/30" />
             <Quote className="w-8 h-8 text-rose-500 opacity-50" />
             <div className="h-px w-12 bg-rose-500/30" />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col space-y-6 p-8 glass rounded-3xl border border-white/5 relative group">
                <div className="flex text-rose-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xl italic text-slate-300 leading-relaxed font-light">"{t.text}"</p>
                <div className="pt-6 border-t border-white/5">
                  <div className="font-bold text-lg text-white">{t.name}</div>
                  <div className="text-xs text-rose-400 uppercase tracking-widest font-bold mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Investment */}
      <section id="investment" className="py-32 px-6">
        <div className="max-w-4xl mx-auto glass p-16 rounded-[4rem] border border-rose-500/20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Heart className="w-64 h-64 fill-rose-500" />
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-elegant font-bold mb-4">The Lifetime Commitment</h2>
            <div className="text-7xl font-bold text-rose-500 mb-8">$0<span className="text-2xl text-slate-500 font-light ml-2">/forever</span></div>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-12">
              <div className="flex items-center space-x-4 text-slate-300 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="font-light">Unlimited morning coffee dates</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-300 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="font-light">Lifetime access to shared smiles</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-300 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="font-light">Full-stack emotional support</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-300 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="font-light">Zero downtime for our love</span>
              </div>
            </div>
            <button 
              onClick={onAccept} 
              className="w-full sm:w-auto px-20 py-6 bg-rose-600 hover:bg-rose-500 text-white rounded-3xl font-bold text-2xl transition-all flex items-center justify-center space-x-3 shadow-xl hover:shadow-rose-900/30 mx-auto group"
            >
              <span>Subscribe to Us</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 text-sm text-slate-500">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              <span className="text-2xl font-romantic font-bold">Aura Love</span>
            </div>
            <p className="leading-relaxed font-light">Redefining digital intimacy through beautiful design, empathetic interactions, and infinite care.</p>
          </div>
          
          <div className="space-y-6">
            <div className="font-bold text-white uppercase text-xs tracking-[0.2em]">Platform</div>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('official-proposal')} className="hover:text-rose-400 transition-colors">Proposal Flow</button></li>
              <li><button onClick={() => onNavigate('memories')} className="hover:text-rose-400 transition-colors">Memory Engine</button></li>
              <li><button onClick={() => onNavigate('bouquet')} className="hover:text-rose-400 transition-colors">Visual Florist</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="font-bold text-white uppercase text-xs tracking-[0.2em]">Support</div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-rose-400" />
                <a href="#" className="hover:text-rose-400 transition-colors">Relationship FAQ</a>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <a href="#" className="hover:text-rose-400 transition-colors">Trust & Stability</a>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="text-slate-400">Developer: <span className="text-white font-medium">Patrick</span></span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="font-bold text-white uppercase text-xs tracking-[0.2em]">Partner</div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
              <p className="text-white font-bold text-lg">Digitech Solutions</p>
              <p className="leading-relaxed font-light text-xs italic">"Empowering relationships through high-end digital architecture."</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-xs tracking-widest text-slate-600 uppercase font-medium flex flex-col items-center gap-4">
          <p>© 2025 Aura Love. Built with infinite affection for you.</p>
          <div className="flex items-center gap-2 text-rose-500/50">
            <span>Powered by</span>
            <span className="text-white font-bold border-b border-rose-500/30 pb-0.5">Digitech Solutions</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
