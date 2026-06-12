import React from 'react';
import { Search } from 'lucide-react';

interface TreatmentSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TreatmentSearch: React.FC<TreatmentSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="w-full max-w-xl mx-auto relative group">
      <div className="absolute inset-y-0 left-4.5 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search treatments (e.g. Shirodhara, Vamana, Weight)..."
        className="w-full bg-white border border-[#2E7D32]/10 rounded-full py-4 pl-12 pr-6 text-xs text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary shadow-md shadow-primary/5 group-hover:shadow-primary/10 transition-all duration-300"
      />
    </div>
  );
};

export default TreatmentSearch;
