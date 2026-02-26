import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slider } from "@mui/material";

type SettingsSliderProps = {
  label?: string;
  value: number;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
  showValue?: boolean;
}

const SettingsSlider: React.FC<SettingsSliderProps> = (props) => {
  const { 
    label = "Font Size", 
    value, 
    min = 8, 
    max = 110, 
    step = 0.25, 
    onChange, 
    showValue = true,
    unit
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handleArrowClick = (direction: number) => {
    const newValue = Math.min(Math.max(value + direction * step, min), max);
    onChange(Math.round(newValue * 100) / 100);
  };

  // Format the display value
  const displayValue = step >= 1 
    ? Math.round(value) 
    : value.toFixed(1);

  return (
    <div className="flex flex-col w-full py-[.8vh] px-[.4vh]">
      {/* Label and Value Display at Top */}
      <div className="flex flex-row justify-between items-center">
        {label && (
          <label className="text-[1.6vh] font-medium text-stone-600 capitalize whitespace-nowrap">
            {label}
          </label>
        )}
        
        {/* Value Display */}
        {showValue && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleArrowClick(-1)}
              className="flex items-center justify-center w-5 h-5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <IoIosArrowBack size={10} />
            </button>
            <span className="text-[1.6vh] font-semibold text-stone-700 bg-stone-100 px-2 py-1 rounded-md min-w-[45px] text-center">
              {displayValue}{unit && <span className="text-stone-400 ml-0.5">{unit}</span>}
            </span>
            <button
              type="button"
              onClick={() => handleArrowClick(1)}
              className="flex items-center justify-center w-5 h-5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <IoIosArrowForward size={10} />
            </button>
          </div>
        )}
      </div>

      {/* Slider at Bottom */}
      <div className="w-full">
        <Slider
          size="small"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(_, newValue) => onChange(newValue as number)}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          sx={{
            width: "100%",
            padding: 0,
            height: 4,
            color: isDragging ? "#6366f1" : "#94a3b8",
            '& .MuiSlider-thumb': {
              width: 14,
              height: 14,
              backgroundColor: "#fff",
              border: "2px solid #6366f1",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.2)",
              },
            },
            '& .MuiSlider-track': {
              height: 4,
              borderRadius: 2,
            },
            '& .MuiSlider-rail': {
              height: 4,
              borderRadius: 2,
              backgroundColor: "#e2e8f0",
            },
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => `${val}${unit || ''}`}
        />
      </div>
    </div>
  );
};

export default SettingsSlider;
