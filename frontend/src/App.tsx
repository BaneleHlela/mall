import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import Dashboard from "./pages/dashboard/Dashboard";
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
import ComingSoon from "./components/the_mall/ComingSoon";
import MallCartPage from "./pages/cart/MallCartPage";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.layoutSettings) {
        dispatch(setInitialLayout(event.data.layoutSettings));
        localStorage.setItem("layoutSettings", JSON.stringify(event.data.layoutSettings));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);


  return (
    <div className="relative font-[Outfit] text-[2vh] bg-stone-100 h-fit w-screen flex justify-center items-center overflow-x-clip overflow-y-scroll hide-scrollbar max-h-screen">  
      <Router>
        <Menubar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<MallSearchPage />} />
          <Route
            path="/chat"
            element={
              <ComingSoon 
                title="Chat Coming Soon"
                message="Soon you'll be able to chat directly with vendors and other users right here! We're building a seamless messaging experience to help you connect, ask questions, and get support."
                targetDate={new Date("2026-04-01")}
                icon={<HiOutlineChatAlt2 className="w-[3vh] h-[3vh] text-white" />}
              />
            }
          />
          <Route path="/cart" element={<MallCartPage />} />
          <Route path="/stores/:storeSlug/*" element={<StorePage />} />
          <Route path="/my-stores" element={<MyStores />} />
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
              <StoreDashboard />
            } 
          />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/layouts/my-layouts" element={<MyLayouts />} />
          <Route path="/layouts/create" element={<LayoutCreator />} />
          <Route path="/creators-dashboard/*" element={<Dashboard />} />
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
            path="/payment/*"
            element={<PayFastPage />}
          />
          
          {authRoutes}
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;
