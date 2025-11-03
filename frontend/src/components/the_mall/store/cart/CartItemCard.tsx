import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { updateCart } from '../../../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { TbLoader3 } from 'react-icons/tb';


// ts errors and "any" types

interface CartItemCardProps {
    cartItem: any;
    storeId: string;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
    cartItem,
    storeId
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cart.loading); 
  
  const handleIncrease = () => {
    console.log('Increasing quantity for', cartItem.product.name);
    dispatch(
      updateCart({
        storeId,
        productId: cartItem.product._id,
        variation: cartItem.variation,
        quantity: cartItem.quantity + 1,
      })
    );
  };

  const handleDecrease = () => {
    const newQty = cartItem.quantity - 1;
    dispatch(
      updateCart({
        storeId,
        productId: cartItem.product._id,
        variation: cartItem.variation,
        quantity: newQty,
      })
    );
  };

  return (
    <div className='flex justify-between w-full h-[15vh] lg:h- bg-white p-[.35vh]'>
        {/* Image */}
        <div className="w-[35%] flex justify-center">
            <img 
                src={cartItem.product.images[0]} 
                alt={cartItem.product.name} 
                className="w-[90%] h-full object-cover rounded"
            />
        </div>
        {/* Details */}
        <div className="flex flex-col justify-evenly w-[65%] text-start px-[.4vh]">
            {/* Product name */}
            <p className="font-bold line-clamp-1">{cartItem.product.name}</p>
            {/* Product variation */}
            <p className="line-clamp-1">{cartItem.variation}</p>
            {/* Price */}
            <p className="font-semibold text-[90%]">R {cartItem.price.toFixed(2)}</p>
            {/* Quantity */}
            <div className="flex justify-evenly w-[30%] bg-gray-200 text-black rounded-[3vh]">
                <button onClick={handleDecrease} className="">{cartItem.quantity === 1 ? <RiDeleteBin7Fill className='text-[1.8vh]'/> : <FaMinus className='text-[1.3vh]'/>}</button>
                <p className='px-[.2vh]'>{loading ? <TbLoader3 className='animate-spin mx-auto' /> : cartItem.quantity}</p>
                <button onClick={handleIncrease} className=""><FaPlus className='text-[1.3vh]'/></button>
            </div>

        </div>
    </div>
  )
}

export default CartItemCard;