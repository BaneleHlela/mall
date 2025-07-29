import React from "react";

interface EditableLayoutColorPaletteProps {
  colors: string[];
  onChange: (index: number, newColor: string) => void;
}

const EditableLayoutColorPalette: React.FC<EditableLayoutColorPaletteProps> = ({
  colors,
  onChange,
}) => {
  const itemWidth = `${100 / colors.length}%`;

  return (
    <div className="flex items-center w-full shadow rounded-[2vh] overflow-hidden">
      {colors.map((color, index) => (
        <label
          key={index}
          className="relative h-[10vh] cursor-pointer"
          style={{
            width: itemWidth,
            backgroundColor: color,
          }}
        >
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(index, e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0"
            style={{ appearance: "none", cursor: "pointer" }}
          />
        </label>
      ))}
    </div>
  );
};

export default EditableLayoutColorPalette;
