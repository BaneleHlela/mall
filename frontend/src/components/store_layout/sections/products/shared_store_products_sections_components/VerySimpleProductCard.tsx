import type React from "react";
import type { Product } from "../../../../../types/productTypes";
import type { Fonts } from "../../../../../types/layoutTypes";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";

interface VerySimpleProductCardProps {
  product: Product;
  style: {
    background: {
      padding?: {
        y: {
          mobile: string;
          desktop: string;
        };
        x: {
          mobile: string;
          desktop: string;
        };
      };
      height?: {
        mobile: string;
        desktop: string;
      };
      border?: {
        width: string;
        style: string;
        color: string;
        radius: string;
      }
    };
    text: any;
  }
  colors?: Record<string, string>;
  fonts?: Fonts;
  onClick?: (slug: string) => void;
}

const VerySimpleProductCard: React.FC<VerySimpleProductCardProps> = ({
  product,
  style,
  colors,
  fonts,
  onClick
}) => {
  // --- Determine what price to show ---
  const displayPrice = () => {
    if (product.prices && product.prices.length > 0) {
        const amounts = product.prices.map(p => p.amount);
        const minPrice = Math.min(...amounts);
        const maxPrice = Math.max(...amounts);

        // If all variation prices are the same
        if (minPrice === maxPrice) {
        return `R${formatPriceWithSpaces(minPrice)}${minPrice % 1 === 0 ? '.00' : ''}`;
        }
        return `R${formatPriceWithSpaces(minPrice)}${minPrice % 1 === 0 ? '.00' : ''} - R${formatPriceWithSpaces(maxPrice)}${maxPrice % 1 === 0 ? '.00' : ''}`;
    }
    if (typeof product.price === 'number') {
        return `R${formatPriceWithSpaces(product.price)}${product.price % 1 === 0 ? '.00' : ''}`;
    }
      return '';
    };

  return (
    <div
      style={{
        ...getBackgroundStyles(style.background, colors),
      }}
      className="flex flex-col justify-between cursor-pointer min-h-fit"
      onClick={() => onClick && onClick(product.slug)}
    >
      {/* Name and description */}
      <div className="">
        {/* Name */}
        <p
          style={{
            ...getTextStyles(style.text.name, fonts, colors),
          }}
        >
          {product.name}
        </p>
        {/* Description */}
        <p
          style={{
            ...getTextStyles(style.text.description, fonts, colors),
          }}
          className="line-clamp-2 lg:line-clamp-3"
        >
          {product.description}
        </p>
      </div>
      {/* Price */}
      <p
        style={{
          ...getTextStyles(style.text.price, fonts, colors),
        }}
      >
        {displayPrice()}
      </p>
    </div>
  )
}

export default VerySimpleProductCard;

export function formatPriceWithSpaces(price?: number): string {
    if (typeof price !== 'number') return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}