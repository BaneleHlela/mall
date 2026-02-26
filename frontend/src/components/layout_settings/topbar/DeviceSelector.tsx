import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceSelectorProps {
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
  currentDevice?: DeviceType;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ setDevice, currentDevice }) => {
  const devices: { id: DeviceType; icon: React.ReactNode; label: string }[] = [
    { id: 'mobile', icon: <Smartphone size={16} />, label: 'Mobile' },
    { id: 'tablet', icon: <Tablet size={16} />, label: 'Tablet' },
    { id: 'desktop', icon: <Monitor size={16} />, label: 'Desktop' },
  ];

  return (
    <div className="flex items-center space-x-[.4vh] bg-white/10 rounded-lg p-[.6vh]">
      {devices.map((device) => (
        <motion.button
          key={device.id}
          onClick={() => setDevice(device.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-[.6vh] px-[1.2vh] py-[.6vh] rounded-md transition-all duration-200 ${
            currentDevice === device.id
              ? 'bg-white text-stone-800 shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          title={device.label}
        >
          {device.icon}
          <span className="text-[1.8vh] font-medium hidden sm:inline">{device.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default DeviceSelector;
