import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SettingsContainer from "../SettingsContainer";
import SlidingPanel from "../supporting/SlidingPanel";
import ContactSectionSettings from "../sections/contact/ContactSectionSettings";
import StoreFooterSectionSettings from "../sections/footer/StoreFooterSectionSettings";
import { createHandleDeleteClick } from "../../../utils/layout_settings/handleDeleteClick";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import { FaPlus } from "react-icons/fa";

const ContactPageSettings = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const pageSections = routes.contact?.contains || [];

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handleAddFooterClick = () => {
    const updatedSections = [...pageSections, "footer"];
    handleSettingChange("routes.contact.contains", updatedSections);
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
        name="Contact"
        onClick={() => setActivePanel("Contact")}
      />

      {pageSections.includes("footer") && (
        <SettingsContainer
          name="Footer"
          onClick={() => setActivePanel("Footer")}
          replaceble
          deletable
          onDeleteClick={createHandleDeleteClick({
            sectionKey: "footer",
            path: "routes.contact.contains",
            currentSections: pageSections,
            dispatch,
          })}
        />
      )}

      {activePanel === "Contact" && (
        <SlidingPanel
          key="contact_page"
          isOpen={true}
          onClose={closePanel}
          title="Contact Settings"
        >
          <ContactSectionSettings />
        </SlidingPanel>
      )}

      {activePanel === "Footer" && (
        <SlidingPanel
          key="contact_footer"
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

export default ContactPageSettings;
