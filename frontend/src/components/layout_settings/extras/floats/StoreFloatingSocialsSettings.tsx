import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import IconsSettingsHandler from '../../menubar/popular/supporting/IconsSettingsHandler';
import OptionsToggler from '../../supporting/OptionsToggler';
import { getSetting } from '../../../../utils/helperFunctions';

const StoreFloatingSocialsSettings = () => {
    const objectPath = "floats.floatingIcons"
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div>
            {/* Show */}
            <div className="px-[.6vh]">
                <OptionsToggler
                    label="show"
                    options={["yes", "no",]}
                    value={getSetting("show", settings, objectPath) ? "yes" : "no"}
                    onChange={(newValue) =>
                        handleSettingChange(`${objectPath}.show`, newValue === "yes")
                    }
                />
            </div>
            {/* Position */}
            <div className="px-[.6vh]">
                <OptionsToggler
                    label="position"
                    options={["left-1/2", "right-1/2", "right-1/4", "left-1/4"]}
                    value={getSetting("position", settings, objectPath)}
                    onChange={(newValue) =>
                        handleSettingChange(`${objectPath}.position`, newValue)
                    }
                />
            </div>
            
            <IconsSettingsHandler
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath={`${objectPath}.icons`}
            />
        </div>
    )
}

export default StoreFloatingSocialsSettings