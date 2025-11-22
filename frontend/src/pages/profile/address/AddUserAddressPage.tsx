import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import LocationPicker from "../../../components/the_mall/location/LocationPicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../features/user/userSlice";
import { IoChevronBackOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";

const AddUserAddressPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, user } = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const [nickname, setNickname] = useState("");
  const [locationData, setLocationData] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setLocationData(location);
  };

  const handleSubmit = async () => {
    // Validation
    if (!locationData) {
      toast.error("Please select a location", {
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          fontFamily: 'Outfit',
        },
        icon: '❌'
      });
      return;
    }

    if (!nickname.trim()) {
      toast.error("Please enter a nickname", {
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          fontFamily: 'Outfit',
        },
        icon: '❌'
      });
      return;
    }

    try {
      // Get existing addresses and add the new one
      const existingLocations = user?.locations || [];
      const newLocation = {
        nickname: nickname.trim(),
        ...locationData,
      };

      // Show loading toast
      const loadingToast = toast.loading('Adding address...', {
        style: {
          background: '#f8fafc',
          color: '#334155',
          fontFamily: 'Outfit',
        }
      });

      // Dispatch the update action
      await dispatch(updateUser({
        locations: [...existingLocations, newLocation],
      })).unwrap();

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Address added successfully!', {
        style: {
          background: '#f0fdf4',
          color: '#166534',
          fontFamily: 'Outfit',
        },
        icon: '✅',
        duration: 3000
      });

      // Navigate back to addresses page after a short delay
      setTimeout(() => {
        navigate('/account');
      }, 1500);

    } catch (error) {
      console.error('Failed to add address:', error);
      toast.error('Failed to add address. Please try again.', {
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          fontFamily: 'Outfit',
        },
        icon: '❌',
        duration: 4000
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white py-[2.3vh] px-[.8vh]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-[1vh]">
          <div className="flex items-center">
            <button
                onClick={() => navigate('/account')}
                className="mr-[1.5vh] py-[1.5vh] hover:bg-stone-200 rounded-full transition-colors"
            >
                <IoChevronBackOutline className='text-[2.5vh]'/>
            </button>
            <h1 className="text-2xl font-semibold text-stone-800">Add Address</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Nickname Input */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Address Nickname
              </label>
              <input
                type="text"
                placeholder="e.g. Home, Work, Gym"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            {/* Location Picker */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Select Location
              </label>
              <LocationPicker onLocationSelect={handleLocationSelect} />
              {locationData && (
                <div className="mt-3 p-3 bg-stone-50 rounded-lg">
                  <p className="text-sm text-stone-600 line-clamp-1">
                    <strong>Selected Address:</strong> {locationData.address}
                  </p>
                  {/* <p className="text-xs text-stone-500 mt-1">
                    Coordinates: {locationData.lat}, {locationData.lng}
                  </p> */}
                </div>
              )}
            </div>

            {error && (<p className="text-sm text-red-600 text-center">{error}</p>)}

            {/* Submit Button */}
            <div className="flex space-x-3">
              <button
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <TbLoader3 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Save Address'
                )}
              </button>
              <button
                onClick={() => navigate('/account')}
                disabled={isLoading}
                className="flex-1 bg-stone-300 hover:bg-stone-400 disabled:bg-stone-200 text-stone-700 py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserAddressPage;
