import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SettingsContainer from "../SettingsContainer";
import StoreReviewsSectionSettings from "../sections/store_reviews/StoreReviewsSectionSettings";
import StoreFooterSectionSettings from "../sections/footer/StoreFooterSectionSettings";
import SlidingPanel from "../supporting/SlidingPanel";
import { createHandleDeleteClick } from "../../../utils/layout_settings/handleDeleteClick";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import { FaPlus } from "react-icons/fa";

const ReviewsPageSettings = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.reviews?.contains || [];

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handleAddFooterClick = () => {
    const updatedSections = [...pageSections, "footer"];
    handleSettingChange("routes.reviews.contains", updatedSections);
  };

  return (
    <div className="space-y-1">
      {!pageSections.includes("footer") && (
        <div className="w-full flex flex-row justify-center items-center">
          <button
            onClick={handleAddFooterClick}
            className="text-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[2.4vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
          >
            Add Footer <FaPlus className="ml-[.6vh]" />
          </button>
        </div>
      )}

      <SettingsContainer
        name="Reviews"
        onClick={() => setActivePanel("Reviews")}
      />

      {pageSections.includes("footer") && (
        <SettingsContainer
          name="Footer"
          onClick={() => setActivePanel("Footer")}
          replaceble
          deletable
          onDeleteClick={createHandleDeleteClick({
            sectionKey: "footer",
            path: "routes.reviews.contains",
            currentSections: pageSections,
            dispatch,
          })}
        />
      )}

      {activePanel === "Reviews" && (
        <SlidingPanel
          key="reviews_page"
          isOpen={true}
          onClose={closePanel}
          title="Reviews Settings"
        >
          <StoreReviewsSectionSettings />
        </SlidingPanel>
      )}

      {activePanel === "Footer" && (
        <SlidingPanel
          key="reviews_footer"
          isOpen={true}
          onClose={closePanel}
          title="Footer Settings"
        >
          <StoreFooterSectionSettings />
        </SlidingPanel>
      )}
    </div>
  );
};

export default ReviewsPageSettings;
