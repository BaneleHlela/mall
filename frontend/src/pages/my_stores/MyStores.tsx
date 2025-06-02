import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStoresByOwner } from '../../features/stores/storeSlice';
import AddStore from "../../components/the_mall/my_stores/AddStore";
import MyStoreCard from '../../components/the_mall/my_stores/MyStoreCard';

const MyStores = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.stores);
  const userId = useAppSelector((state) => state.user.user?._id); // adjust based on your user state
  const myStoreIds = useAppSelector((state) => state.stores.myStoreIds);
  const myStoresById = useAppSelector((state) => state.stores.myStoresById);

  useEffect(() => {
    if (userId) {
      dispatch(fetchStoresByOwner(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="w-[98vw] min-h-screen bg-stone-100 flex flex-col justify-center items-center py-10">
      

      {isLoading && <p>Loading your stores...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {myStoreIds.length > 0 && !isLoading && (
        <div>
          <h1>My Stores</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {myStoreIds.map((id) => (
                <MyStoreCard key={id} store={myStoresById[id]} />
              ))}
            </div>
        </div>
      )}
      <div className="mt-10">
        <AddStore />
      </div>
    </div>
  );
};

export default MyStores;
