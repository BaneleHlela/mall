import { Routes, Route, useParams } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import StoreDashBoardMenubar from "../../components/store_dashboard/menubar/StoreDashBoardMenubar";
import StoreLayouts from "./supporting_pages/StoreLayouts";
import StoreProducts from "./supporting_pages/StoreProducts";
import StoreTeam from "./supporting_pages/StoreTeam";
import StoreServices from "./supporting_pages/StoreServices";
import StoreOrders from "./supporting_pages/StoreOrders";
import StoreBookings from "./supporting_pages/StoreBookings";
import StoreSettings from "./supporting_pages/StoreSettings";
import StoreImages from "./supporting_pages/StoreImages";
import { setStore } from "../../features/store_admin/storeAdminSlice";
import { useEffect } from "react";

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

    if (!store) {
        return <p>Store not found or invalid store ID.</p>;
    }

    return (
        <div className="h-screen w-screen flex flex-row">
            <StoreDashBoardMenubar storeId={store._id}/>
            <Routes>
                <Route path="/" element={<p>Store {store._id} Dashboard</p>} />
                <Route path="/layouts" element={<StoreLayouts />} />
                <Route path="/team" element={<StoreTeam />} />
                <Route path="/products" element={<StoreProducts />} />
                <Route path="/services" element={<StoreServices />} />
                <Route path="/orders" element={<StoreOrders />} />
                <Route path="/bookings" element={<StoreBookings />} />
                <Route path="/images" element={<StoreImages />} /> 
                <Route path="/settings" element={<StoreSettings />} />
            </Routes>
            
        </div>
    )
}

export default StoreDashboard;