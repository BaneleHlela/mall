import React from "react";

interface InputHandlerProps {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
}

const InputHandler: React.FC<InputHandlerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-[4vh] text-[1.8vh]">
      <div className="w-[50%] flex flex-row justify-between">
        {label && <label className="]">{label}</label>}
        <p className="mr-1">:</p>
      </div>

      <div className="w-[50%] flex flex-row justify-center items-center">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-[1vh] py-[.1vh] border rounded-md"
        />
      </div>
    </div>
  );
};

export default InputHandler;