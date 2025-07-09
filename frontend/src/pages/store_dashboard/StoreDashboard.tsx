import { Routes, Route, useParams } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import StoreDashBoardMenubar from "../../components/store_dashboard/menubar/StoreDashBoardMenubar";
import StoreLayouts from "./supporting_pages/StoreLayouts";
import StoreTeam from "./supporting_pages/StoreTeam";
import StoreServices from "./supporting_pages/DashboardStoreServices";
import StoreOrders from "./supporting_pages/StoreOrders";
import StoreBookings from "./supporting_pages/StoreBookings";
import StoreSettings from "./supporting_pages/StoreSettings";
import StoreImages from "./supporting_pages/StoreImages";
import { setStore } from "../../features/store_admin/storeAdminSlice";
import { useEffect } from "react";
import StoreOverview from "./supporting_pages/StoreOverview";
import StoreDashboardTopbar from "../../components/store_dashboard/menubar/StoreDashboardTopbar";
import DashboardStoreProducts from "./supporting_pages/DashboardStoreProducts";
import DashboardStorePackages from "./supporting_pages/DashboardStorePackages";
import { fetchStoreProducts } from "../../features/products/productsSlice";

const StoreDashboard = () => {
    const dispatch = useAppDispatch();
    const { storeId } = useParams<{ storeId: string  }>();
    const store = useAppSelector((state: RootState) => 
        storeId ? state.stores.myStoresById[storeId] : undefined
    );
    
    useEffect(() => {
        if (store) {
          dispatch(setStore(store));
        }
    }, [store, dispatch]);

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
                    <Route path="/images" element={<StoreImages />} /> 
                    <Route path="/settings" element={<StoreSettings />} />
                </Routes>
            </div>
        </div>
    )
}

export default StoreDashboard;