import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import WebsiteBuilder from './WebsiteBuilder';
import type { RootState } from "../../app/store.ts";
import WebsitePreview from "./WebsitePreview.tsx";
import { useSelector } from "react-redux";

const Layouts: React.FC = () => {
  const settings = useSelector((state: RootState) => state.layoutSettings);


  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ layoutSettings: settings }, '*');
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
