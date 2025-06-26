import React from 'react';
import BackgroundEditor from '../../../../background/BackgroundEditor';

interface LargeSliderSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const LargeSliderSettings: React.FC<LargeSliderSettingsProps> = ({ settings, handleSettingChange }) => {
    const objectPath = "hero.largeSlider";

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg text-center">Large Slider Settings</h3>
            <div className="space-y-2">
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

export default LargeSliderSettings;