import React, { useEffect } from "react";
import { ShoppingCart, ShoppingBag, ShoppingBasket } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { FaCartPlus, FaCartShopping } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { TbPaperBag } from "react-icons/tb";
import { GiBeachBag } from "react-icons/gi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getUserCart } from "../../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

interface StoreMenubarCartProps {
  style: {
    variation: string;
    size: string;
    color: string;
    background?: {
      padding: string;
      color: string;
      border: {
        width: string;
        style: string;
        color: string;
        radius: string;
      };
    };
    count: {
      backgroundColor: string;
      color: string;
      border?: {
        width: string;
        style: string;
        color: string;
        radius: string;
      };
      scale?: number;
    };
    shadow?: string;
  };
}

const StoreMenubarCart: React.FC<StoreMenubarCartProps> = ({ style }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const cart = useAppSelector((state) => state.cart.cart);
  const store = useAppSelector((state) => state.stores.currentStore);
  const storeId = store?._id as string;

  // Fetch cart if user is logged in
  useEffect(() => {
    if (user) {
      dispatch(getUserCart({}));
    }
  }, [user, dispatch]);

  // Find the cart for the selected store
  const selectedStoreMenubarCart = cart?.find((c) => c.store == storeId);
  
  // Calculate total quantity for the selected store's cart
  const totalQuantity = selectedStoreMenubarCart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const renderIcon = () => {
    switch (style.variation) {
      case "default":
        return <FaShoppingCart style={{width: style.size, height: style.size}} color={style.color} />;
      case "bag":
        return <ShoppingBag style={{width: style.size, height: style.size}} color={style.color} />;
      case "basket":
        return <ShoppingBasket style={{width: style.size, height: style.size}} color={style.color} />;
      case "outline":
        return <IoCartOutline style={{width: style.size, height: style.size}} color={style.color} />;
      case "medical":
        return <FaCartPlus style={{width: style.size, height: style.size}} color={style.color} />;
      case "trolley2":
        return <FaCartShopping style={{width: style.size, height: style.size}} color={style.color} />;
      case "trolley3":
        return <ShoppingCart style={{width: style.size, height: style.size}} color={style.color} />;
      case "paperbag":
        return <TbPaperBag style={{width: style.size, height: style.size}} color={style.color} />;
      case "beachbag":
        return <GiBeachBag style={{width: style.size, height: style.size}} color={style.color} />;
      case "shoppingbag":
        return <LiaShoppingBagSolid style={{width: style.size, height: style.size}} color={style.color} />;
      default:
        return <FaShoppingCart style={{width: style.size, height: style.size}} color={style.color} />; 
    }
  };


  return (
    <div
      style={{
        padding: style.background?.padding,
        backgroundColor: style.background?.color,
        border: `${style.background?.border.width} ${style.background?.border.style} ${style.background?.border.color}`,
        borderRadius: style.background?.border.radius,
      }}
      onClick = {() => navigate(`/stores/${storeId}/cart`)}
      className={ `relative cursor-pointer w-fit`}
    >
      {renderIcon()}
      {/* Items count display */}
      <div
        className={`absolute bottom-0 right-0 text-[9px] pl-1 pr-1 rounded-[100%]
          ${style.shadow && "shadow-sm"}`}
        style={{
          backgroundColor: "black",
          transform: `scale(1.3)`,
          transformOrigin: "bottom right",
          color: "white",
        }}
      >
        {totalQuantity}
      </div>
    </div>
  );
};

export default StoreMenubarCart;