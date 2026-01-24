import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createService, updateService } from '../../../features/services/servicesSlice';
import type { Service } from '../../../types/serviceTypes';

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  service?: Service;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  open,
  onClose,
  categories,
  service,
}) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    performers: [] as string[],
  });
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name,
        description: service.description,
        price: service.price?.toString() || '',
        duration: service.duration.toString(),
        category: service.category || '',
        performers: service.performers?.map(p => typeof p === 'string' ? p : p._id) || [],
      });
      setImages([]);
      setImageUrls(service.images ? [...service.images] : []);
    } else {
      setForm({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        performers: [],
      });
      setImages([]);
      setImageUrls([]);
    }
  }, [service]);

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
      const remainingImagesCount = 3 - imageUrls.length;
      // If there are more images selected than the remaining count, slice the excess
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
      // Update the images state by appending the new images, ensuring no more than 3 in total
      setImages((prev) => [...prev, ...filesToAdd].slice(0, 3));
    }
  };

  const handlePerformerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setForm((prev) => ({ ...prev, performers: selected }));
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price ? form.price : '');
    formData.append('duration', form.duration);
    formData.append('category', form.category);
    if (!service) {
      formData.append('store', store._id);
    }
    formData.append('performers', JSON.stringify(form.performers));

    formData.append('imageUrls', JSON.stringify(imageUrls));

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      if (service && service._id) {
        await dispatch(updateService({ id: service._id, data: formData })).unwrap();
      } else {
        await dispatch(createService(formData)).unwrap();
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || `Failed to ${service ? 'update' : 'add'} service`);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#00000036] flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">{service ? 'Edit' : 'Add'} Service</h2>
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

          <div>
            <label className="block text-sm font-medium ">Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">Price (optional)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              placeholder="e.g. 49.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">Duration (minutes)</label>
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
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
            <div className="flex flex-row">
              {imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={url}
                        alt={`existing-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <IoClose
                        size={16}
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        onClick={() =>
                          setImageUrls((prev) => prev.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <IoClose
                        size={16}
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        onClick={() =>
                          setImages((prev) => prev.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {store?.team && store.team.length > 1 && (
            <div>
              <label className="block text-sm font-medium ">Performers</label>
              <select
                multiple
                value={form.performers}
                onChange={handlePerformerChange}
                className="w-full px-3 py-2 rounded border mt-1"
              >
                {store.team.map((member: any) => (
                  <option key={member.member._id} value={member.member._id}>
                    {member.member.firstName} {member.member.lastName} ({member.role})
                  </option>
                ))}
              </select>
            </div>
          )}

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
            {service ? 'Update' : 'Add'} Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
