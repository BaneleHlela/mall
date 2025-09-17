import StoreDashboardTopbar from "../../../components/store_dashboard/menubar/StoreDashboardTopbar";
import AIQuickInsights from "../../../components/store_dashboard/overview/AIQuickInsights";
import GraphCard from "../../../components/store_dashboard/overview/GraphCard";
import StoreDashboardStatCardsBoard from "../../../components/store_dashboard/overview/StoreDashboardStatCardsBoard";
import TopItemsTable from "../../../components/store_dashboard/overview/TopItemsList";
import TopItemsList from "../../../components/store_dashboard/overview/TopItemsList";
import TrafficSourcesCard from "../../../components/store_dashboard/overview/TrafficSourcesCard";
import type { Store } from "../../../types/storeTypes";

const sampleData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 200 },
  { name: "Wed", value: 150 },
  { name: "Thu", value: 300 },
  { name: "Fri", value: 250 },
  { name: "Sat", value: 400 },
  { name: "Sun", value: 280 },
]

const StoreOverview = ({ store }: { store: Store }) => {
  
  return (
    <div className="w-full h-full max-h-[100dvh]  bg-gray-100 overflow-clip">
      <div className="w-full px-[4vh] h-full space-y-[.7vh]">
          <StoreDashboardStatCardsBoard />
          <div className="h-[50%] w-full flex flex-row justify-between">
            {/* Graphs */}
            <div className="h-full w-[55%]">
              <GraphCard title="Visits This Week" data={sampleData} />
            </div>
            {/* Charts */}
            <div className="h-full w-[44%] flex items-center justify-center">
              <TrafficSourcesCard />
            </div>
          </div>
          <div className="w-full flex flex-row justify-between h-[30%]">
            <div className="w-[65%] h-full overflow-y-scroll hide-scrollbar">
              <TopItemsTable
                title="Top Products"
                products={[
                  {
                    id: 1,
                    name: "27-inch iMac With Retina 5K Display",
                    dateAdded: "December 12, 2020",
                    price: 1200,
                    totalEarning: 17932,
                    image: "/images/imac.png",
                  },
                  {
                    id: 2,
                    name: "Beats Solo Pro Wireless",
                    dateAdded: "January 28, 2021",
                    price: 299,
                    totalEarning: 15321,
                    image: "/images/beats.png",
                  },
                  {
                    id: 3,
                    name: "Intel Core i5U Series",
                    dateAdded: "March 22, 2021",
                    price: 115,
                    totalEarning: 14321,
                    image: "/images/cpu.png",
                  },
                ]}
              />
            </div>
            <div className="w-[34%] h-full">
              <AIQuickInsights
                insights={[
                  { id: 1, text: "Your visits are up 15% compared to last week." },
                  { id: 2, text: "Most traffic came from Instagram today." },
                  { id: 3, text: "Bookings peak on Fridays between 4–6pm." },
                ]}
              />
            </div>
          </div>          
      </div>    
    </div>
  );
};

export default StoreOverview;