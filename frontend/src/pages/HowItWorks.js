import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      icon: 'account_balance_wallet',
      title: 'CONNECT METAMASK',
      description: 'One click, you are in. MetaMask is just for login — no crypto, no staking, no network switching. Just your address.',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      number: '02',
      icon: 'sports_esports',
      title: 'PICK A SCENARIO',
      description: '8 real-life crises — exams, rishtedar, chai drama, group projects, broken phones. Each scenario has its own flavour of panic.',
      color: 'text-accent',
      bgColor: 'bg-accent/20',
    },
    {
      number: '03',
      icon: 'forum',
      title: 'TALK HIM DOWN (3 MIN)',
      description: "You have 3 minutes to convince Pitbull not to run away / block everyone / move to the jungle. Hinglish or English — his reply matches yours.",
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
    },
    {
      number: '04',
      icon: 'emoji_events',
      title: 'WIN OR GET ROASTED',
      description: "Convince Pitbull = bragging rights and a warm hug (emotionally). Fail = he roasts you in fluent desi Hinglish. Either way, great content.",
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
  ];

  const features = [
    { icon: 'psychology', title: 'GEMINI BRAIN', description: "Pitbull runs on Gemini — fast, funny, and unhinged. Smart fallback responses when the API naps." },
    { icon: 'language', title: 'BILINGUAL DOG', description: "Play in English or Hinglish. Full desi mohalla energy in both." },
    { icon: 'timer', title: '3-MINUTE GAMES', description: "Every session is a quick 3-minute sprint. No grinding. Just good chaos." },
    { icon: 'sentiment_very_dissatisfied', title: 'DYNAMIC MOOD', description: "Pitbull's mood shifts: FURIOUS → CONSIDERING → SAD → CONVINCED. Your words steer him." },
    { icon: 'theater_comedy', title: '8 REAL-LIFE CRISES', description: "Exam panic, rishtedar dread, bestie drama, bad chai, extreme diets — all stuff you've lived." },
    { icon: 'volunteer_activism', title: 'HELPER TIPS', description: "Stuck? A Helper AI drops a hint every 3 turns to nudge you toward the right approach." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="absolute inset-0 noise-bg"></div>
        <div className="absolute top-[-5%] right-[-10%] w-[40%] h-[40%] bg-primary/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full"></div>
      </div>

      <header className="flex items-center justify-between border-b border-border px-6 md:px-20 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(244,37,140,0.5)]">
            <span className="material-symbols-outlined text-white font-bold fill-1">pets</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-primary font-display">PITBULL</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/')} className="glass-effect px-6 py-2 rounded-full text-sm font-bold hover:bg-white/10 transition-colors">Home</button>
          <button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-primary/40">Play Now</button>
        </div>
      </header>

      <section className="relative z-10 px-6 md:px-20 py-16 md:py-24 max-w-6xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full mb-8">
          <span className="material-symbols-outlined text-sm">school</span>
          <span className="text-xs font-bold uppercase tracking-widest">How It Works</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase font-display mb-6 glitch-text" data-text="HOW IT WORKS">
          HOW IT WORKS
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect MetaMask. Pick a crisis. Talk Pitbull down.{' '}
          <span className="text-primary font-bold">No stakes, just chaos and chai.</span>
        </p>
      </section>

      <section className="relative z-10 px-6 md:px-20 max-w-6xl mx-auto w-full mb-24">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className={`flex flex-col md:flex-row items-start gap-8 p-8 rounded-2xl bg-card border border-white/10 hover:border-primary/30 transition-all group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="shrink-0">
                <div className="text-8xl md:text-9xl font-black text-primary/10 leading-none group-hover:text-primary/20 transition-colors">{step.number}</div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center ${step.color}`}>
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase font-display tracking-tight">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-20 max-w-6xl mx-auto w-full mb-24">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight font-display mb-12 text-center">
          GAME <span className="text-primary italic">FEATURES</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-card border border-white/10 p-6 rounded-xl hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <h4 className="text-lg font-bold uppercase font-display mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-20 max-w-6xl mx-auto w-full mb-24">
        <div className="bg-primary rounded-2xl p-12 relative overflow-hidden text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight italic relative z-10 mb-6">READY YAAR?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Pitbull is waiting with his latest dramatic opinion. 3 minutes on the clock. Hinglish ON.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-primary px-12 py-5 rounded-full font-black text-2xl hover:bg-accent hover:text-black transition-all shadow-2xl active:scale-95 relative z-10"
          >
            ENTER THE MOHALLA
          </button>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter text-primary">PITBULL</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Desi AI Dog</span>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Just vibes. No financial advice. No blockchain. Just chai and chaos.
          </p>
          <div className="flex items-center gap-2 text-accent text-xs font-black bg-accent/10 px-3 py-1 rounded-full uppercase">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Brain Online
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
