import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import OptionsToggler from "../../supporting/OptionsToggler";
import { handleAddSectionToLinks } from "../hero/HeroSettings";
import FirstFAQsSettings from "./first_faqs/FirstFAQsSettings";

const FAQsSectionSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const variation = useAppSelector((state) => state.layoutSettings.sections.FAQs.variation);
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const pageSections = routes.home?.contains || [];


    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    const menuBarToggle = (
        pageSections.includes('FAQs') && (
            <div className="px-2 py-1 border rounded">
                <OptionsToggler
                    label="Add to Menubar ?"
                    options={["yes", "no"]}
                    value={
                        settings.routes?.home?.inLinks?.some(
                            link => link.section === "FAQs"
                        )
                            ? "yes"
                            : "no"
                    }
                    onChange={(option) =>
                        handleAddSectionToLinks(dispatch, settings, "FAQs", option)
                    }
                />
            </div>
        )
    );

    const renderSettings = () => {
        switch (variation) {
            case "firstFAQs":
                return (
                    <div className="space-y-1">
                        {menuBarToggle}
                        <FirstFAQsSettings />
                    </div>
                );
            default:
                return <div>No settings found for {settings.sections.FAQs.variation}</div>;
        }
    };

    return renderSettings();
};

export default FAQsSectionSettings;