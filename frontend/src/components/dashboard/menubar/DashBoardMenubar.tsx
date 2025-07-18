import { 
  MessageCircleQuestion, UserCheck, Package, 
  LayoutDashboard, ChartArea, ShoppingBag, 
  ClockArrowUp, CalendarArrowUp, UsersRound, 
  HandHelping, Settings, Images, LogOut,
} from "lucide-react";
import DashboardLink from "./DashboardLink";
import { TbSection } from "react-icons/tb";
import { FaStore } from "react-icons/fa";



const DashBoardMenubar = () => {
  return (
    <div className="hidden lg:flex relative pl-2 pr-2 min-w-[18vw] h-full shadow-sm bg-white flex-col">
      {/* Store name and reviews */}
      <div className="h-[13%] font-[600] font-[ubuntu] text-3xl  text-center border-b-1 border-gray-300 flex flex-col justify-center">
        The Mall
      </div>
      {/* Links */}
      <div className="font-[ubuntu] mt-[2vh]">
          <DashboardLink 
            linkTo={`/creators-dashboard`} 
            icon={<ChartArea className="text-blue-600 text-[2.5vh]"/>} 
            text="overview" 
          />
          <DashboardLink
            linkTo={`/creators-dashboard/demo-stores`}
            icon={<FaStore className="text-blue-600 text-[2.5vh]"/>}
            text="Demo Stores" 
          />
          {/* <DashboardLink 
            linkTo={`/creators-dashboard/team`} 
            icon={<UsersRound className="text-blue-600"/>} 
            beta={true}
            text="Team" 
          />
        <DashboardLink 
          linkTo={`/creators-dashboard/orders`} 
          icon={<ClockArrowUp size={20} className="text-green-600"/>} 
          text="Orders" 
        /> */}
        {/* <DashboardLink 
          linkTo={`/creators-dashboard/bookings`} 
          icon={<CalendarArrowUp size={20} className="text-green-600"/>} 
          text="Bookings" 
        />
        <DashboardLink 
          linkTo={`/creators-dashboard/subscriptions`} 
          icon={<UserCheck size={20} className="text-green-600"/>} 
          text="Subscriptions" 
        />
        <DashboardLink 
          linkTo={`/creators-dashboard/products`} 
          icon={<ShoppingBag size={20} className="text-yellow-500"/>} 
          text="Products" 
        />
        <DashboardLink 
          linkTo={`/creators-dashboard/services`} 
          icon={<HandHelping size={20} className="text-yellow-500" />} 
          text="Services" 
        />
        <DashboardLink 
          linkTo={`/creators-dashboard/packages`} 
          icon={<Package size={20} className="text-yellow-500" />} 
          text="Packages" 
        /> */}
        {/* <DashboardLink 
          linkTo={`/creators-dashboard/layouts`} 
          icon={<LayoutDashboard size={20} className="text-red-600"/>} 
          text="Layouts" 
        /> */}
        <DashboardLink 
          linkTo={`/creators-dashboard/sections`} 
          icon={<TbSection className="text-red-600 text-[2.5vh]"/>} 
          text="Sections" 
        />
        {/* <DashboardLink 
          linkTo={`/creators-dashboard/images`} 
          icon={<Images size={20} className="text-red-600"/>} 
          text="Images" 
        /> */}
      </div>
      {/* Tools Links */}
      <div className="font-[ubuntu] absolute bottom-[10vh] left-1 w-full scale-95">
        <DashboardLink 
          linkTo={`/creators-dashboard/settings`} 
          icon={<Settings className="text-[2.5vh]" />} 
          text="Settings" 
        />
        <DashboardLink 
          linkTo={`/creators-dashboard/store-help`} 
          icon={<MessageCircleQuestion className="text-[2.5vh]" />} 
          text="Help" 
        />
        <DashboardLink 
          linkTo={`/creators-dashboard/exit`} 
          icon={<LogOut className="text-[2.5vh]" />} 
          text="exit" 
        />
      </div>
    </div>
  );
};

export default DashBoardMenubar;
