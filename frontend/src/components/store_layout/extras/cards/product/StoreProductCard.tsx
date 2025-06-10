import FirstStoreProductCard from "./first/FirstStoreProductCard";

export interface StoreProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number | string;
}

const StoreProductCard: React.FC<StoreProductCardProps> = ({ image, name, description, price }) => {
  return (
    <div>
      <FirstStoreProductCard image={image} name={name} description={description} price={price} />
    </div>
  )
}

export default StoreProductCard