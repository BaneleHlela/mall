import React from 'react'
import { useAppSelector } from '../../../../../app/hooks'
import ServiceCardWithButtonDurationAndPriceSettings from './with_button_duration_and_price/ServiceCardWithButtonDurationAndPriceSettings';
import type { SectionEditorProps } from '../../SectionSettings';

const ServiceCardSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange
}) => {
    const variation = useAppSelector((state) => state.layoutSettings.services.serviceCard.variation);
    console.log(variation)
    if (variation === "serviceCardWithButtonDurationAndPrice") {
        return(
            <ServiceCardWithButtonDurationAndPriceSettings settings={settings} handleSettingChange={handleSettingChange}/>
        )
    }

    return (
        <div>ServiceCardSettings</div>
    )
}

export default ServiceCardSettings;