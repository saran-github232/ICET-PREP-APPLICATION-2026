import type { Question, QuestionSection } from '../../types';

interface Props {
  questions: Question[];
  currentIdx: number;
  status: Record<string, string>;
  onSelect: (index: number) => void;
  section: QuestionSection;
}

export const QuestionPalette: React.FC<Props> = ({ questions, currentIdx, status, onSelect, section }) => {
  // const sectionQuestions = questions.filter(q => q.section === section);

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-primary/5">
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary select-none">
          {section} Section
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="grid grid-cols-4 gap-3">
          {questions.map((q, i) => {
            const isCurrent = currentIdx === i;
            const qStatus = status[q.id] || 'not-visited';
            
            let colorClass = "bg-white text-text-secondary border-primary/10";
            if (qStatus === 'answered') colorClass = "bg-success text-white border-success";
            if (qStatus === 'marked') colorClass = "bg-review text-white border-review";
            if (qStatus === 'marked-answered') colorClass = "bg-review text-white border-review relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-2 after:h-2 after:bg-success after:rounded-full";
            if (isCurrent) colorClass += " ring-2 ring-primary ring-offset-2";

            return (
              <button
                key={q.id}
                onClick={() => onSelect(i)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${colorClass}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 bg-white/50 space-y-3 border-t border-primary/10">
        <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
          <div className="w-3 h-3 bg-success rounded-sm" /> Answered
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
          <div className="w-3 h-3 bg-review rounded-sm" /> Marked
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
          <div className="w-3 h-3 bg-white border border-primary/10 rounded-sm" /> Not Visited
        </div>
      </div>
    </div>
  );
};
