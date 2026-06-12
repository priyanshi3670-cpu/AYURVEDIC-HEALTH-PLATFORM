import React from 'react';
import { Star, CheckCircle, Scale, XCircle } from 'lucide-react';
import { Clinic } from '../../types';

interface ClinicComparisonProps {
  clinics: Clinic[];
  compareIds: string[];
  onRemoveCompare: (id: string) => void;
}

export const ClinicComparison: React.FC<ClinicComparisonProps> = ({
  clinics,
  compareIds,
  onRemoveCompare
}) => {
  const selectedClinics = clinics.filter(c => compareIds.includes(c.id));

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-primary flex items-center space-x-2">
            <Scale className="w-5 h-5 text-accent shrink-0" />
            <span>Clinic Comparison Tool</span>
          </h3>
          <p className="text-[11px] text-text-secondary">
            Toggle checkboxes next to clinics in the grid directory above to contrast them side-by-side (max 3).
          </p>
        </div>

        {compareIds.length > 0 && (
          <div className="flex flex-wrap gap-2 text-[10px] font-bold">
            {selectedClinics.map(c => (
              <button
                key={c.id}
                onClick={() => onRemoveCompare(c.id)}
                className="bg-[#2E7D32]/5 border border-primary/15 text-primary py-1 px-3 rounded-full flex items-center space-x-1.5 hover:bg-red-500/10 hover:border-red-500/25 hover:text-red-700 transition-colors"
              >
                <span>{c.name}</span>
                <XCircle className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedClinics.length > 0 ? (
        <div className="overflow-x-auto border border-[#2E7D32]/10 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs font-medium">
            <thead>
              <tr className="bg-[#F8FFF8] border-b border-[#2E7D32]/10">
                <th className="p-4 font-bold text-primary w-1/4">Comparison Metric</th>
                {selectedClinics.map(c => (
                  <th key={c.id} className="p-4 font-serif text-sm font-bold text-primary border-l border-[#2E7D32]/10 w-1/4">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Type */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Type</td>
                {selectedClinics.map(c => (
                  <td key={c.id} className="p-4 border-l border-gray-100 text-primary">
                    {c.type}
                  </td>
                ))}
              </tr>
              {/* Rating */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Patient Rating</td>
                {selectedClinics.map(c => (
                  <td key={c.id} className="p-4 border-l border-gray-100">
                    <div className="flex items-center space-x-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span>{c.rating}</span>
                      <span className="text-[10px] text-text-secondary">({c.reviewCount} reviews)</span>
                    </div>
                  </td>
                ))}
              </tr>
              {/* Experience */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Years Established</td>
                {selectedClinics.map(c => (
                  <td key={c.id} className="p-4 border-l border-gray-100 text-primary">
                    {c.yearsEstablished} Years of Service
                  </td>
                ))}
              </tr>
              {/* Doctors */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Specialist Doctors Count</td>
                {selectedClinics.map(c => (
                  <td key={c.id} className="p-4 border-l border-gray-100">
                    {c.doctorsCount} In-house Vaidyas
                  </td>
                ))}
              </tr>
              {/* Services */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Services Provided</td>
                {selectedClinics.map(c => (
                  <td key={c.id} className="p-4 border-l border-gray-100 space-y-1">
                    {c.services.map((s, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-[10px] leading-relaxed">
                        <CheckCircle className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
              {/* Facilities */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Amenities & Facilities</td>
                {selectedClinics.map(c => (
                  <td key={c.id} className="p-4 border-l border-gray-100 space-y-1">
                    {c.facilities.map((f, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-[10px] leading-relaxed">
                        <CheckCircle className="w-3 h-3 text-secondary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xs text-text-secondary italic text-center py-8 bg-[#FAF9F6] border rounded-2xl border-dashed">
          Toggle clinic compare buttons in the cards above to compare details side-by-side.
        </p>
      )}
    </section>
  );
};

export default ClinicComparison;
