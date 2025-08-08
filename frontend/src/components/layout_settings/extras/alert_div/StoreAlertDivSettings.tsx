import React, { useState } from 'react'
import type { SupportingSettingsProps } from '../../sections/gallery/with_grouped_images/SupportingImagesSettings'
import { getSetting } from '../../../../utils/helperFunctions'
import OptionsToggler from '../../supporting/OptionsToggler'
import { FaPlus } from 'react-icons/fa'
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer'
import { defaultStoreButtonConfig } from '../../../../utils/defaults/extras/defaultStoreButtonConfig'
import { defaultAlertTextConfig, defaultAlertIconConfig } from '../../../../utils/defaults/extras/defaultStoreAlertDivConfig'
import SlidingPanel from '../../supporting/SlidingPanel'
import UnderlinedTextSettings from '../text/UnderlinedTextSettings'
import StoreButtonSettings from '../StoreButtonSettings'
import StoreAlertIconSettings from './supporting/StoreAlertIconSettings'
import BackgroundEditor from '../../background/BackgroundEditor'
import SubSettingsContainer from '../SubSettingsContainer'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AnimatePresence } from 'framer-motion'
import SettingsSlider from '../../supporting/SettingsSlider'

const MySwal = withReactContent(Swal);

const itemTypes = [
  { label: "Text", type: "text", defaultConfig: defaultAlertTextConfig },
  { label: "Button", type: "button", defaultConfig: defaultStoreButtonConfig },
  { label: "Icon", type: "icon", defaultConfig: defaultAlertIconConfig },
];



const StoreAlertDivSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    objectPath,
    handleSettingChange
}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const getNextKey = (type: string) => {
        const currentItems = Object.keys(getSetting("items", settings, objectPath) || {});
        const prefix = type;
        let suffix = "A";
      
        while (currentItems.includes(prefix + suffix)) {
          suffix = String.fromCharCode(suffix.charCodeAt(0) + 1); // A → B → C
        }
      
        return prefix + suffix;
    };
      
    const handleDeleteItemClick = async (itemKey: string) => {
        const result = await MySwal.fire({
          title: "Are you sure?",
          text: `Delete ${itemKey}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#aaa",
          confirmButtonText: "Yes, delete it!",
        });
      
        if (result.isConfirmed) {
            const items = { ...getSetting("items", settings, objectPath) };
            // Remove the item key from the items object
            delete items[itemKey];
            // Also remove it from the order array
            const updatedOrder = (items.order || []).filter((key: string) => key !== itemKey);
            // Clean up lingering 'order' key before setting
            delete items.order;
            // Apply the updated items and order
            handleSettingChange(`${objectPath}.items`, {
              ...items,
              order: updatedOrder,
            });            
        }
    };
      

    const handleAddItem = (type: string, defaultConfig: any) => {
        const newKey = getNextKey(type);
        const fullItemsPath = `${objectPath}.items`;
      
        handleSettingChange(`${fullItemsPath}.${newKey}`, defaultConfig);
      
        const newOrder = [
          ...(getSetting("items.order", settings, objectPath) || []),
          newKey,
        ];
      
        handleSettingChange(`${fullItemsPath}.order`, newOrder);
      
        setShowDropdown(false);
    };


    return (
        <div className='space-y-[.3vh] w-full flex flex-col items-center'>
            {/* Add Item Button and Dropdown */}
            <div className="relative">
                <button
                    className="text-[2vh] mb-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[5vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
                    onClick={() => setShowDropdown((prev) => !prev)}
                >
                    Add item <FaPlus className="ml-[.6vh]" />
                </button>

                {showDropdown && (
                    <div className="absolute top-[70%] z-10 bg-stone-50 border-[.6vh] border-white shadow-lg rounded w-full">
                    {itemTypes.map(({ label, type, defaultConfig }) => (
                        <div
                        key={type}
                        onClick={() => handleAddItem(type, defaultConfig)}
                        className="px-[1.2vh] py-[.6vh] hover:bg-stone-100 cursor-pointer text-black"
                        >
                        {label}
                        </div>
                    ))}
                    </div>
                )}
            </div>
            {/* Animation */}
            <OptionsToggler
                label="Mobile stack"
                options={["loop", "flash", "none"]}
                value={getSetting("animation", settings, objectPath)}
                onChange={(value) => handleSettingChange(`${objectPath}.animation`, value)}
            />
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.6vh] space-y-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["height", "color"]}
                        heightUnit="vh"
                        responsiveSize
                    />
                </div>
                }
            />
            <SubSettingsContainer
                name="Gaps"
                SettingsComponent={
                <div className="px-[.6vh] space-y-[.3vh]">
                    <SettingsSlider
                        label="Gap (Container)"
                        value={getSetting('items.gap.allItems', settings, objectPath)}
                        min={.1}
                        max={50}
                        onChange={(newValue) =>
                            handleSettingChange(`${objectPath}.items.gap.allItems`, newValue)
                        }
                    />
                    <SettingsSlider
                        label="Gap (Item)"
                        value={getSetting('items.gap.item', settings, objectPath)}
                        min={.1}
                        max={50}
                        onChange={(newValue) =>
                            handleSettingChange(`${objectPath}.items.gap.item`, newValue)
                        }
                    />
                </div>
                }
            />
            {getSetting("items.order", settings, objectPath)?.map((key: string) => {
                const type = key.startsWith("text")
                    ? "text"
                    : key.startsWith("button")
                    ? "button"
                    : "icon";

                const title = type === "text"
                    ? "Text Settings"
                    : type === "button"
                    ? "Button Settings"
                    : "Icon Settings";

                const onClick = () => setActivePanel(key);

                return (
                    <FirstOrderSubSettingsContainer
                    key={key}
                    name={key}
                    onClick={onClick}
                    deletable
                    onDeleteClick={() => handleDeleteItemClick(key)}
                    />
                );
            })}

            <AnimatePresence>
                {activePanel && activePanel.startsWith("text") && (
                    <SlidingPanel
                        isOpen={true}
                        onClose={closePanel}
                        title={`Text Settings (${activePanel})`}
                    >
                        <UnderlinedTextSettings
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        objectPath={`${objectPath}.items.${activePanel}`}
                        allowInput
                        />
                    </SlidingPanel>
                    )}

                    {activePanel && activePanel.startsWith("button") && (
                    <SlidingPanel
                        isOpen={true}
                        onClose={closePanel}
                        title={`Button Settings (${activePanel})`}
                    >
                        <StoreButtonSettings
                        settings={settings}
                        objectPath={`${objectPath}.items.${activePanel}`}
                        />
                    </SlidingPanel>
                    )}

                    {activePanel && activePanel.startsWith("icon") && (
                    <SlidingPanel
                        isOpen={true}
                        onClose={closePanel}
                        title={`Icon Settings (${activePanel})`}
                    >
                        <StoreAlertIconSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.items.${activePanel}`}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default StoreAlertDivSettings