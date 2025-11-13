import React from 'react';
import { motion } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';

interface StoreSuccessOverlayProps {
  onClose: () => void;
}

const StoreSuccessOverlay: React.FC<StoreSuccessOverlayProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <IoCloseSharp size={28} />
      </button>

      {/* Animated success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-4"
      >
        <GiCheckMark size={100} className="text-green-500" />
      </motion.div>

      <h2 className="text-3xl font-semibold mb-2 text-center">Store Created Successfully!</h2>
      <p className="text-lg text-center max-w-md">
        Your store has been created. You can now customize it, add products or services, and start selling.
      </p>
    </motion.div>
  );
};

export default StoreSuccessOverlay;
