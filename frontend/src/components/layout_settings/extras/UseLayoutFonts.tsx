import React from "react";
import { useAppSelector } from "../../../app/hooks";

interface UseLayoutFontsProps {
  objectPath: string;
  handleSettingChange: (path: string, value: string) => void;
}

const UseLayoutFonts: React.FC<UseLayoutFontsProps> = ({
  objectPath,
  handleSettingChange,
}) => {
  const fonts = useAppSelector((state) => state.layoutSettings.fonts);

  const handleFontClick = (fontKey: keyof typeof fonts) => {
    handleSettingChange(`${objectPath}.fontFamily`, fonts[fontKey] ?? "");
  };

  return (
    <div className="flex">
      {Object.entries(fonts).map(([key, font]) => (
        <button
          key={key}
          onClick={() => handleFontClick(key as keyof typeof fonts)}
          className="px-3 py-1 border-x hover:bg-gray-100"
          style={{ fontFamily: font }}
        >
          {key}: {font}
        </button>
      ))}
    </div>
  );
};

export default UseLayoutFonts;
