import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Store } from '../../../../types/storeTypes';
import type { User } from '../../../../types/userTypes';
import { calculateDistanceToStore, formatDistance } from './supporting/calculateDistance';
import { getStoreStatus, getStatusClasses } from './supporting/storeStatus';
import { RatingDisplay } from './supporting/storeRating.tsx';
import { MdVerified } from 'react-icons/md';
import { updateUser} from '../../../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { GoHeartFill, GoHeart } from "react-icons/go";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface StoreCardProps {
  store: Store;
  user?: User | null; 
  allowShadow?: boolean;
  onFavoriteClick?: () => void;
  mini?: boolean;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, allowShadow, onFavoriteClick, mini = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user)
  const mysweetalert = withReactContent(Swal);
  const storeNotReadyThumbnail = "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/store_not_ready_thumbnail.jpg"

  // Check if store has a website
  const hasWebsite = store.website && (
    store.website.layoutId || 
    store.website.source === 'custom' || 
    store.website.websiteUrl
  );

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent triggering when clicking the heart

    // Navigate to get-started if storeSlug is "themall" or if store has no website
    if (store.slug === "themall") {
      navigate("/get-started");
      return;
    }
    
    if (!hasWebsite) {
    const result = await mysweetalert.fire({
      title: 'Store not ready',
      text: 'Store has no website. If you are the owner of the store, go to dashboard to add a website/layout.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Go to Dashboard',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      navigate(`/dashboard/${store.slug}/settings`);
    }
      return;
    }
    
    navigate(`/stores/${store.slug}`);
  };

  // Calculate distance if user is provided
  const distance = user ? calculateDistanceToStore(user, store) : null;
  const distanceText = formatDistance(distance);
  
  // Get store status
  const storeStatus = getStoreStatus(store.operationTimes);
  const statusClasses = getStatusClasses(storeStatus);
  
  const isFavorite = user?.favourites?.stores?.includes(store._id!);

  // Dispatch updateUser directly to toggle favorite
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating when clicking the heart

    if (!user) {
      alert('Please log in to manage favorites.');
      return;
    }

    dispatch(
      updateUser({ // @ts-ignore-next-line
          user: user._id, // userId
          favoriteStore: store._id, // storeId
        })
    );
  };

  // Get status color classes for mobile
  const getStatusColorClasses = () => {
    switch (storeStatus.color) {
      case 'green':
        return 'bg-emerald-500';
      case 'red':
        return 'bg-rose-500';
      case 'orange':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div
        onClick={handleClick}
        onDoubleClick={handleFavoriteClick}
        className={`group relative w-full max-w-[200px] cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 lg:relative lg:aspect-4/3 lg:border-1 lg:border-gray-200 lg:overflow-hidden ${allowShadow && "lg:shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)]"} lg:absolute lg:inset-0 lg:bg-white/10 lg:backdrop-blur-md lg:transition-transform lg:transform lg:hover:-translate-y-1 lg:z-0 lg:rounded-[1.2vh] lg:rounded-[1.7vh] lg:overflow-hidden`}
    >
      {/* Card Container - Mobile */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 lg:hidden">

      {/* Image Section - Portrait aspect ratio on mobile */}
      <div className={`relative aspect-[4/3] overflow-hidden lg:relative lg:${mini ? "h-[65%]": "h-[72%]"} `}>
        <img src={hasWebsite ? store.thumbnails.storeCard : storeNotReadyThumbnail } alt="store-thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 -z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:absolute lg:top-0 lg:w-full lg:h-full lg:bg-[#00000000]"></div>
        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start lg:hidden">
          {/* Status Badge */}
          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColorClasses()} shadow-lg`}>
            {storeStatus.isOpen ? 'Open' : 'Closed'}
          </span>

          {/* Verified Badge */}
          {store.isVerified && (
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
              <MdVerified className="text-blue-500 text-sm" />
            </div>
          )}
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-2 left-2 lg:hidden">
          <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg">
            {distanceText}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-200 hover:bg-white hover:scale-110 lg:hidden"
        >
          {isFavorite ? (
            <GoHeartFill className="text-rose-500 text-lg" />
          ) : (
            <GoHeart className="text-gray-600 text-lg" />
          )}
        </button>

        {/* Desktop badges */}
        <div className="hidden lg:block">
          {/* Favorite toggle button
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-[1%] left-[1%] flex items-center justify-evenly w-[20%] scale-90 space-x-[.6vh] bg-[#0000005d] px-[.3vh] border-[.3vh] border-white rounded-[.3vh] shadow "
          >
            <p style={{lineHeight: "1"}} className="text-white text-[3.4vh] font-light">{store.likes.count}</p>
            {isFavorite ? (
              <GoHeartFill className="text-[3.5vh] text-red-400" />
            ) : (
              <GoHeart className="text-[3.5vh] text-white" />
            )}
          </button> */}
          {/* Distance */}
          <p
            className={`absolute left-[1%] bg-white
              ${mini ? 'text-[1.3vh] rounded-xs bottom-0' : 'text-[1.8vh] rounded bottom-[2%] '} text-center text-black min-w-[15%] px-[1%]`}>{distanceText}</p>
          {/* Store State */}
          {store.storeState && (
            <p className={`absolute right-[1%] ${
                  (store as any).storeState === 'demo' ? 'bg-red-500 text-white' :
                  (store as any).storeState === 'idle' ? 'bg-yellow-500 text-white' :
                  (store as any).storeState === 'live' ? 'bg-green-500 text-white' : ''
                }
                round
              ${mini ? 'text-[1.3vh] rounded-xs bottom-0' : 'text-[1.8vh] rounded bottom-[2%]'}
              text-center text-black min-w-[15%] px-[1%] capitalize`}>
              {store.storeState}
            </p>
          )}
          {/* verification status */}
          <div className="">
            {store.isVerified && (
              <button className="absolute top-[.5vh] right-[.5vh] text-[2.5vh] text-blue-600">
                <MdVerified />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section - Mobile */}
      <div className="p-2 bg-white lg:hidden">
        {/* Store Name */}
        <h3 className="font-bold text-gray-900 text-base line-clamp-1  group-hover:text-indigo-600 transition-colors">
          {store.nickname || store.name}
        </h3>

        {/* Slogan */}
        <p className="text-gray-500 text-xs line-clamp-1 mb-1">
          {store.slogan.length === 0 ? "Your Slogan Here": store.slogan}
        </p>

        {/* Rating and Status Row */}
        <div className="flex items-center justify-between">
          <RatingDisplay rating={store.rating} className="text-sm" />

          {/* Status Text */}
          <span className={`text-xs font-medium ${
            storeStatus.color === 'green' ? 'text-emerald-600' :
            storeStatus.color === 'red' ? 'text-rose-600' :
            'text-amber-600'
          }`}>
            {storeStatus.message}
          </span>
        </div>

        {/* Departments Tags */}
        {store.departments && store.departments.length > 5 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {store.departments.slice(0, 2).map((dept, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full"
              >
                {dept}
              </span>
            ))}
            {store.departments.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full">
                +{store.departments.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
      </div> {/* End Card Container - Mobile */}

      {/* Desktop Content Section */}
      <div className={`hidden lg:flex lg:flex-col lg:justify-center ${mini ? "h-[40%]" : "h-[28%]"} shadow-md z-1 `}>
        {/* Store name */}
        <h3 className={`text-center font-semibold text-gray-900
          ${mini ? "text-[1.5vh]": "text-[90%]"} line-clamp-1`}>{store.nickname || store.name}</h3>
        {/* Details */}
        <div className="flex flex-row justify-between items-center px-[.8vh] mb-[.25vh]">
          <button
            onClick={handleFavoriteClick}
            className=""
          >
            {/* <p style={{lineHeight: "1"}} className="text-white text-[3.4vh] font-light">{store.likes.count}</p> */}
            {isFavorite ? (
              <GoHeartFill className={`${mini ? "text-[2vh]" : "text-[3.8vh]"}  text-gray-700`} />
            ) : (
              <GoHeart className={`${mini ? "text-[2vh]" : "text-[3.8vh]"} text-gray-700`} />
            )}
          </button>

          {/* Open Status */}
          <span className={`${statusClasses} line-clamp-1 max-w-[60%]`}>
            {storeStatus.message}
          </span>
          {/* Closed status */}
          <RatingDisplay rating={store.rating} className={`${mini ? "text-[1.3vh]" : "text-[1.8vh]"} `} />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
