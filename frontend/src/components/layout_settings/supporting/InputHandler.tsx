import React from "react";

interface InputHandlerProps {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
}

const InputHandler: React.FC<InputHandlerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-[35px] gap-1">
      <div className="w-[50%] flex flex-row justify-between">
        {label && <label className="w-32">{label}</label>}
        <p className="mr-1">:</p>
      </div>

      <div className="w-[50%] flex flex-row justify-center items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[24px] px-2 py-1 border rounded-md"
        />
      </div>
    </div>
  );
};

export default InputHandler;