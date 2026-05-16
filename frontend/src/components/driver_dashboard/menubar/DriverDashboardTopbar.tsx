import { Fade as Hamburger } from 'hamburger-react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../app/hooks';
import { FaDoorOpen, FaDoorClosed } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface Props {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const DriverDashboardTopbar = ({ isMobileMenuOpen = false, setIsMobileMenuOpen }: Props) => {
  const driver = useAppSelector((state) => state.driver.driver);
  const navigate = useNavigate();

  const isLive = driver?.isLive || false;

  return (
    <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 lg:px-6 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <Hamburger
            toggled={isMobileMenuOpen}
            toggle={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
            size={20}
            color="#64748b"
          />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">Driver Dashboard</h2>
          <p className="text-xs text-slate-500 hidden sm:block">Manage deliveries & earnings</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Live Status Indicator */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          isLive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-slate-100 text-slate-600'
        }`}>
          {isLive ? <FaDoorOpen size={16} /> : <FaDoorClosed size={16} />}
          <span>{isLive ? 'Live' : 'Offline'}</span>
        </div>

        {/* Notifications */}
        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors relative">
          <IoNotificationsOutline size={20} className="text-slate-600" />
        </button>

        {/* Profile Quick Link */}
        <button 
          onClick={() => navigate('/driver-dashboard/profile')}
          className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            {driver?.userId?.firstName?.[0]}{driver?.userId?.lastName?.[0]}
          </div>
        </button>
      </div>
    </div>
  );
};

export default DriverDashboardTopbar;
