import UserDisplay from './UserDisplay'
import { IoMdNotifications } from "react-icons/io";
import { Fade as Hamburger } from 'hamburger-react'
const StoreDashboardTopbar = () => {
  return (
    <div
        className='font-[ubuntu] flex flex-row justify-between w-full min-h-[12vh] bg-white m-1 shadow-sm rounded-[8px]'
    >
        <div className="h-full flex flex-col ml-2 justify-center lg:hidden">
            <Hamburger toggled={false} />
        </div>
        {/* Title */}
        <div className="hidden lg:flex flex-col justify-center h-full w-[40%] rounded-[8px] pl-4">
            <p className='text-3xl font-[600]'>Dashboard</p>
            <p className="line-clamp-2">Find and manage key information related to your store</p>
        </div>
        {/* Notifs and account */}
        <div className="h-full flex flex-row justify-end w-[60%] rounded-[8px] pr-4">
            <div className="h-full flex flex-col justify-center mr-5">
                <IoMdNotifications size={30} className='shadowm-sm'/>
            </div>
            <UserDisplay />
        </div>
    </div>
  )
}

export default StoreDashboardTopbar;