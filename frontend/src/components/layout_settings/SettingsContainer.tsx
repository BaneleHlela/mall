import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { TbReplace } from "react-icons/tb";
import { IoColorPaletteOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";


interface SettingsContainerProps {
  name: string;
  onClick: () => void;
  onReplaceClick?: () => void;
  onRename?: (newName: string) => void;
  replaceble?: boolean;
  onRenameClick?: () => void;
  renamable?: boolean;
  onDeleteClick?: () => void;
  deletable?: boolean;
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({ 
  name, 
  onClick, 
  onReplaceClick,
  onDeleteClick,
  onRename,
  replaceble = false,
  renamable = false,
  deletable = false
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [editableName, setEditableName] = useState(name);

  useEffect(() => {
    setEditableName(name);
  }, [name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableName(e.target.value);
    if (onRename) {
      onRename(e.target.value);
    }
  };

  return (
    <div className="relative">
      <div
        className="w-full h-[60px] rounded-sm border-2 border-white text-gray-900 shadow-xl hover:bg-gray-900 hover:border-2 hover:border-white hover:text-white hover:scale-101 cursor-move"        
      >
        <div className="w-full h-full flex justify-between items-center pl-4 pr-2">
          {renamable ? (
            <input
              type="text"
              value={editableName}
              onChange={handleNameChange}
              className="capitalize px-2 w-[50%] border-2 border-white rounded bg-transparent outline-none"
            />
          ) : (
            <span
              onClick={onClick}
              className="capitalize"
            >
              {name}
            </span>
          )}
          <div className="space-x-2 mt-1">
            <button 
              className="text-[135%] cursor-pointer"
            >
              <IoColorPaletteOutline
                onClick={onClick}
              />
            </button>
            {deletable && (
              <button 
                className="text-[135%] cursor-pointer"
              >
                <AiOutlineDelete
                  onClick={onDeleteClick}
                />
              </button>
            )}
            {replaceble && (
              <button 
                className="text-[130%] cursor-pointer"
              >
                <TbReplace
                  onDoubleClick={onReplaceClick}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;