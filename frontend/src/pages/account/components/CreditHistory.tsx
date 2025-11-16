import React from 'react';
import { FaArrowLeft, FaHistory, FaCoins } from 'react-icons/fa';
import ComingSoon from '../../../components/the_mall/ComingSoon';

interface CreditHistoryProps {
  onBack: () => void;
}

const CreditHistory: React.FC<CreditHistoryProps> = ({ onBack }) => {
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
          <h1 className="text-2xl font-semibold text-stone-800">Credit History</h1>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <FaCoins className="mx-auto text-yellow-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Credit History Coming Soon</h2>
          </div>
          
          <div className="max-w-md mx-auto text-left space-y-4 mb-8">
            <div className="bg-stone-50 rounded-lg p-4">
              <h3 className="font-semibold text-stone-800 mb-2 flex items-center">
                <FaHistory className="mr-2 text-blue-600" />
                What you'll be able to do:
              </h3>
              <ul className="text-stone-600 space-y-2 text-sm">
                <li>• View your complete credit transaction history</li>
                <li>• Track earned credits from purchases and referrals</li>
                <li>• Monitor credit redemptions and usage</li>
                <li>• See your current credit balance</li>
                <li>• Export credit statements for your records</li>
                <li>• Set up credit balance alerts and notifications</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">How Credits Work:</h3>
              <p className="text-blue-700 text-sm">
                Credits are earned through purchases, referrals, and special promotions. 
                They can be used to get discounts on future purchases or unlock premium features. 
                Your credit history will show all transactions, making it easy to track your savings.
              </p>
            </div>
          </div>

          <div className="text-stone-500 text-sm">
            <p>This feature is currently under development and will be available soon.</p>
            <p className="mt-2">Stay tuned for updates!</p>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">+</span>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Earned Credits</h4>
                <p className="text-green-600 text-sm">Track all credits you've earned</p>
              </div>
            </div>
            <div className="text-green-700 text-sm">
              From purchases, referrals, and special offers
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">-</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800">Used Credits</h4>
                <p className="text-blue-600 text-sm">See how you've spent your credits</p>
              </div>
            </div>
            <div className="text-blue-700 text-sm">
              Discounts applied and features unlocked
            </div>
          </div>
        </div>

        {/* Mock Preview */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6 opacity-50">
          <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
            <FaHistory className="mr-2" />
            Recent Transactions (Preview)
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
              <div>
                <p className="font-medium text-stone-800">Purchase Reward</p>
                <p className="text-stone-500 text-sm">Order #12345 - Tech Store</p>
              </div>
              <span className="text-green-600 font-semibold">+50 credits</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
              <div>
                <p className="font-medium text-stone-800">Discount Applied</p>
                <p className="text-stone-500 text-sm">Coffee Shop Purchase</p>
              </div>
              <span className="text-red-600 font-semibold">-25 credits</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
              <div>
                <p className="font-medium text-stone-800">Referral Bonus</p>
                <p className="text-stone-500 text-sm">Friend joined the platform</p>
              </div>
              <span className="text-green-600 font-semibold">+100 credits</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="inline-block bg-stone-200 text-stone-600 px-4 py-2 rounded-lg">
              Preview Only - Feature Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditHistory;