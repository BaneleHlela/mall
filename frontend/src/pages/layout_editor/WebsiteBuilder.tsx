import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoPower } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../app/hooks.ts';
import LayoutSettings from '../../components/layout_settings/LayoutSettings.tsx';
import TopBar from '../../components/layout_settings/topbar/TopBar.tsx';
import { fetchStoreBySlug, setCurrentStore } from '../../features/stores/storeSlice';
import { TbLoader3 } from "react-icons/tb";
import { setStore } from '../../features/store_admin/storeAdminSlice.ts';
import { editLayout, getLayout } from '../../features/layouts/layoutSlice.ts';
import { setInitialLayout } from '../../features/layouts/layoutSettingsSlice.ts';

const sizeMap = {
  mobile: { width: 412, height: 840, scale: 0.75 },
  tablet: { width: 775, height: 1024, scale: 0.62 },
  desktop: { width: 1920, height: 950, scale: 0.55 },
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
  const [storeId, setStoreId] = useState<string | null>(null);

  const store = useAppSelector((state) => state.stores.currentStore);
  const fonts = useAppSelector((state) => state.layoutSettings.fonts);
  const settings = useAppSelector((state) => state.layoutSettings);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { layoutId } = useParams<{ layoutId: string }>();
  const { width, height, scale } = sizeMap[device];

  useEffect(() => {
    setZoom(scale);
  }, [device]);

  useEffect(() => {
    if (settings) {
      const saveLayout = async () => {
        try {
          await dispatch(
            editLayout({
              // @ts-ignore
              layoutId: settings._id,
              layoutConfig: settings,
            })
          );
        } catch (error) {
          console.error('Failed to save layout:', error);
        }
      };

      saveLayout();
      const timeoutId = setTimeout(saveLayout, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [settings, dispatch]);

  useEffect(() => {
    const fetchLayoutAndStore = async () => {
      if (layoutId) {
        try {
          setLoading(true);
          const layoutResult = await dispatch(getLayout(layoutId)).unwrap();
          dispatch(setInitialLayout(layoutResult));

          if (layoutResult.store) {
            setStoreId(layoutResult.store);
            const storeResult = await dispatch(fetchStoreBySlug(layoutResult.store)).unwrap();
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
  }, [dispatch, layoutId]);

  // Handle loading and missing store
  if (loading) return <TbLoader3 size={45} className='animate-spin mx-auto' />;
  if (!store) return <div className="p-6 text-red-500">Store not found.</div>;

  // Handle small window (mobile builder mode)
  if (typeof window !== "undefined" && window.innerWidth < 720) {
    return <div className="p-6 text-center">Mobile Website Builder</div>;
  }

  // Main builder layout
  return (
    <div className="h-screen w-screen overflow-hidden bg-stone-100 font-[Outfit]">
      <TopBar setDevice={setDevice} zoom={zoom} setZoom={setZoom} />

      <div className="website-builder h-[93vh] flex flex-row">
        <LayoutSettings />
        <div className="overflow-auto relative w-full max-h-full flex flex-row items-center justify-center">
          <div
            className="relative bg-black"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              width,
              height,
              aspectRatio: `${width}/${height}`,
              ...deviceStyles[device],
            }}
          >
            {/* Mobile extras */}
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

            {/* Tablet extras */}
            {device === 'tablet' && (
              <>
                <div style={{
                  position: 'absolute', bottom: '-48px', left: '50%',
                  transform: 'translateX(-50%)', width: '40px', height: '40px',
                  borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)', zIndex: 10
                }} />
              </>
            )}

            {/* Desktop extras */}
            {device === 'desktop' && (
              <>
                <div style={{
                  position: 'absolute', bottom: '-50px', right: '75px',
                  transform: 'translateX(-50%)', borderRadius: '3px',
                  backgroundColor: '#000', zIndex: 10
                }}>
                  <IoPower color="white" size={32} />
                </div>
              </>
            )}

            <iframe
              key={JSON.stringify(fonts)}
              ref={iframeRef}
              src={`/layouts/${layoutId}/preview/*`}
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
