import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllProducts } from '../../features/products/productsSlice';
import { X, Plus, Check } from 'lucide-react';
import type { Product } from '../../types/productTypes';

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProductIds: string[];
  onToggle: (productId: string) => void;
  onDone?: () => void;
  maxLimit?: number;
}

const SearchPostProductModal: React.FC<ProductSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedProductIds,
  onToggle,
  onDone,
  maxLimit = 10,
}) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => (state.products as any).products || []);
  const stores = useAppSelector((state) => (state.stores as any).storesBySlug || {});
  const storeSlugs = useAppSelector((state) => (state.stores as any).storeSlugs || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      dispatch(fetchAllProducts() as any)
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, dispatch]);

  const productsList = React.useMemo(() => {
    let filtered = allProducts;

    if (selectedStoreSlug) {
      filtered = filtered.filter((p: Product) => p.store?.slug === selectedStoreSlug);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p: Product) =>
        p.name.toLowerCase().includes(q) ||
        p.store?.name?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [allProducts, searchQuery, selectedStoreSlug]);

  const handleProductToggle = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      onToggle(productId);
    } else if (selectedProductIds.length >= maxLimit) {
      return;
    }
    onToggle(productId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-stone-800 to-stone-700 p-5 text-white flex-shrink-0">
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
                  <Plus className="text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Add Products</h2>
                  <p className="text-white/80 text-sm">
                    {selectedProductIds.length} / {maxLimit} selected
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <div className="relative flex-1">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-500/20 transition-all outline-none"
                />
              </div>
              <select
                value={selectedStoreSlug}
                onChange={(e) => setSelectedStoreSlug(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-500/20 transition-all outline-none bg-white min-w-[20vh]"
              >
                <option value="">All Stores</option>
                {storeSlugs.map((slug: string) => (
                  <option key={slug} value={slug}>
                    {stores[slug]?.name || slug}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Grid */}
            <div className="flex-1 overflow-y-auto p-4 bg-stone-50">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
                </div>
              ) : productsList.length === 0 ? (
                <p className="text-center text-stone-500 py-8">No products available</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {productsList.map((product: Product) => {
                    const isSelected = selectedProductIds.includes(product._id);
                    const atMaxLimit = selectedProductIds.length >= maxLimit && !isSelected;

                    return (
                      <motion.div
                        key={product._id}
                        whileTap={{ scale: atMaxLimit ? 1 : 0.97 }}
                        onClick={() => !atMaxLimit && handleProductToggle(product._id)}
                        className={`
                          p-3 border rounded-xl cursor-pointer transition-all relative
                          ${isSelected
                            ? 'border-stone-700 bg-stone-100 shadow-sm'
                            : atMaxLimit
                              ? 'border-stone-200 bg-stone-50 opacity-50 cursor-not-allowed'
                              : 'border-stone-200 hover:border-stone-300 hover:bg-white hover:shadow-sm'}
                        `}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-stone-800 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                        {product.images && product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                        )}
                        <p className="text-sm font-medium truncate text-stone-800">{product.name}</p>
                        <p className="text-xs text-stone-500 truncate mt-0.5">
                          {product.store?.name}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center flex-shrink-0">
              <span className="text-sm text-stone-500">
                {selectedProductIds.length} of {maxLimit} products selected
                {selectedProductIds.length >= maxLimit && (
                  <span className="text-stone-800 font-medium ml-1">(maximum reached)</span>
                )}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDone?.();
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-stone-700 to-stone-600 text-white rounded-xl text-sm font-medium hover:from-stone-600 hover:to-stone-500 transition-all shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchPostProductModal;
