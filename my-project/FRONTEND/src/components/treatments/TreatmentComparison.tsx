import React, { useState, useMemo } from 'react';
import { Star, CheckCircle, Scale } from 'lucide-react';
import { Treatment } from '../../types';

interface TreatmentComparisonProps {
  treatments: Treatment[];
}

export const TreatmentComparison: React.FC<TreatmentComparisonProps> = ({ treatments }) => {
  // Select up to 3 treatments to compare. By default, select trt-1 (Panchakarma), trt-8 (Shirodhara), trt-7 (Abhyanga)
  const defaultSelection = useMemo(() => {
    return treatments.filter(t => ['trt-1', 'trt-8', 'trt-7'].includes(t.id)).map(t => t.id);
  }, [treatments]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Initialize selection once treatments are loaded
  React.useEffect(() => {
    if (defaultSelection.length > 0 && selectedIds.length === 0) {
      setSelectedIds(defaultSelection);
    }
  }, [defaultSelection, selectedIds]);

  const selectedTreatments = useMemo(() => {
    return treatments.filter(t => selectedIds.includes(t.id));
  }, [treatments, selectedIds]);

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      // Keep at least 1 selected
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(x => x !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Swap first item if maximum 3 items selected
        setSelectedIds([...selectedIds.slice(1), id]);
      }
    }
  };

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-primary flex items-center space-x-2">
            <Scale className="w-5 h-5 text-accent shrink-0" />
            <span>Therapy Comparison Tool</span>
          </h3>
          <p className="text-[11px] text-text-secondary">Select up to 3 treatments below to compare specifications side-by-side.</p>
        </div>

        {/* Checkbox Selector Group */}
        <div className="flex flex-wrap gap-2">
          {treatments.slice(0, 8).map((t) => {
            const isChecked = selectedIds.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleToggle(t.id)}
                className={`py-1.5 px-3 rounded-full text-[10px] font-bold border transition-colors ${
                  isChecked
                    ? 'bg-primary border-primary text-white'
                    : 'bg-[#FAF9F6] border-gray-150 text-text-secondary hover:border-primary/20'
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid Table */}
      {selectedTreatments.length > 0 ? (
        <div className="overflow-x-auto border border-[#2E7D32]/10 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FFF8] border-b border-[#2E7D32]/10">
                <th className="p-4 font-bold text-primary w-1/4">Metric</th>
                {selectedTreatments.map((t) => (
                  <th key={t.id} className="p-4 font-serif text-sm font-bold text-primary border-l border-[#2E7D32]/10 w-1/4">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {/* Category */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Category</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="p-4 border-l border-gray-100 text-primary">
                    {t.category}
                  </td>
                ))}
              </tr>
              {/* Duration */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Session / Course Duration</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="p-4 border-l border-gray-100">
                    {t.duration}
                  </td>
                ))}
              </tr>
              {/* Recovery */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Recovery Time</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="p-4 border-l border-gray-100">
                    {t.recoveryTime}
                  </td>
                ))}
              </tr>
              {/* Cost */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Estimated Cost</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="p-4 border-l border-gray-100 font-black text-primary">
                    ₹{t.costEstimate.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
              {/* Rating */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Success Rating</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="p-4 border-l border-gray-100">
                    <div className="flex items-center space-x-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span>{t.rating}</span>
                      <span className="text-[10px] text-text-secondary">({t.reviewCount} reviews)</span>
                    </div>
                  </td>
                ))}
              </tr>
              {/* Benefits */}
              <tr>
                <td className="p-4 text-text-secondary font-bold">Key Benefits</td>
                {selectedTreatments.map((t) => (
                  <td key={t.id} className="p-4 border-l border-gray-100 space-y-1">
                    {t.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-[10px] leading-relaxed">
                        <CheckCircle className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xs text-text-secondary italic text-center py-6 bg-[#FAF9F6] border rounded-2xl">
          Select therapies from the choices above to begin side-by-side details comparison.
        </p>
      )}
    </section>
  );
};

export default TreatmentComparison;
