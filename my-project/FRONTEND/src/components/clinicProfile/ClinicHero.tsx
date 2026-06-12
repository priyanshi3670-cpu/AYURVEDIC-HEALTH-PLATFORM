import React from 'react';
import { Star, MapPin, Calendar, Users, Phone, Globe, ArrowRight } from 'lucide-react';
import { Clinic } from '../../types';

interface ClinicHeroProps {
  clinic: Clinic;
  onBookClick: () => void;
  onContactClick: () => void;
}

export const ClinicHero: React.FC<ClinicHeroProps> = ({ clinic, onBookClick, onContactClick }) => {
  const handleScrollToServices = () => {
    const el = document.getElementById('clinic-services-section');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative rounded-3xl overflow-hidden shadow-lg border border-[#2E7D32]/10 bg-white">
      {/* Banner Cover */}
      <div className="h-64 md:h-96 relative overflow-hidden bg-gray-100">
        <img 
          src={clinic.bannerImage} 
          alt={clinic.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* Main Info Box */}
      <div className="relative px-6 md:px-10 pb-8 -mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
          {/* Logo */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white border border-primary/10 p-2 overflow-hidden shadow-md shrink-0">
            <img src={clinic.logo} alt="" className="w-full h-full object-contain" />
          </div>

          {/* Text details */}
          <div className="text-center md:text-left space-y-2 md:pb-2 text-white md:text-shadow">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              <span className="bg-primary px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white border border-primary-light/10 shadow-sm">
                {clinic.type}
              </span>
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 border border-white/10 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-accent text-accent shrink-0" />
                <span>{clinic.rating} ({clinic.reviewCount} Reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl md:text-4xl font-black leading-tight text-primary md:text-white">
              {clinic.name}
            </h1>

            <div className="flex items-center justify-center md:justify-start space-x-1 text-xs text-text-secondary md:text-white/80 font-semibold">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>{clinic.address}, {clinic.city}, {clinic.state}, {clinic.country}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:pb-2">
          <button
            onClick={onBookClick}
            className="flex-grow md:flex-grow-0 bg-primary hover:bg-primary-light text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-md uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <span>Book Consultation</span>
          </button>
          
          <button
            onClick={onContactClick}
            className="flex-grow md:flex-grow-0 border border-primary/20 hover:bg-primary/5 text-primary bg-white font-bold text-xs py-3 px-6 rounded-2xl uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-accent" />
            <span>Contact Clinic</span>
          </button>

          <button
            onClick={handleScrollToServices}
            className="flex-grow md:flex-grow-0 bg-[#FAF9F6] border border-gray-100 hover:bg-gray-100 text-text-primary font-bold text-xs py-3 px-6 rounded-2xl uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <span>Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent animate-pulse" />
          </button>
        </div>
      </div>

      {/* Meta Indicators Footer */}
      <div className="bg-[#F8FFF8] border-t border-[#2E7D32]/5 px-6 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-text-secondary">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Calendar className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="block text-[9px] uppercase text-text-secondary/60">Established</span>
            <span className="text-text-primary">{clinic.yearsEstablished} Years Ago</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="block text-[9px] uppercase text-text-secondary/60">Specialists</span>
            <span className="text-text-primary">{clinic.doctorsCount} In-House Doctors</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Phone className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="block text-[9px] uppercase text-text-secondary/60">Direct Line</span>
            <span className="text-text-primary text-[10px]">{clinic.phone}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Globe className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="block text-[9px] uppercase text-text-secondary/60">Website</span>
            <span className="text-text-primary text-[10px] truncate max-w-[120px] block">{clinic.website.replace('https://', '')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicHero;
