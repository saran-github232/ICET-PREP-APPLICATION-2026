import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pdfService } from '../services/pdf';
import { useExamState } from '../hooks/useExamState';
import { QuestionPalette } from '../components/exam/QuestionPalette';
import { QuestionArea } from '../components/exam/QuestionArea';
import { TESTS } from '../data/tests';
import { motion } from 'framer-motion';
import { Clock, Loader2 } from 'lucide-react';

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
      setLoadingStatus("Connecting to Google Gemini AI for parsing...");
      
      const q = await pdfService.loadTest(testMetadata.pdfPath);
      
      if (q.length === 0) {
        // Fallback for demo if PDF parsing is not fully set up or empty
        setQuestions([
          { 
            id: 'q1', 
            number: 1, 
            section: 'Analytical', 
            text: 'What comes next in the sequence: 2, 6, 12, 20, 30, ...?', 
            options: [{id: 'A', text: '40'}, {id: 'B', text: '42'}, {id: 'C', text: '44'}, {id: 'D', text: '46'}],
            correctAnswer: 'B'
          },
          { 
            id: 'q2', 
            number: 2, 
            section: 'Analytical', 
            text: 'In a certain code language, if ICET is written as JDFU, how is GATE written?', 
            options: [{id: 'A', text: 'HBUF'}, {id: 'B', text: 'IBVF'}, {id: 'C', text: 'HCVF'}, {id: 'D', text: 'HBUF'}],
            correctAnswer: 'A'
          }
        ]);
      } else {
        setQuestions(q);
      }
      setLoading(false);
    };

    loadExam();
  }, [testMetadata]);

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
