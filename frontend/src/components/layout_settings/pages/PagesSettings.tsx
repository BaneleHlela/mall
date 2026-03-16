import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import type { Routes, Route } from "../../../types/layoutTypes";
import SettingsContainer from "../SettingsContainer";
import SlidingPanel from "../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import { useBreadcrumbs } from "../../../contexts/BreadcrumbContext";
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
  panelId,
}: {
  page: PageItem;
  onClick: () => void;
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
        isDraggable
        dragProps={{ attributes, listeners, setNodeRef }}
        isDragging={isDragging}
        icon={page.icon}
      />
    </div>
  );
};

const PagesSettings = () => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { addBreadcrumb } = useBreadcrumbs();
  const dispatch = useAppDispatch();
  
  // Local state for page order (for drag-and-drop)
  const [pageOrder, setPageOrder] = useState<string[]>([]);

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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedPages.map(p => p.id)} strategy={verticalListSortingStrategy}>
          {sortedPages.map((page) => (
            <SortablePageItem
              key={page.id}
              page={page}
              onClick={() => handlePanelOpen(page.id, page.name)}
              panelId={page.id}
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
    </div>
  );
};

export default PagesSettings;
