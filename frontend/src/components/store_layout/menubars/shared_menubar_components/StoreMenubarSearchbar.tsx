import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { fetchStoreProducts } from "../../../../features/products/productsSlice";
import type { Product } from "../../../../types/productTypes";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

interface StoreMenubarSearchbarProps {
    isOpen: boolean;
    onClose: () => void;
    style?: {
        input: {
            fontFamily?: string;
            backgroundColor: string;
            border: {
                width: string;
                style: string;
                color: string;
                radius: string;
            },
        }
        overlay: {
            color:string;
            backgroundColor: string;
            button: {
                backgroundColor: string;
                color: string;
            }
        },
    }
}
interface SearchItemProps {
    name: string;
    description: string;
    imageUrl: string;
    fontFamily: string;
    productSlug: string;
    store: any;
    layoutId?: string;
    onClose: () => void;
}

const SearchItem: React.FC<SearchItemProps> = ({
    name,
    description,
    imageUrl,
    fontFamily,
    productSlug,
    store,
    layoutId,
    onClose,
}) => {
    const { colors } = useAppSelector((state) => state.layoutSettings)
    const navigate = useNavigate();

    const handleClick = () => {
        const currentUrl = window.location.href;

        if (currentUrl.includes('layouts')) {
          navigate(`/layouts/${layoutId}/preview/product/${productSlug}`);
        } else if (store && store.slug) {
          navigate(`/stores/${store.slug}/product/${productSlug}`);
        } else {
          console.error('Store ID is not available');
        }
        onClose();
    };

    return (
        <div
            className="flex w-full h-[10vh] overflow-hidden cursor-pointer hover:bg-gray-100"
            onClick={handleClick}
        >
            {/* Image Url */}
            <div className="w-[20%] aspect-square h-full">
                <img
                    src={imageUrl}
                    alt="Search Item image"
                    className="w-full aspect-square object-cover"
                />
            </div>
            {/* Name and description */}
            <div style={{color: colors?.secondary}} className="flex flex-col justify-evenly w-[80%] px-2">
                <h3 style={{fontFamily: fontFamily}} className="text-[2.2vh]">{name}</h3>
                <p className="text-[1.8vh] line-clamp-1 opacity-75">{description}</p>
            </div>
        </div>
    );
}

const StoreMenubarSearchbar: React.FC<StoreMenubarSearchbarProps> = ({
    style,
}) => {
    const dispatch = useAppDispatch();
    const store = useAppSelector((state) => state.stores.currentStore);
    const products = useAppSelector((state) => state.products.products);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const overlayRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { layoutId } = useParams<{ layoutId: string }>();

    useEffect(() => {
        if (store?.slug) {
            dispatch(fetchStoreProducts({ storeSlug: store.slug }));
        }
    }, [store?.slug, dispatch]);

    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products.slice(0, 5));
        }
    }, [searchTerm, products]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                setIsOverlayOpen(false);
            }
        };
        if (isOverlayOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOverlayOpen]);

    const handleSearchAllClick = () => {
        const currentUrl = window.location.href;

        if (currentUrl.includes('layouts')) {
            navigate(`/layouts/${layoutId}/preview/search?q=${encodeURIComponent(searchTerm)}`);
        } else if (store && store.slug) {
            navigate(`/stores/${store.slug}/search?q=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }

        setIsOverlayOpen(false);
    };
    

    return (
        <div className="relative w-full h-full">
            <div className='w-full h-full'>
                <input
                    style={{
                        backgroundColor: style?.input.backgroundColor || 'transparent',
                        borderWidth: style?.input.border.width || '0px',
                        borderStyle: style?.input.border.style || 'solid',
                        borderColor: style?.input.border.color || 'black',
                        borderRadius: style?.input.border.radius || '0px',
                    }}
                    type="text"
                    className="w-full h-full border p-[1vh]"
                    placeholder="Search..."
                    onClick={() => setIsOverlayOpen(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>

            <AnimatePresence>
                {isOverlayOpen && (
                    <motion.div
                        style={{
                            backgroundColor: style?.overlay.backgroundColor || 'white',
                        }}
                        ref={overlayRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:absolute md:bottom-0 md:w-full min-w-[250px] md:h-[60vh] fixed inset-0 bg-white z-101 shadow-lg overflow-y-auto p-[1vh] lg:p-0"
                    >
                        {window.innerWidth < 786 && (<IoMdClose onClick={() => setIsOverlayOpen(false)} size={32} color={style?.input.border.color}></IoMdClose>)}
                        <input
                            style={{
                                backgroundColor: style?.input.backgroundColor || 'transparent',
                                borderWidth: style?.input.border.width || '0px',
                                borderStyle: style?.input.border.style || 'solid',
                                borderColor: style?.input.border.color || 'black',
                                borderRadius: style?.input.border.radius || '0px',
                            }}
                            type="text"
                            className="w-full h-[5vh] mt-[2vh] lg:mt-0 border p-[1vh]"
                            placeholder="Search products..."
                            onClick={() => setIsOverlayOpen(true)}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        <div className="py-[2vh] lg:px-[2vh] lg:pb-[2vh]">
                            {!searchTerm && <h3 style={{color: style?.overlay.color}} className="text-[2.4vh] font-semibold mb-4">Newest Products</h3>}
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <SearchItem
                                        key={product._id}
                                        name={product.name}
                                        description={product.description}
                                        imageUrl={product.images[0] || ''}
                                        fontFamily={style?.input.fontFamily || 'inherit'}
                                        productSlug={product.slug}
                                        store={store}
                                        layoutId={layoutId}
                                        onClose={() => setIsOverlayOpen(false)}
                                    />
                                ))
                            ) : (
                                <p>No products found</p>
                            )}
                        </div>
                        {searchTerm && (
                            <div className="p-4 border-t">
                                <button
                                    onClick={handleSearchAllClick}
                                    style={{
                                        backgroundColor: style?.overlay.button.backgroundColor || 'blue',
                                        color: style?.overlay.button.color || 'white',
                                        fontFamily: style?.input.fontFamily || 'inherit',
                                    }}
                                    className="w-full p-[1vh] bg-blue-500 text-white rounded hover:cursor-pointer hover:opacity-90 transition-all duration-200"
                                >
                                    Search all '{searchTerm}'
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
  );
};

export default StoreMenubarSearchbar;
