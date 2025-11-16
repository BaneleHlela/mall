import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { FaArrowLeft, FaShoppingBag, FaCalendarAlt, FaSubscript, FaCar, FaBox, FaCalendar, FaCreditCard } from 'react-icons/fa';

interface MyPurchasesProps {
  onBack: () => void;
}

type PurchaseSection = 'main' | 'orders' | 'bookings' | 'subscriptions' | 'rentals';

const MyPurchases: React.FC<MyPurchasesProps> = ({ onBack }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [currentSection, setCurrentSection] = useState<PurchaseSection>('main');

  const purchaseOptions = [
    { id: 'orders', label: 'My Orders', icon: FaShoppingBag, description: 'View your order history' },
    { id: 'bookings', label: 'My Bookings', icon: FaCalendarAlt, description: 'Manage your appointments' },
    { id: 'subscriptions', label: 'My Subscriptions', icon: FaSubscript, description: 'Active subscription services' },
    { id: 'rentals', label: 'My Rentals', icon: FaCar, description: 'Rental history and active rentals' },
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
      <div className="min-h-screen bg-stone-100">
        {renderSection()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-stone-600" />
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">My Purchases</h1>
        </div>

        {/* Purchase Options */}
        <div className="space-y-3">
          {purchaseOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setCurrentSection(option.id as PurchaseSection)}
                className="w-full bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow border border-stone-200 hover:border-stone-300"
              >
                <div className="flex items-center">
                  <IconComponent className="text-stone-600 mr-3" size={20} />
                  <div className="text-left">
                    <span className="text-stone-800 font-medium block">{option.label}</span>
                    <span className="text-stone-500 text-sm">{option.description}</span>
                  </div>
                </div>
                <div className="text-stone-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
  // Mock orders data - in real app, this would come from API
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
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-stone-600" />
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">My Orders</h1>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaBox className="mx-auto text-stone-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-stone-600 mb-2">No orders yet</h3>
              <p className="text-stone-500">Your order history will appear here</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-stone-800">Order #{order.id}</h3>
                    <p className="text-stone-600 text-sm">{order.store}</p>
                    <p className="text-stone-500 text-sm">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-stone-600 text-sm mb-2">Items:</p>
                  <ul className="text-stone-700">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-stone-800">Total: ${order.total}</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
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
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-stone-600" />
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">My Bookings</h1>
        </div>

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaCalendar className="mx-auto text-stone-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-stone-600 mb-2">No bookings yet</h3>
              <p className="text-stone-500">Your appointment history will appear here</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-stone-800">{booking.service}</h3>
                    <p className="text-stone-600 text-sm">{booking.provider}</p>
                    <p className="text-stone-500 text-sm">{booking.date} at {booking.time}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {booking.status}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Reschedule</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Cancel</button>
                </div>
              </div>
            ))
          )}
        </div>
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
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-stone-600" />
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">My Subscriptions</h1>
        </div>

        <div className="space-y-4">
          {subscriptions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaCreditCard className="mx-auto text-stone-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-stone-600 mb-2">No subscriptions yet</h3>
              <p className="text-stone-500">Your active subscriptions will appear here</p>
            </div>
          ) : (
            subscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-stone-800">{subscription.name}</h3>
                    <p className="text-stone-600 text-sm">{subscription.provider}</p>
                    <p className="text-stone-500 text-sm">
                      ${subscription.price} / {subscription.billing}
                    </p>
                    <p className="text-stone-500 text-sm">
                      Next billing: {subscription.nextBilling}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {subscription.status}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Manage</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Cancel</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Rentals Section Component (Not implemented yet)
const RentalsSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-stone-200 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-stone-600" />
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">My Rentals</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FaCar className="mx-auto text-stone-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-stone-600 mb-2">Rentals Coming Soon</h3>
          <p className="text-stone-500">This feature is not yet implemented</p>
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;