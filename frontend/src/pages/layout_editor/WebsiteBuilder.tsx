import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { IoPower, IoClose } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../app/hooks.ts';
import LayoutSettings from '../../components/layout_settings/LayoutSettings.tsx';
import TopBar from '../../components/layout_settings/topbar/TopBar.tsx';
import { fetchStoreBySlug, setCurrentStore } from '../../features/stores/storeSlice';
import { editStore } from '../../features/store_admin/storeAdminSlice.ts';
import { TbLoader3 } from "react-icons/tb";
import { setStore } from '../../features/store_admin/storeAdminSlice.ts';
import { editLayout, getLayout, captureLayoutScreenshot } from '../../features/layouts/layoutSlice.ts';
import { setInitialLayout, undo, redo } from '../../features/layouts/layoutSettingsSlice.ts';
import { getDynamicSizeMap, getZoomScaleClass } from '../../utils/helperFunctions.ts';
import { BreadcrumbProvider } from '../../contexts/BreadcrumbContext.tsx';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosSettings } from 'react-icons/io';
import { Type, Palette } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LayoutFontsSelector from '../../components/layout_settings/extras/LayoutFontsSelector';
import LayoutColorSelector from '../../components/layout_settings/extras/LayoutColorSelector';

// Fields that updateLayoutConfig handles in the backend
const PARTIAL_UPDATE_FIELDS = [
  'store',
  'background',
  'floats',
  'routes',
  'routeOrder',
  'name',
  'menubar',
  'colors',
  'fonts',
];

const SECTION_FIELDS = [
  'sections.footer',
  'sections.about',
  'sections.hero',
  'sections.products',
  'sections.FAQs',
  'sections.searchResults',
  'sections.contact',
  'sections.reviews',
  'sections.gallery',
  'sections.singleProduct',
  'sections.services',
  'sections.bookService',
  'sections.rentals',
  'sections.donations',
  'sections.packages',
  'sections.book',
  'sections.menu',
  "sections.featuredProducts",
];

// Build a partial config object from dirty fields
const buildPartialConfig = (dirtyFields: Set<string>, fullSettings: any): any => {
  const partialConfig: any = {};
  
  dirtyFields.forEach(field => {
    if (field.startsWith('sections.')) {
      // Handle nested sections
      const sectionKey = field.replace('sections.', '');
      const sections = fullSettings.sections as Record<string, any>;
      if (sections && sections[sectionKey] !== undefined) {
        partialConfig.sections = partialConfig.sections || {};
        partialConfig.sections[sectionKey] = sections[sectionKey];
      }
    } else if (fullSettings[field] !== undefined) {
      partialConfig[field] = fullSettings[field];
    }
  });
  
  return partialConfig;
};


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

const WebsiteBuilderContent: React.FC<{ isNewLayout?: boolean }> = ({ isNewLayout = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === 'true';
  const [showNewLayoutOverlay, setShowNewLayoutOverlay] = useState(isNew || isNewLayout);
  const [sizeMap, setSizeMap] = useState(getDynamicSizeMap());
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [zoom, setZoom] = useState(sizeMap[device].scale);
  const [loading, setLoading] = useState<boolean>(true);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);
  const [quickAccessSection, setQuickAccessSection] = useState<'fonts' | 'colors' | null>(null);
  const [floatingPanel, setFloatingPanel] = useState<'fonts' | 'colors' | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [dirtyFields, setDirtyFields] = useState<Set<string>>(new Set());
  const [lastSavedSettings, setLastSavedSettings] = useState<any>(null);
  

  const store = useAppSelector((state) => state.stores.currentStore);
  const fonts = useAppSelector((state) => state.layoutSettings.fonts);
  const settings = useAppSelector((state) => state.layoutSettings);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { layoutId } = useParams<{ layoutId: string }>();
  const { width, height, scale } = sizeMap[device];

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          dispatch(redo());
        } else {
          dispatch(undo());
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);


  useEffect(() => {
    const fetchLayoutAndStore = async () => {
      if (layoutId) {
        try {
          setLoading(true);
          const layoutResult = await dispatch(getLayout(layoutId)).unwrap();
          dispatch(setInitialLayout(layoutResult));
          
          // Initialize lastSavedSettings after layout is loaded
          setLastSavedSettings(JSON.parse(JSON.stringify(layoutResult)));

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

  // Autosave: Track changes and save with 500ms debounce
  useEffect(() => {
    if (!layoutId || !settings || !lastSavedSettings) return;

    // Find newly dirty fields by comparing current settings with last saved
    const newDirtyFields = new Set<string>();
    
    // Check top-level fields
    PARTIAL_UPDATE_FIELDS.forEach(field => {
      const currentValue = JSON.stringify(settings[field as keyof typeof settings]);
      const lastValue = JSON.stringify(lastSavedSettings[field as keyof typeof lastSavedSettings]);
      if (currentValue !== lastValue) {
        newDirtyFields.add(field);
      }
    });
    
    // Check section fields
    SECTION_FIELDS.forEach(field => {
      const sectionKey = field.replace('sections.', '');
      const sections = settings.sections as Record<string, any>;
      const lastSections = lastSavedSettings.sections as Record<string, any>;
      const currentValue = sections ? JSON.stringify(sections[sectionKey]) : 'undefined';
      const lastValue = lastSections ? JSON.stringify(lastSections[sectionKey]) : 'undefined';
      if (currentValue !== lastValue) {
        newDirtyFields.add(field);
      }
    });

    // If there are dirty fields, update our tracking
    if (newDirtyFields.size > 0) {
      setDirtyFields(prev => {
        const updated = new Set(prev);
        newDirtyFields.forEach(field => updated.add(field));
        return updated;
      });
    }
  }, [settings, lastSavedSettings, layoutId]);

  // Debounced autosave effect
  useEffect(() => {
    if (dirtyFields.size === 0 || !layoutId) return;

    const timeout = setTimeout(async () => {
      // Build partial config from dirty fields
      const partialConfig = buildPartialConfig(dirtyFields, settings);
      
      console.log('Autosaving partial config:', Object.keys(partialConfig));
      
      try {
        await dispatch(editLayout({
          layoutId,
          layoutConfig: partialConfig,
        }));
        
        // Update last saved settings to current
        setLastSavedSettings(JSON.parse(JSON.stringify(settings)));
        setDirtyFields(new Set());
        
        console.log('Autosave successful');
      } catch (error) {
        console.error('Autosave failed:', error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [dirtyFields, settings, layoutId, dispatch]);

  // Handle save and exit - capture screenshot and redirect to store layouts
  const handleSaveAndExit = async () => {
    if (!layoutId || isSaving) return;
    
    setIsSaving(true);
    try {
      // Save any pending layout changes using partial updates
      if (dirtyFields.size > 0) {
        const partialConfig = buildPartialConfig(dirtyFields, settings);
        await dispatch(editLayout({
          layoutId: settings._id as string,
          layoutConfig: partialConfig,
        }));
        
        // Update last saved settings after successful save
        setLastSavedSettings(JSON.parse(JSON.stringify(settings)));
        setDirtyFields(new Set());
      }
      
      // Capture the screenshot
      if (isNew) {
        await dispatch(captureLayoutScreenshot(layoutId));
      }
      
      // if is new and store has no website (layouts, custom layout or external link), set as active layout
      if (isNew && store && !store.website?.layoutId && !store.website?.websiteUrl) {
        try {
          await dispatch(editStore({
            storeSlug: store.slug,
            updatedStore: {
              website: {
                source: 'internal',
                layoutId: layoutId
              }
            } as any
          })).unwrap();
          console.log('Layout set as active successfully');
        } catch (error) {
          console.error('Failed to set active layout:', error);
        }
      }
      
      // Show success message
      toast.success('Layout saved successfully!', {
        style: {
          background: '#10b981',
          color: '#fff',
        },
      });

      console.log("Layout saved and screenshot captured successfully");
      
      // Navigate to store layouts dashboard
      // setTimeout(() => {
      //   if (storeId) {
      //     navigate(`/dashboard/${storeId}/layouts`);
      //   } else {
      //     navigate(-1);
      //   }
      // }, 1000);
    } catch (error) {
      console.error('Failed to save layout:', error);
      toast.error('Failed to save layout. Please try again.', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
      // Still try to navigate back even if there was an error
      if (storeId) {
        navigate(`/dashboard/${storeId}/layouts`);
      } else {
        navigate(-1);
      }
    } finally {
      setIsSaving(false);
    }
  };

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

  // Main builder layout
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100 font-[Outfit]">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
            padding: '12px',
          },
        }}
      />
      
      {/* New Layout Success Overlay */}
      <AnimatePresence>
        {showNewLayoutOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNewLayoutOverlay(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">New Layout Created!</h2>
              <p className="text-stone-600 mb-6">
                You have created a new layout for your store. Use this website builder to start editing it to your taste...
              </p>
              <button
                onClick={() => setShowNewLayoutOverlay(false)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TopBar 
        setDevice={setDevice} 
        zoom={zoom} 
        setZoom={setZoom} 
        showDeviceSelector={!isSettingsOpen} 
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        onSave={handleSaveAndExit}
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
              className="fixed bottom-6 right-6 flex flex-row space-x-3 z-30"
            >
              {/* Fonts Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFloatingPanel(floatingPanel === 'fonts' ? null : 'fonts')}
                className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all ${
                  floatingPanel === 'fonts' 
                    ? 'bg-blue-700 ring-4 ring-blue-300' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400'
                }`}
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
                onClick={() => setFloatingPanel(floatingPanel === 'colors' ? null : 'colors')}
                className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all ${
                  floatingPanel === 'colors' 
                    ? 'bg-purple-700 ring-4 ring-purple-300' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400'
                }`}
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

        {/* Floating Panels for Fonts and Colors */}
        <AnimatePresence>
          {floatingPanel === 'fonts' && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <div className="flex items-center space-x-2">
                  <Type className="text-xl" />
                  <span className="font-semibold">Fonts</span>
                </div>
                <button
                  onClick={() => setFloatingPanel(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              {/* Content */}
              <div className="max-h-96 overflow-y-auto">
                <LayoutFontsSelector />
              </div>
            </motion.div>
          )}

          {floatingPanel === 'colors' && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                <div className="flex items-center space-x-2">
                  <Palette className="text-xl" />
                  <span className="font-semibold">Colors</span>
                </div>
                <button
                  onClick={() => setFloatingPanel(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              {/* Content */}
              <div className="max-h-96 overflow-y-auto">
                <LayoutColorSelector />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const WebsiteBuilder: React.FC<{ isNewLayout?: boolean }> = ({ isNewLayout }) => (
  <BreadcrumbProvider>
    <WebsiteBuilderContent isNewLayout={isNewLayout} />
  </BreadcrumbProvider>
);

export default WebsiteBuilder;
