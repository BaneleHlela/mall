import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import LocationPicker from '../../../../components/the_mall/location/LocationPicker';

const StoreLocationSettings = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [location, setLocation] = useState<Store['location']>({
    lat: 0,
    lng: 0,
    address: '',
    nickname: '',
  });

  useEffect(() => {
    if (store?.location) {
      setLocation(store.location);
    }
  }, [store]);

  const handleInputChange = (field: keyof Store['location'], value: string | number) => {
    setLocation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!store) return;

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      location
    };

    try {
      const result = await dispatch(editStore({ storeId: store._id, updatedStore })).unwrap();
      console.log('Location updated successfully:', result);
      // Optionally show a success toast
    } catch (error) {
      console.error('Failed to update location:', error);
      // Optionally show an error message
    }
  };

  return (
    <div className="px-2">
      <h3 className="text-xl text-center py-4">Pick Store Location</h3>

      {/* Nickname input */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-600">🏷 Nickname</label>
        <input
          type="text"
          value={location.nickname || ''}
          placeholder="e.g. Main branch, Madadeni store"
          onChange={(e) => handleInputChange('nickname', e.target.value)}
          className="w-full bg-[#ffffffd0] p-2 border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Location picker */}
      <LocationPicker
        onLocationSelect={(selected: { lat: number; lng: number; address: string }) =>
          setLocation(prev => ({
            ...prev,
            lat: selected.lat,
            lng: selected.lng,
            address: selected.address
          }))
        }
      />

      {/* Show picked address */}
      {location.address && (
        <div className="text-gray-700 text-sm mt-2">
          <span className="font-semibold">Selected Address:</span> {location.address}
        </div>
      )}

      {/* Save button */}
      <div className="w-full flex justify-center mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StoreLocationSettings;
