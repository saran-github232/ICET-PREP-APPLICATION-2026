import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { motion } from 'framer-motion';
import { Book, CheckCircle, Clock, Lightbulb, Target, Download } from 'lucide-react';

const Guide: React.FC = () => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    JSON.parse(localStorage.getItem('icet_guide_checklist') || '{}')
  );

  const toggleTask = (id: string) => {
    const next = { ...checklist, [id]: !checklist[id] };
    setChecklist(next);
    localStorage.setItem('icet_guide_checklist', JSON.stringify(next));
  };

  const sections = [
    {
      title: "Analytical Ability",
      icon: Target,
      topics: ["Data Sufficiency", "Sequences & Series", "Analogies", "Coding-Decoding", "Date & Time Puzzles"],
      strategy: "Focus on speed. Attempt Sequences first as they are scoring."
    },
    {
      title: "Mathematical Ability",
      icon: Lightbulb,
      topics: ["Arithmetic (35Q)", "Algebraical & Geometrical (30Q)", "Statistical Ability (10Q)"],
      strategy: "Revise formulas for Geometry. High weightage is on Arithmetic."
    },
    {
      title: "Communication Ability",
      icon: Book,
      topics: ["Vocabulary", "Business & Computer Terminology", "Functional Grammar", "Reading Comprehension"],
      strategy: "Daily reading of business journals helps in terminology and comprehension."
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto px-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black mb-4">ICET 2026 Strategy Guide</h1>
          <p className="text-xl text-text-secondary font-serif italic">"Preparation is the key to unlocking your MBA dreams."</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Strategy Cards */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target className="text-primary" /> Section-wise Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((s, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="premium-card p-6"
                >
                  <div className="p-3 bg-primary/5 rounded-xl w-fit mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary mb-4 font-serif leading-relaxed">
                    {s.strategy}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.topics.map((t, ti) => (
                      <span key={ti} className="px-2 py-1 bg-background text-[10px] font-bold uppercase rounded-md border border-primary/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="premium-card p-8 bg-primary text-white">
              <h3 className="text-2xl mb-4 flex items-center gap-2">
                <Clock className="text-secondary" /> Exam Pattern Reference
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/10">
                  <span className="block text-3xl font-bold">200</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Questions</span>
                </div>
                <div className="p-4 rounded-xl bg-white/10">
                  <span className="block text-3xl font-bold">150</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Minutes</span>
                </div>
                <div className="p-4 rounded-xl bg-white/10">
                  <span className="block text-3xl font-bold">+1</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Correct</span>
                </div>
                <div className="p-4 rounded-xl bg-white/10">
                  <span className="block text-3xl font-bold">0</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Negative</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist Sidebar */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="text-success" /> Preparation Checklist
            </h2>
            <div className="premium-card p-6 overflow-hidden">
              <div className="space-y-4">
                {sections.flatMap(s => s.topics).map((topic, i) => (
                  <label 
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 cursor-pointer transition-colors group"
                  >
                    <input 
                      type="checkbox"
                      className="hidden"
                      checked={!!checklist[topic]}
                      onChange={() => toggleTask(topic)}
                    />
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      checklist[topic] ? 'bg-success border-success' : 'border-primary/10 bg-white'
                    }`}>
                      {checklist[topic] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-sm font-medium transition-all ${
                      checklist[topic] ? 'text-text-secondary line-through' : 'text-text-primary'
                    }`}>
                      {topic}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="premium-card p-6 border-dashed bg-background">
              <h3 className="text-lg mb-4">Official Downloads</h3>
              <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-primary/5 hover:border-primary/20 transition-all group">
                <span className="text-sm font-bold">ICET Syllabus 2026</span>
                <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Guide;
