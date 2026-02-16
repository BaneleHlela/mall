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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Individual settings
import HomePageSettings from "./HomePageSettings";
import AboutPageSettings from "./AboutPageSettings";
import MenuPageSettings from "./MenuPageSettings";
import ProductsPageSettings from "./ProductsPageSettings";
import ReviewsPageSettings from "./ReviewsPageSettings";
import type { Routes } from "../../../types/layoutTypes";
import ServicesPageSettings from "./ServicesPageSettings";
import GalleryPageSettings from "./GalleryPageSettings";
import ContactPageSettings from "./ContactPageSettings";
import SingleStoreProductPageSettings from "./SingleStoreProductPageSettings";
import BookPageSettings from "./BookPageSettings";
import BookServicePageSettings from "./BookServicePageSettings";
import StoreSearchResultsPageSettings from "./StoreSearchResultsPageSettings";
import SectionSelector from "../supporting/section_selector/SectionSelector";
import PackagesPagesSettings from "./PackagesPagesSettings";


const SortableItem = ({
  id,
  name,
  onClick,
  onDeleteClick,
  onRename,
}: {
  id: string;
  name: string;
  onClick: () => void;
  onDeleteClick: () => void;
  onRename: (newName: string) => void;
}) => {
  const [draggable, setDraggable] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDoubleClick = () => {
    setDraggable(true);
    // Optional: Reset after a delay to avoid permanent draggable state
    setTimeout(() => setDraggable(false), 2000);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(draggable ? attributes : {})}
      {...(draggable ? listeners : {})}
      onDoubleClick={handleDoubleClick}
    >
      <SettingsContainer
        name={name}
        onClick={onClick}
        onRename={(newName) => onRename(newName)}
        onDeleteClick={onDeleteClick}
        deletable={id !== "home"}
        renamable={id !== "home"}
      />
    </div>
  );
};


const PagesSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const routes: Routes = useAppSelector((state) => state.layoutSettings.routes);
  const routeOrder: string[] = useAppSelector((state) => state.layoutSettings.routeOrder);
  const store = useAppSelector((state) => state.storeAdmin.store);
  const settings = useAppSelector((state) => state.layoutSettings);
  const [ openSectionSelector, setOpenSectionSelector ] = useState(false);
  const MySwal = withReactContent(Swal);

  const [activePanel, setActivePanel] = useState<string | null>(null);

  const closePanel = () => setActivePanel(null);
  
  const handleDeleteClick = (page: string) => {
    MySwal.fire({ // @ts-ignore-next-line
      title: `Delete "${routes[page]?.name || page}" page?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newRoutes = { ...routes }; // @ts-ignore-next-line
        delete newRoutes[page];
        
        const newRouteOrder = routeOrder.filter((p) => p !== page);
        
        dispatch(updateSetting({ field: "routes", value: newRoutes }));
        dispatch(updateRouteOrder(newRouteOrder));
      }
    });
  };
  
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
      case "services":
        return <ServicesPageSettings />;
      case "reviews":
        return <ReviewsPageSettings />;
      case "gallery":
        return <GalleryPageSettings />;
      case "contact":
        return <ContactPageSettings />;
      case "packages": 
        return <PackagesPagesSettings />
      case "book":
        return <BookPageSettings />;
      case "menu": 
        return <MenuPageSettings />
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
  };

  // Wrapper for section selector - converts section variation to page name
  const handleSectionSelect = (sectionVariation: string) => {
    handleAddPage(sectionVariation);
    setOpenSectionSelector(false);
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
  const handleRename = (pageKey: string, newName: string) => {
    const newRoutes = {
      ...routes,
      [pageKey]: { // @ts-ignore-next-line
        ...routes[pageKey],
        name: newName
      }
    };
    dispatch(updateSetting({ field: "routes", value: newRoutes }));
  };

  return (
    <div className="w-full h-[80vh] space-y-2 bg-stone-50">
      <div className="relative px-4 flex flex-row justify-center">
        <button
          className="text-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[2.4vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
          onClick={() => setOpenSectionSelector(true)}
        >
          Add New Page <FaPlus className="ml-[.6vh]" />
        </button>
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
                onDeleteClick={() => handleDeleteClick(key)}
                onRename={(newName) => handleRename(key, newName)}
              />
            );
          })}
        </SortableContext>
      </DndContext>
      
      {store?.trades.includes('products') && (
          <SettingsContainer
            name="Single Product Page"
            onClick={() => setActivePanel("single_product")}
            deletable={false}
            renamable={false}
          />
      )}

      {store?.trades.includes('services') && (
          <SettingsContainer
            name="Single Service Page"
            onClick={() => setActivePanel("service")}
            deletable={false}
            renamable={false}
          />
      )}

      {settings.menubar?.variation === "menubarWithSearchbar" && (settings.sections as any).searchResults && (
          <SettingsContainer
            name="Search Results Page"
            onClick={() => setActivePanel("search_results")}
            deletable={false}
            renamable={false}
          />
      )}

      <AnimatePresence>
        {activePanel && activePanel !== "single_product" && activePanel !== "service" && activePanel !== "search_results" && (
          <SlidingPanel
            key={activePanel}
            isOpen={true}
            onClose={closePanel} // @ts-ignore-next-line
            title={`${routes[activePanel].name} Settings`}
          >
            {getSettingsComponent(activePanel)}
          </SlidingPanel>
        )}
        {activePanel === "single_product" && (
          <SlidingPanel
            key="single_prodcut"
            isOpen={true}
            onClose={closePanel} // @ts-ignore-next-line
            title={`Single Product Page Settings`}
          >
            <SingleStoreProductPageSettings />
          </SlidingPanel>
        )}
        {activePanel === "service" && (
          <SlidingPanel
            key="service"
            isOpen={true}
            onClose={closePanel} // @ts-ignore-next-line
            title={`Service Page Settings`}
          >
            <BookServicePageSettings />
          </SlidingPanel>
        )}
        {activePanel === "search_results" && (
          <SlidingPanel
            key="search_results"
            isOpen={true}
            onClose={closePanel}
            title={`Search Results Page Settings`}
          >
            <StoreSearchResultsPageSettings />
          </SlidingPanel>
        )}
      </AnimatePresence>
      {openSectionSelector && (
        <div className="fixed inset-0 bg-[#0000001e] flex justify-center items-center z-50">
          <div className="bg-white flex flex-row w-[80vw] h-[80vh] overflow-auto">
            <SectionSelector
              onClose={() => setOpenSectionSelector(false)}
              onSelect={handleSectionSelect}
              addingPage={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesSettings;
