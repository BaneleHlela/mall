import UserDisplay from './UserDisplay'
import { IoMdNotifications } from "react-icons/io";

const DashboardTopbar = () => {
  return (
    <div
        className='font-[ubuntu] hidden lg:flex flex-row w-full h-[12vh] bg-white m-1 shadow-sm rounded-[8px]'
    >
        {/* Title */}
        <div className="flex flex-col justify-center h-full w-[40%] rounded-[8px] pl-4">
            <p className='text-3xl font-[600]'>Dashboard</p>
            <p className="">Find and manage key information related to your store</p>
        </div>
        {/* Notifs and account */}
        <div className="h-full flex flex-row justify-end w-[60%] rounded-[8px] pr-4">
            <div className="h-full flex flex-col justify-center mr-5">
                <IoMdNotifications size={30} className='shadowm-sm'/>
            </div>
            {/* <UserDisplay /> */}
        </div>
    </div>
  )
}

export default DashboardTopbar