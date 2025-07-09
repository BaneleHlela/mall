import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { createProduct } from '../../../features/products/productsSlice';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  categories,
}) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: '',
    isActive: false,
    tags: '',
  });

  const [variations, setVariations] = useState<string[]>([]);
  const [variationInput, setVariationInput] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVariation = () => {
    const trimmed = variationInput.trim();
    if (trimmed && !variations.includes(trimmed)) {
      setVariations((prev) => [...prev, trimmed]);
    }
    setVariationInput('');
  };

  const handleRemoveVariation = (tag: string) => {
    setVariations((prev) => prev.filter((v) => v !== tag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles].slice(-5));
    }
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
    formData.append('price', String(form.price));
    formData.append('stockQuantity', String(form.stockQuantity));
    formData.append('category', form.category);
    formData.append('isActive', String(form.isActive));
    formData.append('store', store._id);

    formData.append('variations', JSON.stringify(variations));

    const tagsArray = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    formData.append('tags', JSON.stringify(tagsArray));

    images.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await dispatch(createProduct(formData)).unwrap();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to add product');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004d] flex items-center justify-center z-50">
      <div className="bg-white max-h-screen overflow-scroll hide-scrollbar w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Product</h2>
          <button onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
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
            <label className="block text-sm font-medium">Description</label>
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
            <label className="block text-sm font-medium">Price</label>
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
            <label className="block text-sm font-medium">Stock Quantity</label>
            <input
              name="stockQuantity"
              type="number"
              value={form.stockQuantity}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Variations</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={variationInput}
                onChange={(e) => setVariationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddVariation())}
                className="w-full px-3 py-2 rounded border"
                placeholder="e.g. Red, Medium"
              />
              <button
                type="button"
                onClick={handleAddVariation}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {variations.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded-full"
                >
                  {tag}
                  <IoClose
                    className="ml-1 cursor-pointer"
                    size={16}
                    onClick={() => handleRemoveVariation(tag)}
                  />
                </span>
              ))}
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
            className="px-4 py-2 rounded text-white bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
