import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import LocationPicker from '../../../../components/the_mall/location/LocationPicker';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';


export default function AddStoreAddressPage() {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
    nickname?: string;
  } | null>(null);

  const [nickname, setNickname] = useState('');

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setSelectedLocation({ ...location, nickname });
  };

  const handleSave = async () => {
    console.log('Saving store address:', selectedLocation);
    if (!storeSlug || !selectedLocation) return;

    const updatedStore: Partial<Store> = {
      location: {
        type: 'Point',
        coordinates: [selectedLocation.lng, selectedLocation.lat], // [lng, lat]
        nickname: nickname || '',
        address: selectedLocation.address,
      },
      categories: { products: [], services: [] }, // Add this line
    };

    await dispatch(editStore({ storeSlug, updatedStore: updatedStore as Omit<Store, "id"> }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Store Address</h1>

      <label className="block mb-2 font-medium">Address Nickname</label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="e.g. Main Branch, Warehouse"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <LocationPicker onLocationSelect={handleLocationSelect} />

      <button
        onClick={handleSave}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={!selectedLocation}
      >
        Save Address
      </button>
    </div>
  );
}
