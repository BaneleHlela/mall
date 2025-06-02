import { ShoppingBasket } from "lucide-react";

const FirstCartAndWishlist = () => {
  return (
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mr-2">
      <ShoppingBasket
        size={36}
        color="#000"
        className="cursor-pointer hover:scale-125 transition-transform"
      />
    </div>
  );
};

export default FirstCartAndWishlist;