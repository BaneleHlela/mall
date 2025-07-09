import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createPackage } from '../../../features/packages/packagesSlice';

interface AddPackageModalProps {
  open: boolean;
  onClose: () => void;
}

const AddPackageModal: React.FC<AddPackageModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    durationCount: '',
    durationFormat: 'months',
    label: '',
    frequency: 'once',
  });

  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
    }
    setFeatureInput('');
  };

  const handleRemoveFeature = (feature: string) => {
    setFeatures((prev) => prev.filter((f) => f !== feature));
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    const payload = {
      store: store._id,
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      duration: {
        expires: true,
        count: Number(form.durationCount),
        format: form.durationFormat,
      },
      frequency: form.frequency,
      label: form.label.trim(),
      features,
    };

    try {
      await dispatch(createPackage(payload)).unwrap();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to add package');
    }
  };

  if (!open) return null;
  console.log(form)
  return (
    <div className="fixed inset-0 h-screen overflow-scroll hide-scrollbar bg-[#00000048] flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold ">Add Package</h2>
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
            <label className="block text-sm font-medium ">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium ">Duration Count</label>
              <input
                name="durationCount"
                type="number"
                value={form.durationCount}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium ">Duration Format</label>
              <select
                name="durationFormat"
                value={form.durationFormat}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border mt-1"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium ">Frequency</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
            >
              <option value="once">Once</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium ">Label</label>
            <input
              name="label"
              value={form.label}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              placeholder="e.g. Best Value"
            />
          </div>

          {/* Features input (variation style) */}
          <div>
            <label className="text-sm font-medium ">Features</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="e.g. Unlimited Access"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-blue-500  px-4 py-2 rounded text-sm"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded-full"
                >
                  {feature}
                  <IoClose
                    className="ml-1 cursor-pointer"
                    size={16}
                    onClick={() => handleRemoveFeature(feature)}
                  />
                </span>
              ))}
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
            Add Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
