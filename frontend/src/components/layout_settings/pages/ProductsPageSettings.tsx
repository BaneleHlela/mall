import { useState } from "react";
import SettingsContainer from "../SettingsContainer";
import SlidingPanel from "../supporting/SlidingPanel";
import ProductsSectionSettings from "../sections/products/ProductsSectionSettings";

const ProductsPageSettings = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
  
  return (
    <div className="space-y-[.3vh]">
      <SettingsContainer
        name="Products"
        onClick={() => setActivePanel("products")}
        replaceble
      />
      {activePanel  === "products" && (
        <SlidingPanel key="products_page" isOpen={true} onClose={closePanel} title="Products Section Settings">
          <ProductsSectionSettings/>
        </SlidingPanel>
      )}
    </div>
  )
}

export default ProductsPageSettings