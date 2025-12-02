import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import SettingsContainer from '../SettingsContainer';
import SlidingPanel from '../supporting/SlidingPanel';
import StoreSearchResultsSectionSettings from '../sections/search_results/StoreSearchResultsSectionSettings';
import StoreFooterSectionSettings from '../sections/footer/StoreFooterSectionSettings';

const StoreSearchResultsPageSettings = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const closePanel = () => setActivePanel(null);

  return (
    <div className='space-y-[.6vh]'>
      <SettingsContainer
        name="Search Results Section"
        onClick={() => setActivePanel("search_results")}
      />
      <SettingsContainer
        name="Footer Section"
        onClick={() => setActivePanel("footer")}
      />

      {activePanel === "search_results" && (
        <SlidingPanel
          key="search_results"
          isOpen={true}
          onClose={closePanel}
          title="Search Results Section Settings"
        >
          <StoreSearchResultsSectionSettings />
        </SlidingPanel>
      )}

      {activePanel === "footer" && (
        <SlidingPanel
          key="footer"
          isOpen={true}
          onClose={closePanel}
          title="Footer Section Settings"
        >
          <StoreFooterSectionSettings />
        </SlidingPanel>
      )}
    </div>
  );
};

export default StoreSearchResultsPageSettings;