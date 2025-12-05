import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import AcceptingOrdersButton from "../../../extras/buttons/AcceptingOrdersButton";
import StoreProductCard from "../../../extras/cards/product/StoreProductCard";
import CategorySelector from "../../../extras/category_selector/CategorySelector";
import { fetchStoreProducts } from "../../../../../features/products/productsSlice";
import type { Product } from "../../../../../types/productTypes";
import { X } from "lucide-react";
import ProductModal from "../../../extras/modals/ProductModal";


const FirstStoreOrderOnlineSection = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings.order);
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
        backgroundColor: settings.backgroundColor || "#f3f4f6", 
      }}

    >
      {/* Mobile */}
      <div className={`w-full pb-10 ${selectedProduct && "blur-sm"}`}>
        {/* Image */}
        {settings.image.display && (
          <div className="">
            <img src={settings.image.url} alt="order-online-image" className="w-full h-[37vh] object-cover" />
          </div>
        )}
        {/* ...rest */}
        <div className="pl-1 pr-1">
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
            <AcceptingOrdersButton operationTimes={store?.operationTimes} manualStatus={store?.manualStatus} style={settings.categorySelector} />
          </div>
          {/* Categories */}
          <div className="pt-4 pb-4">
            <CategorySelector categories={store?.categories.products || []} style={settings.categorySelector} />
          </div>
          {/* Render a StoreProductCard for each image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <StoreProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.images && product.images.length > 0 ? product.images[0] : ""}
                description={product.description}
                style={settings.productCard}
                onClick={() => handleProductClick(product)}
              />
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

export default FirstStoreOrderOnlineSection;