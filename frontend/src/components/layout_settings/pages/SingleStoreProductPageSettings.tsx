import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import SettingsContainer from '../SettingsContainer';
import SlidingPanel from '../supporting/SlidingPanel';
import SingleStoreProductSectionSettings from '../sections/single_product/SingleStoreProductSectionSettings';
import SectionSelector from '../supporting/section_selector/SectionSelector';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';

const SingleStoreProductPageSettings = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.layoutSettings.routes);

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [showSectionSelector, setShowSectionSelector] = useState(false);
  const [sectionToReplace, setSectionToReplace] = useState<string | null>(null);

  const closePanel = () => setActivePanel(null);

  const handleReplaceClick = () => {
    setSectionToReplace("singleProduct");
    setShowSectionSelector(true);
  };

  const handleSectionReplace = (selectedSection: string) => {
    // Example: Replace the product section with selected one
    dispatch(
      updateSetting({
        field: "routes.product.contains",
        value: [selectedSection],
      })
    );

    setShowSectionSelector(false);
    setSectionToReplace(null);
  };

  return (
    <div>
      <SettingsContainer
        name="Product Section"
        onClick={() => setActivePanel("product")}
        onReplaceClick={handleReplaceClick}
        replaceble
      />

      {activePanel === "product" && (
        <SlidingPanel
          key="product_page"
          isOpen={true}
          onClose={closePanel}
          title="Product Section Settings"
        >
          <SingleStoreProductSectionSettings />
        </SlidingPanel>
      )}

      {showSectionSelector && (
        <div className="fixed inset-0 bg-[#0000001e] flex justify-center items-center z-50">
          <div className="bg-white flex flex-row w-[80vw] h-[80vh] overflow-auto">
            <SectionSelector
              onClose={() => {
                setShowSectionSelector(false);
                setSectionToReplace(null);
              }}
              onSelect={handleSectionReplace}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleStoreProductPageSettings;
