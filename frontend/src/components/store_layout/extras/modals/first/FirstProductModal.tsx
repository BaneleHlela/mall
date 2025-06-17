import { IoClose } from "react-icons/io5";
import { useState } from "react";
import type { ProductModalProps } from "../ProductModal";
import { getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import { useAppDispatch } from "../../../../../app/hooks";
import { addToCart } from "../../../../../features/cart/cartSlice";

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, style }) => {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [specialRequest, setSpecialRequest] = useState("");

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

    return (
        <div 
            style={{ 
                ...getTextStyles(style.text.rest)
            }}
            className="fixed inset-0 w-screen h-screen bg-opacity-50 flex items-center justify-center z-100 overflow-scroll"
        >
            <div className="relative h-full w-full max-w-[900px] bg-white shadow-md">
                {/* Exit Icon */}
                <button
                    style={{
                        color: style.exitButton.color,
                        backgroundColor: style.exitButton.backgroundColor
                    }}
                    className="absolute shadow-md p-2 top-4 right-4 text-gray-500 rounded-full bg-white hover:text-gray-800"
                    onClick={onClose}
                >
                    <IoClose size={30} />
                </button>

                {/* Product Image */}
                <img
                    src={product.images?.[0] ?? ""}
                    alt={product.name}
                    className="w-full h-[40%] object-cover"
                />

                {/* Product Details */}
                <div className={`pl-6 pr-6 ${style.text.textCenter ? "text-center" : ""}`}>
                    <h2 style={{ ...getTextStyles(style.text.productName.mobile) }} className="mt-3">
                        {product.name}
                    </h2>
                    <p style={{
                        ...getTextStyles(style.text.description),
                     }}>
                        {product.description}
                    </p>
                    {/* Special Request Message Box */}
                    <div 
                        style={{
                            ...getTextStyles(style.text.rest),
                         }}
                        className="mt-4"
                    >
                        <label className="block">{style.messageBox.titleInput}</label>
                        <textarea 
                            value={specialRequest}
                            onChange={(e) => setSpecialRequest(e.target.value)}
                            style={{
                                ...getTextStyles(style.text.rest),
                                ...getBorderStyles(style.messageBox.border),
                            }}
                            className="w-full h-[13vh] p-2 mt-2"
                            placeholder="We'll do our best to accommodate any requests when possible"
                        />
                    </div>
                </div>

                {/* Quantity and add to cart */}
                <div className="p-6">
                    {/* Quantity Updater */}
                    <div
                        style={{...getTextStyles(style.text.rest),}} 
                        className="flex items-center justify-between mt-4"
                    >
                        <span className="">Quantity</span>
                        <div 
                            style={{color: style.cartUpdator.color}}
                            className="flex items-center space-x-4"
                        >
                            <button
                                style={{...getBorderStyles(style.cartUpdator.border)}}
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                style={{...getBorderStyles(style.cartUpdator.border)}}
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
                            ...getBorderStyles(style.addToCartBtn.border),
                            ...getTextStyles(style.text.addToCartBtn),
                            backgroundColor: style.addToCartBtn.backgroundColor
                        }}
                        onClick={handleAddToCart}
                        className="w-full mt-6 py-3 hover:scale-103"
                    >
                        Add to cart | R{Number(product.price) * quantity}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
