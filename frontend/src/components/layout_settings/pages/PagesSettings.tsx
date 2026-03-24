import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateSetting, setInitialLayout } from "../../../features/layouts/layoutSettingsSlice";
import { addSectionFromLayout, copySectionFromLayout } from "../../../features/sections/sectionSlice";
import type { Routes, Route } from "../../../types/layoutTypes";
import SettingsContainer from "../SettingsContainer";
import SlidingPanel from "../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import { useBreadcrumbs } from "../../../contexts/BreadcrumbContext";
import SectionSelector from "../supporting/section_selector/SectionSelector";
import { FaPlus } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  useSortable, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HomePageSettings from "./HomePageSettings";
import AboutPageSettings from "./AboutPageSettings";
import ContactPageSettings from "./ContactPageSettings";
import GalleryPageSettings from "./GalleryPageSettings";
import ProductsPageSettings from "./ProductsPageSettings";
import ServicesPageSettings from "./ServicesPageSettings";
import ReviewsPageSettings from "./ReviewsPageSettings";
import MenuPageSettings from "./MenuPageSettings";
import BookPageSettings from "./BookPageSettings";
import EventsPageSettings from "./EventsPageSettings";
import PackagesPageSettings from "./PackagesPagesSettings";
import SingleStoreProductPageSettings from "./SingleStoreProductPageSettings";
import StoreSearchResultsPageSettings from "./StoreSearchResultsPageSettings";
import BookServicePageSettings from "./BookServicePageSettings";
import { 
  Home, 
  User, 
  Phone, 
  Image, 
  ShoppingBag, 
  Briefcase, 
  Star, 
  Utensils, 
  Calendar, 
  Package,
  Search,
  FileText
} from "lucide-react";

interface PageItem {
  id: string;
  routeKey?: keyof Routes;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  // For conditional pages
  requiresRouteContains?: string[]; // Show if any route contains any of these strings
  requiresMenubarVariation?: string[]; // Show if menubar variation matches any of these
}

// Sortable wrapper for page items
const SortablePageItem = ({
  page,
  onClick,
  onDelete,
  panelId,
}: {
  page: PageItem;
  onClick: () => void;
  onDelete: (pageId: string) => void;
  panelId: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={isDragging ? 'z-50' : ''}>
      <SettingsContainer
        name={page.name}
        onClick={onClick}
        onDeleteClick={() => onDelete(page.id)}
        isDraggable
        dragProps={{ attributes, listeners, setNodeRef }}
        isDragging={isDragging}
        icon={page.icon}
        deletable
      />
    </div>
  );
};

const PagesSettings = () => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const { isLoading, error } = useAppSelector(state => state.sections);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { addBreadcrumb } = useBreadcrumbs();
  const dispatch = useAppDispatch();
  const MySwal = withReactContent(Swal);
  
  // Local state for page order (for drag-and-drop)
  const [pageOrder, setPageOrder] = useState<string[]>([]);
  
  // State for add page mode
  const [isAddingPage, setIsAddingPage] = useState(false);

  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handlePanelOpen = (panelId: string, label: string) => {
    setActivePanel(panelId);
    addBreadcrumb(panelId, label, closePanel);
  };

  // Helper to check if any route contains specific strings
  const routeContains = (searchStrings: string[]): boolean => {
    const routes = settings?.routes as Routes | undefined;
    if (!routes) return false;

    const routeValues = Object.values(routes) as Route[];
    return routeValues.some(route => 
      route?.contains?.some(content => 
        searchStrings.some(search => content.toLowerCase().includes(search.toLowerCase()))
      )
    );
  };

  // Get available pages from routeComponents that are not already in routes
  const availablePagesToAdd = useMemo(() => {
    // This maps route URL paths to their section names (from StorePage.tsx routeComponents)
    const routeComponentsMap: { [url: string]: { section: string; name: string; url: string } } = {
      "/about": { section: "about", name: "About", url: "/about" },
      "/menu": { section: "menu", name: "Menu", url: "/menu" },
      "/order-online": { section: "order", name: "Order Online", url: "/order-online" },
      "/contact": { section: "contact", name: "Contact", url: "/contact" },
      "/reviews": { section: "reviews", name: "Reviews", url: "/reviews" },
      "/products": { section: "products", name: "Products", url: "/products" },
      "/packages": { section: "packages", name: "Packages", url: "/packages" },
      "/services": { section: "services", name: "Services", url: "/services" },
      "/events": { section: "events", name: "Events", url: "/events" },
      "/gallery": { section: "gallery", name: "Gallery", url: "/gallery" },
      "/book": { section: "book", name: "Book", url: "/book" },
    };

    const routes = settings?.routes as Routes | undefined;
    if (!routes) return [];

    // Filter out pages that already exist in routes
    const existingRouteUrls = Object.values(routes).map(r => r?.url).filter(Boolean);
    
    return Object.values(routeComponentsMap).filter(
      pageInfo => !existingRouteUrls.includes(pageInfo.url)
    );
  }, [settings?.routes]);

  // Handle adding a new page
  const handleAddPage = async (sectionName: string, sourceLayoutId?: string) => {
    const pageInfo = availablePagesToAdd.find(p => p.section === sectionName);
    if (!pageInfo) return;


    const activeLayoutId = settings?._id;
    if (!activeLayoutId) {
      console.error('No active layout found');
      setIsAddingPage(false);
      return;
    }

    // Use the provided sourceLayoutId or fall back to activeLayoutId
    const layoutIdToUse = sourceLayoutId || activeLayoutId;

    try {
      // Call the backend to add the section to the layout
      const result = await dispatch(copySectionFromLayout({
        sourceLayoutId: layoutIdToUse,
        targetLayoutId: activeLayoutId,
        sectionName: sectionName
      }));

      // Check if the dispatch was successful
      if (!error) {
        const { layout } = result.payload;
        
        // Update the layout settings state with the complete updated layout from backend
        dispatch(setInitialLayout(layout));

        // Add the route with the section and footer
        const newRoute: Route = {
          name: pageInfo.name,
          url: pageInfo.url,
          contains: [sectionName, "footer"]
        };

        // Dispatch to add the route - using the section name as the route key
        dispatch(updateSetting({
          field: `routes.${sectionName}`,
          value: newRoute
        }));

        // Add the section to routeOrder
        const currentRouteOrder = settings?.routeOrder || [];
        dispatch(updateSetting({
          field: 'routeOrder',
          value: [...currentRouteOrder, sectionName]
        }));
      } else {
        console.error('Failed to add section:', result.payload);
      }
    } catch (error) {
      console.error('Error adding section:', error);
    }

    setIsAddingPage(false);
  };

  // Handle delete click - delete the page from routes and routeOrder, but NOT from sections
  const handleDeleteClick = (pageId: string) => {
    const routes = settings?.routes as Routes | undefined;
    if (!routes) return;


    MySwal.fire({
      title: `Delete "${pageId}"?`,
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the entire route object from routes using pageId directly
        const updatedRoutes = { ...routes };
        delete (updatedRoutes as any)[pageId];
        console.log(updatedRoutes)
        dispatch(updateSetting({
          field: "routes",
          value: updatedRoutes
        }));

        // Remove from routeOrder
        const currentRouteOrder = settings?.routeOrder || []; // @ts-ignore
        const updatedRouteOrder = currentRouteOrder.filter(name => name !== pageId);
        dispatch(updateSetting({
          field: 'routeOrder',
          value: updatedRouteOrder
        }));
      }
    });
  };

  // All available page settings
  const allPageSettings: PageItem[] = [
    { id: "home", routeKey: "home", name: "Home", icon: <Home size={16} />, component: <HomePageSettings /> },
    { id: "about", routeKey: "about", name: "About", icon: <User size={16} />, component: <AboutPageSettings /> },
    { id: "contact", routeKey: "contact", name: "Contact", icon: <Phone size={16} />, component: <ContactPageSettings /> },
    { id: "gallery", routeKey: "gallery", name: "Gallery", icon: <Image size={16} />, component: <GalleryPageSettings /> },
    { id: "products", routeKey: "products", name: "Products", icon: <ShoppingBag size={16} />, component: <ProductsPageSettings /> },
    { id: "services", routeKey: "services", name: "Services", icon: <Briefcase size={16} />, component: <ServicesPageSettings /> },
    { id: "reviews", routeKey: "reviews", name: "Reviews", icon: <Star size={16} />, component: <ReviewsPageSettings /> },
    { id: "menu", routeKey: "menu", name: "Menu", icon: <Utensils size={16} />, component: <MenuPageSettings /> },
    { id: "book", routeKey: "book", name: "Book", icon: <Calendar size={16} />, component: <BookPageSettings /> },
    { id: "events", routeKey: "events", name: "Events", icon: <Calendar size={16} />, component: <EventsPageSettings /> },
    { id: "packages", routeKey: "packages", name: "Packages", icon: <Package size={16} />, component: <PackagesPageSettings /> },
    // Conditional pages
    { 
      id: "singleProduct", 
      name: "Single Product", 
      icon: <FileText size={16} />, 
      component: <SingleStoreProductPageSettings />,
      requiresRouteContains: ["product"] 
    },
    { 
      id: "searchResults", 
      name: "Search Results", 
      icon: <Search size={16} />, 
      component: <StoreSearchResultsPageSettings />,
      requiresMenubarVariation: ["menubarWithSearchbar"] 
    },
    { 
      id: "bookService", 
      name: "Book Service", 
      icon: <Calendar size={16} />, 
      component: <BookServicePageSettings />,
      requiresRouteContains: ["service"] 
    },
  ];

  // Filter pages based on routes that exist in settings
  const filteredPageSettings = useMemo(() => {
    const routes = settings?.routes as Routes | undefined;
    const menubarVariation = settings?.menubar?.variation;
    
    if (!routes) {
      // If no routes defined, show all pages except conditional ones
      return allPageSettings.filter(page => !page.requiresRouteContains && !page.requiresMenubarVariation);
    }

    return allPageSettings.filter(page => {
      // Check standard routes
      if (page.routeKey) {
        const routeExists = routes[page.routeKey] !== undefined;
        if (!routeExists) return false;
      }

      // Check route contains requirement
      if (page.requiresRouteContains) {
        const hasRequiredContent = routeContains(page.requiresRouteContains);
        if (!hasRequiredContent) return false;
      }

      // Check menubar variation requirement
      if (page.requiresMenubarVariation) {
        if (!menubarVariation || !page.requiresMenubarVariation.includes(menubarVariation)) {
          return false;
        }
      }

      return true;
    });
  }, [settings?.routes, settings?.menubar?.variation]);

  // Initialize page order when filtered pages change for the first time
  useEffect(() => {
    if (pageOrder.length === 0 && filteredPageSettings.length > 0) {
      setPageOrder(filteredPageSettings.map(p => p.id));
    }
  }, [filteredPageSettings, pageOrder.length]);

  // Sort pages based on page order
  const sortedPages = useMemo(() => {
    if (pageOrder.length === 0) return filteredPageSettings;
    return [...filteredPageSettings].sort((a, b) => {
      const indexA = pageOrder.indexOf(a.id);
      const indexB = pageOrder.indexOf(b.id);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [filteredPageSettings, pageOrder]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortedPages.findIndex(p => p.id === active.id);
      const newIndex = sortedPages.findIndex(p => p.id === over.id);
      const newOrder = arrayMove(pageOrder, oldIndex, newIndex);
      setPageOrder(newOrder);
    }
  };

  return (
    <div className="p-1 space-y-2">
      {/* Add Page Button - only show if there are pages available to add */}
      {availablePagesToAdd.length > 0 && (
        <div className="relative px-4 flex justify-center">
          <button
            onClick={() => setIsAddingPage(true)}
            className="text-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[2.4vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
          >
            Add New Page <FaPlus className="ml-[.6vh]"/>
          </button>
        </div>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedPages.map(p => p.id)} strategy={verticalListSortingStrategy}>
          {sortedPages.map((page) => (
            <SortablePageItem
              key={page.id}
              page={page}
              onClick={() => handlePanelOpen(page.id, page.name)}
              panelId={page.id}
              onDelete={() => handleDeleteClick(page.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <AnimatePresence>
        {filteredPageSettings.map((page) => (
          activePanel === page.id && (
            <SlidingPanel
              key={page.id}
              isOpen={true}
              onClose={closePanel}
              title={`${page.name} Page Settings`}
              panelId={page.id}
            >
              <>
                {page.component}
              </>
            </SlidingPanel>
          )
        ))}
      </AnimatePresence>

      {/* Section Selector for adding new pages */}
      {isAddingPage && (
        <div className="fixed inset-0 bg-[#0000001e] flex justify-center items-center z-50">
          <div className="bg-white flex flex-row w-[80vw] h-[80vh] overflow-auto">
            <SectionSelector
              onClose={() => {
                !error && !isLoading && setIsAddingPage(false)
              }}
              onSelect={handleAddPage}
              addingPage={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesSettings;
