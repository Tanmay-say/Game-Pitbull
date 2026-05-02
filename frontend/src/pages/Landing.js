import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '../context/WalletContext';
import { toast } from 'sonner';

const Landing = () => {
  const navigate = useNavigate();
  const {
    truncatedAddress,
    isConnecting,
    isConnected,
    error,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const [showLangPopup, setShowLangPopup] = useState(false);
  const [showWalletWarning, setShowWalletWarning] = useState(false);

  const comingSoon = (label) => toast.info(`${label}: coming soon`);

  const handleStart = () => {
    if (!isConnected) {
      setShowWalletWarning(true);
      setTimeout(() => setShowWalletWarning(false), 3000);
      return;
    }
    setShowLangPopup(true);
  };

  const selectLanguage = (lang) => {
    setShowLangPopup(false);
    navigate('/scenarios', { state: { language: lang } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="absolute inset-0 noise-bg"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/4 left-10 opacity-20 text-4xl transform -rotate-12">🐕</div>
        <div className="absolute top-1/3 right-20 opacity-20 text-5xl transform rotate-12">🔥</div>
        <div className="absolute bottom-1/4 left-1/4 opacity-20 text-3xl transform -rotate-45">💀</div>
        <div className="absolute top-2/3 right-1/3 opacity-20 text-4xl transform rotate-6">😤</div>
      </div>

      <header className="w-full max-w-5xl px-6 py-8 relative z-10">
        <nav className="flex items-center justify-between glass-effect px-6 py-3 rounded-full">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(244,37,140,0.5)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white font-bold fill-1">pets</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-primary font-display">PITBULL</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <button type="button" className="text-sm font-semibold hover:text-primary transition-colors" onClick={() => navigate('/')}>Home</button>
            <span className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/how-it-works')}>How it Works</span>
            <button type="button" className="text-sm font-semibold hover:text-primary transition-colors" onClick={() => comingSoon('Scenarios')}>Scenarios</button>
          </div>
          <div className="flex items-center gap-3">
            {isConnected ? (
              <button
                onClick={disconnectWallet}
                data-testid="wallet-disconnect-btn"
                className="glass-effect hover:border-destructive/50 px-4 py-2 rounded-full font-display text-xs uppercase text-primary hover:text-destructive transition-all group flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-primary rounded-full group-hover:bg-destructive"></span>
                <span>{truncatedAddress}</span>
                <span className="hidden group-hover:inline text-destructive ml-1">✕</span>
              </button>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                data-testid="wallet-connect-btn"
                className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-primary/40 active:scale-95"
              >
                {isConnecting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>CONNECTING...</span>
                  </span>
                ) : (
                  'Connect Wallet'
                )}
              </button>
            )}
          </div>
        </nav>
      </header>

      {error && (
        <div className="fixed top-28 right-6 z-50 bg-destructive/90 backdrop-blur-md text-white px-6 py-3 rounded-xl border border-white/10 max-w-xs">
          <p className="font-display text-xs uppercase">{error}</p>
        </div>
      )}

      <main className="w-full max-w-6xl px-6 flex flex-col items-center text-center pt-12 md:pt-24 relative z-10">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full mb-8 animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest">Sentient Street Dog — Online</span>
        </div>

        <div className="relative">
          <h1
            className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase glitch-text mb-4 font-display"
            data-text="PITBULL"
            data-testid="landing-title"
          >
            PITBULL
          </h1>
          <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 rotate-12 bg-accent text-black px-4 py-1 font-black rounded-lg text-sm md:text-xl shadow-xl">
            DESI AI DOG
          </div>
        </div>

        <p className="text-lg md:text-2xl max-w-2xl text-slate-400 font-medium mb-12">
          A sentient street dog with big opinions.{' '}
          <span className="text-primary font-bold">Talk him out of his latest dramatic decision</span> before he blocks everyone in the mohalla.
        </p>

        {!isConnected && (
          <div className="glass-effect rounded-xl p-4 max-w-xl mx-auto mb-8">
            <p className="font-display text-sm text-accent uppercase tracking-wider">
              🦊 Connect your wallet to say hi to Pitbull
            </p>
            <p className="text-xs text-muted-foreground font-space mt-1">
              MetaMask login only — no stakes, no crypto, just vibes
            </p>
          </div>
        )}

        {isConnected && (
          <div className="glass-effect rounded-xl border-secondary/30 p-4 max-w-xl mx-auto mb-8">
            <p className="font-display text-sm text-secondary uppercase tracking-wider">
              ✅ Wallet Connected — You're In
            </p>
            <p className="text-xs text-muted-foreground font-space mt-1">
              {truncatedAddress} • Ready to face Pitbull
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-24 w-full justify-center">
          <div className="relative">
            <Button
              data-testid="start-interrogation-btn"
              onClick={handleStart}
              className={`text-xl font-bold px-10 py-6 rounded-full transition-all ${
                isConnected
                  ? 'bg-primary text-white shadow-[0_0_30px_rgba(244,37,140,0.4)] hover:scale-105'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isConnected ? 'TALK TO PITBULL' : '🔒 CONNECT WALLET TO PLAY'}
            </Button>

            {showWalletWarning && (
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <p className="font-display text-sm text-destructive uppercase tracking-wider animate-bounce">
                  ⚠️ WALLET CONNECTION REQUIRED ⚠️
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/how-it-works')}
            data-testid="how-it-works-btn"
            className="glass-effect text-xl font-bold px-10 py-5 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">description</span>
            HOW IT WORKS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-32">
          <div className="bg-card border border-white/10 p-8 rounded-xl flex flex-col items-start gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">pets</span>
            </div>
            <div className="text-left">
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">Pitbull Status</p>
              <h3 className="text-3xl font-black">DRAMATIC</h3>
              <p className="text-accent text-sm font-medium mt-1">Opinion levels: Peak</p>
            </div>
          </div>
          <div className="bg-card border border-white/10 p-8 rounded-xl flex flex-col items-start gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div className="text-left">
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">Current Mood</p>
              <h3 className="text-3xl font-black">FURIOUS</h3>
              <p className="text-red-500 text-sm font-medium mt-1">Needs chai, needs convincing</p>
            </div>
          </div>
          <div className="bg-card border border-white/10 p-8 rounded-xl flex flex-col items-start gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">local_fire_department</span>
            </div>
            <div className="text-left">
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">Scenarios</p>
              <h3 className="text-3xl font-black">8 CRISES</h3>
              <p className="text-primary text-sm font-medium mt-1">All from real life</p>
            </div>
          </div>
        </div>

        <section className="w-full text-left mb-32">
          <h2 className="text-5xl font-black mb-16 tracking-tight font-display">HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
              <div className="text-8xl font-black text-primary/10">01</div>
              <h4 className="text-2xl font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                CONNECT WALLET
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                MetaMask login, one click. No staking. No crypto. Just proof you're a real one.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-8xl font-black text-primary/10">02</div>
              <h4 className="text-2xl font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">forum</span>
                TALK IT DOWN (3 MIN)
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                You have 3 minutes to convince Pitbull not to run away / delete everyone / move to the jungle. Hinglish or English — your call.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-8xl font-black text-primary/10">03</div>
              <h4 className="text-2xl font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">emoji_events</span>
                WIN OR GET ROASTED
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Convince him = you're a certified yaar. Fail = Pitbull roasts you in fluent Hinglish. Either way, free entertainment.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full bg-primary rounded-2xl p-12 mb-32 relative overflow-hidden flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight italic relative z-10">READY TO FIGHT PITBULL?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl relative z-10">A dramatic desi street dog is waiting to tell you about his problems.</p>
          <button
            onClick={handleStart}
            data-testid="enter-arena-btn"
            className="bg-white text-primary px-12 py-5 rounded-full font-black text-2xl hover:bg-accent hover:text-black transition-all shadow-2xl active:scale-95 relative z-10"
          >
            ENTER THE MOHALLA
          </button>
        </div>
      </main>

      <footer className="w-full border-t border-white/5 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter text-primary">PITBULL</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">© 2026 SENTIENT STREET DOG</span>
          </div>
          <div className="flex items-center gap-2 text-accent text-xs font-black bg-accent/10 px-3 py-1 rounded-full uppercase">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Brain Online
          </div>
        </div>
      </footer>

      {showLangPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-lg w-full mx-4">
            <button
              onClick={() => setShowLangPopup(false)}
              data-testid="lang-close-btn"
              className="absolute -top-4 -right-4 w-10 h-10 bg-destructive text-white font-bold text-lg flex items-center justify-center rounded-full border-2 border-white hover:bg-destructive/80 z-10"
            >
              X
            </button>

            <div className="bg-card border-2 border-primary rounded-2xl p-8 space-y-6">
              <div className="text-center space-y-3">
                <div className="text-4xl">🐕</div>
                <h2 className="text-2xl font-display font-black uppercase text-white tracking-tight">
                  PICK YOUR <span className="text-primary">DIALECT</span>
                </h2>
                <p className="text-xs text-muted-foreground font-display uppercase tracking-widest">
                  Pitbull speaks both. Chai ya coffee?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  data-testid="lang-en"
                  onClick={() => selectLanguage('en')}
                  className="bg-background border-2 border-border hover:border-secondary rounded-xl p-6 transition-all group cursor-pointer text-left"
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform">🇺🇸</div>
                    <div className="font-display text-lg font-bold uppercase text-secondary">
                      ENGLISH
                    </div>
                    <p className="text-xs text-muted-foreground font-space">
                      Street-smart desi dog, English flavour. Bruh energy.
                    </p>
                  </div>
                </button>

                <button
                  data-testid="lang-hi"
                  onClick={() => selectLanguage('hi')}
                  className="bg-background border-2 border-border hover:border-accent rounded-xl p-6 transition-all group cursor-pointer text-left"
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform">🇮🇳</div>
                    <div className="font-display text-lg font-bold uppercase text-accent">
                      HINGLISH
                    </div>
                    <p className="text-xs text-muted-foreground font-space">
                      Full desi mode. Yaar, bhai, abey — pura package.
                    </p>
                  </div>
                </button>
              </div>

              <p className="text-center text-xs text-muted-foreground font-display uppercase tracking-widest">
                ⚡ PITBULL WILL REPLY IN YOUR CHOSEN LANGUAGE ⚡
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
