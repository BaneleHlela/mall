import React from "react";
import { ShoppingCart, ShoppingBag, ShoppingBasket } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { FaCartPlus, FaCartShopping } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { TbPaperBag } from "react-icons/tb";
import { GiBeachBag } from "react-icons/gi";
import { LiaShoppingBagSolid } from "react-icons/lia";

interface StoreCartProps {
  style: {
    variation: string;
    size: number;
    color: string;
    background: {
      padding: string;
      backgroundColor: string;
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
      border: {
        width: string;
        style: string;
        color: string;
        radius: string;
      };
      scale: number;
    };
    shadow: string;
  };
}

const StoreCart: React.FC<StoreCartProps> = ({ style }) => {
  const renderIcon = () => {
    switch (style.variation) {
      case "default":
        return <FaShoppingCart size={style.size} color={style.color} />;
      case "bag":
        return <ShoppingBag size={style.size} color={style.color} />;
      case "basket":
        return <ShoppingBasket size={style.size} color={style.color} />;
      case "outline":
        return <IoCartOutline size={style.size} color={style.color} />;
      case "medical":
        return <FaCartPlus size={style.size} color={style.color} />;
      case "trolley2":
        return <FaCartShopping size={style.size} color={style.color} />;
      case "trolley3":
        return <ShoppingCart size={style.size} color={style.color} />;
      case "paperbag":
        return <TbPaperBag size={style.size} color={style.color} />;
      case "beachbag":
        return <GiBeachBag size={style.size} color={style.color} />;
      case "shoppingbagsolid":
        return <LiaShoppingBagSolid size={style.size} color={style.color} />;
      default:
        return <FaShoppingCart size={style.size} color={style.color} />; 
    }
  };


  return (
    <div
      style={{
        padding: style.background.padding,
        backgroundColor: style.background.backgroundColor,
        border: `${style.background.border.width} ${style.background.border.style} ${style.background.border.color}`,
        borderRadius: style.background.border.radius,
      }}
      className={ `relative cursor-pointer w-fit`}
    >
      {renderIcon()}
      {/* Items count display */}
      <div
        className={`absolute bottom-0 right-0 text-[9px] pl-1 pr-1 rounded-[100%]
          ${style.shadow && "shadow-sm"}`}
        style={{
          backgroundColor: style.count.backgroundColor,
          border: `${style.count.border.width} ${style.count.border.style} ${style.count.border.color}`,
          transform: `scale(${style.count.scale})`,
          transformOrigin: "bottom right",
          color: style.count.color,
        }}
      >
        9
      </div>
    </div>
  );
};

export default StoreCart;