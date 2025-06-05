import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.ts";
import adminReducer from "../features/admin/adminSlice.ts";
import layoutSettingsReducer from "../features/layouts/layoutSettingsSlice.ts";
import layoutReducer from "../features/layouts/layoutSlice";
import storeReducer from "../features/stores/storeSlice";
import storeAdminReducer from "../features/store_admin/storeAdminSlice";
import serviceReducer from "../features/services/servicesSlice.ts";
import productReducer from "../features/products/productsSlice.ts";
import packageReducer from "../features/packages/packagesSlice.ts";


export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        layout: layoutReducer,
        layoutSettings: layoutSettingsReducer,
        stores: storeReducer,
        storeAdmin: storeAdminReducer,
        services: serviceReducer,
        products: productReducer,
        packages: packageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
