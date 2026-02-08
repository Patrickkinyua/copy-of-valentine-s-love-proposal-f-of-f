
import React, { useState } from 'react';
import { ArrowLeft, Send, Heart, CheckCircle2, Sparkles, Flower as FlowerIcon } from 'lucide-react';

interface Flower {
  id: number;
  name: string;
  meaning: string;
  colorClass: string;
  iconColor: string;
}

const flowers: Flower[] = [
  { id: 1, name: "Red Roses", meaning: "Deep Passion", colorClass: "bg-rose-500/10 border-rose-500/30", iconColor: "text-rose-500" },
  { id: 2, name: "Tulips", meaning: "Perfect Love", colorClass: "bg-pink-500/10 border-pink-500/30", iconColor: "text-pink-400" },
  { id: 3, name: "Sunflowers", meaning: "Pure Adoration", colorClass: "bg-yellow-500/10 border-yellow-500/30", iconColor: "text-yellow-400" },
  { id: 4, name: "Lavender", meaning: "Calm Devotion", colorClass: "bg-purple-500/10 border-purple-500/30", iconColor: "text-purple-400" },
  { id: 5, name: "Orchids", meaning: "Exotic Beauty", colorClass: "bg-rose-400/10 border-rose-400/30", iconColor: "text-rose-300" },
  { id: 6, name: "Lilies", meaning: "Divine Purity", colorClass: "bg-slate-400/10 border-slate-400/30", iconColor: "text-slate-100" },
];

interface BouquetBuilderProps {
  onBack: () => void;
}

const BouquetBuilder: React.FC<BouquetBuilderProps> = ({ onBack }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [sent, setSent] = useState(false);

  const toggleFlower = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else if (selected.length < 5) {
      setSelected([...selected, id]);
    }
  };

  if (sent) {
    return (
      <div className="max-w-2xl mx-auto text-center p-16 glass rounded-[4rem] shadow-2xl animate-scaleIn border border-white/10 mt-12">
        <div className="w-24 h-24 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
          <Heart className="w-12 h-12 fill-current" />
        </div>
        <h2 className="text-5xl font-elegant font-bold text-white mb-6">Bouquet Delivered</h2>
        <p className="text-slate-400 text-xl mb-12 font-light">Your arrangement of affection is now blooming in their world.</p>
        <div className="flex justify-center -space-x-6 mb-16">
          {selected.map((id, index) => {
            const flower = flowers.find(f => f.id === id);
            return (
              <div 
                key={`${id}-${index}`} 
                className={`p-6 bg-slate-900 border border-white/10 rounded-full shadow-2xl animate-bounce ${flower?.iconColor}`} 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FlowerIcon className="w-12 h-12" />
              </div>
            );
          })}
        </div>
        <button onClick={onBack} className="px-12 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-950/20">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fadeIn pb-32">
      <button onClick={onBack} className="flex items-center text-rose-400 mb-12 hover:text-rose-300 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Love Hub
      </button>

      <div className="text-center mb-16">
        <h2 className="text-5xl font-elegant font-bold text-white mb-4 tracking-tight">Virtual Florist</h2>
        <p className="text-slate-400 text-lg font-light">Compose a digital bouquet. Select up to 5 blooms to express the unspoken.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {flowers.map(flower => (
          <button
            key={flower.id}
            onClick={() => toggleFlower(flower.id)}
            className={`p-10 rounded-[3rem] border-2 transition-all group relative overflow-hidden flex flex-col items-center text-center ${
              selected.includes(flower.id) 
                ? `${flower.colorClass} scale-105 ring-2 ring-rose-500/50 shadow-2xl shadow-rose-950/20` 
                : "bg-white/5 border-white/10 hover:border-rose-500/30 hover:bg-white/10"
            }`}
          >
            <div className={`mb-8 p-6 bg-slate-950/50 rounded-3xl group-hover:scale-110 transition-transform ${flower.iconColor}`}>
              <FlowerIcon className="w-16 h-16" />
            </div>
            <div className="font-bold text-white text-2xl mb-2">{flower.name}</div>
            <div className="text-xs text-rose-400 uppercase tracking-[0.2em] font-bold">{flower.meaning}</div>
            {selected.includes(flower.id) && (
              <div className="absolute top-6 right-6 text-rose-500 animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="glass p-12 rounded-[3.5rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
        <div className="flex items-center space-x-8">
          <div className="flex -space-x-4">
            {selected.length === 0 ? (
              <div className="w-20 h-20 rounded-[1.5rem] border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 text-slate-600">
                <FlowerIcon className="w-8 h-8 opacity-20" />
              </div>
            ) : (
              selected.map((id, index) => {
                const flower = flowers.find(f => f.id === id);
                return (
                  <div key={`${id}-${index}`} className={`w-20 h-20 rounded-[1.5rem] bg-slate-900 border border-white/10 flex items-center justify-center shadow-xl ${flower?.iconColor}`}>
                    <FlowerIcon className="w-10 h-10" />
                  </div>
                );
              })
            )}
          </div>
          <div>
            <p className="text-white font-bold text-2xl mb-1">
              {selected.length === 0 ? "Curate Your Gift" : `${selected.length} / 5 Blooms Selected`}
            </p>
            <p className="text-slate-500 font-light">Each selection adds a layer of meaning to our story.</p>
          </div>
        </div>

        <button
          disabled={selected.length === 0}
          onClick={() => setSent(true)}
          className="w-full md:w-auto px-16 py-6 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-3xl font-bold flex items-center justify-center space-x-3 transition-all active:scale-95 shadow-lg shadow-rose-950/20 text-xl"
        >
          <Send className="w-6 h-6" />
          <span>Send Bouquet</span>
        </button>
      </div>
    </div>
  );
};

export default BouquetBuilder;
