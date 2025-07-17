import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import WebsiteBuilder from "./WebsiteBuilder";
import type { RootState } from "../../app/store.ts";
import WebsitePreview from "./WebsitePreview.tsx";
import { getLayout } from "../../features/layouts/layoutSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { setInitialLayout } from "../../features/layouts/layoutSettingsSlice";
import { setStore } from "../../features/store_admin/storeAdminSlice.ts";
import { fetchStoreById, setCurrentStore } from "../../features/stores/storeSlice.ts";
import { TbLoader3 } from "react-icons/tb";

const Layouts: React.FC = () => {
  const { layoutId } = useParams<{ layoutId: string }>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const settings = useAppSelector((state: RootState) => state.layoutSettings);
  const [storeId, setStoreId] = useState<string | null>(null);
  
  useEffect(() => {
    const loadLayout = async () => {
      if (!layoutId) return;
  
      try {
        console.log("fetching layout")
        const result = await dispatch(getLayout(layoutId)).unwrap();
        console.log(result)
        dispatch(setInitialLayout(result));
        console.log("✅ Layout fetched and set", result);
      } catch (error) {
        console.error("❌ Failed to fetch layout:", error);
      }
    };
  
    loadLayout();
  }, [layoutId, dispatch]);
  
  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ layoutSettings: settings }, "*");
    }
  }, [settings]);

  // Fetch layout and store
  useEffect(() => {
    const fetchLayoutAndStore = async () => {
      if (layoutId) {
        try {
          console.log("fetching layour and store")
          setLoading(true);
          const layoutResult = await dispatch(getLayout(layoutId)).unwrap();
          dispatch(setInitialLayout(layoutResult));
          console.log("�� Layout fetched and set", layoutResult);
          if (layoutResult.store) {
            setStoreId(layoutResult.store);
            const storeResult = await dispatch(fetchStoreById(layoutResult.store)).unwrap();
            console.log(storeResult);
            dispatch(setCurrentStore(storeResult));
            dispatch(setStore(storeResult));
          }
        } catch (error) {
          console.error("Failed to fetch layout or store:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLayoutAndStore();
  }, [dispatch, layoutId, storeId]);

  if (loading) {
    return <TbLoader3 size={45} className='animate-spin mx-auto'/>;
  }

  return (
    <Routes>
      <Route path="/" element={<WebsiteBuilder />} />
      <Route path="/preview/*" element={<WebsitePreview storeId={storeId}/>} />
    </Routes>
  );
};

export default Layouts;