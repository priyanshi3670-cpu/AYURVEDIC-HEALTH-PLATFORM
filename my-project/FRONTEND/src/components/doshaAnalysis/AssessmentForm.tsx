import React, { useState } from 'react';
import { DoshaQuestion } from '../../types';
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Subcomponents
import ProgressTracker from './ProgressTracker';
import QuestionCard from './QuestionCard';

interface AssessmentFormProps {
  questions: DoshaQuestion[];
  onSubmit: (answers: Record<string, number>) => Promise<void>;
  isSubmitting: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ questions, onSubmit, isSubmitting }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const activeQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: optionIndex
    }));

    // Auto-advance to next question with a slight delay
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the assessment? All answers will be cleared.")) {
      setAnswers({});
      setCurrentIndex(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < totalQuestions) {
      alert(`Please answer all questions before submitting. You have answered ${answeredCount} of ${totalQuestions}.`);
      return;
    }
    onSubmit(answers);
  };

  const isCurrentAnswered = answers[activeQuestion?.id] !== undefined;

  return (
    <div className="bg-white border border-[#2E7D32]/10 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 relative">
      {/* Quiz Progress header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-5">
        <div className="space-y-1">
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">assessment progress</span>
          <h3 className="font-serif text-lg font-bold text-primary">Ayurvedic Prakriti Quiz</h3>
        </div>
        
        {/* Progress Tracker Subcomponent */}
        <ProgressTracker
          current={currentIndex + 1}
          total={totalQuestions}
          percentage={completionPercentage}
        />
      </div>

      {/* Main Form content */}
      <form onSubmit={handleSubmit} className="space-y-8 min-h-[300px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeQuestion && (
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Question Card Subcomponent */}
              <QuestionCard
                question={activeQuestion}
                selectedOptionIndex={answers[activeQuestion.id]}
                onSelectOption={handleSelectOption}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-6 gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className="text-text-secondary hover:text-rose-600 p-2.5 rounded-xl hover:bg-emerald-950/5 text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>Reset Quiz</span>
          </button>

          <div className="flex items-center space-x-3 ml-auto">
            {/* Back Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 text-text-primary disabled:opacity-40 p-3 rounded-xl cursor-pointer disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
            </button>

            {/* Next or Submit Button */}
            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className="bg-primary hover:bg-emerald-700 disabled:bg-primary/50 text-white font-serif px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 disabled:cursor-not-allowed shadow transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={answeredCount < totalQuestions || isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-serif px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-accent animate-bounce" />
                    <span>Analyze Constitution</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
