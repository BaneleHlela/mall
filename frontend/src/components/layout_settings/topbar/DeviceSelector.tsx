import { Monitor, Smartphone, Tablet } from "lucide-react";

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceSelectorProps {
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ setDevice }) => {
  const deviceSizes = [
    { name: 'Mobile', icon: Smartphone, value: 'mobile' as DeviceType },
    { name: 'Tablet', icon: Tablet, value: 'tablet' as DeviceType },
    { name: 'Desktop', icon: Monitor, value: 'desktop' as DeviceType },
  ];

  return (
    <div className="h-full w-auto flex justify-center items-center">
      <div className="device-selector flex gap-2">
        {deviceSizes.map(({ name, icon: IconComponent, value }) => (
          <button
            key={name}
            onClick={() => setDevice(value)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded flex items-center gap-2"
          >
            <IconComponent className="h-5 w-5" />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeviceSelector;
