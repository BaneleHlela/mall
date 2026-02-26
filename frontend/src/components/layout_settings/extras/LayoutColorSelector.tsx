import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import ColorPicker from '../supporting/ColorPicker';

const LayoutColorSelector = () => {
    const dispatch = useAppDispatch();
    const selectedColors = useAppSelector(state => state.layoutSettings.colors);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    const colorOptions = [
        { key: 'primary', label: 'Primary' },
        { key: 'secondary', label: 'Secondary' },
        { key: 'accent', label: 'Accent' },
        { key: 'quad', label: 'Quad' },
        { key: 'pent', label: 'Pent' },
    ];

    return (
        <div className='w-full space-y-3 p-2 overflow-y-scroll hide-scrollbar'>
            {colorOptions.map(({ key, label }) => (
                <div 
                    key={key} 
                    className="flex flex-row justify-between items-center bg-white rounded-lg p-2 shadow-sm border border-stone-100"
                >
                    <div className="flex items-center gap-2">
                        {/* Color Preview Circle */}
                        <div 
                            className="w-6 h-6 rounded-full border-2 border-stone-200 shadow-sm"
                            style={{ 
                                backgroundColor: selectedColors?.[key as keyof typeof selectedColors] || '#000000' 
                            }}
                        />
                        <span className="text-xs font-medium text-stone-600">{label}</span>
                    </div>
                    <ColorPicker
                        label=""
                        value={selectedColors?.[key as keyof typeof selectedColors] || '#000000'}
                        onChange={(e) => handleSettingChange(`colors.${key}`, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default LayoutColorSelector
