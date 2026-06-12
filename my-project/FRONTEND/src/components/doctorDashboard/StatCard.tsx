import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp, colorClass }) => {
  return (
    <div className={`bg-white rounded-2xl p-5 border-l-4 shadow-sm hover:shadow-md transition-shadow ${colorClass}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gray-50 text-gray-600`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
