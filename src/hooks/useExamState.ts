import { useState, useEffect, useCallback } from 'react';
import type { ExamState, Question } from '../types';

const STORAGE_KEY_PREFIX = "icet_exam_";

export const useExamState = (testId: string, questions: Question[]) => {
  const [state, setState] = useState<ExamState | null>(null);

  // Initialize state
  useEffect(() => {
    if (!testId || questions.length === 0) return;

    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${testId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Force reset if the question count has changed (cache busting for old format)
      if (parsed.questions.length !== questions.length) {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${testId}`);
        window.location.reload(); // Refresh to trigger initialState
        return;
      }
      setState(parsed);
    } else {
      const initialState: ExamState = {
        testId,
        testName: "ICET Practice Arena",
        questions,
        userAnswers: {},
        status: {},
        timeLeft: 120 * 60, // 120 minutes standard
        startTime: Date.now(),
        isPaused: false,
      };
      
      // Initialize status for all questions
      questions.forEach(q => {
        initialState.status[q.id] = 'not-visited';
      });
      
      setState(initialState);
    }
  }, [testId, questions]);

  // Persistence
  useEffect(() => {
    if (state) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${state.testId}`, JSON.stringify(state));
    }
  }, [state]);

  // Timer logic
  useEffect(() => {
    if (!state || state.isPaused || state.timeLeft <= 0) return;

    const interval = setInterval(() => {
      setState(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
    }, 1000);

    return () => clearInterval(interval);
  }, [state?.isPaused, state?.timeLeft]);

  const answerQuestion = useCallback((qId: string, optId: string) => {
    setState(prev => {
      if (!prev) return null;
      const currentStatus = prev.status[qId];
      const newStatus = (currentStatus === 'marked' || currentStatus === 'marked-answered') 
        ? 'marked-answered' 
        : 'answered';
        
      return {
        ...prev,
        userAnswers: { ...prev.userAnswers, [qId]: optId },
        status: { ...prev.status, [qId]: newStatus }
      };
    });
  }, []);

  const toggleMarkForReview = useCallback((qId: string) => {
    setState(prev => {
      if (!prev) return null;
      const isAnswered = !!prev.userAnswers[qId];
      const currentStatus = prev.status[qId];
      
      let newStatus: ExamState['status'][string];
      if (currentStatus === 'marked' || currentStatus === 'marked-answered') {
        newStatus = isAnswered ? 'answered' : 'not-visited'; // toggle off
      } else {
        newStatus = isAnswered ? 'marked-answered' : 'marked'; // toggle on
      }

      return {
        ...prev,
        status: { ...prev.status, [qId]: newStatus }
      };
    });
  }, []);

  const visitQuestion = useCallback((qId: string) => {
    setState(prev => {
      if (!prev) return null;
      if (prev.status[qId] !== 'not-visited') return prev;
      return {
        ...prev,
        status: { ...prev.status, [qId]: 'not-answered' }
      };
    });
  }, []);

  return {
    state,
    answerQuestion,
    toggleMarkForReview,
    visitQuestion,
    pauseExam: () => setState(prev => prev ? { ...prev, isPaused: true } : null),
    resumeExam: () => setState(prev => prev ? { ...prev, isPaused: false } : null),
  };
};
