import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SettingsContainer from '../SettingsContainer';
import SlidingPanel from '../supporting/SlidingPanel';
import AboutSettingsSection from '../sections/about/AboutSettingsSection';
import { createHandleDeleteClick } from '../../../utils/layout_settings/handleDeleteClick';
import { FaPlus } from 'react-icons/fa';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import StoreFooterSectionSettings from '../sections/footer/StoreFooterSectionSettings';

const AboutPageSettings = () => {
  const dispatch = useAppDispatch()
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.about?.contains || [];
  
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handleAddFooterClick = () => {
    const updatedSections = [...pageSections, "footer"]; // Add "footer" to the contains array
    handleSettingChange("routes.about.contains", updatedSections); // Update the Redux state
  };
  
  return (
    <div className='space-y-1'>
      {!pageSections.includes("footer") && (
        <div className="w-full flex flex-row justify-center items-center">
          <button
            onClick={handleAddFooterClick}
            className="text-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[2.4vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
          >
            Add Footer <FaPlus className="ml-[.6vh]"/>
          </button>
        </div>
      )}
      <SettingsContainer
        name="About"
        onClick={() => setActivePanel("About")}
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
          <StoreFooterSectionSettings />
        </SlidingPanel>
      )}
    </div>
  )
}

export default AboutPageSettings