import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import WebsiteBuilder from "./WebsiteBuilder";
import type { RootState } from "../../app/store.ts";
import WebsitePreview from "./WebsitePreview.tsx";
import { getLayout, captureLayoutScreenshot } from "../../features/layouts/layoutSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { setInitialLayout } from "../../features/layouts/layoutSettingsSlice";
import { setStore } from "../../features/store_admin/storeAdminSlice.ts";
import { fetchStoreBySlug, setCurrentStore } from "../../features/stores/storeSlice.ts";
import { TbLoader3 } from "react-icons/tb";
import CaptureLayout from "./CaptureLayout.tsx";

const Layouts: React.FC = () => {
  const { layoutId } = useParams<{ layoutId: string }>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const settings = useAppSelector((state: RootState) => state.layoutSettings);
  const [storeSlug, setStoreSlug] = useState<string | null>(null);
  
  useEffect(() => {
    const loadLayout = async () => {
      if (!layoutId) return;
        <p className="">No layout Id</p>
      try {
        const result = await dispatch(getLayout(layoutId)).unwrap();
        dispatch(setInitialLayout(result));
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
          // 1️⃣ Fetch layout
          setLoading(true);
          const layoutResult = await dispatch(getLayout(layoutId)).unwrap();
          dispatch(setInitialLayout(layoutResult));
          
          // 2️⃣ Fetch store if layout has a store
          if (layoutResult.store) {
            setStoreSlug(layoutResult.store._id);
            const storeResult = await dispatch(fetchStoreBySlug(layoutResult.store.slug)).unwrap();
            dispatch(setCurrentStore(storeResult));
            dispatch(setStore(storeResult));
          }

          // 3️⃣ Capture screenshot if not present
          if (!layoutResult.screenshot) {
            console.log("⚡ No screenshot found, capturing...");
            const updatedLayout = await dispatch(captureLayoutScreenshot(layoutId)).unwrap();
            dispatch(setInitialLayout(updatedLayout));
            console.log("✅ Screenshot captured and layout updated", updatedLayout);
          }
        } catch (error) {
          console.error("Failed to fetch layout or store:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLayoutAndStore();
  }, [dispatch, layoutId, storeSlug]);
  

  if (loading) {
    return <TbLoader3 size={45} className='animate-spin mx-auto'/>;
  }

  return (
    <Routes>
      <Route path="/" element={<WebsiteBuilder />} />
      <Route path="/preview/*" element={<WebsitePreview storeSlug={storeSlug || ''} />} />
      <Route path="/capture/" element={<CaptureLayout />} />
    </Routes>
  );
};

export default Layouts;