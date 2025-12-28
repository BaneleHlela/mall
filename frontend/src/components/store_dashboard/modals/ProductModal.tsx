import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { createProduct, updateProduct } from '../../../features/products/productsSlice';
import { TbLoader3 } from 'react-icons/tb';
import type { Product } from '../../../types/productTypes';

// ts Errors
// You shouldn't be able to add save a product without prices for its variations.
// Be more specific about the error, e.g. "Price for variation 'Red' is missing." or "Products require at least one image" Not just "failed to add product"
// Confirm edit product
// UI

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

  console.log(imageUrls);

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
      // Calculate how many images can be uploaded based on existing image URLs
      const remainingImagesCount = 5 - imageUrls.length;
      // If there are more images selected than the remaining count, slice the excess
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
      // Update the images state by appending the new images, ensuring no more than 5 in total
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

    // Validation
    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (!form.description.trim()) {
      setError('Product description is required.');
      return;
    }

    // if (!form.category) {
    //   setError('Please select a category.');
    //   return;
    // }

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
            <label className="block text-sm font-medium">Marking</label>
            <input
              name="marking"
              value={form.marking}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
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
          {variations.length === 0 && (
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border mt-1"
                required
              />
            </div>
          )}
          


          {variations.length > 0 && (
            <div>
              <label className="text-sm font-medium">Set Prices</label>
              <div className="space-y-2 mt-2">
                {variations.map((variation) => (
                  <div key={variation} className="flex items-center gap-2">
                    <span className="text-sm w-1/2">{variation}</span>
                    <input
                      type="number"
                      className="w-1/2 px-3 py-2 rounded border"
                      value={priceByVariation[variation] || ''}
                      onChange={(e) => handlePriceChange(variation, e.target.value)}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full bg-amber-200 flex justify-center">
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
            {isLoading ? <TbLoader3 className='w-6 h-6 animate-spin mx-auto' /> : `${product ? 'Edit Product' : 'Create Product'}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

