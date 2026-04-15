import React, { useEffect, useState, createContext, useContext } from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/home/Home";
import authRoutes from "./routes/authRoutes";
import Scribbler from "./components/Scibbler";
import Layouts from "./pages/layout_editor/Layouts";
import StorePage from "./pages/store/StorePage";
import Menubar from "./components/the_mall/menubar/Menubar";
import MyStores from "./pages/my_stores/MyStores";
import Account from "./pages/account/Account";
import StoreDashboard from "./pages/store_dashboard/StoreDashboard";
import MyLayouts from "./pages/store_dashboard/supporting_pages/layouts/StoreDashboardLayouts";
import { useDispatch } from "react-redux";
import { setInitialLayout } from "./features/layouts/layoutSettingsSlice";
import CreatorsDashboard from "./pages/creators_dashboard/CreatorsDashboard";
import ProtectedRoute from "./components/the_mall/authorization/ProtectedRoute";
import LayoutCreator from "./pages/store_dashboard/supporting_pages/layouts/supporting/LayoutCreator";
import MallSearchPage from "./pages/search/MallSearchPage";
import FavoriteStores from "./pages/favorites/FavoriteStores";
import BusinessPlan from "./components/the_mall/home/BusinessPlan";
import ForCreators from "./components/the_mall/home/ForCreators";
import CaptureHomePoster from "./components/the_mall/basic_store_post/CaptureHomePoster";
import AddStorePage from "./pages/store/AddStorePage";
import AddUserAddressPage from "./pages/profile/address/AddUserAddressPage";
import GetStartedPage from "./pages/store/get_started_page/GetStartedPage";
import PayFastPage from "./pages/payments/PayFastPage";
import MallCartPage from "./pages/cart/MallCartPage";
import "./features/api/axiosInstance"; // Initialize axios interceptors
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import AllReviews from "./pages/reviews/AllReviews";
import { checkAuth } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import ChatLandingPage from "./pages/chat/ChatLandingPage";

// Reviews Modal Context
interface ReviewsModalContextType {
  openReviewsModal: (postIdentifier?: string, storeSlug?: string, isMall?: boolean) => void;
}

const ReviewsModalContext = createContext<ReviewsModalContextType | undefined>(undefined);

export const useReviewsModal = () => {
  const context = useContext(ReviewsModalContext);
  if (!context) {
    throw new Error('useReviewsModal must be used within ReviewsModalProvider');
  }
  return context;
};

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  // Reviews modal state
  const [reviewsModal, setReviewsModal] = useState({
    isOpen: false,
    postIdentifier: '',
    storeSlug: '',
    isMall: false
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.layoutSettings) {
        dispatch(setInitialLayout(event.data.layoutSettings));
        localStorage.setItem("layoutSettings", JSON.stringify(event.data.layoutSettings));
      }
    };

    // Handle auth logout event when token refresh fails
    // const handleAuthLogout = () => {
    //   navigate('/login');
    // };

    window.addEventListener("message", handleMessage);
    //window.addEventListener('auth:logout', handleAuthLogout);
    return () => {
      window.removeEventListener("message", handleMessage);
      //window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, [dispatch, navigate]);

  //Check Auth
  useEffect(() => {
    dispatch(checkAuth() as any);
  }, [dispatch]);

  // Reviews modal handlers
  const openReviewsModal = (postIdentifier = '', storeSlug = '', isMall = false) => {
    setReviewsModal({
      isOpen: true,
      postIdentifier,
      storeSlug,
      isMall
    });
  };

  const closeReviewsModal = () => {
    setReviewsModal({
      isOpen: false,
      postIdentifier: '',
      storeSlug: '',
      isMall: false
    });
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (reviewsModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [reviewsModal.isOpen]);


  return (
    <ReviewsModalContext.Provider value={{ openReviewsModal }}>
      <ScrollToTop />
      <div className={`relative font-[Outfit] text-[2vh] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-stone-100'} h-fit w-screen max-w-screen flex justify-center items-center overflow-x-clip overflow-y-scroll hide-scrollbar ${reviewsModal.isOpen ? 'overflow-hidden' : ''}`}>
        {!reviewsModal.isOpen && <Menubar />}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<MallSearchPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatLandingPage/>
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={
          <ProtectedRoute>
            <MallCartPage />
          </ProtectedRoute>
          } />
        <Route path="/stores/:storeSlug/*" element={<StorePage />} />
        <Route path="/my-stores" element={
          <ProtectedRoute>
            <MyStores />
          </ProtectedRoute>
          } />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/my-stores" 
          element={
            <ComingSoon message="I have not deployed this page yet but it's where users can add stores and access them."/>
          } 
        /> */}
        
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute>
              <FavoriteStores />
            </ProtectedRoute>
            } 
          />
        
        <Route path="/scribbler/*" element={<Scribbler />} />
        <Route path="/layouts/:layoutId/*" element={<Layouts />} />
        <Route path="/capture" element={<CaptureHomePoster />} />
        {/* <Route 
          path="/dashboard/:storeId/*" 
          element={ 
          <ProtectedRoute>
            <StoreDashboard />
          </ProtectedRoute>
          } 
        /> */}
        <Route 
          path="/dashboard/:storeSlug/*" 
          element={ 
            <ProtectedRoute>
              <StoreDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/layouts/my-layouts" element={<MyLayouts />} />
        <Route path="/layouts/create" element={<LayoutCreator />} />
        <Route path="/creators-dashboard/*" element={<CreatorsDashboard />} />
        <Route path="/business-plan" element={<BusinessPlan />} />
        <Route path="/creators" element={<ForCreators />} />
        <Route
          path="/add-store"
          element={
          <ProtectedRoute>
            <AddStorePage />
          </ProtectedRoute>
          }
        />
        <Route
          path="/add-user-address"
          element={
          <ProtectedRoute>
            <AddUserAddressPage />
          </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route  
          path="/data-deletion"
          element={<DataDeletion />}
        />

        <Route
          path="/payment/*"
          element={<PayFastPage />}
        />
        

        {authRoutes}
      </Routes>

      {/* Reviews Modal */}
        <AllReviews
          isOpen={reviewsModal.isOpen}
          onClose={closeReviewsModal}
          postIdentifier={reviewsModal.postIdentifier}
          storeSlug={reviewsModal.storeSlug}
          isMall={reviewsModal.isMall}
        />
      </div>
    </ReviewsModalContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
