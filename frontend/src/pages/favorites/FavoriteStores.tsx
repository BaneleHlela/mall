import React, { useMemo } from "react";
import StoreCard from "../../components/the_mall/home/store_card/StoreCard";
import { useAppSelector } from "../../app/hooks";

const FavoriteStores = () => {
  const user = useAppSelector((state) => state.user.user);
  const stores = useAppSelector((state) => state.stores.storesById);

  // Extract favorite stores
  const favoriteStores = useMemo(() => {
    if (!user?.favourites?.stores || !stores) return [];

    return user.favourites.stores
      .map((id) => stores[id.toString()])
      .filter((store): store is import("../../types/storeTypes").Store => !!store); // filter out undefined
  }, [user, stores]);

  // Group favorites by department
  const favoritesByDepartment = useMemo(() => {
    const grouped: { [key: string]: typeof favoriteStores } = {};

    favoriteStores.forEach((store) => {
      if (!store.departments) return;

      store.departments.forEach((dept: string) => {
        if (!grouped[dept]) grouped[dept] = [];
        grouped[dept].push(store);
      });
    });

    return grouped;
  }, [favoriteStores]);

  return (
    <div className="w-full h-full overflow-y-scroll bg-white px-[1vh] py-[1vh]">
        <h1 className="py-[1vh] text-[3.5vh] font-[Roboto] font-semibold">Your Favorites</h1>
        <h1 className="font-[Roboto]">Browse your favorite shops by department</h1>
        {Object.keys(favoritesByDepartment).length === 0 ? (
            <p className="text-center text-gray-600">No favorite stores yet.</p>
        ) : (
            Object.entries(favoritesByDepartment).map(([department, deptStores]) => (
            <div key={department} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 capitalize">{department}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {deptStores.map((store) => (
                    <StoreCard key={store._id} store={store} allowShadow/>
                ))}
                </div>
            </div>
            ))
        )}
    </div>
  );
};

export default FavoriteStores;
