import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import StoreBundleCarouselCard from "./StoreBundleCarouselCard.tsx";
import BasicProductCarouselCard from "./BasicProductCarouselCard.tsx";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { fetchStoreProducts, fetchSearchPostProducts } from "../../../../features/products/productsSlice.ts";
import type { Product } from "../../../../types/productTypes.ts";
import type { Store } from "../../../../types/storeTypes.ts";
import type { SearchPost } from "../../../../types/searchPostTypes.ts";
import { fetchStoreBySlug } from "../../../../features/stores/storeSlice.ts";
  import { useDevice } from "../../../../utils/DeviceContext.tsx";
import { responsiveDimensionControl } from "../../../../utils/helperFunctions.ts";

interface BasicProductCarouselProps {
    searchPost: SearchPost;
}

const BasicProductCarousel: React.FC<BasicProductCarouselProps> = ({
  searchPost,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isMobileOrTablet } = useDevice();
    const allProducts = useAppSelector((state: any) => (state.products as any).products || []);

    const hasPopulatedProducts = (searchPost.products?.length ?? 0) > 0 &&
      typeof searchPost.products[0] === 'object' &&
      '_id' in searchPost.products[0];

    const [ products, setProducts ] = useState<Product[]>(
      hasPopulatedProducts ? (searchPost.products as Product[]) : []
    );
    const [viewAllRoute, setViewAllRoute] = useState<string>(
      searchPost.style?.content?.carousel?.viewAllButton?.route || ''
    );

    const [postText, setPostText] = useState<{
        heading: string;
        subheading: string;
    }>({
        heading: searchPost.style?.text?.heading?.input || '',
        subheading: searchPost.style?.text?.subheading?.input || '',
    });

    const slidesPerView = searchPost.style?.content?.carousel?.slidesPerView || { mobile: 3.3, desktop: 5.5 };
    const imagesAspectRatio = searchPost.style?.content?.carousel?.imagesAspectRatio || { mobile: '1/1', desktop: '1/1' };
    const borderRadius = searchPost.style?.content?.carousel?.borderRadius || '0px';
    const responsiveSlidesPerView = Number(responsiveDimensionControl(isMobileOrTablet, slidesPerView));
    const responsiveAspectRatio = responsiveDimensionControl(isMobileOrTablet, imagesAspectRatio);
    
    // Fetch products for the store in the search post
    useEffect(() => {
      if (hasPopulatedProducts) return;

      const fetchProducts = async () => {
        if (searchPost && searchPost.products?.length > 0 && typeof searchPost.products[0] === 'string') {
          const resolved = allProducts.filter((p: any) => searchPost.products.includes(p._id));
          setProducts(resolved);
          return;
        }

        if (searchPost && searchPost.type === "new-basic-product-carousel") {
            const results = await dispatch(fetchSearchPostProducts(searchPost.type));
            setProducts((results.payload as Product[]).slice(0, 6));
        }
        if (searchPost && searchPost.type === "top-rated-on-the-mall") {
            setViewAllRoute("/search?sort=top-rated");
            const results = await dispatch(fetchSearchPostProducts(searchPost.type));
            setProducts(results.payload as Product[]);
        }
        if (searchPost && searchPost.type.includes("store-top-products")) {
            const storeSlug = searchPost.type.replace("-store-top-products", "");
            const results = await dispatch(fetchStoreProducts({ storeSlug, activeOnly: true }));
            const fetchedStore = await dispatch(fetchStoreBySlug(storeSlug));
            setViewAllRoute(`/store/${storeSlug}?sort=top-rated`);
            setProducts(results.payload as Product[]);
        }
        if (searchPost && searchPost.type.includes("store-most-viewed-products") || searchPost.type.includes("kasi-foods")) {
            const storeSlug = searchPost.type.replace("-store-most-viewed-products", "");
            const results = await dispatch(fetchStoreProducts({ storeSlug, activeOnly: true }));
            setProducts(results.payload as Product[]);
            const fetchedStore = await dispatch(fetchStoreBySlug(storeSlug));
            setPostText((prev) => ({
                ...prev,
                heading: postText.heading || `${results.payload[0].store.name} Most Viewed` || '',
                subheading: postText.subheading || `${results.payload[0]?.store?.slogan ? results.payload[0].store.slogan : 'Shop from the best'}` || '',
            }));
            setViewAllRoute(`/store/${storeSlug}?sort=top-rated`);
        }
      };
      fetchProducts();
    }, [searchPost, dispatch, hasPopulatedProducts, allProducts]);

    return (
        <div className="w-full pl-3 py-3 border-b-2 border-gray-200">
            {/* Heading */}
            <div className="w-full flex items-center justify-between gap-3 pr-3 py-2">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{postText.heading}</h3>
                    <p className="text-sm mt-1 text-gray-500">{postText.subheading || 'Shop from the best'}</p>
                </div>
                {viewAllRoute && (
                    <button
                        onClick={() => navigate(viewAllRoute)}
                        className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
                    >
                        <FaArrowRight className="text-lg text-black" />
                    </button>
                )}
            </div>
            {/* Swiper */}
            <Swiper
                modules={[FreeMode]}
                freeMode={false}
                spaceBetween={12}
                slidesPerView={responsiveSlidesPerView}
                speed={700}
                className="px-2 pb-2"
                style={{ borderRadius }}
            >
                {(products).map((product) => (
                    <SwiperSlide key={product._id} className="py-2">
                        <BasicProductCarouselCard product={product} aspectRatio={responsiveAspectRatio} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BasicProductCarousel;
