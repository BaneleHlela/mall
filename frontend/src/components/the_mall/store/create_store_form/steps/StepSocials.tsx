
import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface SocialLink {
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'pinterest' | 'youtube' | 'whatsapp' | 'phone';
    url: string;
}

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

const DisplaySocialLink: React.FC<{
    platform: keyof typeof socialIcons;
    deletable: boolean;
    onDeleteClick?: () => void;
    onClick: () => void;
}> = ({ platform, deletable, onDeleteClick, onClick }) => {
    const Icon = socialIcons[platform];
    return (
        <div className="relative border border-gray-400 p-[1.2vh] rounded flex flex-row justify-center items-center cursor-pointer shadow-md" onClick={onClick}>
            <Icon className="h-[7vh] w-[7vh] text-gray-600" />
            {deletable && (
                <button
                    className="absolute -top-[.6vh] -right-[.6vh] bg-red-500 text-white rounded-full w-[2.5vh] h-[2.5vh] flex items-center justify-center text-[.8vh]"
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

const StepSocials: React.FC = () => {
    const { form, setForm } = useFormContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSocial, setCurrentSocial] = useState<SocialLink | null>(null);

    const handleSocialClick = (social: SocialLink | null) => {
        setCurrentSocial(social);
        setIsModalOpen(true);
    };

    const handleDeleteSocial = (index: number) => {
        const newSocials = [...form.socials];
        newSocials.splice(index, 1);
        setForm({ ...form, socials: newSocials });
    };

    const formatSocialUrl = (platform: string, url: string): string => {
        switch (platform) {
            case 'whatsapp':
                // Remove any non-digit characters and add the wa.me prefix
                return `https://wa.me/${url.replace(/\D/g, '')}`;
            case 'phone':
                // Remove any non-digit characters and add the tel: prefix
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

        let newSocials;
        if (currentSocial && form.socials.some(s => s.platform === currentSocial.platform)) {
            // Edit existing
            newSocials = form.socials.map(s => s.platform === currentSocial.platform ? formattedSocial : s);
        } else {
            // Add new
            newSocials = [...form.socials, formattedSocial];
        }
        setForm({ ...form, socials: newSocials });
        setIsModalOpen(false);
        setCurrentSocial(null);
    };
    console.log(form)

    const availablePlatforms = Object.keys(socialIcons).filter(
        platform => !form.socials.some(s => s.platform === platform)
    ) as Array<keyof typeof socialIcons>;

    return (
        <div className="relative w-full h-full">
            <h2 className="text-[2.5vh] mb-[2vh] w-full border-b-[.4vh] border-gray-600">My Socials</h2>
            
            {/* Existing socials */}
            <div className="grid grid-cols-4 gap-[.8vh] mb-[2vh]">
                {form.socials.map((social, index) => (
                    <DisplaySocialLink
                        key={index} // @ts-ignore-next-line
                        platform={social.platform}
                        deletable={true}
                        onDeleteClick={() => handleDeleteSocial(index)} // @ts-ignore-next-line
                        onClick={() => handleSocialClick(social)}
                    />
                ))}
            </div>
            
            {/* Add new socials */}
            <h3 className="text-[2.5vh] mb-[2vh] w-full border-b-[.4vh] border-gray-600">Add New Platform</h3>
            <div className="grid grid-cols-4 gap-[.8vh]">
                {availablePlatforms.map((platform) => (
                    <DisplaySocialLink
                        key={platform}
                        platform={platform}
                        deletable={false}
                        onClick={() => handleSocialClick({ platform, url: '' })}
                    />
                ))}
            </div>
            
            {/* Inline Modal */}
            {isModalOpen && currentSocial && (
                <div className="absolute inset-0 bg-[#0000001e] flex items-center justify-center rounded">
                    <div className="bg-white text-center flex flex-col justify-between h-[80%] w-full p-6 rounded">
                        <h2 className="text-xl mb-4">
                            {form.socials.some(s => s.platform === currentSocial.platform) ? 'Edit' : 'Add'} {currentSocial.platform} Link
                        </h2>
                        <div className="flex justify-center mb-4">
                            {React.createElement(socialIcons[currentSocial.platform], { className: "h-16 w-16 text-gray-600" })}
                        </div>
                        <input
                            type="text"
                            value={currentSocial.url}
                            onChange={(e) => setCurrentSocial({ ...currentSocial, url: e.target.value })}
                            className="w-full p-2 border rounded mb-4"
                            placeholder={`Enter ${currentSocial.platform} URL`}
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

export default StepSocials;