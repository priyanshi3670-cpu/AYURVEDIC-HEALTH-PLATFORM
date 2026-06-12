import React from 'react';
import { Brain, Apple, Activity, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { AIRecommendation } from '../../types';
import { motion } from 'framer-motion';

interface AIRecommendationCardProps {
  recommendations: AIRecommendation;
  onOpenChat: () => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  recommendations,
  onOpenChat
}) => {
  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Brain className="w-5 h-5 text-accent animate-pulse" />
          </div>
          <div>
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">personalized bio-intelligence</span>
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Vaidya AI Daily Recommendations</h3>
          </div>
        </div>

        {/* Chat Trigger */}
        <button
          onClick={onOpenChat}
          className="bg-[#FAF9F6] border border-primary/10 hover:border-primary text-primary hover:bg-primary hover:text-white font-bold text-[9.5px] py-2.5 px-4 rounded-xl uppercase tracking-widest flex items-center space-x-1.5 transition-all self-start cursor-pointer group"
        >
          <span>Ask Assistant</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suggested Diet */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wide">
              <Apple className="w-4 h-4 text-accent" />
              <span>Suggested Diet</span>
            </div>
            <ul className="text-[11px] text-text-secondary leading-relaxed font-semibold space-y-1.5 list-disc pl-4">
              {recommendations.suggestedDiet.map((diet, index) => (
                <li key={index}>{diet}</li>
              ))}
            </ul>
          </div>
          <span className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-wider block pt-2">
            * Pacifies excess Pitta fire
          </span>
        </div>

        {/* Recommended Treatment */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wide">
              <Activity className="w-4 h-4 text-accent" />
              <span>Recommended Treatment</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
              {recommendations.recommendedTreatment}
            </p>
          </div>
          <span className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-wider block pt-2">
            * Recommended Panchakarma therapy
          </span>
        </div>

        {/* Lifestyle Tips */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Lifestyle Tips</span>
            </div>
            <ul className="text-[11px] text-text-secondary leading-relaxed font-semibold space-y-1.5 list-disc pl-4">
              {recommendations.lifestyleTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          <span className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-wider block pt-2">
            * Boosts daily Ojas (immunity)
          </span>
        </div>

        {/* Follow-up Reminder */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wide">
              <Clock className="w-4 h-4 text-accent" />
              <span>Follow-Up Reminder</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
              {recommendations.doctorFollowUpReminder}
            </p>
          </div>
          <span className="text-[9px] font-extrabold text-red-600/80 uppercase tracking-wider block pt-2">
            * Recommended check-in deadline
          </span>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendationCard;
