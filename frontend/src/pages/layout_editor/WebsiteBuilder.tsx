import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoPower } from 'react-icons/io5';
import { useAppSelector } from '../../app/hooks.ts';
import LayoutSettings from '../../components/layout_settings/LayoutSettings.tsx';
import TopBar from '../../components/layout_settings/topbar/TopBar.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchStoreById, setCurrentStore } from '../../features/stores/storeSlice';
import { TbLoader3 } from "react-icons/tb";

const sizeMap = {
  mobile: { width: 412, height: 840, scale: 0.75 },
  tablet: { width: 775, height: 1024, scale: 0.62 },
  desktop: { width: 1920, height: 1080, scale: 0.55 },
};

const deviceStyles = {
  mobile: {
    borderTop: '10px solid #171616',
    borderLeft: '10px solid #171616',
    borderRight: '10px solid #171616',
    borderBottom: '40px solid #171616',
    boxShadow: '5px 5px 25px 25px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    padding: '0px',
  },
  tablet: {
    borderTop: '15px solid #171616',
    borderLeft: '15px solid #171616',
    borderRight: '15px solid #171616',
    borderBottom: '60px solid #171616',
    boxShadow: '20px 20px 100px rgba(0, 0, 0, 0.21)',
    borderRadius: '30px',
    padding: '0px',
  },
  desktop: {
    borderTop: '18px solid #171616',
    borderLeft: '18px solid #171616',
    borderRight: '18px solid #171616',
    borderBottom: '60px solid #171616',
    boxShadow: '20px 20px 100px rgba(0, 0, 0, 0.21)',
    borderRadius: '10px 10px 5px 5px',
    padding: '0px',
  },
};

const WebsiteBuilderContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [zoom, setZoom] = useState(sizeMap[device].scale);
  const [loading, setLoading] = useState<boolean>(true);
  const store = useAppSelector((state) => state.stores.currentStore);

  const fonts = useAppSelector((state) => state.layoutSettings.fonts);
  const storeId = "684c15bca0f98a1d13a7ff00"; // Hardcoded store ID


  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const layoutId = useParams<{ layoutId: string }>().layoutId;

  const settings = useAppSelector((state) => state.layoutSettings);
  const { width, height, scale } = sizeMap[device];

  useEffect(() => {
    setZoom(scale);
  }, [device]);

  useEffect(() => {
    const fetchStore = async () => {
      if (storeId) {
        try {
          setLoading(true);
          const result = await dispatch(fetchStoreById(storeId)).unwrap();
          dispatch(setCurrentStore(result));
        } catch (error) {
          console.error("Failed to fetch store:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchStore();
  }, [dispatch, storeId]);
  
  // iframe.contentWindow.postMessage({ layoutSettings: settings, store }, '*');
  useEffect(() => {
    const iframe = iframeRef.current;
  
    const sendSettings = () => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ layoutSettings: settings }, '*');
      }
    };
  
    iframe?.addEventListener('load', sendSettings); // resend after navigation
  
    return () => {
      iframe?.removeEventListener('load', sendSettings);
    };
  }, [settings]);

  if (loading) {
    return <TbLoader3 size={45} className='animate-spin mx-auto'/>;
  }
  
  if (!store) {
    return <div className="p-6 text-red-500">Store not found.</div>;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-stone-100 font-[Outfit]">
      <TopBar setDevice={setDevice} zoom={zoom} setZoom={setZoom} />

      <div className="website-builder h-[93vh] flex flex-row">
        <LayoutSettings />
        <div className="overflow-auto relative w-full max-h-full flex flex-row items-center justify-center">
          <div
            className="relative"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              width,
              height,
              aspectRatio: `${width}/${height}`,
              ...deviceStyles[device],
            }}
          >
            {/* Mobile Extras */}
            {device === 'mobile' && (
              <>
                <div style={{
                  position: 'absolute', top: '10px', left: '50%',
                  transform: 'translateX(-50%)', width: '15px', height: '15px',
                  borderRadius: '50%', backgroundColor: '#000', zIndex: 10
                }} />
                <div style={{
                  position: 'absolute', top: '140px', right: '-18px',
                  transform: 'translateX(-50%)', width: '8px', height: '95px',
                  borderRadius: '5px', backgroundColor: '#000', zIndex: 10
                }} />
                <div style={{
                  position: 'absolute', top: '250px', right: '-18px',
                  transform: 'translateX(-50%)', width: '8px', height: '35px',
                  borderRadius: '5px', backgroundColor: '#000', zIndex: 10
                }} />
              </>
            )}

            {/* Tablet Extras */}
            {device === 'tablet' && (
              <>
                <div style={{
                  position: 'absolute', bottom: '-48px', left: '50%',
                  transform: 'translateX(-50%)', width: '40px', height: '40px',
                  borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)', zIndex: 10
                }} />
                <div style={{
                  position: 'absolute', top: '140px', right: '-22px',
                  transform: 'translateX(-50%)', width: '10px', height: '95px',
                  borderRadius: '5px', backgroundColor: '#000', zIndex: 10
                }} />
                <div style={{
                  position: 'absolute', top: '250px', left: '-14px',
                  transform: 'translateX(-50%)', width: '8px', height: '55px',
                  borderRadius: '5px', backgroundColor: '#000', zIndex: 10
                }} />
              </>
            )}

            {/* Desktop Extras */}
            {device === 'desktop' && (
              <>
                <div style={{
                  position: 'absolute', bottom: '-50px', right: '75px',
                  transform: 'translateX(-50%)', borderRadius: '3px',
                  backgroundColor: '#000', zIndex: 10
                }}>
                  <IoPower color="white" size={32} />
                </div>
                <div style={{
                  position: 'absolute', bottom: '-58px', right: '-25px',
                  transform: 'translateX(-50%)', width: '8px', height: '60px',
                  borderRadius: '3px', backgroundColor: '#000', zIndex: 10
                }} />
                <div style={{
                  position: 'absolute', bottom: '-58px', left: '-18px',
                  transform: 'translateX(-50%)', width: '8px', height: '60px',
                  borderRadius: '3px', backgroundColor: '#000', zIndex: 10
                }} />
              </>
            )}

            <iframe
              key={JSON.stringify(fonts)}
              ref={iframeRef}
              src={`/layouts/preview/${layoutId}/*`}
              title="Responsive Preview"
              className="relative"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#d0e6ff',
                overflow: 'hidden',
                border: 'none',
                borderRadius: '8px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WebsiteBuilder: React.FC = () => <WebsiteBuilderContent />;

export default WebsiteBuilder;
