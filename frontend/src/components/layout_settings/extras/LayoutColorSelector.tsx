import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import ColorPicker from '../supporting/ColorPicker';

const LayoutColorSelector = () => {
    const dispatch = useAppDispatch();
    const selectedColors = useAppSelector(state => state.layoutSettings.colors);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div className='w-full space-y-2 p-2 overflow-y-scroll hide-scrollbar'>
            <ColorPicker
                label="Primary"
                value={selectedColors.primary || '#000000'}
                onChange={(e) => handleSettingChange('colors.primary', e.target.value)}
            />
            <ColorPicker
              label="Secondary"
              value={selectedColors.secondary || '#000000'}
              onChange={(e) => handleSettingChange('colors.secondary', e.target.value)}
            />
            <ColorPicker
                label="Accent"
                value={selectedColors.accent || '#000000'}
                onChange={(e) => handleSettingChange('colors.accent', e.target.value)}
            />
            <ColorPicker
                label="Quad"
                value={selectedColors.quad || '#000000'}
                onChange={(e) => handleSettingChange('colors.quad', e.target.value)}
            />
            <ColorPicker
                label="Pent"
                value={selectedColors.pent || '#000000'}
                onChange={(e) => handleSettingChange('colors.pent', e.target.value)}
            />

        </div>
    );
};

export default LayoutColorSelector