import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import OptionsToggler from '../../../../components/layout_settings/supporting/OptionsToggler';

const StoreTradeSettings = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [trades, setTrades] = useState<string[]>([]);

  useEffect(() => {
    if (store?.trades) {
      setTrades(store.trades);
    }
  }, [store]);

  const handleTradeToggle = (tradeType: 'products' | 'services' | 'packages', value: 'Yes' | 'No') => {
    setTrades(prev => {
      if (value === 'Yes') {
        return [...new Set([...prev, tradeType])];
      } else {
        return prev.filter(t => t !== tradeType);
      }
    });
  };

  const handleSave = async () => {
    if (!store) return;

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      trades,
    };

    try {
      const result = await dispatch(editStore({ storeId: store._id, updatedStore })).unwrap();
      console.log('Trade settings updated successfully', result);
      // Optional: trigger toast or success message
    } catch (error) {
      console.error('Failed to update trade settings:', error);
      // Optional: trigger error message
    }
  };

  return (
    <div className="px-2">
      <h1 className="py-5 text-2xl font-[500] w-full text-center">Trade Settings</h1>
      <p className="text-center text-md text-gray-700 mb-5">(Select what your store sells)</p>

      <div className="flex flex-col space-y-4">
        <OptionsToggler
          label="Products (Food, etc.)"
          options={["Yes", "No"]}
          value={trades.includes('products') ? 'Yes' : 'No'}
          onChange={(value) => handleTradeToggle('products', value)}
        />

        <OptionsToggler
          label="Services (Plumbing, etc.)"
          options={["Yes", "No"]}
          value={trades.includes('services') ? 'Yes' : 'No'}
          onChange={(value) => handleTradeToggle('services', value)}
        />

        <OptionsToggler
          label="Packages (Driver's license, etc.)"
          options={["Yes", "No"]}
          value={trades.includes('packages') ? 'Yes' : 'No'}
          onChange={(value) => handleTradeToggle('packages', value)}
        />
      </div>

      <div className="w-full flex justify-center mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StoreTradeSettings;
