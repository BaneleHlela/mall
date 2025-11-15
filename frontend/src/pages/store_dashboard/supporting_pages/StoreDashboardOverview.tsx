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
    <div className="relative w-full h-fit overflow-y-scroll lg:h-full lg:max-h-[100dvh] py-1 overflow-clip">
      <div className="w-full px-[1vh] lg:px-[4vh] h-full space-y-[.7vh]">
          <StoreDashboardStatCardsBoard />
          {/* Desktop */}
          <div className="lg:flex lg:h-[50%] w-full lg:flex-row justify-between space-y-2">
            {/* Graphs */}
            <div className="relative h-[40vh] lg:w-[55%] lg:h-full">
              <GraphCard title="Visits This Week" data={sampleData} />
              <div className="absolute inset-0 w-full h-full shadow-lg blur-xl z-1"></div>
            </div>
            {/* Charts */}
            <div className="h-[20vh] lg:h-full w-full lg:w-[44%] flex items-center justify-center overflow-clip">
              <TrafficSourcesCard />
            </div>
          </div>
          <div className="h-[50vh] w-full flex flex-col lg:flex-row justify-between lg:h-[30%] space-y-2">
            <div className="w-full border-2 border-white rounded-[1.5vh] lg:w-[65%] h-full overflow-clip hide-scrollbar">
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
            <div className="border-2 rounded-[1.5vh] border-white w-full lg:w-[34%] h-[50%] lg:h-full">
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
      <div className=""></div>    
    </div>
  );
};

export default StoreOverview;