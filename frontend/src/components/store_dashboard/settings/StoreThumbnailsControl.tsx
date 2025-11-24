import React, { useState } from 'react';
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import StoreImages from "../../../pages/store_dashboard/supporting_pages/StoreImages";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { editStore } from '../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../types/storeTypes';

interface StoreThumbnailsControlProps {}

const StoreThumbnailsControl: React.FC<StoreThumbnailsControlProps> = () => {
  const dispatch = useAppDispatch();
  const currentStore = useAppSelector((state) => state.storeAdmin.store);
  const [showStoreImages, setShowStoreImages] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<'storeCard' | 'profily' | 'reely' | null>(null);

  const handleImageSelect = async (imageUrl: string) => {
    if (!selectedThumbnail || !currentStore?.slug || !currentStore) return;

    const updatedStore: Omit<Store, 'id'> = {
      ...currentStore,
      thumbnails: {
        ...currentStore.thumbnails,
        [selectedThumbnail]: imageUrl,
      },
    };

    try {
      await dispatch(
        editStore({
          storeSlug: currentStore.slug,
          updatedStore
        })
      ).unwrap();

      setShowStoreImages(false);
      setSelectedThumbnail(null);
    } catch (error) {
      console.error('Error updating thumbnail:', error);
    }
  };

  const openImageSelector = (thumbnailType: 'storeCard' | 'profily' | 'reely') => {
    setSelectedThumbnail(thumbnailType);
    setShowStoreImages(true);
  };

  return (
    <div className="flex flex-col space-y-4 h-[85%]">
      {/* Store Card Thumbnail */}
      <div className="flex flex-row justify-between relative h-[6vh]">
        <div className="flex flex-row justify-between items-center">
          <label className="w-[15vh]">Store Card</label>
          <p className="mr-1">:</p>
        </div>
        <div className="flex flex-row justify-center items-center text-[17px] w-[50%] space-x-1">
          <button
            className=" border-red-500 text-red-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-red-200"
            onClick={() => handleDelete('storeCard')}
          >
            <FiTrash />
          </button>
          <button
            className=" border-green-500 text-green-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-green-200"
            onClick={() => openImageSelector('storeCard')}
          >
            <FiEdit />
          </button>
        </div>
        {currentStore?.thumbnails?.storeCard && (
          <div className="ml-1 w-[30%]">
            <img src={currentStore.thumbnails.storeCard} alt="Store Card" className="w-full h-full object-cover rounded" />
          </div>
        )}
      </div>

      {/* Profile Thumbnail */}
      <div className="flex flex-row justify-between relative h-[6vh]">
        <div className="flex flex-row justify-between items-center">
          <label className="w-[15vh]">Profile</label>
          <p className="mr-1">:</p>
        </div>
        <div className="flex flex-row justify-center items-center text-[17px] w-[50%] space-x-1">
          <button
            className=" border-red-500 text-red-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-red-200"
            onClick={() => handleDelete('profily')}
          >
            <FiTrash />
          </button>
          <button
            className=" border-green-500 text-green-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-green-200"
            onClick={() => openImageSelector('profily')}
          >
            <FiEdit />
          </button>
        </div>
        {currentStore?.thumbnails?.profily && (
          <div className="ml-1 w-[30%]">
            <img src={currentStore.thumbnails.profily} alt="Profile" className="w-full h-full object-cover rounded" />
          </div>
        )}
      </div>

      {/* Reely Thumbnail */}
      <div className="flex flex-row justify-between relative h-[6vh]">
        <div className="flex flex-row justify-between items-center">
          <label className="w-[15vh]">Reely</label>
          <p className="mr-1">:</p>
        </div>
        <div className="flex flex-row justify-center items-center text-[17px] w-[50%] space-x-1">
          <button
            className=" border-red-500 text-red-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-red-200"
            onClick={() => handleDelete('reely')}
          >
            <FiTrash />
          </button>
          <button
            className=" border-green-500 text-green-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-green-200"
            onClick={() => openImageSelector('reely')}
          >
            <FiEdit />
          </button>
        </div>
        {currentStore?.thumbnails?.reely && (
          <div className="ml-1 w-[30%]">
            <img src={currentStore.thumbnails.reely} alt="Reely" className="w-full h-full object-cover rounded" />
          </div>
        )}
      </div>

      {showStoreImages && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[80vw] h-[80vh] rounded-lg relative z-5">
            <button
              className="absolute top-2 right-2 text-black shadow-md p-1 rounded-full hover:scale-102"
              onClick={() => {
                setShowStoreImages(false);
                setSelectedThumbnail(null);
              }}
            >
              <IoMdClose size={28}/>
            </button>
            <StoreImages onImageSelect={handleImageSelect}/>
          </div>
          <div className="absolute top-0 opacity-30 h-screen w-screen bg-black">
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreThumbnailsControl;