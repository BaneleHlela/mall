import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createRental, updateRental } from '../../../features/rentals/rentalSlice';
import type { Rental } from '../../../types/rentalTypes';
import RichTextEditor from '../../layout_settings/supporting/RichTextEditor';
import { FiPlus, FiX, FiKey, FiClock } from 'react-icons/fi';
import { TbLoader3 } from 'react-icons/tb';

interface AddRentalModalProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  rental?: Rental;
}

const AddRentalModal: React.FC<AddRentalModalProps> = ({
  open,
  onClose,
  categories,
  rental,
}) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const isLoading = useAppSelector((state) => state.rentals.loading);

  const [form, setForm] = useState({
    name: '',
    description: '',
    priceValue: '',
    priceUnit: 'hour',
    durationValue: '',
    durationUnit: 'hour',
    category: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (rental) {
      setForm({
        name: rental.name,
        description: rental.description,
        priceValue: rental.price.value?.toString() || '',
        priceUnit: rental.price.unit || 'hour',
        durationValue: rental.duration.value?.toString() || '',
        durationUnit: rental.duration.unit || 'hour',
        category: rental.category || '',
      });
      setImages([]);
      setImageUrls([...rental.images]);
    } else {
      setForm({
        name: '',
        description: '',
        priceValue: '',
        priceUnit: 'hour',
        durationValue: '',
        durationUnit: 'hour',
        category: '',
      });
      setImages([]);
      setImageUrls([]);
    }
  }, [rental]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const remainingImagesCount = 5 - imageUrls.length;
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
      setImages((prev) => [...prev, ...filesToAdd].slice(0, 5));
    }
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    if (!form.name.trim()) {
      setError('Rental name is required.');
      return;
    }

    if (!form.description.trim()) {
      setError('Rental description is required.');
      return;
    }

    if (!form.priceValue || isNaN(Number(form.priceValue)) || Number(form.priceValue) <= 0) {
      setError('Valid price value is required.');
      return;
    }

    if (!form.durationValue || isNaN(Number(form.durationValue)) || Number(form.durationValue) <= 0) {
      setError('Valid duration value is required.');
      return;
    }


    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', JSON.stringify({ value: parseFloat(form.priceValue), unit: form.priceUnit }));
    formData.append('duration', JSON.stringify({ value: parseInt(form.durationValue), unit: form.durationUnit }));
    formData.append('category', form.category);
    if (!rental) {
      formData.append('store', store._id);
    }

    formData.append('imageUrls', JSON.stringify(imageUrls));

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      if (rental && rental._id) {
        await dispatch(updateRental({ id: rental._id, formData })).unwrap();
      } else {
        await dispatch(createRental(formData)).unwrap();
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || `Failed to ${rental ? 'update' : 'add'} rental`);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-5 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <IoClose className="text-white" size={18} />
          </button>
          
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FiKey className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{rental ? 'Edit Rental' : 'Add Rental'}</h2>
              <p className="text-white/80 text-sm">
                {rental ? 'Update rental details' : 'Create a new rental'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[60vh] hide-scrollbar">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Rental Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                placeholder="Enter rental name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                label=""
                value={form.description}
                onChange={(value) => setForm(prev => ({ ...prev, description: value }))}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">R</span>
                  <input
                    name="priceValue"
                    type="number"
                    value={form.priceValue}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="0.00"
                    required
                  />
                </div>
                <select
                  name="priceUnit"
                  value={form.priceUnit}
                  onChange={handleChange}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-white"
                >
                  <option value="hour">/ hour</option>
                  <option value="day">/ day</option>
                  <option value="night">/ night</option>
                  <option value="week">/ week</option>
                  <option value="month">/ month</option>
                </select>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="durationValue"
                    type="number"
                    value={form.durationValue}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="e.g. 2"
                    required
                  />
                </div>
                <select
                  name="durationUnit"
                  value={form.durationUnit}
                  onChange={handleChange}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-white"
                >
                  <option value="hour">hours</option>
                  <option value="night">nights</option>
                  <option value="day">days</option>
                  <option value="week">weeks</option>
                  <option value="month">months</option>
                </select>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Rental Images</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                <p className="text-xs text-slate-400 mt-2">Upload up to 5 images (existing: {imageUrls.length})</p>
              </div>
            </div>

            {/* Image Previews */}
            {(imageUrls.length > 0 || images.length > 0) && (
              <div className="grid grid-cols-5 gap-2">
                {imageUrls.map((url, index) => (
                  <div key={`existing-${index}`} className="relative aspect-square group">
                    <img
                      src={url}
                      alt={`existing-${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImageUrls(prev => prev.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}

                {images.map((file, index) => (
                  <div key={`new-${index}`} className="relative aspect-square group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <TbLoader3 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                rental ? 'Update Rental' : 'Add Rental'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRentalModal;