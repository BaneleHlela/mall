import cupcake from "../../../../../assets/cupcake.png";
import StoreProductCard from "../../../extras/cards/product/StoreProductCard";

const images = [cupcake, cupcake, cupcake, cupcake, cupcake];

const FirstOrderOnlineSection = () => {
  return (
    <div>
      {/* Mobile */}
      <div className="">
        {/* Title and short description */}
        <div className="w-full bg-amber-300">
          <h1 className="">Order Now</h1>
          <p className="">
            You can order online! Browse our menu items and choose what you’d
            like to order from us.
          </p>
        </div>
        {/* Accepting Order button (red if closed, orange if pickup only, green if both) */}
        <div className="w-full bg-amber-600">
          <button className="">Accepting Orders</button>
        </div>
        {/* Pickup and Delivery button */}
        <div className="bg-pink-300">
          <button className="">Pickup</button>
          <button className="">Delivery</button>
        </div>
        {/* Categories */}
        <div className="border-b-2">Cupcakes (selected category)</div>
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

export default FirstOrderOnlineSection;