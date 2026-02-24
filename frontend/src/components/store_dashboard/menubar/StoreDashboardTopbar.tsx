import UserDisplay from './UserDisplay'
import { Fade as Hamburger } from 'hamburger-react'
import { IoNotificationsOutline, IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { FaDoorOpen, FaDoorClosed } from 'react-icons/fa6';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getStoreStatus } from '../../the_mall/home/store_card/supporting/storeStatus';
import { toggleStoreStatus } from '../../../features/store_admin/storeAdminSlice';
import toast, { Toaster } from 'react-hot-toast';
import { RiVipCrown2Fill } from 'react-icons/ri';

interface Props {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const StoreDashboardTopbar = ({ isMobileMenuOpen = false, setIsMobileMenuOpen }: Props) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const isLoading = useAppSelector((state) => state.storeAdmin.isLoading);
  const storeStatus = getStoreStatus(store?.operationTimes, store?.manualStatus);

  // Check if the current URL contains 'posters/view'
  const shouldHideTopbar = window.location.href.includes('posters/view');

  if (shouldHideTopbar) {
    return null;
  }

  // Handle status toggle
  const handleStatusClick = async () => {
    if (!store?.slug) {
      toast.error('Store not found', {
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          fontFamily: 'Outfit',
        },
        icon: '❌',
      });
      return;
    }

    const currentStatus = storeStatus.status;
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';

    try {
      await dispatch(toggleStoreStatus({
        storeSlug: store.slug,
        status: newStatus
      })).unwrap();

      toast.success(`Store is now ${newStatus}`, {
        style: {
          background: newStatus === 'open' ? '#f0fdf4' : '#fef2f2',
          color: newStatus === 'open' ? '#166534' : '#991b1b',
          fontFamily: 'Outfit',
        },
        icon: newStatus === 'open' ? '✅' : '🔒',
      });
    } catch (error) {
      toast.error(`Failed to ${newStatus === 'open' ? 'open' : 'close'} store`, {
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          fontFamily: 'Outfit',
        },
        icon: '❌',
      });
    }
  };

  const isOpen = storeStatus.status === 'open';

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='bg-gradient-to-r from-slate-50 to-white font-[Outfit] flex flex-row justify-between items-center w-full min-h-[12vh] text-gray-900 px-4 lg:px-8 border-b border-slate-200/80'>
        {/* Left Section - Hamburger & Title */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <div className="rounded-xl bg-slate-900 text-white flex items-center justify-center lg:hidden shadow-lg shadow-slate-900/20">
            <Hamburger 
              toggled={isMobileMenuOpen} 
              toggle={(toggled) => setIsMobileMenuOpen?.(toggled ? true : false)} 
              size={24}
            />
          </div>

          {/* Title & Breadcrumb */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-slate-600">{store?.name || 'Store'}</span>
            </div>
            <h1 className='text-2xl font-bold text-slate-800'>Welcome back! 👋</h1>
          </div>
        </div>

        {/* Center - Searchbar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products, orders, customers..."
              className="w-full h-11 rounded-xl bg-slate-100 border-2 border-transparent 
                      focus:border-slate-300 focus:bg-white placeholder:text-slate-400 
                      pl-11 pr-4 text-sm transition-all duration-200
                      focus:outline-none focus:ring-4 focus:ring-slate-100"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-200 rounded-md text-xs text-slate-500 font-medium">
              ⌘K
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Open/Closed Status Toggle */}
          <button
            onClick={handleStatusClick}
            disabled={isLoading}
            className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-lg active:scale-95'
            } ${
              isOpen 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25' 
                : 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25'
            }`}
            title={`Click to ${isOpen ? 'close' : 'open'} store manually`}
          >
            {isOpen ? (
              <>
                <FaDoorOpen className='text-lg' />
                <span>Open</span>
              </>
            ) : (
              <>
                <FaDoorClosed className='text-lg' />
                <span>Closed</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
            <IoNotificationsOutline className='text-xl text-slate-600' />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              3
            </span>
          </button>

          {/* User Display */}
          <UserDisplay />
        </div>
      </div>
    </>
  )
}

export default StoreDashboardTopbar;
