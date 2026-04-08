import { useEffect, useState, useRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsPostReviewModalOpen } from '../../features/posts/postSlice';
import TheMallTopbar from '../../components/the_mall/topbar/TheMallTopbar';
import { departments } from '../../utils/helperObjects';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import DepartmentSelectorWithImages from './supporting/DepartmentSelectorWithImages';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';
import StorePostJSX from '../../components/the_mall/home/StorePostJSX';
import { selectPostsForHome } from '../../utils/postSelector';
import { MdAdd } from 'react-icons/md';
import { IoStorefrontOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import TheMallStoreFooterSection from '../../components/store_layout/custom_store_layout_components/themall_layout_components/TheMallStoreFooterSection';

// Helper functions for dynamic post rendering
const getTipFor = (postData: any): string => {
  const tipMap: { [key: string]: string } = {
    'welcome-to-mall': 'Tips and Updates',
    'not-ready-for-customers': 'Tips and Updates',
    'customers-can-review-everything': 'Tips and Updates',
    'branding': 'Tips for Vendors',
    'supply-chain': 'Tips and Updates',
    'scalability': 'Tips and Updates',
    'hire-a-brand-designer': 'Tips and Updates',
    'loans-and-laybuys': 'Upcoming Features',
    'accounting-vs-economic-profit': 'Tips and Updates',
    'add-your-own-domain': 'Tips and Updates',
    'our-recommended-book': 'Tips And Updates',
    'list-of-suppliers-by-chioma': 'Tips and Updates',
    'four-first-time-small-business-mistakes': 'Tips And Updates',
    'how-to-start-business-white-labeling': 'Tips And Updates',
    'business-advice-for-small-business': 'Tips And Updates',
    'yc-starting-company-key-terms': 'Tips for Founders',
    'yc-sales-playbook': 'Tips for Founders',
    'yc-startup-ideas': 'Tips for Founders',
    'yc-cofounder-relationships': 'Tips for Founders',
    'sbd-business-plan': 'Tips for Vendors',
    'sbd-business-strategy': 'Tips for Vendors',
    'most-important-poster': 'Tips And Updates',
    'no-ayikho-poster': 'Tips And Updates',
    'various-posters': 'Tips And Updates',
    'mvp-announcement': 'Announcement',
    'what-is-ecommerce': 'Tips and Updates',
    'what-is-mvp': 'Tips for Vendors',
    'launch-date': 'Tips and Updates',
    'you-can-invest': 'Announcement',
    'look-out-for-red-flags': 'Announcement',
    'diversify': 'Announcement',
    'why-invest': 'Announcement',
    'mall-still-beta': 'Tips and Updates',
    'image-consent': 'Tips and Updates',
    'store-service-bidding': 'Tips and Updates',
    'double-tap-for-reviews': 'Tips and Updates',
    'collaborate-or-learn': 'Tips and Updates',
    'build-a-brand-with-ready-templates-or-ai': 'Tips and Updates',
    'free-pik-posters': 'Tips and Updates',
    'multiple-layouts-post': 'Tips for Vendors',
    'personalized-websites-announcement': 'Announcement',
  };
  return tipMap[postData.id] || 'Tips and Updates';
};

const isFeedbackPost = (postData: any): boolean => {
  // Most posts are feedback posts, only a few aren't
  const nonFeedbackPosts = [
    'there-are-currently-no-non-feedback-posts',
  ];
  return !nonFeedbackPosts.includes(postData.id);
};

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const user = useAppSelector((state) => state.user.user);
  const isPostReviewModalOpen = useAppSelector(selectIsPostReviewModalOpen);
  const departmentRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Dynamic post selection
  const selectedPosts = useMemo(() =>
    selectPostsForHome({
      maxPosts: 100, // Configurable limit
      userId: user?._id as string
    }),
    [user?._id]
  );


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number>(0);
  const touchScrollLeftRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragScrollLeftRef = useRef<number>(0);

  // Fetch stores when department changes
  // useEffect(() => {
  //   dispatch(fetchStores({
  //     search: searchTerm,
  //     department: selectedDepartment || undefined
  //   }));
  // }, [dispatch, searchTerm, selectedDepartment]);
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (imageScrollRef.current) {
      isDraggingRef.current = true;
      dragStartXRef.current = e.pageX;
      dragScrollLeftRef.current = imageScrollRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !imageScrollRef.current) return;
    const walk = dragStartXRef.current - e.pageX;
    imageScrollRef.current.scrollLeft = dragScrollLeftRef.current + walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  

  // Handle add post button click
  const handleAddPostClick = () => {
    if (!user) {
      toast.error("Please sign in to create a post.", {
        duration: 4000,
        position: 'bottom-center',
      });
      return;
    }
    
    if (!user.stores || user.stores.length === 0) {
      toast.error("You need to create a store before you can post.", {
        duration: 4000,
        position: 'bottom-center',
      });
      return;
    }
    
    toast("This feature is coming soon!", {
      icon: '🚧',
      duration: 4000,
      position: 'bottom-center',
    });
  };


  return (
    <div className="relative w-full h-full lg:h-screen overflow-y-scroll hide-scrollbar bg-gray-100 flex flex-col items-center">
      {/* Menubar */}
      <TheMallTopbar />
      <div className="w-[100vw] h-[13vh] min-h-[13vh] lg:min-h-[10vh] lg:h-[10vh]"></div>
      {/* Content */}
      <div className="w-full space-y-1 lg:w-[35%] overflow-x-hidden hide-scrollbar z-2">
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
        {/* {!selectedDepartment && (
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
        )} */}

        {/* Department Toggler With Images */}
        {!selectedDepartment && (
          <div
            ref={imageScrollRef}
            onWheel={handleImageWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex bg-white px-[1.5vh] overflow-x-auto space-x-[.55vh] py-[1.5vh] hide-scrollbar rounded-[1.5vh] overflow-hidden shadow-xs cursor-grab active:cursor-grabbing"
          >
            
            {/* Add your store */}
            {user?.stores.length === 0  && (
              <div onClick={() => navigate("/add-store")} className="relative flex justify-center h-[20vh] lg:h-[27vh] bg-amber-500 aspect-3/5 cursor-pointer rounded-[1vh] hover:scale-102">
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
            )}
            {!user && (
              <div onClick={() => navigate("/add-store")} className="relative flex justify-center h-[20vh] lg:h-[27vh] bg-amber-500 aspect-3/5 cursor-pointer rounded-[1vh] hover:scale-102">
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
            )}
            {/* Manage Your Stores */}
            {user && user.stores && user.stores.length > 0 && (
              <div onClick={() => navigate("/my-stores")} className="relative flex justify-center h-[20vh] lg:h-[27vh] bg-amber-500 aspect-3/5 cursor-pointer rounded-[1vh] hover:scale-102">
              {/* Image */}
              <div className="w-full">
                <img 
                  src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/20260219_1444_Image%20Generation_remix_01khtyvvhkfsbaka3qfy5khanb.png" 
                  alt="Mall theme image" 
                  className="w-full h-full object-cover rounded-[1vh]" 
                />
              </div>
              {/* Button */}
              <div className="absolute bottom-0 flex justify-center items-center w-full h-[20%] bg-[#0000001f]  rounded-b-[1vh]">
                <button className=" bg-black text-white border-[.2vh] p-1 border-white rounded-full">
                  <IoStorefrontOutline className='text-[2vh]'/>
                </button>
              </div>
            </div>
            )}
            {/* Department Selector With Images */}
            {Object.entries(departments).map(([key, dept]) => (
              <DepartmentSelectorWithImages
                key={key}
                onSelect={() => navigate(`/search?department=${key}`)}
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
        {/* Feed  */}
        <div className="space-y-[.6vh]">
          {selectedPosts.map((postData) => (
            <StorePostJSX
              key={postData.id}
              tipFor={getTipFor(postData)}
              jsx={<postData.component />}
              onModalOpen={setIsReviewsModalOpen}
              isFeedbackPost={isFeedbackPost(postData)}
              storeSlug={postData.storeSlug}
            />
          ))}
        </div>
        <TheMallStoreFooterSection/>
        {/* Placeholder divs */}
        <div className="flex flex-col w-full h-[48vh] lg:h-[40vh] lg:flex-row">
          {/* For creators */}
          <div onClick={() => navigate('/creators')} className="h-[50%] w-full lg:h-full lg:w-[100%]  bg-[#aab7c4] text-white text-center flex flex-col justify-center lg:justify-evenly items-center hover:scale-102">
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
          <div onClick={() => navigate('/business-plan')} className="hidden h-[50%] w-full lg:h-full lg:w-[50%] bg-gradient-to-r from-gray-800 to-gray-900 text-center flex flex-col justify-center items-center hover:scale-102 text-white">
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
        ) : storeSlugs.length === 0 ? (
          <p className="text-center text-gray-500">No stores found.</p>
        ) : (
          <div className="px-[.6vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[2vh]">
            {storeSlugs.map((slug) => (
              <StoreCard key={slug} store={storesBySlug[slug]} user={user}/>
            ))}
          </div>
        )} */}
      </div>
      {/* Add post button */}
      {!isPostReviewModalOpen && (
        <button 
          onClick={handleAddPostClick}
          className='fixed bottom-[6vh] right-2 p-[1.2vh] bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full z-100 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 ease-out'
        >
          <MdAdd className='text-[4vh]'/>
        </button>
      )}
      {/* Background Image (FOR DESKTOP) */}
      <div className="absolute inset-0 lg:flex flex-col w-full h-full min-h-screen">
        {/* Background Image mapped to the length of POST_IDS */}
        {/* {POST_IDS && Object.keys(POST_IDS).map((key, index) => (
          <img 
            key={key}
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png" 
            alt={`home-bg-image-${index}`}
            className="h-screen w-full object-cover opacity-25 pointer-events-none select-none"
          />
        ))} */}
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png" 
          alt="home-bg-image" 
          className="h-screen w-full object-cover opacity-25 pointer-events-none select-none" 
        />
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png" 
          alt="home-bg-image" 
          className="lg:hidden h-screen w-full object-cover opacity-25 pointer-events-none select-none" 
        />
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png" 
          alt="home-bg-image" 
          className="lg:hidden h-screen w-full object-cover opacity-25 pointer-events-none select-none" 
        />
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png" 
          alt="home-bg-image" 
          className="lg:hidden h-screen w-full object-cover opacity-25 pointer-events-none select-none" 
        />
      </div>
    </div>
  );
};

export default HomePage;

