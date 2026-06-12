import React, { useState } from 'react';
import { JournalEntryRecord } from '../../types';
import { BookOpen, Smile, Meh, Frown, Sparkles, Send, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecoveryJournalProps {
  entries: JournalEntryRecord[];
  onAddEntry: (entry: { notes: string; mood: 'Great' | 'Good' | 'Neutral' | 'Fatigued'; healthFeedback: string }) => Promise<void>;
}

export const RecoveryJournal: React.FC<RecoveryJournalProps> = ({ entries, onAddEntry }) => {
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState<'Great' | 'Good' | 'Neutral' | 'Fatigued'>('Good');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions = [
    { value: 'Great' as const, label: 'Excellent', icon: Smile, color: 'text-emerald-600 bg-emerald-100 border-emerald-500' },
    { value: 'Good' as const, label: 'Good', icon: Smile, color: 'text-teal-600 bg-teal-100 border-teal-500' },
    { value: 'Neutral' as const, label: 'Neutral', icon: Meh, color: 'text-amber-600 bg-amber-100 border-amber-500' },
    { value: 'Fatigued' as const, label: 'Fatigued', icon: Frown, color: 'text-rose-600 bg-rose-100 border-rose-500' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim() || !feedback.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddEntry({
        notes,
        mood,
        healthFeedback: feedback
      });
      setNotes('');
      setFeedback('');
      setMood('Good');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Journal entry form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 lg:col-span-1 h-fit"
      >
        <div className="flex items-center space-x-3 border-b border-emerald-50 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-700 flex items-center justify-center border border-emerald-500/20 shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-black text-text-primary">Daily Veda Log</h3>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Record your healing state</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mood selection */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Current State of Mind</label>
            <div className="grid grid-cols-2 gap-2">
              {moodOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = mood === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMood(opt.value)}
                    className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
                      isSelected 
                        ? `${opt.color} shadow-sm font-extrabold scale-[1.02]` 
                        : 'border-emerald-950/5 hover:bg-emerald-50/20 hover:border-emerald-500/10 text-text-secondary'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Health Feedback */}
          <div className="space-y-1">
            <label htmlFor="feedback" className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Physical Feedback Summary</label>
            <input
              id="feedback"
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g., Joint stiffness decreased by 50%"
              required
              className="w-full text-xs p-3 rounded-xl border border-emerald-950/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-text-primary placeholder:text-text-secondary/50 font-medium bg-emerald-50/10"
            />
          </div>

          {/* Notes details */}
          <div className="space-y-1">
            <label htmlFor="notes" className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Detailed Journal Notes</label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How do you feel? Describe digestion, energy levels, sleep cycles, pain metrics..."
              required
              className="w-full text-xs p-3 rounded-xl border border-emerald-950/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-text-primary placeholder:text-text-secondary/50 font-medium bg-emerald-50/10 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Log to Health Portal</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Journal logs list */}
      <div className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 lg:col-span-2 flex flex-col justify-between h-[450px]">
        <div className="flex items-center justify-between border-b border-emerald-50 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 text-amber-700 flex items-center justify-center border border-amber-500/20 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-black text-text-primary">Journey History</h3>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Chronicle of your healing logs</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-500/10">
            {entries.length} Entries Recorded
          </span>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-emerald-200">
          <AnimatePresence initial={false}>
            {entries.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                <BookOpen className="w-12 h-12 text-emerald-100" />
                <p className="text-xs font-bold text-text-secondary">No notes written yet. Fill the log to start track!</p>
              </div>
            ) : (
              entries.map((entry) => {
                const opt = moodOptions.find(o => o.value === entry.mood) || moodOptions[1];
                const MoodIcon = opt.icon;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-xl border border-emerald-950/5 hover:border-emerald-600/10 bg-emerald-50/5 hover:bg-emerald-50/10 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-500/10 px-2 py-0.5 rounded-md">
                          {entry.date}
                        </span>
                        <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full border text-[9px] font-bold ${opt.color}`}>
                          <MoodIcon className="w-3 h-3" />
                          <span>{entry.mood}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-[10px] text-text-secondary font-bold">
                        <Activity className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        <span className="truncate max-w-[200px]">{entry.healthFeedback}</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-primary leading-relaxed font-medium bg-white/60 p-3 rounded-lg border border-emerald-950/[0.02]">
                      {entry.notes}
                    </p>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RecoveryJournal;
