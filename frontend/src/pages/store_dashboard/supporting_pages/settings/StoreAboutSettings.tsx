import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoadingButton from '../../../../components/the_mall/buttons/LoadingButton';
import { FaInfoCircle, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const mysweetalert = withReactContent(Swal);

const StoreAboutSettings = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);
  const [about, setAbout] = useState('');
  const [validation, setValidation] = useState({ valid: true, message: '' });

  useEffect(() => {
    if (store?.about) {
      setAbout(store.about);
    }
  }, [store]);

  const validateAbout = (text: string): { valid: boolean; message: string } => {
    if (text.trim().length === 0) {
      return { valid: false, message: 'About section cannot be empty' };
    }
    
    if (text.trim().length < 50) {
      return { valid: false, message: 'About section should be at least 50 characters long' };
    }
    
    if (text.trim().length > 2000) {
      return { valid: false, message: 'About section should not exceed 2000 characters' };
    }
    
    return { valid: true, message: '' };
  };

  const handleAboutChange = (text: string) => {
    setAbout(text);
    const validationResult = validateAbout(text);
    setValidation(validationResult);
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

    const validationResult = validateAbout(about);
    setValidation(validationResult);

    if (!validationResult.valid) {
      mysweetalert.fire({
        icon: "error",
        title: "Validation Error",
        text: validationResult.message,
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      about: about.trim(),
    };

    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your store's about section has been updated.",
        confirmButtonColor: "#7c3aed"
      });

    } catch (error) {
      console.error("Failed to update about section:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your about section. Please try again.",
        confirmButtonColor: "#dc2626"
      });
    }
  };

  const getCharacterCountColor = () => {
    if (about.length < 50) return 'text-amber-500';
    if (about.length > 2000) return 'text-red-500';
    return 'text-green-500';
  };

  const getProgressWidth = () => {
    const percentage = Math.min((about.length / 2000) * 100, 100);
    return `${percentage}%`;
  };

  return (
    <div className="min-h-full w-full bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
              <FaInfoCircle className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">About Your Store</h1>
              <p className="text-white/60 text-sm">Tell your story to connect with customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Info Section */}
          <div className="p-6 border-b border-slate-100">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <FaInfoCircle className="text-teal-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-teal-800 mb-1">Write Your Story</h3>
                  <p className="text-sm text-teal-600">
                    Share what makes your store special. This will appear on your store's About page and helps visitors connect with your brand.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Textarea Section */}
          <div className="p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Store Description
            </label>
            
            <div className="relative">
              <textarea
                placeholder="Tell your story here... What inspired you to start? What do you offer? What makes you unique? (minimum 50 characters)"
                value={about}
                onChange={(e) => handleAboutChange(e.target.value)}
                className={`w-full h-[300px] px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors resize-none
                  ${!validation.valid 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-slate-200 focus:border-teal-500'
                  }`}
              />
            </div>

            {/* Character Count & Progress */}
            <div className="mt-4">
              {/* Progress Bar */}
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-300 ${
                    about.length < 50 
                      ? 'bg-amber-500' 
                      : about.length > 2000 
                        ? 'bg-red-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: getProgressWidth() }}
                />
              </div>
              
              {/* Character Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!validation.valid && about.length > 0 && (
                    <div className="flex items-center gap-1 text-amber-600 text-sm">
                      <FaExclamationTriangle className="text-xs" />
                      <span>{validation.message}</span>
                    </div>
                  )}
                  {validation.valid && about.length >= 50 && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <FaCheck className="text-xs" />
                      <span>Looks good!</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-medium ${getCharacterCountColor()}`}>
                    {about.length}
                  </span>
                  <span className="text-slate-400">/ 2000 characters</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Tips for a great about section:</h4>
              <ul className="space-y-1 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" />
                  Share your story and what inspired you
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" />
                  Describe your products or services
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" />
                  Highlight what makes you unique
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" />
                  Include your values and mission
                </li>
              </ul>
            </div>
          </div>

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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <LoadingButton isLoading={isLoading} label="Save Changes" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreAboutSettings;
