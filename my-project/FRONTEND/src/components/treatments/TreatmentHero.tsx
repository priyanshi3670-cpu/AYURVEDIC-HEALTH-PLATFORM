import React from 'react';
import { Star, Clock, Heart, DollarSign, Calendar, ShieldCheck, UserCheck } from 'lucide-react';
import { Treatment } from '../../types';

interface TreatmentHeroProps {
  treatment: Treatment;
  onBookConsultation: () => void;
  onFindDoctor: () => void;
}

export const TreatmentHero: React.FC<TreatmentHeroProps> = ({
  treatment,
  onBookConsultation,
  onFindDoctor
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/40 mb-10">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${treatment.image})` }}
      />
      {/* Glassmorphic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/40 -z-10" />

      {/* Hero content grid */}
      <div className="p-8 md:p-12 text-white space-y-8 max-w-4xl">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="bg-accent text-primary text-[9.5px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              {treatment.category}
            </span>
            <span className="bg-white/15 backdrop-blur-md text-[10px] font-bold py-1 px-3 rounded-full flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span>{treatment.rating} ({treatment.reviewCount} reviews)</span>
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {treatment.name}
          </h1>

          <p className="text-xs md:text-sm text-white/90 max-w-2xl leading-relaxed font-medium">
            {treatment.description}
          </p>
        </div>

        {/* Hero Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center space-x-3">
            <Clock className="w-5 h-5 text-accent shrink-0" />
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-white/70">Duration</span>
              <span className="text-xs font-bold">{treatment.duration}</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center space-x-3">
            <Heart className="w-5 h-5 text-accent shrink-0" />
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-white/70">Recovery</span>
              <span className="text-xs font-bold">{treatment.recoveryTime}</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center space-x-3">
            <span className="text-accent text-[20px] font-bold shrink-0">₹</span>
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-white/70">Est. Cost</span>
              <span className="text-xs font-black">₹{treatment.costEstimate.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-white/70">Status</span>
              <span className="text-xs font-bold">Ayush Certified</span>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={onBookConsultation}
            className="bg-accent hover:bg-accent-light text-primary font-bold text-xs py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 uppercase tracking-widest flex items-center justify-center space-x-2 shrink-0"
          >
            <Calendar className="w-4.5 h-4.5 text-primary shrink-0" />
            <span>Book Consultation</span>
          </button>
          
          <button
            onClick={onFindDoctor}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs py-4 px-8 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center space-x-2 shrink-0"
          >
            <UserCheck className="w-4.5 h-4.5 text-accent shrink-0" />
            <span>Find Specialist Doctors</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentHero;
