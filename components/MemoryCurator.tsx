
import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, ArrowLeft, Loader2, Image as ImageIcon, Heart, Copy, RefreshCw, Share2 } from 'lucide-react';
import { curateMemory } from '../services/geminiService';

interface MemoryCuratorProps {
  onBack: () => void;
}

const MemoryCurator: React.FC<MemoryCuratorProps> = ({ onBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [context, setContext] = useState('');
  const [curation, setCuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setCuration('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCurate = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await curateMemory(image, context);
      setCuration(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(curation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setImage(null);
    setCuration('');
    setContext('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fadeIn pb-24">
      <button onClick={onBack} className="flex items-center text-rose-400 mb-8 hover:text-rose-300 transition-all group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Love Hub
      </button>

      <div className="text-center mb-12">
        <h2 className="text-5xl font-elegant font-bold text-white mb-4">Memory Curator</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Upload a photo of a special moment, and let AI weave poetry into the pixels of your shared history.</p>
      </div>

      {!curation ? (
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`group relative h-[450px] rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden shadow-2xl ${
                image ? 'border-transparent' : 'border-white/10 hover:border-rose-500/50 bg-white/5 hover:bg-white/10'
              }`}
            >
              {image ? (
                <>
                  <img src={image} className="w-full h-full object-cover rounded-[3rem]" alt="Memory preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white flex items-center gap-2 font-bold shadow-xl">
                      <Upload className="w-5 h-5" /> Replace Image
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6 p-10">
                  <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                    <ImageIcon className="w-10 h-10 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-2xl mb-2">Capture a Moment</p>
                    <p className="text-slate-500">Tap to upload your favorite photo</p>
                  </div>
                </div>
              )}
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>

            <div className="glass p-8 rounded-[2.5rem] space-y-6 border border-white/5 shadow-xl">
              <div className="space-y-2">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-widest ml-1">Contextual Clues</label>
                <input 
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Where was this? How did you feel?"
                  className="w-full bg-slate-900/50 px-5 py-4 rounded-2xl border border-white/10 text-white focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-slate-600 transition-all"
                />
              </div>
              <button
                onClick={handleCurate}
                disabled={loading || !image}
                className="w-full py-5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_0_30px_rgba(244,63,94,0.3)] text-lg"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                <span>{loading ? "Woven from stardust..." : "Curate Memory"}</span>
              </button>
            </div>
          </div>

          <div className="hidden md:block h-full">
            <div className="glass h-[600px] p-12 rounded-[3.5rem] flex flex-col items-center justify-center relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 p-12 text-rose-500/5 group-hover:rotate-12 transition-transform duration-1000">
                <Heart className="w-80 h-80 fill-current" />
              </div>
              <div className="text-center space-y-8 opacity-40 relative z-10">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 animate-pulse">
                  <ImageIcon className="w-10 h-10 text-slate-400" />
                </div>
                <div>
                  <p className="text-3xl font-romantic text-white mb-2">Waiting for the spark...</p>
                  <p className="text-slate-500 font-light">Your story deserves beautiful words.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto animate-scaleIn">
          <div className="glass p-4 rounded-[4rem] border border-white/10 shadow-2xl bg-slate-900/40 relative overflow-hidden">
             {/* The "Memory Card" */}
             <div className="flex flex-col gap-8 md:gap-12 p-6 md:p-10">
                <div className="relative aspect-[4/3] md:aspect-[16/9] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                  <img src={image!} className="w-full h-full object-cover" alt="Curated Memory" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 right-8">
                     <Heart className="w-12 h-12 text-rose-500 fill-rose-500 drop-shadow-2xl animate-pulse" />
                  </div>
                </div>

                <div className="text-center space-y-8 relative pb-4 px-4">
                  <div className="flex items-center justify-center gap-4 text-rose-500/50 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-500/30" />
                    <span className="text-xs uppercase tracking-[0.4em] font-bold text-rose-400">Poetic Reflection</span>
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-500/30" />
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <blockquote className="font-romantic text-3xl md:text-5xl text-slate-100 leading-relaxed italic relative">
                    <span className="absolute -top-10 -left-6 text-6xl text-rose-500/10 opacity-50 font-serif">"</span>
                    {curation}
                    <span className="absolute -bottom-14 -right-6 text-6xl text-rose-500/10 opacity-50 font-serif">"</span>
                  </blockquote>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-10">
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl border border-white/10 transition-all active:scale-95"
                    >
                      {copied ? <RefreshCw className="w-5 h-5 text-emerald-500 animate-spin" /> : <Copy className="w-5 h-5" />}
                      <span className="font-bold">{copied ? "Copied!" : "Copy Caption"}</span>
                    </button>
                    <button 
                      onClick={reset}
                      className="flex items-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-rose-950/20 active:scale-95"
                    >
                      <ImageIcon className="w-5 h-5" />
                      <span>Curate Another</span>
                    </button>
                  </div>
                </div>
             </div>
          </div>
          
          <p className="text-center mt-12 text-slate-500 text-sm font-light italic">
            "Every photo is a poem, waiting for the right words to set it free."
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryCurator;
