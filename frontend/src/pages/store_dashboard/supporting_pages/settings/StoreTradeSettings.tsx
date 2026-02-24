import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoadingButton from '../../../../components/the_mall/buttons/LoadingButton';
import { 
  FaShoppingBag, 
  FaHandsHelping, 
  FaBox, 
  FaKey, 
  FaHeart,
  FaCheck,
  FaStore
} from 'react-icons/fa';

const mysweetalert = withReactContent(Swal);

interface TradeOption {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

const tradeOptions: TradeOption[] = [
  { 
    key: 'products', 
    label: 'Products', 
    description: 'Physical goods like food, clothing, electronics, or artisan items.',
    icon: FaShoppingBag,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  { 
    key: 'services', 
    label: 'Services', 
    description: 'Professional services like repairs, consultations, or treatments.',
    icon: FaHandsHelping,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  { 
    key: 'packages', 
    label: 'Packages', 
    description: 'Pre-packaged offerings like courses, licenses, or bundled deals.',
    icon: FaBox,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  { 
    key: 'rentals', 
    label: 'Rentals', 
    description: 'Items for rent like equipment, vehicles, or property spaces.',
    icon: FaKey,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  { 
    key: 'donations', 
    label: 'Donations', 
    description: 'Accept charitable donations for causes or community support.',
    icon: FaHeart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200'
  }
];

const StoreTradeSettings = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);

  const [trades, setTrades] = useState<string[]>([]);

  useEffect(() => {
    if (store?.trades) {
      setTrades(store.trades);
    }
  }, [store]);

  const handleTradeToggle = (trade: string, checked: boolean) => {
    if (checked) {
      setTrades(prev => [...new Set([...prev, trade])]);
    } else {
      setTrades(prev => prev.filter(t => t !== trade));
    }
  };

  const handleSave = async () => {
    if (!store) {
      mysweetalert.fire({
        icon: "error",
        title: "Store Not Found",
        text: "Cannot update settings because the store was not loaded.",
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      trades,
    };

    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your trade settings have been updated.",
        confirmButtonColor: "#7c3aed"
      });

    } catch (error) {
      console.error("Failed to update trade settings:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your settings. Please try again.",
        confirmButtonColor: "#dc2626"
      });
    }
  };

  return (
    <div className="h-full min-h-full w-full bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
              <FaStore className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Trade Options</h1>
              <p className="text-white/60 text-sm">Select what your store offers to customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FaStore className="text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">Configure Your Offerings</h3>
              <p className="text-sm text-blue-600">
                Select all trade types that apply to your store. Each option enables specific features in your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Trade Options Grid */}
        <div className="grid gap-4 mb-6">
          {tradeOptions.map((option) => {
            const selected = trades.includes(option.key);
            const IconComponent = option.icon;
            
            return (
              <label
                key={option.key}
                htmlFor={option.key}
                className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2
                  ${selected 
                    ? `${option.bgColor} ${option.borderColor} shadow-lg` 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  id={option.key}
                  checked={selected}
                  onChange={(e) => handleTradeToggle(option.key, e.target.checked)}
                  className="sr-only"
                />
                
                {/* Custom Checkbox */}
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200
                  ${selected 
                    ? `bg-gradient-to-br from-purple-500 to-violet-500 border-purple-500` 
                    : 'border-slate-300 bg-white'
                  }`}
                >
                  {selected && <FaCheck className="text-white text-xs" />}
                </div>
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200
                  ${selected ? option.bgColor : 'bg-slate-100'}`}
                >
                  <IconComponent className={`text-xl ${selected ? option.color : 'text-slate-400'}`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold mb-1 transition-colors
                    ${selected ? 'text-slate-800' : 'text-slate-600'}`}
                  >
                    {option.label}
                  </h3>
                  <p className={`text-sm leading-relaxed
                    ${selected ? 'text-slate-600' : 'text-slate-400'}`}
                  >
                    {option.description}
                  </p>
                </div>
                
                {/* Selected Indicator */}
                {selected && (
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${option.bgColor} ${option.color}`}>
                      Active
                    </span>
                  </div>
                )}
              </label>
            );
          })}
        </div>

        {/* No Selection Message */}
        {trades.length === 0 && (
          <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <FaStore className="text-amber-500 text-sm" />
              </div>
              <p className="text-sm text-amber-700">
                <span className="font-medium">No trade types selected.</span> Choose at least one to enable store features.
              </p>
            </div>
          </div>
        )}

        {/* Selected Count */}
        {trades.length > 0 && (
          <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <FaCheck className="text-green-500 text-sm" />
              </div>
              <p className="text-sm text-green-700">
                <span className="font-medium">{trades.length - 1} trade type{trades.length !== 1 ? 's' : ''} selected.</span> Your store is ready to offer these services.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <LoadingButton isLoading={isLoading} label="Save Changes" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreTradeSettings;
