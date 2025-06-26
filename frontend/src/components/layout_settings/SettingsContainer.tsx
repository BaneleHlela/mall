import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

interface SettingsContainerProps {
  name: string;
  options: string[];
  onOptionClick: () => void;
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({ name, onOptionClick }) => {
  return (
    <div 
      className="w-full h-[45px] border border-black rounded-sm bg-black text-white shadow-sm hover:bg-gray-900 hover:scale-101 cursor-pointer"
      onDoubleClick={onOptionClick}
      onClick={onOptionClick}
    >
      <div className="w-full h-full flex justify-between items-center pl-4 pr-2">
        <span>{name}</span>
        <SlOptionsVertical className="text-[130%]" />
      </div>
    </div>
  );
};

export default SettingsContainer;