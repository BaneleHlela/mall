import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../../app/hooks";

type OptionsTogglerProps = {
  label?: string;
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
  showColorSwatches?: boolean;
  showFontPreview?: boolean;
};

// Color name to hex mapping for display (fallback colors)
const colorMap: Record<string, string> = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#ec4899",
  quad: "#14b8a6",
  pent: "#f59e0b",
  transparent: "transparent",
};

const OptionsToggler: React.FC<OptionsTogglerProps> = ({
  label,
  options,
  value,
  onChange,
  showColorSwatches = false,
  showFontPreview = false,
}) => {
  const currentIndex = options.indexOf(value);
  const index = currentIndex >= 0 ? currentIndex : 0;
  const [direction, setDirection] = useState(0);
  
  // Get colors from Redux store
  const storeColors = useAppSelector((state) => state.layoutSettings.colors);

  // Get the actual color value based on option name
  const getColorValue = (option: string): string => {
    if (storeColors && storeColors[option as keyof typeof storeColors]) {
      return storeColors[option as keyof typeof storeColors];
    }
    return colorMap[option] || "#000000";
  };

  const handleToggle = (dir: number) => {
    setDirection(dir);
    const newIndex = (index + dir + options.length) % options.length;
    onChange(options[newIndex]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0,
    }),
  };

  // Check if current option is a color option
  const isColorOption = (option: string): boolean => {
    return ["primary", "secondary", "accent", "quad", "pent", "transparent"].includes(option);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full py-[.4vh] px-[.4vh]">
      {/* Label Section */}
      <div className="w-[40%] flex flex-row items-center gap-1">
        {label && (
          <>
            <label className="text-[1.8vh] font-medium text-stone-600 capitalize whitespace-nowrap">
              {label}
            </label>
            <span className="text-stone-400">:</span>
          </>
        )}
      </div>

      {/* Controls Section */}
      <div className="w-[60%] flex flex-row justify-end items-center gap-2">
        {/* Back Arrow */}
        <button
          type="button"
          onClick={() => handleToggle(-1)}
          className="flex items-center justify-center w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <IoIosArrowBack size={14} />
        </button>

        {/* Value Display */}
        <div className="relative h-8 min-w-[80px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            {showColorSwatches && isColorOption(value) ? (
              <motion.div
                key={value}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                {/* Color Swatch Circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 border-stone-300 shadow-sm ${
                    value === "transparent" ? "bg-[length:8px_8px] bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-white" : ""
                  }`}
                  style={{
                    backgroundColor: value === "transparent" ? undefined : getColorValue(value),
                  }}
                  title={value}
                />
                {/* Color Name */}
                <span className="text-[1.8vh] font-medium capitalize text-stone-700">
                  {value}
                </span>
              </motion.div>
            ) : showFontPreview ? (
              <motion.div
                key={value}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <span
                  className="text-sm font-medium text-stone-700 capitalize"
                  style={{
                    fontFamily: value === "primary" 
                      ? "var(--font-primary, inherit)" 
                      : value === "secondary" 
                        ? "var(--font-secondary, inherit)" 
                        : value === "tertiary" 
                          ? "var(--font-tertiary, inherit)" 
                          : "inherit"
                  }}
                >
                  {value}
                </span>
              </motion.div>
            ) : (
              <motion.span
                key={value}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="text-[1.8vh] font-medium capitalize text-stone-700"
              >
                {value}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Forward Arrow */}
        <button
          type="button"
          onClick={() => handleToggle(1)}
          className="flex items-center justify-center w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <IoIosArrowForward size={14} />
        </button>
      </div>
    </div>
  );
};

export default OptionsToggler;
