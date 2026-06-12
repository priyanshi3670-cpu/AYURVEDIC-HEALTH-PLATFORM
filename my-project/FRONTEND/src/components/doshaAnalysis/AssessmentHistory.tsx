import React from 'react';
import { Calendar, Award, BarChart2, ShieldCheck } from 'lucide-react';
import { AssessmentHistory as HistoryRecord } from '../../types';
import { motion } from 'framer-motion';

interface AssessmentHistoryProps {
  history: HistoryRecord[];
  onSelectResult: (id: string) => void;
}

export const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({ history, onSelectResult }) => {
  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Calendar className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">historical assessments</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Prakriti Assessment History</h3>
        </div>
      </div>

      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-8 text-xs text-text-secondary font-bold">
            No previous assessments found. Fill the quiz to record your first database entry!
          </div>
        ) : (
          history.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#FAF9F6] border border-primary/5 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-primary/20 transition-all cursor-pointer"
              onClick={() => onSelectResult(record.id)}
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
                  <Award className="w-4.5 h-4.5 text-accent" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4 className="font-serif font-black text-xs text-text-primary">
                    Dominant: {record.dominantDosha}
                  </h4>
                  <p className="text-[10px] text-text-secondary font-semibold">
                    Vata: <strong className="text-sky-600">{record.vata}%</strong> • Pitta: <strong className="text-orange-600">{record.pitta}%</strong> • Kapha: <strong className="text-emerald-650">{record.kapha}%</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 self-start sm:self-center shrink-0">
                <span className="text-[9px] uppercase font-black text-text-secondary flex items-center bg-white border border-gray-150 px-2.5 py-1.5 rounded-lg shadow-sm">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-accent shrink-0" />
                  <span>{record.date}</span>
                </span>
                
                <span className="text-[9px] uppercase font-black text-emerald-800 bg-emerald-50 border border-emerald-500/10 px-2.5 py-1.5 rounded-lg shadow-sm flex items-center">
                  <BarChart2 className="w-3.5 h-3.5 mr-1" />
                  <span>View Details</span>
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default AssessmentHistory;
