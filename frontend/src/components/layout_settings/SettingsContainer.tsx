import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { motion } from "framer-motion";

interface SettingsContainerProps {
  name: string;
  options: string[];
  SettingsComponent: React.ReactNode;
  onOptionClick?: (option: string) => void;
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({
  name,
  options,
  SettingsComponent,
  onOptionClick,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
        <div 
            onClick={() => setIsSettingsOpen(prev => !prev)}
            className="w-full h-[45px]"
        >
        {/* Header */}
        <div
            className={`flex flex-row justify-between w-full h-full border border-black text-white shadow-sm pl-2 bg-black 
            ${isSettingsOpen ? 'rounded-t-sm' : 'rounded-sm'} hover:bg-gray-900`}
        >
            <div className="flex flex-col justify-center text-[18px]">
            {name}
            </div>
            <div className="flex flex-row justify-between">
            <motion.div
                className="flex flex-col justify-center cursor-pointer"
                onClick={() => setIsSettingsOpen(prev => !prev)}
                animate={{ rotate: isSettingsOpen ? 180 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <IoSettings className="text-[130%]" onClick={() => setIsSettingsOpen(prev => !prev)}/>
            </motion.div>

            <div className="flex flex-col justify-center ml-1 relative">
                <HiOutlineDotsVertical
                className="text-[135%] cursor-pointer"
                onClick={() => setIsDropdownOpen(prev => !prev)}
                />
                {isDropdownOpen && (
                <motion.div
                    className="absolute top-[110%] right-0 bg-white border border-black rounded shadow-md w-[120px] z-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <ul className="flex flex-col">
                    {options.map((option) => (
                        <li
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                        onClick={() => {
                            setIsDropdownOpen(false);
                            onOptionClick?.(option);
                        }}
                        >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                        </li>
                    ))}
                    </ul>
                </motion.div>
                )}
            </div>
            </div>
        </div>
        </div>
        {/* Sliding Settings Component */}
        <motion.div
            className={`w-full border border-black rounded-b-sm shadow-md  overflow-hidden -mt-1 max-h-[480px] overflow-y-scroll hide-scrollbar`} 
            initial={{ height: 0, opacity: 0 }}
            animate={{
                height: isSettingsOpen ? "auto" : 0,
                opacity: isSettingsOpen ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            >
            {SettingsComponent}
        </motion.div>
        
    </>
  );
};

export default SettingsContainer;
