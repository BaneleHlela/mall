import React, { useEffect, useState } from "react";
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
import SectionSelector from "../supporting/section_selector/SectionSelector";
import type { SectionType } from "../../../utils/defaults/sections/getSectionDefaults";
import AboutSettingsSection from "../sections/about/AboutSettingsSection";
import StoreGallerySettings from "../sections/gallery/StoreGallerySectionSettings";
import StoreReviewsSectionSettings from "../sections/store_reviews/StoreReviewsSectionSettings";
import BookSectionSettings from "../sections/book/BookSectionSettings";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ServicesSectionSettings from "../sections/services/ServicesSectionSettings";
import StoreFooterSectionSettings from "../sections/footer/StoreFooterSectionSettings";

const SortableItem = ({
  id,
  name,
  onClick,
  onReplaceClick,
  onDeleteClick,
  onRename,
  isInMenubar,
}: {
  id: string;
  name: string;
  onClick: () => void;
  onReplaceClick: (section: string) => void;
  onDeleteClick: () => void;
  onRename: (section: string, newName: string) => void;
  isInMenubar: boolean;
}) => {
  const [draggable, setDraggable] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDoubleClick = () => {
    setDraggable(true);
    setTimeout(() => setDraggable(false), 2000);
  };

  const handleRename = (newName: string) => {
    onRename(id, newName);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onDoubleClick={handleDoubleClick}
      {...(draggable ? attributes : {})}
      {...(draggable ? listeners : {})}
    >
      <SettingsContainer
        name={name}
        onClick={onClick}
        onReplaceClick={() => onReplaceClick(id)}
        onDeleteClick={onDeleteClick}
        onRename={handleRename}
        replaceble={true}
        deletable={id !== "hero"}
        renamable={isInMenubar}
      />
    </div>
  );
};


const HomePageSettings = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const homeSections = routes.home?.contains || [];
  const MySwal = withReactContent(Swal);
  
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [sectionToReplace, setSectionToReplace] = useState<SectionType | null>(null);
  const [showSectionSelector, setShowSectionSelector] = useState(false);

  const handleReplaceClick = (section: SectionType) => {
    setSectionToReplace(section); // Wait for this to update before showing UI
  };
  
  useEffect(() => {
    if (sectionToReplace) {
      setShowSectionSelector(true); // only show the selector after sectionToReplace is set
    }
  }, [sectionToReplace]);

  const handleDeleteClick = (section: string) => () => {
    MySwal.fire({
      title: `Delete "${section}"?`,
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove from homeSections
        const updatedSections = homeSections.filter((sec) => sec !== section);
        
        // Remove from routes.home.inLinks
        const updatedInLinks = routes.home?.inLinks?.filter(link => link.section !== section) || [];
  
        // Dispatch both updates
        dispatch(updateSetting({
          field: "routes.home",
          value: {
            ...routes.home,
            contains: updatedSections,
            inLinks: updatedInLinks
          },
        }));
      }
    });
  };

  const handleAddSection = (section: string) => {
    if (homeSections.includes(section)) return;

    dispatch(
      updateSetting({
        field: "routes.home.contains",
        value: [...homeSections, section],
      })
    );
    setIsAddingSection(false);
  };

  const handleRename = (section: string, newName: string) => {
    const updatedInLinks = routes.home?.inLinks?.map(link => 
      link.section === section ? { ...link, name: newName } : link
    );
  
    dispatch(updateSetting({
      field: "routes.home.inLinks",
      value: updatedInLinks,
    }));
  };


  const getSectionComponent = (section: string) => {
    switch (section) {
      case "hero":
        return <HeroSettings />;
      case "about": 
        return <AboutSettingsSection />;
      case 'book':
       return <BookSectionSettings />;
      case "gallery": 
        return <StoreGallerySettings />;
      case "reviews": 
        return <StoreReviewsSectionSettings />;
      case "services": 
        return <ServicesSectionSettings />;
      case "footer":
        return <StoreFooterSectionSettings />
      default:
        return <div>No settings available for section "{section}".</div>;
    }
  };

  const closePanel = () => setActivePanel(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = homeSections.indexOf(active.id);
      const newIndex = homeSections.indexOf(over.id);
      const newArray = arrayMove(homeSections, oldIndex, newIndex);
      dispatch(
        updateSetting({
          field: "routes.home.contains",
          value: newArray,
        })
      );
    }
  };

  return (
    <div className="w-full h-[80vh] space-y-2">
      <div className="relative px-4 flex justify-center">
        <button
          onClick={() => setIsAddingSection(true)}
          className="flex flex-row justify-between items-center bg-stone-50 border-2 border-white text-black rounded px-8 py-2 shadow-md hover:scale-103 hover:opacity-85"
        >
          Add New Section <FaPlus className="ml-2" size={16} />
        </button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={homeSections} strategy={verticalListSortingStrategy}>
          {homeSections.map((section) => {
            const inLink = routes.home?.inLinks?.find(link => link.section === section);
            return (
              <SortableItem
                key={section}
                id={section}
                name={inLink ? inLink.name : section.charAt(0).toUpperCase() + section.slice(1)}
                onClick={() => setActivePanel(section)} //@ts-ignore-next-line
                onReplaceClick={() => handleReplaceClick(section)}
                onDeleteClick={handleDeleteClick(section)}
                onRename={handleRename}
                isInMenubar={!!inLink}
              />          
            );
          })}
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

      {(showSectionSelector || isAddingSection) && (
        <div className="fixed inset-0 bg-[#0000001e] flex justify-center items-center z-50">
          <div className="bg-white flex flex-row w-[80vw] h-[80vh] overflow-auto">
            <SectionSelector
              onClose={() => {
                setSectionToReplace(null);
                setShowSectionSelector(false);
                setIsAddingSection(false);
              }}
              onSelect={(selectedSection) => {
                if (sectionToReplace) {
                  // Replace logic
                  const updated = homeSections.map((sec) =>
                    sec === sectionToReplace ? selectedSection : sec
                  );
                  dispatch(
                    updateSetting({
                      field: "routes.home.contains",
                      value: updated,
                    })
                  );
                } else {
                  // Add logic
                  handleAddSection(selectedSection);
                }

                setSectionToReplace(null);
                setShowSectionSelector(false);
                setIsAddingSection(false);
              }}
              {...(sectionToReplace ? { sectionToReplace } : {})}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageSettings;
