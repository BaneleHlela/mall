import { MdLocationSearching } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../home/store_card/StoreCard";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { fetchStores } from "../../../features/stores/storeSlice";
import { openRangeModal, closeRangeModal } from "../../../features/rangeSlice";
import RangeModal from "../../modals/RangeModal";

// Popular searches div gotta be functional 
// ui

const TheMallTopbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { storeIds, storesById, isLoading } = useAppSelector(
    (state: RootState) => state.stores
  );
  const user = useAppSelector((state: RootState) => state.user.user);
  const { isOpen: isRangeModalOpen } = useAppSelector((state: RootState) => state.range);

  // Fetch stores whenever search term changes
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      dispatch(fetchStores({ search: searchTerm }));
    }
  }, [dispatch, searchTerm]);

  const showResults = searchTerm.length > 0 && (isFocused || isHovered);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const limitedResults = storeIds.slice(0, 4); // show only first 4 results

  return (
    <div className="w-full h-full lg:w-[80%] text-white">
      <div className="h-full w-full">
        {/* Desktop */}
        <div className="hidden lg:flex w-full h-full flex-row justify-between items-center">
          {/* Logo */}
          <div className="w-fit h-[60%] flex items-center">
            <p
              style={{ fontFamily: "Bebas Neue" }}
              className="text-white font-bold text-[5vh]"
            >
              The Mall
            </p>
          </div>

          {/* Searchbar, Location and Range */}
          <div className="flex flex-row w-[60%] h-full justify-end items-center space-x-[.6vh]">
            {/* Searchbar */}
            <div className="relative w-[80%] h-[55%]">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search for stores, products, or services"
                className="w-full h-full border-b-[.2vh] border-stone-50 placeholder:text-[1.5vh] px-[.6vh] placeholder:text-stone-400 bg-[#3e3e3fe3] focus:outline-none"
              />

              {/* Results Preview Modal */}
              {showResults && (
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="absolute top-[110%] bg-white w-full max-h-[350px] shadow-lg p-3 overflow-y-auto"
                >
                    <div className="w-full flex">
                        <div className="w-[60%]">
                            {isLoading ? (
                                <p className="text-gray-500 text-sm px-2">Loading...</p>
                            ) : limitedResults.length === 0 ? (
                                <p className="text-gray-500 text-sm px-2">
                                No results found
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                {limitedResults.map((id) => (
                                    <StoreCard
                                    key={id}
                                    store={storesById[id]}
                                    user={user}
                                    />
                                ))}
                                </div>
                            )}
                        </div>
                        <div className="w-[40%] px-[1vh]">
                            {/* Popular Searches */}
                            <div className="mb-8 w-full">
                                <h3 className="text-gray-800 font-bold text-sm mb-3 tracking-wide">
                                    POPULAR SEARCHES
                                </h3>
                                    <ul className="space-y-2 text-gray-700 text-sm">
                                    <li className="cursor-pointer hover:text-gray-900 transition-colors">
                                        <span className="font-semibold">s</span>amsung phones
                                    </li>
                                    <li className="cursor-pointer hover:text-gray-900 transition-colors">
                                        <span className="font-semibold">s</span>alad bowls
                                    </li>
                                    <li className="cursor-pointer hover:text-gray-900 transition-colors">
                                        pots for <span className="font-semibold">s</span>ale
                                    </li>
                                    <li className="cursor-pointer hover:text-gray-900 transition-colors">
                                        <span className="font-semibold">s</span>indisiwe church
                                    </li>
                                    <li className="cursor-pointer hover:text-gray-900 transition-colors">
                                        <span className="font-semibold">s</span>khulisaneni pre school
                                    </li>
                                </ul>
                            </div>
                            {/* Brands & Categories */}
                            <div>
                                <h3 className="text-gray-800 font-bold text-sm mb-3 tracking-wide">
                                    DeEPARTMENTS & BRANDS
                                </h3>
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    <li className="cursor-pointer hover:text-gray-900 transition-colors">
                                       Old Ka<span className="font-semibold">s</span>i 
                                    </li>
                                    <li className="cursor-pointer hover:text-gray-900 transition-colors">
                                        Clothing and Fashion
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* View All Button */}
                    {storeIds.length > 0 && (
                        <button
                        onClick={() =>
                            navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
                        }
                        className="w-full mt-3 py-2 text-sm font-semibold text-white bg-gray-900 rounded hover:bg-gray-800"
                        >
                        View All Results
                        </button>
                    )}
                </div>
              )}
            </div>

            {/* Range */}
            <button
              onClick={() => dispatch(openRangeModal())}
              className="text-[1vh] text-white hover:bg-white hover:bg-opacity-10 rounded p-1 transition-colors"
            >
              <MdLocationSearching className="text-[3.2vh]" />
            </button>

            {/* Location */}
            <button
              onClick={() => navigate('/account')}
              className="text-[1vh] text-black hover:bg-white hover:bg-opacity-10 rounded p-1 transition-colors"
            >
              <SlLocationPin className="text-[3vh] text-white" />
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="w-full h-full py-[1vh] px-[.9vh] lg:hidden">
          <div className="w-full h-[50%] flex flex-row justify-between items-center">
            {/* Logo */}
            <div className="w-fit h-[65%]">
              <img
                src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/mall-logo.png"
                alt="the-mall-logo"
                className="w-fit h-full object-contain"
              />
            </div>

            {/* Range and Location */}
            <div className="space-x-1">
              <button
                onClick={() => dispatch(openRangeModal())}
                className="text-[1vh] text-white hover:bg-white hover:bg-opacity-10 rounded p-1 transition-colors"
              >
                <MdLocationSearching className="text-[3.2vh]" />
              </button>
              <button
                onClick={() => navigate('/account')}
                className="text-[1vh] text-black hover:bg-white hover:bg-opacity-10 rounded p-1 transition-colors"
              >
                <SlLocationPin className="text-[3vh] text-white" />
              </button>
            </div>
          </div>

          {/* Searchbar */}
          <div className="w-full h-[50%] flex items-center">
            <input
              type="text"
              placeholder="Search for stores, products, or services"
              className="w-full h-[80%] border-b-[.2vh] border-stone-50 placeholder:text-[1.5vh] px-[1vh] placeholder:text-stone-400 bg-[#3e3e3fe3] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <RangeModal
        open={isRangeModalOpen}
        onClose={() => dispatch(closeRangeModal())}
      />
    </div>
  );
};

export default TheMallTopbar;
