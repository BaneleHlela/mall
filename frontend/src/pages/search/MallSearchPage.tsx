import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { MdFilterList, MdClose } from 'react-icons/md';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Relevance dropdown states
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRelevance, setSelectedRelevance] = useState(relevanceOptions[0]);

  // Extract query parameters and update state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    const department = params.get('department') || null;
    setSearchTerm(query.trim());
    if (department) {
      setSelectedDepartment(department);
    }
  }, [location.search]);

  // Fetch stores on initial load and when filters change
  useEffect(() => {
    dispatch(
      fetchStores({
        search: searchTerm,
        department: selectedDepartment || undefined,
        sortBy: selectedRelevance.key,
      })
    );
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

  const clearFilters = () => {
    setSelectedDepartment(null);
    setSearchTerm('');
    setSelectedRelevance(relevanceOptions[0]);
  };

  const hasActiveFilters = searchTerm || selectedDepartment;

  return (
    <div className="relative w-full h-screen bg-white flex flex-col items-center">
      {/* Menubar */}
      <nav className="w-[100vw] h-[15vh] min-h-[15vh] inset-0 z-10 bg-black flex flex-col items-center lg:min-h-[9vh]">
        <TheMallTopbar />
      </nav>

      <div className="w-full lg:w-[80%] overflow-x-hidden hide-scrollbar flex flex-col">
        {/* Department Selector */}
        <div className="sticky top-0] lg:top-0 z-10 bg-white shadow-sm">
          <div className="relative flex items-center h-[7vh] min-h-[7vh] w-full">
            {/* Left scroll button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 h-full w-[5vh] bg-gradient-to-r from-white to-transparent flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="text-gray-600" size={22} />
            </button>

            {/* Scrollable department buttons */}
            <div
              ref={scrollContainerRef}
              className="flex items-center overflow-x-auto hide-scrollbar space-x-1 lg:space-x-2 w-full h-full px-[6vh] relative"
            >
              {/* All departments option */}
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

              {/* Divider */}
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

            {/* Right scroll button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 h-full w-[5vh] bg-gradient-to-l from-white to-transparent flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="text-gray-600" size={22} />
            </button>
          </div>
        </div>

        {/* Search Header & Filters */}
        <div className="bg-white border-b border-gray-200 px-[1vh] lg:px-[2vh] py-[2vh]">
          <div className="w-full  flex flex-row justify-between items-center lg:items-center gap-[1.5vh]">
            {/* Search info */}
            <div className="flex flex-col">
              {searchTerm ? (
                <p className="text-gray-600 text-[1.8vh]">
                  <span className="font-semibold text-gray-900">{storeIds.length}</span>
                  {' '}results for{' '}
                  <span className="font-semibold text-gray-900">"{searchTerm}"</span>
                  {selectedDepartment && (
                    <span className="text-gray-500">
                      {' '}in <span className="font-medium">{departments[selectedDepartment as keyof typeof departments]?.full}</span>
                    </span>
                  )}
                </p>
              ) : selectedDepartment ? (
                <p className="text-gray-600 text-[1.8vh]">
                  <span className="font-semibold text-gray-900">{storeIds.length}</span>
                  {' '}stores in{' '}
                  <span className="font-semibold text-gray-900">{departments[selectedDepartment as keyof typeof departments]?.full}</span>
                </p>
              ) : (
                <p className="text-gray-600 text-[1.8vh]">
                  <span className="font-semibold text-gray-900">{storeIds.length}</span>
                  {' '}stores found
                </p>
              )}
            </div>

            {/* Filters row */}
            <div className="flex flex-row items-center justify-end gap-[1.5vh] w-full lg:w-auto">
              {/* Relevance dropdown */}
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

              {/* Filter button */}
              <button className="flex items-center gap-[.8vh] px-[1.5vh] py-[1vh] border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                <MdFilterList className="text-gray-600 text-[2vh]" />
                <span className="text-[1.5vh] font-medium text-gray-700">Filters</span>
              </button>

              {/* Clear filters button */}
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
        </div>

        {/* Selected Department Banner */}
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

        {/* Store Results */}
        <div className="flex-1 px-[1vh] py-[2vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-[10vh]">
              <div className="w-[5vh] h-[5vh] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
              <p className="mt-[2vh] text-gray-500 text-[1.6vh]">Loading stores...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-[10vh]">
              <div className="w-[8vh] h-[8vh] bg-red-100 rounded-full flex items-center justify-center mb-[2vh]">
                <MdClose className="text-[4vh] text-red-500" />
              </div>
              <p className="text-red-500 text-[1.8vh] font-medium">Error loading stores</p>
              <p className="text-gray-500 text-[1.4vh] mt-[.5vh]">{error}</p>
            </div>
          ) : storeIds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-[10vh]">
              <div className="w-[10vh] h-[10vh] bg-gray-100 rounded-full flex items-center justify-center mb-[2vh]">
                <span className="text-[4vh]">🏪</span>
              </div>
              <p className="text-gray-600 text-[2vh] font-medium">No stores found</p>
              <p className="text-gray-400 text-[1.5vh] mt-[.5vh]">Try adjusting your search or filters</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-[2vh] px-[2vh] py-[1vh] bg-gray-900 text-white rounded-lg text-[1.5vh] font-medium hover:bg-gray-800 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1.5vh]">
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
        </div>

        {/* Footer */}
        <footer className="text-center py-[4vh] text-gray-500 text-[1.4vh] border-t border-gray-200 mt-auto mb-[5vh] lg:mb-0">
          <p>© {new Date().getFullYear()} The Mall — Concept by Banele Hlela.</p>
        </footer>
      </div>
    </div>
  );
};

export default MallSearchPage;
