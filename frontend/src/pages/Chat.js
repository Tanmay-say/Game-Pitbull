import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Send, Settings } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { API } from '../lib/api';

const GAME_DURATION = 180; // 3 minutes — life mein thoda time chahiye yaar

const PITBULL_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA58JduzYPjHhhRvQTt9yHdV07HmSXRoH7PLbJcbPmUFnUxXIv1umMPmdbQBMAxsDUcYhmQjgYGdUXgZ-KFKVvpeVS3QwrpLGdt3LvztBAzE7NCpjSbeCguB3fZfpGXrqtcntqO_JsfasoUv09IGHx2ELBGm1CAXxVA7yR18HXBkIzUVL0E1vC0fi0lCs6x_L0sKExjGjDPlxz661GYlm7R3btBVxZ1ojodWFEggbYXXu1ybdm_Ov37mKTuHmGAsqn0hy6PjXY7Qp8';
const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0IIzqdo32YljczlrYGDIwDX4z8coh2uF2r-4VyIeXFf2wAdRiii6mNT3CHeS7vv1XdEugGymz-5UPB0EYHhIdlAUN0BPIeesC8BMrpb7mwYFnhcROmVzcwwvXjx6hGGxeCRZiQ0G-W_LdN_BQ4d0S2M1i1Ykaa5OVrY5zoo6wu4f-fDoikPYCGOlVkSsx1Om5Az7igs_slryHlYwa3lIR4WWKYEwz2OWzuTk-fdBpynb-PIsSrVRLhGC2O1q9NmUBMrUJJ3sAl9s';

const moodLabels = {
  FURIOUS:     { label: "😤 Mood: Bilkul Nahi",    color: "text-red-400" },
  CONSIDERING: { label: "🤔 Mood: Soch Raha Hoon", color: "text-yellow-400" },
  SAD:         { label: "😢 Mood: Yaar...",         color: "text-blue-400" },
  CONVINCED:   { label: "✅ Mood: Theek Hai Bhai",  color: "text-green-400" },
  UNHINGED:    { label: "😈 Mood: Unhinged",        color: "text-primary" },
};

const winMessages = [
  "Aye aye aye! Tu jeeta! Pitbull abhi bhi impress nahi hua... okay thoda hua 🐕",
  "Bruh. You actually convinced me. I didn't see that coming. Respect. 🔥",
  "Yaar teri baat mein dum hai. Main maan gaya. Shukriya. 😤✅"
];
const lossMessages = [
  "💀 Haar gaya bhai. Better luck next time. Pitbull ne roast kar diya.",
  "Time's up aur tu convince nahi kar paya. Thoda aur dil laga yaar. 😂",
  "GG. No re. Pitbull undefeated. 🏆"
];

const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useWallet(); // Still needed for wallet gating; account is not required in API calls
  const difficulty = location.state?.difficulty || 'BETA';
  const language = location.state?.language || 'hi';

  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [pitbullMood, setPitbullMood] = useState('FURIOUS');
  const [turnCount, setTurnCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [ending, setEnding] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameActive, setGameActive] = useState(true);
  const timerRef = useRef(null);
  const gameResolvedRef = useRef(false);

  useEffect(() => {
    if (!gameActive || showEnding) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameActive, showEnding]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  const getTimerColor = () => timeLeft <= 15 ? 'text-destructive' : timeLeft <= 30 ? 'text-yellow-400' : 'text-accent';
  const getTimerBarWidth = () => `${(timeLeft / GAME_DURATION) * 100}%`;
  const getTimerBarColor = () => timeLeft <= 15 ? 'bg-destructive' : timeLeft <= 30 ? 'bg-yellow-400' : 'bg-accent';

  const handleGameEnd = useCallback((result, title) => {
    if (gameResolvedRef.current) return;
    gameResolvedRef.current = true;
    setGameActive(false);
    clearInterval(timerRef.current);

    const msgs = result === 'win' ? winMessages : lossMessages;
    const finalMsg = msgs[Math.floor(Math.random() * msgs.length)];

    setEnding({
      type: result === 'win' ? 'success' : 'failure',
      result,
      title: title || (result === 'win' ? '🎉 JEETA BHAI' : '💀 HAARA BHAI'),
      message: finalMsg,
    });
    setShowEnding(true);
  }, []);

  const fetchScenario = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/scenarios/${id}?lang=${language}`);
      setScenario(response.data);
      const initialMessage = {
        id: 'initial',
        role: 'pitbull',
        content: response.data.pitbull_personality[difficulty],
        mood: 'FURIOUS',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    } catch (error) {
      console.error('Error fetching scenario:', error);
      toast.error('Failed to load scenario');
    }
  }, [difficulty, id, language]);

  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (gameResolvedRef.current || !gameActive) return;
    if (turnCount >= 3 && pitbullMood === 'CONVINCED') {
      handleGameEnd('win', '🎉 JEETA BHAI');
    } else if (pitbullMood === 'FURIOUS' && turnCount >= 10) {
      handleGameEnd('loss', '💀 BAHUT ZIDDI HAI');
    }
  }, [turnCount, pitbullMood, gameActive, handleGameEnd]);

  useEffect(() => {
    if (timeLeft === 0 && gameActive && !gameResolvedRef.current) {
      handleGameEnd('loss', '⏰ TIME UP');
    }
  }, [timeLeft, gameActive, handleGameEnd]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !gameActive) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        scenario_id: id,
        difficulty: difficulty,
        user_message: inputMessage,
        chat_history: messages,
        language: language
      });

      const pitbullMessage = {
        id: `pitbull-${Date.now()}`,
        role: 'pitbull',
        content: response.data.pitbull_message,
        mood: response.data.pitbull_mood,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, pitbullMessage]);
      setPitbullMood(response.data.pitbull_mood);
      setTurnCount(response.data.turn_count);

      if (response.data.helper_message) {
        setTimeout(() => {
          const helperMessage = {
            id: `helper-${Date.now()}`,
            role: 'helper',
            content: response.data.helper_message,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, helperMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Pitbull ka brain offline hai yaar. Try again. 🐕💤');
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodDisplay = (mood) => moodLabels[mood] || moodLabels.FURIOUS;

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-display text-primary uppercase tracking-widest">CONNECTING...</div>
      </div>
    );
  }

  if (showEnding && ending) {
    const isWin = ending.type === 'success';
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 grid-bg"></div>
          <div className={`absolute top-1/3 left-1/3 w-[40%] h-[40%] ${isWin ? 'bg-secondary/20' : 'bg-destructive/20'} blur-[120px] rounded-full`}></div>
        </div>
        <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
          <div className="text-8xl mb-4">{isWin ? '🎉' : '💀'}</div>
          <h1
            data-testid="ending-title"
            className={`text-5xl font-display font-black uppercase ${isWin ? 'text-green-400' : 'text-red-400'}`}
          >
            {ending.title}
          </h1>
          <p data-testid="ending-message" className="text-xl text-gray-300 font-space">
            {ending.message}
          </p>

          <div className="space-y-4 pt-4">
            <Button
              data-testid="play-again-btn"
              onClick={() => navigate('/scenarios', { state: { language } })}
              className="bg-primary text-white hover:bg-primary/90 font-display uppercase font-bold px-12 py-4 rounded-full glow-pink"
            >
              {isWin ? 'Ek aur khelein?' : 'Fir se try karein'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Total turns: {turnCount} • Final mood: {getMoodDisplay(pitbullMood).label} • Time left: {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="flex h-20 items-center justify-between border-b border-border px-4 md:px-8 bg-panel-dark/50 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-white">
            <span className="material-symbols-outlined fill-1">pets</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold tracking-tighter uppercase italic font-display" data-testid="active-mission-title">
            PITBULL AI
          </h2>
        </div>

        <div className="flex-1 max-w-2xl px-4 md:px-12">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">timer</span>
              Time Left
            </span>
            <span data-testid="timer-display" className={`text-lg font-mono font-black ${getTimerColor()} ${timeLeft <= 15 ? 'animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-border overflow-hidden">
            <div className={`h-full ${getTimerBarColor()} shadow-[0_0_10px_currentColor] transition-all duration-1000 rounded-full`} style={{ width: getTimerBarWidth() }}></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-border hover:bg-white/10 p-2 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 border-r border-border bg-panel-dark p-6 flex flex-col gap-8 hidden lg:flex">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Active Mission</h3>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 group">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">pets</span>
                <span className="font-bold text-white text-sm">{scenario.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{scenario.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Pitbull Mood</h3>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-border/50 border border-white/5">
              <div className="flex flex-col">
                <span data-testid="ai-mood" className={`text-sm font-bold uppercase tracking-wider ${getMoodDisplay(pitbullMood).color}`}>
                  {getMoodDisplay(pitbullMood).label}
                </span>
                <span className="text-[10px] text-red-500 font-mono">AGITATION: {Math.min(turnCount * 10, 98)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4 pt-6 border-t border-border">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="material-symbols-outlined text-sm">translate</span>
              <span className="text-xs font-mono uppercase">
                LANG: {language === 'hi' ? '🇮🇳 HINGLISH' : '🇺🇸 ENGLISH'}
              </span>
            </div>
            <button
              data-testid="terminate-session-btn"
              onClick={() => {
                if (!gameResolvedRef.current) {
                  handleGameEnd('loss', '❌ ABANDONED');
                } else {
                  navigate('/scenarios', { state: { language } });
                }
              }}
              className="w-full py-3 rounded-full bg-red-600/20 hover:bg-red-600/30 text-red-500 text-xs font-bold uppercase transition-all tracking-widest border border-red-500/30"
            >
              Terminate Session
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-background relative">
          {timeLeft <= 15 && timeLeft > 0 && gameActive && (
            <div className="absolute top-0 left-0 right-0 bg-destructive/90 text-white py-2 text-center z-20 animate-pulse">
              <span className="font-display font-bold uppercase tracking-widest text-sm">
                ⚠️ HURRY! {formatTime(timeLeft)} REMAINING ⚠️
              </span>
            </div>
          )}

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6" data-testid="chat-messages-container">
            {messages.map((message) => (
              <div key={message.id} data-testid={`message-${message.role}`}>
                {message.role !== 'user' && (
                  <div className="flex items-end gap-3 max-w-[85%]">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 overflow-hidden shadow-[0_0_15px_rgba(244,37,140,0.3)] ${
                        message.role === 'helper' ? 'border-accent bg-accent/20' : 'border-primary'
                      }`}
                      style={message.role === 'pitbull' ? { backgroundImage: `url('${PITBULL_AVATAR}')`, backgroundSize: 'cover' } : {}}
                    >
                      {message.role === 'helper' && <span className="text-sm">💡</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-1 ${message.role === 'helper' ? 'text-accent' : 'text-primary'}`}>
                        {message.role === 'helper' ? 'HELPER AI' : 'PITBULL 🐕'}
                      </span>
                      <div className={`${message.role === 'helper' ? 'chat-bubble-helper' : 'chat-bubble-pitbull'} px-5 py-4 text-white shadow-xl border border-white/5`}>
                        <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap">
                          {message.content}
                        </p>
                        {message.mood && (
                          <div className="mt-2 pt-2 border-t border-white/10">
                            <span className={`text-xs font-display uppercase ${getMoodDisplay(message.mood).color}`}>
                              {getMoodDisplay(message.mood).label}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {message.role === 'user' && (
                  <div className="flex items-end gap-3 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-user-lime shrink-0 shadow-neon-green overflow-hidden" style={{ backgroundImage: `url('${USER_AVATAR}')`, backgroundSize: 'cover' }}></div>
                    <div className="flex flex-col gap-1.5 items-end">
                      <span className="text-[10px] font-bold text-user-lime uppercase tracking-widest px-1">YOU</span>
                      <div className="chat-bubble-user px-5 py-4 shadow-xl font-medium">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end gap-3 max-w-[85%]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-primary overflow-hidden shadow-[0_0_15px_rgba(244,37,140,0.3)]" style={{ backgroundImage: `url('${PITBULL_AVATAR}')`, backgroundSize: 'cover' }}></div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-1">PITBULL 🐕</span>
                  <div className="chat-bubble-pitbull px-5 py-4 shadow-xl border border-white/5">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 md:p-6 bg-panel-dark/80 backdrop-blur-xl border-t border-border">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-4">
              <div className="flex-1 relative group">
                <input
                  data-testid="chat-input"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading || !gameActive}
                  className="w-full bg-border border-transparent focus:border-user-lime focus:ring-0 rounded-full px-6 py-4 text-white placeholder-muted-foreground transition-all font-mono text-sm pr-12 disabled:opacity-50"
                  placeholder={
                    gameActive
                      ? (language === 'hi'
                          ? 'Pitbull ko convince karo... Hinglish mein bol 🐕'
                          : 'Convince Pitbull... English or Hinglish, your call 🐕')
                      : 'Game over...'
                  }
                  type="text"
                />
              </div>
              <button
                data-testid="send-btn"
                type="submit"
                disabled={isLoading || !inputMessage.trim() || !gameActive}
                className="bg-user-lime hover:bg-[#d9f99d] text-black font-bold h-[56px] px-8 rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-neon-green disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm uppercase tracking-widest hidden sm:inline">Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="px-6 py-2 bg-black/40 flex justify-between items-center border-t border-white/5">
            <div className="flex gap-4">
              <span className="text-[9px] text-muted-foreground font-mono tracking-tighter">Turn {turnCount}/10</span>
              <span className="text-[9px] text-muted-foreground font-mono tracking-tighter">LANG: {language.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
              <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Pitbull Active</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
