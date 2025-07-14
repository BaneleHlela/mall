import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaWhatsapp, FaPhone
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import type { Store } from '../../../../types/storeTypes';

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
  const store = useAppSelector((state) => state.storeAdmin.store);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSocial, setCurrentSocial] = useState<SocialLink | null>(null);

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
    const formattedSocial = {
      ...social,
      url: formatSocialUrl(social.platform, social.url)
    };

    const exists = socials.some(s => s.platform === social.platform);
    const newSocials = exists
      ? socials.map(s => s.platform === social.platform ? formattedSocial : s)
      : [...socials, formattedSocial];

    setSocials(newSocials);
    setIsModalOpen(false);
    setCurrentSocial(null);
  };

  const handleSave = async () => {
    if (!store) return;

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      socials,
    };

    try {
      const result = await dispatch(editStore({ storeId: store._id, updatedStore })).unwrap();
      console.log('Social links updated successfully:', result);
    } catch (error) {
      console.error('Failed to update social links:', error);
    }
  };

  const availablePlatforms = Object.keys(socialIcons).filter(
    platform => !socials.some(s => s.platform === platform)
  ) as SocialPlatform[];

  return (
    <div className="px-2">
      <h2 className="text-xl mb-4 w-full text-center border-b-2 border-gray-600">Social Links</h2>

      {/* Existing socials */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {socials.map((social, index) => (
          <DisplaySocialLink
            key={index}
            platform={social.platform}
            deletable={true}
            onDeleteClick={() => handleDeleteSocial(index)}
            onClick={() => handleSocialClick(social)}
          />
        ))}
      </div>

      {/* Add new socials */}
      <h3 className="text-lg mb-4 border-b border-gray-400">Add New</h3>
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

      {/* Save button */}
      <div className="w-full flex justify-center mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80"
        >
          Save
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && currentSocial && (
        <div className="absolute inset-0 bg-[#0000001e] flex items-center justify-center rounded">
          <div className="bg-white text-center flex flex-col justify-between h-[80%] w-full p-6 rounded max-w-md mx-auto">
            <h2 className="text-xl mb-4">
              {socials.some(s => s.platform === currentSocial.platform) ? 'Edit' : 'Add'} {currentSocial.platform} Link
            </h2>
            <div className="flex justify-center mb-4">
              {React.createElement(socialIcons[currentSocial.platform], { className: "h-16 w-16 text-gray-600" })}
            </div>
            <input
              type="text"
              value={currentSocial.url}
              onChange={(e) => setCurrentSocial({ ...currentSocial, url: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              placeholder={`Enter ${currentSocial.platform} URL or number`}
            />
            <div className="w-full flex justify-between gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveSocial(currentSocial)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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
