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
    <div className="relative w-full">
      <div
        className="w-full h-[7vh] text-[1.8vh] bg-stone-50 border-[.3vh] border-white text-gray-900 rounded p-[.6vh] shadow-md hover:scale-103 hover:bg-gray-900 hover:text-white hover:border-white"
      >
        <div className="w-full h-full flex justify-between items-center pl-2">
          <span onClick={onClick} className="cursor-pointer">{name}</span>
          <div className="flex flex-row space-x-1">
            {deletable && (
              <div 
                onClick={onDeleteClick}
                className="flex flex-col justify-center hover:scale:150 cursor-pointer"
              >
                <FiTrash className="text-red-600 text-[2vh]" />
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
