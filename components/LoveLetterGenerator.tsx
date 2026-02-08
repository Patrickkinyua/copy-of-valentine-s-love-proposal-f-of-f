
import React, { useState } from 'react';
import { Mail, Sparkles, Send, Copy, RotateCcw, ArrowLeft, Phone } from 'lucide-react';
import { generateLoveLetter } from '../services/geminiService';

interface LoveLetterGeneratorProps {
  onBack: () => void;
}

const LoveLetterGenerator: React.FC<LoveLetterGeneratorProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [memories, setMemories] = useState('');
  const [phone, setPhone] = useState('');
  const [tone, setTone] = useState('passionate');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateLoveLetter(name, memories, tone);
      setLetter(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (!letter) return;
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedText = encodeURIComponent(letter);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fadeIn">
      <button onClick={onBack} className="flex items-center text-rose-400 mb-8 hover:text-rose-300 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Love Hub
      </button>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6 glass p-8 rounded-[2.5rem] shadow-2xl border border-white/5">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-rose-500/20 rounded-2xl">
              <Mail className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="text-3xl font-elegant font-bold text-white">Love Letter Studio</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Recipient's Name</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Dearest Alex"
                className="w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">WhatsApp Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                <input 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1234567890"
                  className="w-full bg-white/5 pl-10 pr-4 py-3 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Special Memories / Details</label>
            <textarea 
              value={memories}
              onChange={(e) => setMemories(e.target.value)}
              placeholder="e.g. Our first date, your laugh, that summer trip..."
              rows={4}
              className="w-full bg-white/5 px-4 py-3 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-rose-500 outline-none transition-all resize-none placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Tone of Voice</label>
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-slate-900 px-4 py-3 rounded-xl border border-white/10 text-white focus:ring-2 focus:ring-rose-500 outline-none transition-all cursor-pointer"
            >
              <option value="passionate">Passionate & Intense</option>
              <option value="sweet">Sweet & Innocent</option>
              <option value="funny">Funny & Playful</option>
              <option value="poetic">Poetic & Deep</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !name}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-rose-900/20 transition-all active:scale-95"
          >
            {loading ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>{loading ? "Chiseling your words..." : "Generate Love Letter"}</span>
          </button>
        </div>

        <div className="relative flex flex-col h-full">
          <div className="flex-1 glass p-10 rounded-[2.5rem] border border-white/10 shadow-inner relative overflow-y-auto">
            {letter ? (
              <div className="animate-fadeIn">
                <div className="mb-8 border-b border-white/10 pb-4">
                  <span className="text-rose-400 font-romantic text-xl">Your customized letter</span>
                </div>
                <p className="font-romantic text-3xl text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {letter}
                </p>
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigator.clipboard.writeText(letter)}
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-slate-300 hover:bg-white/10 transition-all"
                  >
                    <Copy className="w-5 h-5" />
                    <span>Copy Text</span>
                  </button>
                  <button 
                    onClick={handleWhatsApp}
                    className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-700 space-y-6">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                  <Mail className="w-12 h-12" />
                </div>
                <p className="font-romantic text-3xl text-center max-w-xs opacity-50">Words of love are forming in the shadows...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetterGenerator;
