import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
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
import { BiArrowBack } from 'react-icons/bi';
import { CiCamera } from 'react-icons/ci';
import { LuCamera } from 'react-icons/lu';

type ManageAccountSection = 'personal-info' | 'security';

const ManageAccount: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const { isDarkMode } = useAppSelector((state) => state.theme);

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
    <div className={`min-h-screen pb-[6vh] ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'} p-6`}>
      {/* Back Button & Header */}
      <div className="relative flex items-center justify-center w-full">
        <BiArrowBack
          onClick={onBack} 
          className={`absolute left-0 rounded-full ${isDarkMode ? ' bg-[#1f1f23] border-gray-800' : 'bg-gray-100 border-gray-200 text-gray-900'} p-2 text-[35px]`}/>
        <span className="text-lg">Settings</span>
      </div>

      <div className="max-w-lg mt-6">
        {/* Avatar Card */}
        <div className={`rounded-2xl shadow-xl p-6 mb-6`}>
          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1  rounded-full opacity-60 blur-sm group-hover:opacity-80 transition-opacity"></div>
              <div className={`relative w-25 h-25 rounded-full  ${isDarkMode ? 'border-[#1f1f23]' : 'border-white'} shadow-lg`}>
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                    <FaUser className="text-white/80 text-2xl" />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-[#ceff00] p-2 rounded-full  group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <LuCamera className='text-white text-xl'/>
                </div>
              </div>
            </div>
            <h2 className={`mt-3 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || 'User'}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user?.username || 'No username'}</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className={`${isDarkMode ? 'bg-[#1f1f23] border-gray-800' : 'bg-white border-gray-100'} rounded-full shadow-lg p-1.5 mb-6 border`}>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentSection('personal-info')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium transition-all duration-300 ${
                currentSection === 'personal-info'
                  ? isDarkMode 
                    ? 'bg-[#ceff00] text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800/50'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaUserEdit className="text-lg" />
              <span>Personal Info</span>
            </button>
            <button
              onClick={() => setCurrentSection('security')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium transition-all duration-300 ${
                currentSection === 'security'
                  ? isDarkMode 
                    ? 'bg-[#ceff00] text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800/50'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaShieldAlt className="text-lg" />
              <span>Security</span>
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className={`${isDarkMode ? 'bg-[#1f1f23] border-gray-800' : 'bg-white border-gray-100'} rounded-3xl shadow-lg p-5 border`}>
          {/* PERSONAL INFO SECTION */}
          {currentSection === 'personal-info' && (
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
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
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                      isDarkMode
                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
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
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                      isDarkMode
                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalInfo.mobile}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, mobile: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-full shadow-lg transition-all duration-300 active:scale-[0.98] ${
                  isDarkMode
                    ? 'bg-white disabled:bg-gray-600 disabled:to-gray-700 text-blue-600'
                    : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white'
                }`}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {/* SECURITY SECTION */}
          {currentSection === 'security' && (
            <form onSubmit={handleSecuritySubmit} className="space-y-5">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
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
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all pr-12 ${
                      isDarkMode
                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                      isDarkMode
                        ? 'text-gray-500 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
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
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
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
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all pr-12 ${
                      isDarkMode
                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                      isDarkMode
                        ? 'text-gray-500 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-full shadow-lg transition-all duration-300 active:scale-[0.98] ${
                  isDarkMode
                    ? 'bg-white text-blue-600 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700'
                    : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white'
                }`}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          {/* Danger Zone */}
          <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Danger Zone</h3>
            <button
              onClick={handleDeleteAccount}
              className={`w-full font-semibold py-4 rounded-full shadow-lg transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white'
                  : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white'
              }`}
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
