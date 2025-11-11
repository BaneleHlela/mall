import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { uploadStoreGalleryImage } from '../../features/store_admin/storeAdminSlice';
import { TbLoader3 } from 'react-icons/tb';

interface UploadStoreImageProps {
  storeId?: string;
}

const UploadStoreImage: React.FC<UploadStoreImageProps> = ({ storeId }) => {
  const dispatch = useAppDispatch();
  const currentStoreId = useAppSelector((state) => state.storeAdmin.store?._id);
  const isLoading = useAppSelector((state) => state.storeAdmin.isLoading);
  // const currentStoreId = "684c15bca0f98a1d13a7ff00";
  // const currentImages = useAppSelector((state) => state.storeAdmin?.store?.images) || [];
  
  // const categories: StoreCategories = useAppSelector((state) => state.storeAdmin.store?.categories) || {};

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;
  
    const id = storeId || currentStoreId;
    if (!id) {
      console.error('No store ID available');
      return;
    }

    console.log(currentStoreId);
  
    try {
      const result = await dispatch(uploadStoreGalleryImage({ 
        storeId: id, 
        imageFile,
        description: description || '',
        category: category || ''
      }));
  
      if (uploadStoreGalleryImage.fulfilled.match(result)) {
        const uploadedImage = result.payload;
  
        // Update local state
        setImageFile(null);
        setPreview(null);
        setDescription('');
        setCategory('');
  
        // dispatch(addImageToStore({
        //   _id: uploadedImage._id,
        //   url: uploadedImage.url,
        //   description: uploadedImage.description,
        //   category: uploadedImage.category,
        // }));
  
        console.log('Image uploaded successfully:', uploadedImage);
      } else {
        console.error('Image upload failed:', result.payload);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };


  return (
    <div className="shadow space-y-1 w-[250px] font-[Outfit] p-3 bg-white rounded text-sm">
      <h4 className="text-center font-semibold mb-4">Upload Store Image</h4>

      {/* Styled file input */}
      <label className="block mb-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block  w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-gray-800 file:text-white hover:file:scale-102"
        />
      </label>


      <div className="text-center">
        <label className="block text-gray-700 mb-1">Description:</label>
        <input
          type="text"
          placeholder='Optional description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {preview && (
        <div className="flex flex-row justify-center">
          <img
            src={preview}
            alt="Preview"
            className="w-[40px] h-[40px] object-cover shadow-sm"
          />
        </div>
      )}
      
      <button
        onClick={handleUpload}
        disabled={!imageFile}
        className={`w-full py-2 rounded-md text-white font-medium transition
          ${imageFile ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {isLoading ? (
              <TbLoader3 size={20} className="animate-spin mx-auto" />
            ) : "Upload"
        }
      </button>
    </div>
  );
};

export default UploadStoreImage;
