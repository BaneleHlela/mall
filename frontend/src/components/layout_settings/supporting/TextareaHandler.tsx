import React from "react";

interface TextareaHandlerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextareaHandler: React.FC<TextareaHandlerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <textarea
        className="border rounded p-2 resize-y min-h-[100px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextareaHandler;
