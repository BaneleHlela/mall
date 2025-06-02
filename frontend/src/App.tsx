import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import authRoutes from "./routes/authRoutes";
import Scribbler from "./components/Scibbler";
import Layouts from "./pages/layout_editor/Layouts";
import StorePage from "./pages/StorePage";
import Menubar from "./components/the_mall/menubar/Menubar";
import MyStores from "./pages/my_stores/MyStores";
import Search from "./pages/my_stores/Search";
import Profile from "./pages/profile/Profile";
import StoreDashboard from "./pages/store_dashboard/StoreDashboard";
import MyLayouts from "./pages/store_dashboard/supporting_pages/StoreLayouts";

const App: React.FC = () => {
  
  return (
    <div className="bg-stone-50 min-h-screen flex justify-center items-center">
      
      <Router>
        {/* <Menubar />  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores/:storeId" element={<StorePage />} />
          <Route path="/my-stores" element={<MyStores />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scribbler" element={<Scribbler />} />
          <Route path="/layouts/*" element={<Layouts />} />
          <Route path="/dashboard/:storeId/*" element={<StoreDashboard />} />
          <Route path="/layouts/my-layouts" element={<MyLayouts />} />
          {authRoutes}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
