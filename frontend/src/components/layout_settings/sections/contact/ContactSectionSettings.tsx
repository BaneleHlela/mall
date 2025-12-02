import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ContactWithBackgroundImageTextAndSocialsSettings from './with_bg_image_text_and_socials/ContactWithBackgroundImageTextAndSocialsSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const ContactSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.sections.contact.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    if (variation === 'contactWithBackgroundImageTextAndSocials') {
        return (
            <ContactWithBackgroundImageTextAndSocialsSettings 
                settings={settings} 
                handleSettingChange={handleSettingChange}
            />
        )
    }

    return (
        <div>ContactSectionSettings</div>
    )
}

export default ContactSectionSettings