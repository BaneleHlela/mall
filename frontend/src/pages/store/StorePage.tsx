import type { Store as StoreType } from "../../types/storeTypes"; // Import the correct type for the store object
import { useState, useEffect } from "react";
import { TbLoader3 } from "react-icons/tb";
import { Route, Routes, useParams } from "react-router-dom";
import WebFont from "webfontloader";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchStoreServices } from "../../features/services/servicesSlice";
import { fetchStoreById, setCurrentStore } from "../../features/stores/storeSlice";

import { 
  StoreProductsPage, StoreAboutPage, StoreBookPage,
  StoreHomePage, StorePackagesPage, StoreServicesPage,
  StoreContactPage, StoreEventsPage, StoreGalleryPage,
  StoreMenuPage, StoreReviewsPage 
} from "./supporting/StorePagesCentral";
import PopularStoreMenubar from "../../components/store_layout/menubars/popular/PopularStoreMenubar";
import StoreOrderOnlinePage from "./supporting/order_online/StoreOrderOnlinePage";
import { getBackgroundStyles } from "../../utils/stylingFunctions";
import { setInitialLayout } from "../../features/layouts/layoutSettingsSlice";
import { getLayout } from "../../features/layouts/layoutSlice";
import { fetchStoreProducts } from "../../features/products/productsSlice";
import SingleStoreProductPage from "./supporting/single_product/SingleStoreProductPage";
import StoreBookServicePage from "./supporting/book_service/StoreBookServicePage";
import StoreAlertDiv from "../../components/store_layout/extras/alert_div/StoreAlertDiv";
import StoreMenubarIcons from "../../components/store_layout/menubars/supporting/StoreMenubarIcons";
import StoreFloatingButton from "../../components/store_layout/extras/buttons/StoreFloatingButton";

const StorePage = ({ storeId: propStoreId }: { storeId?: string }) => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const { storeId: paramStoreId } = useParams<{ storeId: string }>();
  const storeId = propStoreId || paramStoreId 

  const dispatch = useAppDispatch();
  const [store, setStore] = useState<StoreType | null>(null); // Local state for the store
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const routes  = settings.routes;
  // Load fonts dynamically
  useEffect(() => {
    if (settings.fonts) {
      const fontsToLoad = Object.values(settings.fonts).filter(Boolean); // Get all non-empty font values
      WebFont.load({
        google: {
          families: fontsToLoad, 
        },
      });
    }
  }, [settings.fonts]);

  // Fetch store by ID
  useEffect(() => {
    const fetchStore = async () => {
      if (storeId) {
        try {
          setLoading(true);
          const result = await dispatch(fetchStoreById(storeId)).unwrap(); // Fetch store and unwrap the result
          setStore(result); // Set the fetched store in local state
          dispatch(setCurrentStore(result)); // Update the global store state
          if (result?.layouts[0]) {
            const layoutResult = await dispatch(getLayout(result.layouts[0] as string)).unwrap(); // Fetch layout and unwrap the result
            dispatch(setInitialLayout(layoutResult)); // Update the global layout state if available
          }
        } catch (error) {
          console.error("Failed to fetch store:", error);
          setStore(null); // Handle error by setting store to null
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchStore();
  }, [storeId, dispatch]);

  useEffect(() => {
    if (storeId) {
        dispatch(fetchStoreServices({ storeId }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreProducts({ storeId }));
    }
  }, [storeId, dispatch]);

  // Fetch store services if applicable
  useEffect(() => {
    if (store?.trades.includes("services") && storeId) {
      dispatch(fetchStoreServices({ storeId })); // Fetch services if needed
    }
  }, [store, storeId, dispatch]);

  if (loading) {
    return <TbLoader3  size={45} className='animate-spin mx-auto'/>;
  }

  if (!store) {
    return <div className="p-6 text-red-500">Store not found.</div>;
  }


  const routeComponents: { [key: string]: React.ReactNode } = {
    "/": <StoreHomePage />,
    "/about": <StoreAboutPage />,
    "/menu": <StoreMenuPage />,
    "/order-online": <StoreOrderOnlinePage />,
    "/contact": <StoreContactPage />,
    "/reviews": <StoreReviewsPage />,
    "/products": <StoreProductsPage />,
    "/packages": <StorePackagesPage />,
    "/services": <StoreServicesPage />,
    "/events": <StoreEventsPage />,
    "/gallery": <StoreGalleryPage />,
    "/book": <StoreBookPage />,
  };

  return (
    <div 
      className={`w-screen h-screen flex flex-row justify-center`}
      style={{
        backgroundColor: settings.background.color,
      }}
    >
      <div 
        style={{
          ...getBackgroundStyles(settings.background),
          // width: window.innerWidth >= 1024 ? settings.background?.width?.desktop : settings.background?.width?.mobile, // Apply width for large screens
        }}
        className={`relative w-screen h-full overflow-y-scroll hide-scrollbar overflow-x-clip`}>
            <PopularStoreMenubar />
            {settings.menubar.alertDiv.display  && (
              <StoreAlertDiv config={settings.menubar.alertDiv} objectPath={`menubar.alertDiv`}/>
            )}
            <Routes>
              {Object.values(routes).map((route) => (
                <Route
                  key={route.url}
                  path={route.url}
                  element={routeComponents[route.url] ?? null}
                />
              ))}
              {store?.trades.includes("products") && <Route path="/product/:productId" element={<SingleStoreProductPage />} />}
              {store?.trades.includes("services") && <Route path="/service/:serviceId" element={<StoreBookServicePage />} />}
            </Routes>
            {settings.floats.floatingIcons.show && (
              <div className={`fixed
                ${settings.floats.floatingIcons.position === "left-1/2" && "left-2 top-1/2"} 
                ${settings.floats.floatingIcons.position === "left-1/4" && "left-2 top-1/4"} 
                ${settings.floats.floatingIcons.position === "right-1/2" && "right-2 top-1/2"} 
                ${settings.floats.floatingIcons.position === "right-1/4" && "right-2 top-1/4"} 
              `}>
                <StoreMenubarIcons
                  style={settings.floats.floatingIcons.icons}
                  asFloat={true}
                />
              </div>
            )}
            {settings.floats.floatingButton.show !== "none" && (
              <div className={`fixed 
                ${settings.floats.floatingButton.position === "left" ? "bottom-2 left-2" : "bottom-2 right-2" }`}>
                <StoreFloatingButton config={settings.floats.floatingButton} />
              </div>
            )}
      </div> 
    </div>
  );
};

export default StorePage;