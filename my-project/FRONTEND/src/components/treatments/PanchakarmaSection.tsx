import React, { useState, useMemo } from 'react';
import { Star, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Treatment } from '../../types';

interface PanchakarmaSectionProps {
  treatments: Treatment[];
  onLearnMore: (treatment: Treatment) => void;
}

export const PanchakarmaSection: React.FC<PanchakarmaSectionProps> = ({ treatments, onLearnMore }) => {
  // Extract classical Panchakarma therapies
  const pkList = useMemo(() => {
    const slugs = ['vamana', 'virechana', 'basti', 'nasya', 'raktamokshana'];
    return treatments.filter((t) => slugs.includes(t.slug.toLowerCase()));
  }, [treatments]);

  const [activeIndex, setActiveIndex] = useState(0);

  const selectedTherapy = pkList[activeIndex];

  if (pkList.length === 0) return null;

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="bg-[#2E7D32]/5 text-primary border border-primary/10 text-[9px] font-bold py-1 px-3.5 rounded-full uppercase tracking-wider inline-block">
          Classical Cleansing
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">The 5 Actions of Panchakarma</h2>
        <p className="text-xs text-text-secondary leading-relaxed">
          Explore the five classical elimination therapies designed to purge aggravated doshas and repair metabolic channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left column: List of the 5 Actions */}
        <div className="flex flex-col space-y-2.5">
          {pkList.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-4 rounded-2xl text-left border flex items-center justify-between transition-all duration-300 w-full hover:shadow-sm ${
                  isActive
                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/15'
                    : 'bg-[#FAF9F6] border-gray-100 text-text-primary hover:border-primary/20 hover:bg-white'
                }`}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold font-serif">{item.name}</h4>
                  <span className={`text-[8px] uppercase tracking-wider font-semibold ${isActive ? 'text-white/85' : 'text-text-secondary/80'}`}>
                    {item.category}
                  </span>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 text-accent transition-transform ${isActive ? 'translate-x-0.5' : '-translate-x-0.5 opacity-50'}`} />
              </button>
            );
          })}
        </div>

        {/* Middle & Right columns: Dynamic Details Panel */}
        {selectedTherapy && (
          <div className="lg:col-span-2 bg-[#FAF9F6] border border-[#2E7D32]/5 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-5 gap-6 animate-fade-in-up">
            {/* Image (2/5 size on desktop) */}
            <div className="md:col-span-2 h-44 md:h-full rounded-2xl overflow-hidden shadow-sm">
              <img
                src={selectedTherapy.image}
                alt={selectedTherapy.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Content (3/5 size on desktop) */}
            <div className="md:col-span-3 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-bold text-primary">{selectedTherapy.name}</h3>
                  <div className="flex items-center space-x-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="font-bold text-primary">{selectedTherapy.rating}</span>
                  </div>
                </div>

                <p className="text-[11px] text-text-secondary leading-relaxed font-medium line-clamp-4">
                  {selectedTherapy.overview}
                </p>

                {/* Micro info */}
                <div className="flex space-x-4 text-[10px] font-bold text-text-secondary pt-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>Duration: {selectedTherapy.duration}</span>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[9px] uppercase font-bold text-text-secondary block tracking-wider">Key Outcomes</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedTherapy.benefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-[10px] font-medium text-text-primary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onLearnMore(selectedTherapy)}
                className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Read Procedure Steps</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PanchakarmaSection;
