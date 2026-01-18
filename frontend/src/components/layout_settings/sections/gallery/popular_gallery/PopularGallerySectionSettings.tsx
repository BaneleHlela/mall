import { useState } from "react";
import type { SectionSettingsProps } from "../with_image_slider/GalleryWithImageSliderSettings"
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import BackgroundEditor from "../../../background/BackgroundEditor";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import OptionsToggler from "../../../supporting/OptionsToggler";
import ResponsiveGridSettings from "../../../extras/ResponsiveGridSettings";
import BorderEditor from "../../../background/BorderEditor";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";
import Swal from 'sweetalert2';

const PopularGallerySectionSettings: React.FC<SectionSettingsProps>  = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "sections.gallery";

    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    const imagesDetails = settings.sections.gallery.images.imagesDetails || [];

    const handleAddGroup = () => {
        const newGroup = {
            title: `Group ${imagesDetails.length + 1}`,
            description: "",
            urls: ["https://placehold.co/600x400"]
        };
        const updatedDetails = [...imagesDetails, newGroup];
        handleSettingChange(`${objectPath}.images.imagesDetails`, updatedDetails);
    };

    const handleDeleteGroup = (index: number) => async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete "${imagesDetails[index]?.title || `Group ${index + 1}`}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            const updatedDetails = imagesDetails.filter((_: any, i: number) => i !== index);
            handleSettingChange(`${objectPath}.images.imagesDetails`, updatedDetails);
            Swal.fire('Deleted!', 'The group has been deleted.', 'success');
        }
    };

    return (
        <div className="space-y-1">
            {/* Background */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-2 space-y-2">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["width", "color", "padding"]}
                        responsivePadding
                        widthUnit="%"
                        responsiveSize
                    />
                </div>
                }
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("Text")}
            />
            {/* Images */}
            <FirstOrderSubSettingsContainer
                name="Images"
                onClick={() => setActivePanel("Images")}
            />
            <AnimatePresence>
                {activePanel === "Text" && (
                    <SlidingPanel
                        key="text" isOpen={true} onClose={closePanel} title="Text Settings"
                    >
                        <div className="space-y-[.3vh]">
                            {/* Heading */}
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            {/* Subheading */}
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
                    <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="Subheading Settings">
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
                {activePanel === "Images" && (
                    <SlidingPanel
                        key="images"
                        onClose={closePanel}
                        isOpen={true}
                        title="Gallery Images"
                    >
                        <div className="space-y-[.35vh]">
                            {/* Layout */}
                            <FirstOrderSubSettingsContainer
                                name="Image Text"
                                onClick={() => setActivePanel("imageText")}
                            />
                            {/* Image Groups */}
                            <SubSettingsContainer
                                name="Image Groups"
                                SettingsComponent={
                                    <div className="px-2 space-y-2">
                                        {imagesDetails.length === 0 && (
                                            <div className="text-center text-gray-500">No groups available. Click "Add Group" to get started.</div>
                                        )}
                                        {imagesDetails.map((group: any, index: number) => (
                                            <FirstOrderSubSettingsContainer
                                                key={index}
                                                name={group.title || `Group ${index + 1}`}
                                                onClick={() => setActivePanel(`group-${index}`)}
                                                deletable
                                                onDeleteClick={handleDeleteGroup(index)}
                                            />
                                        ))}
                                        <div className="pt-4 w-full flex flex-row justify-center">
                                            <button
                                                onClick={handleAddGroup}
                                                className="text-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[2.4vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
                                            >
                                                + Add Group
                                            </button>
                                        </div>
                                    </div>
                                }
                            />
                            {/* Image Background */}
                            <SubSettingsContainer
                                name="Image Background"
                                SettingsComponent={
                                    <div className="px-2 space-y-2">
                                        <BorderEditor
                                            objectPath={`${objectPath}.images.background.border`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["width", "style", "color", "radius"]}
                                        />
                                        <BackgroundEditor
                                            objectPath={`${objectPath}.images.background`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["height"]}
                                            responsiveSize
                                            heightUnit="vh"
                                        />
                                    </div>
                                }
                            />
                            {/* Layout */}
                            <SubSettingsContainer
                                name="Layout"
                                SettingsComponent={
                                    <div className="px-2 space-y-2">
                                        <OptionsToggler
                                            label="Stack Direction"
                                            options={['horizontal', 'vertical']}
                                            value={settings.sections.gallery.images.stack.mobile}
                                            onChange={(value) => handleSettingChange(`${objectPath}.images.stack.mobile`, value)}
                                        />
                                        <OptionsToggler
                                            label="Desktop Stack Direction"
                                            options={['horizontal', 'vertical']}
                                            value={settings.sections.gallery.images.stack.desktop}
                                            onChange={(value) => handleSettingChange(`${objectPath}.images.stack.desktop`, value)}
                                        />
                                        <ResponsiveGridSettings
                                            objectPath={`${objectPath}.images`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {imagesDetails.map((group: any, index: number) => (
                    activePanel === `group-${index}` && (
                        <SlidingPanel key={`group-${index}`} isOpen={true} onClose={() => setActivePanel("Images")} title="Group Settings">
                            <div className="space-y-1">
                                {/* Title */}
                                <SubSettingsContainer
                                    name="Title"
                                    SettingsComponent={
                                        <div className="px-2">
                                            <TextEditor
                                                objectPath={`${objectPath}.images.imagesDetails.${index}`}
                                                settings={settings}
                                                handleSettingChange={handleSettingChange}
                                                allow={["title"]}
                                            />
                                        </div>
                                    }
                                />
                                {/* Description */}
                                <SubSettingsContainer
                                    name="Description"
                                    SettingsComponent={
                                        <div className="px-2">
                                            <label className="block text-sm font-medium mb-1">Description</label>
                                            <textarea
                                                className="w-full border border-gray-300 p-2 rounded text-sm"
                                                value={group.description}
                                                onChange={(e) => handleSettingChange(`${objectPath}.images.imagesDetails.${index}.description`, e.target.value)}
                                                rows={4}
                                            />
                                        </div>
                                    }
                                />
                                {/* Images */}
                                <SubSettingsContainer
                                    name="Images"
                                    SettingsComponent={
                                        <div className="px-2">
                                            <MultipleLayoutImagesHandler
                                                objectPath={`${objectPath}.images.imagesDetails.${index}.urls`}
                                                images={group.urls}
                                                min={1}
                                                max={20}
                                            />
                                        </div>
                                    }
                                />
                            </div>
                        </SlidingPanel>
                    )
                ))}
                {activePanel === "imageText" && (
                        <SlidingPanel
                            key="imageText"
                            isOpen={true}
                            onClose={() => setActivePanel("Images")}
                            title="Image Text Settings"
                        >
                            <div className="space-y-2">
                                <SubSettingsContainer
                                    name="Title"
                                    SettingsComponent={
                                        <TextEditor
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            objectPath={`${objectPath}.images.text.title`}
                                            responsiveSize
                                            allow={["fontSize", "fontFamily", "color", "weight", "padding"]}
                                            responsivePadding
                                        />
                                    }
                                />
                                
                                <SubSettingsContainer
                                    name="Description"
                                    SettingsComponent={
                                        <TextEditor
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            objectPath={`${objectPath}.images.text.description`}
                                            responsiveSize
                                            allow={["fontSize", "fontFamily", "color", "weight", "padding"]}
                                            responsivePadding
                                        />
                                    }
                                />
                            </div>
                        </SlidingPanel>
                    )}
            </AnimatePresence>
        </div>
    )
}

export default PopularGallerySectionSettings;