import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { TESTS } from '../data/tests';
import { Header } from '../components/common/Header';
import { TestCard } from '../components/selection/TestCard';
import { motion } from 'framer-motion';
import { BookMarked, GraduationCap, History, Compass } from 'lucide-react';

const TestSelection: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'shift';

  const tabs = [
    { id: 'shift', label: 'Shift Papers', icon: GraduationCap },
    { id: 'grand', label: 'Grand Mocks', icon: BookMarked },
    { id: 'previous', label: 'Previous Year', icon: History },
    { id: 'guide', label: 'Study Guide', icon: Compass },
  ];

  const filteredTests = TESTS.filter(t => t.type === currentTab);

  return (
    <div className="min-h-screen bg-background pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl mb-4">Choose Your Challenge</h2>
          <p className="text-text-secondary font-serif">Select a test from our comprehensive database to start your preparation journey.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${
                currentTab === tab.id 
                  ? 'bg-primary text-white shadow-panel' 
                  : 'bg-white text-text-secondary hover:bg-primary/5 border border-primary/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {currentTab === 'guide' ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="premium-card p-12 text-center"
          >
            <Compass className="w-16 h-16 text-secondary mx-auto mb-6 opacity-40" />
            <h3 className="text-3xl mb-4">AP ICET 2026 Strategy Guide</h3>
            <p className="max-w-2xl mx-auto text-text-secondary font-serif leading-loose">
              Master the Analytical, Mathematical, and Communication sections with our curated study materials. 
              The guide includes section-wise weightage, time management hacks, and key formulae for ICET 2026.
              <br/><br/>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Coming Soon effectively with AI insights</span>
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTests.map((test, i) => (
              <TestCard key={test.id} test={test} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TestSelection;
