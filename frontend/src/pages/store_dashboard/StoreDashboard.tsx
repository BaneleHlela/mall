import { Routes, Route, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import StoreDashBoardMenubar from "../../components/store_dashboard/menubar/StoreDashBoardMenubar";
import StoreDashboardLayouts from "./supporting_pages/layouts/StoreDashboardLayouts";
import StoreTeam from "./supporting_pages/StoreDashboardTeam";
import StoreServices from "./supporting_pages/DashboardStoreServices";
import StoreOrders from "./supporting_pages/StoreOrders";
import StoreBookings from "./supporting_pages/StoreBookings";
import StoreSettings from "./supporting_pages/StoreSettings";
import StoreImages from "./supporting_pages/StoreImages";
import { fetchStore, setStore } from "../../features/store_admin/storeAdminSlice";
import { useEffect, useState } from "react";
import StoreOverview from "./supporting_pages/StoreDashboardOverview";
import StoreDashboardTopbar from "../../components/store_dashboard/menubar/StoreDashboardTopbar";
import DashboardStoreProducts from "./supporting_pages/DashboardStoreProducts";
import DashboardStorePackages from "./supporting_pages/DashboardStorePackages";
import DashboardStoreRentals from "./supporting_pages/DashboardStoreRentals";
import { fetchStoreProducts } from "../../features/products/productsSlice";
import StoreLogoSettings from "./supporting_pages/settings/StoreLogoSettings";
import StoreBasicSettings from "./supporting_pages/settings/StoreBasicSettings";
import StoreTradeSettings from "./supporting_pages/settings/StoreTradeSettings";
import StoreBusinessHoursSettings from "./supporting_pages/settings/StoreBusinessHoursSettings";
import StoreLocationSettings from "./supporting_pages/settings/StoreLocationSettings";
import StoreSocialSettings from "./supporting_pages/settings/StoreSocialSettings";
import StoreAboutSettings from "./supporting_pages/settings/StoreAboutSettings";
import StoreDashboardPosters from "./supporting_pages/StoreDashboardPosters";
import StoreSubscriptions from "./supporting_pages/StoreSubscriptions";
import { fetchStoreServices } from "../../features/services/servicesSlice";
import { fetchStoreRentals } from "../../features/rentals/rentalSlice";
import { fetchStoreDonations } from "../../features/donations/donationsSlice";
import DashboardStoreDonations from "./supporting_pages/DashboardStoreDonations";
import { fetchStorePackages } from "../../features/packages/packagesSlice";
import ThumbnailsControl from "../../components/layout_settings/thumbnails/ThumbnailsControl";


const StoreDashboard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { storeSlug } = useParams<{ storeSlug: string  }>();
    const store = useAppSelector((state) => state.storeAdmin.store);
    const isLoading = useAppSelector((state) => state.storeAdmin.isLoading);
    
    useEffect(() => {
        if (!store && storeSlug) {
            dispatch(fetchStore(storeSlug));
        } else if (store) {
            dispatch(setStore(store));
        }
    }, [store, storeSlug, dispatch]);
    
    // Fetch store products
    useEffect(() => {
        if (storeSlug) {
            dispatch(fetchStoreProducts({ storeSlug }));
        }
    }, [storeSlug, dispatch]);

    // Fetch Store Services
    useEffect(() => {
        if (storeSlug) {
            dispatch(fetchStoreServices({ storeSlug }));
        }
    }, [storeSlug, dispatch]);

    // Fetch Store Rentals
    useEffect(() => {
        if (storeSlug) {
            dispatch(fetchStoreRentals({ storeSlug: storeSlug }));
        }
    }, [storeSlug, dispatch]);

    // Fetch Store Donations
    useEffect(() => {
        if (storeSlug) {
            dispatch(fetchStoreDonations({ storeSlug: storeSlug }));
        }
    }, [storeSlug, dispatch]);

    // Fetch Store Packages
    useEffect(() => {
        if (storeSlug) {
            dispatch(fetchStorePackages({ storeSlug: storeSlug }));
        }
    }, [storeSlug, dispatch]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [storeSlug]);

    if (isLoading && !store) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }
    
    if (!store) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">Store not found</h2>
                    <p className="text-slate-500">Invalid store slug or store doesn't exist.</p>
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
                <StoreDashBoardMenubar 
                    store={store} 
                    isMobileMenuOpen={isMobileMenuOpen} 
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
            </div>
            
            {/* Main Content */}
            <div className="flex flex-col h-screen w-full overflow-hidden">
                <StoreDashboardTopbar 
                    isMobileMenuOpen={isMobileMenuOpen} 
                    setIsMobileMenuOpen={setIsMobileMenuOpen} 
                />
                
                {/* Page Content */}
                <main className="flex items-center justify-center h-full w-full overflow-y-auto overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<StoreOverview store={store} />} />
                        <Route path="/layouts" element={<StoreDashboardLayouts />} />
                        <Route path="/team" element={<StoreTeam />} />
                        <Route path="/products" element={<DashboardStoreProducts />} />
                        <Route path="/services" element={<StoreServices />} />
                        <Route path="/packages" element={<DashboardStorePackages />} />
                        <Route path="/rentals" element={<DashboardStoreRentals />} />
                        <Route path="/donations" element={<DashboardStoreDonations />} />
                        <Route path="/orders" element={<StoreOrders />} />
                        <Route path="/bookings" element={<StoreBookings />} />
                        <Route path="/subscriptions" element={<StoreSubscriptions />} />
                        <Route path="/images" element={<StoreImages onImageSelect={() => {}}/>} /> 
                        <Route path="/posters/*" element={<StoreDashboardPosters />} />
                        <Route path="/settings" element={<StoreSettings />} />
                        <Route path="/settings/logo" element={<StoreLogoSettings />} />
                        <Route path="/settings/thumbnails" element={<ThumbnailsControl />} />
                        <Route path="/settings/basic" element={<StoreBasicSettings />} />
                        <Route path="/settings/trade" element={<StoreTradeSettings />} />
                        <Route path="/settings/operating-hours" element={<StoreBusinessHoursSettings />} />
                        <Route path="/settings/location" element={<StoreLocationSettings />} />
                        <Route path="/settings/socials" element={<StoreSocialSettings />} />
                        <Route path="/settings/about" element={<StoreAboutSettings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default StoreDashboard;