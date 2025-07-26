import React from 'react'
import type { SupportingSettingsProps } from '../../sections/gallery/with_grouped_images/SupportingImagesSettings'
import TextEditor from '../../text/TextEditor'
import SubSettingsContainer from '../SubSettingsContainer'
import { getSetting } from '../../../../utils/helperFunctions'
import OptionsToggler from '../../supporting/OptionsToggler'
import ColorPicker from '../../supporting/ColorPicker'
import SettingsSlider from '../../supporting/SettingsSlider'

const UnderlinedTextSettings: React.FC<SupportingSettingsProps & { allowInput?: boolean, responsiveSize?: boolean }> = ({
    settings,
    handleSettingChange,
    objectPath,
    allowInput = false,
    responsiveSize = false
}) => {
    const allowArray = [
        "position",
        "fontFamily",
        "fontSize",
        "color",
        "weight",
        "fontStyle",
        "letterSpacing",
        "textTransform",
        "lineHeight",
        "textDecoration",
        "padding",
        ...(allowInput ? ["input"] : []) // Include "input" only if allowInput is true
    ];

    const handleChange =
        (field: string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };


    return (
        <div className="space-y-1">
            <SubSettingsContainer
                name={"Text"}
                SettingsComponent={
                    <TextEditor
                        objectPath={`${objectPath}`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={allowArray}
                        responsiveSize={responsiveSize}
                        responsivePadding
                    />
                }
            />
            <SubSettingsContainer
                name="Underline"
                SettingsComponent={
                    <div className='px-[.6vh]'>
                        <OptionsToggler
                            label="Show"
                            options={["yes", "no"]}
                            value={getSetting("underline.show", settings, objectPath) ? "yes" : "no"}
                            onChange={(value) => handleSettingChange(`${objectPath}.underline.show`, value === "yes")}
                        />
                        <ColorPicker
                            label="Color"
                            value={getSetting("underline.color", settings, objectPath)}
                            onChange={handleChange("underline.color")}
                        />
                        <SettingsSlider
                            label="Width"
                            value={parseInt(getSetting("underline.width", settings, objectPath))}
                            onChange={(value) => handleSettingChange(`${objectPath}.underline.width`, `${value}%`)}
                            min={0}
                            max={100}
                        />
                        <SettingsSlider
                            label='Thickness'
                            value={parseFloat(getSetting("underline.height", settings, objectPath))}
                            onChange={(value) => handleSettingChange(`${objectPath}.underline.height`, `${value}vh`)}
                            min={.1}
                            max={5}
                            step={.1}
                        />
                        <SettingsSlider
                            label='Margin Top'
                            value={parseFloat(getSetting("underline.marginTop", settings, objectPath))}
                            onChange={(value) => handleSettingChange(`${objectPath}.underline.marginTop`, `${value}vh`)}
                            min={0}
                            max={15}
                            step={.1}
                        />
                    </div>
                }
            />
        </div>
    )
}

export default UnderlinedTextSettings