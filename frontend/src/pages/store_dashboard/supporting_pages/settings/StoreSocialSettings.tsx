import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaWhatsapp, FaPhone,
  FaShareAlt, FaPlus, FaCheck, FaTimes
} from 'react-icons/fa';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoadingButton from '../../../../components/the_mall/buttons/LoadingButton';

const mysweetalert = withReactContent(Swal);

const socialIcons: Record<string, React.ElementType> = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  pinterest: FaPinterest,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  phone: FaPhone,
};

const socialColors: Record<string, { bg: string; text: string; border: string }> = {
  facebook: { bg: 'bg-blue-50', text: 'text-blue-500', border: 'border-blue-200' },
  twitter: { bg: 'bg-sky-50', text: 'text-sky-500', border: 'border-sky-200' },
  instagram: { bg: 'bg-pink-50', text: 'text-pink-500', border: 'border-pink-200' },
  linkedin: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  pinterest: { bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
  youtube: { bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
  whatsapp: { bg: 'bg-green-50', text: 'text-green-500', border: 'border-green-200' },
  phone: { bg: 'bg-purple-50', text: 'text-purple-500', border: 'border-purple-200' },
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
  hasUrl?: boolean;
}> = ({ platform, deletable, onDeleteClick, onClick, hasUrl }) => {
  const Icon = socialIcons[platform];
  const colors = socialColors[platform];
  
  return (
    <button
      onClick={onClick}
      className={`relative w-full p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg group
        ${hasUrl 
          ? `${colors.bg} ${colors.border}` 
          : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
          ${hasUrl ? colors.bg : 'bg-slate-100'}`}
        >
          <Icon className={`text-2xl ${hasUrl ? colors.text : 'text-slate-400'}`} />
        </div>
        <span className={`text-sm font-medium capitalize ${hasUrl ? 'text-slate-700' : 'text-slate-500'}`}>
          {platform}
        </span>
        {hasUrl && (
          <span className="text-xs text-green-600 flex items-center gap-1">
            <FaCheck className="text-xs" />
            Added
          </span>
        )}
      </div>
      
      {deletable && (
        <button
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick?.();
          }}
        >
          <FaTimes size={12} />
        </button>
      )}
    </button>
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
        confirmButtonColor: "#dc2626"
      });
      return;
    }

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
        confirmButtonColor: "#dc2626"
      });
      return;
    }

    const updatedStore: Omit<Store, 'id'> = {
      ...store, // @ts-ignore
      socials,
    };

    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your social links have been updated.",
        confirmButtonColor: "#7c3aed"
      });

    } catch (error) {
      console.error("Failed to update social links:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your social links. Please try again.",
        confirmButtonColor: "#dc2626"
      });
    }
  };

  const availablePlatforms = Object.keys(socialIcons).filter(
    platform => !socials.some(s => s.platform === platform)
  ) as SocialPlatform[];

  return (
    <div className="h-full min-h-full w-full bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <FaShareAlt className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Social Links</h1>
              <p className="text-white/60 text-sm">Connect your social media accounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Connected Socials */}
        {socials.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <FaCheck className="text-green-500" />
              <h3 className="font-semibold text-slate-800">Connected Accounts</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {socials.map((social, index) => (
                <DisplaySocialLink
                  key={index}
                  platform={social.platform}
                  deletable={true}
                  onDeleteClick={() => handleDeleteSocial(index)}
                  onClick={() => handleSocialClick(social)}
                  hasUrl={true}
                />
              ))}
            </div>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 rounded-xl p-4 mb-4 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        )}
        

        {/* Add New Socials */}
        {availablePlatforms.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <FaPlus className="text-indigo-500" />
              <h3 className="font-semibold text-slate-800">Add New Connections</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {availablePlatforms.map((platform) => (
                <DisplaySocialLink
                  key={platform}
                  platform={platform}
                  deletable={false}
                  onClick={() => handleSocialClick({ platform, url: '' })}
                  hasUrl={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {socials.length === 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 mb-4 border border-indigo-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <FaShareAlt className="text-indigo-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-1">Connect Your Social Media</h3>
                <p className="text-sm text-indigo-600">
                  Add your social media links to help customers find and connect with you on different platforms.
                </p>
              </div>
            </div>
          </div>
        )}

        
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <LoadingButton isLoading={isLoading} label="Save Changes" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && currentSocial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsModalOpen(false);
              setCurrentSocial(null);
            }}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${socialColors[currentSocial.platform]?.bg || 'bg-white/20'}`}>
                  {React.createElement(socialIcons[currentSocial.platform], { 
                    className: `text-2xl ${socialColors[currentSocial.platform]?.text || 'text-white'}` 
                  })}
                </div>
                <div>
                  <h2 className="text-xl font-bold capitalize">
                    {socials.some(s => s.platform === currentSocial.platform) ? 'Edit' : 'Add'} {currentSocial.platform}
                  </h2>
                  <p className="text-white/60 text-sm">
                    {currentSocial.platform === 'whatsapp' || currentSocial.platform === 'phone' 
                      ? 'Enter your number' 
                      : 'Enter your profile URL'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Body */}
            <div className="p-6">
              <input
                type="text"
                value={currentSocial.url}
                onChange={(e) => {
                  setCurrentSocial({ ...currentSocial, url: e.target.value });
                  if (validation[currentSocial.platform] && !validation[currentSocial.platform].valid) {
                    setValidation(prev => ({
                      ...prev,
                      [currentSocial.platform]: { valid: true, message: '' }
                    }));
                  }
                }}
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors
                  ${validation[currentSocial.platform] && !validation[currentSocial.platform].valid
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-slate-200 focus:border-indigo-500'
                  }`}
                placeholder={`Enter ${currentSocial.platform} ${currentSocial.platform === 'whatsapp' || currentSocial.platform === 'phone' ? 'number' : 'URL'}`}
              />
              
              {validation[currentSocial.platform] && !validation[currentSocial.platform].valid && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {validation[currentSocial.platform].message}
                </p>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentSocial(null);
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveSocial(currentSocial)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-xl transition-colors"
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
