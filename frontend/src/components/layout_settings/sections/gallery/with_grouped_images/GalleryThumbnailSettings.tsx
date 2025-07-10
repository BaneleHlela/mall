import React from 'react'
import type { SupportingSettingsProps } from './SupportingImagesSettings'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import TextEditor from '../../../text/TextEditor'
import BackgroundEditor from '../../../background/BackgroundEditor'
import ResponsiveGridSettings from '../../../extras/ResponsiveGridSettings'

const GalleryThumbnailSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath,
}) => {
  return (
    <div className='space-y-1'>
        <SubSettingsContainer
                name="Grid"
                SettingsComponent={
                    <ResponsiveGridSettings
                        objectPath={`${objectPath}.imagesModal.grids.thumbnail`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        columnOptions={{
                            mobile: ['1', '2'],
                            desktop: ['1', '2', '3', '4', '5']
                        }}
                        gapRange={{
                            mobile: { min: 0, max: 50 },
                            desktop: { min: 0, max: 100 }
                        }}
                    />
                }
        />
        {/* Background */}
        <SubSettingsContainer
            name="Background"
            SettingsComponent={
            <div className="px-2 space-y-2">
                <BackgroundEditor
                    objectPath={`${objectPath}.imagesModal.background.thumbnail`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color", "border"]}
                    heightUnit='vh'
                    responsiveSize
                />
            </div>
            }
        />
        {/* Background */}
        <SubSettingsContainer
            name="Image"
            SettingsComponent={
            <div className="px-2 space-y-2">
                <BackgroundEditor
                    objectPath={`${objectPath}.imagesModal.background.image`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["height", "border"]}
                    heightUnit='vh'
                    responsiveSize
                />
            </div>
            }
        />
        <SubSettingsContainer
            name="Title"
            SettingsComponent ={
                <TextEditor
                    objectPath={`${objectPath}.text.groupName`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={[ "color", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                    responsiveSize
                />
            }
        />
    </div>
  )
}

export default GalleryThumbnailSettings