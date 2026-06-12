import React from 'react';
import { DoshaQuestion } from '../../types';
import { Check } from 'lucide-react';

interface QuestionCardProps {
  question: DoshaQuestion;
  selectedOptionIndex?: number;
  onSelectOption: (optionIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOptionIndex, onSelectOption }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-2">
        <span className="bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
          {question.category}
        </span>
      </div>

      <h4 className="font-serif text-lg md:text-xl font-bold text-text-primary leading-snug">
        {question.question}
      </h4>

      <div className="grid grid-cols-1 gap-3.5 pt-2">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-4.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-primary border-primary text-white shadow-md font-extrabold scale-[1.01]'
                  : 'bg-[#FAF9F6] border-primary/5 hover:border-primary/25 hover:bg-emerald-50/10 text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-3.5 pr-4">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center border text-[10px] font-black uppercase ${
                  isSelected ? 'bg-white/20 border-white text-white' : 'bg-white border-gray-250 text-text-secondary'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed font-medium">{option}</span>
              </div>
              
              <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-white/20 border-white text-white' : 'bg-white border-gray-200'
              }`}>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
