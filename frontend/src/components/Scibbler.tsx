import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchStoreProducts } from "../features/products/productsSlice";


const StoreProducts = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  const fetchProducts = () => {
    dispatch(fetchStoreProducts({ storeId: '684c15bca0f98a1d13a7ff00', category: 'cupcakes' }));
  };

  return (
    <div>
      <button onClick={fetchProducts}>Fetch Store Products</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreProducts;