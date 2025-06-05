import React, { useEffect, useRef, useState } from 'react';
import LayoutSettings from '../../components/layout_settings/LayoutSettings.tsx';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store.ts';
import TopBar from '../../components/layout_settings/topbar/TopBar.tsx';
import { useParams } from 'react-router-dom';


const WebsiteBuilderContent: React.FC = () => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const layoutId = useParams<{layoutId: string}>()

  const sizeMap = {
    mobile: { width: 412, height: 840, scale: 0.8 },
    tablet: { width: 775, height: 1024, scale: 0.8 },
    desktop: { width: 1920, height: 1080, scale: 1 },
  };

  const { width, height, scale } = sizeMap[device];
  const [zoom, setZoom] = useState(scale); // start with device scale

  useEffect(() => {
    setZoom(sizeMap[device].scale);
  }, [device]
  );

  
  const settings = useSelector((state: RootState) => state.layoutSettings);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { layoutSettings: settings },
          '*'
        );
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [settings]);





  return (
    <div className="h-screen w-screen max-h-screen">
      {/* Topbar */}
      <TopBar setDevice={setDevice}  zoom={zoom} setZoom={setZoom} />

      <div className="website-builder h-[93vh] flex flex-row">
        {/* Settings section */}
        <LayoutSettings />
        {/* Store page */}
        <div className="overflow-auto relative w-full max-h-full flex flex-row items-center justify-center p-0">
          <iframe
            // key={JSON.stringify(settings)}
            ref={iframeRef}
            src={`/layouts/preview/${layoutId}`}
            title="Responsive Preview"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              width,
              height,
              border: '1px solid gray',
              backgroundColor: '#d0e6ff',
              aspectRatio: `${width}/${height}`,
              overflow: 'hidden'
            }}
          />
        </div>
      </div>
    </div>
  );
};

const WebsiteBuilder: React.FC = () => <WebsiteBuilderContent />;

export default WebsiteBuilder;
