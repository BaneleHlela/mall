import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStores } from '../../features/stores/storeSlice';
import type { RootState } from '../../app/store';
import StoreCard from '../../components/the_mall/home/store_card/StoreCard';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments, StoreHomePosters } from '../../utils/helperObjects';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import DepartmentSelectorWithImages from './supporting/DepartmentSelectorWithImages';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import BasicStorePost from '../../components/the_mall/basic_store_post/BasicStorePost';
import TipsAndUpdates from '../../components/the_mall/home/TipsAndUpdates';
import { FaTools } from 'react-icons/fa';


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
    console.log('Selected Department:', deptKey);
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
      <nav className="w-[100vw] h-[15vh] z-11 sticky inset-0 bg-black flex flex-col items-center lg:h-[9vh]">
        <TheMallTopbar />
      </nav>
      <div className="w-full space-y-1 lg:w-[80%] overflow-x-hidden hide-scrollbar">
        {/* Department Selector */}
        {selectedDepartment && (
          <div className="h-[8vh] w-full bg-white flex items-center relative">
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
              className="flex items-center overflow-x-auto bg-white hide-scrollbar space-x-2 w-full h-full ml-[2vh] relative"
            >
              {Object.entries(departments).map(([key, dept], index) => (
                <React.Fragment key={key}>
                  <button
                    ref={(el) => { departmentRefs.current[key] = el; }}
                    onClick={() => handleDepartmentSelect(key)}
                    className={`whitespace-nowrap px-[1.4vh] py-[.6vh] text-[1.8vh] text-gray-800 transition-colors ${
                      selectedDepartment === key
                        ? 'bg-gray-900 text-white rounded-full'
                        : 'text-black border rounded-full  hover:bg-gray-100'
                    } font-[500]`}
                  >
                    {dept.full}
                  </button>
                  {/* Add a gray line between buttons, except after the last button */}
                  {index < Object.entries(departments).length - 1 && (
                    <div className="h-[3vh] w-[1px] bg-gray-300 text-white">.</div>
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
            className="flex bg-white pl-[.5vh] overflow-x-auto space-x-[.55vh] py-[2vh] hide-scrollbar lg:hidden"
          >
            {/* Add your store */}
            <div onClick={() => navigate("/add-store")} className="relative flex justify-center h-[20vh] bg-amber-500 aspect-3/5 cursor-pointer rounded-[1vh] hover:scale-102">
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
        {/* Thumbail you clicked */}
        {selectedDepartment && (
          <div className="bg-white p-[.8vh]">
            <p className="text-[2.5vh] font-[600]">The image you clicked came from: </p>
            <div className="relative flex flex-col justify-center items-center h-[20vh] w-full mt-1 space-y-2">
              <img 
                src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp"
                alt="Clicked Department Thumbnail"
                className="absolute inset-0 h-full w-full rounded object-cover"
              />
              <FaTools className="animate-spin text-[3vh] text-white"/>
              <div
                style={{
                  lineHeight: "1.2",
                }} 
                className="max-w-[50%] rounded border-gray-600 bg-stone-100 z-1 p-1 text-center"
              >
                Feature will be functional once slugs have be set up
              </div>
            </div>
          </div>
        )}
        <div onClick={() => navigate("/layouts/692623c23eec25fc3b7e2c58")} className="w-ful h-[20vh] bg-white"></div>
        
        {/* Feed  */}
        <div className="space-y-[.35vh]">
          {StoreHomePosters.map((post, index) => (
            <BasicStorePost key={index} {...post} />
          ))}

          <TipsAndUpdates />
          <BasicStorePost 
            storeSlug={"ennock-m-art"}
            status={"Just finished this painting for a client! What do you think?"}
            poster={{
              images: ["https://storage.googleapis.com/the-mall-uploads-giza/mall/department%20images/495371485_1238922361482703_9008209704576564623_n.jpg"],
            }}
          />
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
