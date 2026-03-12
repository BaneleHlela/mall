import { 
  MessageCircleQuestion, UserCheck, Package, 
  LayoutDashboard, ChartArea, ShoppingBag, 
  ClockArrowUp, CalendarArrowUp, UsersRound, 
  HandHelping, Settings, Images, LogOut,
  X
} from "lucide-react";
import { TbSection } from "react-icons/tb";
import { FaStore } from "react-icons/fa";
import DashboardLink from "../../store_dashboard/menubar/DashboardLink";
import WhatsAppSupportButton from "../../the_mall/support/WhatsAppSupportButton";
import { useState } from "react";



const DashBoardMenubar = () => {
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  const handleHelpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowHelpPopup(true);
  };

  const closePopup = () => {
    setShowHelpPopup(false);
  };

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
        <div 
          className="cursor-pointer"
          onClick={handleHelpClick}
        >
          <DashboardLink 
            linkTo="#" 
            icon={<MessageCircleQuestion className="text-[2.5vh]" />} 
            text="Help" 
          />
        </div>
        <DashboardLink 
          linkTo={`/creators-dashboard/exit`} 
          icon={<LogOut className="text-[2.5vh]" />} 
          text="exit" 
        />
      </div>

      {/* WhatsApp Help Popup */}
      {showHelpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Need Help?</h3>
              <p className="text-gray-600 mb-6">
                Chat with us on WhatsApp for instant support and assistance with your store.
              </p>
              <WhatsAppSupportButton 
                message="Hi! I need help with my store on The Mall. Can you please assist me?"
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardMenubar;
