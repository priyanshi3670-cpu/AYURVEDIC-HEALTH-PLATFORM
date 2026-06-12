import React from 'react';
import { Search, MapPin, Sprout, ArrowRight } from 'lucide-react';

interface ClinicSearchProps {
  nameQuery: string;
  onNameQueryChange: (val: string) => void;
  cityQuery: string;
  onCityQueryChange: (val: string) => void;
  serviceQuery: string;
  onServiceQueryChange: (val: string) => void;
  citiesList: string[];
  servicesList: string[];
  onSearchSubmit: (e: React.FormEvent) => void;
  onExploreClinics: () => void;
}

export const ClinicSearch: React.FC<ClinicSearchProps> = ({
  nameQuery,
  onNameQueryChange,
  cityQuery,
  onCityQueryChange,
  serviceQuery,
  onServiceQueryChange,
  citiesList,
  servicesList,
  onSearchSubmit,
  onExploreClinics
}) => {
  return (
    <form 
      onSubmit={onSearchSubmit}
      className="bg-white border border-[#2E7D32]/10 p-5 rounded-3xl shadow-lg shadow-primary/5 flex flex-col md:flex-row gap-4 items-center w-full max-w-5xl mx-auto"
    >
      {/* Clinic Name Search */}
      <div className="w-full relative group">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
          <Search className="w-4.5 h-4.5 text-primary/60 group-hover:text-primary transition-colors" />
        </div>
        <input
          type="text"
          value={nameQuery}
          onChange={(e) => onNameQueryChange(e.target.value)}
          placeholder="Search clinic name..."
          className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary font-semibold transition-all"
        />
      </div>

      {/* City Dropdown Selection */}
      <div className="w-full relative group">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
          <MapPin className="w-4.5 h-4.5 text-primary/60 group-hover:text-primary transition-colors" />
        </div>
        <select
          value={cityQuery}
          onChange={(e) => onCityQueryChange(e.target.value)}
          className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary transition-all"
        >
          <option value="">Select City...</option>
          {citiesList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Service Dropdown Selection */}
      <div className="w-full relative group">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
          <Sprout className="w-4.5 h-4.5 text-primary/60 group-hover:text-primary transition-colors" />
        </div>
        <select
          value={serviceQuery}
          onChange={(e) => onServiceQueryChange(e.target.value)}
          className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary transition-all"
        >
          <option value="">Select Service...</option>
          {servicesList.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full md:w-auto shrink-0">
        <button
          type="submit"
          className="w-full md:w-auto bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-md transition-colors uppercase tracking-wider shrink-0 cursor-pointer"
        >
          Search
        </button>
        
        <button
          type="button"
          onClick={onExploreClinics}
          className="w-full md:w-auto bg-[#2E7D32]/5 hover:bg-[#2E7D32]/10 text-primary font-bold text-xs py-3.5 px-4 rounded-2xl border border-primary/10 transition-colors uppercase tracking-wider shrink-0 flex items-center justify-center space-x-1"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 text-accent animate-pulse shrink-0" />
        </button>
      </div>
    </form>
  );
};

export default ClinicSearch;
