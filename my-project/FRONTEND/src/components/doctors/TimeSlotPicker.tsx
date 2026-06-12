import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotPickerProps {
  slots: string[];
  selectedSlot: string | null;
  onSlotSelect: (slot: string) => void;
  loading: boolean;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ slots, selectedSlot, onSlotSelect, loading }) => {
  return (
    <div className="space-y-2.5">
      <label className="text-[10px] uppercase font-bold text-text-secondary flex items-center space-x-1.5">
        <Clock className="w-3.5 h-3.5 text-accent" />
        <span>Available Time Slots</span>
      </label>

      {loading ? (
        <div className="flex justify-center items-center py-6 bg-[#FAF9F6] border border-[#2E7D32]/5 rounded-2xl">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-4 px-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
          <span className="text-[10px] text-amber-600 font-bold">
            No consultations are scheduled on this date. Please select another day.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {slots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                type="button"
                key={slot}
                onClick={() => onSlotSelect(slot)}
                className={`py-2 px-1.5 rounded-xl text-center text-[10px] font-bold border transition-all duration-300 ${
                  isSelected
                    ? 'bg-accent border-accent text-primary shadow-md shadow-accent/15 scale-102 font-black'
                    : 'bg-white border-[#2E7D32]/10 text-text-secondary hover:border-primary hover:bg-[#FAF9F6]'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
