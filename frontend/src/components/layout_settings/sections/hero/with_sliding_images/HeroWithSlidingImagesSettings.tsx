import React, { useState } from 'react'
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import SmallSlideshowSettings from './supporting/SmallSlideshowSettings';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import LargeSliderSettings from './supporting/LargeSlideshowSettings';
import BackgroundEditor from '../../../background/BackgroundEditor';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';

const HeroWithSlidingImagesSettings = () => {
  const objectPath = "sections.hero";
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.layoutSettings.sections.hero.images);
  const settings = useAppSelector((state) => state.layoutSettings);
  const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
  };
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className='space-y-[.3vh]'>
      
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <BackgroundEditor 
            settings={settings}
            handleSettingChange={handleSettingChange}
            objectPath={`${objectPath}.background`}
            allow={["color", "height"]}
            responsiveSize
          />
        }
      />
      {/* Images */}
      <FirstOrderSubSettingsContainer
        name="Images"
        onClick={() => setActivePanel("images")}
      />
      {/* Large Slideshow */}
      <FirstOrderSubSettingsContainer
        name="Large Slideshow"
        onClick={() => setActivePanel("largeSlideshow")}
      />
      {/* Small Slideshow */}
      <FirstOrderSubSettingsContainer
        name="Small Slideshow"
        onClick={() => setActivePanel("smallSlideshow")}
      />

      <AnimatePresence>
        {activePanel === "images" && (
          <SlidingPanel
            key="images"
            title="Images"
            onClose={closePanel}
            isOpen
          >
            <div className="px-[.3vh] space-y-[.3vh] py-[.15vh]">
              <MultipleLayoutImagesHandler
                images={images}
                objectPath={`${objectPath}.images`}
                max={15}
                min={1}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "largeSlideshow" && (
          <SlidingPanel
            key="largeSlideshow"
            title="Large Slideshow"
            onClose={closePanel}
            isOpen
          >
            <div className="px-[.3vh] space-y-[.3vh] py-[.15vh]">
              <LargeSliderSettings 
                settings={settings} 
                handleSettingChange={handleSettingChange} 
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "smallSlideshow" && (
          <SlidingPanel
            key="smallSlideshow"
            title="Small Slideshow"
            onClose={closePanel}
            isOpen
          >
            <div className="px-[.3vh] space-y-[.3vh] py-[.15vh]">
              <SmallSlideshowSettings 
                settings={settings} 
                handleSettingChange={handleSettingChange}
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
      
    </div>
  )
}

export default HeroWithSlidingImagesSettings;