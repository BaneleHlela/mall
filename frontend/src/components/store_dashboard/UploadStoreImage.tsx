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
  const currentStoreId = useAppSelector((state: RootState) => state.storeAdmin.store._id);
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
      // Dispatch the upload action
      const result = await dispatch(uploadStoreGalleryImage({ storeId: id, imageFile }));
  
      // Check if the upload was successful
      if (uploadStoreGalleryImage.fulfilled.match(result)) {
        const uploadedImage = result.payload;
        console.log('Image uploaded successfully:', uploadedImage);
  
        // Proceed to update the store with description/category if either exists
        if (description || category) {
          const imageMeta = {
            _id: uploadedImage._id,
            url: uploadedImage,
            description: description || '', // Ensure description is a string
            category: category || '', // Ensure category is a string
          };
  

  
          // Dispatch the editStore action to append the new image to the gallery
          await dispatch(
            editStore({
              storeId: id,
              updatedStore: {
                images: [...currentImages, imageMeta], // Append the new image to the existing images
              },
            })
          );
  
          console.log('Store updated with new image metadata:', imageMeta);
        }
  
        // Reset the form fields
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
    <div style={{ maxWidth: 400, margin: '1rem auto' }}>
      <h3>Upload Store Image</h3>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ margin: '1rem 0' }}>
          <img src={preview} alt="preview" style={{ width: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Description (optional):</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Category (optional):</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <button onClick={handleUpload} disabled={!imageFile}>
        Upload
      </button>
    </div>
  );
};

export default UploadStoreImage;
