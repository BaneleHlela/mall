import React from 'react';
import { FaGift, FaPercent, FaTags, FaBell, FaStar } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

interface OffersDiscountsProps {
  onBack: () => void;
}

const OffersDiscounts: React.FC<OffersDiscountsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-6 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoChevronBackOutline className='text-white text-xl'/>
            </button>
            <h1 className="text-xl font-semibold text-white">Offers & Discounts</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {/* Empty State */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-10 text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center mx-auto mb-5">
            <FaGift className="text-orange-500 text-3xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No offers available</h2>
          <p className="text-gray-500 text-sm">Check back later for exclusive deals and discounts!</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-2xl p-5 border border-violet-200 opacity-60">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg shadow-violet-200/50">
              <FaPercent className="text-white" />
            </div>
            <h4 className="font-semibold text-violet-800 mb-1">Percentage Off</h4>
            <p className="text-violet-600 text-xs">Save on favorite items</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl p-5 border border-orange-200 opacity-60">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-3 shadow-lg shadow-orange-200/50">
              <FaTags className="text-white" />
            </div>
            <h4 className="font-semibold text-orange-800 mb-1">Promo Codes</h4>
            <p className="text-orange-600 text-xs">Exclusive discount codes</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-5 border border-emerald-200 opacity-60">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg shadow-emerald-200/50">
              <FaGift className="text-white" />
            </div>
            <h4 className="font-semibold text-emerald-800 mb-1">Seasonal Deals</h4>
            <p className="text-emerald-600 text-xs">Holiday special offers</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-5 border border-blue-200 opacity-60">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-200/50">
              <FaStar className="text-white" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-1">Loyalty Rewards</h4>
            <p className="text-blue-600 text-xs">Earn points & rewards</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-200/50">
              <FaBell className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Stay Updated</h3>
              <p className="text-gray-500 text-xs">Be the first to know about new deals</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all text-sm"
              disabled
            />
            <button
              disabled
              className="bg-gray-200 text-gray-400 px-5 py-3 rounded-xl font-medium cursor-not-allowed"
            >
              Notify Me
            </button>
          </div>
          <p className="text-gray-400 text-xs text-center mt-3">
            Feature coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default OffersDiscounts;
