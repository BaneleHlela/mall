import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { FiTrash } from "react-icons/fi";

interface FirstOrderSubSettingsContainerProps {
  name: string;
  onClick?: () => void;
  deletable?: boolean; 
  onDeleteClick?: () => void;
}

const FirstOrderSubSettingsContainer: React.FC<FirstOrderSubSettingsContainerProps> = ({
  name,
  onClick,
  deletable= false,
  onDeleteClick
}) => {


  return (
    <div className="relative">
      <div
        className="w-full h-[45px] bg-stone-50 border-2 border-white text-black rounded p-2 shadow-md hover:scale-103 hover:opacity-85 "
      >
        <div className="w-full h-full flex justify-between items-center pl-2">
          <span onClick={onClick} className="cursor-pointer">{name}</span>
          <div className="flex flex-row space-x-1">
            {deletable && (
              <div 
                onClick={onDeleteClick}
                className="flex flex-col justify-center hover:scale:150 cursor-pointer"
              >
                <FiTrash size={18} className="text-red-600" />
              </div>
            )}
            
            <motion.div
              className="text-[150%] cursor-pointer"
              transition={{ duration: 0.3 }}
              onClick={onClick}
            >
              <IoIosArrowForward />
            </motion.div>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default FirstOrderSubSettingsContainer;
