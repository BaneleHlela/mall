import React from 'react';
import { FaHistory, FaCoins, FaArrowUp, FaArrowDown, FaGift, FaUserFriends } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

interface CreditHistoryProps {
  onBack: () => void;
}

const CreditHistory: React.FC<CreditHistoryProps> = ({ onBack }) => {
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
            <h1 className="text-xl font-semibold text-white">Credit History</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl shadow-purple-200/50 p-6 mb-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-1">Current Balance</p>
            <div className="flex items-baseline gap-2">
              <FaCoins className="text-yellow-300 text-2xl" />
              <span className="text-4xl font-bold">1,250</span>
              <span className="text-white/80">credits</span>
            </div>
            <p className="text-white/60 text-xs mt-2">≈ $12.50 value</p>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-8 text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-amber-200 flex items-center justify-center mx-auto mb-4">
            <FaCoins className="text-amber-600 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Credit History Coming Soon</h2>
          <p className="text-gray-500 text-sm">Track your credit earnings and redemptions</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-5 border border-emerald-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg shadow-emerald-200/50">
              <FaArrowUp className="text-white" />
            </div>
            <h4 className="font-semibold text-emerald-800 mb-1">Earned Credits</h4>
            <p className="text-emerald-600 text-xs">From purchases & referrals</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-5 border border-blue-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-200/50">
              <FaArrowDown className="text-white" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-1">Used Credits</h4>
            <p className="text-blue-600 text-xs">Discounts & redemptions</p>
          </div>
        </div>

        {/* What you'll be able to do */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaHistory className="text-indigo-600" />
            What you'll be able to do:
          </h3>
          <ul className="space-y-3">
            {[
              'View your complete credit transaction history',
              'Track earned credits from purchases and referrals',
              'Monitor credit redemptions and usage',
              'See your current credit balance',
              'Export credit statements for your records',
              'Set up credit balance alerts and notifications'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Preview Transactions */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden opacity-60">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaHistory className="text-gray-400" />
              Recent Transactions (Preview)
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { type: 'earned', label: 'Purchase Reward', desc: 'Order #12345 - Tech Store', amount: '+50' },
              { type: 'used', label: 'Discount Applied', desc: 'Coffee Shop Purchase', amount: '-25' },
              { type: 'earned', label: 'Referral Bonus', desc: 'Friend joined the platform', amount: '+100' },
            ].map((tx, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'earned' 
                      ? 'bg-gradient-to-br from-emerald-100 to-teal-200' 
                      : 'bg-gradient-to-br from-red-100 to-rose-200'
                  }`}>
                    {tx.type === 'earned' ? (
                      <FaGift className="text-emerald-600" />
                    ) : (
                      <FaArrowDown className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{tx.label}</p>
                    <p className="text-gray-500 text-xs">{tx.desc}</p>
                  </div>
                </div>
                <span className={`font-semibold ${tx.type === 'earned' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.amount} credits
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 text-center">
            <span className="text-xs text-gray-400 font-medium">Preview Only - Feature Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditHistory;
