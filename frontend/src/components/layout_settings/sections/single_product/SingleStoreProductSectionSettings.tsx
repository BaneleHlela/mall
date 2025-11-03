import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import BackgroundEditor from '../../background/BackgroundEditor';
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../supporting/SlidingPanel';
import TextEditor from '../../text/TextEditor';
import { getSetting } from '../../../../utils/helperFunctions';
import OptionsToggler from '../../supporting/OptionsToggler';
import UnderlinedTextSettings from '../../extras/text/UnderlinedTextSettings';
import StoreButtonSettings from '../../extras/StoreButtonSettings';

const SingleStoreProductSectionSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const objectPath = "singleProduct"
    return (
        <div className='text-[2vh] space-y-[.3vh]'>
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.15vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["height", "width", "color", "padding"]}
                        widthUnit="vw"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />
            {/* Back to home text settings */}
            <FirstOrderSubSettingsContainer
                name="Exit Button"
                onClick={() => setActivePanel("exit")}
            />
            {/* Exit text settings */}
            <FirstOrderSubSettingsContainer
                name="Images"
                onClick={() => setActivePanel("images")}
            />
            {/* Exit text settings */}
            <FirstOrderSubSettingsContainer
                name="Details"
                onClick={() => setActivePanel("details")}
            />
            <AnimatePresence>
                {activePanel === "exit" && (
                    <SlidingPanel
                        key="exit"
                        isOpen={true}
                        onClose={closePanel}
                        title="Exit Button"
                    >    
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.exit`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.text.exit.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["height", "width", "color", "padding", "border"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                        </div> 
                    </SlidingPanel>
                )}
                {activePanel === "images" && (
                    <SlidingPanel
                        key="images"
                        isOpen={true}
                        onClose={closePanel}
                        title="Product Images Settings"
                    >    
                        <div className="space-y-[.4vh]">
                            <SubSettingsContainer
                                    name="Background"
                                    SettingsComponent={
                                    <div className="px-[.15vh] space-y-[.3vh]">
                                        <BackgroundEditor
                                            objectPath={`${objectPath}.images.background`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["height", "width"]}
                                            widthUnit="%"
                                            heightUnit="vh"
                                            responsiveSize
                                            responsivePadding
                                        />
                                    </div>
                                    }
                            />
                            {/* Back to home text settings */}
                            <FirstOrderSubSettingsContainer
                                name="Toggle Button"
                                onClick={() => setActivePanel("toggle_button")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "toggle_button" && (
                    <SlidingPanel
                        key="toggle_button"
                        isOpen={true}
                        onClose={() => setActivePanel("images")}
                        title="Image Toggle Button"
                    >    
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.images.toggleButton.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontSize" ]}
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.images.toggleButton.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "padding", "border"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                        </div> 
                    </SlidingPanel>
                )}
                {activePanel === "details" && (
                    <SlidingPanel
                        key="details"
                        isOpen={true}
                        onClose={closePanel}
                        title="Product Details settings"
                    >    
                        <div className="space-y-[.3vh]">
                            {/* Details Background settings */}
                            <FirstOrderSubSettingsContainer
                                name="Background"
                                onClick={() => setActivePanel("details_background")}
                            />
                            {/* Labels text settings */}
                            <FirstOrderSubSettingsContainer
                                name="Labels Text"
                                onClick={() => setActivePanel("details_labels_text")}
                            />
                            {/* Name And Price settings */}
                            <FirstOrderSubSettingsContainer
                                name="Name And Price"
                                onClick={() => setActivePanel("details_name_and_price")}
                            />
                            {/* Variation Selector settings */}
                            <FirstOrderSubSettingsContainer
                                name="Variation Selector"
                                onClick={() => setActivePanel("details_variation_selector")}
                            />
                            {/* Message Box settings */}
                            <FirstOrderSubSettingsContainer
                                name="Message Box"
                                onClick={() => setActivePanel("details_message_box")}
                            />
                            {/* Quantity Updater settings */}
                            <FirstOrderSubSettingsContainer
                                name="Quantity Updater"
                                onClick={() => setActivePanel("details_quantity_updater")}
                            />
                            {/* Add To Cart Button settings */}
                            <FirstOrderSubSettingsContainer
                                name="Add To Cart Button"
                                onClick={() => setActivePanel("details_add_to_cart")}
                            />
                            {/* Description settings */}
                            <FirstOrderSubSettingsContainer
                                name="Product Description"
                                onClick={() => setActivePanel("details_product_description")}
                            />
                        </div> 
                    </SlidingPanel>
                )}
                {activePanel === "details_background" && (
                    <SlidingPanel
                        key="details_background"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Details Background settings"
                    >
                        <BackgroundEditor
                            objectPath={`${objectPath}.details.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "padding", "border", "height"]}
                            widthUnit="vw"
                            heightUnit="vh"
                            responsiveSize
                            responsivePadding
                        />
                    </SlidingPanel>
                )}
                {activePanel === "deta_background" && (
                    <SlidingPanel
                        key="deta_background"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Details Background settings"
                    >
                        <></>
                    </SlidingPanel>
                )}
                {activePanel === "details_variation_selector" && (
                    <SlidingPanel
                        key="variation_selector"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Variation Selector settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Container"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.variationSelector.background.container`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "padding", "height"]}
                                        widthUnit="vw"
                                        heightUnit="%"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Label"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.details.variationSelector.text.label`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "input" ]}
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.details.variationSelector.text.dropdown`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontSize", "weight", "fontFamily" ]}
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Button Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.variationSelector.background.button`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "padding", "border"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Dropdown"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.variationSelector.background.dropdown`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "border"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                        </div>
                        
                    </SlidingPanel>
                )}
                {activePanel === "details_message_box" && (
                    <SlidingPanel
                        key="message_box"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Message Box settings"
                    >
                        <div className="space-y-[.3vh]">
                            <div className="px-2">
                                <OptionsToggler
                                label={`Show`}
                                options={["yes", "no"]}
                                value={
                                    getSetting(`details.messageBox.show`, settings, objectPath)
                                    ? "yes"
                                    : "no"
                                }
                                onChange={(value) =>
                                    handleSettingChange(
                                    `${objectPath}.details.messageBox.show`,
                                    value === "yes"
                                    )
                                }
                                />
                            </div>
                            <SubSettingsContainer
                                name="Title Input"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.details.messageBox.titleInput`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "input" ]}
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Placeholder"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.details.messageBox.placeholder`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "textArea" ]}
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Container"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.messageBox.background.container`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "border", "padding"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.details.messageBox.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontSize", "weight" ]}
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Message Box Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.messageBox.background.box`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "padding", "border", "height"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                        </div>
                        
                    </SlidingPanel>
                )}
                {activePanel === "details_quantity_updater" && (
                    <SlidingPanel
                        key="quantity_updater"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Quantity Updater Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Container"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.quantityUpdater.background.container`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "border", "padding", "position"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.details.quantityUpdater.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontSize", "weight", "fontFamily" ]}
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Button Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.quantityUpdater.background.button`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "padding", "border", "width", "height"]}
                                        widthUnit="%"
                                        heightUnit="%"
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                        </div>
                        
                    </SlidingPanel>
                )}
                
                {activePanel === "details_product_description" && (
                    <SlidingPanel
                        key="product_description"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Product Description settings"
                    >
                        <TextEditor
                            objectPath={`${objectPath}.details.description.text`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={[ "color", "fontSize", "weight", "padding", "fontFamily" ]}
                            responsivePadding
                        />      
                    </SlidingPanel>
                )}
                {activePanel === "details_labels_text" && (
                    <SlidingPanel
                        key="details_labels_text"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Labels Text settings"
                    >
                        <TextEditor
                            objectPath={`${objectPath}.details.text.labels`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={[ "color", "fontSize", "position", "weight", "fontFamily" ]}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "details_name_and_price" && (
                    <SlidingPanel
                        key="details_name_and_price"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Name And Price settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.details.nameAndPrice.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "padding", "border", "height"]}
                                        widthUnit="vw"
                                        heightUnit="%"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Name"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <UnderlinedTextSettings
                                        objectPath={`${objectPath}.details.nameAndPrice.name`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Price"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <UnderlinedTextSettings
                                        objectPath={`${objectPath}.details.nameAndPrice.price`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "details_add_to_cart" && (
                    <SlidingPanel
                        key="details_add_to_cart"
                        isOpen={true}
                        onClose={() => setActivePanel("details")}
                        title="Add To Cart Button settings"
                    >
                        <StoreButtonSettings
                            objectPath={`${objectPath}.details.addToCartBtn`}
                            settings={settings}
                            allowPosition
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SingleStoreProductSectionSettings;