
import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface ProposalScreenProps {
  onAccept: () => void;
}

const ProposalScreen: React.FC<ProposalScreenProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [noCount, setNoCount] = useState(0);

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 400;
    const newY = (Math.random() - 0.5) * 400;
    setNoButtonPos({ x: newX, y: newY });
    setYesScale(prev => prev + 0.2);
    setNoCount(prev => prev + 1);
  };

  const phrases = [
    "No", "Are you sure?", "Really sure??", "Think again!", "Last chance!", 
    "Surely not?", "You might regret this!", "Give it another thought!",
    "Are you absolutely certain?", "This could be a mistake!", "Have a heart!",
    "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?",
    "Is that your final answer?", "You're breaking my heart ;("
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full" />
      
      <div className="relative z-10 animate-pulse mb-8">
        <Heart className="w-24 h-24 text-rose-500 fill-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.5)]" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-romantic text-white mb-6 drop-shadow-lg text-glow">
        Will you be my Valentine?
      </h1>
      
      <p className="text-slate-400 mb-12 text-xl max-w-md font-light tracking-wide">
        Amidst the stars and the silence, there's a question only you can answer...
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 relative h-40 w-full">
        <button
          onClick={onAccept}
          style={{ transform: `scale(${yesScale})` }}
          className="px-12 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold text-2xl shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all duration-300 active:scale-95 z-30"
        >
          Yes! ❤️
        </button>
        
        <button
          onMouseEnter={handleNoHover}
          onClick={handleNoHover}
          style={{ 
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          className="px-8 py-4 bg-white/5 border border-white/10 text-slate-400 rounded-full font-semibold text-lg hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap z-20 backdrop-blur-sm"
        >
          {phrases[Math.min(noCount, phrases.length - 1)]}
        </button>
      </div>

      {noCount > 3 && (
        <div className="mt-12 text-rose-400 font-medium flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>Fate is pulling you toward 'Yes'!</span>
        </div>
      )}
    </div>
  );
};

export default ProposalScreen;
