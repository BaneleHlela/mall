import UserDisplay from './UserDisplay'
import { IoMdNotifications, IoMdSearch } from "react-icons/io";
import { Fade as Hamburger } from 'hamburger-react'
import { IoNotificationsOutline, IoSearch } from 'react-icons/io5';

const StoreDashboardTopbar = () => {
    // Check if the current URL contains 'posters/view'
    const shouldHideTopbar = window.location.href.includes('posters/view');

    if (shouldHideTopbar) {
        return null; // Return null to hide the component
    }
    
    return (
    <div
        className='font-[Outfit] flex flex-row justify-between items-center w-full min-h-[12vh] m-[.35vh] text-gray-900 px-[1.5vh] lg:px-[3.5vh]'
    >
        <div className="rounded-[1vh] p-[-1vh] shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)]  flex flex-col justify-center bg-white lg:hidden">
            <Hamburger toggled={false} size={22}/>
        </div>
        {/* Title */}
        <div className="hidden lg:flex flex-col justify-center h-full w-[40%] rounded-[8px]">
            <p className='text-[4vh] font-semibold text-gray-800'>Dashboard</p>
            <p className="line-clamp-2">Find and manage key information related to your store</p>
        </div>
        {/* Searchbar */}
        <div className="hidden lg:flex w-[40%] h-full items-center ml-[20vh] relative">
            {/* Icon */}
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
        <div className="h-full flex flex-row justify-end items-center lg:w-[30%]">
            {/* Status */}
            <div className="font-bold px-[1.2vh] bg-green-500 text-white mr-[2vh] rounded-[2vh] border-b-[.3vh] border-green-600">
                Open
            </div>
            <div className="relative flex flex-col justify-center mr-[3vh]">
                <IoNotificationsOutline className='shadowm-sm text-[3vh]' />
                {/* Available notifs */}
                <div className="bg-purple-600 absolute bottom-0 left-0 aspect-square rounded-full h-[35%]"></div>
            </div>
            <UserDisplay />
        </div>
    </div>
  )
}

export default StoreDashboardTopbar;