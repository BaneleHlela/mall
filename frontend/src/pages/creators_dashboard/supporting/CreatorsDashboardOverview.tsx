import { useEffect, useState } from "react";
import axios from "axios";

const CreatorsDashboardOverview = () => {
  const [stats, setStats] = useState({
    totalStores: 0,
    activeStores: 0,
    blockedStores: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/stores`);
        const stores = response.data;
        
        setStats({
          totalStores: stores.length,
          activeStores: stores.filter((s: any) => !s.isBlocked).length,
          blockedStores: stores.filter((s: any) => s.isBlocked).length,
          totalUsers: stores.reduce((acc: number, store: any) => acc + (store.team?.length || 0), 0),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Stores",
      value: stats.totalStores,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Active Stores",
      value: stats.activeStores,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Blocked Stores",
      value: stats.blockedStores,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50">
      <div className="w-full p-4 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
          <p className="text-slate-500 mt-1">Monitor platform statistics and key metrics</p>
        </div>
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={`bg-gradient-to-r ${stat.color} p-2 rounded-lg text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/creators-dashboard/stores"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors border border-purple-100"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-800">Manage Stores</p>
                <p className="text-sm text-slate-500">View and edit all stores</p>
              </div>
            </a>
            
            <a
              href="/add-store"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors border border-green-100"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-800">Add New Store</p>
                <p className="text-sm text-slate-500">Create a new store</p>
              </div>
            </a>

            <a
              href="/creators-dashboard/stores?filter=blocked"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 transition-colors border border-red-100"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-800">Blocked Stores</p>
                <p className="text-sm text-slate-500">{stats.blockedStores} stores blocked</p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Stores</h2>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-slate-500 mb-4">View all stores in the Stores tab</p>
            <a
              href="/creators-dashboard/stores"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            >
              View All Stores
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorsDashboardOverview;
