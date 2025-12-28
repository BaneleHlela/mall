import { useState } from "react";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import { AnimatePresence } from "framer-motion";
import { getSetting } from "../../../../../utils/helperFunctions";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import SettingsSlider from "../../../supporting/SettingsSlider";
import SlidingPanel from "../../../supporting/SlidingPanel";
import TextEditor from "../../../text/TextEditor";
import type { SectionEditorProps } from "../../SectionSettings";
import BackgroundEditor from "../../../background/BackgroundEditor";
import MainBookWithCalenderSettings from "./supporting/MainBookWithCalenderSettings";

const BasicBookWithOpenCalendarSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "sections.bookSection";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
  return (
    <div className="space-y-[.3vh]">
      <FirstOrderSubSettingsContainer
        name="Heading"
        onClick={() => setActivePanel("Heading")}
      />
      <FirstOrderSubSettingsContainer
        name="Subheading"
        onClick={() => setActivePanel("subheading")}
      />
      <FirstOrderSubSettingsContainer
        name="Background"
        onClick={() => setActivePanel("background")}
      />
      <FirstOrderSubSettingsContainer
        name="Heading & Box Background"
        onClick={() => setActivePanel("headerAndBoxBackground")}
      />
      <FirstOrderSubSettingsContainer
        name="Booking Box"
        onClick={() => setActivePanel("box")}
      />
      <AnimatePresence>
        {activePanel === "Heading" && (
            <SlidingPanel key="title" isOpen={true} onClose={closePanel} title="Heading Settings">
              <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
                {/* <SettingsSlider
                  label="Bottom Margin"
                  value={parseInt(getSetting("heading.text.marginBottom", settings, objectPath) || '16')}
                  unit="px"
                  onChange={(newVal) =>
                    handleSettingChange(`${objectPath}.heading.text.marginBottom`, `${newVal}px`)
                  }
                /> */}
                <SubSettingsContainer
                  name="Text"
                  SettingsComponent={
                    <TextEditor
                      objectPath={`${objectPath}.heading.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["position", "input", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                      responsiveSize
                      responsivePadding
                    />
                  }
                />
                {/* Background Settings */}
                <SubSettingsContainer
                  name="Background"
                  SettingsComponent={
                    <div className="px-[.15vh] space-y-1">
                      <BackgroundEditor
                        objectPath={`${objectPath}.heading.text.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["padding", "width", "color", "border"]}
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
          {activePanel === "subheading" && (
            <SlidingPanel key="title" isOpen={true} onClose={closePanel} title="Subheading Settings">
              <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
                <SettingsSlider
                  label="Bottom Margin"
                  value={parseInt(getSetting("subheading.text.marginBottom", settings, objectPath) || '16')}
                  unit="px"
                  onChange={(newVal) =>
                    handleSettingChange(`${objectPath}.subheading.text.marginBottom`, `${newVal}px`)
                  }
                />
                <SubSettingsContainer
                  name="Text"
                  SettingsComponent={
                    <TextEditor
                      objectPath={`${objectPath}.subheading.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["position", "padding",  "input", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                      responsiveSize
                      responsivePadding
                    />
                  }
                />

                
              </div>
            </SlidingPanel>
          )}
          {activePanel === "background" && (
            <SlidingPanel key="title" isOpen={true} onClose={closePanel} title="Book Section Background">
              <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
                <BackgroundEditor
                  objectPath={`${objectPath}.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["padding", "width", "color", "border", "height"]}
                  widthUnit="%"
                  heightUnit="vh"
                  responsiveSize
                  responsivePadding
                />
              </div>
            </SlidingPanel>
          )}
          {activePanel === "headerAndBoxBackground" && (
            <SlidingPanel key="title" isOpen={true} onClose={closePanel} title="Heading And Box">
              <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
                <BackgroundEditor
                  objectPath={`${objectPath}.headerAndMainBackground`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["padding", "width", "color", "border", "height"]}
                  widthUnit="%"
                  heightUnit="%"
                  responsiveSize
                  responsivePadding
                />
              </div>
            </SlidingPanel>
          )}
          {activePanel === "box" && (
            <SlidingPanel key="box" isOpen={true} onClose={closePanel} title="Booking Box Settings">
              <MainBookWithCalenderSettings 
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath={`${objectPath}.main`} 
              />
            </SlidingPanel>
          )}
      </AnimatePresence>
    </div>
  )
}

export default BasicBookWithOpenCalendarSettings