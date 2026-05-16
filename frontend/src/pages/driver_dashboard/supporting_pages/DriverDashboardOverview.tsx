import { useAppDispatch } from "../../../app/hooks";
import { toggleDriverLive } from "../../../features/driver/driverSlice";
import { FaTruck, FaMoneyBillWave, FaStar, FaClipboardList } from "react-icons/fa";

interface Props {
  driver: any;
}

const DriverOverview = ({ driver }: Props) => {
  const dispatch = useAppDispatch();

  const handleLiveToggle = async () => {
    await dispatch(toggleDriverLive());
  };

  const stats = [
    { icon: <FaClipboardList />, label: "Total Deliveries", value: driver?.earnings?.totalDeliveries || 0 },
    { icon: <FaMoneyBillWave />, label: "Total Earned", value: `R${driver?.earnings?.totalEarned || 0}` },
    { icon: <FaStar />, label: "Rating", value: driver?.rating?.average?.toFixed(1) || "0.0" },
    { icon: <FaTruck />, label: "Status", value: driver?.isLive ? "Live" : "Offline" },
  ];

  return (
    <div className="w-full max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {driver?.userId?.firstName}!</h1>
        <p className="text-slate-500 mt-1">Here's your delivery overview</p>
      </div>

      {/* Live Toggle */}
      <div className="mb-8 p-6 bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Availability Status</h3>
            <p className="text-sm text-slate-500">Toggle to start accepting deliveries</p>
          </div>
          <button
            onClick={handleLiveToggle}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              driver?.isLive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {driver?.isLive ? 'Go Offline' : 'Go Live'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-white rounded-2xl border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/driver-dashboard/jobs" className="px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
            View Available Jobs
          </a>
          <a href="/driver-dashboard/zones" className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            Manage Delivery Zones
          </a>
          <a href="/driver-dashboard/earnings" className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            View Earnings
          </a>
        </div>
      </div>
    </div>
  );
};

export default DriverOverview;
