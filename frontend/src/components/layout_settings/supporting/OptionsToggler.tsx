import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

type OptionsTogglerProps = {
  label?: string;
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
};

const OptionsToggler: React.FC<OptionsTogglerProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const currentIndex = options.indexOf(value);
  const index = currentIndex >= 0 ? currentIndex : 0;
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for back

  const handleToggle = (dir: number) => {
    setDirection(dir);
    const newIndex = (index + dir + options.length) % options.length;
    onChange(options[newIndex]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-[3vh] text-[1.8vh]">
        <div className="w-[50%] flex flex-row justify-between items-center">
            {label && <label className="text-start">{label}</label>}
            <p className="mr-1">:</p>
        </div>
      
      <div className="w-[50%] flex flex-row justify-center items-center capitalize">
        <div className="flex flex-row justify-between w-[100%] items-center relative overflow-hidden h-[3vh]">
          {/* Back Arrow Button */}
          <button
            type="button"
            onClick={() => handleToggle(-1)}
            className="flex items-center justify-center"
          >
            <IoIosArrowBack />
          </button>
  
          {/* Options Div */}
          <div className=" h-[3vh] flex flex-col items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.span
                key={value}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className=" w-full h-full text-center"
              >
                {options[index]}
              </motion.span>
            </AnimatePresence>
          </div>
  
          {/* Forward Arrow Button */}
          <button
            type="button"
            onClick={() => handleToggle(1)}
            className="flex items-center justify-center"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsToggler;
