import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from "../../../../../utils/stylingFunctions";
import AcceptingOrdersButton from "../../../extras/buttons/AcceptingOrdersButton";
import StoreProductCard from "../../../extras/cards/product/StoreProductCard";
import CategorySelector from "../../../extras/category_selector/CategorySelector";
import { fetchStoreProducts } from "../../../../../features/products/productsSlice";
import type { Product } from "../../../../../types/productTypes";
import ProductModal from "../../../extras/modals/ProductModal";


const FirstStoreProductsSection = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings.products);
  const store = useAppSelector((state) => state.stores.currentStore);
  const storeId = store ? store._id : null;

  const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);
  const products = useAppSelector((state) => state.products.products)
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to track the selected product;
  

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product); 
  };

  
  const closeModal = () => {
    setSelectedProduct(null); 
  };

  useEffect(() => {
    if (storeId) {
      if (selectedCategory === "all") {
        dispatch(fetchStoreProducts({ storeId }));
      } else {
        dispatch(fetchStoreProducts({ storeId, category: selectedCategory }));
      }
    }
  }, [storeId, selectedCategory, dispatch]);


  return (
    <div
      style={{
        ...getBackgroundStyles(settings.background), 
      }}
      className=""
    >
      <div className={`w-full pb-10 ${selectedProduct && "blur-sm"}`}>
        {/* Image */}
        {settings.image.display && (
          <div className="">
            <img src={settings.image.url} alt="order-online-image" className="w-full h-[35vh] object-cover" />
          </div>
        )}
        {/* ...rest */}
        <div className="pl-1 pr-1">
          {/* Title and short description */}
          <div className="w-full mt-5 mb-5">
            <h1 
              style={{
                ...getTextStyles(settings.title), 
              }}
              className={`
                  ${settings.title.position === "center" && "text-center"}
                  ${settings.title.position === "end" && "text-end"}
                  ${settings.title.position === "start" && "text-start"}
                `}
            >
              {settings.title.input || "Order Now"}
            </h1>
            <p 
              style={{
                ...getTextStyles(settings.shortDescription),
              }}
              className={`
                ${settings.shortDescription.position === "center" && "text-center"}
                ${settings.shortDescription.position === "end" && "text-end"}
                ${settings.shortDescription.position === "start" && "text-start"}
              `}
            >
              {settings.shortDescription.input || "You can order online! Browse our menu items and choose what you’d like to order from us."}
            </p>
          </div>
          {/* Accepting Order button (red if closed, orange if pickup only, green if both) */}
          <div className={`w-full flex flex-col justify-center 
              ${settings.acceptingOrdersButton.position === "center" && "items-center"}
              ${settings.acceptingOrdersButton.position === "end" && "items-end"}
              ${settings.acceptingOrdersButton.position === "start" && "items-start"}
            mb-2`}>
            <AcceptingOrdersButton operationTimes={store?.operationTimes} manualStatus={store?.manualStatus} style={settings.acceptingOrdersButton} />
          </div>
          {/* Categories */}
          <div className="w-full py-4 flex flex-row justify-center">
            <CategorySelector categories={store?.categories.products || []} style={settings.categorySelector} />
          </div>
          {/* Render a StoreProductCard for each image */}
          <div
            style={{
              gap: getResponsiveDimension(settings.productsDisplay.grid.gap),
            }} 
            className={`grid 
              ${settings.productsDisplay.grid.columns.mobile === 1 && "grid-cols-1"}
              ${settings.productsDisplay.grid.columns.mobile === 2 && "grid-cols-2"}
              ${settings.productsDisplay.grid.columns.desktop === 3 && "lg:grid-cols-3"}
              ${settings.productsDisplay.grid.columns.desktop === 4 && "lg:grid-cols-4"} 
              ${settings.productsDisplay.grid.columns.desktop === 5 && "lg:grid-cols-5"} 
              sm:grid-cols-2`
            } 
         >
          {products.length > 0 ? (
            products.map((product) => (
              <div className="h-full">
                <StoreProductCard
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.images && product.images.length > 0 ? product.images[0] : ""}
                  description={product.description}
                  style={settings.productCard}
                  onClick={() => handleProductClick(product)}
                />
              </div>
              
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4 mb-4">
              No product found matching this category.
            </p>
          )}
          </div>
        </div>
      </div>
      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} style={settings.productModal} />
      )}
    </div>
  );
};

export default FirstStoreProductsSection;