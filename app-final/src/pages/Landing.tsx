import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { geminiService, getStoredApiKey, setStoredApiKey } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, BookOpen, Clock, ChevronRight, Zap } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('icet_user_name') || '');
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [quote, setQuote] = useState("Empowering your path to Academic Excellence.");
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'fail'>('idle');

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('icet_onboarded');
    if (!hasOnboarded) {
      setShowModal(true);
    }
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setQuoteLoading(true);
    const q = await geminiService.getMotivationalQuote();
    setQuote(q);
    setQuoteLoading(false);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) return;
    setTestStatus('testing');
    try {
      setStoredApiKey(apiKey);
      const q = await geminiService.getMotivationalQuote();
      if (q && !q.includes("weapon which you can use")) { // Check if not the baseline fallback
        setTestStatus('success');
        setQuote(q);
      } else {
        setTestStatus('fail');
      }
    } catch (e) {
      setTestStatus('fail');
    }
  };

  const handleOnboard = () => {
    if (userName.trim()) {
      localStorage.setItem('icet_user_name', userName);
      setStoredApiKey(apiKey);
      localStorage.setItem('icet_onboarded', 'true');
      setShowModal(false);
      fetchQuote(); // Refresh quote after getting API key
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-background overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
          AP ICET 2026 PREPARATION
        </span>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
          Master the <span className="text-secondary italic">Arena</span>
        </h1>
        
        {geminiService.isInitialized() && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_10px_rgba(46,139,87,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-success">
              Gemini AI Active
            </span>
          </motion.div>
        )}
        
        <p className="text-xl md:text-2xl text-text-secondary font-serif mb-12 max-w-2xl mx-auto italic">
          "{quoteLoading ? "Fetching inspiration..." : quote}"
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => navigate('/select')}
            className="btn-primary flex items-center gap-3 text-lg group"
          >
            Start Mock Test
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/select?tab=guide')}
            className="flex items-center gap-3 font-bold text-primary hover:text-secondary transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Study Guide
          </button>
        </div>
      </motion.div>

      {/* Feature Badges */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full">
        {[
          { icon: Trophy, label: "21+ Papers", color: "bg-amber-100 text-amber-600" },
          { icon: Zap, label: "AI Explanations", color: "bg-blue-100 text-blue-600" },
          { icon: Clock, label: "Real Timer", color: "bg-green-100 text-green-600" },
          { icon: BookOpen, label: "Smart Guide", color: "bg-purple-100 text-purple-600" },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className={`p-4 rounded-2xl ${f.color}`}>
              <f.icon className="w-8 h-8" />
            </div>
            <span className="font-bold text-sm text-text-secondary uppercase tracking-wider">{f.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-primary/10"
            >
              <h2 className="text-3xl mb-2">Welcome, Aspirant</h2>
              <p className="text-text-secondary mb-8">Enter your details to personalize your experience and unlock AI features.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">Enter Your Name</label>
                  <input 
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g., Alex"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">Gemini API Key (Optional)</label>
                  <input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AI features like explanations need this"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <p className="mt-2 text-xs text-text-secondary">Your key is stored locally and never leaves your browser.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleTestConnection}
                    className={`w-full py-3 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                      testStatus === 'success' ? 'bg-success/10 border-success text-success' :
                      testStatus === 'fail' ? 'bg-danger/10 border-danger text-danger' :
                      'bg-background border-primary/10 text-text-primary hover:border-primary/30'
                    }`}
                  >
                    {testStatus === 'testing' ? <Clock className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    {testStatus === 'testing' ? 'Testing Connection...' : 
                     testStatus === 'success' ? 'Connection Successful!' :
                     testStatus === 'fail' ? 'Connection Failed (Check Key)' : 'Test AI Connection'}
                  </button>

                  <button 
                    onClick={handleOnboard}
                    disabled={!userName.trim()}
                    className="w-full btn-primary"
                  >
                    Enter the Arena
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-20 py-8 border-t border-primary/5 w-full text-center"
      >
        <p className="text-sm font-bold tracking-widest uppercase opacity-40">
          Designed and developed by <span className="text-secondary font-black underline decoration-primary/20 underline-offset-4">VoidWareLabs</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Landing;
