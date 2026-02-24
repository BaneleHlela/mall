import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { createProduct, updateProduct } from '../../../features/products/productsSlice';
import { TbLoader3 } from 'react-icons/tb';
import type { Product } from '../../../types/productTypes';
import { FiPackage, FiPlus, FiX } from 'react-icons/fi';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  product?: Product; 
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  categories,
  product,
}) => {
  const dispatch = useAppDispatch();
  const { store } = useAppSelector((state) => state.storeAdmin);
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const [form, setForm] = useState({
    name: '',
    description: '',
    stockQuantity: 0,
    category: '',
    isActive: false,
    tags: '',
    price: 0,
    marking: '',
  });

  const [variations, setVariations] = useState<string[]>([]);
  const [variationInput, setVariationInput] = useState('');
  const [priceByVariation, setPriceByVariation] = useState<{ [variation: string]: number }>({});
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        stockQuantity: product.stockQuantity || 0,
        category: product.category || '',
        isActive: product.isActive || false,
        tags: (product.tags || []).join(', '),
        price: product.price || 0,
        marking: product.marking || '',
      });
      setVariations(product.variations || []);
      setPriceByVariation(
        product.prices?.reduce((acc, { variation, amount }) => {
          acc[variation] = amount;
          return acc;
        }, {} as { [variation: string]: number }) || {}
      );
      setImages([]);
      setImageUrls([...product.images])
    }
  }, [product]);

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
      setPriceByVariation((prev) => ({ ...prev, [trimmed]: 0 }));
    }
    setVariationInput('');
  };

  const handleRemoveVariation = (tag: string) => {
    setVariations((prev) => prev.filter((v) => v !== tag));
    setPriceByVariation((prev) => {
      const updated = { ...prev };
      delete updated[tag];
      return updated;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const remainingImagesCount = 5 - imageUrls.length;
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
      setImages((prev) => [...prev, ...filesToAdd].slice(0, 5));
    }
  };
  

  const handlePriceChange = (variation: string, value: string) => {
    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      setPriceByVariation((prev) => ({ ...prev, [variation]: amount }));
    }
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (!form.description.trim()) {
      setError('Product description is required.');
      return;
    }

    if (variations.length === 0) {
      if (form.price <= 0) {
        setError('Product price must be greater than 0.');
        return;
      }
    } else {
      const missingPrices = variations.filter(v => !priceByVariation[v] || priceByVariation[v] <= 0);
      if (missingPrices.length > 0) {
        setError(`Prices are required for variations: ${missingPrices.join(', ')}`);
        return;
      }
    }

    if (imageUrls.length === 0 && images.length === 0) {
      setError('At least one image is required for the product.');
      return;
    }

    if (form.stockQuantity < 0) {
      setError('Stock quantity cannot be negative.');
      return;
    }

    if (!store?._id) {
      setError('Store not found');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('stockQuantity', String(form.stockQuantity));
    formData.append('category', form.category);
    formData.append('isActive', String(form.isActive));
    formData.append('marking', form.marking);
    formData.append('store', store._id);
    formData.append('imageUrls', JSON.stringify(imageUrls));
  
    formData.append('variations', JSON.stringify(variations));
  
    if (variations.length > 0) {
      const prices = variations.map((variation) => ({
        variation,
        amount: priceByVariation[variation] || 0,
      }));
      formData.append('prices', JSON.stringify(prices));
    } else {
      formData.append('price', String(form.price)); 
    }
  
    const tagsArray = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    formData.append('tags', JSON.stringify(tagsArray));
  
    images.forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      if (product?._id) {
        await dispatch(updateProduct({ id: product._id, data: formData })).unwrap();
      } else {
        await dispatch(createProduct(formData)).unwrap();
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save product');
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
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-5 text-white">
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
              <FiPackage className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{product ? 'Edit Product' : 'Add Product'}</h2>
              <p className="text-white/80 text-sm">
                {product ? 'Update product details' : 'Create a new product'}
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
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                placeholder="Enter product name"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none bg-white"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none"
                placeholder="Describe your product..."
                required
              />
            </div>

            {/* Marking & Stock Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Marking</label>
                <input
                  name="marking"
                  value={form.marking}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  placeholder="e.g. New, Sale"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Stock Quantity</label>
                <input
                  name="stockQuantity"
                  type="number"
                  value={form.stockQuantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  min="0"
                />
              </div>
            </div>

            {/* Variations */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Variations</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={variationInput}
                  onChange={(e) => setVariationInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddVariation())}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  placeholder="e.g. Red, Medium, Large"
                />
                <button
                  type="button"
                  onClick={handleAddVariation}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm"
                >
                  <FiPlus />
                </button>
              </div>
              {variations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {variations.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm border border-purple-200"
                    >
                      {tag}
                      <FiX
                        className="cursor-pointer hover:text-red-500 transition-colors"
                        size={14}
                        onClick={() => handleRemoveVariation(tag)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            {variations.length === 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">R</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            )}

            {/* Variation Prices */}
            {variations.length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Set Prices for Variations</label>
                <div className="space-y-2">
                  {variations.map((variation) => (
                    <div key={variation} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-700 flex-1">{variation}</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">R</span>
                        <input
                          type="number"
                          className="w-28 pl-7 pr-3 py-2 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-sm"
                          value={priceByVariation[variation] || ''}
                          onChange={(e) => handlePriceChange(variation, e.target.value)}
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Images */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Product Images <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
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
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <TbLoader3 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                product ? 'Update Product' : 'Create Product'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

