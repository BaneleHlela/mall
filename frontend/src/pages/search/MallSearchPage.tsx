import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import { fetchProductsBySearch } from '../../features/products/productsSlice';
import { fetchServicesBySearch } from '../../features/services/servicesSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { MdFilterList, MdClose } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import TheMallStoreFooterSection from '../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreFooterSection';
import SearchPostsFeed from '../../components/the_mall/search/SearchPostsFeed.tsx';
import { fetchSearchPosts } from '../../features/searchPosts/searchPostSlice.ts';
import MallSearchProductCard from '../../components/the_mall/search/search_results/MallSearchProductCard';
import MallSearchServiceCard from '../../components/the_mall/search/search_results/MallSearchServiceCard';

const relevanceOptions = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'top-rated', label: 'Top Rated' },
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'most-liked', label: 'Most Liked' },
  { key: 'nearest', label: 'Nearest' },
];

type SearchType = 'all' | 'stores' | 'products' | 'services';

const searchTypeOptions: { key: SearchType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'stores', label: 'Stores' },
  { key: 'products', label: 'Products' },
  { key: 'services', label: 'Services' },
];

const MallSearchPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading: storesLoading, storeSlugs, storesBySlug } = useAppSelector(
    (state: RootState) => state.stores
  );
  const { searchResults: productSearchResults, isLoading: productsLoading } = useAppSelector(
    (state: RootState) => state.products
  );
  const { searchResults: serviceSearchResults, isLoading: servicesLoading } = useAppSelector(
    (state: RootState) => state.services
  );
  const user = useAppSelector((state: RootState) => state.user.user);
  const departmentRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedSearchType, setSelectedSearchType] = useState<SearchType>('all');
  const [showAllStores, setShowAllStores] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  // Relevance dropdown states
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRelevance, setSelectedRelevance] = useState(relevanceOptions[0]);

  // Extract query parameters and update state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    const typeParam = (params.get('type') || 'all') as SearchType;
    const department = params.get('department') || null;
    setSearchTerm(query.trim());
    setSelectedSearchType(searchTypeOptions.some((option) => option.key === typeParam) ? typeParam : 'all');
    setSelectedDepartment(department);
  }, [location.search]);

  useEffect(() => {
    if (!searchTerm.trim() && !selectedDepartment) {
      return;
    }

    if (selectedSearchType === 'all' || selectedSearchType === 'stores') {
      dispatch(
        fetchStores({
          search: searchTerm,
          department: selectedDepartment || undefined,
          sortBy: selectedRelevance.key,
        })
      );
    }

    if ((selectedSearchType === 'all' || selectedSearchType === 'products') && searchTerm.trim()) {
      dispatch(fetchProductsBySearch({ search: searchTerm, limit: 20 }));
    }

    if ((selectedSearchType === 'all' || selectedSearchType === 'services') && searchTerm.trim()) {
      dispatch(fetchServicesBySearch({ search: searchTerm, limit: 20 }));
    }
  }, [dispatch, searchTerm, selectedDepartment, selectedRelevance, selectedSearchType]);

  // Fetch Search Posts (carousels, banners, etc.)
  useEffect(() => {
      dispatch(fetchSearchPosts());
  }, [dispatch]);

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

  // Scroll handlers for department selector
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleDepartmentSelect = (deptKey: string) => {
    setSelectedDepartment(deptKey === selectedDepartment ? null : deptKey);
  };

  const handleSelectRelevance = (option: { key: string; label: string }) => {
    setSelectedRelevance(option);
    setShowDropdown(false);
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSelectedSearchType(type);
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&type=${type}`);
  };

  const clearFilters = () => {
    setSelectedDepartment(null);
    setSearchTerm('');
    setSelectedRelevance(relevanceOptions[0]);
    setSelectedSearchType('all');
    navigate('/search');
  };

  const shouldShowStores = selectedSearchType === 'all' || selectedSearchType === 'stores';
  const shouldShowProducts = selectedSearchType === 'all' || selectedSearchType === 'products';
  const shouldShowServices = selectedSearchType === 'all' || selectedSearchType === 'services';
  const hasActiveFilters = searchTerm || selectedDepartment;
  const isLoading = storesLoading || productsLoading || servicesLoading;
  const totalResults =
    (shouldShowStores ? storeSlugs.length : 0) +
    (shouldShowProducts ? productSearchResults.length : 0) +
    (shouldShowServices ? serviceSearchResults.length : 0);

  const storesToDisplay = storeSlugs.slice(0, showAllStores ? storeSlugs.length : 6);
  const productsToDisplay = productSearchResults.slice(0, showAllProducts ? productSearchResults.length : 6);
  const servicesToDisplay = serviceSearchResults.slice(0, showAllServices ? serviceSearchResults.length : 6);

  return (
    <div className="relative w-full bg-white flex flex-col items-center">
      {/* Menubar */}
      <TheMallTopbar />
      <div className="w-[100vw] h-[14vh] min-h-[14vh]"></div>

      <div id="search-content" className="w-full lg:w-[80%] overflow-x-hidden hide-scrollbar flex flex-col">
        {/* Department Selector */}
        <div className="sticky top-0 lg:top-0 z-10 bg-white shadow-sm">
          <div className="relative flex items-center h-[7vh] min-h-[7vh] w-full">
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 h-full w-[5vh] bg-gradient-to-r from-white to-transparent flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="text-gray-600" size={22} />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex items-center overflow-x-auto hide-scrollbar space-x-1 lg:space-x-2 w-full h-full px-[6vh] relative"
            >
              <button
                onClick={() => setSelectedDepartment(null)}
                className={`whitespace-nowrap px-[1.4vh] py-[.6vh] text-[1.6vh] transition-all ${
                  selectedDepartment === null
                    ? 'bg-gray-900 text-white rounded-full'
                    : 'text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400'
                } font-[500]`}
              >
                All
              </button>
              <div className="h-[3vh] w-[1px] bg-gray-200" />
              {Object.entries(departments).map(([key, dept], index) => (
                <React.Fragment key={key}>
                  <button
                    ref={(el) => { departmentRefs.current[key] = el; }}
                    onClick={() => handleDepartmentSelect(key)}
                    className={`whitespace-nowrap px-[1.4vh] py-[.6vh] text-[1.6vh] transition-all ${
                      selectedDepartment === key
                        ? 'bg-gray-900 text-white rounded-full'
                        : 'text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 hover:border-gray-400'
                    } font-[500]`}
                  >
                    {dept.full}
                  </button>
                  {index < Object.entries(departments).length - 1 && (
                    <div className="h-[3vh] w-[1px] bg-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 h-full w-[5vh] bg-gradient-to-l from-white to-transparent flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="text-gray-600" size={22} />
            </button>
          </div>
        </div>

        {searchTerm && (
          <div className="bg-white border-b border-gray-200 px-[1vh] lg:px-[2vh] py-[2vh] space-y-4">
            <div className="w-full flex flex-col gap-[1.5vh] lg:flex-row lg:justify-between lg:items-center">
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 text-[1.8vh]">
                  <span className="font-semibold text-gray-900">{totalResults}</span>
                  {' '}results for{' '}
                  <span className="font-semibold text-gray-900">"{searchTerm}"</span>
                </p>
                <p className="text-gray-500 text-[1.5vh]">
                  {shouldShowStores && `${storeSlugs.length} store${storeSlugs.length === 1 ? '' : 's'}`} 
                  {shouldShowProducts && `${productSearchResults.length} product${productSearchResults.length === 1 ? '' : 's'}`} 
                  {shouldShowServices && `${serviceSearchResults.length} service${serviceSearchResults.length === 1 ? '' : 's'}`}
                </p>
              </div>

              <div className="flex flex-row items-center justify-end gap-[1.5vh] w-full lg:w-auto flex-wrap">
                <div className="relative">
                  <div
                    onClick={() => setShowDropdown(prev => !prev)}
                    className="flex justify-between w-[22vh] cursor-pointer items-center space-x-[1vh] py-[1vh] border border-gray-300 rounded-lg px-[1.5vh] bg-white hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-medium text-[1.5vh] text-gray-700">
                      {selectedRelevance.label}
                    </p>
                    <IoMdArrowDropdown 
                      className={`text-gray-500 transition-transform text-[2vh] ${showDropdown ? 'rotate-180' : ''}`} 
                    />
                  </div>

                  {showDropdown && (
                    <div className="absolute right-0 w-[22vh] bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden mt-1">
                      {relevanceOptions.map(option => (
                        <div
                          key={option.key}
                          onClick={() => handleSelectRelevance(option)}
                          className={`px-[1.5vh] py-[1.2vh] text-[1.5vh] cursor-pointer transition-colors ${
                            selectedRelevance.key === option.key 
                              ? 'bg-gray-100 font-medium text-gray-900' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="flex items-center gap-[.8vh] px-[1.5vh] py-[1vh] border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                  <MdFilterList className="text-gray-600 text-[2vh]" />
                  <span className="text-[1.5vh] font-medium text-gray-700">Filters</span>
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-[.5vh] px-[1.2vh] py-[1vh] text-[1.4vh] text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <MdClose className="text-[1.8vh]" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {searchTypeOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleSearchTypeChange(option.key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedSearchType === option.key
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDepartment && (
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-[2vh] py-[2vh] flex items-center justify-between">
            <div className="flex items-center gap-[1.5vh]">
              <div className="w-[1vh] h-[4vh] bg-amber-400 rounded-full" />
              <div>
                <h2 className="font-semibold text-[2.2vh]">{departments[selectedDepartment as keyof typeof departments]?.full}</h2>
                <p className="text-[1.4vh] text-gray-300">{departments[selectedDepartment as keyof typeof departments]?.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDepartment(null)}
              className="p-[1vh] hover:bg-white/10 rounded-full transition-colors"
            >
              <MdClose className="text-[2.2vh]" />
            </button>
          </div>
        )}

        <div className="w-full px-[1vh] py-[2vh] space-y-10">
          {isLoading && !searchTerm ? (
            <div className="flex flex-col items-center justify-center py-[10vh]">
              <div className="w-[5vh] h-[5vh] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
              <p className="mt-[2vh] text-gray-500 text-[1.6vh]">Loading results...</p>
            </div>
          ) : null}

          {shouldShowStores && (
            <section>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Stores</h2>
                  <p className="text-sm text-gray-500">{storeSlugs.length} store{storeSlugs.length === 1 ? '' : 's'} found</p>
                </div>
                {storeSlugs.length > 6 && (
                  <button
                    onClick={() => setShowAllStores((value) => !value)}
                    className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    {showAllStores ? 'Show Less' : 'View More'}
                  </button>
                )}
              </div>

              {storeSlugs.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                  No stores match your search.
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {storesToDisplay.map((slug) => (
                    <StoreCard
                      key={slug}
                      store={storesBySlug[slug]}
                      user={user}
                      allowShadow
                      mini={window.innerWidth < 640}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {shouldShowProducts && (
            <section>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
                  <p className="text-sm text-gray-500">{productSearchResults.length} product{productSearchResults.length === 1 ? '' : 's'} found</p>
                </div>
                {productSearchResults.length > 6 && (
                  <button
                    onClick={() => setShowAllProducts((value) => !value)}
                    className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    {showAllProducts ? 'Show Less' : 'View More'}
                  </button>
                )}
              </div>

              {productSearchResults.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                  No products match your search.
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {productsToDisplay.map((product) => (
                    <MallSearchProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </section>
          )}

          {shouldShowServices && (
            <section>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
                  <p className="text-sm text-gray-500">{serviceSearchResults.length} service{serviceSearchResults.length === 1 ? '' : 's'} found</p>
                </div>
                {serviceSearchResults.length > 6 && (
                  <button
                    onClick={() => setShowAllServices((value) => !value)}
                    className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    {showAllServices ? 'Show Less' : 'View More'}
                  </button>
                )}
              </div>

              {serviceSearchResults.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                  No services match your search.
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {servicesToDisplay.map((service) => (
                    <MallSearchServiceCard key={service._id ?? service.slug} service={service} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        <TheMallStoreFooterSection />
      </div>
    </div>
  );
};

export default MallSearchPage;
