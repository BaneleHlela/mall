import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void; // new optional prop
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, onClear }) => {
  return (
    <div className="flex flex-row justify-between items-center h-[3vh] text-[1.8vh]">
      <div className="w-[50%] flex flex-row justify-between">
        {label && <label className="">{label}</label>}
        <p className="mr-1">:</p>
      </div>
      <div className="w-[50%] h-[80%] flex flex-row justify-center items-center gap-1">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="w-[90%] h-[3vh] p-0 border-none rounded-[10px] cursor-pointer bg-transparent"
          style={{ WebkitAppearance: "none" }}
        />
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-gray-500 hover:text-red-600 transition"
            title="Remove color"
          >
            <AiOutlineDelete className="text-[2vh] text-red-600"/>
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
