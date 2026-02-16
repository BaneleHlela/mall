import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { fetchStoreProducts } from '../../../../../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import AcceptingOrdersButton from '../../../extras/buttons/AcceptingOrdersButton';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import VerySimpleProductCard from '../shared_store_products_sections_components/VerySimpleProductCard';

const ProductsWithVerySimpleCard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const config = useAppSelector((state) => state.layoutSettings.sections.products);
    const { colors, fonts } = useAppSelector((state) => state.layoutSettings);
    const store = useAppSelector((state) => state.stores.currentStore);
    const storeSlug = store ? store.slug : null;

    const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);
    const products = useAppSelector((state) => state.products.products);

    useEffect(() => {
        if (storeSlug) {
          if (selectedCategory === "all") {
            dispatch(fetchStoreProducts({ storeSlug }));
          } else {
            dispatch(fetchStoreProducts({ storeSlug, category: selectedCategory }));
          }
        }
      }, [storeSlug, selectedCategory, dispatch]);

    const handleProductClick = (productSlug: string) => {
        const currentUrl = window.location.href;

        if (currentUrl.includes('layouts')) {
          navigate(`/layouts/${store?.slug}/preview/product/${productSlug}`);
        } else if (store && store.slug) {
          navigate(`/stores/${store.slug}/product/${productSlug}`);
        } else {
          console.error('Store ID is not available');
        }
      };


    return (
        <div id="product" style={{...getBackgroundStyles(config.background, colors)}} className='w-full h-full'>
            {/* Heading + Subheading */}
            <div className="w-full">
                <UnderlinedText style={config.text.heading} />
                
                {config.text.subheading.input && (
                <UnderlinedText style={config.text.subheading} />
                )}
            </div>

            {/* Accepting Order button (red if closed, orange if pickup only, green if both) */}
            <div className={`w-full flex flex-col justify-center 
                ${config.acceptingOrdersButton.position === "center" && "items-center"}
                ${config.acceptingOrdersButton.position === "end" && "items-end"}
                ${config.acceptingOrdersButton.position === "start" && "items-start"}
                mb-2 py-[1vh]`}>
                <AcceptingOrdersButton operationTimes={store?.operationTimes} manualStatus={store?.manualStatus} style={config.acceptingOrdersButton} />
            </div>
            {/* Pickup or Delivery Button */}
            <div
              style={{
                ...getBackgroundStyles(config.pickupOrDelivery.background, colors),
                padding: "0px"
              }} 
              className="flex w-[80%] lg:w-[30%] border overflow-hidden">
              {/* Pickup */}
              <div 
                style={{
                  ...getBackgroundStyles(config.pickupOrDelivery.background, colors),
                  border: "none",
                  borderRight: `${config.pickupOrDelivery.background.border.width} ${config.pickupOrDelivery.background.border.style} ${colors[config.pickupOrDelivery.background.border.color as keyof typeof colors]}`,
                  width: "50%",
                  borderRadius: "0px",
                }} className="w-1/2 text-center bg-blue-100">Pickup</div>
              {/* Deliver */}
              <div
                style={{
                    ...getBackgroundStyles(config.pickupOrDelivery.background, colors),
                    border: "none",
                    borderLeft: `${config.pickupOrDelivery.background.border.width} ${config.pickupOrDelivery.background.border.style} ${colors[config.pickupOrDelivery.background.border.color as keyof typeof colors]}`,
                    width: "50%",
                    borderRadius: "0px",
                }} className="w-1/2 text-center">Deliver</div>
            </div>
            {/* Category Selector */}
            {store?.categories?.products && config.categorySelector.show && (
              <div className="w-full py-4 flex flex-row justify-center">
                <CategorySelector
                  categories={store?.categories?.products || []}
                  style={config.categorySelector}
                />
              </div>
            )}
            {/* Products sort by category */}
            {store?.categories?.products?.map((category) => {
              const categoryProducts = products.filter(product => product.category === category);
              if (categoryProducts.length === 0) return null;

              const categoryDividerStyle = getTextStyles(config.categoryDivider, fonts, colors);

              return (
                <div key={category} className="w-full">
                  <p
                    style={{
                      ...categoryDividerStyle,
                    }}
                    className="capitalize">
                    {category}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.map((product) => (
                      <VerySimpleProductCard
                        key={product.slug}
                        product={product}
                        colors={colors}
                        fonts={fonts}
                        style={config.card}
                        onClick={handleProductClick}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

        </div>
    )
}

export default ProductsWithVerySimpleCard

