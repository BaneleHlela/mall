import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import DepartmentSelectorWithImages from '../home/supporting/DepartmentSelectorWithImages';
import StoresBundle from './StoresBundle';




const MallSearchPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, storeIds, storesById } = useAppSelector(
    (state: RootState) => state.stores
  );
  const user = useAppSelector((state: RootState) => state.user.user);
  const departmentRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const stores = useAppSelector((state: RootState) => {
    const { storeIds, storesById } = state.stores;
    return storeIds.slice(0, 5).map(id => storesById[id]);
  });

  const allStores = useAppSelector((state: RootState) => {
    const { storeIds, storesById } = state.stores;
    return storeIds.map(id => storesById[id]);
  });

  // group + sort + slice top 5 per department
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


  console.log(topStoresByDepartment)



  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number>(0);
  const touchScrollLeftRef = useRef<number>(0);

  // Fetch stores when department changes
  useEffect(() => {
    dispatch(fetchStores({
      search: searchTerm,
      department: selectedDepartment || undefined
    }));
  }, [dispatch, searchTerm, selectedDepartment]);
  //Scroll to Selected Button on Change
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
    // You can add filtering logic here based on department
  };

  const handleImageWheel = (e: React.WheelEvent) => {
    if (imageScrollRef.current) {
      e.preventDefault(); // Prevent vertical scroll
      imageScrollRef.current.scrollBy({
        left: e.deltaY,
        behavior: 'smooth',
      });
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].pageX;
    if (imageScrollRef.current) {
      touchScrollLeftRef.current = imageScrollRef.current.scrollLeft;
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (imageScrollRef.current) {
      const walk = touchStartXRef.current - e.touches[0].pageX;
      imageScrollRef.current.scrollLeft = touchScrollLeftRef.current + walk;
    }
  };
  
  

  return (
    <div className="relative w-full h-full bg-white flex flex-col items-center ">
      {/* Menubar */}
      <nav className="w-[100vw] h-[15vh] z-11 sticky inset-0 bg-gray-900 flex flex-col items-center lg:h-[10vh]">
        <TheMallTopbar />
      </nav>
      <div className="w-full lg:w-[80%] overflow-x-hidden hide-scrollbar space-y-[5vh]">
        {/* Poster */}
        <div className="flex justify-between w-full h-[45vh] mt-[4vh]">
          {/* Poster A */}
          <div className="relative h-full w-[49.5%]">
            {/* Background Image */}
            <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/pexels-toan-d-cong-680842095-28671808.jpg" alt="poster" className="w-full h-full object-cover" />
            {/*  */}
            <div className="absolute inset-0 w-full h-full bg-black opacity-25" />
          </div>
          {/* Poster B */}
          <div className="relative h-full w-[49.5%]">
            {/* Background Image */}
            <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/6884a99461cfbcec1883b7dc/images/kk.jpg" alt="poster" className="w-full h-full object-cover" />
            {/*  */}
            <div className="absolute inset-0 w-full h-full bg-black opacity-0" />
          </div>
        </div>
        {/* Department bundles */}
        <div className="space-y-[5vh]">
        {Object.entries(topStoresByDepartment).map(([deptKey, stores]) => (
          <StoresBundle 
            key={deptKey}
            department={deptKey}
            stores={stores}
            title={departments[deptKey].full} // if StoresBundle supports a title
          />
        ))}
      </div>


        {isLoading ? (
          <p className="text-center text-gray-500">Loading stores...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : storeIds.length === 0 ? (
          <p className="text-center text-gray-500">No stores found.</p>
        ) : (
          <div className="px-[.6vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[2vh]">
            {storeIds.map((id) => (
              <StoreCard key={id} store={storesById[id]} user={user} allowShadow/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MallSearchPage;
