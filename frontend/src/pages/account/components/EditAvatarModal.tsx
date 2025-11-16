import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { updateAvatar, updateUser } from '../../../features/user/userSlice';
import { FaTimes, FaCamera, FaUpload } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { TbLoader3 } from 'react-icons/tb';

interface EditAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditAvatarModal: React.FC<EditAvatarModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
  
    try {
      await dispatch(updateAvatar({ file: selectedFile }) as any);
      onClose();
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await dispatch(updateAvatar({ remove: true }) as any);
      onClose();
    } catch (error) {
      console.error("Failed to remove avatar:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-lg max-w-md w-full p-[2.5vh] shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-stone-800">Edit Avatar</h2>
          <button
            onClick={onClose}
            className=" hover:text-stone-600 transition-colors"
          >
            <IoMdClose className='text-[3vh]'/>
          </button>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Current/Preview Avatar */}
          <div className="relative">
            <div className="w-[14vh] h-[14vh] rounded-full overflow-hidden border-4 border-stone-200">
              <img
                src={previewUrl || user?.avatar || '/default-avatar.png'}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
            >
              <FaCamera size={16} />
            </button>
          </div>

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg transition-colors"
          >
            <FaUpload />
            <span>Choose Photo</span>
          </button>

          {/* Action Buttons */}
          <div className="flex space-x-3 w-full">
            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors"
              >
                {isLoading ? <TbLoader3 className='w-[90%] aspect-square animate-spin mx-auto'/> : 'Save'}
              </button>
            )}
            
            <button
              onClick={handleRemoveAvatar}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? <TbLoader3 className='w-[90%] aspect-square animate-spin mx-auto'/> : 'Remove'}
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-stone-300 hover:bg-stone-400 text-stone-700 py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAvatarModal;