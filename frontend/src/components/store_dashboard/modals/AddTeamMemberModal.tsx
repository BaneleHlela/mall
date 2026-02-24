import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { searchUsersByUsername, addTeamMember } from '../../../features/store_admin/storeAdminSlice';
import { TbLoader3 } from 'react-icons/tb';
import { FiUserPlus, FiUser, FiBriefcase, FiFileText, FiImage } from 'react-icons/fi';
import debounce from 'lodash.debounce';

interface AddTeamMemberModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { store, isLoading } = useAppSelector((state) => state.storeAdmin );

  const [username, setUsername] = useState('');
  const [position, setPosition] = useState<"owner" | "manager" | "staff" | "viewer">('manager');
  const [about, setAbout] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedUser, setSelectedUser] = useState<{ _id: string; username: string; firstName: string; lastName: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = debounce(async () => {
      if (!username) {
        setSuggestions([]);
        return;
      }
      try {
        setLoadingSuggestions(true);
        const result = await dispatch(searchUsersByUsername(username)).unwrap();
        setSuggestions(result);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);
  
    fetchSuggestions();
  
    return () => fetchSuggestions.cancel();
  }, [username]);

  const handleFormSubmit = async () => {
    if (!store?.slug || !selectedUser || !position || !about || !imageFile) {
      setError('All fields are required');
      return;
    }
    try {
      await dispatch(
        addTeamMember({
          storeId: store.slug,
          memberData: {
            username: selectedUser.username,
            role: position,
            about,
          },
          imageFile,
        })
      ).unwrap();
      handleClose();
    } catch (err: any) {
      setError(err || 'Failed to add team member');
    }
  };

  const handleClose = () => {
    setUsername('');
    setPosition('manager');
    setAbout('');
    setImageFile(null);
    setSelectedUser(null);
    setError(null);
    setSuggestions([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <FiUserPlus className="text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Add Team Member</h2>
                <p className="text-sm text-slate-500">Search and add a new member</p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Username Search */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FiUser className="text-slate-400" />
              Username
            </label>
            <div className="relative">
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setSelectedUser(null);
                }}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                placeholder="Search by username..."
              />

              {loadingSuggestions && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm text-slate-500 z-10">
                  <div className="flex items-center gap-2">
                    <TbLoader3 className="w-4 h-4 animate-spin" />
                    Searching...
                  </div>
                </div>
              )}

              {suggestions.length > 0 && !selectedUser && (
                <ul className="absolute z-10 top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {suggestions.slice(0, 5).map((user) => (
                    <li
                      key={user._id}
                      onClick={() => {
                        setSelectedUser(user);
                        setUsername(user.username);
                        setSuggestions([]);
                      }}
                      className="px-4 py-3 hover:bg-purple-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-slate-800">{user.username}</div>
                      <div className="text-sm text-slate-500">{user.firstName} {user.lastName}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {selectedUser && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <span>
                  <strong>{selectedUser.username}</strong> — {selectedUser.firstName} {selectedUser.lastName}
                </span>
              </div>
            )}
          </div>

          {/* Position Selector */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FiBriefcase className="text-slate-400" />
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white"
            >
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {/* About Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FiFileText className="text-slate-400" />
              About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              placeholder="Write something about this team member..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
            />
          </div>

          {/* Image File Upload */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FiImage className="text-slate-400" />
              Profile Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="profile-image-upload"
              />
              <label
                htmlFor="profile-image-upload"
                className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-slate-200 rounded-xl px-4 py-6 text-sm text-slate-500 hover:border-purple-400 hover:text-purple-500 cursor-pointer transition-all"
              >
                {imageFile ? (
                  <div className="flex items-center gap-2 text-purple-600">
                    <FiImage className="text-lg" />
                    <span className="font-medium">{imageFile.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <FiImage className="text-xl text-slate-400" />
                    <span>Click to upload an image</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md disabled:opacity-70"
          >
            {isLoading ? (
              <TbLoader3 className='w-5 h-5 animate-spin' />
            ) : (
              <>
                <FiUserPlus className="text-lg" />
                Add Member
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;
