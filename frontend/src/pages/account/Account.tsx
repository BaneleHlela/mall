import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { logout, getProfile } from '../../features/user/userSlice';
import { FaUser, FaMapMarkerAlt, FaCog, FaHome, FaShoppingBag, FaCreditCard, FaHistory, FaGift, FaQuestionCircle, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
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

// add toaster instead redirecting to the login page.

type AccountSection = 'main' | 'manage-account' | 'addresses' | 'purchases' | 'payment-methods' | 'credit-history' | 'offers' | 'help';

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
      title: 'Are you sure?',
      text: 'You will be signed out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel'
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
    { id: 'manage-account', label: 'Manage account', icon: FaCog },
    { id: 'addresses', label: 'My addresses', icon: FaHome },
    { id: 'purchases', label: 'My purchases', icon: FaShoppingBag },
    { id: 'payment-methods', label: 'Payment methods', icon: FaCreditCard },
    { id: 'credit-history', label: 'Credit history', icon: FaHistory },
    { id: 'offers', label: 'Offers & discounts', icon: FaGift },
    { id: 'help', label: 'Help', icon: FaQuestionCircle },
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
      <div className="min-h-screen w-full bg-stone-100">
        {renderSection()}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-md bg-stone-100 flex flex-col">
      {/* Top Section - Avatar + User Info */}
      <div className="bg-white  py-[4vh] px-[1vh] flex flex-col items-center">
        <div 
          className="relative cursor-pointer group mb-[.8vh]"
          onClick={handleAvatarClick}
        >
          <div className="w-[12vh] h-[12vh] rounded-full overflow-hidden border-[.35vh] border-stone-200 group-hover:border-stone-300 transition-colors">
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {!user || !user?.avatar && (
            <div className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center transition-all">
              <FaUser className="text-white group-hover:opacity-100 transition-opacity text-[5.5vh] text-shadow-xl" />
            </div>
          )}
          
          {user && (
            <div className="absolute right-[.6vh] bottom-0">
              <FaPencil className='text-[3vh] text-gray-600'/>
            </div>
          )}
        </div>
        
        <h2 className="text-[2.5vh] font-semibold text-stone-800 mb-[.5vh]">
          {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'Guest User'}
        </h2>
        
        <div onClick={handleLocationClick} className="relative flex items-center justify-between w-full py-[.5vh] px-[1vh] shadow border border-gray-100 rounded-full">
          <FaMapMarkerAlt className="ml-[.2vh]" />
          <p className='max-w-[85%] line-clamp-1 font-[600] capitalize'>
            {user?.locations && user.locations.length > 0 
              ? `${user.locations[0].nickname}\u00A0 \u00A0(${user.locations[0].address})` 
              : 'No location set'
            }
          </p >
          <IoMdArrowDropdown className='text-[2.5vh]'/>
        </div>
      </div>

      {/* Middle Section - Account Options */}
      <div className="flex-1 bg-white">
        <div className="max-w-md mx-auto space-y-[.35vh] px-[.8vh]">
          {accountOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setCurrentSection(option.id as AccountSection)}
                className="w-full bg-white rounded-lg px-[1.5vh] py-[1.2vh] flex items-center justify-between hover:shadow-md transition-shadow border border-stone-200 hover:border-stone-300"
              >
                <div className="flex items-center">
                  <IconComponent className="mr-[1.2vh]" size={20} />
                  <span className="text-stone-800 font-medium">{option.label}</span>
                </div>
                <div className="">
                  <svg className="w-[2.2vh] h-[2.2vh]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section - Sign In/Out */}
      <div className="p-6 bg-white mb-[5.5vh] lg:mb-0">
        <div className="max-w-md mx-auto">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full bg-red-200 hover:bg-red-700 disabled:bg-red-400 text-red-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              {isLoading ? 'Signing out...' : 'Sign out'}
            </button>
          ) : (
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full bg-blue-200 text-blue-800 hover:bg-blue-700 font-medium py-3 px-4 rounded-[.45vh] flex items-center justify-center transition-colors"
            >
              <FaSignInAlt className="mr-2" />
              Sign in
            </button>
          )}
        </div>
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