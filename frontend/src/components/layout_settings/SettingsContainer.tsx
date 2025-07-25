import React, { useEffect, useState } from "react";
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
        className="w-full h-[7vh] text-[1.8vh] rounded-sm border-[.3vh] border-white text-gray-900 shadow-xl hover:bg-gray-900 hover:border-[.3vh] hover:border-white hover:text-white hover:scale-101 cursor-move"        
      >
        <div className="w-full h-full flex justify-between items-center pl-[1.8vh] pr-[1vh]">
          {renamable ? (
            <input
              type="text"
              value={editableName}
              onChange={handleNameChange}
              className="capitalize px-[1vh] w-[50%] border-[.3vh] border-white rounded bg-transparent outline-none"
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
                className="text-[135%] cursor-pointer hover:text-red-600"
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
                  onClick={onReplaceClick}
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