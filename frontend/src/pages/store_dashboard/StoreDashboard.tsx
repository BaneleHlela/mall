import { Routes, Route, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import StoreDashBoardMenubar from "../../components/store_dashboard/menubar/StoreDashBoardMenubar";
import StoreLayouts from "./supporting_pages/layouts/StoreLayouts";
import StoreTeam from "./supporting_pages/StoreDashboardTeam";
import StoreServices from "./supporting_pages/DashboardStoreServices";
import StoreOrders from "./supporting_pages/StoreOrders";
import StoreBookings from "./supporting_pages/StoreBookings";
import StoreSettings from "./supporting_pages/StoreSettings";
import StoreImages from "./supporting_pages/StoreImages";
import { fetchStore, setStore } from "../../features/store_admin/storeAdminSlice";
import { useEffect } from "react";
import StoreOverview from "./supporting_pages/StoreOverview";
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
    const dispatch = useAppDispatch();
    const { storeId } = useParams<{ storeId: string  }>();
    // const store = useAppSelector((state: RootState) => 
    //     storeId ? state.stores.myStoresById[storeId] : undefined
    // );
    const store = useAppSelector((state) => state.storeAdmin.store);
    
    useEffect(() => {
        if (!store && storeId) {
            dispatch(fetchStore(storeId));
        } else if (store) {
            dispatch(setStore(store));
        }
    }, [store, storeId, dispatch]);

    useEffect(() => {
        if (storeId) {
            dispatch(fetchStoreProducts({ storeId }));
        }
    }, [storeId, dispatch]);
    
    if (!store) {
        return <p>Store not found or invalid store ID.</p>;
    }

    return (
        <div className="h-screen w-screen flex flex-row overflow-clip">
            <StoreDashBoardMenubar store={store}/>
            <div className="flex flex-col h-full w-full">
                <StoreDashboardTopbar />
                <Routes>
                    <Route path="/" element={<StoreOverview store={store} />} />
                    <Route path="/layouts" element={<StoreLayouts />} />
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