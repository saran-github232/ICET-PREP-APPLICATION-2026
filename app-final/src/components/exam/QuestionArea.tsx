import React from 'react';
import type { Question } from '../../types';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';

interface Props {
  question: Question;
  selectedOptionId?: string;
  onAnswer: (qId: string, optId: string) => void;
  onToggleMark: (qId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isMarked: boolean;
  totalQuestions: number;
  currentIndex: number;
}

export const QuestionArea: React.FC<Props> = ({
  question,
  selectedOptionId,
  onAnswer,
  onToggleMark,
  onNext,
  onPrev,
  isMarked,
  totalQuestions,
  currentIndex
}) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Question Header */}
      <div className="px-8 py-4 border-b border-primary/5 flex justify-between items-center bg-background/30">
        <span className="text-sm font-bold text-primary tracking-widest uppercase">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <button 
          onClick={() => onToggleMark(question.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            isMarked ? 'bg-review text-white shadow-md' : 'bg-background hover:bg-primary/5 text-text-secondary'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          {isMarked ? 'Marked' : 'Mark for Review'}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-12 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl mb-12 leading-relaxed font-serif text-text-primary">
          {question.text}
        </h2>

        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswer(question.id, option.id)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                selectedOptionId === option.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-background hover:border-primary/20 hover:bg-background/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                selectedOptionId === option.id ? 'bg-primary text-white' : 'bg-background text-text-secondary'
              }`}>
                {option.id}
              </div>
              <span className="text-lg font-serif">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="px-8 py-6 border-t border-primary/5 flex justify-between items-center bg-background/10">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 font-bold text-text-secondary disabled:opacity-30 hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => onAnswer(question.id, "")} // Logic for clearing answer if needed
            className="px-6 py-3 font-bold text-text-secondary hover:text-danger transition-colors text-sm uppercase tracking-wider"
          >
            Clear Response
          </button>
          
          <button
            onClick={onNext}
            className="btn-primary flex items-center gap-2 px-8"
          >
            {currentIndex === totalQuestions - 1 ? 'Finish & Review' : 'Save & Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
