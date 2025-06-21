import { CiMobile4, CiDesktop } from "react-icons/ci";
import { PiDeviceTabletSpeakerLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion"; // make sure this is installed
import { useState } from "react";
import React from "react";

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceSelectorProps {
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ setDevice }) => {
  const deviceSizes = [
    { name: 'Mobile', icon: CiMobile4, value: 'mobile' as DeviceType },
    { name: 'Tablet', icon: PiDeviceTabletSpeakerLight, value: 'tablet' as DeviceType },
    { name: 'Desktop', icon: CiDesktop, value: 'desktop' as DeviceType },
  ];

  const [selected, setSelected] = useState<DeviceType>('mobile');

  return (
    <div className="h-full w-auto flex justify-center items-center">
      <div className="h-full flex gap-1 relative">
      {deviceSizes.map(({ name, icon: IconComponent, value }, index) => (
          <React.Fragment key={name}>
            <motion.button
              onClick={() => {
                setDevice(value);
                setSelected(value);
              }}
              className="relative w-[75px] px-2 py-2 h-full flex items-center justify-center cursor-pointer"
              initial={false}
              animate={{
                backgroundColor: value === selected ? "" : "transparent", // tailwind gray-200
                scale: value === selected ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <IconComponent className={`h-[45%] w-[45%] ${value === selected ? "h-[50%] w-[50%]" : ""}`} />

              {value === selected && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[.5px] bg-gray-900"
                />
              )}
            </motion.button>

            {/* Add vertical line between buttons */}
            {index < deviceSizes.length - 1 && (
              <div className="h-[50%] w-[.5px] bg-gray-300 self-center"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DeviceSelector;
