import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { uploadStoreGalleryImage } from '../../features/store_admin/storeAdminSlice';
import { TbLoader3 } from 'react-icons/tb';
import { FiUploadCloud, FiX, FiImage } from 'react-icons/fi';

interface UploadStoreImageProps {
  storeSlug?: string;
}

const UploadStoreImage: React.FC<UploadStoreImageProps> = ({ storeSlug }) => {
  const dispatch = useAppDispatch();
  const currentStoreSlug = useAppSelector((state) => state.storeAdmin.store?.slug);
  const { error, isLoading } = useAppSelector((state) => state.storeAdmin);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      alert('You can upload up to 10 images at once.');
      return;
    }
    setImageFiles(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
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

    for (const file of imageFiles) {
      try {
        const result = await dispatch(uploadStoreGalleryImage({
          storeSlug: id,
          imageFile: file,
          description: description || '',
          category: ''
        }));

        if (uploadStoreGalleryImage.fulfilled.match(result)) {
          console.log('Uploaded:', result.payload);
        } else {
          console.error('Image upload failed:', result.payload);
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    setImageFiles([]);
    setPreviews([]);
    setDescription('');
  };

  const clearFiles = () => {
    setImageFiles([]);
    setPreviews([]);
    setDescription('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
          <FiUploadCloud className="text-sm" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Upload Images</h3>
          <p className="text-xs text-slate-500">Add images to your store gallery</p>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
          isDragOver 
            ? 'border-purple-400 bg-purple-50' 
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
            isDragOver ? 'bg-purple-100 text-purple-500' : 'bg-slate-100 text-slate-400'
          }`}>
            <FiImage className="text-xl" />
          </div>
          <p className="text-sm font-medium text-slate-700 mb-1">
            {isDragOver ? 'Drop images here' : 'Drag & drop images'}
          </p>
          <p className="text-xs text-slate-500">
            or click to browse (max 10 images)
          </p>
        </div>
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              {previews.length} image{previews.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearFiles}
              className="text-xs text-slate-500 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-sm"
                />
                <button
                  onClick={() => {
                    const newFiles = imageFiles.filter((_, i) => i !== index);
                    const newPreviews = previews.filter((_, i) => i !== index);
                    setImageFiles(newFiles);
                    setPreviews(newPreviews);
                  }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <FiX size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description Input */}
      {imageFiles.length > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Description (optional)
          </label>
          <input
            type="text"
            placeholder="Add a description for these images..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Upload Button */}
      {imageFiles.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <TbLoader3 size={18} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <FiUploadCloud size={18} />
              Upload {imageFiles.length} image{imageFiles.length > 1 ? 's' : ''}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default UploadStoreImage;
