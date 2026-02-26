import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { FiTrash } from "react-icons/fi";
import { ChevronRight } from "lucide-react";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";

interface FirstOrderSubSettingsContainerProps {
  name: string;
  onClick?: () => void;
  deletable?: boolean; 
  onDeleteClick?: () => void;
  panelId?: string;
  icon?: React.ReactNode;
}

const FirstOrderSubSettingsContainer: React.FC<FirstOrderSubSettingsContainerProps> = ({
  name,
  onClick,
  deletable = false,
  onDeleteClick,
  panelId,
  icon
}) => {
  const { addBreadcrumb, currentPanel } = useBreadcrumbs();
  
  const isActive = currentPanel === panelId;

  const handleClick = () => {
    if (onClick) {
      onClick();
      if (panelId) {
        addBreadcrumb(panelId, name, () => {});
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full"
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <div
        className={`w-full flex items-center justify-between px-[1.6vh] py-[1.2vh] rounded-xl border transition-all duration-200 cursor-pointer group
          ${isActive 
            ? 'bg-stone-800 border-stone-700 text-white shadow-lg' 
            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:shadow-md'
          }
        `}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-[1.2vh] flex-1 min-w-0">
          {icon && (
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
              ${isActive ? 'bg-white/10' : 'bg-stone-100'}
            `}>
              {icon}
            </div>
          )}
          <span className="capitalize font-medium text-[1.8vh] truncate">{name}</span>
        </div>
        
        <div className="flex items-center space-x-1 flex-shrink-0">
          {deletable && (
            <button 
              className="p-1.5 rounded-lg hover:bg-red-100 text-stone-400 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick?.();
              }}
            >
              <FiTrash size={14} />
            </button>
          )}
          <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/10' : 'group-hover:bg-stone-100'}`}>
            <ChevronRight size={16} className={isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-600'} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FirstOrderSubSettingsContainer;
