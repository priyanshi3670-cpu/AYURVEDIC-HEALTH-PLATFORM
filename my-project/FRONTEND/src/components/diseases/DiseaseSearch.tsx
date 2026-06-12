import React from 'react';
import { Search } from 'lucide-react';

interface DiseaseSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export const DiseaseSearch: React.FC<DiseaseSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-lg shadow-sm border border-[#2E7D32]/10 rounded-full bg-white px-4 py-1.5 flex items-center">
      <Search className="w-5 h-5 text-secondary mr-3 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search illnesses by name, description, symptoms..."
        className="w-full bg-transparent border-none py-2 text-xs text-text-primary placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default DiseaseSearch;
