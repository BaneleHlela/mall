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
import bookingReducer from "../features/bookings/bookingsSlice.ts";
import categoryReducer from "../features/categories/categorySlice.ts";
import cartReducer from "../features/cart/cartSlice.ts";
import reviewReducer from "../features/reviews/reviewSlice.ts";
import emailReducer from "../features/emails/emailSlice.ts";
import sectionReducer from "../features/sections/sectionSlice.ts";
import posterReducer from "../features/posters/posterSlice.ts";
import rentalReducer from "../features/rentals/rentalSlice.ts";
import donationReducer from "../features/donations/donationsSlice.ts";
import rangeReducer from "../features/rangeSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        layout: layoutReducer,
        layoutSettings: layoutSettingsReducer,
        stores: storeReducer,
        storeAdmin: storeAdminReducer,
        booking: bookingReducer,
        services: serviceReducer,
        products: productReducer,
        packages: packageReducer,
        categories: categoryReducer,
        cart: cartReducer,
        reviews: reviewReducer,
        email: emailReducer,
        sections: sectionReducer,
        posters: posterReducer,
        rentals: rentalReducer,
        donations: donationReducer,
        range: rangeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
