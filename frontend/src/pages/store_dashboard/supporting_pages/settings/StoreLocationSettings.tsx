import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import LocationPicker from '../../../../components/the_mall/location/LocationPicker';
import { TbLoader3 } from 'react-icons/tb';

const StoreLocationSettings = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);

  const [location, setLocation] = useState<Store['location']>({
    lat: 0,
    lng: 0,
    address: '',
    nickname: '',
  });

  console.log(location);

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

    console.log(updatedStore)

    try {
      const result = await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();
      console.log('Location updated successfully:', result);
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  };

  return (
    <div className="flex justify-center w-full h-full bg-white">
      <div className="w-full flex flex-col justify-between max-w-md shadow-lg px-2">
        <h3 className="text-[2.5vh] text-center py-4 font-semibold text-shadow-2xs">Pick Store Location</h3>
        
        {/* Nickname input */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600 ">🏷 Nickname</label>
          <input
            type="text"
            value={location.nickname || ''}
            placeholder="e.g. Main branch, Madadeni store"
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            className="w-full bg-[#ffffffd0] p-2 border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none rounded"
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
          <div className="text-gray-700 text-sm mt-2 text-center">
            <span className="font-semibold">Selected Address:</span> {location.address}
          </div>
        )}
        {error && <p className='text-[1.8vh] text-center text-red-600'>{error}</p>}
        {/* Save button */}
        <div className="w-full flex justify-center mb-6">
          <button
            type="button"
            onClick={handleSave}
            className="px-[1.5vh] py-[.8vh] text-white bg-[#0b032d] rounded hover:scale-105 hover:opacity-80"
          >
            {isLoading ? <TbLoader3 className='w-[90%] aspect-square animate-spin mx-auto' /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreLocationSettings;
