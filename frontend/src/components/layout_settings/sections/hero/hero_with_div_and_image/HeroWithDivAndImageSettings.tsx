import React, { useState } from 'react'
import BackgroundEditor from '../../../background/BackgroundEditor'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';
import { getSetting } from '../../../../../utils/helperFunctions';

interface HeroWithBoxSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const HeroWithDivAndImageSettings: React.FC<HeroWithBoxSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "hero";
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    
    return (
        <div className="space-y-[.3vh]">
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.15vh] space-y-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["height"]}
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                    />
                </div>
                }
            />
            <SubSettingsContainer
                name="Image"
                SettingsComponent={
                <div className="px-2 space-y-[.3vh] py-1">
                    <MultipleLayoutImagesHandler
                        objectPath={`${objectPath}.image.url.mobile`}
                        min={1}
                        max={1}
                        images={getSetting("image.url.mobile", settings, objectPath)}
                    />
                    <MultipleLayoutImagesHandler
                        objectPath={`${objectPath}.image.url.desktop`}
                        min={1}
                        max={1}
                        images={getSetting("image.url.desktop", settings, objectPath)}
                    />
                </div>
                }
            />
        </div>
    )
}

export default HeroWithDivAndImageSettings