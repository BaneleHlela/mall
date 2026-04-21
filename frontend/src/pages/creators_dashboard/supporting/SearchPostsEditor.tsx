import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setInitialSearchPost, updateSetting, undo, redo, resetToDefault } from '../../../features/searchPosts/searchPostSettingsSlice';
import { createSearchPostWithSettings, updateSearchPostWithSettings } from '../../../features/searchPosts/searchPostSettingsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDynamicSizeMap, getZoomScaleClass } from '../../../utils/helperFunctions';
import SearchPostsTopBar from '../../../components/layout_settings/topbar/SearchPostsTopBar';
import SearchPostsSettings from '../../../components/layout_settings/SearchPostsSettings';
import SearchPostsPreview from '../../../components/layout_settings/SearchPostsPreview';
import { BreadcrumbProvider } from '../../../contexts/BreadcrumbContext';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavbar } from '../../../utils/context/NavbarContext';
import { fetchSearchPosts } from '../../../features/searchPosts/searchPostSlice';


const SearchPostsEditorContent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams<{ postId?: string }>();

  const searchPostSettings = useAppSelector((state) => state.searchPostSettings);
  const allSearchPosts = useAppSelector((state) => state.searchPosts.searchPostsByTypes);
  const { hideNavbar } = useNavbar()

  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [zoom, setZoom] = useState(0.5);
  const [sizeMap, setSizeMap] = useState(getDynamicSizeMap());
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState(false);
  const isEditingMode = !!postId;

  hideNavbar();
  // Update zoom when device changes
  useEffect(() => {
    setZoom(sizeMap[device].scale);
  }, [device, sizeMap]);

  useEffect(() => {
        dispatch(fetchSearchPosts());
    }, [dispatch]);

  // Initialize with existing post if editing, or with variation if creating
  useEffect(() => {
    if (isEditingMode && postId) {
      const existingPost = Object.values(allSearchPosts).find(
        (post) => post._id === postId
      );
      if (existingPost) {
        dispatch(setInitialSearchPost(existingPost));
      }
    } else {
      // Get variation from URL params
      const params = new URLSearchParams(window.location.search);
      const variation = params.get('variation');
      if (variation) {
        // Initialize with default settings but set the variation
        dispatch(resetToDefault());
        dispatch(updateSetting({ field: 'variation', value: variation }));
      }
    }
  }, [isEditingMode, postId, dispatch, allSearchPosts]);

  const handleSave = async () => {
    if (!searchPostSettings.variation) {
      toast.error('Please select a variation');
      return;
    }

    if (!searchPostSettings.type) {
      toast.error('Please enter a type');
      return;
    }

    setIsSaving(true);

    try {
      const { _id, _history, _historyIndex, ...saveData } = searchPostSettings;

      if (isEditingMode && _id) {
        await dispatch(updateSearchPostWithSettings({ id: _id, updates: saveData })).unwrap();
        toast.success('Search post updated successfully!');
      } else {
        await dispatch(createSearchPostWithSettings(saveData)).unwrap();
        toast.success('Search post created successfully!');
      }

      // Navigate back after saving
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error: any) {
      toast.error(error || 'Failed to save search post');
    } finally {
      setIsSaving(false);
    }
  };

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

      <SearchPostsTopBar
        setDevice={setDevice}
        zoom={zoom}
        setZoom={setZoom}
        showDeviceSelector={!isSettingsOpen}
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        onSave={handleSave}
        isEditingMode={isEditingMode}
      />

      <div className="w-full website-builder h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem)] flex flex-row relative">
        {/* Settings Panel */}
        <SearchPostsSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          searchPostSettings={searchPostSettings}
        />

        {/* Preview Area */}
        <SearchPostsPreview
          device={device}
          zoom={zoom}
          currentSearchPost={searchPostSettings}
        />


      </div>
    </div>
  );
};

const SearchPostsEditor = () => (
  <BreadcrumbProvider>
    <SearchPostsEditorContent />
  </BreadcrumbProvider>
);

export default SearchPostsEditor;
