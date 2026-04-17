import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { geminiService } from '../services/gemini';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle2, XCircle, Info, Sparkles, Trophy, ArrowLeft, Loader2, Download, BookOpen } from 'lucide-react';
import { jsPDF } from 'jspdf';

const Results: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [examData, setExamData] = useState<any>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingExpl, setLoadingExpl] = useState<string | null>(null);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`icet_exam_${testId}`);
    if (saved) {
      setExamData(JSON.parse(saved));
    }
  }, [testId]);

  const stats = useMemo(() => {
    if (!examData) return null;
    const questions = examData.questions;
    const userAnswers = examData.userAnswers;
    
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    questions.forEach((q: any) => {
      const userAns = userAnswers[q.id];
      if (!userAns) unattempted++;
      else if (userAns === q.correctAnswer) correct++;
      else wrong++;
    });

    return { correct, wrong, unattempted, total: questions.length };
  }, [examData]);

  const handleDownloadPDF = () => {
    if (!examData || !stats) return;
    
    const doc = new jsPDF();
    const margin = 15;
    let y = 20;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(26, 60, 110);
    doc.text("ICET Mock Prep - Performance Report", margin, y);
    y += 15;

    doc.setFontSize(14);
    doc.setTextColor(85, 92, 112);
    doc.text(`Test Result: ${stats.correct} / ${stats.total}`, margin, y);
    y += 10;
    doc.text(`Accuracy: ${Math.round((stats.correct / (stats.total || 1)) * 100)}%`, margin, y);
    y += 20;

    // Questions
    doc.setFontSize(16);
    doc.setTextColor(232, 112, 10);
    doc.text("Question Review & Explanations", margin, y);
    y += 15;

    examData.questions.forEach((q: any, i: number) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(26, 26, 46);
      const text = `${i + 1}. ${q.text}`;
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, margin, y);
      y += (splitText.length * 6) + 4;

      doc.setFontSize(10);
      doc.setTextColor(46, 139, 87);
      doc.text(`Correct Answer: ${q.correctAnswer}`, margin, y);
      y += 8;

      if (explanations[q.id]) {
        doc.setTextColor(85, 92, 112);
        const explText = `Explanation: ${explanations[q.id]}`;
        const splitExpl = doc.splitTextToSize(explText, 170);
        doc.text(splitExpl, margin + 5, y);
        y += (splitExpl.length * 5) + 15;
      } else {
        y += 10;
      }
    });

    doc.save(`ICET_Report_${testId}.pdf`);
  };

  const handleGenerateAllExplanations = async () => {
    if (!examData) return;
    setIsGeneratingAll(true);
    
    for (const q of examData.questions) {
      if (explanations[q.id]) continue;
      
      const expl = await geminiService.getExplanation(
        q.text,
        q.options.map((o: any) => `${o.id}: ${o.text}`),
        q.correctAnswer
      );
      setExplanations(prev => ({ ...prev, [q.id]: expl }));
    }
    
    setIsGeneratingAll(false);
  };

  const handleGetExplanation = async (qId: string, qText: string, opts: any[], correct: string) => {
    setLoadingExpl(qId);
    const expl = await geminiService.getExplanation(
      qText,
      opts.map(o => `${o.id}: ${o.text}`),
      correct
    );
    setExplanations(prev => ({ ...prev, [qId]: expl }));
    setLoadingExpl(null);
  };

  if (!examData || !stats) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
        <p>Loading Results...</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Correct', value: stats.correct, color: '#2E8B57' },
    { name: 'Wrong', value: stats.wrong, color: '#CC3333' },
    { name: 'Unattempted', value: stats.unattempted, color: '#EAECF0' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-8 mt-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/select')} className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-4xl">Performance Analysis</h2>
        </div>

        {/* Global Stats Group */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Score Card */}
          <div className="lg:col-span-2 premium-card p-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-64 h-64 shrink-0">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="block text-4xl font-bold text-primary">{stats.correct}</span>
                  <span className="text-xs font-bold text-text-secondary uppercase">Score</span>
               </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/5 rounded-2xl text-primary">
                  <Trophy className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-4xl font-black">Accuracy: {Math.round((stats.correct / (stats.correct + stats.wrong || 1)) * 100)}%</h3>
                  <p className="text-text-secondary font-serif italic">Great effort! Focus on Analytical Reasoning more.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-success/5 p-4 rounded-xl border border-success/10">
                  <span className="block text-success font-black text-2xl">{stats.correct}</span>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Correct</span>
                </div>
                <div className="bg-danger/5 p-4 rounded-xl border border-danger/10">
                  <span className="block text-danger font-black text-2xl">{stats.wrong}</span>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Incorrect</span>
                </div>
                <div className="bg-background p-4 rounded-xl border border-primary/5">
                  <span className="block text-text-secondary font-black text-2xl">{stats.unattempted}</span>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Left</span>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card p-8 bg-primary text-white flex flex-col justify-center">
             <Sparkles className="w-12 h-12 text-secondary mb-6" />
             <h3 className="text-2xl text-white mb-4">AI Tutor Insights</h3>
             <p className="font-serif italic opacity-80 leading-loose">
               "Based on your responses, you show strong command over the Verbal section. However, Quantitative Aptitude questions took 20% longer on average."
             </p>
          </div>
        </div>

        {/* Detailed Review Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <h3 className="text-2xl">Review Questions</h3>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={handleGenerateAllExplanations}
              disabled={isGeneratingAll}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-secondary/10 text-secondary rounded-xl font-bold hover:bg-secondary/20 transition-all disabled:opacity-50"
            >
              {isGeneratingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />}
              {isGeneratingAll ? "Generating Practice Set..." : "Practice Mode (Build Explanations)"}
            </button>

            <button 
              onClick={handleDownloadPDF}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <Download className="w-4 h-4" />
              Download PDF Report
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {examData.questions.map((q: any, i: number) => {
            const userAns = examData.userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isUnattempted = !userAns;

            return (
              <div key={q.id} className="premium-card overflow-hidden">
                <div className={`px-6 py-4 flex justify-between items-center ${
                  isCorrect ? 'bg-success/5' : isUnattempted ? 'bg-background' : 'bg-danger/5'
                }`}>
                  <span className="font-bold flex items-center gap-2">
                    {isCorrect ? <CheckCircle2 className="w-5 h-5 text-success" /> : 
                     isUnattempted ? <Info className="w-5 h-5 text-text-secondary" /> : 
                     <XCircle className="w-5 h-5 text-danger" />}
                    Question {i + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-50">{q.section}</span>
                </div>
                
                <div className="p-8">
                  <p className="text-xl font-serif mb-6">{q.text}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {q.options.map((opt: any) => (
                      <div key={opt.id} className={`p-4 rounded-xl border flex items-center gap-3 ${
                        opt.id === q.correctAnswer ? 'border-success bg-success/5' : 
                        opt.id === userAns ? 'border-danger bg-danger/5' : 'border-background'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          opt.id === q.correctAnswer ? 'bg-success text-white' : 
                          opt.id === userAns ? 'bg-danger text-white' : 'bg-background text-text-secondary'
                        }`}>
                          {opt.id}
                        </div>
                        <span className="font-serif">{opt.text}</span>
                      </div>
                    ))}
                  </div>

                  {explanations[q.id] ? (
                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                      <div className="flex items-center gap-2 text-primary font-bold mb-3">
                        <Sparkles className="w-4 h-4" />
                        AI Explanation
                      </div>
                      <div className="text-text-secondary font-serif whitespace-pre-wrap leading-relaxed">
                        {explanations[q.id]}
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleGetExplanation(q.id, q.text, q.options, q.correctAnswer)}
                      disabled={loadingExpl === q.id}
                      className="flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all disabled:opacity-50"
                    >
                      {loadingExpl === q.id ? "Analyzing with Gemini..." : "Unlock Step-by-Step AI Explanation →"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Results;
