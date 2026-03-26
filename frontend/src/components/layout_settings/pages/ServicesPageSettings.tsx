import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import ServicesSectionSettings from '../sections/services/ServicesSectionSettings';
import SettingsContainer from '../SettingsContainer';
import SlidingPanel from '../supporting/SlidingPanel';
import StoreFooterSectionSettings from '../sections/footer/StoreFooterSectionSettings';
import SectionSelector from '../supporting/section_selector/SectionSelector';
import type { SectionType } from '../../../utils/defaults/sections/getSectionDefaults';

const ServicesPageSettings = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.services?.contains || [];

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [showSectionSelector, setShowSectionSelector] = useState(false);
  const [sectionToReplace, setSectionToReplace] = useState<string | null>(null);

  const closePanel = () => setActivePanel(null);

  const handleReplaceClick = (section: string) => {
    setSectionToReplace(section);
    setShowSectionSelector(true);
  };

  const handleSectionSelect = (selectedSection: string, sourceLayoutId?: string) => {
    if (sectionToReplace === 'services') {
      // Replace services section
      const currentContains = [...pageSections];
      const servicesIndex = currentContains.indexOf('services');
      if (servicesIndex !== -1) {
        currentContains[servicesIndex] = selectedSection;
      } else {
        currentContains.push(selectedSection);
      }
      dispatch(updateSetting({
        field: "routes.services",
        value: {
          ...routes.services,
          contains: currentContains,
        },
      }));
    } else if (sectionToReplace === 'footer') {
      // Replace footer section
      const currentContains = [...pageSections];
      const footerIndex = currentContains.indexOf('footer');
      if (footerIndex !== -1) {
        currentContains[footerIndex] = selectedSection;
      } else {
        currentContains.push(selectedSection);
      }
      dispatch(updateSetting({
        field: "routes.services",
        value: {
          ...routes.services,
          contains: currentContains,
        },
      }));
    }
    setSectionToReplace(null);
    setShowSectionSelector(false);
  };

  const getSectionComponent = (section: string) => {
    switch (section) {
      case 'services':
      case 'services_simple':
        return <ServicesSectionSettings />;
      case 'footer':
        return <StoreFooterSectionSettings />;
      default:
        return <div>No settings available for section "{section}".</div>;
    }
  };

  // Get the actual section types from routes.services.contains
  const servicesSection = pageSections[0] || 'services';
  const footerSection = pageSections[1] || 'footer';

  return (
    <div className='space-y-[.3vh]'>
      <SettingsContainer
        name={servicesSection === 'services' ? 'Services' : servicesSection.charAt(0).toUpperCase() + servicesSection.slice(1)}
        onClick={() => setActivePanel("services")}
        onReplaceClick={() => handleReplaceClick('services')}
        replaceble
      />
      <SettingsContainer
        name={footerSection === 'footer' ? 'Footer' : footerSection.charAt(0).toUpperCase() + footerSection.slice(1)}
        onClick={() => setActivePanel("footer")}
        onReplaceClick={() => handleReplaceClick('footer')}
        replaceble
      />
      {activePanel  === "services" && (
        <SlidingPanel key="services_page" isOpen={true} onClose={closePanel} title={`${servicesSection.charAt(0).toUpperCase() + servicesSection.slice(1)} Settings`}>
          {getSectionComponent(servicesSection)}
        </SlidingPanel>
      )}
      {activePanel === "footer" && (
        <SlidingPanel
          key="services_footer"
          isOpen={true}
          onClose={closePanel}
          title={`${footerSection.charAt(0).toUpperCase() + footerSection.slice(1)} Settings`}
        >
          {getSectionComponent(footerSection)}
        </SlidingPanel>
      )}
      {showSectionSelector && (
        <div className="fixed inset-0 bg-[#0000001e] flex justify-center items-center z-50">
          <div className="bg-white flex flex-row w-[80vw] h-[80vh] overflow-auto">
            <SectionSelector
              onClose={() => {
                setSectionToReplace(null);
                setShowSectionSelector(false);
              }}
              onSelect={handleSectionSelect}
              {...(sectionToReplace ? { sectionToReplace: sectionToReplace as SectionType } : {})}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesPageSettings