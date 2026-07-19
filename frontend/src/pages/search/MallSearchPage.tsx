import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import { fetchProductsBySearch } from '../../features/products/productsSlice';
import { fetchServicesBySearch } from '../../features/services/servicesSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { MdFilterList, MdClose } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import TheMallStoreFooterSection from '../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreFooterSection';
import SearchPostsFeed from '../../components/the_mall/search/SearchPostsFeed.tsx';
import { fetchSearchPosts } from '../../features/searchPosts/searchPostSlice.ts';
import MallSearchProductCard from '../../components/the_mall/search/search_results/MallSearchProductCard';
import MallSearchServiceCard from '../../components/the_mall/search/search_results/MallSearchServiceCard';

// Sort vocabulary is intentionally asymmetric across result types - top-rated/most-liked/nearest
// only meaningfully affect Stores, but sending them for Products/Services degrades gracefully
// (the backend falls back to relevance/newest for unrecognized sort keys per resource).
const relevanceOptions = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'top-rated', label: 'Top Rated' },
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'most-liked', label: 'Most Liked' },
  { key: 'most-viewed', label: 'Most Viewed' },
  { key: 'nearest', label: 'Nearest' },
];

type SearchType = 'all' | 'stores' | 'products' | 'services';

const searchTypeOptions: { key: SearchType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'stores', label: 'Stores' },
  { key: 'products', label: 'Products' },
  { key: 'services', label: 'Services' },
];

const RESULTS_PER_PAGE = 20;

const MallSearchPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isLoading: storesLoading,
    storeSlugs,
    storesBySlug,
    searchPage: storesPage,
    searchPages: storesPages,
    searchTotal: storesTotal,
  } = useAppSelector((state: RootState) => state.stores);
  const {
    searchResults: productSearchResults,
    isLoading: productsLoading,
    searchPage: productsPage,
    searchPages: productsPages,
    searchTotal: productsTotal,
  } = useAppSelector((state: RootState) => state.products);
  const {
    searchResults: serviceSearchResults,
    isLoading: servicesLoading,
    searchPage: servicesPage,
    searchPages: servicesPages,
    searchTotal: servicesTotal,
  } = useAppSelector((state: RootState) => state.services);
  const user = useAppSelector((state: RootState) => state.user.user);
  const departmentRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tagsDraft, setTagsDraft] = useState('');

  // Canonical /search contract, read directly from the URL - single source of truth,
  // no mirrored local state to drift out of sync with a bookmarked/shared link.
  const searchTerm = (searchParams.get('query') || '').trim();
  const typeParam = searchParams.get('type');
  const selectedSearchType = (searchTypeOptions.some((o) => o.key === typeParam) ? typeParam : 'all') as SearchType;
  const selectedDepartment = searchParams.get('department');
  const selectedTags = searchParams.get('tags') || '';
  const sortParam = searchParams.get('sort');
  const selectedSort = relevanceOptions.some((o) => o.key === sortParam) ? (sortParam as string) : relevanceOptions[0].key;
  const selectedRelevanceLabel = relevanceOptions.find((o) => o.key === selectedSort)?.label ?? relevanceOptions[0].label;

  useEffect(() => {
    setTagsDraft(selectedTags);
  }, [selectedTags]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next);
  };

  // Fetch page 1 of every in-scope result type whenever a filter changes. "Load More"
  // (below) fetches subsequent pages directly, without touching the URL.
  useEffect(() => {
    const hasAnyFilter = !!(searchTerm || selectedDepartment || selectedTags);
    if (!hasAnyFilter) return;

    if (selectedSearchType === 'all' || selectedSearchType === 'stores') {
      dispatch(
        fetchStores({
          query: searchTerm || undefined,
          department: selectedDepartment || undefined,
          tags: selectedTags || undefined,
          sort: selectedSort,
          page: 1,
          limit: RESULTS_PER_PAGE,
        })
      );
    }

    if (selectedSearchType === 'all' || selectedSearchType === 'products') {
      dispatch(
        fetchProductsBySearch({
          query: searchTerm || undefined,
          tags: selectedTags || undefined,
          sort: selectedSort,
          department: selectedDepartment || undefined,
          page: 1,
          limit: RESULTS_PER_PAGE,
        })
      );
    }

    if (selectedSearchType === 'all' || selectedSearchType === 'services') {
      dispatch(
        fetchServicesBySearch({
          query: searchTerm || undefined,
          sort: selectedSort,
          department: selectedDepartment || undefined,
          page: 1,
          limit: RESULTS_PER_PAGE,
        })
      );
    }
  }, [dispatch, searchTerm, selectedDepartment, selectedTags, selectedSort, selectedSearchType]);

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

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleDepartmentSelect = (deptKey: string) => {
    updateParams({ department: deptKey === selectedDepartment ? null : deptKey });
  };

  const handleSelectRelevance = (key: string) => {
    updateParams({ sort: key });
    setShowDropdown(false);
  };

  const handleSearchTypeChange = (type: SearchType) => {
    updateParams({ type: type === 'all' ? null : type });
  };

  const applyTagsFilter = () => {
    updateParams({ tags: tagsDraft.trim() || null });
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    setTagsDraft('');
    setShowFilters(false);
  };

  const loadMoreStores = () => {
    dispatch(
      fetchStores({
        query: searchTerm || undefined,
        department: selectedDepartment || undefined,
        tags: selectedTags || undefined,
        sort: selectedSort,
        page: storesPage + 1,
        limit: RESULTS_PER_PAGE,
      })
    );
  };

  const loadMoreProducts = () => {
    dispatch(
      fetchProductsBySearch({
        query: searchTerm || undefined,
        tags: selectedTags || undefined,
        sort: selectedSort,
        department: selectedDepartment || undefined,
        page: productsPage + 1,
        limit: RESULTS_PER_PAGE,
      })
    );
  };

  const loadMoreServices = () => {
    dispatch(
      fetchServicesBySearch({
        query: searchTerm || undefined,
        sort: selectedSort,
        department: selectedDepartment || undefined,
        page: servicesPage + 1,
        limit: RESULTS_PER_PAGE,
      })
    );
  };

  const shouldShowStores = selectedSearchType === 'all' || selectedSearchType === 'stores';
  const shouldShowProducts = selectedSearchType === 'all' || selectedSearchType === 'products';
  const shouldShowServices = selectedSearchType === 'all' || selectedSearchType === 'services';
  const hasActiveFilters = !!(searchTerm || selectedDepartment || selectedTags);
  const isLoading = storesLoading || productsLoading || servicesLoading;
  const totalResults =
    (shouldShowStores ? storesTotal : 0) +
    (shouldShowProducts ? productsTotal : 0) +
    (shouldShowServices ? servicesTotal : 0);

  return (
    <div className="relative w-full bg-white flex flex-col items-center">
      {/* Menubar */}
      <TheMallTopbar />
      <div className="w-[100vw] h-[14vh] min-h-[14vh]"></div>

      <div id="search-content" className="w-full lg:w-[80%] overflow-x-hidden hide-scrollbar flex flex-col">
        {/* Department Selector */}
        {!selectedDepartment && (
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
                  onClick={() => updateParams({ department: null })}
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
        )}

        {/* Department Header */}
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
              onClick={() => updateParams({ department: null })}
              className="p-[1vh] hover:bg-white/10 rounded-full transition-colors"
            >
              <MdClose className="text-[2.2vh]" />
            </button>
          </div>
        )}

        {/* Search Posts Feed */}
        {!searchTerm && <SearchPostsFeed />}
        
        

        {hasActiveFilters && searchTerm &&(
          <div className="bg-white border-b border-gray-100 px-[1vh] lg:px-[2vh] py-[1vh]">
            <div className="flex flex-col gap-[.5vh] lg:flex-row lg:items-center lg:justify-between">

              {/* Results summary + clear */}
              <div className="flex items-center justify-between w-full lg:w-auto gap-[2vh]">
                <div className="flex flex-col justify-center min-h-[4.5vh]">
                  {/* <p className="text-[1.35vh] font-semibold text-gray-800">
                    Search Results
                  </p> */}

                  <p className="text-[1.8vh] text-gray-500">
                    {shouldShowStores && `${storesTotal} store${storesTotal === 1 ? '' : 's'}`}{' '}
                    {shouldShowProducts && `${productsTotal} product${productsTotal === 1 ? '' : 's'}`}{' '}
                    {shouldShowServices && `${servicesTotal} service${servicesTotal === 1 ? '' : 's'}`}
                  </p>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-[.8vh] px-[2vh] py-[.7vh] rounded-lg border border-gray-200 bg-red-300 hover:bg-gray-50 transition-colors font-medium text-gray-700"
                  >
                    <MdClose className="text-[1.9vh]" />
                    <span className="text-[1.45vh]">Clear Search</span>
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-[1vh] flex-wrap">

                {/* Sort */}
                <div className="relative">
                  <div
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="flex justify-between items-center w-[22vh] px-[1.5vh] py-[.7vh] bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    <p className="font-medium text-[1.45vh] text-gray-700">
                      {selectedRelevanceLabel}
                    </p>

                    <IoMdArrowDropdown
                      className={`text-[2vh] text-gray-500 transition-transform ${
                        showDropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {showDropdown && (
                    <div className="absolute right-0 mt-1 w-[22vh] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20">
                      {relevanceOptions.map((option) => (
                        <div
                          key={option.key}
                          onClick={() => handleSelectRelevance(option.key)}
                          className={`px-[1.5vh] py-[1.1vh] text-[1.45vh] cursor-pointer transition-colors ${
                            selectedSort === option.key
                              ? 'bg-gray-100 font-semibold text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filters */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className={`flex items-center justify-center gap-[.8vh] px-[1.8vh] py-[.7vh] rounded-lg border font-medium transition-colors ${
                      selectedTags
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MdFilterList className="text-[2vh]" />

                    <span className="text-[1.45vh]">
                      Filters
                      {selectedTags
                        ? ` (${selectedTags.split(',').filter(Boolean).length})`
                        : ''}
                    </span>
                  </button>

                  {showFilters && (
                    <div className="absolute right-0 mt-1 w-[32vh] bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-[1.5vh] space-y-[1vh]">
                      <label className="block text-[1.4vh] font-medium text-gray-700">
                        Tags
                      </label>

                      <input
                        type="text"
                        value={tagsDraft}
                        onChange={(e) => setTagsDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') applyTagsFilter();
                        }}
                        placeholder="e.g. kota, delivery"
                        className="w-full border border-gray-300 rounded-lg px-[1.2vh] py-[.9vh] text-[1.5vh] focus:outline-none focus:border-gray-500"
                      />

                      <button
                        onClick={applyTagsFilter}
                        className="w-full py-[.9vh] bg-gray-900 text-white rounded-lg font-medium text-[1.4vh] hover:bg-gray-800 transition-colors"
                      >
                        Apply Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Type Buttons */}
            <div className="w-full flex flex-row justify-evenly gap-[.8vh] mt-[1.2vh]">
              {searchTypeOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleSearchTypeChange(option.key)}
                  className={`px-[1.8vh] py-[.6vh] rounded-lg text-[1.45vh] font-semibold transition-colors ${
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

        <div className="w-full px-[1vh] py-[2vh] space-y-10">
          {isLoading && !hasActiveFilters ? (
            <div className="flex flex-col items-center justify-center py-[10vh]">
              <div className="w-[5vh] h-[5vh] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
              <p className="mt-[2vh] text-gray-500 text-[1.6vh]">Loading results...</p>
            </div>
          ) : null}

          {shouldShowStores && hasActiveFilters && (
            <section>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Stores</h2>
                  <p className="text-sm text-gray-500">{storesTotal} store{storesTotal === 1 ? '' : 's'} found</p>
                </div>
              </div>

              {storeSlugs.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                  No stores match your search.
                </div>
              ) : (
                <>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {storeSlugs.map((slug) => (
                      <StoreCard
                        key={slug}
                        store={storesBySlug[slug]}
                        user={user}
                        allowShadow
                        mini={window.innerWidth < 640}
                      />
                    ))}
                  </div>
                  {storesPage < storesPages && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={loadMoreStores}
                        disabled={storesLoading}
                        className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                      >
                        {storesLoading ? 'Loading…' : 'Load More'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {shouldShowProducts && hasActiveFilters && (
            <section>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
                  <p className="text-sm text-gray-500">{productsTotal} product{productsTotal === 1 ? '' : 's'} found</p>
                </div>
              </div>

              {productSearchResults.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                  No products match your search.
                </div>
              ) : (
                <>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {productSearchResults.map((product) => (
                      <MallSearchProductCard key={product._id} product={product} />
                    ))}
                  </div>
                  {productsPage < productsPages && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={loadMoreProducts}
                        disabled={productsLoading}
                        className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                      >
                        {productsLoading ? 'Loading…' : 'Load More'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {shouldShowServices && hasActiveFilters && (
            <section>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
                  <p className="text-sm text-gray-500">{servicesTotal} service{servicesTotal === 1 ? '' : 's'} found</p>
                </div>
              </div>

              {serviceSearchResults.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
                  No services match your search.
                </div>
              ) : (
                <>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {serviceSearchResults.map((service) => (
                      <MallSearchServiceCard key={service._id ?? service.slug} service={service} />
                    ))}
                  </div>
                  {servicesPage < servicesPages && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={loadMoreServices}
                        disabled={servicesLoading}
                        className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                      >
                        {servicesLoading ? 'Loading…' : 'Load More'}
                      </button>
                    </div>
                  )}
                </>
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
