import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import OptionsToggler from "../../supporting/OptionsToggler";
import { handleAddSectionToLinks } from "../hero/HeroSettings";
import DoctorAboutSettings from "./doctor_about/DoctorAboutSettings";
import AboutWithImageBehindTextSettings from "./with_image_behind_text/AboutWithImageBehindTextSettings";
import AboutWithImageNextToTextSettings from "./with_image_next_to_text/AboutWithImageNextToTextSettings";
import ShortAboutSettings from "./short_about/ShortAboutSettings";
import AboutWithLineAndImageSettings from "./with_line_and_image/AboutWithLineAndImageSettings";

const AboutSettingsSection = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const variation = useAppSelector((state) => state.layoutSettings.sections.about.variation);
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const pageSections = routes.home?.contains || [];
    

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    const menuBarToggle = (
        pageSections.includes('about') && (
            <div className="px-2 py-1 border rounded">
                <OptionsToggler
                    label="Add to Menubar ?"
                    options={["yes", "no"]}
                    value={
                        settings.routes?.home?.inLinks?.some(
                            link => link.section === "about"
                        )
                            ? "yes"
                            : "no"
                    }
                    onChange={(option) =>
                        handleAddSectionToLinks(dispatch, settings, "about", option)
                    }
                />
            </div>
        )
    );

    const renderSettings = () => {
        switch (variation) {
            case "aboutWithImageNextToText":
                return (
                    <div className="space-y-1">
                        {menuBarToggle}
                        <AboutWithImageNextToTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                        />
                    </div>
                );

            case "aboutWithImageBehindText":
                return (
                    <div className="space-y-1">
                        {menuBarToggle}
                        <AboutWithImageBehindTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                        />
                    </div>
                );

            case "doctorAbout":
                return (
                    <DoctorAboutSettings
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                    />
                )
            case "shortAbout":
                return (
                    <ShortAboutSettings />
                )
            case "aboutWithLineAndImage":
                return (
                    <AboutWithLineAndImageSettings />
                )
            default:
                return <div>No settings found for {settings.sections.about.variation}</div>;
        }
    };

    return renderSettings();
};

export default AboutSettingsSection;
