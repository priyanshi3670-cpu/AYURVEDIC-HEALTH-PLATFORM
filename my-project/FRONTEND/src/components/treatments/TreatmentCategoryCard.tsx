import React from 'react';
import * as Icons from 'lucide-react';
import { TreatmentCategory } from '../../types';

interface TreatmentCategoryCardProps {
  category: TreatmentCategory;
  isSelected: boolean;
  onClick: () => void;
}

export const TreatmentCategoryCard: React.FC<TreatmentCategoryCardProps> = ({ category, isSelected, onClick }) => {
  // Dynamically resolve icon names to Lucide icons
  const getIcon = (name: string) => {
    const LucideIcon = (Icons as any)[name];
    if (LucideIcon) {
      return <LucideIcon className={`w-5 h-5 ${isSelected ? 'text-accent' : 'text-primary'}`} />;
    }
    return <Icons.Activity className="w-5 h-5 text-primary" />;
  };

  return (
    <button
      onClick={onClick}
      className={`p-5 rounded-3xl border text-left space-y-3 transition-all duration-300 w-full hover:shadow-md ${
        isSelected
          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/10'
          : 'bg-white border-[#2E7D32]/5 text-text-primary hover:border-primary/20'
      }`}
    >
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isSelected ? 'bg-white/10' : 'bg-primary/5'}`}>
        {getIcon(category.icon)}
      </div>
      
      <div className="space-y-1">
        <h4 className="font-serif text-sm font-bold leading-tight">
          {category.name}
        </h4>
        <p className={`text-[10px] leading-relaxed line-clamp-2 ${isSelected ? 'text-white/80' : 'text-text-secondary'}`}>
          {category.description}
        </p>
      </div>
    </button>
  );
};

export default TreatmentCategoryCard;
