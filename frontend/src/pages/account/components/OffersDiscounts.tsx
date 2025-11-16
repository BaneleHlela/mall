import React from 'react';
import { FaArrowLeft, FaGift, FaPercent, FaTags } from 'react-icons/fa';

interface OffersDiscountsProps {
  onBack: () => void;
}

const OffersDiscounts: React.FC<OffersDiscountsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-stone-600" />
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">Offers & Discounts</h1>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <FaGift className="mx-auto text-stone-400 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-stone-600 mb-2">No offers available</h2>
            <p className="text-stone-500">Check back later for exclusive deals and discounts!</p>
          </div>
        </div>

        {/* Placeholder Cards for Future Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200 opacity-50">
            <div className="flex items-center mb-3">
              <FaPercent className="text-purple-600 text-2xl mr-3" />
              <div>
                <h3 className="font-semibold text-purple-800">Percentage Discounts</h3>
                <p className="text-purple-600 text-sm">Save on your favorite items</p>
              </div>
            </div>
            <p className="text-purple-700 text-sm">Coming soon...</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200 opacity-50">
            <div className="flex items-center mb-3">
              <FaTags className="text-orange-600 text-2xl mr-3" />
              <div>
                <h3 className="font-semibold text-orange-800">Promo Codes</h3>
                <p className="text-orange-600 text-sm">Exclusive discount codes</p>
              </div>
            </div>
            <p className="text-orange-700 text-sm">Coming soon...</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200 opacity-50">
            <div className="flex items-center mb-3">
              <FaGift className="text-green-600 text-2xl mr-3" />
              <div>
                <h3 className="font-semibold text-green-800">Seasonal Offers</h3>
                <p className="text-green-600 text-sm">Holiday and special event deals</p>
              </div>
            </div>
            <p className="text-green-700 text-sm">Coming soon...</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 opacity-50">
            <div className="flex items-center mb-3">
              <FaPercent className="text-blue-600 text-2xl mr-3" />
              <div>
                <h3 className="font-semibold text-blue-800">Loyalty Rewards</h3>
                <p className="text-blue-600 text-sm">Earn points and get rewards</p>
              </div>
            </div>
            <p className="text-blue-700 text-sm">Coming soon...</p>
          </div>
        </div>

        {/* Newsletter Signup Placeholder */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4 text-center">
            Stay Updated on Offers
          </h3>
          <p className="text-stone-600 text-center mb-4">
            Be the first to know about new deals and exclusive discounts
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-stone-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
            <button
              disabled
              className="bg-stone-400 text-white px-6 py-2 rounded-r-lg cursor-not-allowed"
            >
              Notify Me
            </button>
          </div>
          <p className="text-stone-400 text-xs text-center mt-2">
            Feature coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default OffersDiscounts;