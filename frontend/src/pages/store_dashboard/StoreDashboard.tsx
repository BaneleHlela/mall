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
import { fetchStoreProducts } from "../../features/products/productsSlice";
import StoreLogoSettings from "./supporting_pages/settings/StoreLogoSettings";
import StoreBasicSettings from "./supporting_pages/settings/StoreBasicSettings";
import StoreTradeSettings from "./supporting_pages/settings/StoreTradeSettings";
import StoreBusinessHoursSettings from "./supporting_pages/settings/StoreBusinessHoursSettings";
import StoreLocationSettings from "./supporting_pages/settings/StoreLocationSettings";
import StoreSocialSettings from "./supporting_pages/settings/StoreSocialSettings";
import StoreAboutSettings from "./supporting_pages/settings/StoreAboutSettings";
import StoreDashboardPosters from "./supporting_pages/StoreDashboardPosters";


const StoreDashboard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { storeSlug } = useParams<{ storeSlug: string  }>();
    // const store = useAppSelector((state: RootState) =>
    //     storeSlug ? state.stores.myStoresById[storeSlug] : undefined
    // );
    const store = useAppSelector((state) => state.storeAdmin.store);
    const isLoading = useAppSelector((state) => state.storeAdmin.isLoading);
    
    useEffect(() => {
        if (!store && storeSlug) {
            dispatch(fetchStore(storeSlug));
        } else if (store) {
            dispatch(setStore(store));
        }
    }, [store, storeSlug, dispatch]);

    useEffect(() => {
        if (storeSlug) {
            dispatch(fetchStoreProducts({ storeSlug }));
        }
    }, [storeSlug, dispatch]);

    if (isLoading) {
        return <>loading...</>
    }
    
    if (!store) {
        return <p>Store not found or invalid store ID.</p>;
    }

    return (
        <div className="h-screen w-screen flex flex-row overflow-clip">
            <div className={`fixed h-screen w-screen ${isMobileMenuOpen && "z-19"} lg:hidden`} >
                <StoreDashBoardMenubar store={store} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
            </div>
            <div className="hidden lg:flex">
            <StoreDashBoardMenubar store={store} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
            </div>
            <div className="flex flex-col h-full w-full">
                <StoreDashboardTopbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                <Routes>
                    <Route path="/" element={<StoreOverview store={store} />} />
                    <Route path="/layouts" element={<StoreDashboardLayouts />} />
                    <Route path="/team" element={<StoreTeam />} />
                    <Route path="/products" element={<DashboardStoreProducts />} />
                    <Route path="/services" element={<StoreServices />} />
                    <Route path="/packages" element={<DashboardStorePackages />} />
                    <Route path="/orders" element={<StoreOrders />} />
                    <Route path="/bookings" element={<StoreBookings />} />
                    <Route path="/images" element={<StoreImages onImageSelect={() => {}}/>} /> 
                    <Route path="/posters/*" element={<StoreDashboardPosters />} />
                    <Route path="/settings" element={<StoreSettings />} />
                    <Route path="/settings/logo" element={<StoreLogoSettings />} />
                    <Route path="/settings/basic" element={<StoreBasicSettings />} />
                    <Route path="/settings/trade" element={<StoreTradeSettings />} />
                    <Route path="/settings/operating-hours" element={<StoreBusinessHoursSettings />} />
                    <Route path="/settings/location" element={<StoreLocationSettings />} />
                    <Route path="/settings/socials" element={<StoreSocialSettings />} />
                    <Route path="/settings/about" element={<StoreAboutSettings />} />
                </Routes>
            </div>
        </div>
    )
}

export default StoreDashboard;