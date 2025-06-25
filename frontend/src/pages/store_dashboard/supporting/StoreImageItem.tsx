import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

interface StoreImageItemProps {
  img: {
    url: string;
    _id: string;
  };
  onView: (url: string) => void;
  onDelete: (id: string) => void;
  onUse: (url: string) => void;
}

const StoreImageItem: React.FC<StoreImageItemProps> = ({ img, onView, onDelete, onUse }) => {
  const [showOptions, setShowOptions] = useState(false);
  const link = window.location.href; 
  const [showPopup, setShowPopup] = useState(false);  

  return (
    <div 
      className="relative font-[Outfit]"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <img
        src={img.url}
        alt={`Store Image`}
        className="w-full h-full object-contain rounded-lg aspect-square"
      />
      {showOptions && (
        <div className="absolute top-0 left-0 w-full h-full rounded  flex flex-col justify-center items-center space-y-2 py-5 z-10">
          {link.includes("layouts") && (
            <button 
                onClick={() => onUse(img.url)}
                className="w-[150px] border border-black text-white bg-gray-800 px-2 py-2 rounded-[22px] hover:scale-102"
            >
                Select
            </button>
          )}
          {link.includes("dashboard") && (
              <button 
                onClick={() => onDelete(img._id)}
                className="w-[55%] border border-black text-white bg-gray-800 hover:bg-gray-700 px-2 py-2 rounded-[22px] hover:scale-102 "
              >
                Delete
              </button>
           )}
          
          <button 
            onClick={() => setShowPopup(true)}
            className="w-[150px] border border-black text-black px-2 py-2 rounded-[22px] hover:scale-102 hover:bg-gray-700 hover:text-stone-200"
          >
            View
          </button>
        </div>
      )}
      {showOptions && (
        <div className="absolute top-0 left-0 w-full h-full rounded bg-black opacity-15 flex flex-col justify-center items-center space-y-2 py-5">
        </div>
      )}
      {/* Popup Div */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="relative bg-white rounded-md p-4 shadow-lg">
            <button
              className="absolute top-2 right-2 text-black shadow-md p-1 rounded-full hover:scale-102"
              onClick={() => setShowPopup(false)} 
            >
              <IoMdClose size={28}/>
            </button>
            <img src={img.url} alt="Popup Image" className="max-w-full max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreImageItem;