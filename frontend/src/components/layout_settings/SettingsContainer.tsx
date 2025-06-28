import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { TbReplace } from "react-icons/tb";
import { IoColorPaletteOutline } from "react-icons/io5";


interface SettingsContainerProps {
  name: string;
  options: string[];
  onClick: () => void;
  onOptionClick: (option: string) => void;
  onReplaceClick?: () => void;
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({ name, options, onClick, onOptionClick, onReplaceClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onOptionClick(option);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <div 
        className="w-full h-[45px] border border-black rounded-sm bg-black text-white shadow-sm hover:bg-gray-900 hover:scale-101 cursor-pointer"
        
        //onClick={onClick}
      >
        <div className="w-full h-full flex justify-between items-center pl-4 pr-2">
          <span
            onDoubleClick={onClick}
          >{name}</span>
          <div className="space-x-2">
            <button 
              className="text-[135%] cursor-pointer"
            >
              <IoColorPaletteOutline
                onDoubleClick={onClick}
              />
            </button>
            <button 
              className="text-[130%] cursor-pointer"
            >
              <TbReplace
                onDoubleClick={onReplaceClick}
              />
            </button>
          </div>
        </div>
      </div>
      {showOptions && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <div 
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={(e) => handleOptionClick(option, e)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsContainer;