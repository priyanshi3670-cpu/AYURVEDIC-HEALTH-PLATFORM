import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { ClinicType } from '../../types';

interface ClinicFiltersProps {
  citiesList: string[];
  statesList: string[];
  servicesList: string[];
  selectedCity: string;
  onCityChange: (val: string) => void;
  selectedState: string;
  onStateChange: (val: string) => void;
  selectedType: string;
  onTypeChange: (val: string) => void;
  selectedRating: number;
  onRatingChange: (val: number) => void;
  selectedService: string;
  onServiceChange: (val: string) => void;
  selectedYears: string;
  onYearsChange: (val: string) => void;
  onReset: () => void;
}

export const ClinicFilters: React.FC<ClinicFiltersProps> = ({
  citiesList,
  statesList,
  servicesList,
  selectedCity,
  onCityChange,
  selectedState,
  onStateChange,
  selectedType,
  onTypeChange,
  selectedRating,
  onRatingChange,
  selectedService,
  onServiceChange,
  selectedYears,
  onYearsChange,
  onReset
}) => {
  const clinicTypes: ClinicType[] = [
    'Ayurveda Clinic',
    'Ayurveda Hospital',
    'Panchakarma Center',
    'Wellness Center',
    'Holistic Healing Center'
  ];

  return (
    <div className="bg-white border border-[#2E7D32]/10 p-6 rounded-3xl shadow-sm space-y-5 h-auto lg:sticky lg:top-28">
      <div className="flex justify-between items-center pb-3 border-b border-gray-50">
        <div className="flex items-center space-x-2 text-primary font-bold text-xs">
          <Filter className="w-4 h-4 text-accent" />
          <span>Refine Directory</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-[9.5px] text-text-secondary hover:text-primary transition-colors font-bold uppercase"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      <div className="space-y-4 text-xs font-semibold">
        {/* City Filter */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">City</label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="">All Cities</option>
            {citiesList.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">State</label>
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="">All States</option>
            {statesList.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Clinic Type Filter */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">Clinic Type</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="">All Types</option>
            {clinicTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">Minimum Rating</label>
          <select
            value={selectedRating}
            onChange={(e) => onRatingChange(parseFloat(e.target.value) || 0)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="0">Any Rating</option>
            <option value="4.5">⭐ 4.5 & Above</option>
            <option value="4.7">⭐ 4.7 & Above</option>
            <option value="4.9">⭐ 4.9 & Above</option>
          </select>
        </div>

        {/* Services Filter */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">Therapy / Service</label>
          <select
            value={selectedService}
            onChange={(e) => onServiceChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="">All Services</option>
            {servicesList.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Years Established Filter */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">Years Established</label>
          <select
            value={selectedYears}
            onChange={(e) => onYearsChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="">Any Age</option>
            <option value="new">Established &lt; 10 Years</option>
            <option value="mid">Established 10 - 20 Years</option>
            <option value="legacy">Legacy &gt; 20 Years</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ClinicFilters;
