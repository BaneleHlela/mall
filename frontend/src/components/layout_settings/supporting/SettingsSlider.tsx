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
  min = 8,
  max = 110,
  step = .25,
  onChange,
}) => {
  console.log(step);
  const handleArrowClick = (direction: number) => {
    const newValue = Math.min(Math.max(value + direction, min), max);
    onChange(newValue);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-[3vh] text-[1.8vh] ">
      <div className="w-[50%] flex flex-row justify-between">
        <label className="">{label}</label>
        <p className="mr-1">:</p>
      </div>

      <div className="w-[50%] flex flex-row justify-between items-center gap-[.5vh] py-1">
        <button
          type="button"
          onClick={() => handleArrowClick(-step)}
          className="flex items-center justify-center hover:scale-105"
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
            width: "20vh",
            height: ".25vh",
            color: "black",
            '& .MuiSlider-thumb': {
              width: '1vh',
              height: '1vh',
            },
          }}
          valueLabelDisplay="auto"
        />

        <button
          type="button"
          onClick={() => handleArrowClick(step)}
          className="flex items-center justify-center hover:scale-105"
        >
          <IoIosArrowForward />
        </button>

      </div>
    </div>
  );
};

export default SettingsSlider;
