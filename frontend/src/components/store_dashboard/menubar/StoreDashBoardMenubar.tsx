import {
  RiQuestionAnswerLine,
  RiVipCrown2Fill,
  RiVipCrown2Line,
} from "react-icons/ri";
import {
  FaUserCheck,
  FaUsers,
  FaHandsHelping,
  FaChartArea,
  FaRegImages,
  FaCheck,
} from "react-icons/fa";
import {
  PiPackageBold,
  PiShoppingBagBold,
  PiClockBold,
} from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileImage } from "react-icons/lu";
import DashboardLink from "./DashboardLink";
import type { Store } from "../../../types/storeTypes";
import { IoMdClose } from "react-icons/io";
import StorePosterRatingStars from "../../the_mall/basic_store_post/StorePosterRatingStars";
import { useNavigate } from "react-router-dom";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useState } from "react";

interface Props {
  store: Store;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

// Premium Modal Component
const PremiumModal = ({ 
  isOpen, 
  onClose, 
  isSubscribed 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  isSubscribed: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 p-6 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <IoMdClose className="text-white" size={18} />
          </button>
          
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <RiVipCrown2Fill className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Premium Store</h2>
              <p className="text-white/80 text-sm">Unlock exclusive features</p>
            </div>
          </div>
        </div>

        {isSubscribed ? (
          /* Subscribed State */
          <div className="p-6">
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mb-4">
                <FaCheck className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">You're Premium!</h3>
              <p className="text-gray-500 mb-6">
                Enjoy all premium features and exclusive benefits for your store.
              </p>
              
              <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Current Plan</span>
                  <span className="font-semibold text-green-600">Premium</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Renewal</span>
                  <span className="text-gray-800 font-medium">Feb 24, 2027</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Not Subscribed State */
          <div className="p-6">
            {/* Features List */}
            <div className="space-y-3 mb-6">
              {[
                "Priority listing in search results",
                "Advanced analytics & insights",
                "Custom domain support",
                "Premium customer support",
                "Unlimited product listings",
                "Exclusive marketing tools"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border border-amber-100">
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-3xl font-bold text-gray-800">$29</span>
                <span className="text-gray-500 mb-1">/month</span>
              </div>
              <p className="text-center text-sm text-gray-500">
                <span className="line-through">$348</span> 
                <span className="text-green-600 font-medium ml-2">$199/year (Save 43%)</span>
              </p>
            </div>

            {/* CTA Button */}
            <button className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Upgrade to Premium
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-3">
              7-day free trial • Cancel anytime
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const StoreDashBoardMenubar = ({
  store,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}: Props) => {
  const navigate = useNavigate();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  
  // For demo purposes - in real app, this would come from store data
  const [isPremiumSubscribed, setIsPremiumSubscribed] = useState(false);

  const handleLinkClick = () => {
    if (isMobileMenuOpen && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSettingsClick = () => {
    handleLinkClick();
    navigate(`/dashboard/${store.slug}/settings`);
  };

  const handleHelpClick = () => {
    handleLinkClick();
    navigate(`/dashboard/${store.slug}/store-help`);
  };

  const handlePremiumClick = () => {
    handleLinkClick();
    setIsPremiumModalOpen(true);
  };

  return (
    <>
      <div
        className={`relative min-w-[280px] h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 ${
          isMobileMenuOpen ? "fixed lg:relative top-0 left-0 z-50 w-full lg:w-auto h-full" : "hidden lg:flex"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Mobile close button */}
        {isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen?.(false)}
            className="lg:hidden absolute top-4 right-4 z-60 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <IoMdClose size={24} />
          </button>
        )}

        {/* Store Header */}
        <div className="relative p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Store Logo/Avatar */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden">
              {store.logo?.imageUrls?.[0] ? (
                <img 
                  src={store.logo.imageUrls[0]} 
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                store.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-lg truncate">{store.name}</h2>
              <div className="flex items-center gap-2">
                <StorePosterRatingStars
                  rating={store.rating ? store.rating.averageRating : 0}
                  color="text-amber-400"
                  size="small"
                />
                <span className="text-white/50 text-xs">
                  ({store.rating?.numberOfRatings || 0})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Banner */}
        <div 
          onClick={handlePremiumClick}
          className={`mx-4 mt-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
            isPremiumSubscribed 
              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30'
              : 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 border border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isPremiumSubscribed 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                : 'bg-gradient-to-r from-amber-500 to-orange-500'
            }`}>
              <RiVipCrown2Fill className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">
                {isPremiumSubscribed ? 'Premium Active' : 'Upgrade to Premium'}
              </p>
              <p className="text-white/50 text-xs">
                {isPremiumSubscribed ? 'All features unlocked' : 'Get exclusive benefits'}
              </p>
            </div>
            {isPremiumSubscribed && (
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <FaCheck className="text-white text-xs" />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 hide-scrollbar">
          <div className="mb-2 px-3">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Main</span>
          </div>

          <DashboardLink
            linkTo={`/dashboard/${store.slug}`}
            icon={<FaChartArea className="text-lg" />}
            text="Overview"
            onClick={handleLinkClick}
          />

          <DashboardLink
            linkTo={`/dashboard/${store.slug}/team`}
            icon={<FaUsers className="text-lg" />}
            beta={true}
            text="Team"
            onClick={handleLinkClick}
          />

          {store.trades.includes("products") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/orders`}
              icon={<PiClockBold className="text-lg" />}
              text="Orders"
              onClick={handleLinkClick}
            />
          )}

          {store.trades.includes("services") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/bookings`}
              icon={<MdOutlineCleaningServices className="text-lg" />}
              text="Bookings"
              onClick={handleLinkClick}
            />
          )}

          {store.trades.includes("packages") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/subscriptions`}
              icon={<FaUserCheck className="text-lg" />}
              text="Subscriptions"
              onClick={handleLinkClick}
            />
          )}

          <div className="mt-4 mb-2 px-3">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Inventory</span>
          </div>

          {store.trades.includes("products") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/products`}
              icon={<PiShoppingBagBold className="text-lg" />}
              text="Products"
              onClick={handleLinkClick}
            />
          )}

          {store.trades.includes("services") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/services`}
              icon={<FaHandsHelping className="text-lg" />}
              text="Services"
              onClick={handleLinkClick}
            />
          )}

          {store.trades.includes("packages") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/packages`}
              icon={<PiPackageBold className="text-lg" />}
              text="Packages"
              onClick={handleLinkClick}
            />
          )}

          {store.trades.includes("rentals") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/rentals`}
              icon={<FaKey className="text-lg" />}
              text="Rentals"
              onClick={handleLinkClick}
            />
          )}

          {store.trades.includes("donations") && (
            <DashboardLink
              linkTo={`/dashboard/${store.slug}/donations`}
              icon={<FaHandsHelping className="text-lg" />}
              text="Donations"
              onClick={handleLinkClick}
            />
          )}

          <div className="mt-4 mb-2 px-3">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Design</span>
          </div>

          <DashboardLink
            linkTo={`/dashboard/${store.slug}/layouts`}
            icon={<RxDashboard className="text-lg" />}
            text="Layouts"
            onClick={handleLinkClick}
          />

          <DashboardLink
            linkTo={`/dashboard/${store.slug}/posters`}
            icon={<LuFileImage className="text-lg" />}
            text="Posters"
            onClick={handleLinkClick}
          />

          <DashboardLink
            linkTo={`/dashboard/${store.slug}/images`}
            icon={<FaRegImages className="text-lg" />}
            text="Images"
            onClick={handleLinkClick}
          />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleSettingsClick}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <IoSettingsOutline className="text-white/60 group-hover:text-white text-xl transition-colors" />
              <span className="text-white/60 group-hover:text-white text-xs font-medium transition-colors">Settings</span>
            </button>

            <button
              onClick={handleHelpClick}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <RiQuestionAnswerLine className="text-white/60 group-hover:text-white text-xl transition-colors" />
              <span className="text-white/60 group-hover:text-white text-xs font-medium transition-colors">Help</span>
            </button>

            <button
              onClick={handleLinkClick}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors group"
            >
              <FiLogOut className="text-red-400 group-hover:text-red-300 text-xl transition-colors" />
              <span className="text-red-400 group-hover:text-red-300 text-xs font-medium transition-colors">Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      <PremiumModal 
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        isSubscribed={isPremiumSubscribed}
      />
    </>
  );
};

export default StoreDashBoardMenubar;
