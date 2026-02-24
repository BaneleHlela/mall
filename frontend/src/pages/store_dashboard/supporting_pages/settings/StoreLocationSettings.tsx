import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import LocationPicker from '../../../../components/the_mall/location/LocationPicker';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaTag, FaCheck, FaSpinner } from 'react-icons/fa';

const mysweetalert = withReactContent(Swal);

const StoreLocationSettings = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);

  const [location, setLocation] = useState<Store['location']>({
    type: 'Point',
    coordinates: [0, 0],
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

  const handleLocationSelect = (selected: { lat: number; lng: number; address: string }) => {
    setLocation(prev => ({
      ...prev,
      coordinates: [selected.lng, selected.lat],
      address: selected.address
    }));
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
      location
    };

    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();
      
      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your store location has been updated.",
        confirmButtonColor: "#7c3aed"
      });
    } catch (error) {
      console.error('Failed to update location:', error);
      
      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your location. Please try again.",
        confirmButtonColor: "#dc2626"
      });
    }
  };

  return (
    <div className="h-full min-h-full w-full bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
              <FaMapMarkerAlt className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Store Location</h1>
              <p className="text-white/60 text-sm">Set your store's address on the map</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Nickname Input */}
          <div className="p-6 border-b border-slate-100">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <FaTag className="text-green-500" />
              Location Nickname
            </label>
            <input
              type="text"
              value={location.nickname || ''}
              placeholder="e.g. Main branch, Downtown store"
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-0 focus:border-green-500 focus:bg-white transition-colors"
            />
            <p className="text-slate-400 text-xs mt-2">Give this location a memorable name</p>
          </div>

          {/* Map Section */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <FaMapMarkerAlt className="text-green-500" />
              Pick Location on Map
            </div>
            
            <div className="rounded-xl overflow-hidden border-2 border-slate-200">
              <LocationPicker onLocationSelect={handleLocationSelect} />
            </div>
          </div>

          {/* Selected Address */}
          {location.address && (
            <div className="px-6 pb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Selected Address</h4>
                    <p className="text-sm text-green-600">{location.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="px-6 pb-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaCheck className="text-sm" />
                  Save Location
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocationSettings;
