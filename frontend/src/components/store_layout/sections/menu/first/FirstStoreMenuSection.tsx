import FirstStoreMenuCard from "../../../extras/cards/menu/first/FirstStoreMenuCard";
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import CategorySelector from "../../../extras/category_selector/CategorySelector";
import { useEffect } from "react";
import { fetchStoreProducts } from "../../../../../features/products/productsSlice";


const FirstStoreMenuSection = ({}) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings.menu);
  const store = useAppSelector((state) => state.stores.currentStore);
  const storeId = store ? store._id : null;
  
  const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);
  const products = useAppSelector((state) => state.products.products);
  
  useEffect(() => {
    if (storeId) {
      if (selectedCategory === "all") {
        // Fetch all store products
        dispatch(fetchStoreProducts({ storeId }));
      } else {
        // Fetch products filtered by category
         dispatch(fetchStoreProducts({ storeId, category: selectedCategory }));
      }
    }
  }, [storeId, selectedCategory, dispatch]);
  
  
  return (
    <div 
      style={{
        backgroundColor: settings.backgroundColor,
      }}
      className="w-full flex flex-row justify-center"
    >
      {/* Mobile */}
      <div className="w-full md:hidden">
        {/* Menu (replacing "flavors") */}
        <div 
          style={{
            ...getTextStyles(settings.text.menuText.style.mobile),
          }}
          className="text-center">{settings.text.menuText.input}</div>
        {/* Category */}
        <div 
          style={{
            ...getTextStyles(settings.text.categoryText.desktop),
          }}
          className="w-full overflow-hidden bg-white text-center"
        >
            <CategorySelector categories={store?.categories.products || []} />
        </div>
        {/* Render a StoreMenuCard for each image */}
        {products.length > 0 ? (
            products.map((product) => (
              <FirstStoreMenuCard
                key={product._id}
                storeCardStyle={settings.storeCard}
                name={product.name}
                price={product.price}
                image={product.images && product.images.length > 0 ? product.images[0] : ''} // Display the first image or an empty string if no images exist
                description={product.description}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4 mb-4">No product found matching this category.</p>
          )}
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
            <CategorySelector categories={store?.categories.products || []} />
        </div>
        {/* Render a StoreMenuCard for each image */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {products.length > 0 ? (
            products.map((product) => (
              <FirstStoreMenuCard
                key={product._id}
                storeCardStyle={settings.storeCard}
                name={product.name}
                price={product.price}
                image={product.images && product.images.length > 0 ? product.images[0] : ''} // Display the first image or an empty string if no images exist
                description={product.description}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No product found matching this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstStoreMenuSection;