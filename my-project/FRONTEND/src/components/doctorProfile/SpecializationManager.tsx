import React, { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';

interface SpecializationManagerProps {
  specializations: string[];
  onUpdate: (specializations: string[]) => void;
}

const SpecializationManager: React.FC<SpecializationManagerProps> = ({ specializations, onUpdate }) => {
  const [newSpec, setNewSpec] = useState('');

  const handleAdd = () => {
    if (newSpec.trim() && !specializations.includes(newSpec.trim())) {
      onUpdate([...specializations, newSpec.trim()]);
      setNewSpec('');
    }
  };

  const handleRemove = (specToRemove: string) => {
    onUpdate(specializations.filter(spec => spec !== specToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const popularSpecializations = [
    'Panchakarma', 'Skin Disorders', 'Digestive Disorders', 
    'Stress Management', 'PCOS Care', 'Diabetes Management', 'Arthritis'
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Specializations & Expertise</h3>
      <p className="text-sm text-gray-500 mb-6">Add areas of your medical expertise to help patients find you.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {specializations.map((spec, index) => (
          <span 
            key={index} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary font-medium text-sm rounded-lg"
          >
            {spec}
            <button 
              onClick={() => handleRemove(spec)}
              className="w-4 h-4 rounded-full hover:bg-primary/20 flex items-center justify-center transition-colors"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <input 
          type="text" 
          value={newSpec}
          onChange={(e) => setNewSpec(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Hair Fall Treatment"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <button 
          onClick={handleAdd}
          className="px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Add
        </button>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">Suggested Specializations</p>
        <div className="flex flex-wrap gap-2">
          {popularSpecializations.filter(s => !specializations.includes(s)).map((spec, i) => (
            <button 
              key={i}
              onClick={() => onUpdate([...specializations, spec])}
              className="px-3 py-1 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              + {spec}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecializationManager;
