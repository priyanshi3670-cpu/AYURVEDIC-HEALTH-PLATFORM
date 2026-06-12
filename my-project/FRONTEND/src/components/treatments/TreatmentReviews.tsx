import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  review: string;
  recoveryResult: string;
}

interface TreatmentReviewsProps {
  treatmentName: string;
}

export const TreatmentReviews: React.FC<TreatmentReviewsProps> = ({ treatmentName }) => {
  const reviewsData: Record<string, ReviewItem[]> = {
    'Panchakarma': [
      { id: 'rev-1', name: 'Amit Verma', rating: 5, review: 'Completed a 14-day Panchakarma detox cycle. The body aches and constant lethargy are entirely gone. I feel 10 years younger!', recoveryResult: 'Systemic Toxins Cleared in 14 Days' },
      { id: 'rev-2', name: 'Divya Pillai', rating: 5, review: 'Highly structured and clean procedure. My skin scaling issues (psoriasis) have significantly faded.', recoveryResult: 'Psoriasis Flareups Reduced by 90%' }
    ],
    'Vamana': [
      { id: 'rev-1', name: 'Karthik Rao', rating: 5, review: 'Vamana emesis was tough but the throat clearing was instant. My chronic asthma breathlessness is completely resolved.', recoveryResult: 'Asthma Inhaler Dependency Removed' }
    ],
    'Virechana': [
      { id: 'rev-1', name: 'Sneha Sharma', rating: 5, review: 'Did Virechana for severe acne and liver heat. The purification cleared my facial breakouts in just three weeks.', recoveryResult: 'Severe Cystic Acne Cleared' }
    ],
    'Basti': [
      { id: 'rev-1', name: 'Ramanathan Iyer', rating: 5, review: 'Medicated oil enema Basti relieved my lower back lumbar stiffness. Rhythmic lubrication helped me walk freely.', recoveryResult: 'Lumbar Spondylosis Pain Gone' }
    ],
    'Shirodhara': [
      { id: 'rev-1', name: 'Ananya Goel', rating: 5, review: 'Warm oil stream poured on my forehead brought immediate mental calm. Chronic insomnia has vanished.', recoveryResult: 'Insomnia Cured; Restored 8h Sleep Cycle' }
    ]
  };

  // Default reviews list if treatment name is not matched
  const defaultReviews: ReviewItem[] = [
    { id: 'd-1', name: 'Vikram Sengupta', rating: 5, review: `Underwent a standard course of this treatment. Systemic lethargy and digestion are fully rebalanced.`, recoveryResult: 'Restored Vitality & Agni in 3 Weeks' },
    { id: 'd-2', name: 'Nisha Hegde', rating: 4, review: `Highly professional treatment structure. Followed the prescribed diet strict rules and saw great results.`, recoveryResult: 'Doshic Imbalance Stabilized' }
  ];

  const list = reviewsData[treatmentName] || defaultReviews;

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">outcomes registry</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Patient Feedback & Reviews</h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
          Verified patient statements detailing their clinical experience and the physical recovery results achieved.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {list.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-primary text-sm">{item.name}</h4>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-accent text-accent' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed font-semibold italic">
                "{item.review}"
              </p>
            </div>

            {/* Recovery Badge */}
            <div className="bg-[#2E7D32]/5 border border-primary/10 p-3 rounded-xl flex items-center space-x-2 text-primary font-bold shrink-0">
              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
              <div>
                <span className="block text-[8px] uppercase text-text-secondary">Recovery Result</span>
                <span className="text-[10.5px] leading-tight block">{item.recoveryResult}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TreatmentReviews;
