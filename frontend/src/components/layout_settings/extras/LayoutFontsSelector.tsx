import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import GoogleFontsSelector from '../text/GoogleFontsSelector';

const LayoutFontsSelector = () => {
    const dispatch = useAppDispatch();
    const selectedFonts = useAppSelector(state => state.layoutSettings.fonts);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div className='w-full space-y-2 p-2 bg-stone-50 overflow-y-scroll hide-scrollbar'>
            <div className="flex flex-row justify-between items-center">
                <p className="font-medium">Primary:</p>
                <GoogleFontsSelector
                    selectedFont={selectedFonts.primary || ''}
                    onFontSelect={(font) => handleSettingChange('fonts.primary', font)}
                />
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className="font-medium">Secondary:</p>
                <GoogleFontsSelector
                    selectedFont={selectedFonts.secondary || ''}
                    onFontSelect={(font) => handleSettingChange('fonts.secondary', font)}
                />
            </div>
            <div className="flex flex-row justify-between items-center overflow-y-visible">
                <p className="font-medium">Tertiary:</p>
                <GoogleFontsSelector
                    selectedFont={selectedFonts.tertiary || ''}
                    onFontSelect={(font) => handleSettingChange('fonts.tertiary', font)}
                />
            </div>
        </div>
    );
};

export default LayoutFontsSelector;
