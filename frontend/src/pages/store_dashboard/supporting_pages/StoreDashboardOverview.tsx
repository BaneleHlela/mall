import AIQuickInsights from "../../../components/store_dashboard/overview/AIQuickInsights";
import GraphCard from "../../../components/store_dashboard/overview/GraphCard";
import StoreDashboardStatCardsBoard from "../../../components/store_dashboard/overview/StoreDashboardStatCardsBoard";
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
    <div className="w-full h-full overflow-y-auto bg-slate-50">
      <div className="w-full p-4 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
          <p className="text-slate-500 mt-1">Monitor your store's performance and key metrics</p>
        </div>
        
        {/* Stats Cards */}
        <StoreDashboardStatCardsBoard />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 h-[350px] lg:h-[400px]">
            <GraphCard title="Visits This Week" data={sampleData} amount="2,340" />
          </div>
          
          {/* Traffic Sources */}
          <div className="h-[300px] lg:h-[400px]">
            <TrafficSourcesCard />
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Products */}
          <div className="lg:col-span-2">
            <TopItemsList
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
          
          {/* AI Insights */}
          <div>
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