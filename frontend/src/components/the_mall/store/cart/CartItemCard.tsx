import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { updateCart } from '../../../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { TbLoader3 } from 'react-icons/tb';
import { HiOutlineTrash } from 'react-icons/hi2';


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
  const loading = useAppSelector((state) => state.cart.isLoading); 
  const { isDarkMode } = useAppSelector((state) => state.theme);
  
  const handleIncrease = () => {
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

  const handleDelete = () => {
    dispatch(
      updateCart({
        storeId,
        productId: cartItem.product._id,
        variation: cartItem.variation,
        quantity: 0,
      })
    );
  };

  return (
    <div className={`flex justify-between w-full min-h-[20vh] h-fit ${isDarkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'} p-3 rounded-[25px] border border-gray-300 space-x-2`}>
        {/* Image */}
        <div className="w-[35%] flex justify-center">
            <img 
                src={cartItem.product.images[0]} 
                alt={cartItem.product.name} 
                className="w-full aspect-square h-full object-cover rounded-[10px]"
            />
        </div>
        {/* Details */}
        <div className="flex flex-col justify-between space-y-1 w-[65%] text-start px-[.4vh]">
            {/* Product name */}
            <p style={{lineHeight: "1"}} className="font-semibold text-lg">{cartItem.product.name}</p>
            {/* Product variation */}
            <p style={{lineHeight: "1"}} className="line-clamp-2 capitalize">{cartItem.variation}</p>
            {/* Price */}
            <p className="font-semibold text-[90%]">R{cartItem.price.toFixed(2)}</p>
            {/* Add items or delete */}
            <div className="flex items-center justify-between w-full">
              {/* Quantity */}
              <div className="flex justify-evenly w-[40%] bg-gray-200 text-black rounded-[3vh] px-3 py-1">
                  <button onClick={handleDecrease} className="">{cartItem.quantity === 1 ? <RiDeleteBin7Fill className='text-[1.8vh]'/> : <FaMinus className='text-[1.3vh]'/>}</button>
                  <p className='px-[.2vh]'>{loading ? <TbLoader3 className='animate-spin mx-auto' /> : cartItem.quantity}</p>
                  <button onClick={handleIncrease} className=""><FaPlus className='text-[1.3vh]'/></button>
              </div>
              {/* Delete Button */}
              <button onClick={handleDelete} className="bg-red-500/20 text-red-500 p-2 rounded-full">
                <HiOutlineTrash className="text-[2.5vh]"/>
              </button>
            </div>
        </div>
    </div>
  )
}

export default CartItemCard;