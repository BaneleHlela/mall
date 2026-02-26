import React, { useState, useEffect } from 'react';
import { useFormContext } from '../context/FormContext';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaWhatsapp, FaPhone, FaPlus, FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

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

const socialColors = {
    facebook: 'bg-blue-600',
    twitter: 'bg-sky-500',
    instagram: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
    linkedin: 'bg-blue-700',
    pinterest: 'bg-red-600',
    youtube: 'bg-red-600',
    whatsapp: 'bg-green-500',
    phone: 'bg-gray-600',
};

const DisplaySocialLink: React.FC<{
    platform: keyof typeof socialIcons;
    deletable: boolean;
    onDeleteClick?: () => void;
    onClick: () => void;
}> = ({ platform, deletable, onDeleteClick, onClick }) => {
    const Icon = socialIcons[platform];
    const bgColor = socialColors[platform];
    
    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative aspect-square ${bgColor} rounded-xl flex flex-row justify-center items-center cursor-pointer shadow-md`} 
            onClick={onClick}
        >
            <Icon className="text-white text-xl" />
            {deletable && (
                <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick?.();
                    }}
                >
                    <IoMdClose size={14} />
                </button>
            )}
        </motion.div>
    );
};

const StepSocials: React.FC = () => {
    const { form, setForm, setStepValidator, nextClicked } = useFormContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSocial, setCurrentSocial] = useState<SocialLink | null>(null);
    const [validation, setValidation] = useState({
        socialsValid: true,
        urlError: ''
    });

    const validateSocials = () => {
        // Socials are optional, so always valid
        setValidation(prev => ({ ...prev, socialsValid: true }));
        return true;
    };

    useEffect(() => {
        setStepValidator(validateSocials);
    }, [form.socials]);

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
                return `https://wa.me/${url.replace(/\D/g, '')}`;
            case 'phone':
                return `tel:${url.replace(/\D/g, '')}`;
            default:
                return url;
        }
    };

    const handleSaveSocial = (social: SocialLink) => {
        if (!social.url.trim()) {
            setValidation(prev => ({ ...prev, urlError: "URL cannot be empty." }));
            return;
        }

        setValidation(prev => ({ ...prev, urlError: '' }));
    
        const formattedSocial = {
            ...social,
            url: formatSocialUrl(social.platform, social.url)
        };
    
        let newSocials;
        if (currentSocial && form.socials.some(s => s.platform === currentSocial.platform)) {
            newSocials = form.socials.map(s => s.platform === currentSocial.platform ? formattedSocial : s);
        } else {
            newSocials = [...form.socials, formattedSocial];
        }
        setForm({ ...form, socials: newSocials });
        setIsModalOpen(false);
        setCurrentSocial(null);
    };


    const availablePlatforms = Object.keys(socialIcons).filter(
        platform => !form.socials.some(s => s.platform === platform)
    ) as Array<keyof typeof socialIcons>;

    return (
        <div className="relative w-full h-full flex flex-col">
            <div className="text-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Social Media Links</h2>
                <p className="text-xs text-gray-500">Connect your social media (optional)</p>
            </div>
            
            {/* Existing socials */}
            {form.socials.length > 0 && (
                <div className="mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-2">Connected ({form.socials.length})</p>
                    <div className="grid grid-cols-4 gap-3">
                        {form.socials.map((social, index) => (
                            <DisplaySocialLink
                                key={index}
                                platform={social.platform as keyof typeof socialIcons}
                                deletable={true}
                                onDeleteClick={() => handleDeleteSocial(index)}
                                onClick={() => handleSocialClick(social as SocialLink)}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {/* Add new socials */}
            <div className="flex-1 overflow-y-auto">
                <p className="text-xs font-medium text-gray-600 mb-2">
                    {form.socials.length > 0 ? 'Add More' : 'Add Social Links'}
                </p>
                <div className="grid grid-cols-4 gap-3">
                    {availablePlatforms.map((platform) => (
                        <DisplaySocialLink
                            key={platform}
                            platform={platform}
                            deletable={false}
                            onClick={() => handleSocialClick({ platform, url: '' })}
                        />
                    ))}
                </div>
                
                {form.socials.length === 0 && (
                    <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-500">
                            No social links added yet. You can skip this step or add links to help customers find you.
                        </p>
                    </div>
                )}
            </div>
            
            {/* Inline Modal */}
            <AnimatePresence>
                {isModalOpen && currentSocial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl z-20"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white text-center flex flex-col justify-between h-auto w-full p-5 rounded-xl shadow-xl"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                {form.socials.some(s => s.platform === currentSocial.platform) ? 'Edit' : 'Add'} {currentSocial.platform.charAt(0).toUpperCase() + currentSocial.platform.slice(1)}
                            </h2>
                            <div className="flex justify-center mb-4">
                                {React.createElement(socialIcons[currentSocial.platform], { 
                                    className: `h-12 w-12 text-${socialColors[currentSocial.platform].replace('bg-', '')}` 
                                })}
                            </div>
                            <input
                                type="text"
                                value={currentSocial.url}
                                onChange={(e) => {
                                    setCurrentSocial({ ...currentSocial, url: e.target.value });
                                    if (validation.urlError) {
                                        setValidation(prev => ({ ...prev, urlError: '' }));
                                    }
                                }}
                                className={`w-full p-3 border-2 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all
                                    ${validation.urlError ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder={currentSocial.platform === 'whatsapp' ? 'Phone number' : 
                                              currentSocial.platform === 'phone' ? 'Phone number' : 
                                              `Enter ${currentSocial.platform} URL`}
                                autoFocus
                            />
                            {validation.urlError && (
                                <p className="text-red-500 text-xs mb-3">{validation.urlError}</p>
                            )}
                            <div className="w-full flex justify-between gap-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSaveSocial(currentSocial)}
                                    className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaCheck size={12} />
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Validation error (though socials are optional) */}
            {nextClicked && !validation.socialsValid && (
                <div className="text-center text-red-500 text-xs mt-2">
                    Please configure your social media links
                </div>
            )}
        </div>
    );
};

export default StepSocials;
