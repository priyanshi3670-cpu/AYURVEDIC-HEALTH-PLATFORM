import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Treatment } from '../../types';

interface SimilarTreatmentsProps {
  currentTreatment: Treatment;
  allTreatments: Treatment[];
}

export const SimilarTreatments: React.FC<SimilarTreatmentsProps> = ({ currentTreatment, allTreatments }) => {
  // Find up to 3 similar treatments (same category or from the general list)
  const similarList = useMemo(() => {
    const matching = allTreatments.filter(t => t.id !== currentTreatment.id && t.category === currentTreatment.category);
    if (matching.length >= 3) {
      return matching.slice(0, 3);
    }
    // If not enough matching in same category, pad with general treatments
    const diffCat = allTreatments.filter(t => t.id !== currentTreatment.id && t.category !== currentTreatment.category);
    return [...matching, ...diffCat].slice(0, 3);
  }, [currentTreatment, allTreatments]);

  if (similarList.length === 0) return null;

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">alternate choices</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Related Treatments</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Consider exploring these complementary Ayurvedic therapies to support your holistic healing plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {similarList.map((t) => (
          <div 
            key={t.id} 
            className="group bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[340px]"
          >
            <div className="space-y-3">
              {/* Image */}
              <div className="h-32 relative overflow-hidden bg-gray-50">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform" 
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md border border-primary/5 py-0.5 px-2 rounded-full shadow-sm text-primary text-[8px] font-bold uppercase">
                  {t.category}
                </div>
              </div>

              {/* Text */}
              <div className="px-4.5 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-serif font-bold text-primary text-xs truncate max-w-[80%]">{t.name}</h4>
                  <div className="flex items-center space-x-0.5 text-[10px] font-bold text-primary shrink-0">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span>{t.rating}</span>
                  </div>
                </div>
                <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-3 font-semibold">
                  {t.description}
                </p>
              </div>
            </div>

            {/* Bottom link */}
            <div className="p-4 border-t border-gray-150 flex items-center justify-between bg-white shrink-0">
              <div>
                <span className="block text-[7.5px] uppercase font-bold text-text-secondary">Est. Cost</span>
                <span className="text-[11px] font-black text-primary">₹{t.costEstimate.toLocaleString('en-IN')}</span>
              </div>
              
              <Link
                to={`/treatments/${t.slug}`}
                className="text-primary font-bold text-[9px] uppercase tracking-wider flex items-center space-x-1 hover:text-primary-light transition-colors"
              >
                <span>View Therapy</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent animate-pulse" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarTreatments;
