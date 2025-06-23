import React from 'react';
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';

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
      className="absolute top-0 right-0 w-full h-full bg-white overflow-y-auto"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <button onClick={onClose} className="mr-2">
            <IoArrowBack size={24} />
          </button>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default SlidingPanel;