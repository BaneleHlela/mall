import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import DashboardLink from "../../store_dashboard/menubar/DashboardLink";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { logout } from "../../../features/user/userSlice";
import { FaTruck, FaMoneyBillWave, FaMapMarkedAlt, FaUser, FaClipboardList } from "react-icons/fa";

interface Props {
  driver: any;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const DriverDashboardMenubar = ({ driver, isMobileMenuOpen, setIsMobileMenuOpen }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const menuItems = [
    { icon: <RxDashboard size={20} />, label: "Overview", path: "/" },
    { icon: <FaClipboardList size={20} />, label: "Jobs", path: "/jobs" },
    { icon: <FaMoneyBillWave size={20} />, label: "Earnings", path: "/earnings" },
    { icon: <FaMapMarkedAlt size={20} />, label: "Zones", path: "/zones" },
    { icon: <FaUser size={20} />, label: "Profile", path: "/profile" },
    { icon: <IoSettingsOutline size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <FaTruck className="text-white" size={22} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900">Driver Hub</h1>
            <p className="text-xs text-slate-500">The Mall</p>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen?.(false)}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
        >
          <IoMdClose size={20} />
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
            {driver?.userId?.firstName?.[0]}{driver?.userId?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-slate-900 truncate">
              {driver?.userId?.firstName} {driver?.userId?.lastName}
            </p>
            <p className="text-xs text-slate-500 truncate">{driver?.userId?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {menuItems.map((item, index) => (
          <DashboardLink
            key={index}
            icon={item.icon}
            label={item.label}
            to={`/driver-dashboard${item.path}`}
            onClick={() => setIsMobileMenuOpen?.(false)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <FiLogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DriverDashboardMenubar;
