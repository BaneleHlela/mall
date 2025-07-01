import FirstStoreProductCard from "./first/FirstStoreProductCard";

export interface StoreProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number | string;
  style: any;
  onClick?: () => void; // Optional click handler
}

const StoreProductCard: React.FC<StoreProductCardProps> = ({ image, name, description, price, style, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer"> 
      <FirstStoreProductCard
        image={image}
        name={name}
        description={description}
        price={price}
        style={style}
      />
    </div>
  );
};

export default StoreProductCard;