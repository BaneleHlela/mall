import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SubSettingsContainerProps {
  name: string;
  SettingsComponent: React.ReactNode;
  defaultOpen?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const SubSettingsContainer: React.FC<SubSettingsContainerProps> = ({
  name,
  SettingsComponent,
  defaultOpen = false,
  isExpanded,
  onToggle,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  // Use controlled state if provided, otherwise use internal state
  const isSettingsOpen = isExpanded !== undefined ? isExpanded : internalOpen;
  const handleToggle = onToggle || (() => setInternalOpen((prev) => !prev));

  return (
    <div className="w-full">
      {/* Header Button */}
      <motion.button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-[2vh] py-[1.4vh] rounded-xl border transition-all duration-200
          ${isSettingsOpen 
            ? 'bg-stone-800 border-stone-700 text-white rounded-b-none rounded-t-xl' 
            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 rounded-xl'
          }
        `}
        whileTap={{ scale: 0.995 }}
      >
        <span className="capitalize font-medium text-[2vh]">{name}</span>
        <motion.div
          animate={{ rotate: isSettingsOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`p-[.4vh] rounded-lg ${isSettingsOpen ? 'bg-white/10' : ''}`}
        >
          <ChevronDown 
            size={18} 
            className={isSettingsOpen ? 'text-white' : 'text-stone-400'} 
          />
        </motion.div>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isSettingsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-stone-50 border-x border-b border-stone-200 rounded-b-xl p-3 -mt-1">
              {SettingsComponent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubSettingsContainer;
