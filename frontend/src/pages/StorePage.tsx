import { Routes, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import Menubar from '../components/store_layout/menubars/Menubar';


const StorePage = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const store = useSelector((state: RootState) => state.stores.storesById[storeId]);


  if (!store) {
    return <div className="p-6 text-red-500">Store not found.</div>;
  }

  return (
    <div className="h-screen w-screen bg-stone-200">
      <Menubar />
      <Routes>
        {/* <Route path="/" element={<StoreOverview store={store} />} /> */}
        {/* <Route path="/products" element={<ProductsList storeId={store._id} />} /> */}
        {/* <Route path="/orders" element={<OrdersList storeId={store._id} />} /> */}
        {/* <Route path="/customers" element={<CustomersList storeId={store._id} />} /> */}
        {/* Add more routes as needed */}
      </Routes>
      {/* <h1 className="text-2xl font-bold">
        Viewing store: {store.name}, ID: {store._id?.toString()}
      </h1> */}
    </div>
  );
};

export default StorePage;
