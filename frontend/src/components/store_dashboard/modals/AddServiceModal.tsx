import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createService } from '../../../features/services/servicesSlice';

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  open,
  onClose,
  categories,
}) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    const payload = {
      ...form,
      price: form.price ? Number(form.price) : undefined,
      duration: Number(form.duration),
      store: store._id,
    };

    try {
      await dispatch(createService(payload)).unwrap();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to add service');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#00000036] flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Add Service</h2>
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
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
