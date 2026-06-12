import React from 'react';
import { Filter, Star, Landmark, User, DollarSign } from 'lucide-react';

interface DoctorFiltersProps {
  specializations: string[];
  selectedSpec: string;
  setSelectedSpec: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  experience: number;
  setExperience: (val: number) => void;
  rating: number;
  setRating: (val: number) => void;
  maxFee: number;
  setMaxFee: (val: number) => void;
  online: boolean;
  setOnline: (val: boolean) => void;
  offline: boolean;
  setOffline: (val: boolean) => void;
  onReset: () => void;
}

export const DoctorFilters: React.FC<DoctorFiltersProps> = ({
  specializations,
  selectedSpec,
  setSelectedSpec,
  city,
  setCity,
  state,
  setState,
  experience,
  setExperience,
  rating,
  setRating,
  maxFee,
  setMaxFee,
  online,
  setOnline,
  offline,
  setOffline,
  onReset
}) => {
  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 rounded-3xl shadow-sm space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-150">
        <h3 className="font-serif text-base font-bold text-primary flex items-center space-x-2">
          <Filter className="w-4.5 h-4.5 text-accent" />
          <span>Refine Specialists</span>
        </h3>
        <button
          onClick={onReset}
          className="text-[9px] font-bold uppercase text-accent hover:text-primary transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Specialization selector */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-text-secondary">Specialization</label>
        <select
          value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)}
          className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary font-medium"
        >
          <option value="">All Specializations</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filters */}
      <div className="space-y-3.5">
        <label className="text-[10px] uppercase font-bold text-text-secondary block">Location Details</label>
        
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (e.g. Kochi, Mumbai)"
          className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary"
        />

        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State (e.g. Kerala, Maharashtra)"
          className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary"
        />
      </div>

      {/* Online/Offline Toggles */}
      <div className="space-y-2.5">
        <label className="text-[10px] uppercase font-bold text-text-secondary block">Consultation Format</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-text-primary font-semibold">
            <input
              type="checkbox"
              checked={online}
              onChange={(e) => setOnline(e.target.checked)}
              className="w-4 h-4 accent-primary rounded cursor-pointer"
            />
            <span>Online Video Sessions</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-text-primary font-semibold">
            <input
              type="checkbox"
              checked={offline}
              onChange={(e) => setOffline(e.target.checked)}
              className="w-4 h-4 accent-primary rounded cursor-pointer"
            />
            <span>In-Clinic Visits</span>
          </label>
        </div>
      </div>

      {/* Experience Range */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-text-secondary">
          <span>Min Experience</span>
          <span className="text-primary font-bold">{experience}+ Years</span>
        </div>
        <input
          type="range"
          min="0"
          max="30"
          value={experience}
          onChange={(e) => setExperience(parseInt(e.target.value))}
          className="w-full h-1 bg-[#F8FFF8] rounded-lg appearance-none cursor-pointer accent-primary border border-gray-100"
        />
      </div>

      {/* Consultation Fee Range */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-text-secondary">
          <span>Max Fee limit</span>
          <span className="text-primary font-bold">₹{maxFee}</span>
        </div>
        <input
          type="range"
          min="200"
          max="1500"
          step="50"
          value={maxFee}
          onChange={(e) => setMaxFee(parseInt(e.target.value))}
          className="w-full h-1 bg-[#F8FFF8] rounded-lg appearance-none cursor-pointer accent-primary border border-gray-100"
        />
      </div>

      {/* Rating Filter Selector */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-text-secondary block">Minimum Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary font-medium"
        >
          <option value="0">All Ratings</option>
          <option value="4.8">4.8 ★ & above</option>
          <option value="4.5">4.5 ★ & above</option>
          <option value="4.0">4.0 ★ & above</option>
        </select>
      </div>
    </div>
  );
};

export default DoctorFilters;
