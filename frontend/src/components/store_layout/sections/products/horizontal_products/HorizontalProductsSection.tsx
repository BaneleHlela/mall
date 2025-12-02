import React from 'react'
import { useAppSelector } from '../../../../../app/hooks'
import { useNavigate } from 'react-router-dom';
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import SecondProductCard from '../../../extras/cards/product/second/SecondProductCard';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HorizontalProductsSection = () => {
  const config = useAppSelector((state) => state.layoutSettings.sections.products);
  const colors = useAppSelector((state) => state.layoutSettings.colors);
  const products = useAppSelector((state) => state.products.products);
  const store = useAppSelector((state) => state.stores.currentStore);
  const navigate = useNavigate();

  const handleProductClick = (productSlug: string) => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('layouts')) {
      navigate(`/layouts/${store?.slug}/preview/product/${productSlug}`);
    } else if (store?.slug) {
      navigate(`/stores/${store.slug}/product/${productSlug}`);
    }
  };

  return (
    <div
      id="products"
      style={{
        '--swiper-pagination-color': colors[config.text.header.color as keyof typeof colors],
        '--swiper-pagination-bullet-inactive-color': colors[config.text.header.color as keyof typeof colors] + "55",
        '--swiper-navigation-color': colors[config.text.header.color as keyof typeof colors],
        ...getBackgroundStyles(config.background),
      }}
      className="w-full pl-2 h-fit border-y-2"
    >
      <p
        style={{
          ...getTextStyles(config.text.header),
        }}
      >
        {config.text.header.input}
      </p>
      <div className="h-[80%] hidden lg:flex space-x-[2vh] ml-2">
          {products.map((product) => (
              <SecondProductCard
                key={product._id}
                title={product.name}
                imageUrl={product.images[0]}
                price={product.price}
                prices={product.prices}
                marking={product.marking}
                style={config.card}
                onClick={() => handleProductClick(product.slug)}
              />
          ))}
      </div>
      {window.innerWidth < 786 && (
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={15}
          grabCursor={true}
          pagination={{ clickable: true }}
          navigation={false}
          className="my-3 lg:hidden"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <SecondProductCard
                title={product.name}
                imageUrl={product.images[0]}
                price={product.price}
                prices={product.prices}
                marking={product.marking}
                style={config.card}
                onClick={() => handleProductClick(product.slug)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default HorizontalProductsSection;
