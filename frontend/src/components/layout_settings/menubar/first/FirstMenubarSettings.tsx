import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import TextEditor from "../../text/TextEditor";


const FirstMenubarSettings = () => {
    const settings = useSelector((state: any) => state.layoutSettings);
    const dispatch = useDispatch();
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <>
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
                Did I work?
            </p>
        </>
    )
};

export default FirstMenubarSettings;