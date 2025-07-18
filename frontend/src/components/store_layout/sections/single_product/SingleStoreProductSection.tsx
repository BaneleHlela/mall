import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { fetchProductById } from '../../../../features/products/productsSlice'
import { getBackgroundStyles, getBorderStyles, getResponsiveDimension, getSpacingClasses, getTextStyles } from '../../../../utils/stylingFunctions'
import { HiArrowLeftEndOnRectangle } from 'react-icons/hi2'
import VariationDropdown from './supporting/VariationDropdown'
import { addToCart } from '../../../../features/cart/cartSlice'

const SingleStoreProductSection = () => {
    const { productId } = useParams<{ productId: string }>()
    const dispatch = useAppDispatch()
    const product = useAppSelector(state => state.products.selectedProduct)
    const isLoading = useAppSelector(state => state.products.isLoading)
    const settings = useAppSelector((state) => state.layoutSettings.singleProduct);
    const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
    const [specialRequest, setSpecialRequest] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        dispatch(
          addToCart({
            storeId: product.store, // Assuming `storeId` is part of the product object
            productId: product._id,
            quantity,
            specialRequest,
          })
        );
    };

    console.log(settings.details.addToCartBtn)
    
    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId))
        }
    }, [dispatch, productId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (status === 'failed' || !product) {
        return <div>Error loading product</div>
    }
    console.log(product)
    return (
        <div
            style={{
                ...getBackgroundStyles(settings.background),
            }}
            className='flex flex-col justify-between'
        >   
            {/* Back to home */}
            <div className="w-full flex flex-row items-center">
                <HiArrowLeftEndOnRectangle />
                <p>Back to Home</p>
            </div>
            {/* Image and Details */}
            <div className="flex flex-col justify-evenly items-center lg:flex lg:flex-row lg:justify-between">
                {/* Images */}
                <div
                    style={{
                        height: getResponsiveDimension(settings.details.background.height),
                    }} 
                    className="h-full w-[100%] lg:w-[50%] bg-white flex flex-col items-center justify-center"
                >
                    <img 
                        style={{
                            ...getBackgroundStyles(settings.images.background),
                            maxHeight: window.innerWidth <= 1024 ? "60vh" : "100",
                        }}
                        src={product.images[0]} alt="" className="object-cover" 
                    />
                </div>
                {/* Details */}
                <div 
                    style={{
                        ...getBackgroundStyles(settings.details.background),
                    }}
                    className="w-[100%] lg:w-[50%] min-h-fit flex flex-col justify-evenly"
                >
                    {/* Name and price */}
                    <div
                        style={{
                            
                        }} 
                        className={`${getSpacingClasses(settings.details.nameAndPrice.background.spacing)} flex flex-col justify-evenly`}
                    >
                        <h2 className="">{product.name}</h2>
                        <h2 className="">R{product.price}</h2>
                    </div>
                    {/* Variation selector */}
                    {product.variations.length > 0 && (
                        <div className="">
                            <label htmlFor="variation_selector" className="">
                                {settings.details.variationSelector.text.input} *
                            </label>
                            <VariationDropdown
                                variations={product.variations}
                                selectedVariation={selectedVariation}
                                onVariationChange={setSelectedVariation}
                            />
                        </div>
                    )}
                    {settings.details.messageBox.show && (
                        <div 
                            style={{
                                
                            }}
                            className="mt-4"
                        >
                            <label className="block">{settings.details.messageBox.titleInput}</label>
                            <textarea 
                                value={specialRequest}
                                onChange={(e) => setSpecialRequest(e.target.value)}
                                style={{
                                    
                                    ...getBorderStyles(settings.details.messageBox.border),
                                }}
                                className="w-full h-[13vh] p-2 mt-2"
                                placeholder={`${settings.details.messageBox.placeholder || "We'll do our best to accommodate any requests when possible"} `}
                            />
                        </div>
                    )}
                    {/* Quantity Updater */}
                    <div
                        style={{

                        }} 
                        className="flex items-center justify-between mt-4"
                    >
                        <span className="">Quantity</span>
                        <div 
                            style={{color: settings.details.quantityUpdator.color}}
                            className="flex items-center space-x-4"
                        >
                            <button
                                style={{...getBorderStyles(settings.details.quantityUpdator.border)}}
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                style={{...getBorderStyles(settings.details.quantityUpdator.border)}}
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    {/* Add to Cart Button */}
                    <button
                        style={{
                            ...getBorderStyles(settings.details.addToCartBtn.border),
                            backgroundColor: settings.details.addToCartBtn.backgroundColor
                        }}
                        onClick={handleAddToCart}
                        className="w-full mt-6 py-3 hover:scale-103"
                    >
                        Add to cart | R{Number(product.price) * quantity}
                    </button>
                    {/* Description */}
                    <p className="">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SingleStoreProductSection