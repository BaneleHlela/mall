import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import TextEditor from "../../text/TextEditor";


const FirstMenubarSettings = () => {
    const settings = useSelector((state: any) => state.layoutSettings);
    console.log(settings?.menubar?.sidebar?.text?.fontFamily)
    const dispatch = useDispatch();
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <>
            <TextEditor 
                objectPath="menubar.topbar.text" 
                handleSettingChange={handleSettingChange}
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