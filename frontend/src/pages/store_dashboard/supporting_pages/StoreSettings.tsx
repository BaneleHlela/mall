import { ChartArea, UsersRound, ClockArrowUp, CalendarArrowUp, UserCheck, ShoppingBag, HandHelping, Package, LayoutDashboard, Images } from "lucide-react";
import { store } from "../../../app/store";
import LogoSettings from "../../../components/layout_settings/logo/LogoControl"
import { useParams } from "react-router-dom";
import DashboardSettingsLink from "../../../components/store_dashboard/menubar/DashboardSettingsLink";

const StoreSettings = () => {
  const { storeId } = useParams<{ storeId: string }>();
  return (
    <div className="w-full h-full p-1">
      <div className="w-full h-full bg-white rounded text-center flex flex-col">
        {/* Title */}
        <h1 className="py-5 text-2xl font-[500]">Store Settings</h1>
        {/* Links */}
        <div className="w-full p-2">
          <DashboardSettingsLink 
            linkTo={`/dashboard/${storeId}/settings/logo`} 
            icon={<></>} 
            text="Logo" 
          />
          <DashboardSettingsLink 
            linkTo={`/dashboard/${storeId}/settings/basic`} 
            icon={<></>} 
            text="Name & Contact" 
          />
          <DashboardSettingsLink 
            linkTo={`/dashboard/${storeId}/settings/trade`} 
            icon={<></>} 
            text="Trade Options" 
          />
          <DashboardSettingsLink 
            linkTo={`/dashboard/${storeId}/settings/operating-hours`}  
            icon={<></>} 
            text="Operating Hours"  
          />
          <DashboardSettingsLink 
            linkTo={`/dashboard/${storeId}/settings/location`}  
            icon={<></>} 
            text="Location"  
          />
          <DashboardSettingsLink 
            linkTo={`/dashboard/${storeId}/settings/socials`}  
            icon={<></>} 
            text="Socials"  
          />
          <DashboardSettingsLink 
            linkTo={`/dashboard/${storeId}/settings/about`}  
            icon={<></>} 
            text="About"  
          />
        </div>
        {/* Delete store */}
        <div className="w-full flex flex-col items-center mt-5">
          <button className="text-red-600 font-semibold">Delete Store</button>
        </div>
      </div>
    </div>
  )
}

export default StoreSettings;