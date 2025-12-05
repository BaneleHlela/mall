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
    <div className="relative font-[Outfit] text-[2vh] bg-stone-100 h-screen w-screen flex justify-center items-center overflow-x-clip overflow-y-scroll hide-scrollbar">  
      <Router>
        <Menubar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores/:storeSlug/*" element={<StorePage />} />
          <Route path="/my-stores" element={<MyStores />} />
          {/* <Route path="/my-stores" 
            element={
              <ComingSoon message="I have not deployed this page yet but it's where users can add stores and access them."/>
            } 
          /> */}
          <Route path="/search" element={<MallSearchPage />} />
          <Route path="/favorites" element={<FavoriteStores />} />
          <Route path="/account" element={<Account />} />
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
          {authRoutes}
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;
