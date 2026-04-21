import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
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
  FaCalendarCheck,
  FaQuestion
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import EditAvatarModal from './components/EditAvatarModal';
import MyAddresses from './components/MyAddresses';
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
import { SlArrowRight } from 'react-icons/sl';
import { PiAddressBookThin, PiMoonLight, PiSignIn, PiSignOut } from 'react-icons/pi';
import { BiArrowBack } from 'react-icons/bi';
import { useAppSelector } from '../../app/hooks';
import { IoNotificationsOutline } from 'react-icons/io5';
import UserOrders from './components/UserOrders';

type AccountSection = 'main' | 'manage-account' | 'addresses' | 'purchases' | 'bookings' | 'payment-methods' | 'credit-history' | 'offers' | 'help';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.user);
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const sectionParam = searchParams.get('section') as AccountSection | null;
  const [currentSection, setCurrentSection] = useState<AccountSection>(sectionParam || 'main');
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
          return <UserOrders onBack={() => setCurrentSection('main')} />;
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
    <div className={`h-screen w-full max-w-md mx-auto ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'} flex flex-col p-6 space-y-2`}>
      {/* Back Button & Header */}
      <div className="relative flex items-center justify-center w-full">
        <BiArrowBack onClick={() => navigate('/')} className={`absolute left-0 rounded-full ${isDarkMode ? ' bg-[#1f1f23] border-gray-800' : 'bg-gray-100 border-gray-200 text-gray-900'} p-2 text-[35px]`}/>
        <span className="text-lg">Settings</span>
      </div>
      {/* Profile Header */}
      <div
        onClick={() => setCurrentSection("manage-account")} 
        className={`flex items-center justify-between w-full border ${isDarkMode ? 'text-white bg-[#1f1f23] border-gray-800' : 'border-gray-200 text-gray-900'} rounded-[20px] p-3 mt-4`}>
        {/* Profile Picture */}
        <img
          onClick={handleAvatarClick} 
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${user?.firstName || "Guest"}+${user?.lastName || ""}&background=E5E7EB&color=111827`
          }
          alt="profile-picture"
          className="w-[16%] overflow-hidden aspect-square rounded-full object-cover"
        />
        <div className={`flex items-center justify-between w-[84%] ${isDarkMode ? 'dark:text-white ' : 'text-gray-900'} px-1`}>
          {/* Name and User Name */}
          <div className="flex flex-col items-start justify-center px-1">
            <h1 className={`text-[17px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              @{user?.username || 'guest'}
            </p>
          </div>
          <SlArrowRight className={`${isDarkMode ? 'text-stone-400 ' : 'text-gray-900'} text-xs`}/>
        </div>
      </div>

      {/* Account Settings */}
      <div className={`w-full border ${isDarkMode ? 'text-white bg-[#1f1f23] border-gray-800' : 'border-gray-200 text-gray-900'} rounded-[20px] text-[15px] py-1 overflow-hidden min-h-fit lg:py-0`}>
        <button
          onClick={handleLocationClick}
          className={`w-full ${isDarkMode ? ' text-white border-slate-600' : 'bg-white text-gray-900 border-gray-100'} p-3 flex items-center justify-between hover:shadow-lg transition-all duration-300`}
        >
          <div className="flex items-center space-x-2">
            <PiAddressBookThin className='text-gray-400 text-[18px]'/>
            <span className="">Address</span>
          </div>
          <SlArrowRight className={`${isDarkMode ? 'text-stone-400 ' : 'text-gray-900'} text-xs`}/>
        </button>
        <div 
          className={`w-full ${isDarkMode ? ' text-white border-slate-600' : 'bg-white text-gray-900 border-gray-100'} p-3 flex items-center justify-between hover:shadow-lg transition-all duration-300`}
        >
          <div className="flex items-center space-x-2">
            <PiMoonLight className='text-gray-400 text-[18px]'/>
            <span className="">Dark Mode</span>
          </div>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-[#ceff00]' : 'bg-gray-300'} relative transition-colors duration-300`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
          </button>
        </div>
        <div 
          className={`w-full ${isDarkMode ? ' text-white border-slate-600' : 'bg-white text-gray-900 border-gray-100'} p-3 flex items-center justify-between hover:shadow-lg transition-all duration-300`}
        >
          <div className="flex items-center space-x-2">
            <IoNotificationsOutline className='text-gray-400 text-[18px]'/>
            <span className="">Notifications</span>
          </div>
          <button
            //onClick={() => dispatch(toggleDarkMode())}
            className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-[#ceff00]' : 'bg-gray-300'} relative transition-colors duration-300`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
          </button>
        </div>
      </div>

      {/* Activity */}
      <div className={`w-full border ${isDarkMode ? 'text-white bg-[#1f1f23] border-gray-800' : 'border-gray-200 text-gray-900'} rounded-[20px] text-[15px] py-1 overflow-hidden min-h-fit lg:py-0`}>
        
        <button
          onClick={() => setCurrentSection('purchases')}
          className={`w-full p-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-2">
            <FaShoppingBag className="text-gray-400 text-[16px]" />
            <span>Orders</span>
          </div>
          <SlArrowRight className={`${isDarkMode ? 'text-stone-400' : 'text-gray-900'} text-xs`} />
        </button>

        <button
          onClick={() => setCurrentSection('bookings')}
          className={`w-full p-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} opacity-50`}
        >
          <div className="flex items-center space-x-2">
            <FaCalendarCheck className="text-gray-400 text-[16px]" />
            <span>Bookings</span>
          </div>
          <SlArrowRight className={`${isDarkMode ? 'text-stone-400' : 'text-gray-900'} text-xs`} />
        </button>

        <div className={`w-full p-3 flex items-center justify-between opacity-50`}>
          <div className="flex items-center space-x-2">
            <FaHome className="text-gray-400 text-[16px]" />
            <span>Rentals</span>
          </div>
          <SlArrowRight className="text-gray-400 text-xs" />
        </div>

        <div className={`w-full p-3 flex items-center justify-between opacity-50`}>
          <div className="flex items-center space-x-2">
            <FaCreditCard className="text-gray-400 text-[16px]" />
            <span>Subscriptions</span>
          </div>
          <SlArrowRight className="text-gray-400 text-xs" />
        </div>

      </div>

      {/* Extras */}
      <div className={`w-full border ${isDarkMode ? 'text-white bg-[#1f1f23] border-gray-800' : 'border-gray-200 text-gray-900'} rounded-[20px] text-[15px] py-1 overflow-hidden min-h-fit lg:py-0`}>
        
        <button
          onClick={() => setCurrentSection('offers')}
          className={`w-full p-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} opacity-50`}
        >
          <div className="flex items-center space-x-2">
            <FaGift className="text-gray-400 text-[16px]" />
            <span>Offers & Discounts</span>
          </div>
          <SlArrowRight className={`${isDarkMode ? 'text-stone-400' : 'text-gray-900'} text-xs`} />
        </button>

        <button
          onClick={() => setCurrentSection('offers')}
          className={`w-full p-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} opacity-50`}
        >
          <div className="flex items-center space-x-2">
            <FaQuestion className="text-gray-400 text-[16px]" />
            <span>FAQs</span>
          </div>
          <SlArrowRight className={`${isDarkMode ? 'text-stone-400' : 'text-gray-900'} text-xs`} />
        </button>

        <button
          onClick={() => setCurrentSection('help')}
          className="w-full p-3 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <FaQuestionCircle className="text-gray-400 text-[16px]" />
            <span>Help & Support</span>
          </div>
          <SlArrowRight className={`${isDarkMode ? 'text-stone-400' : 'text-gray-900'} text-xs`} />
        </button>

      </div>

      {/* Sign In/Out */}
      <div className="fixed bottom-[7vh] left-0 w-full px-6">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full bg-white hover:from-red-600 hover:to-rose-700 disabled:from-red-400 disabled:to-rose-500 text-red-600 py-3 px-6 rounded-full flex items-center justify-center gap-3 shadow-xs hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
          >
            <PiSignOut className="text-lg text-red-600" />
            <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
          </button>
        ) : (
          <button
            onClick={() => window.location.href = '/login'}
              className="w-full bg-white boohover:from-gray-800 hover:to-gray-700 text-blue-600 py-3 px-6 rounded-full flex items-center justify-center gap-3 shadow-xs hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
          >
            <PiSignIn className="text-lg" />
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
