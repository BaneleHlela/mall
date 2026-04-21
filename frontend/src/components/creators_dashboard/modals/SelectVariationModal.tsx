import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SelectVariationModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (variation: string) => void;
}

const SEARCH_POST_VARIATIONS = [
  {
    id: 'basicProductCarousel',
    name: 'Basic Product Carousel',
    description: 'Simple carousel displaying products with name and price',
    icon: '🎠',
  },
  {
    id: 'basicStoreCarousel',
    name: 'Basic Store Carousel',
    description: 'Carousel displaying stores with store information',
    icon: '🏪',
  },
  {
    id: 'simpleStoreCarousel',
    name: 'Simple Store Carousel',
    description: 'Simplified store carousel with minimal details',
    icon: '🛍️',
  },
  {
    id: 'carouselWithJSXAndProducts',
    name: 'Carousel with JSX and Products',
    description: 'Advanced carousel combining custom JSX with product data',
    icon: '⚡',
  },
];

const SelectVariationModal: React.FC<SelectVariationModalProps> = ({ open, onClose, onSelect }) => {
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  const handleSelect = (variationId: string) => {
    onSelect(variationId);
    setSelectedVariation(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Select Search Post Variation</h2>
                  <p className="text-sm text-slate-600 mt-1">Choose how you want to display your search posts</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SEARCH_POST_VARIATIONS.map((variation) => (
                    <motion.button
                      key={variation.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(variation.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedVariation === variation.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{variation.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{variation.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{variation.description}</p>
                        </div>
                        {selectedVariation === variation.id && (
                          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => selectedVariation && handleSelect(selectedVariation)}
                  disabled={!selectedVariation}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  Create Post
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SelectVariationModal;
