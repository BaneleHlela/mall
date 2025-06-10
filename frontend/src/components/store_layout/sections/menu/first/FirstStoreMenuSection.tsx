import FirstStoreMenuCard from "../../../extras/cards/menu/first/FirstStoreMenuCard";
import cupcake from "../../../../../assets/cupcake.png";

const images = [cupcake, cupcake, cupcake, cupcake, cupcake];

const FirstStoreMenuSection = () => {
  return (
    <div className="m-3 bg-amber-300">
      {/* Mobile */}
      <div className="">
        {/* Menu (replacing "flavors") */}
        <div className="">Menu</div>
        {/* Category */}
        <div className="">Cupcakes</div>
        {/* Render a StoreMenuCard for each image */}
        {images.map((image, index) => (
          <FirstStoreMenuCard
            key={index} // Use index as the key
            image={image}
            price={9}
            name={`Cupcake ${index + 1}`} // Dynamically generate name
            description={`Delicious cupcake ${index + 1}`} // Dynamically generate description
          />
        ))}
      </div>
    </div>
  );
};

export default FirstStoreMenuSection;