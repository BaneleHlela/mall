import { Route, Routes, useParams } from "react-router-dom"
import StoreHome from "../../home/StoreHome"
import StoreAboutPage from "../../about/StoreAboutPage"
import StoreMenuPage from "../../menu/StoreMenuPage"
import StoreOrderOnlinePage from "../../order_online/StoreOrderOnlinePage"
import StoreContactPage from "../../contact/StoreContactPage"
import FirstStoreReviewsPage from "../../reviews/first/FirstStoreReviewsPage"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import type { Store } from "../../../../types/storeTypes";
import { useState, useEffect } from "react"
import { fetchStoreServices } from "../../../../features/services/servicesSlice"
import { fetchStoreById, setCurrentStore } from "../../../../features/stores/storeSlice"
import StoreMenubar from "../../../../components/store_layout/menubars/StoreMenubar"
import {noScrollbarsClassName} from "react-remove-scroll-bar";
import PopularStoreMenubar from "../../../../components/store_layout/menubars/popular/PopularStoreMenubar"

const SecondStorePage = () => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const { storeId } = useParams<{ storeId: string }>();
  const dispatch = useAppDispatch();
  const [store, setStore] = useState<Store | null>(null); // Local state for the store
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchStore = async () => {
      if (storeId) {
        try {
          setLoading(true);
          const result = await dispatch(fetchStoreById(storeId)).unwrap(); // Fetch store and unwrap the result
          setStore(result); // Set the fetched store in local state
          dispatch(setCurrentStore(result)); // Update the global store state
        } catch (error) {
          console.error("Failed to fetch store:", error);
          setStore(null); // Handle error by setting store to null
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchStore();
  }, [storeId, dispatch]);

  useEffect(() => {
    if (store?.trades === 2 && storeId) {
      dispatch(fetchStoreServices(storeId)); // Fetch services if needed
    }
  }, [store, storeId, dispatch]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading store...</div>;
  }

  if (!store) {
    return <div className="p-6 text-red-500">Store not found.</div>;
  }
  return (
    <div 
      style={{
        backgroundColor: settings.backgroundColor,
        scrollbarWidth: "none", // Hide scrollbar in Firefox
      }}
      className={` w-screen h-screen flex flex-row justify-center`}
    >
      <div className={`${noScrollbarsClassName} w-screen h-full p-4 overflow-y-scroll overflow-x-clip lg:w-[65vw] lg:p-0`}>
        {/* <StoreMenubar /> */}
        <PopularStoreMenubar />
        <Routes>
            <Route path="/" element={<StoreHome />} />
            <Route path="/about" element={<StoreAboutPage />} />
            <Route path="/menu" element={<StoreMenuPage />} />
            <Route path="/order-online" element={<StoreOrderOnlinePage />} />
            <Route path="/contact" element={<StoreContactPage />} />
            <Route path="/reviews" element={<FirstStoreReviewsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default SecondStorePage