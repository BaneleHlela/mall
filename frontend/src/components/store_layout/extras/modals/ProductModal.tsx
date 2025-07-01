import FirstProductModal from "./first/FirstProductModal";

export interface ProductModalProps {
    product: {
        store?: string;
        _id: string;
        name: string;
        images: string[];
        description: string;
        price: number | string;
    };
    onClose: () => void;
    style: any;
}
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, style }) => {
  return (
    <FirstProductModal product={product} onClose={onClose} style={style} />
  )
}

export default ProductModal