import React, { useMemo, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchStores } from "../../features/stores/storeSlice";
import { fetchAllProducts } from "../../features/products/productsSlice";
import { fetchStoreServices } from "../../features/services/servicesSlice";
import { fetchStorePackages } from "../../features/packages/packagesSlice";
import { fetchStoreRentals } from "../../features/rentals/rentalSlice";
import type { Store } from "../../types/storeTypes";
import type { Product } from "../../types/productTypes";
import type { Service } from "../../types/serviceTypes";
import type { Package } from "../../types/packageTypes";
import type { Rental } from "../../types/rentalTypes";
import FavoriteStoreCard from "../../components/the_mall/favorites/FavoriteStoreCard";
import FavoriteProductCard from "../../components/the_mall/favorites/FavoriteProductCard";
import FavoriteServiceCard from "../../components/the_mall/favorites/FavoriteServiceCard";
import FavoritePackageCard from "../../components/the_mall/favorites/FavoritePackageCard";
import FavoriteRentalCard from "../../components/the_mall/favorites/FavoriteRentalCard";
import { GoHeart } from "react-icons/go";

type TabType = 'stores' | 'products' | 'services' | 'packages' | 'rentals';
// Sort by department with the most favorites first
const Favorites = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  
  // Data from Redux
  const stores = useAppSelector((state) => state.stores.storesBySlug);
  const storeSlugs = useAppSelector((state) => state.stores.storeSlugs);
  const storeLoading = useAppSelector((state) => state.stores.isLoading);
  
  const allProducts = useAppSelector((state) => state.products.products);
  const productLoading = useAppSelector((state) => state.products.isLoading);

  const allServices = useAppSelector((state) => state.services.services);
  const serviceLoading = useAppSelector((state) => state.services.isLoading);

  const allPackages = useAppSelector((state) => state.packages.packages);
  const packageLoading = useAppSelector((state) => state.packages.isLoading);

  const allRentals = useAppSelector((state) => state.rentals.rentals);
  const rentalLoading = useAppSelector((state) => state.rentals.loading);

  const [activeTab, setActiveTab] = useState<TabType>('stores');

  // Fetch all data on mount
  useEffect(() => {
    if (storeSlugs.length === 0 && !storeLoading) {
      dispatch(fetchStores()); // Replace with fetchFavoriteStores
    }
    if (allProducts.length === 0 && !productLoading) {
      dispatch(fetchAllProducts()); // Replace with fetchFavoriteProducts
    }
    // For now, they will be empty
  }, [storeSlugs.length, storeLoading, allProducts.length, productLoading, dispatch]);

  // Extract favorite stores
  const favoriteStores = useMemo(() => {
    if (!user?.favourites?.stores || !stores) return [];

    return user.favourites.stores
      .map((id) => Object.values(stores).find(store => store._id === id.toString()))
      .filter((store): store is Store => !!store);
  }, [user, stores]);

  // Extract favorite products
  const favoriteProducts = useMemo(() => {
    if (!user?.favourites?.products || !allProducts) return [];

    return user.favourites.products
      .map((id) => allProducts.find(product => product._id === id.toString()))
      .filter((product): product is Product => !!product);
  }, [user, allProducts]);

  // Extract favorite services
  const favoriteServices = useMemo(() => {
    if (!user?.favourites?.services || !allServices) return [];

    return user.favourites.services
      .map((id) => allServices.find(service => service._id === id.toString()))
      .filter((service): service is Service => !!service);
  }, [user, allServices]);

  // Extract favorite packages
  const favoritePackages = useMemo(() => {
    if (!user?.favourites?.packages || !allPackages) return [];

    return user.favourites.packages
      .map((id) => allPackages.find(pkg => pkg._id === id.toString()))
      .filter((pkg): pkg is Package => !!pkg);
  }, [user, allPackages]);

  // Extract favorite rentals
  const favoriteRentals = useMemo(() => {
    if (!user?.favourites?.rentals || !allRentals) return [];

    return user.favourites.rentals
      .map((id) => allRentals.find(rental => rental._id === id.toString()))
      .filter((rental): rental is Rental => !!rental);
  }, [user, allRentals]);

  // Group favorites by department (for stores)
  const favoritesByDepartment = useMemo(() => {
    const grouped: { [key: string]: Store[] } = {};

    favoriteStores.forEach((store) => {
      if (!store.departments || store.departments.length === 0) {
        if (!grouped["Other"]) grouped["Other"] = [];
        grouped["Other"].push(store);
      } else {
        store.departments.forEach((dept: string) => {
          if (!grouped[dept]) grouped[dept] = [];
          grouped[dept].push(store);
        });
      }
    });

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

  // Get department style
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

  // Calculate totals
  const totals = {
    stores: favoriteStores.length,
    products: favoriteProducts.length,
    services: favoriteServices.length,
    packages: favoritePackages.length,
    rentals: favoriteRentals.length,
  };

  const totalAll = Object.values(totals).reduce((sum, count) => sum + count, 0);

  const tabs = [
    { id: 'stores' as TabType, label: 'Stores', count: totals.stores, icon: '🏪' },
    { id: 'products' as TabType, label: 'Products', count: totals.products, icon: '📦' },
    { id: 'services' as TabType, label: 'Services', count: totals.services, icon: '🔧' },
    { id: 'packages' as TabType, label: 'Packages', count: totals.packages, icon: '🎁' },
    { id: 'rentals' as TabType, label: 'Rentals', count: totals.rentals, icon: '🏠' },
  ];

  const isLoading = storeLoading || productLoading || serviceLoading || packageLoading || rentalLoading;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stores':
        return (
          <div className="space-y-8">
            {Object.keys(favoritesByDepartment).length === 0 ? (
              <EmptyState type="stores" />
            ) : (
              Object.entries(favoritesByDepartment).map(([department, deptStores]) => {
                const style = getDepartmentStyle(department);
                
                return (
                  <div key={department} className="relative">
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
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {deptStores.map((store) => (
                        <FavoriteStoreCard 
                          key={store._id} 
                          store={store} 
                        />
                      ))}
                    </div>
                    
                    <div className="mt-8 border-b border-gray-100" />
                  </div>
                );
              })
            )}
          </div>
        );

      case 'products':
        return favoriteProducts.length === 0 ? (
          <EmptyState type="products" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favoriteProducts.map((product) => (
              <FavoriteProductCard 
                key={product._id} 
                product={product} 
              />
            ))}
          </div>
        );

      case 'services':
        return favoriteServices.length === 0 ? (
          <EmptyState type="services" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteServices.map((service) => (
              <FavoriteServiceCard 
                key={service._id} 
                service={service} 
              />
            ))}
          </div>
        );

      case 'packages':
        return favoritePackages.length === 0 ? (
          <EmptyState type="packages" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritePackages.map((pkg) => (
              <FavoritePackageCard 
                key={pkg._id} 
                package={pkg} 
              />
            ))}
          </div>
        );

      case 'rentals':
        return favoriteRentals.length === 0 ? (
          <EmptyState type="rentals" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteRentals.map((rental) => (
              <FavoriteRentalCard 
                key={rental._id} 
                rental={rental} 
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-y-scroll hide-scrollbar">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-8 sm:px-8 sm:py-10">
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
              Your Favorites
            </h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base max-w-xl">
            All your favorite items organized in one beautiful place. Explore stores, products, services, packages, and rentals you've loved.
          </p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white/70 text-xs uppercase tracking-wider">Total Favorites</span>
              <p className="text-white text-xl font-bold">{totalAll}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white/70 text-xs uppercase tracking-wider">Categories</span>
              <p className="text-white text-xl font-bold">{tabs.filter(tab => tab.count > 0).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="pb-8">
          {isLoading ? (
            <LoadingState />
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4" />
    <p className="text-gray-500">Loading your favorites...</p>
  </div>
);

// Empty State Component
const EmptyState = ({ type }: { type: string }) => {
  const messages = {
    stores: {
      title: "No favorite stores yet",
      description: "Start exploring stores and add them to your favorites by clicking the heart icon on any store card.",
      action: "Explore Stores",
      link: "/"
    },
    products: {
      title: "No favorite products yet",
      description: "Browse products from your favorite stores and save the ones you love.",
      action: "Browse Products",
      link: "/"
    },
    services: {
      title: "No favorite services yet",
      description: "Discover services offered by stores and keep track of what you need.",
      action: "Find Services",
      link: "/"
    },
    packages: {
      title: "No favorite packages yet",
      description: "Explore curated packages and bundles from stores in your area.",
      action: "Discover Packages",
      link: "/"
    },
    rentals: {
      title: "No favorite rentals yet",
      description: "Find rental items and equipment available near you.",
      action: "Browse Rentals",
      link: "/"
    }
  };

  const message = messages[type as keyof typeof messages] || messages.stores;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-full p-6 mb-6 shadow-inner">
        <GoHeart className="text-slate-300 text-5xl" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{message.title}</h2>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {message.description}
      </p>
      <a 
        href={message.link}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        {message.action}
      </a>
    </div>
  );
};

export default Favorites;