import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { toggleDarkMode } from '../../features/theme/themeSlice';
import { logout, getProfile } from '../../features/user/userSlice';
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaCog, 
  FaHome, 
  FaShoppingBag, 
  FaCreditCard, 
  FaHistory, 
  FaGift, 
  FaQuestionCircle, 
  FaSignOutAlt, 
  FaSignInAlt,
  FaCalendarCheck
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import EditAvatarModal from './components/EditAvatarModal';
import MyAddresses from './components/MyAddresses';
import MyPurchases from './components/MyPurchases';
import PaymentMethods from './components/PaymentMethods';
import CreditHistory from './components/CreditHistory';
import OffersDiscounts from './components/OffersDiscounts';
import Help from './components/Help';
import { FaPencil } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ManageAccount from './components/ManageAccount';
import UserBookings from './components/UserBookings';
import ProtectedRoute from '../../components/the_mall/authorization/ProtectedRoute';

type AccountSection = 'main' | 'manage-account' | 'addresses' | 'purchases' | 'bookings' | 'payment-methods' | 'credit-history' | 'offers' | 'help';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.user);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const [currentSection, setCurrentSection] = useState<AccountSection>('main');
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getProfile() as any);
    }
  }, [dispatch, isAuthenticated, user]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Sign out?',
      text: 'You will be signed out of your account.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1f2937',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout() as any);
      }
    });
  };

  const handleAvatarClick = () => {
    if (isAuthenticated && user) {
      setShowEditAvatarModal(true);
    } else {
      navigate("/login")
    }
  };

  const handleLocationClick = () => {
    if (isAuthenticated && user ) {
      setCurrentSection("addresses")
    }
  };

  const accountOptions = [
    { id: 'manage-account', label: 'Manage account', icon: FaCog, color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50' },
    //{ id: 'addresses', label: 'My addresses', icon: FaHome, color: 'from-blue-500 to-cyan-600', bgColor: 'bg-blue-50' },
    { id: 'purchases', label: 'My purchases', icon: FaShoppingBag, color: 'from-emerald-500 to-teal-600', bgColor: 'bg-emerald-50' },
    { id: 'bookings', label: 'My bookings', icon: FaCalendarCheck, color: 'from-orange-500 to-amber-600', bgColor: 'bg-orange-50' },
    //{ id: 'payment-methods', label: 'Payment methods', icon: FaCreditCard, color: 'from-pink-500 to-rose-600', bgColor: 'bg-pink-50' },
    //{ id: 'credit-history', label: 'Credit history', icon: FaHistory, color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50' },
    { id: 'offers', label: 'Offers & discounts', icon: FaGift, color: 'from-yellow-500 to-orange-600', bgColor: 'bg-yellow-50' },
    { id: 'help', label: 'Help & support', icon: FaQuestionCircle, color: 'from-gray-500 to-slate-600', bgColor: 'bg-gray-50' },
  ];

  if (currentSection !== 'main') {
    const renderSection = () => {
      switch (currentSection) {
        case 'manage-account':
          return <ManageAccount onBack={() => setCurrentSection('main')} />;
        case 'addresses':
          return <MyAddresses onBack={() => setCurrentSection('main')} />;
        case 'purchases':
          return <MyPurchases onBack={() => setCurrentSection('main')} />;
        case 'payment-methods':
          return <PaymentMethods onBack={() => setCurrentSection('main')} />;
        case 'bookings':
          return ( 
              <UserBookings onBack={() => setCurrentSection('main')} />
          );
        case 'credit-history':
          return <CreditHistory onBack={() => setCurrentSection('main')} />;
        case 'offers':
          return <OffersDiscounts onBack={() => setCurrentSection('main')} />;
        case 'help':
          return <Help onBack={() => setCurrentSection('main')} />;
        default:
          return null;
      }
    };

    return (
      <div className="h-screen max-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <ProtectedRoute>
          {renderSection()}
        </ProtectedRoute>
      </div>
    );
  }

  return (
    <div className={`h-screen w-full max-w-md mx-auto dark:bg-orange-50 ${isDarkMode ? 'dark:bg-gray-900 text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'} flex flex-col`}>
      {/* Profile Header */}
      <div className="pt-10 pb-6 px-6">

        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Guest User'}
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          @{user?.username || 'guest'}
        </p>
      </div>

      {/* Account Settings */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLocationClick}
          className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-100'} rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 border`}
        >
          <span className="font-medium">Addresses</span>
          <IoMdArrowDropdown className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'} text-xl`} />
        </button>
        <div className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl p-4 mt-2 flex items-center justify-between border`}>
          <span className="font-medium">Dark Mode</span>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors duration-300`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
          </button>
        </div>
      </div>

      {/* Activity */}
      <div className="px-4 pb-4">
        <div className="space-y-2">
          <button
            onClick={() => setCurrentSection('purchases')}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50'} rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border`}
          >
            <span className="font-medium">Orders</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSection('bookings')}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50'} rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border`}
          >
            <span className="font-medium">Bookings</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50'} rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border opacity-50 cursor-not-allowed`}
          >
            <span className="font-medium">Rentals</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50'} rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border opacity-50 cursor-not-allowed`}
          >
            <span className="font-medium">Subscriptions</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Extras */}
      <div className="px-4 pb-4">
        <div className="space-y-2">
          <button
            onClick={() => setCurrentSection('offers')}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50'} rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border`}
          >
            <span className="font-medium">Offers & Discounts</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSection('help')}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-100 hover:bg-gray-50'} rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border`}
          >
            <span className="font-medium">Help & Support</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sign In/Out */}
      <div className="px-4 pb-8 mt-auto">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-red-400 disabled:to-rose-500 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
          >
            <FaSignOutAlt className="text-lg" />
            <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
          </button>
        ) : (
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
          >
            <FaSignInAlt className="text-lg" />
            <span>Sign in</span>
          </button>
        )}
      </div>

      {/* Edit Avatar Modal */}
      {showEditAvatarModal && (
        <EditAvatarModal
          isOpen={showEditAvatarModal}
          onClose={() => setShowEditAvatarModal(false)}
        />
      )}
    </div>
  );
};

export default Account;
