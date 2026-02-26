import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  showColorPreview?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  value, 
  onChange, 
  onClear,
  showColorPreview = true 
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full py-2 px-1">
      {/* Label Section */}
      <div className="w-[40%] flex flex-row items-center gap-1">
        {label && (
          <>
            <label className="text-xs font-medium text-stone-600 capitalize whitespace-nowrap">
              {label}
            </label>
            <span className="text-stone-400">:</span>
          </>
        )}
      </div>

      {/* Color Picker Section */}
      <div className="w-[60%] flex flex-row justify-end items-center gap-2">
        {/* Color Preview Circle */}
        {showColorPreview && (
          <div 
            className="w-6 h-6 rounded-full border-2 border-stone-300 shadow-sm"
            style={{ 
              backgroundColor: value || '#ffffff',
            }}
            title={value || 'No color'}
          />
        )}
        
        {/* Hex Value Display */}
        <div className="text-xs font-mono text-stone-500 min-w-[50px]">
          {value || 'None'}
        </div>

        {/* Color Input */}
        <div className="relative">
          <input
            type="color"
            value={value || '#000000'}
            onChange={onChange}
            className="w-8 h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent opacity-0 absolute right-0"
            style={{ WebkitAppearance: "none" }}
          />
          {/* Custom color button that triggers the input */}
          <label 
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 cursor-pointer hover:bg-stone-200 transition-colors"
            title="Click to pick a color"
          >
            <div 
              className="w-5 h-5 rounded border border-stone-300"
              style={{ backgroundColor: value || '#000000' }}
            />
          </label>
        </div>

        {/* Clear Button */}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
            title="Remove color"
          >
            <AiOutlineDelete size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
