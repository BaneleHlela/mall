import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SettingsContainer from "../SettingsContainer";
import { createHandleDeleteClick } from "../../../utils/layout_settings/handleDeleteClick";
import SlidingPanel from "../supporting/SlidingPanel";
import StoreGallerySettings from "../sections/gallery/StoreGallerySectionSettings";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import SectionSelector from "../supporting/section_selector/SectionSelector";

const GalleryPageSettings = () => {
  const dispatch = useAppDispatch()
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.gallery?.contains || [];
  const [sectionToReplace, setSectionToReplace] = useState<string | null>(null);
  const [showSectionSelector, setShowSectionSelector] = useState(false);
  
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleReplaceClick = (section: string) => {
    setSectionToReplace(section);
    setShowSectionSelector(true);
  };

  const handleSectionSelect = (selectedSection: string) => {
    if (sectionToReplace) {
      const updatedSections = pageSections.map((sec) =>
        sec === sectionToReplace ? selectedSection : sec
      );
      dispatch(
        updateSetting({
          field: "routes.gallery.contains",
          value: updatedSections,
        })
      );
    } else {
      if (!pageSections.includes(selectedSection)) {
        dispatch(
          updateSetting({
            field: "routes.gallery.contains",
            value: [...pageSections, selectedSection],
          })
        );
      }
    }
  
    setSectionToReplace(null);
    setShowSectionSelector(false);
  };
  
  return (
    <div className="w-full h-[80vh] space-y-2">
      <div className="relative px-4 flex justify-center">
        <button
          className="flex flex-row justify-between items-center bg-stone-50 border-2 border-white text-black rounded px-8 py-2 shadow-md hover:scale-103 hover:opacity-85"
        >
          Add Footer <FaPlus className="ml-2" size={16} />
        </button>
      </div>
      <SettingsContainer
        name="Gallery"
        onClick={() => setActivePanel("Gallery")}
        replaceble
        onReplaceClick={() => handleReplaceClick("gallery")}
      />
      {pageSections.includes("footer") && (
        <SettingsContainer
          name="Footer"
          onClick={() => setActivePanel("Footer")}
          replaceble
          deletable
          onDeleteClick={createHandleDeleteClick({
            sectionKey: "footer",
            path: "routes.gallery.contains",
            currentSections: pageSections,
            dispatch,
          })}
          onReplaceClick={() => handleReplaceClick("footer")}
        />
      )}
      {activePanel  === "Gallery" && (
        <SlidingPanel key="gallery_page" isOpen={true} onClose={closePanel} title="Gallery Settings">
          <StoreGallerySettings/>
        </SlidingPanel>
      )}
      {activePanel  === "Footer" && (
        <SlidingPanel key="gallery_footer" isOpen={true} onClose={closePanel} title="Footer Settings">
          <>Displaying Footer Settings in About</>
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
              onSelect={handleSectionSelect} //@ts-ignore
              sectionToReplace={sectionToReplace}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPageSettings;