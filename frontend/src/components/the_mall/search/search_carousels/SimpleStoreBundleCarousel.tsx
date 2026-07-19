import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import SimpleStoreBundleCarouselCard from "./SimpleStoreBundleCarouselCard.tsx";
import type { SearchPost } from "../../../../types/searchPostTypes.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { fetchSearchPostStores } from "../../../../features/stores/storeSlice.ts";
import type { Store } from "../../../../types/storeTypes.ts";
import { useSearchPostClickTracking } from "../../../../features/searchPosts/useSearchPostClickTracking.ts";

interface SimpleStoreBundleCarouselProps {
  searchPost: SearchPost;
}

const SimpleStoreBundleCarousel: React.FC<SimpleStoreBundleCarouselProps> = ({
  searchPost
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ viewAllRoute, setViewAllRoute ] = React.useState<string>('');
  const storesBySlug = useAppSelector(state => state.stores.storesBySlug);
  const [ stores, setStores ] = React.useState(Object.values(storesBySlug));
  const [postText, setPostText] = React.useState<{
    heading: string;
    subheading: string;
  }>({
    heading: '',
    subheading: '',
  });
  const [ headerRoute, setHeaderRoute ] = React.useState<string>('');

  // Type effects
  useEffect(() => {
    const fetchStores = async () => {
      // Return top 6 stores if variation is "new-simple-store-carousel"
      if (searchPost && searchPost.type === "new-simple-store-carousel") {
        const results = await dispatch(fetchSearchPostStores(searchPost.type));
        setStores((results.payload as Store[]).slice(0, 6));
      }
      if (searchPost && searchPost.type === "highest-rated-in-food") {
        setViewAllRoute("/search?sort=top-rated&dep=food");
        // Fetch post stores and set them as local stores
        const results = await dispatch(fetchSearchPostStores(searchPost.type));
        setStores(results.payload as Store[]);
        setHeaderRoute("/search?sort=top-rated");
        setPostText((prev) => ({
          ...prev,
          heading: searchPost.style.text?.heading?.input || 'Highest Rated in Food' || '',
          subheading: searchPost.style.text?.subheading?.input || 'Discover the best food stores on The Mall' || '',
        }));
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

  const trackSearchPostClick = useSearchPostClickTracking(searchPost);

  // View All Button Click
  const handleViewAllButtonClick = () => {
    if (viewAllRoute) {
      trackSearchPostClick();
      navigate(viewAllRoute);
    }
  };

  // Handle Header Click
  const handleHeaderClick = () => {
    if (headerRoute) {
      trackSearchPostClick();
      navigate(headerRoute)
    }
  }

  // Handle Card Click
  const handleCardClick = (store: Store) => {
    if (store.slug) {
      trackSearchPostClick();
      navigate(`/stores/${store.slug}`);
    }
  }
  
  return (
    <div className="w-full pl-3 py-1 border-b-2 border-gray-200">
      {/* Heading */}
      <div onClick={handleHeaderClick} className="flex w-full items-center justify-between pl-0 p-2">
        <h2 className="text-[22px] font-semibold text-gray-800">
          {postText.heading}
        </h2>

        <button className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200">
          <FiArrowRight className="text-lg text-black" />
        </button>
      </div>

      {/* Stores */}
      <Swiper
        //modules={[FreeMode]}
        //freeMode={false}
        spaceBetween={5}
        slidesPerView={4.5}
        speed={700}
        className="px-2 pb-2"
      >
        {stores.map((store) => (
          <SwiperSlide key={store._id} className="py-2">
            <SimpleStoreBundleCarouselCard 
              store={store} 
              handleCardClick={() => handleCardClick(store)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimpleStoreBundleCarousel;