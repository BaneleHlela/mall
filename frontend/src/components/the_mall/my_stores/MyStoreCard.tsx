import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Store } from '../../../types/storeTypes';
import { LuScanEye } from 'react-icons/lu';
import { MdSettings } from 'react-icons/md';
import { FiCopy, FiMoreVertical } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CloneStoreModal from './CloneStoreModal';

interface StoreCardProps {
  store: Store;
}

const MyStoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);

  const handleView = () => {
    if (store.website?.websiteUrl) {
      window.open(store.website.websiteUrl, '_blank');
    } else {
      window.open(`/stores/${store.slug}`, '_blank');
    }
    setShowButtons(false);
  };

  const handleManage = () => {
    navigate(`/dashboard/${store.slug}`);
    setShowButtons(false);
  };

  const handleClone = () => {
    setShowButtons(false);
    setShowCloneModal(true);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowButtons(!showButtons);
  };

  const thumbnail = store.thumbnails?.reely || store.thumbnail || 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png';

  return (
    <>
      <div className="w-full group">
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          {/* Thumbnail Image */}
          <div className="relative h-full">
            <img
              src={thumbnail}
              alt={store.name || "Store"}
              className="w-full h-full object-cover bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Menu Button - Always Visible on Mobile, Hover on Desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm text-gray-700 p-2 rounded-lg shadow-md opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10"
            >
              <FiMoreVertical className="text-lg" />
            </motion.button>

            {/* Quick Actions Menu */}
            <AnimatePresence>
              {showButtons && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
                  onClick={() => setShowButtons(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white rounded-xl p-3 shadow-2xl mx-2 w-[90%] max-w-[200px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {/* View */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleView}
                        className="flex flex-col items-center justify-center p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm mb-1">
                          <LuScanEye className="text-base text-white" />
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700">View</span>
                      </motion.button>

                      {/* Manage */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleManage}
                        className="flex flex-col items-center justify-center p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-sm mb-1">
                          <MdSettings className="text-base text-white" />
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700">Manage</span>
                      </motion.button>

                      {/* Clone */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClone}
                        className="flex flex-col items-center justify-center p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-sm mb-1">
                          <FiCopy className="text-base text-white" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-700">Clone</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Bar with Store Name */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-2 px-2">
            <p className="text-center font-semibold text-xs line-clamp-1 text-gray-800">
              {store.nickname || store.name || "My Store"}
            </p>
          </div>
        </div>
      </div>

      {/* Clone Modal */}
      <CloneStoreModal
        store={store}
        isOpen={showCloneModal}
        onClose={() => setShowCloneModal(false)}
      />
    </>
  );
};

export default MyStoreCard;
