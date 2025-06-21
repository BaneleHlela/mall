import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import TextEditor from "../../text/TextEditor";
import SettingsContainer from "../../SettingsContainer";


const FirstMenubarSettings = () => {
    const settings = useSelector((state: any) => state.layoutSettings);
    const dispatch = useDispatch();
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div className="p-4">
            <TextEditor 
                objectPath="menubar.topbar.text" 
                handleSettingChange={handleSettingChange}
                settings={settings}
            /> 
            <p className=""
                style={{
                    fontFamily: settings?.menubar?.topbar?.text?.fontFamily,
                }}
            >
                <SettingsContainer
                    name="Pages & Sections"
                    options={["replace"]}
                    SettingsComponent={<> </>}
                    onOptionClick={(option) => console.log(`${option} clicked`)}
                />
            </p>
        </div>
    )
};

export default FirstMenubarSettings;