import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FiCheck, FiTrash2, FiEye } from "react-icons/fi";
import type { Image } from '../../../types/storeTypes';
import { TbLoader3 } from 'react-icons/tb';
import { useAppSelector } from '../../../app/hooks';

interface StoreImageItemProps {
  img: Image;
  onDelete: (id: string) => void;
  onUse: (url: string) => void;
}

const StoreImageItem: React.FC<StoreImageItemProps> = ({ img, onDelete, onUse }) => {
  const isLoading = useAppSelector((state) => state.storeAdmin.isLoading);
  const [showOptions, setShowOptions] = useState(false);
  const link = window.location.href; 
  const [showPopup, setShowPopup] = useState(false);  

  return (
    <div 
      className="relative group rounded-xl overflow-hidden aspect-square cursor-pointer"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <img
        src={img.url}
        alt={`Store Image`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-200 ${showOptions ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Action Buttons */}
      {showOptions && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
          {(link.includes("posters") || link.includes("layouts") || link.includes('thumbnails')) && (
            <button 
              onClick={() => onUse(img.url)}
              className="flex items-center gap-2 w-full max-w-[140px] justify-center bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-2 rounded-lg hover:bg-white transition-all text-sm font-medium shadow-lg"
            >
              <FiCheck className="text-green-500" />
              Select
            </button>
          )}
          
          {link.includes("images") && (
            <button 
              onClick={() => onDelete(img._id)}
              disabled={isLoading}
              className="flex items-center gap-2 w-full max-w-[140px] justify-center bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-2 rounded-lg hover:bg-white transition-all text-sm font-medium shadow-lg"
            >
              {isLoading ? (
                <TbLoader3 size={16} className="animate-spin" />
              ) : (
                <FiTrash2 className="text-red-500" />
              )}
              Delete
            </button>
          )}
          
          <button 
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 w-full max-w-[140px] justify-center bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-2 rounded-lg hover:bg-white transition-all text-sm font-medium shadow-lg"
          >
            <FiEye className="text-purple-500" />
            View
          </button>
        </div>
      )}
      
      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="relative bg-white rounded-2xl p-2 shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm text-slate-600 rounded-full hover:bg-white hover:text-slate-800 transition-all shadow-lg"
              onClick={() => setShowPopup(false)} 
            >
              <IoMdClose size={20}/>
            </button>
            <img 
              src={img.url} 
              alt="Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreImageItem;