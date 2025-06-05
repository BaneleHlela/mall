import React, { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import WebsiteBuilder from "./WebsiteBuilder";
import type { RootState } from "../../app/store.ts";
import WebsitePreview from "./WebsitePreview.tsx";
import { getLayout } from "../../features/layouts/layoutSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { setInitialLayout } from "../../features/layouts/layoutSettingsSlice";

const Layouts: React.FC = () => {
  const { layoutId } = useParams<{ layoutId: string }>();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.layoutSettings);

  useEffect(() => {
    const loadLayout = async () => {
      if (!layoutId) return;
  
      try {
        console.log("fetching layour")
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

  return (
    <Routes>
      <Route path="/build/:layoutId" element={<WebsiteBuilder />} />
      <Route path="/preview/*" element={<WebsitePreview />} />
    </Routes>
  );
};

export default Layouts;