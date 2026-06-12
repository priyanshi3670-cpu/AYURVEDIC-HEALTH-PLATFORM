import React from 'react';
import { Star, MessageSquare, Quote, Heart } from 'lucide-react';
import { ClinicReview } from '../../types';

interface ReviewSectionProps {
  reviews: ClinicReview[];
  rating: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, rating }) => {
  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <MessageSquare className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">patient outcomes</span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Reviews & Ratings</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Visual Rating Scoreboard */}
        <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-primary/5 flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Average Rating</span>
          <span className="font-serif text-5xl font-black text-primary block leading-none">{rating}</span>
          <div className="flex items-center space-x-0.5 text-accent">
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current text-gray-200" />
          </div>
          <span className="text-[10px] text-text-secondary font-medium">Based on {reviews.length} Patient Testimonials</span>
        </div>

        {/* Right Column (2/3 width): Comments List */}
        <div className="lg:col-span-2 space-y-4">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-3 relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/5 shrink-0" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-primary text-xs leading-none">
                    {rev.patientName}
                  </h4>
                  <span className="text-[9px] text-text-secondary font-medium block pt-1">{rev.date}</span>
                </div>
                <div className="flex items-center space-x-0.5 text-accent">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current shrink-0" />
                  ))}
                  {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-gray-200 shrink-0" />
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
                "{rev.comment}"
              </p>

              {rev.recoveryResult && (
                <div className="bg-primary/5 border border-primary/10 p-3 rounded-xl flex items-start space-x-2 text-[10px] font-bold text-primary">
                  <Heart className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-text-secondary/60">Verified Recovery Outcome</span>
                    <span className="text-primary">{rev.recoveryResult}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
