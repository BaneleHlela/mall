import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import SettingsContainer from "./SettingsContainer";
import SlidingPanel from "./supporting/SlidingPanel";
import { IoIosSettings } from "react-icons/io";
import { Settings, Text, Image, Layout } from "lucide-react";
import SubSettingsContainer from "./extras/SubSettingsContainer";
import TextEditor from "./text/TextEditor";
import OptionsToggler from "./supporting/OptionsToggler";
import MultipleLayoutImagesHandler from "./supporting/MultipleLayoutImagesHandler";
import SettingsSlider from "./supporting/SettingsSlider";
import ColorPicker from "./supporting/ColorPicker";
import { useAppDispatch } from "../../app/hooks";
import { updateSetting } from "../../features/searchPosts/searchPostSettingsSlice";

interface SearchPostsSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  searchPostSettings?: any;
}

const SearchPostsSettings: React.FC<SearchPostsSettingsProps> = ({
  isOpen,
  onClose,
  searchPostSettings,
}) => {
  const dispatch = useAppDispatch();
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const closePanel = () => {
    setActivePanel(null);
  };

  const handlePanelOpen = (panelId: string) => {
    setActivePanel(panelId);
  };

  const settingsItems = [
    { id: "general", name: "General", icon: Settings, onClick: () => handlePanelOpen("general") },
    { id: "text", name: "Text", icon: Text, onClick: () => handlePanelOpen("text") },
    { id: "largeImage", name: "Large Image", icon: Image, onClick: () => handlePanelOpen("largeImage") },
    { id: "carousel", name: "Carousel", icon: Layout, onClick: () => handlePanelOpen("carousel") },
  ];

  function onPanelClose(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className="fixed lg:relative h-full w-screen sm:w-80 lg:w-[45vh] z-20 flex flex-col bg-white shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-stone-800 to-stone-700 text-white">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Layout className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-[2.5vh] font-semibold tracking-wide">Settings</h1>
                  <p className="text-[1.7vh] text-stone-300">Customize your search post</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Bar */}
          <div className="flex-shrink-0 px-[1.2vh] py-[.8vh] bg-stone-100 border-b border-stone-200">
            <button
              onClick={() => handlePanelOpen("text")}
              className="w-full flex items-center justify-center space-x-[.8vh] py-[.8vh] px-[1.6vh] bg-gradient-to-r from-stone-700 to-stone-600 text-white rounded-lg hover:from-stone-600 hover:to-stone-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <IoIosSettings className="text-[2.5vh]" />
              <span className="text-[1.8vh] font-medium">Quick Text Settings</span>
            </button>
          </div>

          {/* Settings List */}
          <div className="flex-1 overflow-y-auto p-[1.2vh] space-y-[.8vh]">
            {settingsItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <SettingsContainer
                    name={item.name}
                    onClick={item.onClick}
                    icon={<IconComponent size={18} />}
                    isActive={activePanel === item.id}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-4 py-3 bg-stone-50 border-t border-stone-200">
            <p className="text-[1.6vh] text-stone-500 text-center">
              {searchPostSettings.type}
            </p>
          </div>

          {/* Sliding Panels */}
          <AnimatePresence>
            {activePanel === 'general' && searchPostSettings && (
              <SlidingPanel
                isOpen={true}
                onClose={closePanel}
                title="General Settings"
                panelId="general"
                //onHomeClick={() => onPanelClose?.()}
              >
                <div className="space-y-1.5">
                  <SubSettingsContainer
                    name="Variation"
                    SettingsComponent={
                      <div className="px-1.5 space-y-1.5">
                        <OptionsToggler
                          label="Select Variation"
                          options={[
                            'basicProductCarousel',
                            'basicStoreCarousel',
                            'simpleStoreCarousel',
                            'carouselWithJSXAndProducts',
                          ]}
                          value={searchPostSettings.variation}
                          onChange={(value: string) =>
                            dispatch(updateSetting({ field: 'variation', value }))
                          }
                        />
                      </div>
                    }
                  />

                  <SubSettingsContainer
                    name="Type"
                    SettingsComponent={
                      <div className="px-1.5 space-y-1.5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Post Type
                          </label>
                          <input
                            type="text"
                            value={searchPostSettings.type}
                            onChange={(e) =>
                              dispatch(updateSetting({ field: 'type', value: e.target.value }))
                            }
                            placeholder="e.g., top-rated-on-the-mall"
                            className="w-full px-1.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    }
                  />

                  <SubSettingsContainer
                    name="Likelihood Index"
                    SettingsComponent={
                      <div className="px-1.5 space-y-1.5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Likelihood Index
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={searchPostSettings.likelihoodIndex}
                            onChange={(e) =>
                              dispatch(
                                updateSetting({ field: 'likelihoodIndex', value: parseInt(e.target.value) })
                              )
                            }
                            className="w-full px-1.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Higher values increase likelihood of being shown
                          </p>
                        </div>
                      </div>
                    }
                  />

                   <SubSettingsContainer
                     name="Status"
                     SettingsComponent={
                       <div className="px-1.5 space-y-1.5">
                         <OptionsToggler
                           label="Active"
                           options={['true', 'false']}
                           value={searchPostSettings.isActive ? 'true' : 'false'}
                           onChange={(value: string) =>
                             dispatch(updateSetting({ field: 'isActive', value: value === 'true' }))
                           }
                         />
                       </div>
                     }
                   />

                   <SubSettingsContainer
                     name="Colors"
                     SettingsComponent={
                       <div className="w-full space-y-3 p-2 overflow-y-scroll hide-scrollbar">
                         {[
                           { key: 'backgroundColor', label: 'Background' },
                           { key: 'accentColor', label: 'Accent' },
                           { key: 'carouselBackgroundColor', label: 'Carousel Background' },
                         ].map(({ key, label }) => (
                           <div
                             key={key}
                             className="flex flex-row justify-between items-center bg-white rounded-lg p-2 shadow-sm border border-stone-100"
                           >
                             <div className="flex items-center gap-2">
                               <div
                                 className="w-6 h-6 rounded-full border-2 border-stone-200 shadow-sm"
                                 style={{
                                   backgroundColor: searchPostSettings.style?.colors?.[key as keyof typeof searchPostSettings.style.colors] || '#000000'
                                 }}
                               />
                               <span className="text-xs font-medium text-stone-600">{label}</span>
                             </div>
                             <ColorPicker
                               label=""
                               value={searchPostSettings.style?.colors?.[key as keyof typeof searchPostSettings.style.colors] || '#000000'}
                               onChange={(e) => dispatch(updateSetting({ field: `style.colors.${key}`, value: e.target.value }))}
                             />
                           </div>
                         ))}
                       </div>
                     }
                   />
                 </div>
              </SlidingPanel>
            )}

            {activePanel === 'text' && searchPostSettings && (
              <SlidingPanel
                isOpen={true}
                onClose={closePanel}
                title="Text Settings"
                panelId="text"
                onHomeClick={() => onPanelClose?.()}
              >
                <div className="space-y-1.5">
                  <SubSettingsContainer
                    name="Heading"
                    SettingsComponent={
                      <div className="space-y-1.5">
                        <TextEditor
                          objectPath="style.text.heading"
                          settings={searchPostSettings as any}
                          handleSettingChange={(path: string, value: any) => {
                            const field = path.split('.slashseparator').join('.');
                            dispatch(updateSetting({ field, value }));
                          }}
                          allow={['input']}
                        />
                      </div>
                    }
                  />
                  <SubSettingsContainer
                    name="Subheading"
                    SettingsComponent={
                      <div className="space-y-1.5">
                        <TextEditor
                          objectPath="style.text.subheading"
                          settings={searchPostSettings as any}
                          handleSettingChange={(path: string, value: any) => {
                            const field = path.split('.slashseparator').join('.');
                            dispatch(updateSetting({ field, value }));
                          }}
                          allow={['input']}
                        />
                      </div>
                    }
                  />
                </div>
              </SlidingPanel>
            )}

            {activePanel === 'largeImage' && searchPostSettings && (
              <SlidingPanel
                isOpen={true}
                onClose={closePanel}
                title="Large Image Settings"
                panelId="largeImage"
                onHomeClick={() => onPanelClose?.()}
              >
                <div className="space-y-1.5">
                  <SubSettingsContainer
                    name="Images"
                    SettingsComponent={
                      <div className="px-1.5 space-y-1.5">
                        <MultipleLayoutImagesHandler
                          objectPath="style.content.largeImage.imageUrl"
                          images={searchPostSettings.style?.content?.largeImage?.imageUrl || []}
                          min={1}
                          max={5}
                        />
                      </div>
                    }
                  />
                   <SubSettingsContainer
                     name="Aspect Ratio"
                     SettingsComponent={
                       <div className="px-1.5 space-y-1.5">
                         <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">
                             Mobile Aspect Ratio
                           </label>
                           <input
                             type="text"
                             value={
                               searchPostSettings.style?.content?.largeImage?.aspectRatio?.mobile ||
                               '4/5'
                             }
                             onChange={(e) =>
                               dispatch(
                                 updateSetting({
                                   field: 'style.content.largeImage.aspectRatio.mobile',
                                   value: e.target.value,
                                 })
                               )
                             }
                             placeholder="e.g., 4/5"
                             className="w-full px-1.5 py-2 border border-slate-300 rounded-lg"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">
                             Desktop Aspect Ratio
                           </label>
                           <input
                             type="text"
                             value={
                               searchPostSettings.style?.content?.largeImage?.aspectRatio?.desktop ||
                               '16/9'
                             }
                             onChange={(e) =>
                               dispatch(
                                 updateSetting({
                                   field: 'style.content.largeImage.aspectRatio.desktop',
                                   value: e.target.value,
                                 })
                               )
                             }
                             placeholder="e.g., 16/9"
                             className="w-full px-1.5 py-2 border border-slate-300 rounded-lg"
                           />
                         </div>
                       </div>
                     }
                   />
                   <SubSettingsContainer
                     name="Border Radius"
                     SettingsComponent={
                       <div className="px-1.5 space-y-1.5">
                         <SettingsSlider
                           label="Border Radius"
                           value={parseFloat(searchPostSettings.style?.content?.largeImage?.borderRadius || '0')}
                           min={0}
                           max={50}
                           step={1}
                           unit="px"
                           onChange={(value) =>
                             dispatch(
                               updateSetting({
                                 field: 'style.content.largeImage.borderRadius',
                                 value: `${value}px`,
                               })
                             )
                           }
                         />
                       </div>
                     }
                   />
                </div>
              </SlidingPanel>
            )}

            {activePanel === 'carousel' && searchPostSettings && (
              <SlidingPanel
                isOpen={true}
                onClose={closePanel}
                title="Carousel Settings"
                panelId="carousel"
                onHomeClick={() => onPanelClose?.()}
              >
                <div className="space-y-1.5">
                   <SubSettingsContainer
                     name="Slides Per View"
                     SettingsComponent={
                       <div className="px-1.5 space-y-1.5">
                         <SettingsSlider
                           label="Mobile"
                           value={
                             searchPostSettings.style?.content?.carousel?.slidesPerView?.mobile ||
                             1.5
                           }
                           min={0.1}
                           max={8}
                           step={0.05}
                           onChange={(value) =>
                             dispatch(
                               updateSetting({
                                 field: 'style.content.carousel.slidesPerView.mobile',
                                 value,
                               })
                             )
                           }
                         />
                         <SettingsSlider
                           label="Desktop"
                           value={
                             searchPostSettings.style?.content?.carousel?.slidesPerView?.desktop ||
                             3
                           }
                           min={0.1}
                           max={8}
                           step={0.05}
                           onChange={(value) =>
                             dispatch(
                               updateSetting({
                                 field: 'style.content.carousel.slidesPerView.desktop',
                                 value,
                               })
                             )
                           }
                         />
                       </div>
                     }
                   />
                   <SubSettingsContainer
                     name="Border Radius"
                     SettingsComponent={
                       <div className="px-1.5 space-y-1.5">
                         <SettingsSlider
                           label="Border Radius"
                           value={parseFloat(searchPostSettings.style?.content?.carousel?.borderRadius || '0')}
                           min={0}
                           max={50}
                           step={1}
                           unit="px"
                           onChange={(value) =>
                             dispatch(
                               updateSetting({
                                 field: 'style.content.carousel.borderRadius',
                                 value: `${value}px`,
                               })
                             )
                           }
                         />
                       </div>
                     }
                   />
                  <SubSettingsContainer
                    name="View All Button"
                    SettingsComponent={
                      <div className="px-1.5 space-y-1.5">
                        <OptionsToggler
                          label="Show"
                          options={['true', 'false']}
                          value={
                            searchPostSettings.style?.content?.carousel?.viewAllButton?.show
                              ? 'true'
                              : 'false'
                          }
                          onChange={(value: string) =>
                            dispatch(
                              updateSetting({
                                field: 'style.content.carousel.viewAllButton.show',
                                value: value === 'true',
                              })
                            )
                          }
                        />
                        {searchPostSettings.style?.content?.carousel?.viewAllButton?.show && (
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Route
                            </label>
                            <input
                              type="text"
                              value={
                                searchPostSettings.style?.content?.carousel?.viewAllButton?.route ||
                                ''
                              }
                              onChange={(e) =>
                                dispatch(
                                  updateSetting({
                                    field: 'style.content.carousel.viewAllButton.route',
                                    value: e.target.value,
                                  })
                                )
                              }
                              placeholder="/search?sort=top-rated"
                              className="w-full px-1.5 py-2 border border-slate-300 rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    }
                  />
                </div>
              </SlidingPanel>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchPostsSettings;