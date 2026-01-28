import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import StoresBundle from './StoresBundle';
import { useLocation } from 'react-router-dom';
import { MdFilterList } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';

const relevanceOptions = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'top-rated', label: 'Top Rated' },
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'most-liked', label: 'Most Liked' },
  { key: 'nearest', label: 'Nearest' },
];

const MallSearchPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isLoading, error, storeIds, storesById } = useAppSelector(
    (state: RootState) => state.stores
  );
  const user = useAppSelector((state: RootState) => state.user.user);
  const departmentRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const allStores = useAppSelector((state: RootState) => {
    const { storeIds, storesById } = state.stores;
    return storeIds.map(id => storesById[id]);
  });

  // Group + sort + slice top 5 per department
  const topStoresByDepartment = Object.keys(departments).reduce(
    (acc: Record<string, typeof allStores>, deptKey) => {
      const deptStores = allStores
        .filter(store => store.departments?.includes(deptKey))
        .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // highest rated first
        .slice(0, 5);

      if (deptStores.length > 0) {
        acc[deptKey] = deptStores;
      }
      return acc;
    },
    {}
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Relevance dropdown states
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRelevance, setSelectedRelevance] = useState(relevanceOptions[0]);

  // Extract query parameter and update searchTerm
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    setSearchTerm(query.trim());
  }, [location.search]);

  // Fetch stores whenever searchTerm, department, or relevance changes
  useEffect(() => {
    if (searchTerm || selectedDepartment) {
      dispatch(
        fetchStores({
          search: searchTerm,
          department: selectedDepartment || undefined,
          sortBy: selectedRelevance.key, // Pass selected relevance to backend
        })
      );
    }
  }, [dispatch, searchTerm, selectedDepartment, selectedRelevance]);

  // Scroll to selected department button on change
  useEffect(() => {
    if (selectedDepartment && departmentRefs.current[selectedDepartment]) {
      departmentRefs.current[selectedDepartment]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedDepartment]);

  // ✅ Determine if we are in search mode
  const isSearchMode = searchTerm.length > 0;

  // Handle selecting relevance option
  const handleSelectRelevance = (option: { key: string; label: string }) => {
    setSelectedRelevance(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col items-center">
      {/* Menubar */}
      <nav className="w-[100vw] h-[15vh] z-11 sticky inset-0 bg-gray-900 flex flex-col items-center lg:h-[10vh]">
        <TheMallTopbar />
      </nav>

      <div className={`w-full lg:w-[80%] overflow-x-hidden hide-scrollbar space-y-[5vh]`}>
        {/* Search details */}
        {searchTerm && (
          <div className="relative flex flex-row justify-between mt-[5vh] w-full py-[1vh]">
            <p className="">
              {storeIds.length} results found for{' '}
              <span className="font-semibold">{searchTerm}</span>
            </p>
            <div className="w-1/2 flex flex-row justify-end items-center space-x-[1vh] relative">
              {/* Relevance dropdown */}
              <div className="relative">
                <div
                  onClick={() => setShowDropdown(prev => !prev)}
                  className="flex justify-between w-[20vh] cursor-pointer items-center space-x-[5vh] py-[.5vh] border-[.1vh] rounded-[.3vh] shadow-sm px-[1vh] bg-white hover:bg-gray-100 transition"
                >
                  <p className="font-semibold font-[Outfit]">
                    {selectedRelevance.label}
                  </p>
                  <IoMdArrowDropdown className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </div>

                {showDropdown && (
                  <div className="absolute right-0 w-[20vh] bg-white border rounded-[.3vh] shadow-lg z-10 overflow-hidden">
                    {relevanceOptions.map(option => (
                      <div
                        key={option.key}
                        onClick={() => handleSelectRelevance(option)}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          selectedRelevance.key === option.key ? 'bg-gray-50 font-medium' : ''
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter button */}
              <div className="p-[.5vh] hover:bg-gray-100 cursor-pointer rounded">
                <MdFilterList className="text-[3vh]" />
              </div>
            </div>
            <span className="absolute -bottom-0 w-[100%] h-[.1vh] bg-black"></span>
          </div>
        )}

        {/* Render Posters and Department Bundles only when NOT in search mode */}
        {!isSearchMode && (
          <>
            {/* Posters */}
            <div className="hidden flex-col lg:flex-row justify-between w-full lg:h-[45vh] mt-[4vh]">
              {/* Poster A */}
              <div className="relative h-[20vh] lg:h-full lg:w-[49.5%]">
                <img
                  src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/pexels-toan-d-cong-680842095-28671808.jpg"
                  alt="poster"
                  className="w-full h-[20vh] lg:h-full object-cover"
                />
                <div className="absolute inset-0 w-full h-[20vh] lg:h-full bg-black opacity-25" />
              </div>

              {/* Poster B */}
              <div className="relative h-[20vh] lg:h-full lg:w-[49.5%]">
                <img
                  src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/kk.jpg"
                  alt="poster"
                  className="w-full h-[20vh] lg:h-full object-cover"
                />
                <div className="absolute inset-0 w-full h-full bg-black opacity-0" />
              </div>
            </div>

            {/* Department bundles */}
            {/* <div className="space-y-[5vh]">
              {Object.entries(topStoresByDepartment).map(([deptKey, stores]) => (
                <StoresBundle
                  key={deptKey}
                  department={deptKey}
                  stores={stores}
                  title={departments[deptKey].full}
                />
              ))}
            </div> */}
          </>
        )}

        {/* Search Results */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading stores...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : storeIds.length === 0 ? (
          <p className="text-center text-gray-500">No stores found.</p>
        ) : (
          <div className="px-[1vh] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-[2vh]">
            {storeIds.map(id => (
              <StoreCard 
                key={id} 
                store={storesById[id]} 
                user={user} 
                allowShadow 
                mini={window.innerWidth < 640}
              />
            ))}
          </div>
        )}
        <footer className="text-center py-8 text-gray-600 text-sm border-t mt-6 mb-[10vh]">
          © {new Date().getFullYear()} The Mall — Concept by Banele Hlela.
        </footer>
      </div>
      
    </div>
  );
};

export default MallSearchPage;
