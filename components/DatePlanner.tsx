
import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, ArrowLeft, Loader2, Music, Coffee, Utensils } from 'lucide-react';
import { generateDatePlan } from '../services/geminiService';
import { DatePlan } from '../types';

interface DatePlannerProps {
  onBack: () => void;
}

const DatePlanner: React.FC<DatePlannerProps> = ({ onBack }) => {
  const [pref, setPref] = useState('');
  const [plan, setPlan] = useState<DatePlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    setLoading(true);
    try {
      const result = await generateDatePlan(pref);
      setPlan(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fadeIn">
      <button onClick={onBack} className="flex items-center text-rose-400 mb-8 hover:text-rose-300">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Love Hub
      </button>

      <div className="text-center mb-12">
        <h2 className="text-5xl font-elegant font-bold text-white mb-4">Magic Date Planner</h2>
        <p className="text-slate-400">Describe your dream vibe, and we'll craft the perfect starry night.</p>
      </div>

      <div className="glass p-8 rounded-[2.5rem] shadow-xl border border-white/5 mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            value={pref}
            onChange={(e) => setPref(e.target.value)}
            placeholder="e.g. We love quiet beaches, jazz music, and long talks over wine..."
            className="flex-1 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-white focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-slate-600"
          />
          <button
            onClick={handlePlan}
            disabled={loading || !pref}
            className="px-10 py-4 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-rose-950/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>{loading ? "Drafting..." : "Plan Our Date"}</span>
          </button>
        </div>
      </div>

      {plan && (
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-gradient-to-br from-rose-600 to-indigo-700 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Calendar className="w-40 h-40" />
            </div>
            <h3 className="text-4xl font-elegant font-bold mb-6 relative z-10">{plan.title}</h3>
            <div className="flex items-center space-x-2 mb-8 bg-white/10 w-fit px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/10 relative z-10">
              <Sparkles className="w-4 h-4 text-rose-300" />
              <span className="font-medium tracking-wide">VIBE: {plan.vibe}</span>
            </div>
            <div className="space-y-4 relative z-10">
              {plan.activities.map((act, idx) => (
                <div key={idx} className="flex items-start space-x-4 bg-white/5 p-5 rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-all">
                  <span className="text-rose-300 font-bold">{idx + 1}.</span>
                  <p className="text-lg font-light leading-relaxed">{act}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] shadow-md border border-white/5">
              <div className="flex items-center space-x-3 mb-6 text-rose-400">
                <MapPin className="w-6 h-6" />
                <h4 className="font-bold text-xl text-white">The Secret Detail</h4>
              </div>
              <p className="text-slate-300 italic text-xl leading-relaxed font-light">
                "{plan.surpriseTip}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-8 rounded-3xl text-center hover:bg-white/5 transition-colors border border-white/5">
                <Music className="w-8 h-8 mx-auto text-rose-500 mb-3" />
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Soundtrack</span>
              </div>
              <div className="glass p-8 rounded-3xl text-center hover:bg-white/5 transition-colors border border-white/5">
                <Utensils className="w-8 h-8 mx-auto text-rose-500 mb-3" />
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Cuisine</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePlanner;
