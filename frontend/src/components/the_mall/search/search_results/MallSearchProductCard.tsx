import React from 'react';
import type { Product } from '../../../../types/productTypes';

interface MallSearchProductCardProps {
  product: Product;
  onClick?: () => void;
}

const formatPriceWithSpaces = (price?: number): string => {
  if (typeof price !== 'number') return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const MallSearchProductCard: React.FC<MallSearchProductCardProps> = ({ product, onClick }) => {
  const mainImage = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png';

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-stone-100">
        <img
          src={mainImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-base font-semibold text-gray-900 line-clamp-2">{product.name}</p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <p className="mt-3 text-sm font-semibold text-gray-900">
          {typeof product.price === 'number'
            ? `R${formatPriceWithSpaces(product.price)}`
            : 'Contact for price'}
        </p>
      </div>
    </div>
  );
};

export default MallSearchProductCard;
