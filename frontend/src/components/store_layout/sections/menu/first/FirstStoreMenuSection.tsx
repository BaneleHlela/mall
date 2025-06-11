import FirstStoreMenuCard from "../../../extras/cards/menu/first/FirstStoreMenuCard";
import { useAppSelector } from "../../../../../app/hooks";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import CategorySelector from "../../../extras/category_selector/CategorySelector";


const FirstStoreMenuSection = ({}) => {
  const settings = useAppSelector((state) => state.layoutSettings.menu);
  const images = settings.images;
  return (
    <div 
      style={{
        backgroundColor: settings.backgroundColor,
      }}
      className="w-full flex flex-row justify-center"
    >
      {/* Mobile */}
      <div className="md:hidden">
        {/* Menu (replacing "flavors") */}
        <div 
          style={{
            ...getTextStyles(settings.text.menuText.style.mobile),
          }}
          className="text-center">{settings.text.menuText.input}</div>
        {/* Category */}
        <div 
          style={{
            ...getTextStyles(settings.text.categoryText.mobile),
          }}
          className="text-center"
        >
            Cupcakes
        </div>
        {/* Render a StoreMenuCard for each image */}
        {images.map((image: string, index: string) => (
          <FirstStoreMenuCard
            key={index} // Use index as the key
            storeCardStyle={settings.storeCard}
            image={image}
            price={9}
            name={`Cupcake ${index + 1}`} // Dynamically generate name
            description={`Delicious cupcake ${index + 1}`} // Dynamically generate description
          />
        ))}
      </div>
      {/* Desktop */}
      <div className="hidden w-full lg:block p-12">
        {/* Title */}
        <div 
          style={{
            ...getTextStyles(settings.text.menuText.style.desktop),
          }}
          className="text-center"
        >
            {settings.text.menuText.input}
        </div>
        {/* Category */}
        <div 
          style={{
            ...getTextStyles(settings.text.categoryText.desktop),
          }}
          className="text-center"
        >
            <CategorySelector categories={["this", "that", "this and that"]} />
        </div>
        {/* Items grid */}
        <div className="grid grid-cols-3 gap-6 mt-6 justify-center">
          {images.map((image: string, index: string) => (
            <FirstStoreMenuCard
              key={index}
              storeCardStyle={settings.storeCard}
              image={image}
              price={9}
              name={`Cupcake ${index + 1}`} // Dynamically generate name
              description={`Delicious cupcake ${index + 1}`} // Dynamically generate description
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstStoreMenuSection;