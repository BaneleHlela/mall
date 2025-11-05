import React from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import HomePageReview from './HomePageReview';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { IoIosStarOutline } from 'react-icons/io';

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
      className="fixed inset-0 bg-white z-50 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-[.8vh] border-b border-gray-300">
        <h2 className="text-lg font-semibold">Comments & Ratings</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-700 hover:text-black transition"
        >
          <IoClose />
        </button>
      </div>

      {/* Modal content */}
      <div className="relative flex-1 justify-between h-full overflow-y-auto py-[1vh] p-[.8vh] space-y-1">
        {/* AI overall */}
        <div className="w-full bg-black text-white rounded-[1vh] py-[1vh] px-[1.5vh]">
          <p className="font-semibold space-x-1">
            AI Overview 
            <TipsAndUpdatesIcon className='text-white ml-1' style={{fontSize: "2.5vh"}}/>
          </p>
          <p className="text-2vh py-1">
            Customers praise the excellent product quality, fast shipping, and outstanding customer service. 
          </p>
        </div>
        {/* Reviews */}
        <div className="space-y-1">
          <HomePageReview />
          <HomePageReview />
          <HomePageReview />
        </div>
        <div className="absolute bottom-0 left-0 text-center w-full ">
          {/* Comments count */}
          <p className="text-gray-500 text-[2vh] mb-[.5vh]">
            124 Comments
          </p>
          {/* Rate and review */}
          <div className="relative flex items-center w-full h-[5.5vh] border-t-1 border-gray-300 p-1">
            <input
              type="text"
              className="w-full h-full rounded-full border border-gray-500 px-[1.5vh]" 
              placeholder="Leave a review"
            />
            
            {/* Rating system (5 stars inside input) */}
            <div className="absolute right-[1.5vh] flex gap-[.3vh] text-gray-400">
              {[...Array(5)].map((_, i) => (
                <IoIosStarOutline key={i} className="text-[2.5vh]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[5.5vh] bg-amber-500">L=</div>
    </motion.div>
  );
};

export default HomePageReviewsModal;
