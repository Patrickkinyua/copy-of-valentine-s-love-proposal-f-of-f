
import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star, Link, Copy, Check, Share2, ArrowRight, PartyPopper } from 'lucide-react';

interface OfficialProposalProps {
  onConfirm: () => void;
}

const OfficialProposal: React.FC<OfficialProposalProps> = ({ onConfirm }) => {
  const [step, setStep] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [partnerName, setPartnerName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const from = params.get('from');
    if (to) {
      setPartnerName(to);
      localStorage.setItem('partner_name', to);
    }
    if (from) {
      setSenderName(from);
      localStorage.setItem('sender_name', from);
    }
  }, []);

  const fullText = [
    "In the grand tapestry of existence...",
    partnerName ? `Every thread seems to have led me directly to you, ${partnerName}.` : "Every thread seems to have led me directly to you.",
    "From the first smile we shared, to the quiet moments that now define us.",
    "I've realized that 'home' isn't a place, but a person.",
    "You are my North Star, my sanctuary, and my greatest adventure.",
    "Every heartbeat of mine carries a message meant only for your ears.",
    "I promise to choose you, every single day, in every single lifetime.",
    "And so, with all that I am and all that I will ever be...",
    "I have one final, beautiful question to ask."
  ];

  useEffect(() => {
    if (step < fullText.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const generateLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?view=official&to=${encodeURIComponent(partnerName)}&from=${encodeURIComponent(senderName)}#official-proposal`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleYes = () => {
    setIsAccepted(true);
    // Short delay to let them see the "Success" screen before going to dashboard
    setTimeout(() => {
      onConfirm();
    }, 4000);
  };

  if (isAccepted) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-8 text-center animate-fadeIn overflow-hidden">
        <div className="absolute inset-0 bg-rose-500/10 blur-[150px] animate-pulse rounded-full" />
        <div className="relative z-10 space-y-8 max-w-lg">
          <div className="w-40 h-40 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(244,63,94,0.4)] animate-bounce">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-elegant font-bold text-white text-glow">It's Official!</h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            {partnerName ? `${partnerName}, you've` : "You've"} just made me the happiest person in the universe. Our digital fairytale is just beginning.
          </p>
          <div className="flex items-center justify-center gap-3 text-rose-400 font-bold uppercase tracking-widest text-sm animate-pulse">
            <PartyPopper className="w-5 h-5" />
            Preparing your Love Hub...
          </div>
        </div>
        {/* Celebration Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-500/30 text-2xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `110%`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <Heart className="fill-current" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center p-6 overflow-y-auto">
      {/* Cinematic Starry Background */}
      <div className="absolute inset-0 pointer-events-none fixed">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.8
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center space-y-8 md:space-y-12 py-20">
        {fullText.slice(0, step + 1).map((text, i) => (
          <p
            key={i}
            className={`text-xl md:text-3xl font-romantic transition-all duration-1000 transform px-4 ${
              i === step 
                ? 'opacity-100 translate-y-0 scale-110 text-white text-glow' 
                : 'opacity-20 -translate-y-8 scale-95 text-slate-400 blur-[1px]'
            }`}
          >
            {text}
          </p>
        ))}

        {step >= fullText.length && (
          <div className="animate-fadeIn pt-8 space-y-10 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-rose-500 blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity animate-pulse rounded-full" />
              <Heart className="w-24 h-24 md:w-32 md:h-32 text-rose-500 fill-rose-500 relative animate-bounce shadow-2xl" />
            </div>
            
            <div className="space-y-4 px-4">
               <h1 className="text-5xl md:text-8xl font-elegant font-bold text-white text-glow leading-none tracking-tight">
                Will you be mine?
              </h1>
              {senderName && (
                <p className="text-rose-400 font-romantic text-2xl animate-fadeIn">
                  — with all my love, {senderName}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md px-4">
              <button
                onClick={handleYes}
                className="flex-1 group relative px-10 py-5 bg-rose-600 text-white rounded-full font-bold text-2xl shadow-[0_0_40px_rgba(244,63,94,0.4)] hover:shadow-[0_0_60px_rgba(244,63,94,0.6)] transition-all transform active:scale-95 flex items-center justify-center gap-3"
              >
                <span>Yes, Forever!</span>
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </button>
              
              <button
                onClick={() => setShowShare(!showShare)}
                className="px-8 py-5 bg-white/5 border border-white/10 text-slate-300 rounded-full font-bold text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Flow</span>
              </button>
            </div>
            
            {showShare && (
              <div className="w-full max-w-md animate-fadeIn p-8 glass rounded-[2.5rem] border border-rose-500/20 space-y-6 mx-4">
                <div className="text-left space-y-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Link className="w-4 h-4 text-rose-500" />
                    Personalize & Link
                  </h3>
                  <div className="space-y-3">
                    <input 
                      placeholder="Your Partner's Name"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-rose-500/50"
                    />
                    <input 
                      placeholder="Your Name (Sender)"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-rose-500/50"
                    />
                  </div>
                  <button
                    onClick={generateLink}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Link Copied!" : "Copy Proposal Link"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Atmosphere Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-500/5 text-4xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 15}s`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            <Heart className="fill-current" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialProposal;
