import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { uploadStoreGalleryImage } from '../../features/store_admin/storeAdminSlice';
import { TbLoader3 } from 'react-icons/tb';

interface UploadStoreImageProps {
  storeSlug?: string;
}

const UploadStoreImage: React.FC<UploadStoreImageProps> = ({ storeSlug }) => {
  const dispatch = useAppDispatch();
  const currentStoreSlug = useAppSelector((state) => state.storeAdmin.store?.slug);
  const { error, isLoading } = useAppSelector((state) => state.storeAdmin);
  // const currentStoreSlug = "684c15bca0f98a1d13a7ff00";
  // const currentImages = useAppSelector((state) => state.storeAdmin?.store?.images) || [];
  
  // const categories: StoreCategories = useAppSelector((state) => state.storeAdmin.store?.categories) || {};

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      alert('You can upload up to 10 images at once.');
      return;
    }
    setImageFiles(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleUpload = async () => {
    if (imageFiles.length === 0) return;

    const id = storeSlug || currentStoreSlug;
    if (!id) {
      console.error('No store ID available');
      return;
    }

    console.log(currentStoreSlug);

    for (const file of imageFiles) {
      try {
        const result = await dispatch(uploadStoreGalleryImage({
          storeSlug: id,
          imageFile: file,
          description: description || '',
          category: category || ''
        }));

        if (uploadStoreGalleryImage.fulfilled.match(result)) {
          const uploadedImage = result.payload;
          console.log('Uploaded:', uploadedImage);
        } else {
          console.error('Image upload failed:', result.payload);
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    // Update local state after all uploads
    setImageFiles([]);
    setPreviews([]);
    setDescription('');
    setCategory('');
  };


  return (
    <div className="shadow space-y-1 w-[250px] font-[Outfit] p-3 bg-white rounded text-sm">
      <h4 className="text-center font-semibold mb-4">Upload Store Images</h4>

      {/* Styled file input */}
      <label className="block mb-3">
        <input
          type="file"
          accept="image/*"
          multiple
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

      {previews.length > 0 && (
        <div className="flex flex-row justify-center flex-wrap gap-2">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-[40px] h-[40px] object-cover shadow-sm"
            />
          ))}
        </div>
      )}
      {error && <p className='text-sm text-center text-red-600'>{error}</p>}
      
      <button
        onClick={handleUpload}
        disabled={imageFiles.length === 0}
        className={`w-full py-2 rounded-md text-white font-medium transition
          ${imageFiles.length > 0 ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'}`}
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
