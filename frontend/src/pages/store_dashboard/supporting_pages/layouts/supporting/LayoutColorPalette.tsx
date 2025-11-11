import React from "react";

interface LayoutColorPaletteProps {
  colors: string[];
  onSelect?: () => void;
}

const LayoutColorPalette: React.FC<LayoutColorPaletteProps> = ({ colors, onSelect }) => {
  const itemWidth = `${100 / colors.length}%`; // calculate width as percentage

  return (
    <div onClick={onSelect} className="flex items-center w-full shadow rounded-[2vh] overflow-hidden ">
      {colors.map((color, index) => (
        <div
          key={index}
          className="h-[10vh]"
          style={{
            width: itemWidth,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default LayoutColorPalette;
