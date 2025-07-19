import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks'
import ServicesSectionSettings from '../sections/services/ServicesSectionSettings';
import SettingsContainer from '../SettingsContainer';
import SlidingPanel from '../supporting/SlidingPanel';

const ServicesPageSettings = () => {
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.services?.contains || [];

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className='space-y-[.3vh]'>
      <SettingsContainer
        name="Services"
        onClick={() => setActivePanel("services")}
        replaceble
      />
      <SettingsContainer
        name="Footer"
        onClick={() => setActivePanel("Footer")}
        replaceble
      />
      {activePanel  === "services" && (
        <SlidingPanel key="services_page" isOpen={true} onClose={closePanel} title="Services Settings">
          <ServicesSectionSettings/>
        </SlidingPanel>
      )}
      {activePanel  === "Footer" && (
        <SlidingPanel key="services_footer" isOpen={true} onClose={closePanel} title="Footer Settings">
          <>Displaying Footer Settings in Services</>
        </SlidingPanel>
      )}
    </div>
  )
}

export default ServicesPageSettings