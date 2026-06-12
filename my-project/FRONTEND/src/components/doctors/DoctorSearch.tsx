import React from 'react';
import { Search, MapPin, Sprout } from 'lucide-react';

interface DoctorSearchProps {
  name: string;
  setName: (val: string) => void;
  specialization: string;
  setSpecialization: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const DoctorSearch: React.FC<DoctorSearchProps> = ({
  name,
  setName,
  specialization,
  setSpecialization,
  city,
  setCity,
  onSearchSubmit
}) => {
  return (
    <form
      onSubmit={onSearchSubmit}
      className="bg-white border border-[#2E7D32]/10 p-3 rounded-3xl shadow-lg shadow-primary/5 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto items-center"
    >
      {/* Name */}
      <div className="relative px-3 py-1.5 flex items-center md:border-r border-gray-100">
        <Search className="w-4.5 h-4.5 text-secondary mr-3 shrink-0" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doctor name..."
          className="w-full bg-transparent text-xs text-text-primary placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Specialization */}
      <div className="relative px-3 py-1.5 flex items-center md:border-r border-gray-100">
        <Sprout className="w-4.5 h-4.5 text-secondary mr-3 shrink-0" />
        <input
          type="text"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="Specialization..."
          className="w-full bg-transparent text-xs text-text-primary placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* City */}
      <div className="relative px-3 py-1.5 flex items-center">
        <MapPin className="w-4.5 h-4.5 text-secondary mr-3 shrink-0" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City or State..."
          className="w-full bg-transparent text-xs text-text-primary placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3 rounded-2xl transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg"
      >
        Search Doctors
      </button>
    </form>
  );
};

export default DoctorSearch;
