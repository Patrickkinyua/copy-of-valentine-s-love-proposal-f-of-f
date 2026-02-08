
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import OfficialProposal from './components/OfficialProposal';
import LoveLetterGenerator from './components/LoveLetterGenerator';
import DatePlanner from './components/DatePlanner';
import BouquetBuilder from './components/BouquetBuilder';
import MemoryCurator from './components/MemoryCurator';
import FloatingHearts from './components/FloatingHearts';
import { AppState } from './types';
import { Heart, Mail, Calendar, Flower, Sparkles, LogOut, Camera } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('proposal');
  const [isAccepted, setIsAccepted] = useState(false);
  const [userName, setUserName] = useState('');

  // Sync state with Hash for "Routing"
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppState;
      const accepted = localStorage.getItem('valentine_accepted') === 'true';
      const storedName = localStorage.getItem('partner_name');
      if (storedName) setUserName(storedName);
      
      if (hash && ['proposal', 'official-proposal', 'dashboard', 'letter', 'planner', 'bouquet', 'memories'].includes(hash)) {
        setView(hash);
      } else {
        const params = new URLSearchParams(window.location.search);
        const directView = params.get('view');
        if (directView === 'official') {
          setView('official-proposal');
        } else if (accepted) {
          setView('dashboard');
        } else {
          setView('proposal');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newView: AppState) => {
    window.location.hash = newView;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartProposal = () => {
    navigateTo('official-proposal');
  };

  const handleFinalConfirm = () => {
    localStorage.setItem('valentine_accepted', 'true');
    setIsAccepted(true);
    navigateTo('dashboard');
  };

  const handleReset = () => {
    localStorage.removeItem('valentine_accepted');
    localStorage.removeItem('partner_name');
    localStorage.removeItem('sender_name');
    setIsAccepted(false);
    setUserName('');
    window.location.hash = '';
    window.history.replaceState({}, '', window.location.pathname);
    setView('proposal');
  };

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto p-6 md:p-12 animate-fadeIn relative z-10 bg-slate-950 min-h-screen text-white">
      <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
            <h1 className="text-5xl md:text-6xl font-romantic text-white tracking-wide">
              {userName ? `Welcome, ${userName}` : "Midnight Romance"}
            </h1>
            <Heart className="text-rose-500 fill-rose-500 w-8 h-8 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse" />
          </div>
          <p className="text-slate-400 text-lg font-light">Crafting digital memories, one heartbeat at a time.</p>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center space-x-2 px-6 py-3 bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-white/10 border border-white/10 rounded-full transition-all text-sm backdrop-blur-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Hub</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          icon={<Mail className="w-8 h-8" />}
          title="Love Letter Studio"
          desc="AI-powered heartfelt messages, now with WhatsApp sharing."
          color="from-rose-500 to-pink-600"
          onClick={() => navigateTo('letter')}
        />
        <DashboardCard 
          icon={<Camera className="w-8 h-8" />}
          title="Memory Curator"
          desc="Turn your special photos into timeless poetic captions."
          color="from-purple-500 to-indigo-600"
          onClick={() => navigateTo('memories')}
        />
        <DashboardCard 
          icon={<Calendar className="w-8 h-8" />}
          title="Magic Date Planner"
          desc="Enchanting itineraries tailored to your unique love story."
          color="from-pink-500 to-rose-600"
          onClick={() => navigateTo('planner')}
        />
        <DashboardCard 
          icon={<Flower className="w-8 h-8" />}
          title="Virtual Bouquet"
          desc="Send a digital arrangement with custom flower meanings."
          color="from-rose-400 to-orange-400"
          onClick={() => navigateTo('bouquet')}
        />
      </div>

      <div className="mt-16 glass-rose p-12 rounded-[4rem] text-center relative overflow-hidden group shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-rose-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-8 animate-spin-slow" />
          <h3 className="text-4xl font-elegant font-bold text-slate-100 mb-6 italic leading-snug">
            "{userName ? userName : "You"} are the best part of every day."
          </h3>
          <p className="text-rose-400 font-medium tracking-[0.2em] uppercase text-sm">— Forever yours</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen selection:bg-rose-500/30 relative bg-slate-950">
      <FloatingHearts />
      
      <main className="relative z-10">
        {view === 'proposal' && <LandingPage onAccept={handleStartProposal} onNavigate={navigateTo} />}
        {view === 'official-proposal' && <OfficialProposal onConfirm={handleFinalConfirm} />}
        {view === 'dashboard' && renderDashboard()}
        {view === 'letter' && <LoveLetterGenerator onBack={() => navigateTo('dashboard')} />}
        {view === 'memories' && <MemoryCurator onBack={() => navigateTo('dashboard')} />}
        {view === 'planner' && <DatePlanner onBack={() => navigateTo('dashboard')} />}
        {view === 'bouquet' && <BouquetBuilder onBack={() => navigateTo('dashboard')} />}
      </main>

      {/* Atmospheric Glowing Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-rose-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[150px] rounded-full" />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, desc, color, onClick }) => (
  <button 
    onClick={onClick}
    className="glass p-8 rounded-[2.5rem] hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-500 text-left flex flex-col items-start group relative overflow-hidden border border-white/5 active:scale-95 w-full"
  >
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-2xl font-elegant font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-light">{desc}</p>
    <div className="mt-8 flex items-center text-rose-500 font-bold group-hover:translate-x-2 transition-transform">
      Explore <Sparkles className="ml-2 w-4 h-4" />
    </div>
    <div className={`absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.05] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
  </button>
);

export default App;
