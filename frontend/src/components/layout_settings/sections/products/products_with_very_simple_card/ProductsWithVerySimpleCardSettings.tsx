import React, { useState } from 'react'
import type { SectionEditorProps } from '../../SectionSettings'
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';
import TextEditor from '../../../text/TextEditor';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';
import BorderEditor from '../../../background/BorderEditor';
import { getSetting } from '../../../../../utils/helperFunctions';
import OptionsToggler from '../../../supporting/OptionsToggler';

const ProductsWithVerySimpleCardSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath ='sections.products';
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    return (
        <div className='space-y-[.3vh]'>
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <div className="px-[.8vh] space-y-[.7vh]">
                        <BackgroundEditor
                            objectPath={`${objectPath}.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["width", "color", "padding",]}
                            widthUnit="%"
                            responsiveSize
                            responsivePadding
                        />
                    </div>
                }
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("Text")}
            />
            <FirstOrderSubSettingsContainer
                name="Category Selector"
                onClick={() => setActivePanel("categorySelector")}
            />
            <FirstOrderSubSettingsContainer
                name="Accepting Orders Button"
                onClick={() => setActivePanel("acceptingOrdersButton")}
            />
            <FirstOrderSubSettingsContainer
                name="Pickup or Delivery"
                onClick={() => setActivePanel("pickupOrDelivery")}
            />
            <FirstOrderSubSettingsContainer
                name="Category Divider"
                onClick={() => setActivePanel("categoryDivider")}
            />
            <FirstOrderSubSettingsContainer
                name="Cards"
                onClick={() => setActivePanel("cards")}
            />

            <AnimatePresence>
                {activePanel === "Text" && (
                    <SlidingPanel
                        key="text" isOpen={true} onClose={closePanel} title="Text Settings"
                    >
                        <div className="space-y-[.3vh]">
                            {/* Text */}
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            {/* Text */}
                            <FirstOrderSubSettingsContainer
                                name="Subheading"
                                onClick={() => setActivePanel("subheading")}
                            />
                        </div>

                    </SlidingPanel>
                )}
                {activePanel === "heading" && (
                    <SlidingPanel key="heading" isOpen={true} onClose={() => setActivePanel("Text")} title="Heading Settings">
                        <div className="space-y-[.3vh]">
                            <UnderlinedTextSettings
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.heading`}
                                allowInput
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "subheading" && (
                    <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="subheading Settings">
                        <div className="space-y-[.3vh]">
                            <UnderlinedTextSettings
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.subheading`}
                                allowInput
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "categorySelector" && (
                    <SlidingPanel key="categorySelector" isOpen={true} onClose={closePanel} title="Category Selector">
                        <div className="space-y-[.3vh] border-[.15vh] rounded-[.6vh]">
                            <div className="px-[.65vh]">
                                <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={getSetting("categorySelector.show", settings, objectPath)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.categorySelector.show`, e.target.checked)}
                                        />
                                        <label>Show Category Selector</label>
                                    </div>
                                </div>
                            </div>
                            <SubSettingsContainer
                                name="Width"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.categorySelector`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["width"]}
                                        widthUnit='%'
                                        responsiveSize
                                    />
                                }
                            />
                        </div>
                        <div className="space-y-[.3vh]">
                             <SubSettingsContainer
                                 name="Text"
                                 SettingsComponent={
                                     <TextEditor
                                         objectPath={`${objectPath}.categorySelector.text`}
                                         settings={settings}
                                         handleSettingChange={handleSettingChange}
                                         allow={["fontFamily", "fontSize", "color", "weight"]}
                                         responsiveSize
                                     />
                                 }
                             />
                             <SubSettingsContainer
                                 name="Selected Color"
                                 SettingsComponent={
                                     <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                         <OptionsToggler
                                             label="Selected Color"
                                             options={["primary", "secondary", "accent", "quad", "pent"]}
                                             value={getSetting("categorySelector.selectedColor", settings, objectPath)}
                                             onChange={(newValue) => handleSettingChange(`${objectPath}.categorySelector.selectedColor`, newValue)}
                                         />
                                     </div>
                                 }
                             />
                         </div>
                    </SlidingPanel>
                )}
                {activePanel === "acceptingOrdersButton" && (
                    <SlidingPanel key="acceptingOrdersButton" isOpen={true} onClose={closePanel} title="Accepting Orders Button">
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Position"
                                SettingsComponent={
                                    <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                        <OptionsToggler
                                            label="Position"
                                            options={["center", "start", "end"]}
                                            value={getSetting("acceptingOrdersButton.position", settings, objectPath)}
                                            onChange={(value) => handleSettingChange(`${objectPath}.acceptingOrdersButton.position`, value)}
                                        />
                                    </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                    <div className="px-2">
                                        <TextEditor
                                            objectPath={`${objectPath}.acceptingOrdersButton.text`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["input", "fontFamily", "color", "fontSize", "weight", "animation", "lineHeight"]}
                                            responsiveSize={false}
                                        />
                                    </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.acceptingOrdersButton.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "shadow", "border", "padding", "shadow"]}
                                        widthUnit='%'
                                        responsiveSize={false}
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "pickupOrDelivery" && (
                    <SlidingPanel key="pickupOrDelivery" isOpen={true} onClose={closePanel} title="Pickup or Delivery">
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Position"
                                SettingsComponent={
                                    <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                        <OptionsToggler
                                            label="Position"
                                            options={["center", "start", "end"]}
                                            value={getSetting("pickupOrDelivery.position", settings, objectPath)}
                                            onChange={(value) => handleSettingChange(`${objectPath}.pickupOrDelivery.position`, value)}
                                        />
                                    </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Font Family"
                                SettingsComponent={
                                    <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                        <select
                                            value={getSetting("pickupOrDelivery.fontFamily", settings, objectPath)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.pickupOrDelivery.fontFamily`, e.target.value)}
                                        >
                                            <option value="primary">Primary</option>
                                            <option value="secondary">Secondary</option>
                                        </select>
                                    </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <div className="space-y-[.3vh]">
                                        <BackgroundEditor
                                            objectPath={`${objectPath}.pickupOrDelivery.background`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["width", "padding", "border"]}
                                            widthUnit="%"
                                            responsiveSize
                                            responsivePadding
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "categoryDivider" && (
                    <SlidingPanel key="categoryDivider" isOpen={true} onClose={closePanel} title="Category Divider">
                        <div className="space-y-[.3vh]">
                            <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={getSetting("categoryDivider.show", settings, objectPath)}
                                        onChange={(e) => handleSettingChange(`${objectPath}.categoryDivider.show`, e.target.checked)}
                                    />
                                    <label>Show Category Divider</label>
                                </div>
                            </div>
                            <TextEditor
                                objectPath={`${objectPath}.categoryDivider`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["fontFamily", "color", "textAlign", "weight", "fontSize", "padding"]}
                                responsivePadding
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cards" && (
                    <SlidingPanel key="card" isOpen={true} onClose={closePanel} title="Cards Settings">
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.card.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["height", "border", "padding", "color"]}
                                        heightUnit="vh"
                                        responsiveSize
                                        responsivePadding
                                    />
                                }
                            />
                            <FirstOrderSubSettingsContainer
                                name="Text"
                                onClick={() => setActivePanel("cardText")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cardText" && (
                    <SlidingPanel key="cardText" isOpen={true} onClose={() => setActivePanel("cards")} title="Card Text Settings">
                        <div className="space-y-[.3vh]">
                            <FirstOrderSubSettingsContainer
                                name="Name"
                                onClick={() => setActivePanel("cardName")}
                            />
                            <FirstOrderSubSettingsContainer
                                name="Description"
                                onClick={() => setActivePanel("cardDescription")}
                            />
                            <FirstOrderSubSettingsContainer
                                name="Price"
                                onClick={() => setActivePanel("cardPrice")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cardName" && (
                    <SlidingPanel key="cardName" isOpen={true} onClose={() => setActivePanel("cardText")} title="Card Name Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.card.text.name`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["fontSize", "color", "fontFamily", "textAlign"]}
                                responsiveSize
                            />
                            <BackgroundEditor
                                objectPath={`${objectPath}.card.text.name`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["padding"]}
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cardDescription" && (
                    <SlidingPanel key="cardDescription" isOpen={true} onClose={() => setActivePanel("cardText")} title="Card Description Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.card.text.description`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["fontSize", "color", "fontFamily", "textAlign"]}
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cardPrice" && (
                    <SlidingPanel key="cardPrice" isOpen={true} onClose={() => setActivePanel("cardText")} title="Card Price Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.card.text.price`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["fontSize", "color", "fontFamily", "textAlign", "weight"]}
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProductsWithVerySimpleCardSettings;