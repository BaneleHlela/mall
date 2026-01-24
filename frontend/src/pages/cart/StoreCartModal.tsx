import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import CartItemCard from "../../components/the_mall/store/cart/CartItemCard";
import { getUserCart } from "../../features/cart/cartSlice";
import LoadingButton from "../../components/the_mall/buttons/LoadingButton";

// ts errors

const StoreCartModal = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const carts = useAppSelector((state) => state.cart.cart); // array of carts per store
  const store = useAppSelector((state) => state.stores.currentStore);
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const isLoading = useAppSelector((state) => state.cart.isLoading);

  // Fetch user cart
  useEffect(() => {
    if (user && storeId) {
      dispatch(getUserCart({ storeId }));
    }
  }, [user, storeId, dispatch]);
  
  if (!store) {
    return <>Store not found...</>;
  }

  // Find the cart for the current store
  const storeCart = carts?.find((c) => c.store === store._id);

  // --- Handle "Back to home" navigation ---
  const handleBackToHome = () => {
    const productStore = storeCart?.store || storeId;
    const productsRoute = routes.products?.url || "products"; // Default to "products" if not found in routes

    // Determine the correct navigation path
    const basePath = `/stores/${productStore}`;
    const fullPath = routes.products?.url === "/products" 
        ? `${basePath}${productsRoute}#products` 
        : `${basePath}#products`;

    navigate(fullPath); // Navigate to the determined path
  };

  if (!storeCart || storeCart.items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-white">
        <div className="text-center space-y-4">
          <p className="text-gray-700 text-[2.2vh] font-medium">
            Your cart is empty
          </p>
          <button
            onClick={handleBackToHome}
            className="bg-black text-white px-[2.5vh] py-[1.2vh] rounded-[.6vh] text-[2vh] hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const payWithPayFast = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/payfast/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: "ORDER123",
        amount: 500,
        email: "buyer@email.com",
        paymentType: "product",
      }),
    });
  
    const data = await res.json();
  
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.paymentUrl;
  
    Object.entries(data.paymentData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });
  
    document.body.appendChild(form);
    form.submit();
  };  

  return (
    <div className="flex flex-col relative item-center w-screen h-screen overflow-y-scroll lg:w-[80%] max-w-md py-[2vh] bg-white hide-scrollbar">
      {/* Back Button */}
      <div
        onClick={handleBackToHome}
        className="ml-[.5vh] bg-black text-white w-fit flex flex-row items-center cursor-pointer border rounded-[.35vh] px-[.2vh] my-[1vh]"
      >
        <HiArrowLeftEndOnRectangle />
        <p className="ml-[.5vh] pr-[.5vh] text-white">Back</p>
      </div>

      {/* Store Name */}
      <p className="font-bold text-[3vh] py-[1vh] px-[.5vh] bg-white">
        {store.name}
      </p>

      {/* Cart Items */}
      <div className="bg-stone-100 space-y-[.5vh]">
        {storeCart.items.map((item) => (
          <CartItemCard
            key={item._id}
            cartItem={item}
            storeId={store._id as string}
          />
        ))}
      </div>
      <LoadingButton
        label="Checkout"
        onClick={payWithPayFast}
        isLoading={isLoading}
        className="absolute flex justify-center bottom-0 bg-black text-white w-full h-[8vh] p-[.8vh] border-t-3 border-gray-200"
      />
    </div>
  );
};

export default StoreCartModal;
