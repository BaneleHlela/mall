import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';

const StoreAboutSettings = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const [about, setAbout] = useState('');

  useEffect(() => {
    if (store?.about) {
      setAbout(store.about);
    }
  }, [store]);

  const handleSave = async () => {
    if (!store) return;

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      about,
    };

    try {
      const result = await dispatch(editStore({ storeId: store._id, updatedStore })).unwrap();
      console.log('About section updated successfully:', result);
      // Optionally show a success message here
    } catch (error) {
      console.error('Failed to update about section:', error);
      // Optionally show an error message here
    }
  };

  return (
    <div className="w-full px-2">
      <h2 className="text-xl text-center mb-4">About Your Store</h2>

      <textarea
        placeholder={`Write a brief story about your store, what makes it special, and what you offer.
This will appear on your store’s About page and helps visitors connect with your brand. If you're just running a small hobby shop, you can skip this, but a good About section can really help if you plan to grow!`}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        className="w-full h-[300px] border-b bg-[#0000000e] focus:bg-[#00000030] focus:outline-none focus:ring-0 p-3 resize-none"
      />

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

export default StoreAboutSettings;
