import { 
  MessageCircleQuestion, UserCheck, Package, 
  LayoutDashboard, ChartArea, ShoppingBag, 
  ClockArrowUp, CalendarArrowUp, UsersRound, 
  HandHelping, Settings, Images, LogOut,
} from "lucide-react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import DashboardLink from "./DashboardLink";
import type { Store } from "../../../types/storeTypes";

interface Props {
  store: Store;
}

const StoreDashBoardMenubar = ({ store }: Props) => {
  return (
    <div className="hidden lg:flex relative pl-2 pr-2 min-w-[18vw] h-full shadow-sm bg-white flex-col">
      {/* Store name and reviews */}
      <div className="h-[13%] font-[600] font-[ubuntu] text-3xl  text-center border-b-1 border-gray-300 flex flex-col justify-center">
        {store.name}
        <div className="flex flex-row justify-center w-full mt-1">
          <IoStar color="gold" size={20}/>
          <IoStar color="gold" size={20}/>
          <IoStar color="gold" size={20}/>
          <IoStar color="gold" size={20}/>
          <IoStarHalf color="gold" size={20}/>
        </div>
      </div>
      {/* Links */}
      <div className="font-[ubuntu] mt-[2vh]">
          <DashboardLink 
            linkTo={`/dashboard/${store._id}`} 
            icon={<ChartArea size={20} className="text-blue-600"/>} 
            text="overview" 
          />
          <DashboardLink 
            linkTo={`/dashboard/${store._id}/team`} 
            icon={<UsersRound size={20} className="text-blue-600"/>} 
            beta={true}
            text="Team" 
          />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/orders`} 
          icon={<ClockArrowUp size={20} className="text-green-600"/>} 
          text="Orders" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/bookings`} 
          icon={<CalendarArrowUp size={20} className="text-green-600"/>} 
          text="Bookings" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/subscriptions`} 
          icon={<UserCheck size={20} className="text-green-600"/>} 
          text="Subscriptions" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/products`} 
          icon={<ShoppingBag size={20} className="text-yellow-500"/>} 
          text="Products" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/services`} 
          icon={<HandHelping size={20} className="text-yellow-500" />} 
          text="Services" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/packages`} 
          icon={<Package size={20} className="text-yellow-500" />} 
          text="Packages" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/layouts`} 
          icon={<LayoutDashboard size={20} className="text-red-600"/>} 
          text="Layouts" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/images`} 
          icon={<Images size={20} className="text-red-600"/>} 
          text="Images" 
        />
      </div>
      {/* Tools Links */}
      <div className="font-[ubuntu] absolute bottom-[10vh] left-1 w-full scale-95">
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/settings`} 
          icon={<Settings size={20} />} 
          text="Store Settings" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/store-help`} 
          icon={<MessageCircleQuestion size={20} />} 
          text="Help" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store._id}/exit`} 
          icon={<LogOut size={20} />} 
          text="exit" 
        />
      </div>
    </div>
  );
};

export default StoreDashBoardMenubar;
