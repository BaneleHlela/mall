import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../app/store';
import { updateUser } from '../../../features/user/userSlice';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';
import { GrSearchAdvanced } from 'react-icons/gr';
import { TbLoader3 } from 'react-icons/tb';

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
    <div className="w-full min-h-screen  bg-white py-[2.3vh] px-[.8vh]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-[1vh]">
          <div className="flex items-center">
            <button
                onClick={onBack}
                className="mr-[1.5vh] py-[1.5vh] hover:bg-stone-200 rounded-full transition-colors"
            >
                <IoChevronBackOutline className='text-[2.5vh]'/>
            </button>
            <h1 className="text-2xl font-semibold text-stone-800">My Addresses</h1>
          </div>
          {/* <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <FaPlus className="mr-2" />
            Add Address
          </button> */}
        </div>

        {/* Add Address Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Add New Address</h2>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Nickname
                </label>
                <input
                  type="text"
                  value={newAddress.nickname}
                  onChange={(e) => setNewAddress({ ...newAddress, nickname: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Home, Work, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Full Address
                </label>
                <textarea
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter full address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={newAddress.lat}
                    onChange={(e) => setNewAddress({ ...newAddress, lat: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={newAddress.lng}
                    onChange={(e) => setNewAddress({ ...newAddress, lng: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {isLoading ? 'Adding...' : 'Add Address'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-stone-300 hover:bg-stone-400 text-stone-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add address button */}
        <button
          onClick={() => navigate('/add-user-address')}
          className="flex items-center w-full shadow my-[2vh] rounded-full p-[1vh] space-x-[1vh] border-2 border-stone-200 hover:bg-stone-50 transition-colors"
        >
            <GrSearchAdvanced className='ml-1 text-[2.5vh]'/>
            <p className="">Add Address</p>
        </button>

        {/* Addresses List */}
        <div className="space-y-[2vh]">
          {addresses.length === 0 ? (
            <div className="bg-white p-8 text-center">
              <FaMapMarkerAlt className="mx-auto text-stone-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-stone-600 mb-2">No addresses yet</h3>
              <p className="text-stone-500 mb-4">Add your first address to get started</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Address
              </button>
            </div>
          ) : (
            addresses.map((address, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm py-[1.3vh] px-[2vh]">
                {editingIndex === index ? (
                  <EditAddressForm
                    address={address}
                    onSave={(updatedAddress) => handleEditAddress(index, updatedAddress)}
                    onCancel={() => setEditingIndex(null)}
                    isLoading={isLoading}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-stone-800 mr-2">
                          {address.nickname}
                        </h3>
                        {index === 0 && (
                          <span className="bg-yellow-100 text-yellow-800 text-[1.4vh] font-semibold px-[.8vh] py-[.35vh] rounded-full flex items-center">
                            <FaStar className="mr-1 text-[1.2vh]" />
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-stone-600 mb-2 line-clamp-1">{address.address}</p>
                      {/* {(address.lat !== 0 || address.lng !== 0) && (
                        <p className="text-sm text-stone-500">
                          Coordinates: {address.lat}, {address.lng}
                        </p>
                      )} */}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                        {index !== 0 && (
                            <button
                                onClick={() => handleSetPrimary(index)}
                                className="flex items-center h-fit px-[.8vh] py-[.35vh]  bg-blue-100 text-yellow-800 font-semibold  rounded-full"
                                title="Set as primary"
                            >
                                {isLoading ? <TbLoader3 className='mr-[.5vh] text-[1.2vh] animate-spin mx-auto' /> : <FaRegStar className="mr-[.5vh] text-[1.2vh]" />}
                                <p style={{lineHeight: "1"}} className="leading-0 text-[1.5vh]">Select</p>
                            </button>
                        )}
                        <button
                            onClick={() => setEditingIndex(index)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit address"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => handleDeleteAddress(index)}
                            className="text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete address"
                        >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
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
  <div className="space-y-4">
    <div className="bg-stone-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <h4 className="text-sm font-medium text-stone-700">Full Address</h4>
      </div>
      <p className="text-stone-600 text-sm">{address.address}</p>
      {(address.lat !== 0 || address.lng !== 0) && (
        <p className="text-xs text-stone-500 mt-1">
          Coordinates: {address.lat}, {address.lng}
        </p>
      )}
    </div>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Nickname
        </label>
        <input
          type="text"
          value={editedAddress.nickname}
          onChange={(e) => setEditedAddress({ ...editedAddress, nickname: e.target.value })}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-stone-300 hover:bg-stone-400 text-stone-700 py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  );
};

export default MyAddresses;