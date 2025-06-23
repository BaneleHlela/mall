import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import OptionsToggler from "../../../supporting/OptionsToggler";
import TextEditor from "../../../text/TextEditor";
import CartSettings from "../../CartSettings";
import DesktopTopbarSettings from "./DesktopTopbarSettings";
import IconsSettingsHandler from "./IconsSettingsHandler";

const TopbarSettings = () => {
    const settings = useAppSelector((state: any) => state.layoutSettings);

    const dispatch = useAppDispatch();
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    return (
        <div
            className="p-1.5 space-y-1"
        >
            <div className="space-y-1 border border-black text-black rounded-sm px-2 py-1 pb-2 shadows-sm">
                <div className="px-2">
                    <OptionsToggler
                        label="Sticks to Top"
                        options={["true", "false"]}
                        value={String(getSetting("sticky", settings, "menubar.topbar"))} // Correctly construct the field path
                        onChange={(newValue) =>
                            handleSettingChange("menubar.topbar.sticky", newValue === "true") // Pass the full field path and value
                        }
                    />
                </div>
                <SubSettingsContainer
                    name="Cart"
                    SettingsComponent={<CartSettings settings={settings} handleSettingChange={handleSettingChange}/>}
                />
                
                <SubSettingsContainer 
                    name="Background"
                    SettingsComponent={
                        <BackgroundEditor
                            objectPath="menubar.background"
                            handleSettingChange={handleSettingChange}
                            settings={settings}
                            allow={["height", "padding", "border", "shadow"]}
                            responsiveSize={true}
                        />
                    }
                />   
            </div>
            <SubSettingsContainer
                name="Desktop"
                SettingsComponent={<DesktopTopbarSettings />}
            />
            <SubSettingsContainer
                name="Mobile"
                SettingsComponent={<></>}
            />
            <TextEditor 
                objectPath="menubar.topbar.desktop.links.text" 
                handleSettingChange={handleSettingChange}
                settings={settings}
                responsiveSize={false}
            />
        </div>
    )
}

export default TopbarSettings