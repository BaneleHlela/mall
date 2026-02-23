import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
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
    //{ id: 'purchases', label: 'My purchases', icon: FaShoppingBag, color: 'from-emerald-500 to-teal-600', bgColor: 'bg-emerald-50' },
    { id: 'bookings', label: 'My bookings', icon: FaCalendarCheck, color: 'from-orange-500 to-amber-600', bgColor: 'bg-orange-50' },
    //{ id: 'payment-methods', label: 'Payment methods', icon: FaCreditCard, color: 'from-pink-500 to-rose-600', bgColor: 'bg-pink-50' },
    { id: 'credit-history', label: 'Credit history', icon: FaHistory, color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50' },
    //{ id: 'offers', label: 'Offers & discounts', icon: FaGift, color: 'from-yellow-500 to-orange-600', bgColor: 'bg-yellow-50' },
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
            <ProtectedRoute>
              <UserBookings onBack={() => setCurrentSection('main')} />
            </ProtectedRoute>
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
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {renderSection()}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col">
      {/* Header Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-10 pb-15 px-6 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className="relative cursor-pointer group"
            onClick={handleAvatarClick}
          >
            {/* Avatar Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
            
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                  <FaUser className="text-white/80 text-3xl" />
                </div>
              )}
              
              {/* Edit Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FaPencil className='text-white text-lg'/>
              </div>
            </div>
          </div>
          
          {/* User Name */}
          <h2 className="mt-4 text-xl font-semibold text-white tracking-tight">
            {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'Guest User'}
          </h2>
          
          {/* Member Badge */}
          {isAuthenticated && (
            <span className="mt-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 font-medium">
              Member
            </span>
          )}
        </div>
      </div>

      {/* Location Card - Floating */}
      <div className="px-4 -mt-8 relative z-20">
        <button
          onClick={handleLocationClick}
          className="w-full bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-4 flex items-center gap-3 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 border border-gray-100"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <FaMapMarkerAlt className="text-white text-sm" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Delivery Location</p>
            <p className='text-sm font-semibold text-gray-800 truncate'>
              {user?.locations && user.locations.length > 0 
                ? `${user.locations[0].nickname} • ${user.locations[0].address}` 
                : 'No location set'
              }
            </p>
          </div>
          <IoMdArrowDropdown className='text-gray-400 text-xl flex-shrink-0'/>
        </button>
      </div>

      {/* Account Options Section */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {accountOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setCurrentSection(option.id as AccountSection)}
                className="w-full group bg-white rounded-2xl p-3 flex items-center gap-4 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 border border-gray-100 hover:border-gray-200 active:scale-[0.98]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon Container */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg shadow-gray-200/50 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white text-lg" />
                </div>
                
                {/* Label */}
                <span className="flex-1 text-left text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                  {option.label}
                </span>
                
                {/* Arrow */}
                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sign In/Out Section */}
      <div className="px-4 pb-8 lg:pb-8 mb-10 lg:mb-0">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-red-400 disabled:to-rose-500 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-200/60 transition-all duration-300 active:scale-[0.98]"
          >
            <FaSignOutAlt className="text-lg" />
            <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
          </button>
        ) : (
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-gray-300/50 hover:shadow-xl hover:shadow-gray-300/60 transition-all duration-300 active:scale-[0.98]"
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
