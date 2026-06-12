import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { MilestoneRecord } from '../../types';
import { motion } from 'framer-motion';

interface MilestoneTrackerProps {
  milestones: MilestoneRecord[];
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestones }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Completed' | 'Pending' | 'Upcoming'>('All');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle2;
      case 'Pending': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed': return 'from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-500/20';
      case 'Pending': return 'from-amber-500/10 to-amber-600/10 text-amber-700 border-amber-500/20';
      default: return 'from-gray-50 to-gray-100/50 text-text-secondary border-gray-150';
    }
  };

  const filtered = activeFilter === 'All' 
    ? milestones 
    : milestones.filter(m => m.status === activeFilter);

  const filters: ('All' | 'Completed' | 'Pending' | 'Upcoming')[] = ['All', 'Completed', 'Pending', 'Upcoming'];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <CheckCircle2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">sankalpa milestones</span>
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Treatment Milestones</h3>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-1 rounded-xl flex items-center self-start text-[10px] font-black uppercase tracking-wider overflow-x-auto max-w-full">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === f 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, index) => {
          const IconComp = getStatusIcon(item.status);
          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl flex flex-col justify-between h-36 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0">
                  <h4 className="font-serif font-black text-text-primary text-xs md:text-sm truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed font-semibold line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${getStatusStyle(item.status)} flex items-center justify-center border shadow-inner shrink-0`}>
                  <IconComp className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] font-extrabold uppercase border-t border-gray-100/50 pt-2.5 mt-2.5">
                <span className="text-text-secondary flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Target Date: {item.date}</span>
                </span>
                <span className="text-primary">{item.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MilestoneTracker;
