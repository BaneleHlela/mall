import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import SettingsContainer from "../SettingsContainer"
import StoreReviewsSectionSettings from "../sections/store_reviews/StoreReviewsSectionSettings";
import SlidingPanel from "../supporting/SlidingPanel";

const ReviewsPageSettings = () => {
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.services?.contains || [];

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
  
  return (
    <div className="space-y-1">
      <SettingsContainer
        name="Reviews"
        onClick={() => setActivePanel("Reviews")}
        replaceble
      />
      {activePanel  === "Reviews" && (
        <SlidingPanel key="services_page" isOpen={true} onClose={closePanel} title="Services Settings">
          <StoreReviewsSectionSettings/>
        </SlidingPanel>
      )}
    </div>
  )
}

export default ReviewsPageSettings