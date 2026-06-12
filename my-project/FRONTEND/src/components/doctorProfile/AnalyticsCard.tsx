import React from 'react';
import { FiTrendingUp, FiUsers, FiCalendar, FiStar } from 'react-icons/fi';

const AnalyticsCard: React.FC = () => {
  const stats = [
    { label: 'Profile Views', value: '1,245', icon: <FiTrendingUp />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Consultations', value: '458', icon: <FiUsers />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Appt Requests', value: '142', icon: <FiCalendar />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg Rating', value: '4.9', icon: <FiStar />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Analytics Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <h4 className="text-lg font-bold text-gray-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCard;
