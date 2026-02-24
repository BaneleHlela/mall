import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createService, updateService } from '../../../features/services/servicesSlice';
import type { Service } from '../../../types/serviceTypes';
import { FiPlus, FiX, FiClock, FiCheck } from 'react-icons/fi';
import { TbLoader3 } from 'react-icons/tb';
import { MdOutlineCleaningServices } from 'react-icons/md';

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
  const isLoading = useAppSelector((state) => state.services.loading);

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
      const remainingImagesCount = 3 - imageUrls.length;
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white">
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
              <MdOutlineCleaningServices className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{service ? 'Edit Service' : 'Add Service'}</h2>
              <p className="text-white/80 text-sm">
                {service ? 'Update service details' : 'Create a new service'}
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
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                placeholder="Enter service name"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none bg-white"
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
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none resize-none"
                placeholder="Describe your service..."
                required
              />
            </div>

            {/* Price & Duration Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price <span className="text-slate-400 text-xs">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">R</span>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Duration <span className="text-slate-400 text-xs">(min)</span> <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="duration"
                    type="number"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                    placeholder="e.g. 60"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Service Images</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-emerald-300 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                />
                <p className="text-xs text-slate-400 mt-2">Upload up to 3 images (existing: {imageUrls.length})</p>
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
                      onClick={() => setImageUrls((prev) => prev.filter((_, i) => i !== index))}
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
                      onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Performers */}
            {store?.team && store.team.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Performers</label>
                <select
                  multiple
                  value={form.performers}
                  onChange={handlePerformerChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none bg-white"
                >
                  {store.team.map((member: any) => (
                    <option key={member.member._id} value={member.member._id}>
                      {member.member.firstName} {member.member.lastName} ({member.role})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">Hold Ctrl/Cmd to select multiple</p>
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
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <TbLoader3 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                service ? 'Update Service' : 'Add Service'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
