import React, { useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchStores } from "../../features/stores/storeSlice";
import type { Store } from "../../types/storeTypes";
import FavoriteStoreCard from "../../components/the_mall/favorites/FavoriteStoreCard";
import { GoHeart } from "react-icons/go";

const FavoriteStores = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const stores = useAppSelector((state) => state.stores.storesById);
  const storeIds = useAppSelector((state) => state.stores.storeIds);
  const isLoading = useAppSelector((state) => state.stores.isLoading);

  // Fetch stores if not in memory
  useEffect(() => {
    if (storeIds.length === 0 && !isLoading) {
      dispatch(fetchStores());
    }
  }, [storeIds.length, isLoading, dispatch]);

  // Extract favorite stores
  const favoriteStores = useMemo(() => {
    if (!user?.favourites?.stores || !stores) return [];

    return user.favourites.stores
      .map((id) => stores[id.toString()])
      .filter((store): store is Store => !!store);
  }, [user, stores]);

  // Group favorites by department
  const favoritesByDepartment = useMemo(() => {
    const grouped: { [key: string]: Store[] } = {};

    favoriteStores.forEach((store) => {
      if (!store.departments || store.departments.length === 0) {
        // Stores without departments go to "Other"
        if (!grouped["Other"]) grouped["Other"] = [];
        grouped["Other"].push(store);
      } else {
        store.departments.forEach((dept: string) => {
          if (!grouped[dept]) grouped[dept] = [];
          grouped[dept].push(store);
        });
      }
    });

    // Sort departments alphabetically, but keep "Other" at the end
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      if (a === "Other") return 1;
      if (b === "Other") return -1;
      return a.localeCompare(b);
    });

    const sortedGrouped: { [key: string]: Store[] } = {};
    sortedKeys.forEach(key => {
      sortedGrouped[key] = grouped[key];
    });

    return sortedGrouped;
  }, [favoriteStores]);

  // Get department icon/color based on department name
  const getDepartmentStyle = (department: string) => {
    const styles: { [key: string]: { gradient: string; bg: string; text: string } } = {
      "Fashion": { 
        gradient: "from-pink-500 to-rose-500", 
        bg: "bg-pink-50", 
        text: "text-pink-700" 
      },
      "Food & Dining": { 
        gradient: "from-orange-500 to-amber-500", 
        bg: "bg-orange-50", 
        text: "text-orange-700" 
      },
      "Electronics": { 
        gradient: "from-blue-500 to-cyan-500", 
        bg: "bg-blue-50", 
        text: "text-blue-700" 
      },
      "Health & Beauty": { 
        gradient: "from-purple-500 to-violet-500", 
        bg: "bg-purple-50", 
        text: "text-purple-700" 
      },
      "Home & Garden": { 
        gradient: "from-green-500 to-emerald-500", 
        bg: "bg-green-50", 
        text: "text-green-700" 
      },
      "Sports & Outdoors": { 
        gradient: "from-teal-500 to-cyan-500", 
        bg: "bg-teal-50", 
        text: "text-teal-700" 
      },
      "Entertainment": { 
        gradient: "from-indigo-500 to-purple-500", 
        bg: "bg-indigo-50", 
        text: "text-indigo-700" 
      },
      "Services": { 
        gradient: "from-gray-500 to-slate-500", 
        bg: "bg-gray-50", 
        text: "text-gray-700" 
      },
      "Other": { 
        gradient: "from-slate-400 to-gray-500", 
        bg: "bg-slate-50", 
        text: "text-slate-700" 
      },
    };

    return styles[department] || styles["Other"];
  };

  // Calculate total favorites count
  const totalFavorites = favoriteStores.length;

  return (
    <div className="w-full min-h-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-y-scroll hide-scrollbar">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-8 sm:px-8 sm:py-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <GoHeart className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Your Favorite Stores
            </h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base max-w-xl">
            Browse and manage your favorite stores organized by department. Quick access to the places you love.
          </p>
          
          {/* Stats Bar */}
          <div className="flex items-center gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white/70 text-xs uppercase tracking-wider">Total Favorites</span>
              <p className="text-white text-xl font-bold">{totalFavorites}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white/70 text-xs uppercase tracking-wider">Departments</span>
              <p className="text-white text-xl font-bold">{Object.keys(favoritesByDepartment).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Loading State */}
        {isLoading && storeIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4" />
            <p className="text-gray-500">Loading stores...</p>
          </div>
        ) : Object.keys(favoritesByDepartment).length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-full p-6 mb-6 shadow-inner">
              <GoHeart className="text-slate-300 text-5xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Start exploring stores and add them to your favorites by clicking the heart icon on any store card.
            </p>
            <a 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Explore Stores
            </a>
          </div>
        ) : (
          /* Department Sections */
          <div className="space-y-8">
            {Object.entries(favoritesByDepartment).map(([department, deptStores]) => {
              const style = getDepartmentStyle(department);
              
              return (
                <div key={department} className="relative">
                  {/* Department Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`bg-gradient-to-r ${style.gradient} rounded-lg px-4 py-2 shadow-sm`}>
                      <h2 className="text-lg font-semibold text-white capitalize">
                        {department}
                      </h2>
                    </div>
                    <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-sm font-medium`}>
                      {deptStores.length} {deptStores.length === 1 ? 'store' : 'stores'}
                    </span>
                  </div>
                  
                  {/* Stores Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {deptStores.map((store) => (
                      <FavoriteStoreCard 
                        key={store._id} 
                        store={store} 
                      />
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div className="mt-8 border-b border-gray-100" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteStores;
