import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import SettingsContainer from "../SettingsContainer";
import SlidingPanel from "../supporting/SlidingPanel";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import HeroSettings from "../sections/hero/HeroSettings";


const SortableItem = ({ id, name, onClick }: { id: string; name: string; onClick: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SettingsContainer name={name} options={["edit"]} onOptionClick={onClick} />
    </div>
  );
};

const HomePageSettings = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const homeSections = routes.home?.contains || [];

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const validSections = [
    "hero", "about", "menu", "services", "products",
    "reviews", "gallery", "book", "contact", "events", "footer",
  ];

  const unusedSections = validSections.filter(
    (section) => !(homeSections as string[]).includes(section)
  );

  const handleAddSection = (section: string) => {
    dispatch(updateSetting({
      field: "routes.home.contains",
      value: [...homeSections, section],
    }));
    setDropdownOpen(false);
  };

  const getSectionComponent = (section: string) => {
    switch (section) {
      case "hero": return <HeroSettings />;
       //case "footer": return <FooterSettings />;
      default: return <div>No settings available.</div>;
    }
  };

  const closePanel = () => setActivePanel(null);

  // Drag n drop
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = homeSections.indexOf(active.id);
      const newIndex = homeSections.indexOf(over.id);
      const newArray = arrayMove(homeSections, oldIndex, newIndex);
      dispatch(updateSetting({
        field: "routes.home.contains",
        value: newArray,
      }));
    }
  };

  return (
    <div className="w-full h-[80vh] space-y-2">
      <div className="relative px-4 flex justify-center">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex flex-row justify-between items-center bg-black text-white rounded-[20px] px-8 py-2 shadow-md hover:scale-103 hover:opacity-85"
        >
          Add New Section <FaPlus className="ml-2" size={16} />
        </button>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              className="absolute top-full bg-white border border-gray-300 rounded-[20px] mt-0 shadow-md z-10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {unusedSections.map((section) => (
                <button
                  key={section}
                  className="block px-8 py-2 w-full text-left rounded-[20px] hover:bg-gray-100"
                  onClick={() => handleAddSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drag context */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={homeSections} strategy={verticalListSortingStrategy}>
          {homeSections.map((section) => (
            <SortableItem
              key={section}
              id={section}
              name={section.charAt(0).toUpperCase() + section.slice(1)}
              onClick={() => setActivePanel(section)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <AnimatePresence>
        {activePanel && (
          <SlidingPanel
            key={activePanel}
            isOpen={true}
            onClose={closePanel}
            title={`${activePanel.charAt(0).toUpperCase() + activePanel.slice(1)} Settings`}
          >
            {getSectionComponent(activePanel)}
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePageSettings;
