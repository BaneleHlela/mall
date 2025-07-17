import React from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="absolute top-0 right-0 w-full h-full bg-stone-50 overflow-y-auto"
    >
      <div className="p-2">
        <div className="flex items-center mb-4">
          <button onClick={onClose} className="mr-2">
            <IoIosArrowRoundBack className="text-[4vh]"/>
          </button>
          <h2 className="text-[2.8vh] font-[500]">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default SlidingPanel;