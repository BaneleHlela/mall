import React, { useEffect } from 'react';
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
    const { isMobileOrTablet } = useDevice();
    const store= useAppSelector(state => state.stores.storesBySlug[searchPost.type.replace("-store-top-products", "")]);
    const [ products, setProducts ] = React.useState<Product[]>([]);
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
        heading: '',
        subheading: '',
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
                    ...prev, // @ts-ignore-next-line
                    heading: searchPost.style.text?.heading?.input || `${results.payload[0].store.name} Most Viewed` || '', //@ts-ignore-next-line
                    subheading: searchPost.style.text?.subheading?.input || `${results.payload[0]?.store?.slogan ? results.payload[0].store.slogan : 'Shop from the best'}` || '',
                    storeSlug: storeSlug,
                }));
                setViewAllRoute(`/stores/${storeSlug}?sort=top-rated`);
            }
        };
        fetchProducts();
    }, [searchPost, dispatch]);

    // Handle Button Click
    const handleButtonClick = (storeSlug: string) => {
        navigate(`/stores/${storeSlug}`);
    };

    return (
        <div
            id={searchPost._id}
            style={{ backgroundColor: searchPost.style?.colors?.backgroundColor }}  
            className='w-full items-end py-6 ' 
        >
            {/* JSX content for the store carousel */}
            <div onClick={() => {}} className="w-full px-3">
                <img
                    style={{
                        borderRadius: searchPost.style.content?.largeImage?.borderRadius ? `${searchPost.style.content.largeImage.borderRadius}` : '0px',
                        aspectRatio: responsiveDimensionControl(isMobileOrTablet, searchPost.style.content?.largeImage?.aspectRatio),
                    }}
                    src={searchPost.style.content?.largeImage?.imageUrl[0] || 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png'}
                    alt={searchPost.stores[0]?.name}
                    className="w-full object-cover rounded-lg cursor-pointer"
                />
            </div>
            {/* Store slug */}
            <p 
                style={{
                    backgroundColor: searchPost.style?.colors?.accentColor || 'transparent'
                }}
                className={`w-fit text-md px-1 text-white-500 my-4 ml-3`}>@{postText.storeSlug}</p>
            {/* Text */}
            <div className="ml-3">
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
            <Swiper
                modules={[FreeMode, Scrollbar]}
                freeMode={false}
                scrollbar={{ draggable: true }}
                spaceBetween={15} 
                slidesPerView={Number(responsiveDimensionControl(isMobileOrTablet, searchPost.style.content?.carousel?.slidesPerView))}
                speed={700}
                className="px-2 pb-2 mt-4 pl-3"
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
            </Swiper>
        </div>
    )
}

export default StoreCarouselWithJSXAndProducts