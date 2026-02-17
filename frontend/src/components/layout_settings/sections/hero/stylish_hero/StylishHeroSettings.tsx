import { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";
import OptionsToggler from "../../../supporting/OptionsToggler";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";

interface StlyishHeroProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const StlyishHero: React.FC<StlyishHeroProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "sections.hero";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);


  return (
    <div className="space-y-[.5vh]">
      {/* Background Settings */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-[.15vh] space-y-[.3vh]">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["height"]}
              widthUnit="vw"
              heightUnit="vh"
              responsiveSize
            />
            <MultipleLayoutImagesHandler
              objectPath={`${objectPath}.backgroundImage`}
              min={2}
              max={2}
              images={getSetting("backgroundImage", settings, objectPath)}
            />
          </div>
        }
      />

      {/* Image Settings */}
      <SubSettingsContainer
        name="Mobile Header"
        SettingsComponent={
          <div className="px-[1vh] space-y-[.5vh] py-1">
            <TextEditor
                objectPath={`${objectPath}.header`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["input", "color", "weight", "fontFamily", "fontSize", "lineHeight", "textAlign", "letterSpacing", "textDecoration"]}
                responsiveSize
                responsivePadding
            />
          </div>
        }
      />

      {/* Text Lines - Refactored */}
      <FirstOrderSubSettingsContainer
        name="Box"
        onClick={() => setActivePanel("box")}
      />

      {/* Sliding Panels */}
      <AnimatePresence>
        {activePanel === "box" && (
            <SlidingPanel
                key="box"
                isOpen={true}
                onClose={closePanel}
                title="Hero Box"
            >
                <div className="space-y-[.5vh]">
                    <SubSettingsContainer
                        name="Background"
                        SettingsComponent={
                        <div className="px-[.15vh] space-y-[.3vh]">
                            <BackgroundEditor
                                objectPath={`${objectPath}.box.background`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["border", "color", "width", "height", "padding"]}
                                widthUnit="%"
                                heightUnit="%"
                                responsiveSize
                                responsivePadding
                            />
                        </div>
                        }
                    />
                    <FirstOrderSubSettingsContainer
                        name="text"
                        onClick={() => setActivePanel("box_text")}
                    />
                    <FirstOrderSubSettingsContainer
                        name="button"
                        onClick={() => setActivePanel("button")}
                    />
                </div>
            </SlidingPanel>
        )}
        {activePanel === "box_text" && (
            <SlidingPanel  
                title="Box Text"
                key="box_text"
                isOpen={true}
                onClose={() => setActivePanel('box')}
            >
                {/* Header */}
                <SubSettingsContainer
                  name="Desktop Title"
                  SettingsComponent={
                    <div className="px-[1vh] space-y-[.5vh] py-1">
                      <TextEditor
                          objectPath={`${objectPath}.box.text.title`}
                          settings={settings}
                          handleSettingChange={handleSettingChange}
                          allow={["input", "color", "weight", "fontFamily", "fontSize", "lineHeight", "letterSpacing", "textDecoration"]}
                          responsiveSize
                          responsivePadding
                          useTextarea
                      />
                    </div>
                  }
                />
                <SubSettingsContainer
                    name="paragraph"
                    SettingsComponent={
                    <div className="px-[1vh] space-y-[.5vh] py-1">
                        <TextEditor
                            objectPath={`${objectPath}.box.text`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "color", "weight", "fontFamily", "fontSize", "lineHeight", "letterSpacing", "textDecoration", "fontFamily"]}
                            responsiveSize
                            responsivePadding
                        />
                    </div>
                    }
                />
            </SlidingPanel>
        )}
        {activePanel === "button" && (
          <SlidingPanel
            key="button"
            isOpen={true}
            onClose={closePanel}
            title="Hero Button"
          >
            <StoreButtonSettings
              objectPath={`${objectPath}.box.button`}
              settings={settings}
              allowFunction
            />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StlyishHero;
