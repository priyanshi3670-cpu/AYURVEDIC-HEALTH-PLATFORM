import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Clock, Heart, ShieldAlert, CheckCircle2, ChevronRight, UserCheck, Calendar } from 'lucide-react';
import { Treatment } from '../../types';

interface TreatmentDetailProps {
  treatment: Treatment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TreatmentDetail: React.FC<TreatmentDetailProps> = ({ treatment, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !treatment) return null;

  const handleFindDoctors = () => {
    onClose();
    // Navigate to doctors page and search by specialization/category
    navigate(`/doctors`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F8FFF8] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/60 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        {/* Banner header image */}
        <div
          className="relative h-60 bg-primary text-white p-6 md:p-8 flex flex-col justify-end shrink-0"
          style={{
            backgroundImage: `linear-gradient(rgba(46,125,50,0.7), rgba(46,125,50,0.95)), url(${treatment.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <span className="bg-accent text-primary text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
              {treatment.category}
            </span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">{treatment.name}</h2>
              <div className="flex items-center space-x-1.5 bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span>{treatment.rating} ({treatment.reviewCount} Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling details content */}
        <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns (About and details) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview */}
            <div className="space-y-2.5">
              <h3 className="font-serif text-base font-bold text-primary">Overview</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                {treatment.overview}
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-3 pt-4 border-t border-gray-150">
              <h3 className="font-serif text-base font-bold text-primary">Core Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {treatment.benefits.map((b, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs font-semibold text-text-primary">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            <div className="space-y-4 pt-4 border-t border-gray-150">
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-primary">Procedure Protocol</h3>
                <p className="text-[11px] text-text-secondary font-medium">{treatment.procedure}</p>
              </div>

              {/* Numbered Steps */}
              <div className="space-y-3 bg-white p-4.5 rounded-2xl border border-primary/5">
                <span className="text-[9px] uppercase font-bold text-text-secondary tracking-widest block">Operational Stages</span>
                <ol className="space-y-3 text-xs text-text-primary">
                  {treatment.steps.map((step, idx) => (
                    <li key={idx} className="flex space-x-3">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Treatment FAQs */}
            <div className="space-y-3 pt-4 border-t border-gray-150">
              <h3 className="font-serif text-base font-bold text-primary">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {treatment.faq.map((fq, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-150/70 space-y-1">
                    <h4 className="text-xs font-bold text-primary">Q: {fq.question}</h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">A: {fq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Specifications & CTAs) */}
          <div className="space-y-6">
            
            {/* Quick specifications panel */}
            <div className="bg-white border border-[#2E7D32]/10 p-5 rounded-2xl space-y-4 shadow-sm">
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest block">Therapy Metrics</span>
              
              <div className="space-y-3.5 text-xs text-text-secondary">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4.5 h-4.5 text-primary shrink-0" />
                  <div>
                    <span className="text-[9px] block font-bold uppercase">Duration</span>
                    <span className="font-bold text-primary text-[11px]">{treatment.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Heart className="w-4.5 h-4.5 text-primary shrink-0" />
                  <div>
                    <span className="text-[9px] block font-bold uppercase">Recovery Period</span>
                    <span className="font-bold text-primary text-[11px]">{treatment.recoveryTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <span className="text-primary text-[16px] font-bold shrink-0">₹</span>
                  <div>
                    <span className="text-[9px] block font-bold uppercase">Cost Estimate</span>
                    <span className="font-bold text-primary text-[11px]">₹{treatment.costEstimate.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suitability & Contraindications */}
            <div className="bg-white border border-[#2E7D32]/5 p-5 rounded-2xl space-y-4 shadow-sm text-xs">
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-[#2E7D32] uppercase tracking-wider block">Suitable Conditions</span>
                <div className="flex flex-wrap gap-1.5">
                  {treatment.suitableFor.map((item, i) => (
                    <span key={i} className="bg-[#2E7D32]/5 text-primary py-1 px-2.5 rounded-lg font-bold text-[9px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-50">
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider block flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                  <span>Precautions</span>
                </span>
                <ul className="space-y-1 text-[10px] text-text-secondary list-disc list-inside leading-relaxed">
                  {treatment.precautions.map((item, i) => (
                    <li key={i} className="font-medium">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleFindDoctors}
                className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 text-accent" />
                <span>Book Consultation</span>
              </button>

              <button
                onClick={handleFindDoctors}
                className="w-full bg-white hover:bg-gray-50 border border-primary text-primary font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
              >
                <UserCheck className="w-4 h-4 text-accent" />
                <span>Recommended Doctors</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TreatmentDetail;
