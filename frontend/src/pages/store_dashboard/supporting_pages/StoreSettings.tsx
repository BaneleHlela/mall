import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { 
  FaCog, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPhone, 
  FaShareAlt, 
  FaInfoCircle, 
  FaImage, 
  FaTrash,
  FaStore,
  FaChevronRight,
  FaExclamationTriangle
} from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import type { RootState } from '../../../app/store';
import { fetchStoreBySlug } from '../../../features/stores/storeSlice';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const mysweetalert = withReactContent(Swal);

const StoreSettings = () => {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { store, isLoading } = useSelector((state: RootState) => state.storeAdmin);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (storeSlug && !store) {
      dispatch(fetchStoreBySlug(storeSlug) as any);
    }
  }, [dispatch, storeSlug, store]);

  const settingsOptions = [
    { 
      id: 'thumbnails', 
      label: 'Thumbnails', 
      description: 'Manage your store images',
      icon: FaImage, 
      linkTo: `/dashboard/${storeSlug}/settings/thumbnails`,
      color: 'from-pink-500 to-rose-500'
    },
    { 
      id: 'basic', 
      label: 'Name & Contact', 
      description: 'Store name, phone, and email',
      icon: FaPhone, 
      linkTo: `/dashboard/${storeSlug}/settings/basic`,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'trade', 
      label: 'Trade Options', 
      description: 'Products, services, packages & more',
      icon: FaCog, 
      linkTo: `/dashboard/${storeSlug}/settings/trade`,
      color: 'from-purple-500 to-violet-500'
    },
    { 
      id: 'operating-hours', 
      label: 'Operating Hours', 
      description: 'Set your business hours',
      icon: FaClock, 
      linkTo: `/dashboard/${storeSlug}/settings/operating-hours`,
      color: 'from-amber-500 to-orange-500'
    },
    { 
      id: 'location', 
      label: 'Location', 
      description: 'Store address and map',
      icon: FaMapMarkerAlt, 
      linkTo: `/dashboard/${storeSlug}/settings/location`,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'socials', 
      label: 'Social Links', 
      description: 'Connect your social media',
      icon: FaShareAlt, 
      linkTo: `/dashboard/${storeSlug}/settings/socials`,
      color: 'from-indigo-500 to-blue-500'
    },
    { 
      id: 'about', 
      label: 'About', 
      description: 'Your store story',
      icon: FaInfoCircle, 
      linkTo: `/dashboard/${storeSlug}/settings/about`,
      color: 'from-teal-500 to-cyan-500'
    },
  ];

  const handleDeleteStore = async () => {
    const result = await mysweetalert.fire({
      title: 'Delete Store?',
      text: 'This action cannot be undone. All your data will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete store',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // TODO: Implement delete store functionality
      console.log('Delete store confirmed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-full w-full bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full h-full bg-slate-50 max-w-md">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {/* Store Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl overflow-hidden ring-4 ring-white/20">
                {store?.thumbnails?.profily || store?.thumbnail ? (
                  <img
                    src={store?.thumbnails?.profily || store?.thumbnail}
                    alt="Store Thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaStore className="text-4xl" />
                )}
              </div>
            </div>
            
            {/* Store Name */}
            <h1 className="text-2xl font-bold text-white mb-1">
              {store?.name || 'Store Name'}
            </h1>
            
            {store?.slogan && (
              <p className="text-white/60 text-sm mb-4">{store.slogan}</p>
            )}
            
            {/* Location Badge */}
            <button 
              onClick={() => navigate(`/dashboard/${store?.slug}/settings/location`)} 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-all text-sm backdrop-blur-sm border border-white/10"
            >
              <FaMapMarkerAlt className="text-green-400" />
              <span className="max-w-[200px] truncate">
                {store?.location?.address || 'Add location'}
              </span>
              <IoMdArrowDropdown />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Store Settings</h2>
          <p className="text-sm text-slate-500">Manage your store preferences and configuration</p>
        </div>

        {/* Settings Grid */}
        <div className="grid gap-1">
          {settingsOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => navigate(option.linkTo)}
                className="group w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200 border border-slate-100 hover:border-slate-200 text-left"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="text-xl" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                    {option.label}
                  </h3>
                  <p className="text-sm text-slate-500 truncate">
                    {option.description}
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-purple-50 flex items-center justify-center transition-colors">
                  <FaChevronRight className="text-slate-400 group-hover:text-purple-500 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Danger Zone */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Danger Zone</h3>
                <p className="text-sm text-red-600 mb-3">
                  Once you delete your store, there is no going back. Please be certain.
                </p>
                <button
                  onClick={handleDeleteStore}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  <FaTrash className="text-sm" />
                  Delete Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
