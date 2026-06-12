import React from 'react';
import { Star, ArrowRight, Video } from 'lucide-react';
import { Doctor } from '../../services/doctorApi';

interface FeaturedDoctorsProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

export const FeaturedDoctors: React.FC<FeaturedDoctorsProps> = ({ doctors, onSelectDoctor }) => {
  const featured = doctors.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="py-16 px-6 md:px-12 bg-white border-t border-b border-[#2E7D32]/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block">Top Specialists</span>
          <h2 className="font-serif text-3xl font-bold text-primary">Featured Practitioners</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Our most requested certified experts specializing in metabolic restoration, chronic nerve pain, and Panchakarma detoxification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoctor(doc)}
              className="bg-[#F8FFF8] border border-[#2E7D32]/5 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="p-6 flex items-start space-x-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <span className="text-[8px] font-bold text-accent uppercase bg-accent/10 px-2 py-0.5 rounded-full inline-block">
                    {doc.specialization}
                  </span>
                  <h3 className="font-serif text-base font-bold text-primary truncate">{doc.name}</h3>
                  <div className="flex items-center space-x-1.5 text-xs">
                    <div className="flex items-center space-x-0.5">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span className="font-bold text-primary">{doc.rating}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="text-text-secondary truncate text-[11px]">{doc.qualification}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex justify-between items-center text-xs border-t border-gray-50 mt-4 bg-[#FAF9F6]/40">
                <span className="text-text-secondary font-semibold">{doc.experience} Yrs Exp</span>
                <span className="text-primary font-bold hover:text-accent flex items-center space-x-1 transition-colors">
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
