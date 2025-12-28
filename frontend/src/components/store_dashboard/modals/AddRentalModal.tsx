import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoClose as IoCloseIcon } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createRental, updateRental } from '../../../features/rentals/rentalSlice';
import type { Rental } from '../../../types/rentalTypes';
import LoadingButton from '../../the_mall/buttons/LoadingButton';
import RichTextEditor from '../../layout_settings/supporting/RichTextEditor';

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
      // Calculate how many images can be uploaded based on existing image URLs
      const remainingImagesCount = 5 - imageUrls.length;
      // If there are more images selected than the remaining count, slice the excess
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
      // Update the images state by appending the new images, ensuring no more than 5 in total
      setImages((prev) => [...prev, ...filesToAdd].slice(0, 5));
    }
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    // Validation
    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (!form.description.trim()) {
      setError('Product description is required.');
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
    <div className="fixed inset-0 bg-[#00000036] flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit] max-h-[80vh] overflow-y-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">{rental ? 'Edit' : 'Add'} Rental</h2>
          <button onClick={onClose}>
            <IoClose size={20} className="" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium ">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <RichTextEditor
            label="Description"
            value={form.description}
            onChange={(value) => setForm(prev => ({ ...prev, description: value }))}
          />

          <div>
            <label className="block text-sm font-medium ">Price</label>
            <div className="flex gap-2">
              <input
                name="priceValue"
                type="number"
                value={form.priceValue}
                onChange={handleChange}
                className="flex-1 px-3 py-2 rounded border mt-1 w-[60%]"
                placeholder="e.g. 49.99"
                required
              />
              <select
                name="priceUnit"
                value={form.priceUnit}
                onChange={handleChange}
                className="px-3 py-2 rounded border mt-1"
              >
                <option value="hour">/ hour</option>
                <option value="day">/ day</option>
                <option value="night">/ night</option>
                <option value="week">/ week</option>
                <option value="month">/ month</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium ">Duration</label>
            <div className="flex gap-2">
              <input
                name="durationValue"
                type="number"
                value={form.durationValue}
                onChange={handleChange}
                className="flex-1 px-3 py-2 rounded border mt-1 w-[60%]"
                required
              />
              <select
                name="durationUnit"
                value={form.durationUnit}
                onChange={handleChange}
                className="px-3 py-2 rounded border mt-1"
              >
                <option value="hour">hours</option>
                <option value="night">nights</option>
                <option value="day">days</option>
                <option value="week">weeks</option>
                <option value="month">months</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            <div className="w-full flex justify-center">
              {(imageUrls.length > 0 || images.length > 0) && (
                <div className="grid grid-cols-5 gap-2 w-full max-w-5xl mt-2">
                  
                  {imageUrls.map((url, index) => (
                    <div key={`existing-${index}`} className="relative aspect-square">
                      <img
                        src={url}
                        alt={`existing-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <IoClose
                        size={16}
                        className="absolute top-1 right-1 cursor-pointer bg-white rounded-full"
                        onClick={() =>
                          setImageUrls(prev => prev.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}

                  {images.map((file, index) => (
                    <div key={`new-${index}`} className="relative aspect-square">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <IoClose
                        size={16}
                        className="absolute top-1 right-1 cursor-pointer bg-white rounded-full"
                        onClick={() =>
                          setImages(prev => prev.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}

                </div>
              )}
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-sm bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className="px-4 py-2 rounded  bg-blue-600"
          >
            {rental ? <LoadingButton isLoading={isLoading} label='Update Rental' /> : <LoadingButton isLoading={isLoading} label='Add Rental' />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRentalModal;