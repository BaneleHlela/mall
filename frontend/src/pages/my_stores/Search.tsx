import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import GlobalSearch from '../../components/the_mall/search/GlobalSearch';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import type { RootState } from '../../app/store';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useAppDispatch();
  const { isLoading, error, storeIds, storesById } = useAppSelector(
    (state: RootState) => state.stores
  );
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  useEffect(() => {
    if (query || selectedDepartment) {
      dispatch(fetchStores({
        search: query,
        department: selectedDepartment || undefined
      }));
    }
  }, [dispatch, query, selectedDepartment]);

  const handleSearch = (term: string) => {
    setSearchParams({ q: term });
  };

  const handleDepartmentFilter = (deptKey: string) => {
    const newDepartment = deptKey === selectedDepartment ? null : deptKey;
    setSelectedDepartment(newDepartment);
    
    // Update URL params to include department
    if (newDepartment) {
      setSearchParams({ q: query, dept: newDepartment });
    } else {
      setSearchParams({ q: query });
    }
  };

  // We don't need to filter here anymore since the backend handles it
  const filteredStoreIds = storeIds;

  return (
    <div className="min-h-screen w-full bg-stone-50 flex flex-col">
      {/* Topbar */}
      <nav className="w-[100vw] h-[15vh] bg-black flex flex-col items-center lg:h-[9vh]">
        <TheMallTopbar />
      </nav>
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-6 pb-20">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        <div className="mb-8">
          <GlobalSearch 
            placeholder="Search for stores, products, services..." 
            className="max-w-2xl"
            onSearch={handleSearch}
            initialValue={query}
          />
        </div>

        {/* Department filters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Filter by department:</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(departments).map(([key, dept]) => (
              <button
                key={key}
                onClick={() => handleDepartmentFilter(key)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedDepartment === key 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                {dept.full}
              </button>
            ))}
          </div>
        </div>

        {query && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {isLoading ? 'Searching...' : `Results for "${query}"`}
              {selectedDepartment && departments[selectedDepartment as keyof typeof departments] &&
                ` in ${departments[selectedDepartment as keyof typeof departments].full}`}
            </h2>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <p>Loading results...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : filteredStoreIds.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">No results found for "{query}"</p>
            <p className="text-gray-400 mt-2">Try different keywords or check your spelling</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStoreIds.map((id) => (
              <StoreCard key={id} store={storesById[id]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;