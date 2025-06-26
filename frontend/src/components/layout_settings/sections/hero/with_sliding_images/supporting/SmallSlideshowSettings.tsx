import React from 'react';
import OptionsToggler from '../../../../supporting/OptionsToggler';
import { getSetting } from '../../../../../../utils/helperFunctions';
import BackgroundEditor from '../../../../background/BackgroundEditor';
import SettingsSlider from '../../../../supporting/SettingsSlider';

interface SmallSliderSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const SmallSliderSettings: React.FC<SmallSliderSettingsProps> = ({ settings, handleSettingChange }) => {
    const objectPath = "hero.smallSlider";

    const handleChange = (field: string) => (value: any) => {
        handleSettingChange(`${objectPath}.${field}`, value);
    };

    return (
        <div className="space-y-1 py-1 p-2">
            <OptionsToggler
                label="Variation"
                options={["stopAndGo", "alwaysMoving"]}
                value={getSetting("variation", settings, objectPath)}
                onChange={handleChange("variation")}
            />

            <div className="space-y-2">
                <h4 className="font-semibold">Margin</h4>
                <SettingsSlider
                    label="Mobile"
                    value={parseInt(getSetting("margin.mobile", settings, objectPath) || "2")}
                    unit="px"
                    min={0}
                    max={20}
                    onChange={(newVal) => handleChange("margin.mobile")(`${newVal}px`)}
                />
                <SettingsSlider
                    label="Desktop"
                    value={parseInt(getSetting("margin.desktop", settings, objectPath) || "5")}
                    unit="px"
                    min={0}
                    max={20}
                    onChange={(newVal) => handleChange("margin.desktop")(`${newVal}px`)}
                />
            </div>

            <div className="space-y-2">
                <h4 className="font-semibold">Border</h4>
                <BackgroundEditor
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    objectPath={`${objectPath}`}
                    allow={["border"]}
                />
            </div>
        </div>
    );
};

export default SmallSliderSettings;