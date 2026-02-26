import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import GoogleFontsSelector from '../text/GoogleFontsSelector';

const LayoutFontsSelector = () => {
    const dispatch = useAppDispatch();
    const selectedFonts = useAppSelector(state => state.layoutSettings.fonts);

    const handleSettingChange = (field: string, value: string) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div className='w-full space-y-[1vh] p-[.8vh] overflow-y-scroll hide-scrollbar'>
            {/* Primary Font */}
            <div className="flex flex-col gap-[.6vh]">
                <p className="text-[1.6vh] font-medium text-stone-500 uppercase tracking-wide">Primary</p>
                <GoogleFontsSelector
                    selectedFont={selectedFonts?.primary || ''}
                    onFontSelect={(font: string) => handleSettingChange('fonts.primary', font)}
                />
            </div>
            
            {/* Secondary Font */}
            <div className="flex flex-col gap-[.6vh]">
                <p className="text-[1.6vh] font-medium text-stone-500 uppercase tracking-wide">Secondary</p>
                <GoogleFontsSelector
                    selectedFont={selectedFonts?.secondary || ''}
                    onFontSelect={(font: string) => handleSettingChange('fonts.secondary', font)}
                />
            </div>
            
            {/* Tertiary Font */}
            <div className="flex flex-col gap-[.6vh]">
                <p className="text-[1.6vh] font-medium text-stone-500 uppercase tracking-wide">Tertiary</p>
                <GoogleFontsSelector
                    selectedFont={selectedFonts?.tertiary || ''}
                    onFontSelect={(font: string) => handleSettingChange('fonts.tertiary', font)}
                />
            </div>
        </div>
    );
};

export default LayoutFontsSelector;
