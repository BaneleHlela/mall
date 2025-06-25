import StoreDashboardTopbar from "../../../components/store_dashboard/menubar/StoreDashboardTopbar";
import DashboardNumbersBoard from "../../../components/store_dashboard/overview/DashboardNumbersBoard";
import type { Store } from "../../../types/storeTypes";

  
  const StoreOverview = ({ store }: { store: Store }) => {
    return (
      <div className="w-full h-full max-h-[100dvh]  bg-gray-100 overflow-clip">
        <div className="w-full h-[83%] m-1">
            <DashboardNumbersBoard />
        </div>    
      </div>
    );
  };
  
  export default StoreOverview;