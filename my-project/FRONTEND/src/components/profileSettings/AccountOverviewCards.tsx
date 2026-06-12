import React from 'react';
import { FiCalendar, FiHeart, FiFileText, FiActivity } from 'react-icons/fi';
import { AccountOverview } from '../../types';

interface AccountOverviewCardsProps {
  overview: AccountOverview;
}

const AccountOverviewCards: React.FC<AccountOverviewCardsProps> = ({ overview }) => {
  const cards = [
    {
      label: 'Appointments',
      value: overview.appointments,
      icon: <FiCalendar className="w-6 h-6 text-primary" />,
      bg: 'bg-green-50',
      border: 'border-green-100'
    },
    {
      label: 'Saved Treatments',
      value: overview.savedTreatments,
      icon: <FiHeart className="w-6 h-6 text-orange-500" />,
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    },
    {
      label: 'Medical Records',
      value: overview.medicalRecords,
      icon: <FiFileText className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      label: 'Recovery Plans',
      value: overview.recoveryPlans,
      icon: <FiActivity className="w-6 h-6 text-purple-500" />,
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`p-4 rounded-xl border ${card.bg} ${card.border} transition-transform hover:-translate-y-1 duration-300`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              {card.icon}
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          <p className="text-sm font-medium text-gray-600 mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AccountOverviewCards;
