import { MdLocationSearching } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../home/store_card/StoreCard";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { fetchStores } from "../../../features/stores/storeSlice";
import { openRangeModal, closeRangeModal } from "../../../features/rangeSlice";
import RangeModal from "../../modals/RangeModal";
import ProtectedRoute from "../authorization/ProtectedRoute";
import { PiMapPinSimpleAreaLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import toast from "react-hot-toast";

const TheMallTopbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { storeIds, storesById, isLoading } = useAppSelector(
    (state: RootState) => state.stores
  );
  const user = useAppSelector((state: RootState) => state.user.user);
  const { isOpen: isRangeModalOpen } = useAppSelector((state: RootState) => state.range);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      dispatch(fetchStores({ search: searchTerm }));
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showResults = searchTerm.length > 0 && (isFocused || isHovered);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const limitedResults = storeIds.slice(0, 4);

  return (
    <div
      className={`fixed top-0 w-[100vw] h-[13vh] min-h-[13vh] shadow lg:min-h-[10vh] lg:h-[8vh] lg:max-h-[8vh] inset-0 z-50
        bg-white dar:bg-black
        flex flex-col items-center lg:px-[10%]
        text-gray-900 dar:text-white
        transition-transform duration-300
        ${isHidden ? '-translate-y-full' : ''}`}
    >
      <div className="h-full w-full">

        {/* Desktop */}
        <div className="hidden lg:flex w-full h-full flex-row justify-between items-center">
          {/* Logo */}
          <div onClick={() => navigate("/")} className="w-fit h-[60%] flex items-center">
            <p
              style={{ fontFamily: "Bebas Neue" }}
              className="font-bold text-[5vh] text-gray-900 dar:text-white"
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
                className="w-full h-full border p-[1vh] placeholder:text-[1.5vh]
                  placeholder:text-stone-400
                  bg-stone-100 dar:bg-[#3e3e3fe3]
                  text-gray-900 dar:text-white
                  border-gray-300 dar:border-gray-500
                  focus:outline-none rounded-[4px]"
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
                        <p className="text-gray-500 text-sm px-2">No results found</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {limitedResults.map((id) => (
                            <StoreCard key={id} store={storesById[id]} user={user} mini={true} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="w-[40%] px-[1vh]">
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
                      <div>
                        <h3 className="text-gray-800 font-bold text-sm mb-3 tracking-wide">
                          DEPARTMENTS & BRANDS
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
                  {storeIds.length > 0 && (
                    <button
                      onClick={() => navigate(`/search?query=${encodeURIComponent(searchTerm)}`)}
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
              onClick={() => {
                if (!user) {
                  toast.error("You must login to adjust search range", {
                    duration: 4000,
                    style: {
                      background: '#fef2f2',
                      color: '#991b1b',
                      fontFamily: 'Outfit',
                    },
                    icon: '❌',
                  });
                  return;
                }
                dispatch(openRangeModal());
              }}
              className="text-[1vh] text-gray-900 dar:text-white hover:bg-black/10 dar:hover:bg-white/10 rounded p-1 transition-colors"
            >
              <PiMapPinSimpleAreaLight className="text-[3.2vh]" />
            </button>

            {/* Location */}
            <button
              onClick={() => navigate('/account')}
              className="text-[1vh] text-gray-900 dar:text-white hover:bg-black/10 dar:hover:bg-white/10 rounded p-1 transition-colors"
            >
              <CiLocationOn className="text-[3vh]" />
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="w-full h-full py-[.8vh] px-[.9vh] lg:hidden">
          <div className="w-full h-[45%] flex flex-row justify-between items-center">
            {/* Logo */}
            <div onClick={() => navigate("/")} className="w-fit h-[50%] flex items-center">
              <p
                style={{ fontFamily: "Bebas Neue" }}
                className="font-bold text-[3.5vh] ml-1 text-gray-900 dar:text-white"
              >
                The Mall
              </p>
            </div>

            {/* Range and Location */}
            <div className="">
              <button
                onClick={() => {
                  if (!user) {
                    toast.error("You must login to adjust search range", {
                      duration: 4000,
                      style: {
                        background: '#fef2f2',
                        color: '#991b1b',
                        fontFamily: 'Outfit',
                      },
                      icon: '❌',
                    });
                    return;
                  }
                  dispatch(openRangeModal());
                }}
                className="text-gray-900 dar:text-white hover:bg-black/10 dar:hover:bg-white/10 rounded p-1 transition-colors"
              >
                <PiMapPinSimpleAreaLight className="text-[3.2vh] mt-[.2vh]" />
              </button>
              <button
                onClick={() => navigate('/account')}
                className="text-gray-900 dar:text-white hover:bg-black/10 dar:hover:bg-white/10 rounded p-1 transition-colors"
              >
                <CiLocationOn className="text-[3vh]" />
              </button>
            </div>
          </div>

          {/* Searchbar */}
          <div className="w-full h-[55%] flex items-center relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Search for stores, products, or services"
              className="w-full h-[80%] border p-[1vh] placeholder:text-[1.5vh]
                placeholder:text-stone-400
                bg-stone-100 dar:bg-[#3e3e3fe3]
                text-gray-900 dar:text-white
                border-gray-300 dar:border-gray-500
                focus:outline-none rounded-[4px]"
            />

            {/* Mobile Search Results Popup */}
            {showResults && (
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="absolute top-[110%] left-0 bg-white w-full h-fit max-h-[50vh] shadow-lg p-3 overflow-y-auto z-50"
              >
                {isLoading ? (
                  <p className="text-gray-500 text-sm px-2">Loading...</p>
                ) : limitedResults.length === 0 ? (
                  <p className="text-gray-500 text-sm px-2">No results found</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {limitedResults.map((id) => (
                      <StoreCard key={id} store={storesById[id]} user={user} mini={true} />
                    ))}
                  </div>
                )}
                {storeIds.length > 0 && (
                  <button
                    onClick={() => navigate(`/search?query=${encodeURIComponent(searchTerm)}`)}
                    className="w-full mt-3 py-2 text-sm font-semibold text-white bg-gray-900 rounded hover:bg-gray-800"
                  >
                    View All Results
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isRangeModalOpen && (
        <ProtectedRoute>
          <RangeModal open={isRangeModalOpen} onClose={() => dispatch(closeRangeModal())} />
        </ProtectedRoute>
      )}
    </div>
  );
};

export default TheMallTopbar;