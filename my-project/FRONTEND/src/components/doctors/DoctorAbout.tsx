import React from 'react';
import { BookOpen, Award, CheckCircle } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorAboutProps {
  doctor: Doctor;
}

export const DoctorAbout: React.FC<DoctorAboutProps> = ({ doctor }) => {
  // Generate a dynamic treatment philosophy based on specialization
  const getTreatmentPhilosophy = (spec: string) => {
    if (spec.toLowerCase().includes('skin')) {
      return 'True skin health begins within. By detoxifying blood channels and restoring Agni, we allow your skin to radiate its natural Ayurvedic wellness without chemical dependence.';
    }
    if (spec.toLowerCase().includes('joint') || spec.toLowerCase().includes('ortho')) {
      return 'Joint stiffness represents Vata accumulation and blocked Prana flows. Through deep tissue lubrication, herbal heat poultices, and Marma stimulation, we rebuild joint strength naturally.';
    }
    if (spec.toLowerCase().includes('metabolic') || spec.toLowerCase().includes('diabetes')) {
      return 'Metabolic health depends on digestive fire (Agni). By clearing Ama toxins and providing direct herbal pancreatic support, we guide the system back to balanced glucose utilization.';
    }
    return 'Ayurvedic healing targets the root dosha imbalance rather than suppressing symptoms. Through tailored dietary regimens, herbal therapies, and conscious habits, we restore the body\'s innate intelligence.';
  };

  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Biography */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold text-primary flex items-center space-x-2.5">
          <BookOpen className="w-5 h-5 text-accent shrink-0" />
          <span>Biography</span>
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed font-medium">
          {doctor.about}
        </p>
      </div>

      {/* Philosophy */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <h3 className="font-serif text-lg font-bold text-primary flex items-center space-x-2.5">
          <Award className="w-5 h-5 text-accent shrink-0" />
          <span>Treatment Philosophy</span>
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed font-medium italic">
          "{getTreatmentPhilosophy(doctor.specialization)}"
        </p>
      </div>

      {/* Special Expertise Tags */}
      <div className="space-y-3.5 pt-4 border-t border-gray-100">
        <h3 className="font-serif text-sm font-bold text-primary">Special Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {doctor.specialExpertise.map((exp, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold bg-[#2E7D32]/5 text-primary border border-primary/10 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5"
            >
              <CheckCircle className="w-3 h-3 text-accent shrink-0" />
              <span>{exp}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAbout;
