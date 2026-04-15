import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import CartItemCard from "../../components/the_mall/store/cart/CartItemCard";
import { getUserCart } from "../../features/cart/cartSlice";
import { fetchStoreBySlug } from "../../features/stores/storeSlice";
import { createOrder, updateOrderStatus } from "../../features/orders/orderSlice";
import LoadingButton from "../../components/the_mall/buttons/LoadingButton";
import { BiArrowBack } from "react-icons/bi";

const StoreCartModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storeSlug = searchParams.get('store');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const carts = useAppSelector((state) => state.cart.cart); // array of carts per store
  const storesBySlug = useAppSelector((state) => state.stores.storesBySlug);
  const routes = useAppSelector((state) => state.layoutSettings.routes);
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const isStoreLoading = useAppSelector((state) => state.stores.isLoading);
  const [isDelivery, setIsDelivery] = useState(true);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch store if not in Redux
  useEffect(() => {
    if (storeSlug && !storesBySlug[storeSlug]) {
      dispatch(fetchStoreBySlug(storeSlug));
    }
  }, [storeSlug, storesBySlug, dispatch]);

  // Fetch user cart for this store
  useEffect(() => {
    if (user && storeSlug) {
      const store = storesBySlug[storeSlug];
      if (store) {
        dispatch(getUserCart());
      }
    }
  }, [user, storeSlug, storesBySlug, dispatch]);

  // Scroll to bottom on mount
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTo(0, modalRef.current.scrollHeight);
    }
  }, []);

  const store = storeSlug ? storesBySlug[storeSlug] : null;

  if (isLoading || isStoreLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`animate-spin rounded-full h-8 w-8 border-2 ${isDarkMode ? 'border-gray-600 border-t-white' : 'border-gray-200 border-t-gray-800'}`} />
      </div>
    );
  }

  if (!store) {
    return <>Store not found...</>;
  }

  // Find the cart for the current store
  const storeCart = carts?.find((c) => c.store._id === store._id);

  // --- Handle "Back to home" navigation ---
  const handleBackToHome = () => {
    navigate(-1); // Navigate back to mall cart page
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login")
    } else {
      setShowPaymentOptions(true);
    }
  }

  const notifyVendor = async (order: any, store:any) => {
    // Email notification (existing)
    await fetch(`${import.meta.env.VITE_API_URL}/api/email/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destinationEmail: store.vendorEmail,
        subject: 'New Order Received',
        message: `Order ID: ${order._id}\nTotal: R${order.totalPrice}\nItems: {order.items.length}`,
      }),
    });

    // WhatsApp notification
    if (store) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: `whatsapp:+27823587199`,  // E.g., 'whatsapp:+1234567890'
          message: `New order received! Order ID: ${order._id}. Total: R${order.totalPrice}. Check your dashboard.`,
        }),
      });
    }
  };

  const handlePayment = async ({method}: {method: string}) => {
    if (method === "cash") {
      // Create Order
      try {

        console.log("paying with cash")
        const shippingAddress = isDelivery && user?.locations?.length ? {
          nickname: user.locations[0].nickname,
          lat: user.locations[0].lat,
          lng: user.locations[0].lng,
          address: user.locations[0].address,
        } : undefined;

        if (!shippingAddress && isDelivery) {
          window.alert("Please add shipping address");
        }

        const order = await dispatch(createOrder({
          storeId: store._id as string,
          paymentMethod: 'cash',
          deliveryOption: isDelivery ? 'Delivery' : 'Pick Up',
          shippingAddress,
        })).unwrap();

        // For cash, mark as paid since payment is immediate
        await dispatch(updateOrderStatus({
          orderId: order._id,
          paymentStatus: 'Paid',
        }));

        // Notify vendor
        await notifyVendor(order, store);

        // Close payment options
        setShowPaymentOptions(false);

        // Navigate back or to order confirmation
        navigate(-1); // Go back to mall cart page
      } catch (error) {
        console.error('Failed to create order:', error);
        // Handle error (maybe show toast)
      }
    };

    if (method === "online") {
      console.log("online")
    };
  };

  if (!storeCart || storeCart.items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-white">
        <div className="text-center space-y-4">
          <p className="text-gray-700 text-[2.2vh] font-medium">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/search")}
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
    <div ref={modalRef} className={`flex flex-col relative item-center w-full h-screen overflow-y-scroll lg:w-[80%] max-w-md py-[2vh] ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'} hide-scrollbar pb-8`}>
      {/* Back Button & Header */}
      <div className="relative flex items-center justify-center w-full">
        <BiArrowBack onClick={() => navigate(-1)} className={`absolute left-3 rounded-full ${isDarkMode ? ' bg-[#1f1f23] border-gray-800' : 'bg-gray-100 border-gray-200 text-gray-900'} p-2 text-[35px]`}/>
        <span className="text-lg">Cart</span>
      </div>

      {/* Store Name */}
      <p onClick={() => navigate(`/stores/${store.slug}`)} className="font-semibold text-[2.5vh] py-[1vh] text-center px-3 line-clamp-1 mb-3">
        {store.name}
      </p>

      {/* Address Section */}
      <div
        onClick={() => {
          if (user) {
            navigate('/account?section=addresses');
          } else {
            navigate('/login');
          }
        }}
        className={`max-w-full mx-3 mb-4 p-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg 
          ${ isDarkMode
            ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800'
            : 'bg-white border-gray-200 text-gray-900 hover:bg-blue-50 hover:border-blue-300'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
            }`}>
              <span className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>📍</span>
            </div>
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Delivery Address
              </p>
              <p className={`text-sm font-semibold truncate ${
                user?.locations?.length ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
              }`}>
                {user?.locations?.length ? user.locations[0].address : 'Set Address'}
              </p>
            </div>
          </div>
          <svg
            className={`w-4 h-4 transition-transform hover:translate-x-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Pickup Or Delivery */}
      <div className={`flex items-center justify-center mx-3 mb-5 rounded-[10px] border overflow-hidden ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
        <button
          onClick={() => setIsDelivery(true)}
          className={`flex-1 py-3 px-4 transition-colors font-medium ${
            isDelivery
              ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
              : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
          }`}
        >
          Deliver
        </button>
        <div className={`w-[1px] h-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
        <button
          onClick={() => setIsDelivery(false)}
          className={`flex-1 py-3 px-4 transition-colors font-medium ${
            !isDelivery
              ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
              : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
          }`}
        >
          Collect
        </button>
      </div>
      {/* Cart Items */}
      <div className="space-y-2 px-3 max-h-[50vh] pb-[10vh] lg:max-h-none overflow-y-scroll">
        {storeCart.items.map((item) => (
          <CartItemCard
            key={item._id}
            cartItem={item}
            storeId={store._id as string}
          />
        ))}
      </div>
      <div className={`absolute bottom-[7vh] flex flex-col items-center justify-center w-full px-3 pt-1 border-t border-dotted
          ${ isDarkMode
            ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800'
            : 'bg-white border-gray-200 text-gray-900 hover:bg-blue-50 hover:border-blue-300'}
        `}>
        <div className="w-full text-end mb-2 p-1 text-[15px] font-semibold ">
          <p className="">Subtotal: R{storeCart.totalPrice.toFixed(2)}</p>
          <p className="">Shipping: R{40.00}</p>
          {/* <p className="">Subtotal: R {(storeCart.totalPrice + 40).toFixed(2)}</p> */}
        </div>
        <LoadingButton
          label={`Checkout | R ${(storeCart.totalPrice + 40).toFixed(2)}`}
          onClick={handleCheckout}
          isLoading={isLoading}
          className={`flex justify-center items-center w-full h-[6vh] p-[.8vh] border-gray-200 rounded-full shadow-md ${isDarkMode ? 'bg-white text-black' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        />
      </div>

      {showPaymentOptions && (
        <div className="absolute inset-0 bg-black/25 flex items-end pb-[5vh] lg:pb-0 justify-center z-50 transition-opacity duration-300 opacity-100">
          <div className={`bg-white rounded-t-3xl p-6 w-full max-w-md transform transition-transform duration-300 ease-out ${showPaymentOptions ? 'translate-y-0' : 'translate-y-full'}`}>
            <h2 className="text-center text-lg font-semibold mb-4">Choose Payment Method</h2>
            <button onClick={() => handlePayment({method: "cash"})} className="w-full bg-green-500 text-white py-3 rounded-full mb-2">Pay with Cash | {(storeCart.totalPrice + 40).toFixed(2)}</button>
            <button onClick={() => handlePayment({method: "online"})} className="w-full bg-blue-500 text-white py-3 rounded-full mb-2">Pay Online | {(storeCart.totalPrice + 40).toFixed(2)}</button>
            <button onClick={() => setShowPaymentOptions(false)} className="w-full text-gray-600 py-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreCartModal;
