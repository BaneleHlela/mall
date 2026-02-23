import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { FaShoppingBag, FaCalendarAlt, FaSubscript, FaCar, FaBox, FaCalendar, FaCreditCard, FaChevronRight } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

interface MyPurchasesProps {
  onBack: () => void;
}

type PurchaseSection = 'main' | 'orders' | 'bookings' | 'subscriptions' | 'rentals';

const MyPurchases: React.FC<MyPurchasesProps> = ({ onBack }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [currentSection, setCurrentSection] = useState<PurchaseSection>('main');

  const purchaseOptions = [
    { 
      id: 'orders', 
      label: 'My Orders', 
      icon: FaShoppingBag, 
      description: 'View your order history',
      color: 'from-emerald-500 to-teal-600',
      shadowColor: 'shadow-emerald-200/50'
    },
    { 
      id: 'bookings', 
      label: 'My Bookings', 
      icon: FaCalendarAlt, 
      description: 'Manage your appointments',
      color: 'from-blue-500 to-cyan-600',
      shadowColor: 'shadow-blue-200/50'
    },
    { 
      id: 'subscriptions', 
      label: 'My Subscriptions', 
      icon: FaSubscript, 
      description: 'Active subscription services',
      color: 'from-violet-500 to-purple-600',
      shadowColor: 'shadow-violet-200/50'
    },
    { 
      id: 'rentals', 
      label: 'My Rentals', 
      icon: FaCar, 
      description: 'Rental history and active rentals',
      color: 'from-orange-500 to-amber-600',
      shadowColor: 'shadow-orange-200/50'
    },
  ];

  if (currentSection !== 'main') {
    const renderSection = () => {
      switch (currentSection) {
        case 'orders':
          return <OrdersSection onBack={() => setCurrentSection('main')} />;
        case 'bookings':
          return <BookingsSection onBack={() => setCurrentSection('main')} />;
        case 'subscriptions':
          return <SubscriptionsSection onBack={() => setCurrentSection('main')} />;
        case 'rentals':
          return <RentalsSection onBack={() => setCurrentSection('main')} />;
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {renderSection()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-6 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoChevronBackOutline className='text-white text-xl'/>
            </button>
            <h1 className="text-xl font-semibold text-white">My Purchases</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 -mt-8">
        <div className="space-y-3">
          {purchaseOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setCurrentSection(option.id as PurchaseSection)}
                className="w-full bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-5 flex items-center gap-4 hover:shadow-xl transition-all duration-300 border border-gray-100 group active:scale-[0.98]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg ${option.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white text-xl" />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-left">
                  <span className="text-gray-800 font-semibold block">{option.label}</span>
                  <span className="text-gray-500 text-sm">{option.description}</span>
                </div>
                
                {/* Arrow */}
                <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Orders Section Component
const OrdersSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 89.99,
      items: ['Wireless Headphones', 'Phone Case'],
      store: 'Tech Store'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Processing',
      total: 45.50,
      items: ['Coffee Beans', 'Mug'],
      store: 'Coffee Shop'
    }
  ];

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
            <h1 className="text-xl font-semibold text-white">My Orders</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-12 text-center border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
              <FaBox className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-500">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                {/* Order Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                      <p className="text-gray-500 text-sm">{order.store}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' 
                        ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700' 
                        : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="p-5 bg-gray-50/50">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Items</p>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Order Footer */}
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">{order.date}</p>
                    <p className="font-semibold text-gray-800">${order.total.toFixed(2)}</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Bookings Section Component
const BookingsSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const bookings = [
    {
      id: 'BK-001',
      service: 'Hair Cut & Style',
      provider: 'Beauty Salon',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'Confirmed'
    }
  ];

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
            <h1 className="text-xl font-semibold text-white">My Bookings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-12 text-center border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
              <FaCalendar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No bookings yet</h3>
            <p className="text-gray-500">Your appointment history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{booking.service}</h3>
                      <p className="text-gray-500 text-sm">{booking.provider}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700">
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <FaCalendar className="text-gray-400" />
                      {booking.date}
                    </span>
                    <span>{booking.time}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
                      Reschedule
                    </button>
                    <button className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Subscriptions Section Component
const SubscriptionsSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const subscriptions = [
    {
      id: 'SUB-001',
      name: 'Premium Membership',
      provider: 'Fitness Center',
      price: 29.99,
      billing: 'Monthly',
      nextBilling: '2024-02-01',
      status: 'Active'
    }
  ];

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
            <h1 className="text-xl font-semibold text-white">My Subscriptions</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-12 text-center border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
              <FaCreditCard className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No subscriptions yet</h3>
            <p className="text-gray-500">Your active subscriptions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{subscription.name}</h3>
                      <p className="text-gray-500 text-sm">{subscription.provider}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700">
                      {subscription.status}
                    </span>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 text-sm">Price</span>
                      <span className="font-semibold text-gray-800">${subscription.price} / {subscription.billing}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Next billing</span>
                      <span className="text-gray-700">{subscription.nextBilling}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors">
                      Manage
                    </button>
                    <button className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Rentals Section Component
const RentalsSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
            <h1 className="text-xl font-semibold text-white">My Rentals</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-12 text-center border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center mx-auto mb-4">
            <FaCar className="text-orange-500 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Rentals Coming Soon</h3>
          <p className="text-gray-500">This feature is not yet implemented</p>
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;
