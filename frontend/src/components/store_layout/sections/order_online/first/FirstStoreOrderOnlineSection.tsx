import { useAppSelector } from "../../../../../app/hooks";
import cupcake from "../../../../../assets/cupcake.png";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import AcceptingOrdersButton from "../../../extras/buttons/AcceptingOrdersButton";
import PickupDeliveryToggle from "../../../extras/buttons/PickupDeliveryButton";
import StoreProductCard from "../../../extras/cards/product/StoreProductCard";
import CategorySelector from "../../../extras/category_selector/CategorySelector";

const images = [cupcake, cupcake, cupcake, cupcake, cupcake];

const FirstStoreOrderOnlineSection = () => {
  const settings = useAppSelector((state) => state.layoutSettings.order);
  const store = useAppSelector((state) => state.stores.currentStore);

  const handleToggle = (value: 'pickup' | 'delivery') => {
    console.log('User selected:', value);
    // You can add logic here like setting a form field, updating global state, etc.
  };


  return (
    <div
      style={{
        backgroundColor: settings.backgroundColor || "#f3f4f6", 
      }}
      className=""
    >
      {/* Mobile */}
      <div className="w-100vw">
        {/* Image */}
        {settings.image.display && (
          <div className="">
            <img src={settings.image.url} alt="order-online-image" className="w-full h-[37vh] object-cover" />
          </div>
        )}
        {/* Title and short description */}
        <div className="w-full mt-5 mb-5">
          <h1 
            style={{
              ...getTextStyles(settings.title.style.mobile), 
            }}
            className=""
          >
            {settings.title.input || "Order Now"}
          </h1>
          <p 
            style={{
              ...getTextStyles(settings.shortDescription.style.mobile),
            }}
            className=""
          >
            {settings.shortDescription.input || "You can order online! Browse our menu items and choose what you’d like to order from us."}
          </p>
        </div>
        {/* Accepting Order button (red if closed, orange if pickup only, green if both) */}
        <div className="w-full pb-4">
          <AcceptingOrdersButton operationTimes={store?.operationTimes} style={settings.acceptingOrdersButton} />
        </div>
        {/* Pickup and Delivery button */}
        <div className="pt-3">
          <PickupDeliveryToggle initial="pickup" onChange={handleToggle} />
        </div>
        {/* Categories */}
        <div className="p-4">
          <CategorySelector categories={store?.categories.products || []} />
        </div>
        {/* Render a StoreProductCard for each image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <StoreProductCard
              key={index} // Use index as the key
              image={image}
              name={`Cupcake ${index + 1}`} // Dynamically generate name
              price={9 + index} // Dynamically generate price
              description={`Delicious cupcake ${index + 1}`} // Dynamically generate description
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstStoreOrderOnlineSection;