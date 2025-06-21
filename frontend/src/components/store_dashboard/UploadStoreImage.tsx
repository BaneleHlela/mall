import React, { useState } from 'react';
import { uploadStoreGalleryImage } from '../../features/stores/storeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { editStore } from '../../features/store_admin/storeAdminSlice';

interface UploadStoreImageProps {
  storeId?: string;
}

const UploadStoreImage: React.FC<UploadStoreImageProps> = ({ storeId }) => {
  const dispatch = useAppDispatch();
  // const currentStoreId = useAppSelector((state: RootState) => state.storeAdmin.store._id);
  const currentStoreId = "684c15bca0f98a1d13a7ff00";
  const currentImages = useAppSelector((state: RootState) => state.storeAdmin.store.images) || [];

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

    try {
      const result = await dispatch(uploadStoreGalleryImage({ storeId: id, imageFile }));

      if (uploadStoreGalleryImage.fulfilled.match(result)) {
        const uploadedImage = result.payload;

        if (description || category) {
          const imageMeta = {
            _id: uploadedImage._id,
            url: uploadedImage,
            description: description || '',
            category: category || '',
          };

          await dispatch(
            editStore({
              storeId: id,
              updatedStore: {
                images: [...currentImages, imageMeta],
              },
            })
          );
        }

        setImageFile(null);
        setPreview(null);
        setDescription('');
        setCategory('');
      } else {
        console.error('Image upload failed:', result.payload);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="max-w-[200px] mx-auto my-8 p-4 bg-white rounded-lg shadow-md text-sm">
      <h4 className="text-center font-semibold mb-4">Upload Store Image</h4>

      {/* Styled file input */}
      <label className="block mb-3">
        <span className="sr-only">Choose image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-md object-cover"
          />
        </div>
      )}

      <div className="mb-3">
        <label className="block text-gray-700 mb-1">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!imageFile}
        className={`w-full py-2 rounded-md text-white font-medium transition
          ${imageFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadStoreImage;
