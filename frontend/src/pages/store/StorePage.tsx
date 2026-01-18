import type { Store as StoreType } from "../../types/storeTypes"; // Import the correct type for the store object
import { useState, useEffect } from "react";
import { TbLoader3 } from "react-icons/tb";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import WebFont from "webfontloader";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchStoreServices } from "../../features/services/servicesSlice";
import { fetchStoreBySlug, setCurrentStore } from "../../features/stores/storeSlice";

import {
  StoreProductsPage, StoreAboutPage, StoreBookPage,
  StoreHomePage, StorePackagesPage, StoreServicesPage,
  StoreContactPage, StoreEventsPage, StoreGalleryPage,
  StoreMenuPage, StoreReviewsPage
} from "./supporting/StorePagesCentral";
import BasicStoreSearchResultsPage from "./supporting/BasicStoreSearchResultsPage";
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
import StoreWelcomeDiv from "../../components/store_layout/extras/StoreWelcomeDiv";
import { IoMdClose } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import StoreCartModal from "../cart/StoreCartModal";
import StoreMenubar from "../../components/store_layout/menubars/StoreMenubar";
import HorizontalProductsSection from "../../components/store_layout/sections/products/horizontal_products/HorizontalProductsSection";
import ShortAbout from "../../components/store_layout/sections/about/short_about/ShortAbout";
import FirstFAQs from "../../components/store_layout/sections/FAQs/first_faqs/FirstFAQs";
import StylishHero from "../../components/store_layout/sections/hero/styling_hero/StylishHero";
import MaxThreeGallery from "../../components/store_layout/sections/gallery/max_three_gallery/MaxThreeGallery";
import DoctorAbout from "../../components/store_layout/sections/about/doctor_about/DoctorAbout";
import ArtMenubar from "../../components/store_layout/menubars/art_menubar/ArtMenubar";
import EnnockHero from "../../components/store_layout/sections/hero/ennock_hero/EnnockHero";
import BasicSearchResults from "../../components/store_layout/sections/search_results/basic_search_results/InStoreBasicSearchResults";
import ErrorBoundary from "../../components/ErrorBoundary";
import FooterWithSocialsAndEmail from "../../components/store_layout/sections/footer/footer_with_socials_and_email/FooterWithSocialsAndEmail";
import HeroWithBox from "../../components/store_layout/sections/hero/hero_with_box/HeroWithBox";
import { fetchStoreRentals } from "../../features/rentals/rentalSlice";
import { fetchStorePackages } from "../../features/packages/packagesSlice";
import { fetchStoreDonations } from "../../features/donations/donationsSlice";
import ProtectedRoute from "../../components/the_mall/authorization/ProtectedRoute";

const StorePage = ({ storeSlug: propStoreSlug }: { storeSlug?: string }) => {
  const location = useLocation();
  const settings = useAppSelector((state) => state.layoutSettings);
  const { storeSlug: paramStoreSlug } = useParams<{ storeSlug: string }>();
  const storeSlug = propStoreSlug || paramStoreSlug
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomeDiv, setShowWelcomeDiv] = useState(settings?.welcomeDiv?.display || false);
  const isCartRoute = location.pathname.includes('/cart'); // Check if the current route is "/cart"

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
      if (storeSlug) {
        try {
          setLoading(true);
          const result = await dispatch(fetchStoreBySlug(storeSlug)).unwrap(); // Fetch store and unwrap the result
          setStore(result); // Set the fetched store in local state
          dispatch(setCurrentStore(result)); // Update the global store state

          // Handle website object instead of layouts
          if (result?.website) {
            if (result.website.source === 'external' && result.website.websiteUrl) {
              // Redirect to external website
              window.location.href = result.website.websiteUrl;
              return;
            } else if ((result.website.source === 'internal' || result.website.source === 'custom') && result.website.layoutId && !location.pathname.includes("layouts")) {
              const layoutResult = await dispatch(getLayout(result.website.layoutId)).unwrap(); // Fetch layout and unwrap the result
              dispatch(setInitialLayout(layoutResult)); // Update the global layout state if available
            }
          } else if (result?.layouts[0] && !location.pathname.includes("layouts")) {
            // Fallback to old logic if website object not set
            console.log("Fetching layout from store page (fallback).")
            const layoutResult = await dispatch(getLayout(result.layouts[0] as string)).unwrap(); // Fetch layout and unwrap the result
            console.log(layoutResult);
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
  }, [storeSlug, dispatch]);

  // Fetch store services if applicable
  useEffect(() => {
    if (storeSlug) {
        dispatch(fetchStoreServices({ storeSlug }));
    }
  }, [dispatch]);

  // Fetch store products if applicable
  useEffect(() => {
    if (storeSlug && store?.slug) {
      dispatch(fetchStoreProducts({ storeSlug: store.slug }));
    }
  }, [storeSlug, dispatch, store]);

  // Fetch store rentals if applicable
  useEffect(() => {
    if (storeSlug && store?.trades.includes("rentals")) {
      dispatch(fetchStoreRentals({ storeSlug }));
    }
  }, [storeSlug, dispatch, store]);

  // Fetch store services if applicable
  useEffect(() => {
  if (store?.trades.includes("services") && storeSlug) {
    dispatch(fetchStoreServices({ storeSlug })); // Fetch services if needed
  }
  }, [store, storeSlug, dispatch]);

  // Fetch store donations if applicable
  useEffect(() => {
    if (store?.trades.includes("donations") && storeSlug) {
      dispatch(fetchStoreDonations({ storeSlug: store.slug }));
    }
  }, [store, storeSlug, dispatch]);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

 

  // --- Guarantee section scroll after page fully renders ---
  useEffect(() => {
    if (!location.hash) return;

    const hash = location.hash;

    // Try immediately
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    // First attempt
    if (tryScroll()) return;

    // Retry a few times until the section is mounted
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (tryScroll() || attempts > 20) {
        clearInterval(interval);
      }
    }, 150); // retry every 150ms
  }, [location, store, settings.routes]);

 const isStoreOpen = (store: StoreType) => {
   if (!store.operationTimes) return false;
   if (store.manualStatus?.isOverridden) {
     return store.manualStatus.status === 'open';
   }
   if (store.operationTimes.alwaysOpen) return true;
   const now = new Date();
   const day = now.getDay(); // 0 = sunday, 1 = monday, etc.
   const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
   const today = days[day];
   const todayHours = (store.operationTimes as any)[today];
   if (todayHours.closed) return false;
   const start = todayHours.start;
   const end = todayHours.end;
   const currentTime = now.toTimeString().slice(0,5); // HH:MM
   return currentTime >= start && currentTime <= end;
 };

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
        backgroundColor: settings.colors.primary,
      }}
    >
      <div 
        style={{
          ...getBackgroundStyles(settings.background, settings.colors),
          // width: window.innerWidth >= 1024 ? settings.background?.width?.desktop : settings.background?.width?.mobile, // Apply width for large screens
        }}
        className={`relative w-screen h-full overflow-y-scroll hide-scrollbar overflow-x-clip`}>
            {!isCartRoute && (
              <>
                {/* Store Menubar */}
                <StoreMenubar />
                {/* <ArtMenubar /> */}
              </>
            )}
            {settings?.menubar?.alertDiv?.display && (
                  <StoreAlertDiv config={settings.menubar.alertDiv} />
            )}
            
            
            
            {/* Routes */}
            <Routes>
              <Route key="*" path="*" element={<StoreHomePage />} />
              {Object.values(routes).map((route) => (
                <Route
                  key={route.url}
                  path={route.url}
                  element={routeComponents[route.url] ?? null}
                />
              ))}
              {store?.trades.includes("products") && <Route path="/product/:productSlug" element={<SingleStoreProductPage />} />}
              {store?.trades.includes("products") && 
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <div className="flex justify-center w-full">
                        <StoreCartModal />
                      </div>
                    </ProtectedRoute> 
                  } 
                />}
              {store?.trades.includes("services") && <Route path="/service/:serviceSlug" element={<StoreBookServicePage />} />}
              <Route path="/search" element={<BasicStoreSearchResultsPage />} />
            </Routes>
            {/* Floating Icons */}
            <ErrorBoundary>
              {settings?.floats?.floatingIcons?.show && !isCartRoute && (
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
            </ErrorBoundary>
            {/* Floating Button */}
            {settings?.floats?.floatingButton && settings.floats.floatingButton.show !== "none" && !isCartRoute && (
              <div className={`fixed z-5
                ${settings.floats.floatingButton?.position === "left" ? "bottom-2 left-2" : "bottom-2 right-2"}`}
              >
                <StoreFloatingButton
                  config={settings.floats.floatingButton}
                  onClick={() => {
                    if (settings.floats.floatingButton?.show === "chat") {
                      setIsChatOpen(true);
                    }
                  }}
                />
              </div>
            )}
            {/* Chat Modal */}
            {isChatOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setIsChatOpen(false)}
                />

                {/* Floating Chat Container */}
                <div
                  className={`
                    fixed z-50 
                    ${settings.floats.floatingButton.position === "left"
                      ? "bottom-0 left-0 lg:bottom-0 lg:left-3"
                      : "bottom-0 right-0 lg:bottom-0 lg:right-3"
                    }
                  `}
                >
                  <div
                    className="
                      relative flex flex-col
                      w-[90vw] h-[80vh]
                      lg:w-[22vw] lg:h-[60vh]
                      bg-white rounded-2xl shadow-2xl
                    "
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="
                        absolute top-3 right-3 z-20
                        text-gray-600 hover:text-gray-800
                        transition-colors duration-200
                        text-2xl
                      "
                    >
                      <IoMdClose />
                    </button>

                    {/* Header */}
                    <div className="p-4 bg-white border-b rounded-t-2xl z-10">
                      <h2 className="text-lg font-semibold">{store?.name}</h2>

                      <div
                        className="mt-1 flex items-center text-[2vh] text-gray-600"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {/* Dot */}
                        <span
                          className={
                            "inline-block w-[1.2vh] h-[1.2vh] rounded-full mr-2 " +
                            (isStoreOpen(store) ? "bg-green-500" : "bg-red-500")
                          }
                          title={isStoreOpen(store) ? "Online" : "Offline"}
                          aria-hidden="true"
                        />

                        {/* Status text */}
                        <p className="m-0">
                          {isStoreOpen(store) ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>

                    {/* Chat Body — ONLY THIS HAS BG IMAGE */}
                    <div
                      className="
                        flex flex-col items-center justify-center text-center
                        flex-1 p-6 relative
                      "
                      style={{
                        backgroundImage:
                          "url(https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-05%20113609.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Optional overlay for contrast */}
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

                      {/* Actual content */}
                      <div className="relative z-10 flex flex-col items-center">
                        <h1
                          className="text-[8vh] lg:text-6xl font-bold mb-4 drop-shadow-lg text-white"
                          style={{ lineHeight: 1, fontFamily: "Roboto" }}
                        >
                          Coming Soon
                        </h1>

                        <FaTools className="animate-bounce text-4xl lg:text-5xl text-white mb-6 drop-shadow-md" />

                        <p className="
                          text-sm text-gray-800 bg-white/90 
                          shadow-md rounded-lg p-4
                          w-[80%] max-w-[300px]
                        ">
                          Soon you'll be able to chat directly with vendors right here on the website!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              )}

            {/* Welcome Div */}
            {/* {(
              <StoreWelcomeDiv
                //config={settings.welcomeDiv}
                store={store}
                onClose={() => setShowWelcomeDiv(false)}
              />
            )} */}

      </div> 
    </div>
  );
};

export default StorePage;