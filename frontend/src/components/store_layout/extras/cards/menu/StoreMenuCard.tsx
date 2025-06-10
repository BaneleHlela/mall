import FirstStoreMenuCard from "./first/FirstStoreMenuCard";

interface StoreMenuCardProps {
    image: string;
    name: string;
    description: string;
    price: number;
}

const StoreMenuCard: React.FC<StoreMenuCardProps>  = ({ image, name, description, price }) => {
  return (
    <FirstStoreMenuCard image={image} price={price} description={description} name={name} />
  )
}

export default StoreMenuCard;