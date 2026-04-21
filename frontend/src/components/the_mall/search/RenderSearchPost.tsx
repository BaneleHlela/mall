import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchSearchPosts } from '../../../features/searchPosts/searchPostSlice';
import type { Store } from '../../../types/storeTypes';
import BasicProductCarousel from './search_carousels/BasicProductCarousel';
import type { SearchPost } from '../../../types/searchPostTypes';
import StoreBundleCarousel from './search_carousels/StoreBundleCarousel';
import SimpleStoreBundleCarousel from './search_carousels/SimpleStoreBundleCarousel';
import StoreCarouselWithJSXAndProducts from './search_carousels/StoreCarouselWithJSXAndProducts';

interface RenderSearchPostProps {
  searchPost: SearchPost;
  variation: string;
}
const RenderSearchPost:React.FC<RenderSearchPostProps> = ({
  searchPost,
  variation
}) => {


  if (variation === "basicProductCarousel") {
    return (
      <BasicProductCarousel
        searchPost={searchPost}
      />
    )
  }
  if (variation === "basicStoreCarousel") {
    return (
      <StoreBundleCarousel
        searchPost={searchPost}
      />
    )
  }
  if (variation === "simpleStoreCarousel") {
    return (
      <SimpleStoreBundleCarousel
        searchPost={searchPost}
      />
    )
  } 
  if (variation === "carouselWithJSXAndProducts") {
    return (
      <StoreCarouselWithJSXAndProducts
        searchPost={searchPost}
      />
    )
  }

  return (
    <div>
      No search post found for {variation}
    </div>
  )
}

export default RenderSearchPost;