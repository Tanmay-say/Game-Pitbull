import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { API } from '../lib/api';

const Intro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || 'BETA';
  const language = location.state?.language || 'hi';

  const [scenario, setScenario] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchScenario = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/scenarios/${id}?lang=${language}`);
      setScenario(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scenario:', error);
      toast.error('Failed to load scenario');
    }
  }, [id, language]);

  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  useEffect(() => {
    if (!scenario) return;
    const fullText = scenario.intro_story;
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [scenario, currentIndex]);

  const skipIntro = () => {
    if (scenario) {
      setDisplayedText(scenario.intro_story);
      setCurrentIndex(scenario.intro_story.length);
      setIsComplete(true);
    }
  };

  const handleEnterChat = () => {
    navigate(`/scenarios/${id}/chat`, { state: { difficulty, language } });
  };

  if (loading || !scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-display text-primary uppercase tracking-widest">INITIALIZING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="absolute inset-0 noise-bg"></div>
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-primary/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-5xl">
            🐕
          </div>
          <div className="inline-block bg-accent text-black px-6 py-2 font-display text-xs font-bold uppercase tracking-widest rounded-full">
            PITBULL • {difficulty} MODE
          </div>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>

        <div className="glass-effect rounded-2xl border-primary/30 p-8 min-h-[200px] relative">
          <p className="text-gray-300 font-space text-lg leading-relaxed text-left" data-testid="intro-story">
            {displayedText}
            {!isComplete && <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse rounded-sm"></span>}
          </p>
        </div>

        {isComplete ? (
          <Button
            data-testid="enter-chat-btn"
            onClick={handleEnterChat}
            className="bg-primary text-white hover:bg-primary/90 font-display text-xl px-16 py-6 uppercase font-bold tracking-wider rounded-full glow-pink hover:scale-105 transition-all"
          >
            START CHAT 💬
          </Button>
        ) : (
          <Button
            data-testid="skip-intro-btn"
            onClick={skipIntro}
            variant="outline"
            className="bg-transparent border-2 border-white/20 text-muted-foreground hover:bg-white/10 hover:text-white font-display uppercase rounded-full"
          >
            SKIP »
          </Button>
        )}
      </div>
    </div>
  );
};

export default Intro;
