import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import SmallSlideshowSettings from './supporting/SmallSlideshowSettings';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import LargeSliderSettings from './supporting/LargeSlideshowSettings';
import BackgroundEditor from '../../../background/BackgroundEditor';

const HeroWithSlidingImagesSettings = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.layoutSettings.hero.images);
  const settings = useAppSelector((state) => state.layoutSettings);
  const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
  };
  return (
    <div className='space-y-1'>
      <BackgroundEditor 
        settings={settings}
        handleSettingChange={handleSettingChange}
        objectPath={`hero.background`}
        allow={["color"]}
      />
      <SubSettingsContainer
        name="Images"
        SettingsComponent={
          <MultipleLayoutImagesHandler
            images={images}
            objectPath="hero.images"
            max={15}
            min={1}
          />
        }
      />
      <SubSettingsContainer
        name="Large Slideshow"
        SettingsComponent={
          <LargeSliderSettings 
              settings={settings} 
              handleSettingChange={handleSettingChange} 
          />
        } 
      />
      <SubSettingsContainer
        name="Small Slideshow"
        SettingsComponent={<SmallSlideshowSettings 
          settings={settings} 
          handleSettingChange={handleSettingChange}
        />}
      />
      
    </div>
  )
}

export default HeroWithSlidingImagesSettings;