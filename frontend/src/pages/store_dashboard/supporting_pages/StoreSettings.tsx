import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { FaCog, FaMapMarkerAlt, FaClock, FaPhone, FaShareAlt, FaInfoCircle, FaImage, FaTrash } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import type { RootState } from '../../../app/store';
import { fetchStoreBySlug } from '../../../features/stores/storeSlice';

const StoreSettings = () => {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { store, isLoading } = useSelector((state: RootState) => state.storeAdmin);

  useEffect(() => {
    if (storeSlug && !store) {
      dispatch(fetchStoreBySlug(storeSlug) as any);
    }
  }, [dispatch, storeSlug, store]);

  const settingsOptions = [
    { id: 'logo', label: 'Logo', icon: FaImage, linkTo: `/dashboard/${storeSlug}/settings/logo` },
    { id: 'basic', label: 'Name & Contact', icon: FaPhone, linkTo: `/dashboard/${storeSlug}/settings/basic` },
    { id: 'trade', label: 'Trade Options', icon: FaCog, linkTo: `/dashboard/${storeSlug}/settings/trade` },
    { id: 'operating-hours', label: 'Operating Hours', icon: FaClock, linkTo: `/dashboard/${storeSlug}/settings/operating-hours` },
    { id: 'location', label: 'Location', icon: FaMapMarkerAlt, linkTo: `/dashboard/${storeSlug}/settings/location` },
    { id: 'socials', label: 'Socials', icon: FaShareAlt, linkTo: `/dashboard/${storeSlug}/settings/socials` },
    { id: 'about', label: 'About', icon: FaInfoCircle, linkTo: `/dashboard/${storeSlug}/settings/about` },
  ];

  const handleDeleteStore = () => {
    // TODO: Implement delete store functionality
    console.log('Delete store clicked');
  };

  if (isLoading) {
    return (
      <div className="h-full w-full bg-stone-100 flex items-center justify-center">
        <div className="text-stone-600">Loading store settings...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col items-center">
      <div className="flex flex-col justify-between h-full w-full max-w-md">
        {/* Top Section - Store Profile */}
        <div className="bg-white py-[4vh] px-[1vh] flex flex-col items-center">
          <div className="relative mb-[.8vh]">
            <div className="w-[12vh] h-[12vh] rounded-full overflow-hidden border-[.35vh] border-stone-200">
              <img
                src={store?.thumbnails?.profily || store?.thumbnail || '/default-store.png'}
                alt="Store Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h2 className="text-[2.5vh] font-semibold text-stone-800 mb-[.5vh]">
            {store?.name || 'Store Name'}
          </h2>
          {/* Location display */}
          <div onClick={() => navigate(`/dashboard/${store?.slug}/settings/location`)} className="relative flex items-center justify-between w-full py-[.5vh] px-[1vh] shadow border border-gray-100 rounded-full">
            <FaMapMarkerAlt className="ml-[.2vh]" />
            <p className='max-w-[80%] line-clamp-1 font-[600] capitalize'>
              {store?.location?.address || store?.locations?.[0]?.address || 'No location set'}
            </p>
            <IoMdArrowDropdown className='text-[2.5vh]'/>
          </div>
        </div>

        {/* Middle Section - Settings Options */}
        <div className="flex-1 bg-white">
          <div className="max-w-md mx-auto space-y-[.35vh] px-[.8vh]">
            {settingsOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => window.location.href = option.linkTo}
                  className="w-full bg-white rounded-lg px-[1.5vh] py-[1.2vh] flex items-center justify-between hover:shadow-md transition-shadow border border-stone-200 hover:border-stone-300"
                >
                  <div className="flex items-center">
                    <IconComponent className="mr-[1.2vh]" size={20} />
                    <span className="text-stone-800 font-medium">{option.label}</span>
                  </div>
                  <div className="">
                    <svg className="w-[2.2vh] h-[2.2vh]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Delete Store */}
        <div className="py-6 bg-white mb-[5.5vh]">
          <div className="max-w-md mx-[.5vh]">
            <button
              onClick={handleDeleteStore}
              className="w-full bg-red-200 hover:bg-red-700 text-red-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaTrash className="mr-2" />
              Delete Store
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default StoreSettings;