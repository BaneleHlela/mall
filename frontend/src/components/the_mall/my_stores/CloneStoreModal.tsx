import React, { useState } from 'react';
import { FiCopy, FiX, FiMapPin, FiPhone, FiMail, FiMessageCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cloneStore } from '../../../features/stores/storeSlice';
import type { Store } from '../../../types/storeTypes';

interface CloneStoreModalProps {
  store: Store;
  isOpen: boolean;
  onClose: () => void;
}

const CloneStoreModal: React.FC<CloneStoreModalProps> = ({ store, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.stores.isLoading);

  const [formData, setFormData] = useState({
    nickname: '',
    address: '',
    lat: '',
    lng: '',
    phone: '',
    email: '',
    whatsapp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cloneData = {
      nickname: formData.nickname || `${store.name} - New Location`,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(formData.lng) || store.location?.coordinates?.[0] || 0,
          parseFloat(formData.lat) || store.location?.coordinates?.[1] || 0,
        ] as [number, number],
        address: formData.address || store.location?.address,
      },
      contact: {
        phone: formData.phone || store.contact?.phone,
        email: formData.email || store.contact?.email,
        whatsapp: formData.whatsapp || store.contact?.whatsapp,
      },
    };

    try {
      await dispatch(cloneStore({ storeId: store._id!, data: cloneData })).unwrap();
      onClose();
      // Reset form
      setFormData({
        nickname: '',
        address: '',
        lat: '',
        lng: '',
        phone: '',
        email: '',
        whatsapp: '',
      });
    } catch (error) {
      console.error('Failed to clone store:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiCopy className="text-white text-[2.5vh]" />
              <h2 className="text-white text-[2.2vh] font-[600]">Clone Store</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <FiX className="text-[2.5vh]" />
            </button>
          </div>
          <p className="text-white/80 text-[1.5vh] mt-1">
            Create a new location for {store.name}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Location Nickname */}
          <div>
            <label className="block text-[1.5vh] font-[500] text-gray-700 mb-1">
              Location Nickname
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="e.g., Sandton Branch"
              className="w-full px-4 py-2 text-[1.6vh] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-[1.5vh] font-[500] text-gray-700 mb-1">
              <FiMapPin className="inline mr-1" />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter the new location address"
              className="w-full px-4 py-2 text-[1.6vh] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[1.5vh] font-[500] text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="text"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                placeholder="-26.2041"
                className="w-full px-4 py-2 text-[1.6vh] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[1.5vh] font-[500] text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="text"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                placeholder="28.0473"
                className="w-full px-4 py-2 text-[1.6vh] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-[1.5vh] font-[500] text-gray-700 mb-2">Contact Details (Optional)</p>
            
            {/* Phone */}
            <div className="mb-3">
              <label className="block text-[1.4vh] text-gray-600 mb-1">
                <FiPhone className="inline mr-1" />
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+27 11 123 4567"
                className="w-full px-4 py-2 text-[1.6vh] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-[1.4vh] text-gray-600 mb-1">
                <FiMail className="inline mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="location@store.co.za"
                className="w-full px-4 py-2 text-[1.6vh] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-[1.4vh] text-gray-600 mb-1">
                <FiMessageCircle className="inline mr-1" />
                WhatsApp
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+27 11 123 4567"
                className="w-full px-4 py-2 text-[1.6vh] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-[1.6vh] font-[500] text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-[1.6vh] font-[500] text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Cloning...
                </>
              ) : (
                <>
                  <FiCopy />
                  Clone Store
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CloneStoreModal;
