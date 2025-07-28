import React from 'react';
import BackgroundEditor from '../../background/BackgroundEditor';
import TextEditor from '../../text/TextEditor';
import SubSettingsContainer from '../SubSettingsContainer';
import OptionsToggler from '../../supporting/OptionsToggler';
import { getSetting } from '../../../../utils/helperFunctions';

interface StoreOverallReviewsCardSettingsProps {
  objectPath: string;
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const StoreOverallReviewsCardSettings: React.FC<StoreOverallReviewsCardSettingsProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const basePath = `${objectPath}.reviewsCard`;

  return (
    <div className="space-y-[.3vh]">
      {/* Placement */}
      <OptionsToggler 
        label="Position"
        options={["right", "center", "left"]}
        value={getSetting("placement", settings, basePath)}
        onChange={(value) => handleSettingChange(`${basePath}.placement`, value)}
      />

      {/* Background */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <BackgroundEditor
            objectPath={`${basePath}.background`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={['color', 'animation', 'height', 'width', 'border', "shadow", "padding"]}
            responsiveSize
          />
        }
      />

      {/* Stars Display */}
      <SubSettingsContainer
        name="Stars Display"
        SettingsComponent={
          <TextEditor
            objectPath={`${basePath}.starsDisplay`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={['type', 'color', 'size']}
          />
        }
      />

      {/* Text Settings */}
      <SubSettingsContainer
        name="Text Style"
        SettingsComponent={
          <div className="space-y-2">
            {/* General Text */}
            <TextEditor
              objectPath={`${basePath}.text`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={['fontFamily', 'color', 'weight']}
            />

            {/* Total Ratings Sizes */}
            <div className="border rounded w-full">
              <label htmlFor="total_rading" className="text-sm font-bold w-full text-center p-2">Total Ratings:</label>
              <TextEditor
                objectPath={`${basePath}.text.totalRatings`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={['fontSize', "lineHeight"]}
                responsiveSize
              />
            </div>
            {/* Comment Input and Style */}
            <div className="border rounded w-full">
              <label htmlFor="total_rading" className="text-sm font-bold w-full text-center p-2">Total Ratings:</label>
              <TextEditor
                objectPath={`${basePath}.text.comment`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={['input', "fontSize"]}
              />
            </div>            
          </div>
        }
      />
    </div>
  );
};

export default StoreOverallReviewsCardSettings;
