import React, { useState } from 'react'
import { useAppSelector } from '../../../app/hooks';
import SettingsContainer from '../SettingsContainer';
import SlidingPanel from '../supporting/SlidingPanel';
import SingleStoreProductSectionSettings from '../sections/single_product/SingleStoreProductSectionSettings';

const SingleStoreProductPageSettings = () => {
    const routes = useAppSelector((state) => state.layoutSettings.routes);

    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    return (
      <div>
        <SettingsContainer
          name="Product"
          onClick={() => setActivePanel("product")}
          replaceble
        />
        {activePanel  === "product" && (
        <SlidingPanel key="product_page" isOpen={true} onClose={closePanel} title="Product Section Settings">
          <SingleStoreProductSectionSettings />
        </SlidingPanel>
      )}
      </div>
    )
}

export default SingleStoreProductPageSettings