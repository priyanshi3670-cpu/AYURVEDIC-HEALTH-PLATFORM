import React from 'react';
import { DoctorConsultationSettings } from '../../types';

interface ConsultationSettingsProps {
  settings: DoctorConsultationSettings;
}

const ConsultationSettings: React.FC<ConsultationSettingsProps> = ({ settings }) => {
  const settingsList = [
    { id: 'onlineConsultation', label: 'Online Consultations', desc: 'Accept patients worldwide via platform', enabled: settings.onlineConsultation },
    { id: 'videoConsultation', label: 'Video Call Support', desc: 'Enable video for online consults', enabled: settings.videoConsultation },
    { id: 'clinicConsultation', label: 'In-Clinic Consultations', desc: 'Accept physical appointments', enabled: settings.clinicConsultation },
    { id: 'homeVisit', label: 'Home Visits', desc: 'Provide Ayurvedic care at patient home', enabled: settings.homeVisit },
    { id: 'emergencyConsultation', label: 'Emergency Consultations', desc: 'Available for urgent off-hour care', enabled: settings.emergencyConsultation },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Consultation Types</h3>
      
      <div className="space-y-4">
        {settingsList.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div>
              <p className="font-medium text-gray-900 text-sm">{setting.label}</p>
              <p className="text-xs text-gray-500">{setting.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationSettings;
