import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import type { OrderItem } from '../../../types/orderTypes';
import { formatPrice } from '../../../utils/helperFunctions';

interface UserOrderedItemsProps {
  storeName: string;
  storeSlug?: string;
  storeThumbnail?: string;
  status: string;
  items: OrderItem[];
  orderDate: string;
  onOpenStore: () => void;
  isDarkMode: boolean;
}

const statusBadgeStyles = {
  Delivered: 'bg-emerald-100 text-emerald-800',
  Complete: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-red-100 text-red-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Shipped: 'bg-blue-100 text-blue-800',
} as const;

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const UserOrderedItems: React.FC<UserOrderedItemsProps> = ({ storeName, storeSlug, storeThumbnail, status, items, orderDate, onOpenStore, isDarkMode }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleProductClick = (productSlug: string | undefined, productId: string) => {
    if (!storeSlug) return;
    const targetSlug = productSlug || productId;
    navigate(`/stores/${storeSlug}/product/${targetSlug}#singleProduct`);
  };

  const thumbUrl = 
    storeThumbnail &&
    storeThumbnail !== '//example.com/images/thumbnails/product5.jpg'
      ? storeThumbnail
      : 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png';
      
  const visibleItems = showAll ? items : items.slice(0, 4);
  const hasMore = items.length > 4;

  return (
    <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border rounded-[28px] overflow-hidden shadow-sm`}>
      {/* Header */}
      <button
        type="button"
        onClick={onOpenStore}
        className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
      >
          <div className={`relative w-12 h-12 overflow-hidden rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <img src={thumbUrl} alt={storeName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{storeName}</h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{formatOrderDate(orderDate)}</p>
        </div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm ring-1 ${isDarkMode ? 'bg-slate-800 text-slate-300 ring-slate-700' : 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
          <FaArrowRight />
        </div>
      </button>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm uppercase tracking-[0.2em] font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{items.length} items</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeStyles[status as keyof typeof statusBadgeStyles] || 'bg-slate-100 text-slate-700'}`}>
            {status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {visibleItems.map((item) => (
            <button
              key={item.product._id}
              type="button"
              onClick={() => handleProductClick(item.product.slug, item.product._id)}
              className={`group w-full rounded-3xl p-3 flex flex-col items-center gap-2 text-left transition ${isDarkMode ? 'bg-slate-950 hover:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100'}`}
            >
              <div className="relative w-full aspect-square rounded-[8px] overflow-hidden">
                <img
                  src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1495121605193-b116b5b9c6d3?auto=format&fit=crop&w=300&q=60'}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute right-2 bottom-2 w-7 h-7 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-black">
                  <FaPlus className="w-3 h-3" />
                </div>
              </div>
              <div className="w-full">
                <h4 className={`text-md font-semibold leading-5 truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.product.name}</h4>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{formatPrice(item.price)}</p>
              </div>
            </button>
          ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className={`mt-4 w-full rounded-3xl border px-4 py-3 text-sm font-semibold transition ${isDarkMode ? 'border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
          >
            {showAll ? 'Show less' : `Show ${items.length - 4} more`}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserOrderedItems;
