import type { Store as StoreType } from "../../types/storeTypes"; // Import the correct type for the store object
import { useState, useEffect } from "react";
import { TbLoader3 } from "react-icons/tb";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
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
import { IoMdClose } from "react-icons/io";
import ComingSoon from "../../components/the_mall/ComingSoon";

const StorePage = ({ storeId: propStoreId }: { storeId?: string }) => {
  const location = useLocation();
  const settings = useAppSelector((state) => state.layoutSettings);
  const { storeId: paramStoreId } = useParams<{ storeId: string }>();
  const storeId = propStoreId || paramStoreId 
  const [isChatOpen, setIsChatOpen] = useState(false);

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
          if (result?.layouts[0] && !location.pathname.includes("layouts")) {
            console.log("Fetching layout from store page.")
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

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
            {settings?.menubar?.alertDiv?.display && (
              <StoreAlertDiv config={settings.menubar.alertDiv} objectPath={`menubar.alertDiv`} />
            )}
            <Routes>
              <Route key="*" path="*" element={<StoreHomePage />} />
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
            {settings?.floats?.floatingIcons?.show && (
              <div className={`fixed z-5 
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

            {settings?.floats?.floatingButton?.show !== "none" && (
              <div className={`fixed z-5
                ${settings.floats.floatingButton.position === "left" ? "bottom-2 left-2" : "bottom-2 right-2"}`}
              >
                <StoreFloatingButton
                  config={settings.floats.floatingButton}
                  onClick={() => {
                    if (settings.floats.floatingButton.show === "chat") {
                      setIsChatOpen(true);
                    }
                  }}
                />
              </div>
            )}
            {isChatOpen && (
              <div
                className={`
                  fixed 
                  ${settings.floats.floatingButton.position === "left" ? "bottom-0 left-0 lg:bottom-2 lg:left-2" : "bottom-0 right-0 lg:bottow-2 lg:right-2"}
                  z-50
                `}
              >
                <div
                  className={`w-[60w] h-[80vh] 
                    bg-white rounded-lg shadow-lg
                    flex flex-col
                    relative lg:w-[20vw] lg:h-[60vh]
                  `}
                >
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                  >
                    <IoMdClose />
                  </button>
                  <div className="p-4 overflow-y-auto h-full">
                    <div className="border-b h-[12%]">
                      <h2 className="text-lg font-semibold mb-2">{store?.name}</h2>
                      <p className="text-sm text-gray-600">Online</p>
                    </div>
                    <div className="h-[88%] w-full">
                      <ComingSoon message="Soon you'll be able to chat directly with vendors right here on the website!" />
                    </div>
                  </div>
                  
                </div>
              </div>
            )}
      </div> 
    </div>
  );
};

export default StorePage;