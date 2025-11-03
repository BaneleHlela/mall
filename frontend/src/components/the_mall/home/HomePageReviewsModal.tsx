import React from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import HomePageReview from './HomePageReview';

interface HomePageReviewsModalProps {
  onClose: () => void;
}

const HomePageReviewsModal: React.FC<HomePageReviewsModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      className="fixed inset-0 bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-[.8vh] border-b border-gray-300">
        <h2 className="text-lg font-semibold">Write a Review</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-700 hover:text-black transition"
        >
          <IoClose />
        </button>
      </div>

      {/* Modal content */}
      <div className="flex-1 overflow-y-auto py-[1vh] p-[.8vh]">
        <HomePageReview />
        <p className="text-gray-600">
          {/* You can put your review form, star selector, or previous reviews here */}
          Coming soon: review content
        </p>
      </div>
    </motion.div>
  );
};

export default HomePageReviewsModal;
