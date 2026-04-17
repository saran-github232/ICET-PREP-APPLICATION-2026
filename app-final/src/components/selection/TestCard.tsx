import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TestMetadata } from '../../types';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight, Calendar, Zap, Clock } from 'lucide-react';

interface Props {
  test: TestMetadata;
  index: number;
}

export const TestCard: React.FC<Props> = ({ test, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="premium-card p-6 flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${
          test.type === 'shift' ? 'bg-primary/10 text-primary' : 
          test.type === 'grand' ? 'bg-secondary/10 text-secondary' : 
          'bg-success/10 text-success'
        }`}>
          <ClipboardCheck className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-background rounded-full border border-primary/5 text-xs font-bold text-text-secondary uppercase">
          <Calendar className="w-3.5 h-3.5" />
          {test.year}
        </div>
      </div>

      <h3 className="text-xl mb-2 line-clamp-1">{test.title}</h3>
      
      {/* Status Badge */}
      <div className="flex gap-2 mb-4">
        {test.isReady ? (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-success/10 text-success text-[10px] font-black uppercase tracking-widest rounded-lg border border-success/20">
            <Zap className="w-3 h-3" />
            Working with PDF
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100/50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-200/50">
            <Clock className="w-3 h-3" />
            Coming Soon
          </span>
        )}
      </div>

      <p className="text-sm font-serif text-text-secondary italic mb-6">
        Full format mock exam with AI analysis.
      </p>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs font-bold text-text-primary/40 tracking-widest uppercase">
          {test.type.replace('-', ' ')}
        </span>
        <button 
          onClick={() => navigate(`/exam/${test.id}`)}
          className="p-2.5 bg-background rounded-full group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
