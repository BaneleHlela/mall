import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
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
import { set } from "lodash";

interface BasicProductCarouselProps {
    searchPost: SearchPost;
}

const BasicProductCarousel: React.FC<BasicProductCarouselProps> = ({
  searchPost,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const store= useAppSelector(state => state.stores.storesBySlug[searchPost.type.replace("-store-top-products", "")]);
    const cardProducts =  useAppSelector(state => state.products.productsByStoreSlug[store?.slug]) || [];
    const [ products, setProducts ] = React.useState<Product[]>([]);
    const [ viewAllRoute, setViewAllRoute ] = React.useState<string>('');
    const [postText, setPostText] = React.useState<{
        heading: string;
        subheading: string;
    }>({
        heading: '',
        subheading: '',
    });
    
    // Fetch products for the store in the search post
    useEffect(() => {
        if (store?.slug) {
            dispatch(fetchStoreProducts({ storeSlug: store.slug, activeOnly: true }));
        }
    }, [dispatch, store]);
    
    const thumbUrl = 
        store?.thumbnails.profily &&
        store?.thumbnails.profily !== '//example.com/images/thumbnails/product5.jpg'
        ? store?.thumbnails.profily
        : 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png'
    
    // Type effects
    useEffect(() => {
        const fetchProducts = async () => {
            if (searchPost && searchPost.type === "top-rated-on-the-mall") {
                setViewAllRoute("/search?sort=top-rated");
                const results = await dispatch(fetchSearchPostProducts(searchPost.type));
                setProducts(results.payload as Product[]);
            }
            if (searchPost && searchPost.type.includes("store-top-products")) {
                // Example type: "ekasibite-store-top-products"
                // const results = awaits fetchSearchPostProducts(searchPost.type);
                const storeSlug = searchPost.type.replace("-store-top-products", "");
                const results = await dispatch(fetchStoreProducts({ storeSlug, activeOnly: true}));
                const fetchedStore = await dispatch(fetchStoreBySlug(storeSlug));
                //setSearchPostProducts(results.payload);
                setViewAllRoute(`/store/${storeSlug}?sort=top-rated`);
            }
            if (searchPost && searchPost.type.includes("store-most-viewed-products")) {
                const storeSlug = searchPost.type.replace("-store-most-viewed-products", "");
                const results = await dispatch(fetchStoreProducts({ storeSlug, activeOnly: true}));
                setProducts(results.payload as Product[]);
                const fetchedStore = await dispatch(fetchStoreBySlug(storeSlug));
                //setSearchPostProducts(results.payload);
                setPostText((prev) => ({ 
                    ...prev, // @ts-ignore-next-line
                    heading: searchPost.style.text?.heading?.input || `${results.payload[0].store.name} Most Viewed` || '', //@ts-ignore-next-line
                    subheading: searchPost.style.text?.subheading?.input || `${results.payload[0]?.store?.slogan ? results.payload[0].store.slogan : 'Shop from the best'}` || '',
                }));
                setViewAllRoute(`/store/${storeSlug}?sort=top-rated`);
            }
        };
        fetchProducts();
    }, [searchPost, dispatch]);

    return (
        <div className="w-full pl-3 py-3 border-b-2 border-gray-200">
            {/* Heading */}
            <button
                type="button"
                onClick={() => {
                    if (store?.slug) {
                        navigate(`/stores/${products[0]?.store?.slug}?sort=top-rated`);
                    }
                }}
                className={`w-full flex items-center justify-between gap-3  pr-3 py-4 text-left transition-colors `}
            >
                <div className={`relative w-12 h-12 overflow-hidden rounded-full `}>
                    <img src={thumbUrl} alt={store?.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold`}>{postText.heading}</h3>
                    <p className={`text-sm mt-1`}>{postText.subheading || 'Shop from the best'}</p>
                </div>
                <button className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200">
                    <FiArrowRight className="text-lg text-black" />
                </button>
            </button>
            {/* Swiper */}
            <Swiper
                modules={[FreeMode]}
                freeMode={false}
                spaceBetween={12}
                slidesPerView={3.2}
                speed={700}
                className="px-2 pb-2"
            >
                {(products).map((product) => (
                    <SwiperSlide key={product._id} className="py-2">
                        <BasicProductCarouselCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BasicProductCarousel;