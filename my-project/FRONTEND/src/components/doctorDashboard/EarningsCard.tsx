import React from 'react';
import { DoctorEarningsModel } from '../../types';

interface EarningsCardProps {
  earnings: DoctorEarningsModel[];
}

const EarningsCard: React.FC<EarningsCardProps> = ({ earnings }) => {
  const currentMonth = earnings[earnings.length - 1];

  return (
    <div className="bg-gradient-to-br from-primary to-emerald-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white opacity-10"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-1">Monthly Earnings ({currentMonth.month})</p>
            <h3 className="text-4xl font-bold">₹{currentMonth.netIncome.toLocaleString()}</h3>
          </div>
          <div className="px-3 py-1 bg-white/20 rounded-lg text-sm backdrop-blur-sm">
            +12.5% ↑
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div>
            <p className="text-primary-100 text-xs mb-1">Total Appointments</p>
            <p className="font-semibold text-lg">{currentMonth.appointments}</p>
          </div>
          <div>
            <p className="text-primary-100 text-xs mb-1">Platform Commission</p>
            <p className="font-semibold text-lg">₹{currentMonth.commission.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;
