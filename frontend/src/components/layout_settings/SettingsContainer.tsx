import React, { useEffect, useState } from "react";
import { TbReplace } from "react-icons/tb";
import { IoColorPaletteOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { ChevronRight } from "lucide-react";

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
  icon?: React.ReactNode;
  isActive?: boolean;
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({ 
  name, 
  onClick, 
  onReplaceClick,
  onDeleteClick,
  onRename,
  replaceble = false,
  renamable = false,
  deletable = false,
  icon,
  isActive = false
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
    <div className="relative group">
      <div
        className={`w-full flex items-center justify-between px-[1.6vh] py-[1.2vh] rounded-xl border transition-all duration-200 cursor-pointer
          ${isActive 
            ? 'bg-stone-800 border-stone-700 text-white shadow-lg' 
            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:shadow-md'
          }
        `}
        onClick={onClick}
      >
        <div className="flex items-center space-x-[1.2vh] flex-1 min-w-0">
          {icon && (
            <div className={`flex-shrink-0 w-[4vh] h-[4vh] rounded-lg flex items-center justify-center
              ${isActive ? 'bg-white/10' : 'bg-stone-100'}
            `}>
              {icon}
            </div>
          )}
          {renamable ? (
            <input
              type="text"
              value={editableName}
              onChange={handleNameChange}
              onClick={(e) => e.stopPropagation()}
              className="capitalize px-[.8vh] py-[.4vh] w-1/2 border rounded bg-transparent outline-none text-sm"
            />
          ) : (
            <span className="capitalize font-medium text-[1.8vh] truncate">{name}</span>
          )}
        </div>
        
        <div className="flex items-center space-x-1 flex-shrink-0">
          {deletable && (
            <button 
              className="p-[1vh] rounded-lg hover:bg-red-100 text-stone-400 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick?.();
              }}
            >
              <AiOutlineDelete size={16} />
            </button>
          )}
          {replaceble && (
            <button 
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onReplaceClick?.();
              }}
            >
              <TbReplace size={16} />
            </button>
          )}
          <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/10' : 'bg-stone-100'}`}>
            <ChevronRight size={16} className={isActive ? 'text-white' : 'text-stone-500'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;
