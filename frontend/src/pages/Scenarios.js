import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { API } from '../lib/api';

// Map scenario icons by index for visual richness
const scenarioIcons = [
  'local_fire_department',
  'favorite',
  'casino',
  'rocket_launch',
  'hive',
];

const getDifficultyBadge = (level) => {
  switch (level) {
    case 'ALPHA':
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-primary text-primary">
          Alpha
        </span>
      );
    case 'BETA':
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20">
          Beta
        </span>
      );
    case 'GAMMA':
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20">
          Gamma
        </span>
      );
    default:
      return null;
  }
};

const Scenarios = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || 'hi';
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScenarios = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/scenarios?lang=${language}`);
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      toast.error('Failed to load scenarios');
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchScenarios();
  }, [fetchScenarios]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-display text-primary uppercase tracking-widest">LOADING CHAOS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ======================== HEADER NAV ======================== */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-6 md:px-20 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 text-white">
          <div className="w-8 h-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_543)">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] font-display">PITBULL AI</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-border text-white text-sm font-bold border border-white/10 hover:bg-white/10 transition-colors"
          >
            <span className="truncate">Home</span>
          </button>
        </div>
      </header>

      {/* ======================== MAIN CONTENT ======================== */}
      <main className="flex-1 px-6 md:px-20 py-10 max-w-[1200px] mx-auto w-full">
        {/* Hero Header */}
        <div className="mb-12">
          <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight font-display mb-4">
            SELECT <span className="text-primary italic">SCENARIO</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-normal leading-normal">
            Choose your chaotic path, manipulate the masses, and dominate the digital landfill. Every choice burns, every win moons.
          </p>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <div
              key={scenario.id}
              data-testid={`scenario-card-${scenario.id}`}
              className="group flex flex-col bg-card rounded-xl overflow-hidden neon-border p-6 relative cursor-pointer"
              onClick={() => navigate(`/scenarios/${scenario.id}/setup`, { state: { language } })}
            >
              {/* Difficulty badge */}
              <div className="absolute top-4 right-4 z-10 flex gap-1">
                {scenario.difficulty_levels.map((level) => (
                  <React.Fragment key={level}>
                    {getDifficultyBadge(level)}
                  </React.Fragment>
                ))}
              </div>

              {/* Icon Area */}
              <div className="w-full aspect-square flex items-center justify-center mb-6 bg-background/50 rounded-lg pixel-bg">
                <span
                  className="material-symbols-outlined text-primary transition-transform group-hover:scale-110"
                  style={{ fontSize: '80px', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
                >
                  {scenarioIcons[index] || 'bolt'}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1 mb-6">
                <h3 className="text-white text-2xl font-bold uppercase font-display">{scenario.title}</h3>
                <p className="text-muted-foreground text-sm">{scenario.description}</p>
              </div>

              {/* CTA Button */}
              <button
                data-testid={`launch-btn-${scenario.id}`}
                className="w-full h-12 rounded-full bg-white text-background font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                Launch <span className="material-symbols-outlined text-sm">bolt</span>
              </button>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="hidden lg:flex flex-col bg-card/30 rounded-xl overflow-hidden border-2 border-dashed border-border p-6 items-center justify-center text-center opacity-50">
            <span className="material-symbols-outlined text-border mb-4" style={{ fontSize: '60px' }}>add_circle</span>
            <h3 className="text-muted-foreground text-xl font-bold uppercase font-display">New Scenario</h3>
            <p className="text-muted-foreground text-sm italic">Coming soon to the dumpster fire...</p>
          </div>
        </div>
      </main>

      {/* ======================== FOOTER ======================== */}
      <footer className="flex flex-col gap-8 px-10 py-16 text-center bg-background border-t border-white/5">
        <div className="flex flex-wrap items-center justify-center gap-10">
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest" onClick={() => toast.info('How to Play: coming soon')}>How to Play</button>
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest" onClick={() => toast.info('Twitter: coming soon')}>Twitter</button>
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest" onClick={() => toast.info('Discord: coming soon')}>Discord</button>
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest" onClick={() => toast.info('Docs: coming soon')}>Docs</button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-20 bg-primary/30"></div>
          <p className="text-border text-xs font-bold uppercase tracking-tighter">© 2025 PITBULL AI. NO FINANCIAL ADVICE. JUST CHAOS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Scenarios;
