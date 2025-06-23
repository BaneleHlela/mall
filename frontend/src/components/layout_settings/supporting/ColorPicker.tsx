import React from "react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  
    return (
    <div className="flex flex-row justify-between items-center gap-2 h-[35px]">
      <div className="w-[50%] flex flex-row justify-between">
            {label && <label className="w-32">{label}</label>}
            <p className="mr-1">:</p>
      </div>
      <div className="w-[50%] h-[80%] flex flex-row justify-center">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="w-[90%] h-full p-0 border-none rounded-[10px] cursor-pointer bg-transparent"
          style={{ WebkitAppearance: 'none' }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
