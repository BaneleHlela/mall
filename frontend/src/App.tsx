import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import authRoutes from "./routes/authRoutes";
import Scribbler from "./components/Scibbler";
import Layouts from "./pages/layout_editor/Layouts";
import StorePage from "./pages/store/StorePage";
import Menubar from "./components/the_mall/menubar/Menubar";
import MyStores from "./pages/my_stores/MyStores";
import Search from "./pages/my_stores/Search";
import Profile from "./pages/profile/Profile";
import StoreDashboard from "./pages/store_dashboard/StoreDashboard";
import MyLayouts from "./pages/store_dashboard/supporting_pages/StoreLayouts";
import { useDispatch } from "react-redux";
import { setInitialLayout } from "./features/layouts/layoutSettingsSlice";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/the_mall/authorization/ProtectedRoute";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.layoutSettings) {
        dispatch(setInitialLayout(event.data.layoutSettings));
        localStorage.setItem("layoutSettings", JSON.stringify(event.data.layoutSettings));
        //console.log("📩 Received layoutSettings via postMessage");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  return (
    <div className="relative font-[Outfit] text-[2vh] bg-stone-50 h-screen w-screen flex justify-center items-center overflow-x-clip">  
      <Router>
        <Menubar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores/:storeId/*" element={<StorePage />} />
          <Route path="/my-stores" element={<MyStores />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scribbler/*" element={<Scribbler />} />
          <Route path="/layouts/:layoutId/*" element={<Layouts />} />
          {/* <Route 
            path="/dashboard/:storeId/*" 
            element={ 
            <ProtectedRoute>
              <StoreDashboard />
            </ProtectedRoute>
            } 
          /> */}
          <Route 
            path="/dashboard/:storeId/*" 
            element={ 
              <StoreDashboard />
            } 
          />
          <Route path="/layouts/my-layouts" element={<MyLayouts />} />
          <Route path="/creators-dashboard/*" element={<Dashboard />} />
          {authRoutes}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
