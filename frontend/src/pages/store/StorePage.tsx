import { Route, Routes, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import Menubar from '../../components/store_layout/menubars/Menubar';
import StoreHome from './home/StoreHome';
import StoreServices from './services/StoreServices';
import StorePackagesPage from './packages/StorePackagesPage';
import { useEffect } from 'react';
import { setCurrentStore } from '../../features/stores/storeSlice';
import { useAppDispatch } from '../../app/hooks';
import { fetchStoreServices } from '../../features/services/servicesSlice';


const StorePage = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const dispatch = useAppDispatch();
  const store = useSelector((state: RootState) => state.stores.storesById[storeId as string]);
  
  useEffect(() => {
    dispatch(setCurrentStore(store || null));
  }, [store]);


  if (!store) {
    return <div className="p-6 text-red-500">Store not found.</div>;
  }

  //Fetch products or services.
  if (store.trades === 2 ) {
    dispatch(fetchStoreServices(storeId as string));
  }

  return (
    <div className="h-screen w-screen bg-stone-200">
      <Menubar />
      <Routes>
        <Route path="/" element={<StoreHome />} />
        <Route path="/services" element={<StoreServices />} />
        <Route path="/packages" element={<StorePackagesPage />} />
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
