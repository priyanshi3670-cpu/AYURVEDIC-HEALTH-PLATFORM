import React from 'react';
import { FiMonitor, FiSmartphone, FiTablet, FiLogOut } from 'react-icons/fi';
import { ActiveDevice } from '../../types';

interface DeviceCardProps {
  device: ActiveDevice;
  onLogout: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onLogout }) => {
  const getDeviceIcon = () => {
    const name = device.deviceName.toLowerCase();
    if (name.includes('iphone') || name.includes('phone') || name.includes('mobile')) return <FiSmartphone className="w-6 h-6 text-gray-600" />;
    if (name.includes('ipad') || name.includes('tablet')) return <FiTablet className="w-6 h-6 text-gray-600" />;
    return <FiMonitor className="w-6 h-6 text-gray-600" />;
  };

  return (
    <div className={`p-4 rounded-xl border ${device.isCurrent ? 'border-primary/30 bg-primary/5' : 'border-gray-100 bg-white'} flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${device.isCurrent ? 'bg-primary/10' : 'bg-gray-50'}`}>
          {getDeviceIcon()}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            {device.deviceName}
            {device.isCurrent && (
              <span className="text-[10px] uppercase tracking-wider font-bold bg-primary text-white px-2 py-0.5 rounded-full">
                Current
              </span>
            )}
          </h4>
          <p className="text-sm text-gray-500 mt-0.5">
            {device.browser} • {device.location}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {device.lastActive}
          </p>
        </div>
      </div>
      {!device.isCurrent && (
        <button 
          onClick={() => onLogout(device.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Logout from this device"
        >
          <FiLogOut className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default DeviceCard;
