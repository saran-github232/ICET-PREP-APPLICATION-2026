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
      setState(JSON.parse(saved));
    } else {
      const initialState: ExamState = {
        testId,
        testName: "ICET Mock Test", // This can be passed in
        questions,
        userAnswers: {},
        status: {},
        timeLeft: 90 * 60, // 90 minutes standard
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
