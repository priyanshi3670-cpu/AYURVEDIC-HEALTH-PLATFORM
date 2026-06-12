import React from 'react';
import { DoctorPerformanceMetric } from '../../types';

const PerformanceCard: React.FC = () => {
  const metrics: DoctorPerformanceMetric[] = [
    { label: 'Patient Satisfaction', value: '4.9/5', trend: 'up', percentage: 2.5 },
    { label: 'Recovery Success', value: '92%', trend: 'up', percentage: 4.1 },
    { label: 'Response Time', value: '1.2 hrs', trend: 'down', percentage: 15 }, // down is good for response time
    { label: 'Consultation completion', value: '98%', trend: 'neutral', percentage: 0 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Performance Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
            <h4 className="text-xl font-bold text-gray-900">{metric.value}</h4>
            {metric.percentage !== 0 && (
              <p className={`text-[10px] font-medium mt-1 ${metric.trend === 'up' || (metric.label === 'Response Time' && metric.trend === 'down') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend === 'up' ? '↑' : '↓'} {metric.percentage}% vs last month
              </p>
            )}
            {metric.percentage === 0 && (
              <p className="text-[10px] font-medium mt-1 text-gray-400">
                - No change
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceCard;
