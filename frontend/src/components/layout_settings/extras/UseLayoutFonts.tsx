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
  const selectedFontFamily = useAppSelector((state) => {
    // Adjust this based on how deeply nested fontFamily is
    const pathParts = objectPath.split(".");
    let current: any = state.layoutSettings;

    for (const part of pathParts) {
      current = current?.[part];
      if (!current) break;
    }

    return current?.fontFamily;
  });

  const handleFontClick = (fontKey: keyof typeof fonts) => {
    handleSettingChange(`${objectPath}.fontFamily`, fonts[fontKey] ?? "");
  };

  return (
    <div className="flex mt-1">
      {Object.entries(fonts).map(([key, font]) => {
        const isSelected = font === selectedFontFamily;
        return (
          <button
            key={key}
            onClick={() => handleFontClick(key as keyof typeof fonts)}
            className={`px-2 py-1 border-x hover:bg-gray-100 ${
              isSelected ? "bg-gray-200 border-gray-300" : ""
            }`}
            style={{ fontFamily: font }}
          >
            {key}: {font}
          </button>
        );
      })}
    </div>
  );
};

export default UseLayoutFonts;
