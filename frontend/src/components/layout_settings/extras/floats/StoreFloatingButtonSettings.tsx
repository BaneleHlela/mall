import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../supporting/OptionsToggler';
import { getSetting } from '../../../../utils/helperFunctions';
import SubSettingsContainer from '../SubSettingsContainer';
import BackgroundEditor from '../../background/BackgroundEditor';
import SettingsSlider from '../../supporting/SettingsSlider';
import ColorPicker from '../../supporting/ColorPicker';

const StoreFloatingButtonSettings = () => {
    const objectPath = "floats.floatingButton"
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    const handleChange =
        (field: string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };
    return (
        <div className='space-y-[.3vh]'>
            <div className="px-[.6vh]">
                <OptionsToggler
                    label="show"
                    options={["chat", "scroll-up", "home", "none"]}
                    value={getSetting("show", settings, objectPath)}
                    onChange={(newValue) =>
                        handleSettingChange(`${objectPath}.show`, newValue)
                    }
                />
                <OptionsToggler
                    label="position"
                    options={["left", "right"]}
                    value={getSetting("position", settings, objectPath)}
                    onChange={(newValue) =>
                        handleSettingChange(`${objectPath}.position`, newValue)
                    }
                />
            </div>
            <SubSettingsContainer
                name="Icon"
                SettingsComponent={
                <div className="px-[.6vh] space-y-[.3vh]">
                    <SettingsSlider
                        label="Size"
                        unit="vh"
                        value={parseFloat(getSetting("style.icon.size", settings, objectPath) || "22")}
                        min={0}
                        max={7}
                        step={.1}
                        onChange={(val) =>
                            handleSettingChange(`${objectPath}.style.icon.size`, `${val}vh`)
                        }
                    />
                    {/* Color Using Option Toggler */}
                    <OptionsToggler
                        label="Color"
                        options={["primary", "secondary", "accent", "quad", "pent"]}
                        value={getSetting("style.icon.color", settings, objectPath)}
                        onChange={(newValue) =>
                            handleSettingChange(`${objectPath}.style.icon.color`, newValue)
                        }
                    />
                </div>
                }
            />
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.15vh] space-y-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.style.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["padding", "color", "border", "shadow"]}
                        responsiveSize
                    />
                </div>
                }
            />
        </div>
    )
}

export default StoreFloatingButtonSettings