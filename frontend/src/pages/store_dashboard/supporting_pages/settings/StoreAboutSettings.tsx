import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoadingButton from '../../../../components/the_mall/buttons/LoadingButton';

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
        confirmButtonColor: "#d33"
      });
      return;
    }

    // Validate before saving
    const validationResult = validateAbout(about);
    setValidation(validationResult);

    if (!validationResult.valid) {
      mysweetalert.fire({
        icon: "error",
        title: "Validation Error",
        text: validationResult.message,
        confirmButtonColor: "#d33"
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
        confirmButtonColor: "#3085d6"
      });

    } catch (error) {
      console.error("Failed to update about section:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your about section. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className='flex justify-center w-full h-full bg-white border-t-[.5vh] border-gray-200 lg:border-none'>
      <div className="flex flex-col justify-between items-center w-full max-w-4xl">
        <h1 className="py-5 text-2xl font-[500] w-full text-center text-shadow-2xs">About Your Store</h1>
        
        <div className="flex flex-col space-y-4 w-full px-4">
          <div className="bg-[#0000000e] p-4 rounded">
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold text-black">Store Description</label>
              <p className="text-sm text-gray-600 mb-3">
                Write a brief story about your store, what makes it special, and what you offer.
                This will appear on your store's About page and helps visitors connect with your brand.
              </p>
              <textarea
                placeholder="Tell your story here... (minimum 50 characters)"
                value={about}
                onChange={(e) => handleAboutChange(e.target.value)}
                className={`w-full h-[300px] border-b bg-[#0000000e] focus:bg-[#00000030] focus:outline-none focus:ring-0 p-3 resize-none ${
                  !validation.valid ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between items-center text-sm">
                <div>
                  {!validation.valid && (
                    <p className="text-red-500">{validation.message}</p>
                  )}
                </div>
                <p className={`${about.length > 2000 ? 'text-red-500' : 'text-gray-500'}`}>
                  {about.length}/2000 characters
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && <p className='text-sm text-red-600'>{error}</p>}
        
        {/* Save Button */}
        <div className="w-full flex flex-row justify-center mb-[2vh]">
          <button
            type="button"
            onClick={handleSave}
            className="mt-5 px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
          >
            <LoadingButton isLoading={isLoading} label="Save" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreAboutSettings;
