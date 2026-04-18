import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pdfService } from '../services/pdf';
import { useExamState } from '../hooks/useExamState';
import { QuestionPalette } from '../components/exam/QuestionPalette';
import { QuestionArea } from '../components/exam/QuestionArea';
import { TESTS } from '../data/tests';
import { motion } from 'framer-motion';
import { Clock, Loader2 } from 'lucide-react';

import { MOCK_QUESTIONS } from '../data/mockData';

const ExamSimulator: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("Initializing Exam Environment...");

  const testMetadata = useMemo(() => TESTS.find(t => t.id === testId), [testId]);

  const { state, answerQuestion, toggleMarkForReview } = useExamState(
    testId || '',
    questions
  );

  useEffect(() => {
    const loadExam = async () => {
      if (!testMetadata) return;
      setLoading(true);
      
      try {
        // Step 1: Try to fetch pre-parsed static JSON for this test
        // This is much faster and more reliable
        setLoadingStatus("Checking for high-speed question data...");
        const response = await fetch(`${import.meta.env.BASE_URL}data/questions/${testId}.json`);
        if (response.ok) {
          const staticQuestions = await response.json();
          if (staticQuestions && staticQuestions.length > 0) {
            setQuestions(staticQuestions);
            setLoading(false);
            return;
          }
        }

        // Step 2: Fallback to real-time PDF parsing via Gemini
        setLoadingStatus("Connecting to Google Gemini AI for parsing...");
        const loadPromise = pdfService.loadTest(`${import.meta.env.BASE_URL.replace(/\/$/, '')}${testMetadata.pdfPath}`);
        
        // Timeout after 25 seconds
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Loading timeout")), 25000)
        );

        const q = await Promise.race([loadPromise, timeoutPromise]) as any[];
        
        if (!q || q.length === 0) {
          throw new Error("No questions found");
        }
        setQuestions(q);
      } catch (error) {
        console.warn("Static load or AI parsing failed, using core bank:", error);
        // Step 3: Use a random subset from our 25-question core bank as final fallback
        const shuffled = [...MOCK_QUESTIONS].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 20));
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [testMetadata, testId]);

  if (loading || !state) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>
        <p className="mt-6 text-xl font-display text-primary animate-pulse">{loadingStatus}</p>
        <p className="mt-2 text-text-secondary text-sm">This may take a minute if AI extraction is required.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    if (window.confirm("Are you sure you want to submit the exam?")) {
      navigate(`/results/${testId}`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Simulation Header */}
      <header className="h-14 bg-primary text-white flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg tracking-tight uppercase">AP-ICET 2026 : {testMetadata?.title}</h1>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 font-timer text-xl font-bold bg-white/10 px-4 py-1 rounded-lg border border-white/20">
            <Clock className="w-5 h-5 text-secondary" />
            <span>Time Left: {formatTime(state.timeLeft)}</span>
          </div>
          
          <button 
            onClick={handleFinish}
            className="bg-secondary px-6 py-1.5 rounded font-bold text-sm uppercase hover:bg-secondary/90 transition-colors shadow-lg"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Main Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Palette (fixed width) */}
        <div className="w-80 h-full flex-shrink-0">
          <QuestionPalette 
            questions={questions}
            currentIdx={currentIdx}
            onSelect={setCurrentIdx}
            status={state.status}
            section={currentQuestion?.section || 'Analytical'}
          />
        </div>

        {/* Right: Question Area */}
        <div className="flex-1 h-full overflow-hidden">
          <QuestionArea 
            question={currentQuestion}
            currentIndex={currentIdx}
            totalQuestions={questions.length}
            selectedOptionId={state.userAnswers[currentQuestion.id]}
            isMarked={state.status[currentQuestion.id] === 'marked' || state.status[currentQuestion.id] === 'marked-answered'}
            onAnswer={answerQuestion}
            onToggleMark={toggleMarkForReview}
            onNext={() => currentIdx < questions.length - 1 ? setCurrentIdx(currentIdx + 1) : handleFinish()}
            onPrev={() => setCurrentIdx(currentIdx - 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamSimulator;
