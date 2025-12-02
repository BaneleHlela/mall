import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaWhatsapp, FaPhone
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import  LoadingButton  from '../../../../components/the_mall/buttons/LoadingButton';

const mysweetalert = withReactContent(Swal);

const socialIcons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  pinterest: FaPinterest,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  phone: FaPhone,
};

type SocialPlatform = keyof typeof socialIcons;

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

const DisplaySocialLink: React.FC<{
  platform: SocialPlatform;
  deletable: boolean;
  onDeleteClick?: () => void;
  onClick: () => void;
}> = ({ platform, deletable, onDeleteClick, onClick }) => {
  const Icon = socialIcons[platform];
  return (
    <div className="relative border border-gray-400 p-2 rounded flex flex-row justify-center items-center cursor-pointer shadow-md" onClick={onClick}>
      <Icon className="h-16 w-16 text-gray-600" />
      {deletable && (
        <button
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick?.();
          }}
        >
          <IoMdClose size={20} />
        </button>
      )}
    </div>
  );
};

const StoreSocialSettings = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSocial, setCurrentSocial] = useState<SocialLink | null>(null);
  const [validation, setValidation] = useState<{[key: string]: { valid: boolean; message: string }}>({});

  useEffect(() => {
    if (store?.socials) {
      setSocials(store.socials);
    }
  }, [store]);

  const handleSocialClick = (social: SocialLink | null) => {
    setCurrentSocial(social);
    setIsModalOpen(true);
  };

  const handleDeleteSocial = (index: number) => {
    const newSocials = [...socials];
    newSocials.splice(index, 1);
    setSocials(newSocials);
  };

  const validateSocialUrl = (platform: string, url: string): { valid: boolean; message: string } => {
    if (!url.trim()) {
      return { valid: false, message: 'URL/number is required' };
    }

    switch (platform) {
      case 'whatsapp':
        const whatsappNumber = url.replace(/\D/g, '');
        if (whatsappNumber.length < 10) {
          return { valid: false, message: 'Please enter a valid WhatsApp number' };
        }
        return { valid: true, message: '' };
      
      case 'phone':
        const phoneNumber = url.replace(/\D/g, '');
        if (phoneNumber.length < 10) {
          return { valid: false, message: 'Please enter a valid phone number' };
        }
        return { valid: true, message: '' };
      
      case 'facebook':
        if (!url.includes('facebook.com') && !url.startsWith('http')) {
          return { valid: false, message: 'Please enter a valid Facebook URL' };
        }
        return { valid: true, message: '' };
      
      case 'twitter':
        if (!url.includes('twitter.com') && !url.includes('x.com') && !url.startsWith('http')) {
          return { valid: false, message: 'Please enter a valid Twitter/X URL' };
        }
        return { valid: true, message: '' };
      
      case 'instagram':
        if (!url.includes('instagram.com') && !url.startsWith('http')) {
          return { valid: false, message: 'Please enter a valid Instagram URL' };
        }
        return { valid: true, message: '' };
      
      case 'linkedin':
        if (!url.includes('linkedin.com') && !url.startsWith('http')) {
          return { valid: false, message: 'Please enter a valid LinkedIn URL' };
        }
        return { valid: true, message: '' };
      
      case 'pinterest':
        if (!url.includes('pinterest.com') && !url.startsWith('http')) {
          return { valid: false, message: 'Please enter a valid Pinterest URL' };
        }
        return { valid: true, message: '' };
      
      case 'youtube':
        if (!url.includes('youtube.com') && !url.includes('youtu.be') && !url.startsWith('http')) {
          return { valid: false, message: 'Please enter a valid YouTube URL' };
        }
        return { valid: true, message: '' };
      
      default:
        return { valid: true, message: '' };
    }
  };

  const formatSocialUrl = (platform: string, url: string): string => {
    switch (platform) {
      case 'whatsapp':
        return `https://wa.me/${url.replace(/\D/g, '')}`;
      case 'phone':
        return `tel:${url.replace(/\D/g, '')}`;
      default:
        return url;
    }
  };

  const handleSaveSocial = (social: SocialLink) => {
    const validationResult = validateSocialUrl(social.platform, social.url);
    
    if (!validationResult.valid) {
      setValidation(prev => ({
        ...prev,
        [social.platform]: validationResult
      }));
      return;
    }

    const formattedSocial = {
      ...social,
      url: formatSocialUrl(social.platform, social.url)
    };

    const exists = socials.some(s => s.platform === social.platform);
    const newSocials = exists
      ? socials.map(s => s.platform === social.platform ? formattedSocial : s)
      : [...socials, formattedSocial];

    setSocials(newSocials);
    setValidation(prev => ({
      ...prev,
      [social.platform]: { valid: true, message: '' }
    }));
    setIsModalOpen(false);
    setCurrentSocial(null);
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

    // Validate all social links before saving
    let hasValidationErrors = false;
    const newValidation: {[key: string]: { valid: boolean; message: string }} = {};
    
    socials.forEach(social => {
      const validationResult = validateSocialUrl(social.platform, social.url);
      newValidation[social.platform] = validationResult;
      if (!validationResult.valid) {
        hasValidationErrors = true;
      }
    });

    setValidation(newValidation);

    if (hasValidationErrors) {
      mysweetalert.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix all highlighted fields before saving.",
        confirmButtonColor: "#d33"
      });
      return;
    }

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      socials,
    };

    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your social links have been updated.",
        confirmButtonColor: "#3085d6"
      });

    } catch (error) {
      console.error("Failed to update social links:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your social links. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const availablePlatforms = Object.keys(socialIcons).filter(
    platform => !socials.some(s => s.platform === platform)
  ) as SocialPlatform[];

  return (
    <div className='flex justify-center w-full h-full bg-white border-t-[.5vh] border-gray-200 lg:border-none'>
      <div className="flex flex-col justify-between items-center w-full max-w-4xl">
        <h1 className="py-5 text-2xl font-[500] w-full text-center text-shadow-2xs">Social Links</h1>
        
        <div className="flex flex-col space-y-4 w-full px-4">
          {/* Existing socials */}
          {socials.length > 0 && (
            <div className="bg-[#0000000e] p-4 rounded">
              <h3 className="text-lg mb-4 font-semibold text-black">Your Social Links</h3>
              <div className="grid grid-cols-3 gap-4">
                {socials.map((social, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <DisplaySocialLink
                      platform={social.platform}
                      deletable={true}
                      onDeleteClick={() => handleDeleteSocial(index)}
                      onClick={() => handleSocialClick(social)}
                    />
                    {validation[social.platform] && !validation[social.platform].valid && (
                      <p className="text-red-500 text-xs mt-1 text-center">
                        {validation[social.platform].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add new socials */}
          {availablePlatforms.length > 0 && (
            <div className="bg-[#0000000e] p-4 rounded">
              <h3 className="text-lg mb-4 font-semibold text-black">Add New Social Links</h3>
              <div className="grid grid-cols-3 gap-4">
                {availablePlatforms.map((platform) => (
                  <DisplaySocialLink
                    key={platform}
                    platform={platform}
                    deletable={false}
                    onClick={() => handleSocialClick({ platform, url: '' })}
                  />
                ))}
              </div>
            </div>
          )}
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

      {/* Modal */}
      {isModalOpen && currentSocial && (
        <div className="absolute inset-0 bg-[#0000001e] flex items-center justify-center rounded">
          <div className="bg-white text-center flex flex-col justify-between h-[80%] w-full p-6 rounded max-w-md mx-auto">
            <h2 className="text-xl mb-4 font-semibold">
              {socials.some(s => s.platform === currentSocial.platform) ? 'Edit' : 'Add'} {currentSocial.platform} Link
            </h2>
            <div className="flex justify-center mb-4">
              {React.createElement(socialIcons[currentSocial.platform], { className: "h-16 w-16 text-gray-600" })}
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                value={currentSocial.url}
                onChange={(e) => {
                  setCurrentSocial({ ...currentSocial, url: e.target.value });
                  // Clear validation error when user starts typing
                  if (validation[currentSocial.platform] && !validation[currentSocial.platform].valid) {
                    setValidation(prev => ({
                      ...prev,
                      [currentSocial.platform]: { valid: true, message: '' }
                    }));
                  }
                }}
                className={`w-full p-2 border rounded mb-2 ${
                  validation[currentSocial.platform] && !validation[currentSocial.platform].valid
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder={`Enter ${currentSocial.platform} ${currentSocial.platform === 'whatsapp' || currentSocial.platform === 'phone' ? 'number' : 'URL'}`}
              />
              {validation[currentSocial.platform] && !validation[currentSocial.platform].valid && (
                <p className="text-red-500 text-sm mb-4 text-left">
                  {validation[currentSocial.platform].message}
                </p>
              )}
            </div>
            <div className="w-full flex justify-between gap-2 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentSocial(null);
                  // Clear validation when closing modal
                  if (currentSocial) {
                    setValidation(prev => ({
                      ...prev,
                      [currentSocial.platform]: { valid: true, message: '' }
                    }));
                  }
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveSocial(currentSocial)}
                className="bg-[#0b032d] text-white px-4 py-2 rounded hover:opacity-80"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreSocialSettings;
