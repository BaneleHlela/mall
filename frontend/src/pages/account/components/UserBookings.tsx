import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IoChevronBackOutline } from 'react-icons/io5';
import { MdCleaningServices } from 'react-icons/md';
import { TbPackages } from 'react-icons/tb';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { fetchUserPackages } from '../../../features/packages/packagesSlice';
import MakeBookingModalUser from './MakeBookingModalUser';
import type { UserPackage } from '../../../types/packageTypes';

type UserBookingsSection = 'services' | 'packages';

// Helper function to get package name
const getPackageName = (pkg: UserPackage): string => {
    if (typeof pkg.package === 'string') {
        return 'Package';
    }
    return pkg.package.name || 'Package';
};

// Helper function to get store name
const getStoreName = (pkg: UserPackage): string => {
    if (typeof pkg.store === 'string') {
        return 'Store';
    }
    return pkg.store.name || 'Store';
};

const UserBookings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const dispatch = useAppDispatch();
    const packages = useAppSelector((state) => state.packages.userPackages);
    const { user, isLoading } = useAppSelector((state) => state.user);

    const [currentSection, setCurrentSection] = React.useState<UserBookingsSection>('packages');
    const [selectedPackage, setSelectedPackage] = useState<UserPackage | null>(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    
    useEffect(() => {
        if (user?._id) {
            dispatch(fetchUserPackages());
        }
    }, [user, dispatch]);

    const handleMakeBooking = (pkg: UserPackage) => {
        setSelectedPackage(pkg);
        setShowBookingModal(true);
    };

    const handleBookingSuccess = () => {
        dispatch(fetchUserPackages());
        setShowBookingModal(false);
        setSelectedPackage(null);
    };

    const handleCloseModal = () => {
        setShowBookingModal(false);
        setSelectedPackage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pb-[6vh]">
            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-6 pb-16 px-4">
                <div className="max-w-lg mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <IoChevronBackOutline className='text-white text-xl'/>
                        </button>
                        <h1 className="text-xl font-semibold text-white">My Bookings</h1>
                    </div>

                    {/* Section Tabs */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5">
                        <div className="flex gap-1">
                            <button
                                onClick={() => setCurrentSection('services')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                                    currentSection === 'services'
                                        ? 'bg-white text-gray-900 shadow-lg'
                                        : 'text-white/80 hover:text-white'
                                }`}
                            >
                                <MdCleaningServices className="text-lg" />
                                <span>Services</span>
                            </button>
                            <button
                                onClick={() => setCurrentSection('packages')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                                    currentSection === 'packages'
                                        ? 'bg-white text-gray-900 shadow-lg'
                                        : 'text-white/80 hover:text-white'
                                }`}
                            >
                                <TbPackages className="text-lg" />
                                <span>Packages</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-lg mx-auto px-2 -mt-6">
                {currentSection === "packages" && (
                    <div className="space-y-[2vh]">
                        {/* Quick Book Favorites */}
                        {/* <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Book from Favorites</h3>
                            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <div className="flex">
                                    <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                                        <TbPackages className="text-orange-500 text-3xl" />
                                    </div>
                                    <div className="flex-1 p-4">
                                        <h4 className="font-semibold text-gray-800 mb-1">Comprehensive Driver's</h4>
                                        <p className="text-gray-500 text-sm mb-2">Bona Driving School</p>
                                        <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium py-2.5 rounded-xl text-sm hover:shadow-lg transition-all active:scale-[0.98]">
                                            Purchase (R4200)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Booking History */}
                        <div className='bg-white -px-1 shadow-md p-2 rounded-[1.5vh]'>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Booking History</h3>
                            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <div className="flex">
                                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center flex-shrink-0">
                                        <FaCheckCircle className="text-emerald-500 text-3xl" />
                                    </div>
                                    <div className="flex-1 p-4">
                                        <div className="flex items-start justify-between mb-1">
                                            <h4 className="font-semibold text-gray-800">Comprehensive Driver's</h4>
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Completed</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-1">Bona Driving School</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <FaClock />
                                                Session 6/16
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Purchased Packages */}
                        <div className='px-2'>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Purchased Packages</h3>
                            <div className="space-y-3">
                                {packages.length === 0 ? (
                                    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-8 text-center">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4">
                                            <TbPackages className="text-gray-400 text-2xl" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No packages yet</h3>
                                        <p className="text-gray-500 text-sm">Purchase a package to get started</p>
                                    </div>
                                ) : (
                                    packages.map((pkg) => (
                                        <div key={pkg._id} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                            <div className="flex">
                                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-200 flex items-center justify-center flex-shrink-0">
                                                    <TbPackages className="text-blue-500 text-3xl" />
                                                </div>
                                                <div className="flex-1 p-4">
                                                    <h4 className="font-semibold text-gray-800 mb-1">{getPackageName(pkg)}</h4>
                                                    <p className="text-gray-500 text-sm mb-1">{getStoreName(pkg)}</p>
                                                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-3">
                                                        <FaClock />
                                                        <span>{pkg.sessionsRemaining} Sessions Left</span>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleMakeBooking(pkg)}
                                                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-medium py-2.5 rounded-xl text-sm hover:shadow-lg hover:shadow-blue-200/50 transition-all active:scale-[0.98]"
                                                    >
                                                        Make Booking
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {currentSection === "services" && (
                    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
                            <MdCleaningServices className="text-violet-500 text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Bookings</h3>
                        <p className="text-gray-500 text-sm">This feature is coming soon</p>
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {showBookingModal && selectedPackage && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-md">
                        <MakeBookingModalUser 
                            userPackage={selectedPackage}
                            onClose={handleCloseModal}
                            onSuccess={handleBookingSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserBookings;
