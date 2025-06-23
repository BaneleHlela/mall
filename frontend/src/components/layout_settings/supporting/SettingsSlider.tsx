import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slider } from "@mui/material";

type SettingsSliderProps = {
  label?: string;
  value: number;
  unit?: string; // e.g. 'px', 'em', 'vh'
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
};

const SettingsSlider: React.FC<SettingsSliderProps> = ({
  label = "Font Size",
  value,
  unit = "px",
  min = 8,
  max = 72,
  step = 1,
  onChange,
}) => {
  const handleArrowClick = (direction: number) => {
    const newValue = Math.min(Math.max(value + direction, min), max);
    onChange(newValue);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-[35px] gap-1">
      <div className="w-[50%] flex flex-row justify-between">
        <label className="w-32">{label}</label>
        <p className="mr-1">:</p>
      </div>

      <div className="w-[50%] flex flex-row justify-between items-center gap-2 px-2 py-1">
        <button
          type="button"
          onClick={() => handleArrowClick(-step)}
          className="flex items-center justify-center"
        >
          <IoIosArrowBack />
        </button>

        <Slider
          size="small"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(_, newValue) => onChange(newValue as number)}
          sx={{
            width: "100px",
            color: "black",
          }}
          valueLabelDisplay="auto"
        />

        <button
          type="button"
          onClick={() => handleArrowClick(step)}
          className="flex items-center justify-center"
        >
          <IoIosArrowForward />
        </button>

      </div>
    </div>
  );
};

export default SettingsSlider;
