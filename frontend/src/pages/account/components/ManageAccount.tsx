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
} from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { IoChevronBackOutline } from 'react-icons/io5';

type ManageAccountSection = 'personal-info' | 'security';

const ManageAccount: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  const [currentSection, setCurrentSection] =
    useState<ManageAccountSection>('personal-info');

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
    <div className="min-h-screen bg-white py-[2.3vh] px-[.8vh]">
      <div className="max-w-lg mx-auto space-y-6">
        {/* ---- HEADER ---- */}
        <div className="flex items-center mb-[1vh]">
          <button
            onClick={onBack}
            className="mr-[1.5vh] py-[1.5vh] hover:bg-stone-200 rounded-full transition-colors"
          >
            <IoChevronBackOutline className='text-[2.5vh]'/>
          </button>
          <h1 className="text-2xl font-semibold text-stone-800">
            Manage Account
          </h1>
        </div>

        {/* ---- SECTION BUTTONS (styled like CustomizeLayout) ---- */}
        <div className="flex flex-row justify-evenly w-full">
            <button
                onClick={() => setCurrentSection('personal-info')}
                className={`flex items-center justify-center w-1/2 px-[1vh] py-[.8vh] space-x-[.5vh] ${
                currentSection === 'personal-info'
                    ? 'bg-black text-white '
                    : 'bg-gray-200 text-gray-800'
                }`}
            >
                <FaUser className='text-[1.8vh]'/>
                <p>Personal Info</p>
            </button>

            <button
                onClick={() => setCurrentSection('security')}
                className={`flex items-center justify-center w-1/2 px-[1vh] py-[.8vh] space-x-[.5vh] ${
                currentSection === 'security'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
            >
                <FaLock className='text-[1.8vh]'/>
                <p>Security</p>
            </button>
        </div>

        {/* ---- SECTION CONTENT ---- */}
        <div className="flex flex-col items-center bg-white py-[2vh] px-[1vh] rounded-lg space-y-6">
            {/* Avatar */}
            <div 
                className="relative w-[8vh] h-[8vh] cursor-pointer group mb-[2vh]"
                onClick={() => {}}
                >
                <div className="w-[8vh] h-[8vh] rounded-full overflow-hidden border-[1vh] border-stone-200 group-hover:border-stone-300 transition-colors">
                    <img 
                    src={user?.avatar || '/default-avatar.png'} 
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center transition-all">
                    <FaUser className="text-white group-hover:opacity-100 transition-opacity text-[5.5vh] text-shadow-xl" />
                </div>
                {!user && (
                    <div className="absolute right-[.6vh] bottom-0">
                    <FaPencil className='text-[2vh] text-gray-600'/>
                    </div>
                )}
            </div>

            {/* PERSONAL INFO SECTION */}
            {currentSection === 'personal-info' && (
                <form onSubmit={handlePersonalInfoSubmit} className="space-y-[1.8vh] w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
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
                            className="w-full px-[1.2vh] py-[.9vh] border border-stone-300 rounded-[.45vh]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
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
                            className="w-full px-[1.2vh] py-[.9vh] border border-stone-300 rounded-[.45vh]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                            setPersonalInfo({ ...personalInfo, email: e.target.value })
                        }
                    className="w-full px-[1.2vh] py-[.9vh] border border-stone-300 rounded-[.45vh]"
                    />
                </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalInfo.mobile}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, mobile: e.target.value })
                  }
                  className="w-full px-[1.2vh] py-[.9vh] border border-stone-300 rounded-[.45vh]"
                />
              </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-[.8vh] rounded-[.45vh]"
                >
                    {isLoading ? 'Updating…' : 'Save Changes'}
                </button>
                </form>
            )}

            {/* SECURITY SECTION */}
            {currentSection === 'security' && (
                <form onSubmit={handleSecuritySubmit} className="space-y-[1.8vh] w-full">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
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
                                className="w-full px-[1.2vh] py-[.9vh] border border-stone-300 rounded-[.45vh] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
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
                            className="w-full px-[1.2vh] py-[.9vh] border border-stone-300 rounded-[.45vh]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
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
                                className="w-full px-[1.2vh] py-[.9vh] border border-stone-300 rounded-[.45vh] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-[.8vh] rounded-[.45vh]"
                    >
                        {isLoading ? 'Updating…' : 'Update Password'}
                    </button>
                </form>
            )}

          {/* DELETE ACCOUNT */}
          <div className="w-full pt-[2vh] border-t border-stone-200">
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-[.45vh] flex items-center justify-center"
            >
              <FaTrash className="mr-[1vh]" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
