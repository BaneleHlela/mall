import React from 'react';

interface SectionSelectorButtonProps {
  sectionName: string;
  onSelect: (sectionName: string) => void;
  isSelected?: boolean;
}

const SectionSelectorButton: React.FC<SectionSelectorButtonProps> = ({ sectionName, onSelect, isSelected = false }) => {
  return (
    <div
      onClick={() => onSelect(sectionName)}
      className={`capitalize w-full p-4 hover:bg-gray-400 hover:text-white border-t border-x border-gray-400 cursor-pointer ${
        isSelected ? 'bg-blue-500 text-white' : ''
      }`}
    >
      {sectionName}
    </div>
  );
};

export default SectionSelectorButton;
