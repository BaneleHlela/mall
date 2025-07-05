import BackgroundEditor from '../../../background/BackgroundEditor'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import ColorPicker from '../../../supporting/ColorPicker';
import { getSetting } from '../../../../../utils/helperFunctions';

const HamburgerSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state: any) => state.layoutSettings);
    const hamburgerSettings = settings.menubar.topbar.mobile.hamburger;

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    const variations = [
        "cross", "squash", "twirl", "fade", "slant", "spiral", "divide",
        "turn", "pivot", "sling", "squeeze", "spin", "rotate"
    ];

    const directionalVariations = [
        "cross", "twirl", "fade", "slant", "spiral", "turn", "pivot", "sling", "spin", "rotate"
    ];

    return (
        <div className="space-y-1 py-1">
            <BackgroundEditor
                objectPath={`menubar.topbar.mobile.hamburger`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color"]}
                responsiveSize={false}
            />
            <div className="px-2">
                <OptionsToggler
                    label="Variation"
                    options={variations}
                    value={hamburgerSettings.variation}
                    onChange={(value) => handleSettingChange('menubar.topbar.mobile.hamburger.variation', value)}
                />
                {directionalVariations.includes(hamburgerSettings.variation) && (
                    <OptionsToggler
                        label="Direction"
                        options={["left", "right"]}
                        value={hamburgerSettings.direction}
                        onChange={(value) => handleSettingChange('menubar.topbar.mobile.hamburger.direction', value)}
                    />
                )}
            </div>
            

            

            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <BackgroundEditor
                        objectPath={`menubar.topbar.mobile.hamburger.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "height", "width", "shadow", "border", "padding"]}
                        responsiveSize={false}
                    />
                }
            />
        </div>
    )
}

export default HamburgerSettings