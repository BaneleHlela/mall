import React from "react";

interface DivAnimationSettingsProps {
  value: string;
  onChange: (value: string) => void;
}

const transitions = [
  { value: "upToDown", label: "Up to Down" },
  { value: "downToUp", label: "Down to Up" },
  { value: "leftToRight", label: "Left to Right" },
  { value: "rightToLeft", label: "Right to Left" },
  { value: "fade", label: "Fade" },
];

const DivAnimationSettings: React.FC<DivAnimationSettingsProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="font-semibold">Div Animation</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-2 py-1 w-full"
      >
        {transitions.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DivAnimationSettings;
