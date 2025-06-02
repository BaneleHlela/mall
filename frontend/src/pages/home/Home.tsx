import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/StoreCard';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, storeIds, storesById } = useAppSelector(
    (state: RootState) => state.stores
  );

  const [searchTerm, setSearchTerm] = useState('');

  // Debounced fetch for search
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchStores(searchTerm)); // send search term to backend
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch, searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Stores</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search stores..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading stores...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : storeIds.length === 0 ? (
        <p className="text-center text-gray-500">No stores found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeIds.map((id) => (
            <StoreCard key={id} store={storesById[id]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
