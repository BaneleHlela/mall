import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../app/store';
import { updateUser } from '../../../features/user/userSlice';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrSearchAdvanced } from 'react-icons/gr';
import { TbLoader3 } from 'react-icons/tb';
import AddUserAddressPage from '../../profile/address/AddUserAddressPage';

interface MyAddressesProps {
  onBack: () => void;
}

interface Address {
  nickname: string;
  lat: number;
  lng: number;
  address: string;
}

const MyAddresses: React.FC<MyAddressesProps> = ({ onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [newAddress, setNewAddress] = useState<Address>({
    nickname: '',
    lat: 0,
    lng: 0,
    address: '',
  });

  const addresses = user?.locations || [];

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedLocations = [...addresses, newAddress];
      await dispatch(updateUser({ locations: updatedLocations }) as any);
      setNewAddress({ nickname: '', lat: 0, lng: 0, address: '' });
      setShowAddForm(false);
      alert('Address added successfully!');
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  const handleEditAddress = async (index: number, updatedAddress: Address) => {
    try {
      const updatedLocations = [...addresses];
      updatedLocations[index] = updatedAddress;
      await dispatch(updateUser({ locations: updatedLocations }) as any);
      setEditingIndex(null);
      alert('Address updated successfully!');
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  const handleDeleteAddress = async (index: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const updatedLocations = addresses.filter((_, i) => i !== index);
        await dispatch(updateUser({ locations: updatedLocations }) as any);
        alert('Address deleted successfully!');
      } catch (error) {
        console.error('Failed to delete address:', error);
      }
    }
  };

  const handleSetPrimary = async (index: number) => {
    try {
      const updatedLocations = [...addresses];
      const primaryAddress = updatedLocations.splice(index, 1)[0];
      updatedLocations.unshift(primaryAddress);
      await dispatch(updateUser({ locations: updatedLocations }) as any);
      alert('Primary address updated successfully!');
    } catch (error) {
      console.error('Failed to set primary address:', error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-y-scroll hide-scrollbar pb-[7vh]">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-6 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoChevronBackOutline className='text-white text-xl'/>
            </button>
            <h1 className="text-xl font-semibold text-white">My Addresses</h1>
          </div>
        </div>
      </div>

      {/* Add Address Button */}
      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {/* Add Address Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-4 flex items-center gap-4 hover:shadow-xl transition-all duration-300 border border-gray-100 group active:scale-[0.98]"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200/50 group-hover:scale-110 transition-transform duration-300">
            <GrSearchAdvanced className='text-white text-xl'/>
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-800">Add New Address</p>
            <p className="text-sm text-gray-500">Search for your location</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Addresses List */}
        <div className="mt-6 space-y-1">
          {addresses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 py-12 text-center border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No addresses yet</h3>
              <p className="text-gray-500 mb-6">Add your first address to get started</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
              >
                <FaPlus />
                <span>Add Address</span>
              </button>
            </div>
          ) : (
            addresses.map((address, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                {editingIndex === index ? (
                  <EditAddressForm
                    address={address}
                    onSave={(updatedAddress) => handleEditAddress(index, updatedAddress)}
                    onCancel={() => setEditingIndex(null)}
                    isLoading={isLoading}
                  />
                ) : (
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        index === 0 
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-200/50' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200'
                      }`}>
                        {index === 0 ? (
                          <FaStar className="text-white text-lg" />
                        ) : (
                          <FaMapMarkerAlt className="text-gray-500 text-lg" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {address.nickname}
                          </h3>
                          {index === 0 && (
                            <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{address.address}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {index !== 0 && (
                          <button
                            onClick={() => handleSetPrimary(index)}
                            className="p-2.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                            title="Set as selected"
                          >
                            {isLoading ? (
                              <TbLoader3 className='animate-spin text-lg' />
                            ) : (
                              <FaRegStar className="text-lg" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => setEditingIndex(index)}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          title="Edit address"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(index)}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete address"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Address Form Modal */}
      {/* {showAddForm && (
        <div className="fixed inset-0 bg-black/0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-amber-600 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Address</h2>
              <form onSubmit={handleAddAddress} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Nickname
                  </label>
                  <input
                    type="text"
                    value={newAddress.nickname}
                    onChange={(e) => setNewAddress({ ...newAddress, nickname: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    placeholder="Home, Work, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Full Address
                  </label>
                  <textarea
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all resize-none"
                    rows={3}
                    placeholder="Enter full address"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={newAddress.lat}
                      onChange={(e) => setNewAddress({ ...newAddress, lat: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={newAddress.lng}
                      onChange={(e) => setNewAddress({ ...newAddress, lng: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isLoading ? 'Adding...' : 'Add Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
      {showAddForm && (
        <div className="fixed inset-0 h-screen w-screen">
          <AddUserAddressPage show={showAddForm}/>
        </div>  
      )}
    </div>
  );
};

interface EditAddressFormProps {
  address: Address;
  onSave: (address: Address) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const EditAddressForm: React.FC<EditAddressFormProps> = ({ address, onSave, onCancel, isLoading }) => {
  const [editedAddress, setEditedAddress] = useState<Address>(address);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedAddress);
  };

  return (
    <div className="p-5">
      {/* Current Address Display */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <FaMapMarkerAlt className="text-gray-400" />
          <h4 className="text-sm font-medium text-gray-600">Current Address</h4>
        </div>
        <p className="text-gray-700 text-sm">{address.address}</p>
        {(address.lat !== 0 || address.lng !== 0) && (
          <p className="text-xs text-gray-500 mt-1">
            Coordinates: {address.lat.toFixed(4)}, {address.lng.toFixed(4)}
          </p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Nickname
          </label>
          <input
            type="text"
            value={editedAddress.nickname}
            onChange={(e) => setEditedAddress({ ...editedAddress, nickname: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyAddresses;
