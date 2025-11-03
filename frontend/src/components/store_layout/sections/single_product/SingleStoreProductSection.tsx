import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { fetchProductById } from '../../../../features/products/productsSlice'
import { getBackgroundStyles, getTextStyles } from '../../../../utils/stylingFunctions'
import { HiArrowLeftEndOnRectangle, HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi2'
import VariationDropdown from './supporting/VariationDropdown'
import { addToCart } from '../../../../features/cart/cartSlice'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import UnderlinedText from '../../extras/text/UnderlinedText'
import { formatPriceWithSpaces } from '../../extras/cards/product/popular/PopularProductCard'
import { TbLoader3 } from 'react-icons/tb'

// ts errors
// Handle Add  To Cart. (Sometimes it's gotta say "please select a variation first")
// We gotta add toggle to next/previous product functionality.'

const SingleStoreProductSection = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { productId } = useParams<{ productId: string }>()

    const product = useAppSelector(state => state.products.selectedProduct)
    const isLoading = useAppSelector(state => state.products.isLoading)
    const settings = useAppSelector((state) => state.layoutSettings.singleProduct);
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const isCartLoading = useAppSelector(state => state.cart.loading)

    const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
    const [specialRequest, setSpecialRequest] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    useEffect(() => {
        setQuantity(1);
    }, [selectedVariation]);
        
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId))
        }
    }, [dispatch, productId])
    // Set the first variation as the default selected variation
    useEffect(() => {
        if (product?.variations && product.variations.length > 0) {
            setSelectedVariation(product.variations[0]); // Set the first variation
        }
    }, [product]);

    if (isLoading) return <div>Loading...</div>
    if (!product) return <div>Error loading product</div>

    // --- Handle price logic (schema update) ---
    const hasVariations = Array.isArray(product.variations) && product.variations.length > 0;
    const hasPrices = Array.isArray(product.prices) && product.prices.length > 0;

    const selectedPrice =
        hasVariations && hasPrices
            ? product.prices.find(p => p.variation === selectedVariation)?.amount ??
              product.prices[0]?.amount ??
              0
            : product.price ?? 0;

    // --- Image Handlers ---
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    // --- Add to Cart ---
    const handleAddToCart = () => {
        dispatch(
            addToCart({
                storeId: product?.store || '', 
                productId: product ? product._id : '', 
                quantity,
                specialRequest,
                variation: selectedVariation || null,
            })
        );
    };

    // --- Handle "Back to home" navigation ---
    const handleBackToHome = () => {
        const productStore = product.store;
        const productsRoute = routes.products?.url || "products"; // Default to "products" if not found in routes

        // Determine the correct navigation path
        const basePath = `/stores/${productStore}`;
        const fullPath = routes.products?.url === "/products" 
            ? `${basePath}${productsRoute}#products` 
            : `${basePath}#products`;

        navigate(fullPath); // Navigate to the determined path
    };

    

    return (
        <div
            style={{
                ...getBackgroundStyles(settings.background || {}),
            }}
            className='flex flex-col justify-between min-h-fit'
        >   
            {/* Back to home */}
            <div 
                style={{
                    ...getTextStyles(settings.text.exit),
                    ...getBackgroundStyles(settings.text.exit.background),
                }}
                onClick={handleBackToHome}
                className="w-fit flex flex-row items-center cursor-pointer bg-amber-100"
            >
                <HiArrowLeftEndOnRectangle />
                <p>Back</p>
            </div>

            {/* Image and Details */}
            <div className="flex flex-col justify-evenly items-center mt-4 lg:flex lg:flex-row lg:justify-between">
                {/* Images */}
                <div
                    style={{
                        maxHeight: window.innerWidth <= 1024 ? "60vh" : settings.details.background.height.desktop,
                    }} 
                    className="relative w-full lg:w-[50%] flex flex-col items-center justify-center overflow-hidden"
                >
                    <img
                        key={currentImageIndex}
                        src={product.images[currentImageIndex]}
                        alt={`Product image ${currentImageIndex + 1}`}
                        className="object-cover transition-opacity duration-700 ease-in-out opacity-100 w-full"
                        style={{
                            ...getBackgroundStyles(settings.images.background),
                            backgroundColor: 'transparent',
                        }}
                    />

                    {/* Left Arrow */}
                    {product.images.length > 1 && (
                        <button
                            style={{
                                ...getBackgroundStyles(settings.images.toggleButton.background),
                                ...getTextStyles(settings.images.toggleButton.text),
                            }}
                            onClick={handlePrevImage}
                            className="absolute left-0 top-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition hover:scale-102"
                        >
                            <MdOutlineKeyboardArrowLeft/>
                        </button>
                    )}

                    {/* Right Arrow */}
                    {product.images.length > 1 && (
                        <button
                            style={{
                                ...getBackgroundStyles(settings.images?.toggleButton?.background),
                                ...getTextStyles(settings.images.toggleButton.text),
                            }}
                            onClick={handleNextImage}
                            className="absolute right-0 top-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition hover:scale-102"
                        >
                            <MdOutlineKeyboardArrowRight/>
                        </button>
                    )}
                </div>

                {/* Details */}
                <div 
                    style={{
                        ...getBackgroundStyles(settings.details.background),
                    }}
                    className="w-[100%] lg:w-[50%] min-h-fit flex flex-col"
                >
                    {/* Name and Price */}
                    <div
                        style={{
                            ...getBackgroundStyles(settings.details.nameAndPrice.background),
                        }} 
                        className={`min-h-fit
                            ${settings.details.nameAndPrice.background.position === "center" && "text-center"}
                            ${settings.details.nameAndPrice.background.position === "start" && "text-start"}
                            ${settings.details.nameAndPrice.background.position === "end" && "text-end"}
                        `}
                    >
                        <UnderlinedText 
                            style={settings.details.nameAndPrice.name}
                            input={product.name || "Product Name"}
                        />
                        <UnderlinedText 
                            style={settings.details.nameAndPrice.price}
                            input={`R${formatPriceWithSpaces(selectedPrice)}.00`}
                        />
                    </div>

                    {/* Variation selector */}
                    {hasVariations && (
                        <div
                            style={{
                                ...getBackgroundStyles(settings.details.variationSelector.background.container)
                            }} 
                            className={`
                                ${settings.details.text.labels.position === "center" && "text-center"}
                                ${settings.details.text.labels.position === "start" && "text-start"}
                                ${settings.details.text.labels.position === "end" && "text-end"} capitalize
                            `}
                        >
                            <label
                                style={{
                                    ...getTextStyles(settings.details.text.labels)
                                }} 
                                htmlFor="variation_selector"
                            >
                                {settings.details.variationSelector.text.label.input} *
                            </label>
                            <VariationDropdown
                                variations={product.variations}
                                selectedVariation={selectedVariation}
                                onVariationChange={setSelectedVariation}
                                style={settings.details.variationSelector}
                            />
                        </div>
                    )}

                    {/* Special Request Box */}
                    {settings.details.messageBox.show && (
                        <div 
                            style={{
                                ...getBackgroundStyles(settings.details.messageBox.background.container)
                            }}
                            className={`
                                ${settings.details.text.labels.position === "center" && "text-center"}
                                ${settings.details.text.labels.position === "start" && "text-start"}
                                ${settings.details.text.labels.position === "end" && "text-end"}
                            `}
                        >
                            <label
                                style={{
                                    ...getTextStyles(settings.details.text.labels)
                                }}  
                            >
                                {settings.details.messageBox.titleInput.input}
                            </label>
                            <textarea 
                                value={specialRequest}
                                onChange={(e) => setSpecialRequest(e.target.value)}
                                style={{
                                    ...getTextStyles(settings.details.messageBox.text),
                                    ...getBackgroundStyles(settings.details.messageBox.background.box),
                                }}
                                className="w-full h-[13vh] p-2 mt-2"
                                placeholder={settings.details.messageBox.placeholder.textArea || "We'll do our best to accommodate any requests when possible"}
                            />
                        </div>
                    )}

                    {/* Quantity Updater */}
                    <div  
                        style={{
                            ...getBackgroundStyles(settings.details.quantityUpdater.background.container),
                        }}  
                        className={`w-full flex flex-col 
                            ${settings.details.quantityUpdater.background.container.position === "center" && "items-center"}
                            ${settings.details.quantityUpdater.background.container.position === "start" && "items-start"}
                            ${settings.details.quantityUpdater.background.container.position === "end" && "items-end"}
                        `} 
                    >
                        <span 
                            style={{
                                ...getTextStyles(settings.details.text.labels)
                            }}
                        >
                            Quantity *
                        </span>
                        <div 
                            style={{
                                ...getBackgroundStyles(settings.details.quantityUpdater.background.button),
                                ...getTextStyles(settings.details.quantityUpdater.text),
                            }}
                            className="flex flex-row justify-between items-center w-fit"
                        >
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className={`${quantity === 1 && "opacity-50"}`}
                            >
                                <HiOutlineMinus />
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>
                                <HiOutlinePlus />
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div    
                        className={`w-full flex flex-row 
                            ${settings.details.addToCartBtn.position === "center" && "justify-center"}
                            ${settings.details.addToCartBtn.position === "start" && "justify-start"}
                            ${settings.details.addToCartBtn.position === "end" && "justify-end"}
                            
                        `} 
                    >
                        <button
                            style={{
                                ...getBackgroundStyles(settings.details.addToCartBtn.style.background),
                                ...getTextStyles(settings.details.addToCartBtn.style.text)
                            }}
                            onClick={handleAddToCart}
                            className="w-full mt-2 py-3 lg:max-w-[50%] hover:underline hover:cursor-pointer"
                        >
                            {isCartLoading ? 
                                <TbLoader3 className='w-6 h-6 animate-spin mx-auto' /> : 
                                `Add to cart | R${formatPriceWithSpaces(selectedPrice * quantity)}`
                            }
                        </button>
                    </div>

                    {/* Description */}
                    <p 
                        style={{
                            ...getTextStyles(settings.details.description.text)
                        }}
                        className="lg:max-h-[30%] overflow-y-scroll mt-[2vh] hide-scrollbar"
                    >
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SingleStoreProductSection;
