import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevice } from '../../../../utils/DeviceContext';
import { GoArrowRight } from 'react-icons/go';
import { FreeMode, Scrollbar } from 'swiper/modules';
import { SwiperSlide, Swiper} from 'swiper/react';
import "swiper/css";
import ProductCardForStoreCarouselWithJSXAndProducts from './ProductCardForStoreCarouselWithJSXAndProducts.tsx';
import type { Store } from '../../../../types/storeTypes.ts';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { fetchSearchPostProducts, fetchStoreProducts } from '../../../../features/products/productsSlice.ts';
import type { SearchPost } from '../../../../types/searchPostTypes.ts';
import { fetchStoreBySlug } from '../../../../features/stores/storeSlice.ts';
import type { Product } from '../../../../types/productTypes.ts';
import { responsiveDimensionControl } from '../../../../utils/helperFunctions.ts';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { MdVerified } from 'react-icons/md';
import { useSearchPostClickTracking } from '../../../../features/searchPosts/useSearchPostClickTracking.ts';

interface StoreCarouselWithJSXAndProductsProps {
    // store: Store;
    // buttonUrl?: string;
    // style: {
    //     backgroundColor: string;
    //     accentColor?: string;
    // };
    // jsx: React.ReactNode;
    // text: {
    //     title: string;
    //     description: string;
    // },
    searchPost: SearchPost;
}

const StoreCarouselWithJSXAndProducts:React.FC<StoreCarouselWithJSXAndProductsProps> = ({ searchPost }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isMobileOrTablet, isDesktop } = useDevice();
    const store= useAppSelector(state => state.stores.storesBySlug[searchPost.type.replace("-store-top-products", "")]);
    const hasPopulatedProducts = (searchPost.products?.length ?? 0) > 0 &&
        typeof searchPost.products[0] === 'object' &&
        '_id' in searchPost.products[0];
    
    const [ products, setProducts ] = useState<Product[]>(
        hasPopulatedProducts ? (searchPost.products as Product[]) : []
    );
    
    const [buttonContent, setButtonContent] = React.useState<{
        input: string;
        function?: string;
        route: string
    }>({
        input: '',
        function: '',
        route: '',
    });
    const [ viewAllRoute, setViewAllRoute ] = React.useState<string>('');
    const [postText, setPostText] = React.useState<{
        heading: string;
        subheading: string;
        storeSlug: string
    }>({
        heading: searchPost.style.text?.heading?.input || '',
        subheading: searchPost.style.text?.subheading?.input || '',
        storeSlug: '',
    });
    
    // Fetch products for the store in the search post
    useEffect(() => {
        if (store?.slug) {
            dispatch(fetchStoreProducts({ storeSlug: store.slug, activeOnly: true }));
        }
    }, [dispatch, store]);
    
    // Type effects
    useEffect(() => {
        const fetchProducts = async () => {
            // Return top 6 products if variation is "new-carousel-with-jsx-and-products"
            if (searchPost && searchPost.type === "new-carousel-with-jsx-and-products") {
                const results = await dispatch(fetchSearchPostProducts(searchPost.type));
                setProducts((results.payload as Product[]).slice(0, 6));
            }
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
                setViewAllRoute(`/stores/${storeSlug}?sort=top-rated`);
            }
            if (searchPost && searchPost.type.includes("store-most-viewed-products")) {
                const storeSlug = searchPost.type.replace("-store-most-viewed-products", "");
                const results = await dispatch(fetchStoreProducts({ storeSlug, activeOnly: true}));
                setProducts(results.payload as Product[]);
                const fetchedStore = await dispatch(fetchStoreBySlug(storeSlug));
                //setSearchPostProducts(results.payload);
                setPostText((prev) => ({
                    ...prev,
                    heading: searchPost.style.text?.heading?.input || `${results.payload[0]?.store?.name || fetchedStore.payload?.name} Most Viewed`,
                    subheading: searchPost.style.text?.subheading?.input || `${results.payload[0]?.store?.slogan || 'Shop from the best'}`,
                    storeSlug: storeSlug,
                }));
                setViewAllRoute(`/stores/${storeSlug}?sort=top-rated`);
            }
            // Set postText for any type that contains store-top-products
            if (searchPost && searchPost.type.includes("store-top-products")) {
                const storeSlug = searchPost.type.replace("-store-top-products", "");
                const fetchedStore = await dispatch(fetchStoreBySlug(storeSlug));
                const storeName = fetchedStore.payload?.name || store?.name || '';
                setPostText((prev) => ({
                    ...prev,
                    heading: searchPost.style.text?.heading?.input || `${storeName} Top Products` || '',
                    subheading: searchPost.style.text?.subheading?.input || `${store?.slogan || 'Shop from the best'}` || '',
                    storeSlug: storeSlug,
                }));
                setViewAllRoute(`/stores/${storeSlug}?sort=top-rated`);
            }
        };
        fetchProducts();
    }, [searchPost, dispatch]);

    const trackSearchPostClick = useSearchPostClickTracking(searchPost);

    // Handle Button Click
    const handleButtonClick = (storeSlug: string) => {
        trackSearchPostClick();
        navigate(`/stores/${storeSlug}`);
    };

    // View All Button Click
    const handleViewAllButtonClick = () => {
        if (viewAllRoute) {
            trackSearchPostClick();
            navigate(viewAllRoute);
        }
    };

    const handleImageClick = () => {
        trackSearchPostClick();
    }
    

    return (
        <div
            id={searchPost._id}
            style={{ backgroundColor: searchPost.style?.colors?.backgroundColor }}  
            className='lg:flex lg:flex-row w-full items-end py-6 lg:h-[80vh]' 
        >
            {/* JSX content for the store carousel */}
            <div onClick={handleImageClick} className="flex items-center justify-center w-full h-full px-3">
                <img
                    style={{
                        borderRadius: searchPost.style.content?.largeImage?.borderRadius ? `${searchPost.style.content.largeImage.borderRadius}` : '0px',
                        aspectRatio: responsiveDimensionControl(isMobileOrTablet, searchPost.style.content?.largeImage?.aspectRatio),
                    }}
                    src={searchPost.style.content?.largeImage?.imageUrl[0] || 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png'}
                    alt={searchPost.stores[0]?.name}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
            </div>
            {/* Details */}
            <div className="lg:flex lg:flex-col lg:justify-between lg:max-w-[50%] lg:h-full">
                {/* Store slug */}
                {postText.storeSlug && (
                    <p 
                        style={{
                            backgroundColor: searchPost.style?.colors?.accentColor || 'transparent'
                        }}
                        className={`flex items-center w-fit text-md px-1 text-white-500 mt-4 ml-3 font-semibold`}>
                            @{postText.storeSlug}
                            <span className="">
                                {store?.isVerified && (
                                    <div className="">
                                    <MdVerified className="text-blue-500 text-sm ml-1" />
                                    </div>
                                )}
                            </span>
                    </p>
                )}
                {/* Text */}
                <div className="ml-3 mt-4">
                    <p className="font-semibold text-2xl">{postText.heading}</p>
                    <p className="text-semibold text-lg">{postText.subheading}</p>
                </div>
                {/* Button */}
                <button
                    onClick={() => handleButtonClick(postText.storeSlug)}
                    className={`flex items-center justify-between space-x-2 my-4 mb-8 px-4 py-3 rounded bg-black text-white font-semibold hover:bg-opacity-90 transition-colors ml-3`}
                >
                    <span className="">View Store</span> <GoArrowRight className='text-xl'/>
                </button>
                {/* Products */}
                <div className="max-h-[50%]">
                <Swiper
                    modules={[FreeMode, Scrollbar]}
                    freeMode={false}
                    scrollbar={{ draggable: true }}
                    spaceBetween={5} 
                    slidesPerView={Number(responsiveDimensionControl(isMobileOrTablet, searchPost.style.content?.carousel?.slidesPerView))}
                    speed={700}
                    className="px-2 pb-2 mt-4 pl-3 max-h"
                    style={{
                        backgroundColor: searchPost.style?.colors?.carouselBackgroundColor || 'transparent',
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id} className="pl-3 py-2">
                            <ProductCardForStoreCarouselWithJSXAndProducts 
                                product={product} 
                                style={{
                                    accentColor: searchPost.style?.colors?.accentColor,
                                    aspectRatio: searchPost.style.content?.carousel?.imagesAspectRatio,
                                    borderRadius: searchPost.style.content?.carousel?.borderRadius,
                                }}/>
                        </SwiperSlide>
                    ))}
                    {/* View All Button */}
                    <SwiperSlide className="py-2">
                        <div
                        onClick={handleViewAllButtonClick}
                        className="flex items-center justify-center w-full  space-x-3 bg-black/30 opacity-80 border border-gray-300"
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
            </div>
        </div>
    )
}

export default StoreCarouselWithJSXAndProducts

