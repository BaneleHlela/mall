import React, { useState } from 'react';
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import StoreImages from "../../../pages/store_dashboard/supporting_pages/StoreImages";

interface SingleLayoutImageHandlerProps {
    label: string;
    image?: string; // Add this prop to display the current image
    onImageSelect: (imageUrl: string) => void;
    onDelete: () => void | Promise<void>;
}

const SingleLayoutImageHandler: React.FC<SingleLayoutImageHandlerProps> = ({ label, image, onImageSelect, onDelete }) => {
    const [showStoreImages, setShowStoreImages] = useState(false);
    
    const handleImageSelect = (imageUrl: string) => {
        onImageSelect(imageUrl);
        setShowStoreImages(false);
    };

    return (
        <div className="flex flex-row justify-between relative h-[6vh]">
            <div className="flex flex-row justify-between items-center">
                <label className="w-[15vh]">{label}</label>
                <p className="mr-1">:</p>
            </div>
            <div className="flex flex-row justify-center items-center text-[17px] w-[50%] space-x-1">
                <button 
                    className=" border-red-500 text-red-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-red-200"
                    onClick={onDelete}
                    >
                    <FiTrash />
                </button>
                <button 
                    className=" border-green-500 text-green-600 w-[30%] h-[75%] rounded shadow flex flex-row justify-center items-center px-2 hover:scale-105 hover:bg-green-200"
                    onClick={() => setShowStoreImages(true)}
                >
                    <FiEdit /> 
                </button>
            </div>
            {image && (
                <div className="ml-1 w-[30%]">
                    <img src={image} alt={label} className="w-full h-full object-cover rounded bg-amber-300" />
                </div>
            )}
            {showStoreImages && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-[80vw] h-[80vh] rounded-lg relative z-5">
                        <button
                            className="absolute top-2 right-2 text-black shadow-md p-1 rounded-full hover:scale-102"
                            onClick={() => setShowStoreImages(false)} 
                        >
                            <IoMdClose size={28}/>
                        </button>
                        <StoreImages onImageSelect={handleImageSelect}/>
                    </div>
                    <div className="absolute top-0 opacity-30 h-screen w-screen bg-black ">
                    </div>
                </div>
            )}
        </div>
    )
}

export default SingleLayoutImageHandler;