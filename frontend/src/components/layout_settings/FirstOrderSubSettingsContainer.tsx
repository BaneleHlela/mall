import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

interface FirstOrderSubSettingsContainerProps {
  name: string;
  onClick?: () => void;
}

const FirstOrderSubSettingsContainer: React.FC<FirstOrderSubSettingsContainerProps> = ({
  name,
  onClick,
}) => {


  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="w-full h-[45px] border border-black rounded-sm shadow-md bg-black text-white hover:bg-gray-900 cursor-pointer"
      >
        <div className="w-full h-full flex justify-between items-center pl-4 pr-2">
          <span >{name}</span>
          <motion.div
            className="text-[150%] cursor-pointer"
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowForward />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FirstOrderSubSettingsContainer;
