import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import TextEditor from "../../../text/TextEditor";

const TopbarSettings = () => {
    const settings = useAppSelector((state: any) => state.layoutSettings);

    const dispatch = useAppDispatch();
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    return (
        <div
            className="p-1.5"
        >
            <TextEditor 
                objectPath="menubar.topbar.desktop.links.text" 
                handleSettingChange={handleSettingChange}
                settings={settings}
            />
        </div>
    )
}

export default TopbarSettings