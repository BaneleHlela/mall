import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TbLoader3 } from 'react-icons/tb';
import { uploadStoreSection } from '../../features/sections/sectionSlice';

const UploadStoreSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.sections.loading);

  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [mobilePreview, setMobilePreview] = useState<string | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [variation, setVariation] = useState('');

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMobileImage(file);
      setMobilePreview(URL.createObjectURL(file));
    }
  };

  const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDesktopImage(file);
      setDesktopPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!mobileImage || !desktopImage || !name || !variation) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('variation', variation);
    formData.append('mobile', mobileImage);
    formData.append('desktop', desktopImage);
    console.log('Uploading section:', formData);
    try {
      const result = await dispatch(uploadStoreSection(formData));
      if (uploadStoreSection.fulfilled.match(result)) {
        setMobileImage(null);
        setDesktopImage(null);
        setMobilePreview(null);
        setDesktopPreview(null);
        setName('');
        setVariation('');
        console.log('Section uploaded:', result.payload);
      } else {
        console.error('Upload failed:', result.payload);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div className="shadow space-y-3 w-[280px] font-[Outfit] my-8 p-4 bg-white rounded-lg text-sm overflow-clip">
      <h4 className="text-center font-semibold mb-4">Upload Section</h4>

      <div>
        <label className="block text-gray-700">Section Name:</label>
        <input
          type="text"
          value={name}
          placeholder="e.g. Home Banner"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-gray-700">Variation:</label>
        <input
          type="text"
          value={variation}
          placeholder="e.g. v1"
          onChange={(e) => setVariation(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block">Mobile Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMobileImageChange}
          className="file:bg-gray-800 file:text-white file:px-4 file:py-2 file:rounded-md"
        />
        {mobilePreview && <img src={mobilePreview} alt="Mobile Preview" className="mt-1 w-12 h-12 object-cover rounded-md" />}
      </div>

      <div>
        <label className="block">Desktop Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleDesktopImageChange}
          className="file:bg-gray-800 file:text-white file:px-4 file:py-2 file:rounded-md"
        />
        {desktopPreview && <img src={desktopPreview} alt="Desktop Preview" className="mt-1 w-12 h-12 object-cover rounded-md" />}
      </div>

      <button
        onClick={handleUpload}
        disabled={isLoading || !mobileImage || !desktopImage || !name || !variation}
        className={`w-full py-2 rounded-md text-white font-medium transition ${
          !mobileImage || !desktopImage || !name || !variation
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gray-800 hover:bg-gray-900'
        }`}
      >
        {isLoading ? <TbLoader3 className="animate-spin mx-auto" size={20} /> : 'Upload Section'}
      </button>
    </div>
  );
};

export default UploadStoreSection;
