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
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SettingsContainer from "../SettingsContainer";
import SlidingPanel from "../supporting/SlidingPanel";
import { FaPlus } from "react-icons/fa6";
import {
  updateSetting,
  updateRouteOrder,
} from "../../../features/layouts/layoutSettingsSlice";

// Individual settings
import HomePageSettings from "./HomePageSettings";
import AboutPageSettings from "./AboutPageSettings";
import MenuPageSettings from "./MenuPageSettings";
import ProductsPageSettings from "./ProductsPageSettings";
import ReviewsPageSettings from "./ReviewsPageSettings";
import type { Routes } from "../../../types/layoutTypes";

const SortableItem = ({
  id,
  name,
  onClick,
}: {
  id: string;
  name: string;
  onClick: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
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

const PagesSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const routes: Routes = useAppSelector((state) => state.layoutSettings.routes);
  const routeOrder: string[] = useAppSelector((state) => state.layoutSettings.routeOrder);

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closePanel = () => setActivePanel(null);

  const getSettingsComponent = (pageKey: string) => {
    switch (pageKey) {
      case "home":
        return <HomePageSettings />;
      case "about":
        return <AboutPageSettings />;
      case "menu":
        return <MenuPageSettings />;
      case "products":
        return <ProductsPageSettings />;
      case "reviews":
        return <ReviewsPageSettings />;
      default:
        return <div>No settings available.</div>;
    }
  };

  const validPages = [
    "home", "about", "menu", "reviews", "services",
    "gallery", "book", "contact", "events", "packages", "products",
  ];

  const unusedPages = validPages.filter((page) => !Object.keys(routes).includes(page));

  const handleAddPage = (page: string) => {
    const newRoutes = {
      ...routes,
      [page]: {
        name: page.charAt(0).toUpperCase() + page.slice(1),
        url: `/${page}`,
        contains: [page],
      },
    };
    dispatch(updateSetting({ field: "routes", value: newRoutes }));
    dispatch(updateRouteOrder([...routeOrder, page]));
    setDropdownOpen(false);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = routeOrder.indexOf(active.id);
      const newIndex = routeOrder.indexOf(over.id);
      const newOrder = arrayMove(routeOrder, oldIndex, newIndex);
      dispatch(updateRouteOrder(newOrder));
    }
  };

  return (
    <div className="w-full h-[80vh] space-y-2">
      <div className="relative px-4 flex flex-row justify-center">
        <button
          className="flex flex-row justify-between items-center bg-black text-white rounded-[20px] px-8 py-2 shadow-md hover:scale-103 hover:opacity-85"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Add New Page <FaPlus size={18} className="ml-1" />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              className="absolute top-full dropdown bg-white border border-gray-300 rounded-[20px] mt-0 shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {unusedPages.map((page) => (
                <button
                  key={page}
                  className="block px-15 py-2 text-left rounded-[20px] hover:bg-gray-100 w-full"
                  onClick={() => handleAddPage(page)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={routeOrder} strategy={verticalListSortingStrategy}>
          {routeOrder.map((key) => { // @ts-ignore-next-line
            const route = routes[key]; 
            return (
              <SortableItem
                key={key}
                id={key}
                name={route?.name || key}
                onClick={() => setActivePanel(key)}
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
            onClose={closePanel} // @ts-ignore-next-line
            title={`${routes[activePanel].name} Settings`}
          >
            {getSettingsComponent(activePanel)}
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PagesSettings;
