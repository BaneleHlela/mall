import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { updateUser, deleteUser } from '../../../features/user/userSlice';
import {
  FaUser,
  FaLock,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaUserEdit,
} from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { IoChevronBackOutline } from 'react-icons/io5';

type ManageAccountSection = 'personal-info' | 'security';

const ManageAccount: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  const [currentSection, setCurrentSection] = useState<ManageAccountSection>('personal-info');

  // ---- Form States ----
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  });

  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ---- Handlers ----
  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateUser(personalInfo) as any);
    alert('Personal information updated successfully!');
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityInfo.newPassword !== securityInfo.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    await dispatch(updateUser({ password: securityInfo.newPassword }) as any);
    alert('Password updated successfully!');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) return;
    await dispatch(deleteUser() as any);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-6 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoChevronBackOutline className='text-white text-xl'/>
            </button>
            <h1 className="text-xl font-semibold text-white">Manage Account</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8">
        {/* Avatar Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 mb-6 border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full opacity-60 blur-sm group-hover:opacity-80 transition-opacity"></div>
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                    <FaUser className="text-white/80 text-2xl" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaPencil className='text-white text-sm'/>
                </div>
              </div>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-gray-800">
              {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'User'}
            </h2>
            <p className="text-sm text-gray-500">{user?.email || 'No email set'}</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-1.5 mb-6 border border-gray-100">
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentSection('personal-info')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                currentSection === 'personal-info'
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaUserEdit className="text-lg" />
              <span>Personal Info</span>
            </button>
            <button
              onClick={() => setCurrentSection('security')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                currentSection === 'security'
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaShieldAlt className="text-lg" />
              <span>Security</span>
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
          {/* PERSONAL INFO SECTION */}
          {currentSection === 'personal-info' && (
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalInfo.mobile}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, mobile: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {/* SECURITY SECTION */}
          {currentSection === 'security' && (
            <form onSubmit={handleSecuritySubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={securityInfo.currentPassword}
                    onChange={(e) =>
                      setSecurityInfo({
                        ...securityInfo,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all pr-12"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={securityInfo.newPassword}
                  onChange={(e) =>
                    setSecurityInfo({
                      ...securityInfo,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={securityInfo.confirmPassword}
                    onChange={(e) =>
                      setSecurityInfo({
                        ...securityInfo,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all pr-12"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-gray-300/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          {/* Danger Zone */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Danger Zone</h3>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-red-200/50 hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <FaTrash />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
