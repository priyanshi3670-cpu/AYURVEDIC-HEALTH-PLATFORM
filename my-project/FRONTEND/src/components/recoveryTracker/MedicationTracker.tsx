import React, { useState } from 'react';
import { Pill, Check, Bell, BellOff, Loader2 } from 'lucide-react';
import { MedicationRecord } from '../../types';
import { motion } from 'framer-motion';

interface MedicationTrackerProps {
  medications: MedicationRecord[];
  onToggleMed: (id: string) => void;
}

export const MedicationTracker: React.FC<MedicationTrackerProps> = ({
  medications,
  onToggleMed
}) => {
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  const handleToggle = async (id: string) => {
    setLoadingIds(prev => ({ ...prev, [id]: true }));
    try {
      await onToggleMed(id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIds(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Pill className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Aushadh daily schedule</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Medication & Herbs Log</h3>
        </div>
      </div>

      {/* Herbs list */}
      <div className="space-y-3">
        {medications.map((med) => {
          const isLoading = loadingIds[med.id];
          return (
            <div
              key={med.id}
              className={`border rounded-2xl p-4.5 flex items-center justify-between gap-4 transition-all duration-300 shadow-sm ${
                med.completed 
                  ? 'bg-emerald-500/[0.02] border-emerald-500/20' 
                  : 'bg-[#FAF9F6] border-primary/5 hover:border-primary/20'
              }`}
            >
              {/* Checkbox and text */}
              <div className="flex items-start space-x-3.5 min-w-0">
                <button
                  onClick={() => handleToggle(med.id)}
                  disabled={isLoading}
                  className={`w-5.5 h-5.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 ${
                    med.completed
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-gray-250 hover:border-primary/45'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                  ) : med.completed ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : null}
                </button>

                <div className="min-w-0 space-y-0.5 text-xs text-text-primary">
                  <h4 className={`font-serif font-bold leading-tight ${med.completed ? 'line-through text-text-secondary/60' : ''}`}>
                    {med.name}
                  </h4>
                  <p className="text-[10px] text-text-secondary font-semibold">
                    Dosage: <strong className="text-primary">{med.dosage}</strong> • Frequency: {med.frequency}
                  </p>
                </div>
              </div>

              {/* Reminder active bell */}
              <div className={`p-2 rounded-xl border shrink-0 text-xs ${
                med.reminderActive 
                  ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' 
                  : 'bg-white text-text-secondary border-gray-100'
              }`}>
                {med.reminderActive ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MedicationTracker;
