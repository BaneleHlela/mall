import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import StoreBundleCarouselCard from "./StoreBundleCarouselCard.tsx";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import type { SearchPost } from "../../../../types/searchPostTypes.ts";
import { useNavigate } from "react-router";
import { fetchSearchPostStores } from "../../../../features/stores/storeSlice.ts";
import type { Store } from "../../../../types/storeTypes.ts";
import { responsiveDimensionControl } from "../../../../utils/helperFunctions.ts";
import { useDevice } from "../../../../utils/DeviceContext.tsx";
import { updateSearchPostStats } from "../../../../features/searchPosts/searchPostSlice.ts";

interface StoreBundleCarouselProps {
  searchPost: SearchPost;
}

const StoreBundleCarousel: React.FC<StoreBundleCarouselProps> = ({
  searchPost
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isMobileOrTablet } = useDevice();
  const [ viewAllRoute, setViewAllRoute ] = React.useState<string>('');
  const [ headerRoute, setHeaderRoute ] = React.useState<string>('');
  const storesBySlug = useAppSelector(state => state.stores.storesBySlug);
  const [ stores, setStores ] = React.useState(Object.values(storesBySlug));
  const [postText, setPostText] = React.useState<{
    heading: string;
    subheading: string;
  }>({
    heading: '',
    subheading: '',
  });
  const [isDesktop, setIsDesktop] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Type effects
  useEffect(() => {
    const fetchStores = async () => {
      if (searchPost && searchPost.type === "top-rated-on-the-mall") {
        setViewAllRoute("/search?sort=top-rated");
        setHeaderRoute("/search?sort=top-rated");
        // Fetch post stores and set them as local stores
        const results = await dispatch(fetchSearchPostStores(searchPost.type));
        setStores(results.payload as Store[]);
      }
    }
    fetchStores();
  }, [searchPost]);
  
  // Style effects
  useEffect(() => {
    if (searchPost.style.text?.heading?.input) {
      setPostText((prev) => ({
        ...prev,
        heading: searchPost.style.text?.heading?.input || '',
      }));
    }
  }, [searchPost]);
  
  // Update post stats  
  const updatePostStats = () => {
    dispatch(updateSearchPostStats({
      searchPostId: searchPost._id, 
      stats: {
        ...searchPost.stats,
        clicks: 1, 
        likelihoodIndex: 1, 
      }}
    ))
  }

  // View All Button Click
  const handleViewAllButtonClick = () => {
    if (viewAllRoute) {
      // Update post stats
      updatePostStats();
      navigate(viewAllRoute);
    }
  };

  // Handle Header Click
  const handleHeaderClick = () => {
    if (headerRoute) {
      updatePostStats();
      navigate(headerRoute)
    }
  }

  // Handle Card Click
  const handleCardClick = (store: Store) => {
    if (store.slug) {
      updatePostStats();
      navigate(`/stores/${store.slug}`);
    }
  }

  return (
    <div className="w-full pl-3 py-3 border-b-2 border-gray-200">
      {/* Heading */}
      <div onClick={handleHeaderClick} className="flex w-full items-center justify-between pl-0 p-2">
        <h2 className="text-[22px] font-semibold text-gray-800">
          {postText.heading}
        </h2>

        <button className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200">
          <FiArrowRight className="text-lg text-black" />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[FreeMode]}
        freeMode={false}
        spaceBetween={12}
        slidesPerView={Number(responsiveDimensionControl(isMobileOrTablet, searchPost.style.content?.carousel?.slidesPerView))}
        speed={700}
        className="px-2 pb-2 mx-1"
      >
        {stores.map((store) => (
          <SwiperSlide key={store._id} className="py-2"> 
            <StoreBundleCarouselCard 
              store={store} // @ts-ignore-next-line
              imagesAspectRatio={searchPost?.style?.content?.carousel?.imagesAspectRatio}
              handleCardClick={() => handleCardClick(store)} 
            />
          </SwiperSlide>
        ))}
        {/* View All Button */}
        <SwiperSlide className="py-2">
          <div
            onClick={handleViewAllButtonClick}
            className="flex items-center justify-center w-full rounded-2xl space-x-3 bg-black/30 opacity-80 border border-gray-300"
            style={{
              aspectRatio: isDesktop
                ? (searchPost?.style?.content?.carousel?.imagesAspectRatio?.desktop || searchPost?.style?.content?.carousel?.imagesAspectRatio?.mobile || '5/3')
                : (searchPost?.style?.content?.carousel?.imagesAspectRatio?.mobile || '5/3')
            }}
          >
            <span className="text-xl font-semibold">View All</span><IoIosArrowRoundForward className="text-4xl" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default StoreBundleCarousel;