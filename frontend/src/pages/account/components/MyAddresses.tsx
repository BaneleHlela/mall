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
import { useAppSelector } from '../../../app/hooks';
import { BiArrowBack } from 'react-icons/bi';

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
  const { isDarkMode } = useAppSelector((state) => state.theme);
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
    <div className={`h-screen w-full max-w-md mx-auto ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'} flex flex-col p-6 space-y-2`}>
      {/* Back Button & Header */}
      <div className="relative flex items-center justify-center w-full">
        <BiArrowBack 
          onClick={onBack}
          className={`absolute left-0 rounded-full ${isDarkMode ? ' bg-[#1f1f23] border-gray-800' : 'bg-gray-100 border-gray-200 text-gray-900'} p-2 text-[35px]`}
        />
        <span className="text-lg">My Addresses</span>
      </div>

      {/* Add Address Button */}
      <div className={`w-full border ${isDarkMode ? 'text-white bg-[#1f1f23] border-gray-800' : 'border-gray-200 text-gray-900'} rounded-[20px] p-4 mt-4`}>
        <button
          onClick={() => setShowAddForm(true)}
          className={`w-full ${isDarkMode ? ' text-white border-slate-600' : 'bg-white text-gray-900 border-gray-100'} p-3 flex items-center justify-between hover:shadow-lg transition-all duration-300 border-b`}
        >
          <div className="flex items-center space-x-2">
            <GrSearchAdvanced className='text-gray-400 text-[18px]'/>
            <span className="">Add New Address</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Addresses List */}
      <div className={`w-full border ${isDarkMode ? 'text-white bg-[#1f1f23] border-gray-800' : 'border-gray-200 text-gray-900'} rounded-[20px] text-[15px] py-1 overflow-hidden`}>
        {addresses.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="text-gray-400 text-2xl" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No addresses yet</h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Add your first address to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className={`inline-flex items-center gap-2 ${isDarkMode ? 'bg-[#1f1f23] text-white' : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white'} font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]`}
            >
              <FaPlus />
              <span>Add Address</span>
            </button>
          </div>
        ) : (
          addresses.map((address, index) => (
            editingIndex === index ? (
              <EditAddressForm
                key={index}
                address={address}
                onSave={(updatedAddress) => handleEditAddress(index, updatedAddress)}
                onCancel={() => setEditingIndex(null)}
                isLoading={isLoading}
                isDarkMode={isDarkMode}
              />
            ) : (
              <div key={index} className={`p-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : (isDarkMode ? 'bg-gray-600' : 'bg-gray-200')}`}>
                    {index === 0 ? <FaStar className="text-white text-sm" /> : <FaMapMarkerAlt className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'} text-sm`} />}
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{address.nickname}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{address.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {index !== 0 && (
                    <button
                      onClick={() => handleSetPrimary(index)}
                      className={`p-2 text-gray-400 hover:text-amber-600 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-50'}`}
                      title="Set as selected"
                    >
                      {isLoading ? <TbLoader3 className='animate-spin text-sm' /> : <FaRegStar className="text-sm" />}
                    </button>
                  )}
                  <button
                    onClick={() => setEditingIndex(index)}
                    className={`p-2 text-gray-400 hover:text-blue-600 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'}`}
                    title="Edit address"
                  >
                    <FaEdit className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(index)}
                    className={`p-2 text-gray-400 hover:text-red-600 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}
                    title="Delete address"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            )
          ))
        )}
      </div>

      {/* Add Address Form Modal */}
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
  isDarkMode: boolean;
}

const EditAddressForm: React.FC<EditAddressFormProps> = ({ address, onSave, onCancel, isLoading, isDarkMode }) => {
  const [editedAddress, setEditedAddress] = useState<Address>(address);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedAddress);
  };

  return (
    <div className={`p-5 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Current Address Display */}
      <div className={`rounded-xl p-4 mb-5 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        <div className="flex items-center gap-2 mb-2">
          <FaMapMarkerAlt className="text-gray-400" />
          <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Address</h4>
        </div>
        <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm`}>{address.address}</p>
        {(address.lat !== 0 || address.lng !== 0) && (
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Coordinates: {address.lat.toFixed(4)}, {address.lng.toFixed(4)}
          </p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Nickname
          </label>
          <input
            type="text"
            value={editedAddress.nickname}
            onChange={(e) => setEditedAddress({ ...editedAddress, nickname: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500 focus:border-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-gray-900/10 focus:border-gray-300'}`}
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 ${isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white'}`}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={`flex-1 font-semibold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyAddresses;
