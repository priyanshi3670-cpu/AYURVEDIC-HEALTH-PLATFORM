import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, UserSearch, Library, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickActionPanelProps {
  onOpenChat: () => void;
}

export const QuickActionPanel: React.FC<QuickActionPanelProps> = ({ onOpenChat }) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: 'Book Appointment',
      desc: 'Schedule consultations with BAMS specialists.',
      icon: Calendar,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-500/20',
      action: () => navigate('/doctors')
    },
    {
      id: 2,
      title: 'Find Doctors',
      desc: 'Search in-house Ayurvedic physicians directory.',
      icon: UserSearch,
      color: 'from-amber-500/10 to-yellow-500/10 text-amber-700 border-amber-500/20',
      action: () => navigate('/doctors')
    },
    {
      id: 3,
      title: 'Treatment Discovery',
      desc: 'Discover classical Panchakarma remedies library.',
      icon: Library,
      color: 'from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-500/20',
      action: () => navigate('/treatments')
    },
    {
      id: 4,
      title: 'Vaidya AI assistant',
      desc: 'Talk with our custom-trained health intelligence.',
      icon: BrainCircuit,
      color: 'from-purple-500/10 to-indigo-500/10 text-purple-700 border-purple-500/20',
      action: onOpenChat
    }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">one-click shortcuts</span>
        <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Patient Quick Actions</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act) => {
          const IconComp = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.action}
              className="p-5 bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 rounded-2xl flex flex-col justify-between text-left h-40 transition-all shadow-sm hover:shadow-md hover:bg-white cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${act.color} flex items-center justify-center border shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                <IconComp className="w-5 h-5" />
              </div>

              <div className="space-y-1 mt-4">
                <h4 className="font-serif font-bold text-text-primary text-[13px] leading-tight block group-hover:text-primary transition-colors">
                  {act.title}
                </h4>
                <p className="text-[10px] text-text-secondary leading-normal font-semibold">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActionPanel;
