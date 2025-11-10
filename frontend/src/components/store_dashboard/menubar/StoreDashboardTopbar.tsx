import UserDisplay from './UserDisplay'
import { IoMdNotifications, IoMdSearch } from "react-icons/io";
import { Fade as Hamburger } from 'hamburger-react'
import { IoNotificationsOutline, IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { FaDoorOpen, FaDoorClosed } from 'react-icons/fa6'; // ✅ Added closed door icon
import { useAppSelector } from '../../../app/hooks';
import { getStoreStatus } from '../../the_mall/home/store_card/supporting/storeStatus';
import toast, { Toaster } from 'react-hot-toast'; // ✅ Import toast

interface Props {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const StoreDashboardTopbar = ({ isMobileMenuOpen = false, setIsMobileMenuOpen }: Props) => {
  const store = useAppSelector((state) => state.storeAdmin.store);
  const storeStatus = getStoreStatus(store?.operationTimes);

  // Check if the current URL contains 'posters/view'
  const shouldHideTopbar = window.location.href.includes('posters/view');

  if (shouldHideTopbar) {
    return null; // Return null to hide the component
  }

  // ✅ Click handler for the open/closed div
  const handleStatusClick = () => {
    toast.error('Cannot open store for now.', {
      style: {
        background: '#fef2f2',
        color: '#991b1b',
        fontFamily: 'Outfit',
      },
      icon: '🚫',
    });
  };

  const isOpen = storeStatus.status === 'open';

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className='bg-white lg:bg-transparent font-[Outfit] flex flex-row justify-between items-center w-full min-h-[12vh] text-gray-900 px-[1.5vh] lg:px-[3.5vh]'
      >
        <div className="rounded-[.5vh] bg-black text-white flex flex-col justify-center lg:hidden">
          <Hamburger toggled={isMobileMenuOpen} toggle={(toggled) => setIsMobileMenuOpen?.(toggled ? true : false)} size={29}/>
        </div>

        {/* Title */}
        <div className="hidden lg:flex flex-col justify-center h-full w-[40%] rounded-[8px]">
          <p className='text-[4vh] font-semibold text-gray-800'>Dashboard</p>
          <p className="line-clamp-2">Find and manage key information related to your store</p>
        </div>

        {/* Searchbar */}
        <div className="hidden lg:flex w-[40%] h-full items-center ml-[20vh] relative">
          <IoSearch className="absolute left-[1.5vh] text-[2.2vh] text-purple-600" />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full h-[40%] rounded-[2vh] border-b-[.2vh] 
                    shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] 
                    border-stone-50 placeholder:text-[1.5vh] 
                    pl-[5vh] placeholder:text-stone-400 bg-white 
                    focus:outline-none"
          />
        </div>

        {/* Notifs and account */}
        <div className="h-full flex flex-row justify-end items-center lg:w-[30%] ">

          {/* ✅ Open/Closed Status */}
          <div
            onClick={handleStatusClick}
            className={`flex flex-col items-center font-bold py-[.5vh] px-[1vh] space-x-1 text-white mr-[2vh] rounded-[.5vh] border transition-colors duration-200 cursor-pointer
              ${isOpen ? 'bg-green-600 border-green-600' : 'bg-red-600 border-red-600'}
            `}
          >
            {isOpen ? (
              <FaDoorOpen className='text-[3vh]' />
            ) : (
              <FaDoorClosed className='text-[3vh]' />
            )}
            <p style={{ lineHeight: "1" }} className="text-[1.5vh]">
              {isOpen ? 'open' : 'closed'}
            </p>
          </div>

          <div className="relative flex flex-col justify-center mr-[3vh]">
            <IoNotificationsOutline className='shadowm-sm text-[3vh] text-black' />
            {/* Available notifs */}
            <div className="bg-purple-600 absolute bottom-0 left-0 aspect-square rounded-full h-[35%]"></div>
          </div>

          <UserDisplay />
        </div>
      </div>
    </>
  )
}

export default StoreDashboardTopbar;
