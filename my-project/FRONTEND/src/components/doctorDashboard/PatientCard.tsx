import React from 'react';
import { DoctorPatientModel } from '../../types';

interface PatientCardProps {
  patient: DoctorPatientModel;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recovering': return 'bg-green-100 text-green-700';
      case 'Active': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
          {patient.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{patient.name}</h4>
          <p className="text-xs text-gray-500">
            {patient.age} yrs • {patient.gender} • {patient.condition}
          </p>
        </div>
      </div>
      
      <div className="hidden md:block w-32">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium">{patient.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${patient.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
        <button className="text-primary hover:underline text-sm font-medium">
          View
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
