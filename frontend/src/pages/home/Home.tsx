import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import DepartmentSelectorWithImages from './supporting/DepartmentSelectorWithImages';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import BasicStorePost from '../../components/the_mall/home/BasicStorePost';
import TipsAndTricks from '../../components/the_mall/home/TipsAndTricks';





const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize the navigate function
  const user = useAppSelector((state: RootState) => state.user.user);
  const departmentRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});


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
    <div className="relative  w-full h-full bg-gray-100 flex flex-col items-center">
      {/* Menubar */}
      <nav className="w-[100vw] h-[15vh] z-11 sticky inset-0 bg-gray-900 flex flex-col items-center lg:h-[9vh]">
        <TheMallTopbar />
      </nav>
      <div className="w-full space-y-1 lg:w-[80%] overflow-x-hidden hide-scrollbar">
        {/* Department Selector */}
        {selectedDepartment && (
          <div className="h-[8vh] w-full bg-stone-100 flex items-center relative">
            {/* Left scroll button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 h-full w-fit p-0   bg-opacity-80 flex items-center justify-center"
            >
              <ChevronLeft className='' />
            </button>
            
            {/* Scrollable department buttons */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar space-x-2 w-full h-[5vh] ml-[2vh] items-center relative"
            >
              {Object.entries(departments).map(([key, dept], index) => (
                <React.Fragment key={key}>
                  <button
                    ref={(el) => { departmentRefs.current[key] = el; }}
                    onClick={() => handleDepartmentSelect(key)}
                    className={`whitespace-nowrap px-[1.2vh] py-[.8vh] font-bold text-[1.8vh] text-gray-800 transition-colors ${
                      selectedDepartment === key
                        ? 'bg-gray-900 text-white border-b-3 border-gray-500'
                        : 'bg-stone-100 text-black  hover:bg-gray-100'
                    }`}
                  >
                    {dept.full}
                  </button>
                  {/* Add a gray line between buttons, except after the last button */}
                  {index < Object.entries(departments).length - 1 && (
                    <div className="h-[80vh] w-[1px] bg-gray-300">.</div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Right scroll button */}
            <button
              onClick={scrollRight}
              
              className="absolute right-0 z-10 h-full bg-opacity-80 flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        
        {/* Department Toggler With Images (Desktop) */}
        {!selectedDepartment && (
          <div
            ref={imageScrollRef}
            onWheel={handleImageWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="hidden lg:flex overflow-x-auto space-x-4 py-4 hide-scrollbar"
          >
            {Object.entries(departments).map(([key, dept]) => (
              <DepartmentSelectorWithImages
                key={key}
                onSelect={() => handleDepartmentSelect(key)}
                department={dept}
              />
            ))}
          </div>
        )}

        {/* Department Toggler With Images (Mobile) */}
        {!selectedDepartment && (
          <div
            ref={imageScrollRef}
            onWheel={handleImageWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="flex bg-white pl-[.5vh] overflow-x-auto space-x-1 py-4 hide-scrollbar lg:hidden"
          >
            {/* Add your store */}
            <div className="relative flex justify-center h-[20vh] bg-amber-500 aspect-3/5 cursor-pointer rounded-[1vh] hover:scale-102">
              {/* Image */}
              <div className="w-full">
                <img 
                  src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/Promote%20Your%20Shop%20in%20Style.png" 
                  alt="Mall theme image" 
                  className="w-full h-full object-cover rounded-[1vh]" 
                />
              </div>
              {/* Button */}
              <div className="absolute bottom-0 flex justify-center items-center w-full h-[20%] bg-[#0000001f]  rounded-b-[1vh]">
                <button className=" bg-black text-white border-[.2vh] border-white rounded-full">
                  <FiPlus className='text-[2.5vh]'/>
                </button>
              </div>
              
            </div>
            <div className=""></div>
            {Object.entries(departments).map(([key, dept]) => (
              <DepartmentSelectorWithImages
                key={key}
                onSelect={() => handleDepartmentSelect(key)}
                department={dept}
              />
            ))}
          </div>
        )}
        {/* Feed  */}
        <div className="space-y-1">
          <BasicStorePost postData={null}/>
          <TipsAndTricks />
        </div>

        {/* Placeholder divs */}
        <div className="flex flex-col w-full h-[48vh] lg:h-[40vh] lg:flex-row">
          {/* For creators */}
          <div onClick={() => navigate('/creators')} className="h-[50%] w-full lg:h-full lg:w-[50%]  bg-[#aab7c4] text-white text-center flex flex-col justify-center lg:justify-evenly items-center hover:scale-102">
            <h2 
              style={{
                fontFamily: "Bebas Neue",
                lineHeight: "1",	
              }} 
              className="font-[BebasNeue] text-[5.5vh] lg:text-[7vh]"
            >Get Started With The Mall</h2>
            <button className="border-[.35vh] w-fit px-[2vh] text-[2.5vh] hover:scale-105">Creators</button>
          </div>
          {/* For investors */}
          <div onClick={() => navigate('/business-plan')} className="h-[50%] w-full lg:h-full lg:w-[50%] bg-gradient-to-r from-gray-800 to-gray-900 text-center flex flex-col justify-center items-center hover:scale-102 text-white">
            <h2 style={{
                fontFamily: "Bebas Neue",
                lineHeight: "1",	
              }} 
              className="font-[BebasNeue] text-[5.5vh] lg:text-[7vh]"
               // Navigate to /business-plan
            >Get Started With The Mall</h2>
            <button className="border-[.35vh] border-white w-fit px-[2vh] text-[2.5vh] hover:scale-105">Investors</button>
          </div>
        </div>

        

        {/* {isLoading ? (
          <p className="text-center text-gray-500">Loading stores...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : storeIds.length === 0 ? (
          <p className="text-center text-gray-500">No stores found.</p>
        ) : (
          <div className="px-[.6vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[2vh]">
            {storeIds.map((id) => (
              <StoreCard key={id} store={storesById[id]} user={user}/>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HomePage;
