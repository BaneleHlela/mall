import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoadingButton  from '../../../../components/the_mall/buttons/LoadingButton';

const mysweetalert = withReactContent(Swal);

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

  const tradeOptions = [
    { key: 'products', label: 'Products (Food, etc.)', description: 'Physical goods like food, clothing, or electronics.' },
    { key: 'services', label: 'Services (Plumbing, etc.)', description: 'Professional services like repairs or consultations.' },
    { key: 'packages', label: 'Packages (Driver\'s license, etc.)', description: 'Pre-packaged offerings like courses or licenses.' }
  ];

  const handleSave = async () => {
    if (!store) {
      mysweetalert.fire({
        icon: "error",
        title: "Store Not Found",
        text: "Cannot update settings because the store was not loaded.",
        confirmButtonColor: "#d33"
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
        confirmButtonColor: "#3085d6"
      });

    } catch (error) {
      console.error("Failed to update trade settings:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your settings. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className='flex justify-center w-full h-full bg-white'>
      <div className="flex flex-col justify-between items-center w-full max-w-md">
        <h1 className="py-5 text-2xl font-[500] w-full text-center text-shadow-2xs">Trade Settings</h1>
        
        <div className="flex flex-col space-y-4 w-full">
          <p className="text-center text-md text-gray-700 mb-2 py-[2vh]">
            Edit what your store sells
          </p>

          {/* Trade Options */}
          <div className="space-y-[2.5vh] w-full">
            {tradeOptions.map((option) => {
              const selected = trades.includes(option.key);
              return (
                <label
                  key={option.key}
                  htmlFor={option.key}
                  className={`flex items-start w-full gap-[1.5vh] border rounded p-[2vh] transition-all cursor-pointer
                    ${selected ? 'border-[#0b032d] bg-[#f4f3ff]' : 'border-gray-500 hover:border-[#0b032d]/50 hover:bg-gray-50'}`}
                >
                  <input
                    type="checkbox"
                    id={option.key}
                    checked={selected}
                    onChange={(e) => handleTradeToggle(option.key, e.target.checked)}
                    className="mt-[0.5vh] w-[2.2vh] h-[2.2vh] accent-[#0b032d] cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-[2vh] font-medium text-[#0b032d]">{option.label}</span>
                    <span className="text-[1.5vh] text-gray-600 leading-snug">{option.description}</span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* No Selection Message */}
          {trades.length === 0 && (
            <div className="text-center mt-[2vh]">
              <p className="text-[1.6vh] text-gray-500 italic">
                No trade types selected. You can skip this step or choose the ones that match your business.
              </p>
            </div>
          )}
        </div>

        {error && <p className='text-sm text-red-600'>{error}</p>}
        
        {/* Save Button */}
        <div className="w-full flex flex-row justify-center mb-[2vh]">
          <button
            type="button"
            onClick={handleSave}
            className="mt-5 px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
          >
            <LoadingButton isLoading={isLoading} label="Save" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreTradeSettings;
