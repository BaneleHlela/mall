import { 
  MessageCircleQuestion, UserCheck, Package, 
  LayoutDashboard, ChartArea, ShoppingBag, 
  ClockArrowUp, CalendarArrowUp, UsersRound, 
  HandHelping, Settings, Images, LogOut,
} from "lucide-react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { LuFileImage } from "react-icons/lu";
import DashboardLink from "./DashboardLink";
import type { Store } from "../../../types/storeTypes";

interface Props {
  store: Store;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const StoreDashBoardMenubar = ({ store, isMobileMenuOpen = false, setIsMobileMenuOpen }: Props) => {
  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (isMobileMenuOpen && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className={`relative pl-2 pr-2 min-w-[18vw] h-full shadow-sm bg-white flex-col ${isMobileMenuOpen ? 'flex lg:flex' : 'hidden lg:flex'} ${isMobileMenuOpen ? 'fixed lg:relative top-0 left-0 z-50 w-full lg:w-auto h-full lg:h-full bg-white lg:bg-white' : ''}`}>
      {/* Mobile close button */}
      {isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen?.(false)}
          className="lg:hidden absolute top-4 right-4 z-60 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>
      )}
      {/* Store name and reviews */}
      <div className="h-[13%] font-[600] font-[ubuntu] text-3xl  text-center border-b-1 border-gray-300 flex flex-col justify-center mt-12 lg:mt-0">
        {store.name}
        <div className="flex flex-row justify-center w-full mt-1">
          <IoStar color="gold"/>
          <IoStar color="gold"/>
          <IoStar color="gold"/>
          <IoStar color="gold"/>
          <IoStarHalf color="gold"/>
        </div>
      </div>
      {/* Links */}
      <div className="font-[ubuntu] mt-[2vh] text-[2vh]">
          <DashboardLink
            linkTo={`/dashboard/${store.slug}`}
            icon={<ChartArea className="text-blue-600 text-[2vh]"/>}
            text="overview"
            onClick={handleLinkClick}
          />
          <DashboardLink 
            linkTo={`/dashboard/${store.slug}/team`} 
            icon={<UsersRound className="text-blue-600"/>} 
            beta={true}
            text="Team" 
            onClick={handleLinkClick}
          />
          {store.trades.includes("products") && (
            <DashboardLink 
              linkTo={`/dashboard/${store.slug}/orders`} 
              icon={<ClockArrowUp className="text-green-600"/>} 
              text="Orders" 
              onClick={handleLinkClick}
            />
          )}
        {store.trades.includes("services") && (
          <DashboardLink 
            linkTo={`/dashboard/${store.slug}/bookings`} 
            icon={<CalendarArrowUp size={20} className="text-green-600" />} 
            text="Bookings" 
            onClick={handleLinkClick}
          />
        )}

        {store.trades.includes("packages") && (
          <DashboardLink 
            linkTo={`/dashboard/${store.slug}/subscriptions`} 
            icon={<UserCheck size={20} className="text-green-600" />} 
            text="Subscriptions" 
            onClick={handleLinkClick}
          />
        )}
        {store.trades.includes("products") && (
          <DashboardLink 
            linkTo={`/dashboard/${store.slug}/products`} 
            icon={<ShoppingBag className="text-yellow-500" />} 
            text="Products" 
            onClick={handleLinkClick}
          />
        )}
        {store.trades.includes("services") && (
          <DashboardLink 
            linkTo={`/dashboard/${store.slug}/services`} 
            icon={<HandHelping className="text-yellow-500" />} 
            text="Services" 
            onClick={handleLinkClick}
          />
        )}
        {store.trades.includes("packages") && (
          <DashboardLink 
            linkTo={`/dashboard/${store.slug}/packages`} 
            icon={<Package className="text-yellow-500" />} 
            text="Packages" 
            onClick={handleLinkClick}
          />
        )}
        <DashboardLink 
          linkTo={`/dashboard/${store.slug}/layouts`} 
          icon={<LayoutDashboard className="text-red-600"/>} 
          text="Layouts" 
          onClick={handleLinkClick}
        />
        <DashboardLink 
          linkTo={`/dashboard/${store.slug}/posters`} 
          icon={<LuFileImage className="text-black"/>} 
          text="Posters" 
          onClick={handleLinkClick}
        />
        <DashboardLink 
          linkTo={`/dashboard/${store.slug}/images`} 
          icon={<Images className="text-red-600"/>} 
          text="Images" 
          onClick={handleLinkClick}
        />
      </div>
      {/* Tools Links */}
      <div className="font-[ubuntu] absolute bottom-[10vh] left-1 w-full scale-95">
        <DashboardLink 
          linkTo={`/dashboard/${store.slug}/settings`} 
          icon={<Settings />} 
          text="Store Settings" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store.slug}/store-help`} 
          icon={<MessageCircleQuestion />} 
          text="Help" 
        />
        <DashboardLink 
          linkTo={`/dashboard/${store.slug}/exit`} 
          icon={<LogOut />} 
          text="exit" 
        />
      </div>
    </div>
  );
};

export default StoreDashBoardMenubar;

