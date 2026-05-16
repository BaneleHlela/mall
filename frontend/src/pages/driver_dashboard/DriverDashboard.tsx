import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { fetchDriverProfile } from "../../features/driver/driverSlice";
import DriverDashboardMenubar from "../../components/driver_dashboard/menubar/DriverDashboardMenubar";
import DriverDashboardTopbar from "../../components/driver_dashboard/menubar/DriverDashboardTopbar";
import DriverOverview from "./supporting_pages/DriverDashboardOverview";
import DriverJobs from "./supporting_pages/DriverJobs";
import DriverEarnings from "./supporting_pages/DriverEarnings";
import DriverZones from "./supporting_pages/DriverZones";
import DriverProfile from "./supporting_pages/DriverProfile";
import DriverSettings from "./supporting_pages/DriverSettings";

const DriverDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const driver = useAppSelector((state) => state.driver.driver);
  const isLoading = useAppSelector((state) => state.driver.isLoading);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!driver) {
      dispatch(fetchDriverProfile());
    }
  }, [driver, dispatch]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  if (isLoading && !driver) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading driver dashboard...</p>
        </div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Driver profile not found</h2>
          <p className="text-slate-500 mb-4">Please complete driver signup first.</p>
          <button
            onClick={() => navigate('/driver-signup')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sign up as Driver
          </button>
        </div>
      </div>
    );
  }

  // Check if driver account is active
  if (driver.accountStatus !== 'active') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Account Pending Approval</h2>
          <p className="text-slate-500">Your driver account is under review. Please wait for admin approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex flex-row bg-slate-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed h-screen z-50 lg:relative lg:z-auto transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <DriverDashboardMenubar 
          driver={driver} 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <DriverDashboardTopbar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
        
        {/* Page Content */}
        <main className="flex items-center justify-center h-full w-full overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<DriverOverview driver={driver} />} />
            <Route path="/jobs" element={<DriverJobs />} />
            <Route path="/earnings" element={<DriverEarnings />} />
            <Route path="/zones" element={<DriverZones />} />
            <Route path="/profile" element={<DriverProfile />} />
            <Route path="/settings" element={<DriverSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;
