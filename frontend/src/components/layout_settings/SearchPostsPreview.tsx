import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import RenderSearchPost from '../the_mall/search/RenderSearchPost';
import type { SearchPost } from '../../types/searchPostTypes';
import { DeviceProvider } from '../../utils/DeviceContext';

interface SearchPostsPreviewProps {
  device: 'mobile' | 'tablet' | 'desktop';
  zoom: number;
  currentSearchPost: any;
}

const SearchPostsPreview: React.FC<SearchPostsPreviewProps> = ({
  device,
  zoom,
  currentSearchPost
}) => {
  const allSearchPosts = useAppSelector((state) => state.searchPosts.searchPostsByTypes);
  const searchPostOrder = ["top-rated-on-the-mall", "highest-rated-in-food", "ekasibite-store-most-viewed-products", "ekasibite-store-new-arrivals", "deneo-mphuthi-bakes-store-most-viewed-products"];

  // Get device dimensions
  const getDeviceDimensions = () => {
    switch (device) {
      case 'mobile':
        return { width: 390, height: 844 };
      case 'tablet':
        return { width: 768, height: 1024 };
      case 'desktop':
        return { width: 1024, height: 768 };
      default:
        return { width: 390, height: 844 };
    }
  };

  const { width, height } = getDeviceDimensions();

  // Order search posts based on the defined order
  const orderedSearchPosts = searchPostOrder.map(type => allSearchPosts[type]).filter(Boolean) as SearchPost[];

  // Replace the post being edited with the current settings
  const previewSearchPosts = orderedSearchPosts.map(post => {
    if (post._id === currentSearchPost._id) {
      return { ...currentSearchPost };
    }
    return post;
  });

  return (
    <div className="flex-1 overflow-auto relative flex items-center justify-center p-4 lg:p-8 hide-scrollbar">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Device Preview Container */}
      <div
        className="relative bg-gradient-to-b from-stone-900 to-black rounded-3xl shadow-2xl"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center',
          width,
          height,
          aspectRatio: `${width}/${height}`,
          borderTop: device === 'mobile' ? '10px solid #1a1a1a' : device === 'tablet' ? '15px solid #1a1a1a' : '18px solid #1a1a1a',
          borderLeft: device === 'mobile' ? '10px solid #1a1a1a' : device === 'tablet' ? '15px solid #1a1a1a' : '18px solid #1a1a1a',
          borderRight: device === 'mobile' ? '10px solid #1a1a1a' : device === 'tablet' ? '15px solid #1a1a1a' : '18px solid #1a1a1a',
          borderBottom: device === 'mobile' ? '40px solid #1a1a1a' : device === 'tablet' ? '60px solid #1a1a1a' : '60px solid #1a1a1a',
          borderRadius: device === 'mobile' ? '25px' : device === 'tablet' ? '30px' : '12px 12px 6px 6px',
          padding: '0px',
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
              <span style={{ color: 'white', fontSize: '20px' }}>⏻</span>
            </div>
          </>
        )}

        {/* Content */}
        <DeviceProvider isMobileOrTabletOverride={device === 'mobile' || device === 'tablet'}>
          <div
            className="w-full h-full overflow-y-auto bg-white hide-scrollbar"
            style={{ borderRadius: device === 'mobile' ? '0px' : device === 'tablet' ? '0px' : '6px 6px 0px 0px' }}
          >
            {/* Render all search posts */}
            {previewSearchPosts.map((searchPost: SearchPost) => (
              <RenderSearchPost
                key={searchPost._id}
                searchPost={searchPost}
                variation={searchPost.variation}
              />
            ))}
          </div>
        </DeviceProvider>
      </div>
    </div>
  );
};

export default SearchPostsPreview;