import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Store } from '../../../types/storeTypes';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LuScanEye } from 'react-icons/lu';
import { MdSettings } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import CloneStoreModal from './CloneStoreModal';

interface StoreCardProps {
  store: Store;
}

const MyStoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);

  const handleView = () => {
    // Open the store's website
    if (store.website?.websiteUrl) {
      window.open(store.website.websiteUrl, '_blank');
    } else {
      // Default to the store page on The Mall
      window.open(`/stores/${store.slug}`, '_blank');
    }
    setShowButtons(false);
  };

  const handleManage = () => {
    // Navigate to store dashboard
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

  // Get the thumbnail - use thumbnails.reely or fallback
  const thumbnail = store.thumbnails?.reely || store.thumbnail || 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png';

  return (
    <>
      <div className="w-full">
        

        {/* Card Container */}
        <div className="relative w-full bg-white border-2 border-white aspect-10/18 lg:max-h-[60vh] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
          {/* Thumbnail Image */}
          <div className="relative h-[90%]">
            <img
              src={thumbnail}
              alt={store.name || "Store"}
              className="w-full h-full object-cover bg-blue-500"
            />

            {/* Menu Icon at bottom right */}
            <button
              onClick={toggleMenu}
              className="absolute bottom-2 right-[45%] bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10 hover:bg-white/40"
            >
              <GiHamburgerMenu className="text-[2.2vh]"/>
            </button>

            {/* Menu overlay */}
            {showButtons && (
              <div 
                className="absolute inset-0 bg-white/20 backdrop-blur flex items-center justify-center"
                onClick={() => setShowButtons(false)}
              >
                <div className="rounded-2xl p-4 lg:shadow-2xl lg:max-w-[80%] bg-white/90">
                  <div className="grid grid-cols-3 gap-2 lg:gap-4">
                    {/* View */}
                    <button
                      onClick={handleView}
                      className="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                    >
                      <LuScanEye className="text-[3vh] text-green-600 mb-1" />
                      <span className="text-[1.4vh] font-medium text-green-700">View</span>
                    </button>

                    {/* Manage */}
                    <button
                      onClick={handleManage}
                      className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                      <MdSettings className="text-[3vh] text-blue-600 mb-1" />
                      <span className="text-[1.4vh] font-medium text-blue-700">Manage</span>
                    </button>

                    {/* Clone */}
                    <button
                      onClick={handleClone}
                      className="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                    >
                      <FiCopy className="text-[3vh] text-purple-600 mb-1" />
                      <span className="text-[1.4vh] font-medium text-purple-700">Clone</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex justify-center h-[10%] w-full items-center bg-white">
            {/* Store Name */}
            <p className="text-center font-semibold text-[1.8vh] line-clamp-1 lg:py-[1vh] text-shadow-2xs text-gray-800">
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
