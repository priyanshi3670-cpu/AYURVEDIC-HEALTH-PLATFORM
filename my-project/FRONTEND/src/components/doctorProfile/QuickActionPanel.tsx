import React from 'react';
import { FiClock, FiAward, FiEye, FiCalendar } from 'react-icons/fi';

interface QuickActionPanelProps {
  onTabChange: (tab: string) => void;
}

const QuickActionPanel: React.FC<QuickActionPanelProps> = ({ onTabChange }) => {
  const actions = [
    { icon: <FiClock />, label: 'Update Availability', tab: 'availability', color: 'bg-primary/10 text-primary hover:bg-primary hover:text-white' },
    { icon: <FiAward />, label: 'Add Certification', tab: 'certifications', color: 'bg-accent/10 text-accent hover:bg-accent hover:text-white' },
    { icon: <FiEye />, label: 'Preview Profile', tab: 'profile', color: 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white' },
    { icon: <FiCalendar />, label: 'View Appointments', tab: 'availability', color: 'bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => onTabChange(action.tab)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${action.color} border border-transparent hover:shadow-md cursor-pointer`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <span className="text-xs font-semibold text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionPanel;
