import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SettingsContainer from '../SettingsContainer';
import SlidingPanel from '../supporting/SlidingPanel';
import AboutSettingsSection from '../sections/about/AboutSettingsSection';
import { createHandleDeleteClick } from '../../../utils/layout_settings/handleDeleteClick';

const AboutPageSettings = () => {
  const dispatch = useAppDispatch()
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.about?.contains || [];
  
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
  
  return (
    <div className='space-y-1'>
      <SettingsContainer
        name="About"
        onClick={() => setActivePanel("About")}
        replaceble
      />
      {pageSections.includes("footer") && (
        <SettingsContainer
          name="Footer"
          onClick={() => setActivePanel("Footer")}
          replaceble
          deletable
          onDeleteClick={createHandleDeleteClick({
            sectionKey: "footer",
            path: "routes.about.contains",
            currentSections: pageSections,
            dispatch,
          })}
        />
      )}
      {activePanel  === "About" && (
        <SlidingPanel key="about_page" isOpen={true} onClose={closePanel} title="About Settings">
          <AboutSettingsSection/>
        </SlidingPanel>
      )}
      {activePanel  === "Footer" && (
        <SlidingPanel key="about_footer" isOpen={true} onClose={closePanel} title="Footer Settings">
          <>Displaying Footer Settings in About</>
        </SlidingPanel>
      )}
    </div>
  )
}

export default AboutPageSettings