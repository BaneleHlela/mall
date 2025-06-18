import { setCurrentStore } from '../../../../features/stores/storeSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchStoreServices } from '../../../../features/services/servicesSlice';
import { fetchStoreById } from '../../../../features/stores/storeSlice'; // Import the fetchStoreById action
import type { RootState } from '../../../../app/store';
import { useEffect, useState } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import Menubar from '../../../../components/store_layout/menubars/StoreMenubar';
import StoreHome from '../../home/StoreHomePage';
import StorePackagesPage from '../../supporting/packages/StorePackagesPage';
import StoreServices from '../../services/StoreServicesPage';
import type { Store } from '../../../../types/storeTypes'; 

const FirstStorePage = () => {
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
          setCurrentStore(result); // Update the global store state
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
    <div className="h-screen w-screen bg-stone-200">
      <Menubar />
      <Routes>
        <Route path="/" element={<StoreHome />} />
        <Route path="/services" element={<StoreServices />} />
        <Route path="/packages" element={<StorePackagesPage />} />
        {/* <Route path="/" element={<StoreOverview store={store} />} /> */}
        {/* <Route path="/products" element={<ProductsList storeId={store._id} />} /> */}
        {/* <Route path="/orders" element={<OrdersList storeId={store._id} />} /> */}
        {/* <Route path="/customers" element={<CustomersList storeId={store._id} />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default FirstStorePage;