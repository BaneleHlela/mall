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
import { getDynamicSizeMap, getZoomScaleClass } from '../../utils/helperFunctions.ts';
import { BreadcrumbProvider } from '../../contexts/BreadcrumbContext.tsx';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosSettings } from 'react-icons/io';
import { Type, Palette } from 'lucide-react';


const deviceStyles = {
  mobile: {
    borderTop: '10px solid #1a1a1a',
    borderLeft: '10px solid #1a1a1a',
    borderRight: '10px solid #1a1a1a',
    borderBottom: '40px solid #1a1a1a',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)',
    borderRadius: '25px',
    padding: '0px',
  },
  tablet: {
    borderTop: '15px solid #1a1a1a',
    borderLeft: '15px solid #1a1a1a',
    borderRight: '15px solid #1a1a1a',
    borderBottom: '60px solid #1a1a1a',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)',
    borderRadius: '30px',
    padding: '0px',
  },
  desktop: {
    borderTop: '18px solid #1a1a1a',
    borderLeft: '18px solid #1a1a1a',
    borderRight: '18px solid #1a1a1a',
    borderBottom: '60px solid #1a1a1a',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px 12px 6px 6px',
    padding: '0px',
  },
};

const WebsiteBuilderContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [sizeMap, setSizeMap] = useState(getDynamicSizeMap());
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [zoom, setZoom] = useState(sizeMap[device].scale);
  const [loading, setLoading] = useState<boolean>(true);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);
  const [quickAccessSection, setQuickAccessSection] = useState<'fonts' | 'colors' | null>(null);
  

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
            setStoreId(layoutResult.store._id);
            const storeResult = await dispatch(fetchStoreBySlug(layoutResult.store.slug)).unwrap();
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
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <TbLoader3 size={48} className="text-stone-600" />
        </motion.div>
      </div>
    );
  }
  
  if (!store) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <p className="text-red-500 text-lg font-medium">Store not found</p>
          <p className="text-stone-500 text-sm mt-2">Please check the URL and try again</p>
        </div>
      </div>
    );
  }

  console.log(zoom);
  // Main builder layout
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100 font-[Outfit]">
      <TopBar 
        setDevice={setDevice} 
        zoom={zoom} 
        setZoom={setZoom} 
        showDeviceSelector={!isSettingsOpen} 
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
      />

      <div className="w-full website-builder h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem)] flex flex-row relative">
        {/* Settings Panel */}
        <LayoutSettings 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          quickAccessSection={quickAccessSection}
          onQuickAccessHandled={() => setQuickAccessSection(null)}
        />
        
        {/* Preview Area */}
        <div className="flex-1 overflow-auto relative flex items-center justify-center p-4 lg:p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Device Preview Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`relative bg-gradient-to-b from-stone-900 to-black rounded-3xl ${getZoomScaleClass(zoom)}`}
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
                  transform: 'translateX(-50%)', width: '12px', height: '12px',
                  borderRadius: '50%', backgroundColor: '#333', zIndex: 10
                }} />
                <div style={{
                  position: 'absolute', top: '140px', right: '-16px',
                  transform: 'translateX(-50%)', width: '6px', height: '80px',
                  borderRadius: '4px', backgroundColor: '#333', zIndex: 10
                }} />
                <div style={{
                  position: 'absolute', top: '240px', right: '-16px',
                  transform: 'translateX(-50%)', width: '6px', height: '30px',
                  borderRadius: '4px', backgroundColor: '#333', zIndex: 10
                }} />
              </>
            )}

            {/* Tablet extras */}
            {device === 'tablet' && (
              <>
                <div style={{
                  position: 'absolute', bottom: '-48px', left: '50%',
                  transform: 'translateX(-50%)', width: '36px', height: '36px',
                  borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)', zIndex: 10
                }} />
              </>
            )}

            {/* Desktop extras */}
            {device === 'desktop' && (
              <>
                <div style={{
                  position: 'absolute', bottom: '-50px', right: '70px',
                  transform: 'translateX(-50%)', borderRadius: '4px',
                  backgroundColor: '#333', zIndex: 10, padding: '6px'
                }}>
                  <IoPower color="white" size={24} />
                </div>
              </>
            )}

            {layoutId && store && (
              <iframe
                ref={iframeRef}
                src={`/layouts/${layoutId}/preview`}
                title="Responsive Preview"
                style={{ width: '100%', height: '100%', border: 'none' }}
                onLoad={() => setLoading(false)}
              />
            )}
          </motion.div>
        </div>

        {/* Floating Quick Access Buttons - Hidden on mobile when settings are open */}
        <AnimatePresence>
          {(!isSettingsOpen || window.innerWidth > 876) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-6 right-6 flex flex-col space-y-3 z-30"
            >
              {/* Fonts Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsSettingsOpen(true);
                  setQuickAccessSection('fonts');
                }}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-xl flex items-center justify-center"
                title="Fonts"
              >
                <Type className="text-xl" />
              </motion.button>

              {/* Colors Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsSettingsOpen(true);
                  setQuickAccessSection('colors');
                }}
                className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full shadow-xl flex items-center justify-center"
                title="Colors"
              >
                <Palette className="text-xl" />
              </motion.button>

              {/* Settings Toggle Button (when settings closed) */}
              <AnimatePresence>
                {!isSettingsOpen && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSettingsOpen(true)}
                    className="w-12 h-12 bg-gradient-to-r from-stone-800 to-stone-700 text-white rounded-full shadow-2xl flex items-center justify-center"
                  >
                    <IoIosSettings className="text-2xl" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WebsiteBuilder: React.FC = () => (
  <BreadcrumbProvider>
    <WebsiteBuilderContent />
  </BreadcrumbProvider>
);

export default WebsiteBuilder;
