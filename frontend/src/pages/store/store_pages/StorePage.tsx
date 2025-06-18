import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { fetchStoreById, setCurrentStore } from "../../../features/stores/storeSlice";
import { fetchStoreServices } from "../../../features/services/servicesSlice";
import type { Store } from "../../../types/storeTypes";
import { TbLoader3 } from "react-icons/tb";

const StorePage = () => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const { storeId } = useParams<{ storeId: string }>();
  const dispatch = useAppDispatch();
  const [store, setStore] = useState<Store | null>(null); // Local state for the store
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Load fonts dynamically
  useEffect(() => {
    if (settings.fonts) {
      const fontsToLoad = Object.values(settings.fonts).filter(Boolean); // Get all non-empty font values
      WebFont.load({
        google: {
          families: fontsToLoad, 
        },
      });
    }
  }, [settings.fonts]);

  // Fetch store by ID
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

  // Fetch store services if applicable
  useEffect(() => {
    if (store?.trades === 2 && storeId) {
      dispatch(fetchStoreServices(storeId)); // Fetch services if needed
    }
  }, [store, storeId, dispatch]);

  if (loading) {
    return <TbLoader3  size={45} className='animate-spin mx-auto'/>;
  }

  if (!store) {
    return <div className="p-6 text-red-500">Store not found.</div>;
  }

  return (
    <div 
      style={{
        backgroundColor: settings.backgroundColor,
        scrollbarWidth: "none", 
      }}
      className={`w-screen h-screen flex flex-row justify-center`}
    >
      I am here
    </div>
  );
};

export default StorePage;