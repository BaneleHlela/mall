import { useState } from "react";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import { AnimatePresence } from "framer-motion";
import { getSetting } from "../../../../../utils/helperFunctions";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import SettingsSlider from "../../../supporting/SettingsSlider";
import SlidingPanel from "../../../supporting/SlidingPanel";
import TextEditor from "../../../text/TextEditor";
import type { SectionEditorProps } from "../../SectionSettings";

const BasicBookWithOpenCalendarSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "book";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
  return (
    <div className="space-y-1">
      <FirstOrderSubSettingsContainer
        name="Heading"
        onClick={() => setActivePanel("Heading")}
      />
      <FirstOrderSubSettingsContainer
        name="Background"
        onClick={() => setActivePanel("Background")}
      />
      <FirstOrderSubSettingsContainer
        name="Heading & Box Background"
        onClick={() => setActivePanel("headerAndBoxBackground")}
      />
      <FirstOrderSubSettingsContainer
        name="Box"
        onClick={() => setActivePanel("Box")}
      />
      <AnimatePresence>
        {activePanel === "Heading" && (
            <SlidingPanel key="title" isOpen={true} onClose={closePanel} title="Gallery Title">
              <div className="px-2 space-y-1 py-1">
                <SettingsSlider
                  label="Bottom Margin"
                  value={parseInt(getSetting("heading.text.marginBottom", settings, objectPath) || '16')}
                  unit="px"
                  onChange={(newVal) =>
                    handleSettingChange(`${objectPath}.heading.text.marginBottom`, `${newVal}px`)
                  }
                />
                <SubSettingsContainer
                  name="Text"
                  SettingsComponent={
                    <TextEditor
                      objectPath={`${objectPath}.heading.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["position", "input", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                      responsiveSize
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

export default BasicBookWithOpenCalendarSettings