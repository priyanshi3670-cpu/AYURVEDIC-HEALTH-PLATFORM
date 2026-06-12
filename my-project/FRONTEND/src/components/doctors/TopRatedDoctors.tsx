import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, Briefcase } from 'lucide-react';
import { Doctor } from '../../services/doctorApi';

interface TopRatedDoctorsProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

export const TopRatedDoctors: React.FC<TopRatedDoctorsProps> = ({ doctors, onSelectDoctor }) => {
  const topRated = doctors.filter((d) => d.rating >= 4.8);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (topRated.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % topRated.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + topRated.length) % topRated.length);
  };

  const activeDoc = topRated[currentIndex];

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block font-sans">Patient Favorites</span>
          <h2 className="font-serif text-3xl font-bold text-primary">Top Rated by Patients</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Highly reviewed physicians maintaining outstanding patient outcomes and satisfaction indices.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-3xl p-6 md:p-10 shadow-lg flex flex-col md:flex-row gap-8 items-center justify-between">
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 p-2 bg-white rounded-full border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-md z-10 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 p-2 bg-white rounded-full border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-md z-10 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Doc Photo */}
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden shrink-0 shadow-md transform hover:scale-102 transition-transform">
            <img src={activeDoc.photo} alt={activeDoc.name} className="w-full h-full object-cover" />
          </div>

          {/* Doc details */}
          <div className="space-y-4 flex-grow text-center md:text-left">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-accent uppercase bg-accent/15 px-3 py-1 rounded-full inline-block">
                {activeDoc.specialization}
              </span>
              <h3 className="font-serif text-2xl font-bold text-primary">{activeDoc.name}</h3>
              <p className="text-xs text-text-secondary font-medium">{activeDoc.qualification}</p>
            </div>

            <div className="flex justify-center md:justify-start items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Star className="w-4.5 h-4.5 fill-accent text-accent animate-pulse" />
                <span className="text-sm font-bold text-primary">{activeDoc.rating}</span>
                <span className="text-xs text-text-secondary">({activeDoc.reviewCount} Reviews)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-text-secondary">
                <Briefcase className="w-4.5 h-4.5 text-secondary" />
                <span>{activeDoc.experience} Yrs</span>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 italic">
              "{activeDoc.about}"
            </p>

            <button
              onClick={() => onSelectDoctor(activeDoc)}
              className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-2.5 rounded-full shadow transition-all duration-300"
            >
              Consult Practitioner
            </button>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2 pt-2">
          {topRated.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-primary w-5' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
