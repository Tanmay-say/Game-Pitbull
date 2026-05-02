import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { API } from '../lib/api';

const Setup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || 'hi';
  const [scenario, setScenario] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('BETA');
  const [loading, setLoading] = useState(true);

  const fetchScenario = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/scenarios/${id}?lang=${language}`);
      setScenario(response.data);
    } catch (error) {
      console.error('Error fetching scenario:', error);
      toast.error('Failed to load scenario');
    } finally {
      setLoading(false);
    }
  }, [id, language]);

  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  const difficulties = [
    {
      name: 'ALPHA',
      codename: 'SHIRO',
      label: 'EASY: CUTE & CLUELESS',
      level: 'LVL 01',
      description: 'Basically a vacation. Even a puppy could do this. Zero stakes, maximum snacks. No one gets hurt except the feelings of your enemies.',
      color: 'green',
      borderColor: 'border-white/10 hover:border-primary/50',
      badgeClass: 'bg-green-500/20 text-green-400',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWxEDuZ91Bewhrd7D5N9TacaeDXWQE9r5qhKjVeQYGyrZgEFhyoNmruQ-6zv9elhVTM-ovC6IEcI-hZOj9979g9qxwbHRzmJFvewXr4SCQ-05ZaN3oEhMj6udzCiZCZNMbtXKZRV1qG4-CLWKkKlNnNB134t7XJIjKLT3ksCQ4eXKzO46EAmjyS4aBlX_plSFekOPSS5DSi1puIHkhG1w0cCuPP-h2AFp_jHLtymreKzW39fG069avILjNjWx7jGTgPJNGPjlGEbQ',
    },
    {
      name: 'BETA',
      codename: 'HAGGIMARU',
      label: 'MEDIUM: SWEATY BOY',
      level: 'LVL 42',
      description: 'Things are getting sweaty. The neighbors are complaining about the screaming. Expect moderate resistance and at least one technical foul.',
      color: 'yellow',
      borderColor: 'border-yellow-400/40 glow-yellow hover:border-yellow-400',
      badgeClass: 'bg-yellow-400/20 text-yellow-400',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2IBKn8CJe1vKu735bzKE-UNTNfJ-OcNEOE_4Spxzr1-b8X0r8_AQ2qyP178uMDOYIw4G2LO-XtFT0EJ0ilvMiSGYc1f4cxb9rqcQW6pYj7sqfIAUCJzmSoG97QQa-dXDAug30efw_RIoC7-k28WZbYJoGSoyK_XsdQACS4awqvc0TJTnnvqjAWf-_d_JLnX4l6lo0-egcDnSJ69x_XBdAEoG_64o8WdjtTNHRCNqc0whgCn39T819REMWKr5P6o_-8nvx18x5is',
      recommended: true
    },
    {
      name: 'GAMMA',
      codename: 'MITOLODASAUR',
      label: 'HARD: ABSOLUTE CHAOS',
      level: 'LVL 99',
      description: 'The laws of physics are merely suggestions here. Total brain melt. Goodbye, sanity. Hello, eternal screaming in the digital void.',
      color: 'primary',
      borderColor: 'border-primary/40 hover:border-primary',
      badgeClass: 'bg-primary/20 text-primary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVKKuYfnWD4P5p5BitN0WHOU27VeyvpRefepB3aDhfog8JNyrqYmZfco5F9z83auMT-ASW29Oh9-sQolEyVk_byN3LkqMzJN9f40XLAPu8Pi2sueKlTxlAjbaC-M5EHi213HiVVbbSQF5rtfcqQ25ZDb5sIjEH8Z3C0jcdLwAPuhZ5-3U6blzBXwscSniyIuPYiX7lhQu6V7aOZXleWPKLgB7JdgbP5x6uJkKauHhELj0dxmf1JmXlE-C5D-wl0N4-o8vTn3wjHQw',
    }
  ];

  if (loading || !scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-display text-primary uppercase tracking-widest">LOADING MISSION...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ======================== HEADER NAV ======================== */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/20 px-6 py-4 md:px-10 lg:px-40">
        <div className="flex items-center gap-4 text-primary">
          <div className="w-8 h-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_535)">
                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
              </g>
              <defs><clipPath id="clip0_6_535"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold tracking-tighter italic font-display">PITBULL</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-9">
            <button onClick={() => navigate('/scenarios', { state: { language } })} className="text-white/70 hover:text-primary text-sm font-medium transition-colors">SCENARIOS</button>
            <span className="text-white/70 text-sm font-medium">ARMORY</span>
            <span className="text-white/70 text-sm font-medium">THE VOID</span>
          </nav>
          <button
            onClick={() => navigate('/')}
            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-primary text-white text-sm font-bold tracking-widest hover:scale-105 transition-transform"
          >
            PROFILE
          </button>
        </div>
      </header>

      {/* ======================== MAIN CONTENT ======================== */}
      <main className="flex-1 flex flex-col items-center px-4 py-12 md:px-10 lg:px-40 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">ACTIVE MISSION</span>
          <h1 className="text-white tracking-tighter text-5xl md:text-7xl font-bold leading-none mb-4 italic font-display">
            {scenario.title}
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-normal max-w-2xl mx-auto">
            Pitbull is ready. Are you? The planet isn't going to delete itself.{' '}
            <span className="text-destructive">It's time to trigger the final meltdown.</span>
          </p>
        </div>

        {/* Mascot Interaction */}
        <div className="w-full mb-16 relative">
          <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm relative overflow-hidden group">
            {/* Decorative glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px]"></div>

            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-24 h-24 mb-2">
                <img
                  alt="Pitbull Mascot"
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(244,37,140,0.8)] rounded-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjkMqxw8KhQVCsNQ5VjEdbeyk60jdqudQx5XvUm04p9W7Wteq7ppiBDPW4eGTYRGr9XnlXyNyNnm800Wvid8524nPyv-zjDAnqo3bLFeYyRZKDQGdjzOHgLlTLzc1lDjaqTcFEVUZiK95DgjyG0etzByoB9skbphennluTyKEez0vkz3L8dDzYrSHAIk5atbR1feuSCy9CkzauCwre7FDa_OnLv8AcTHX3nRNR79pupnsG6bpzob61wAa6XPQRKw9HQexEvZz8S_c"
                />
              </div>
              <h3 className="text-white text-2xl font-bold tracking-tight italic font-display">PITBULL COMMANDER</h3>
              <p className="text-white/50 text-center max-w-md italic">
                "{(scenario.intro_story || scenario.description || '').substring(0, 120)}..."
              </p>
            </div>

            <button
              data-testid="destroy-earth-btn"
              disabled
              className="relative group flex items-center justify-center overflow-hidden rounded-full h-14 px-12 bg-primary/50 text-white text-lg font-black tracking-widest cursor-not-allowed opacity-60"
            >
              DESTROY EARTH
            </button>
          </div>
        </div>

        {/* Capability Mode Selector */}
        <div className="w-full mb-16">
          <h2 className="text-white text-2xl font-bold tracking-tighter mb-8 flex items-center gap-3 font-display">
            <span className="material-symbols-outlined text-primary">psychology</span>
            SELECT CAPABILITY MODE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {difficulties.map((diff) => (
              <div
                key={diff.name}
                data-testid={`difficulty-${diff.name.toLowerCase()}`}
                onClick={() => setSelectedDifficulty(diff.name)}
                className={`flex flex-col p-6 rounded-xl border-2 bg-card cursor-pointer transition-all relative overflow-hidden group ${
                  selectedDifficulty === diff.name
                    ? diff.borderColor + ' shadow-neon'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Recommended badge */}
                {diff.recommended && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-black px-4 py-1 uppercase tracking-tighter rounded-bl-lg">
                    RECOMMENDED
                  </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`${diff.badgeClass} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest`}>
                    {diff.codename}
                  </div>
                  <span className="text-white/20 text-xs font-bold uppercase">{diff.level}</span>
                </div>

                {/* Character Image */}
                <div className="mb-6 h-48 overflow-hidden rounded-lg bg-black/40 border border-white/5">
                  <img
                    alt={`${diff.codename} Character`}
                    className={`w-full h-full object-cover transition-all ${
                      selectedDifficulty === diff.name ? '' : 'grayscale group-hover:grayscale-0'
                    } ${diff.recommended ? 'group-hover:scale-110 transition-transform' : ''}`}
                    src={diff.image}
                  />
                </div>

                {/* Title & Description */}
                <h4 className={`text-white text-xl font-bold mb-2 italic font-display ${
                  diff.name === 'GAMMA' ? 'text-primary' : ''
                }`}>
                  {diff.label}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="w-full mt-auto pt-8">
          <Button
            data-testid="begin-mission-btn"
            onClick={() => navigate(`/scenarios/${id}/intro`, { state: { difficulty: selectedDifficulty, language } })}
            className="w-full flex items-center justify-center gap-4 rounded-full h-20 bg-primary text-white text-2xl md:text-3xl font-black italic tracking-widest glow-pink hover:bg-primary/90 transition-all group overflow-hidden relative"
          >
            <span className="relative z-10 uppercase">BEGIN MISSION</span>
            <span className="material-symbols-outlined relative z-10 text-3xl group-hover:translate-x-4 transition-transform">rocket_launch</span>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
          <p className="text-center text-white/30 text-xs mt-6 uppercase tracking-widest font-bold">
            Warning: Pitbull holds no responsibility for hardware combustion or existential dread.
          </p>
        </div>
      </main>

      {/* ======================== FOOTER STATS ======================== */}
      <footer className="mt-12 border-t border-primary/10 bg-black/40 p-6 flex flex-wrap justify-between items-center gap-4 text-xs font-bold text-white/40 tracking-widest uppercase md:px-40">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SERVER: NEON-TOKYO-01
          </div>
          <div>THREAT LEVEL: CRITICAL</div>
          <div>PLAYERS ONLINE: 1,337</div>
        </div>
        <div className="flex gap-4">
          <button type="button" className="hover:text-primary transition-colors" onClick={() => toast.info('Terms of Destruction: coming soon')}>TERMS OF DESTRUCTION</button>
          <button type="button" className="hover:text-primary transition-colors" onClick={() => toast.info('Chaos Log: coming soon')}>CHAOS LOG</button>
        </div>
      </footer>
    </div>
  );
};

export default Setup;
