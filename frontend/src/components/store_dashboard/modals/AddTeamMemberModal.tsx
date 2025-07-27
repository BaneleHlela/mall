import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { searchUsersByUsername, addTeamMember } from '../../../features/store_admin/storeAdminSlice';
import { TbLoader3 } from 'react-icons/tb';
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
    }, 300); // 300ms debounce
  
    fetchSuggestions();
  
    return () => fetchSuggestions.cancel();
  }, [username]);

  const handleFormSubmit = async () => {
    if (!store?._id || !selectedUser || !position || !about || !imageFile) {
      setError('All fields are required');
      return;
    }
    try {
      await dispatch(
        addTeamMember({
          storeId: store._id,
          memberData: { //@ts-ignore
            member: selectedUser._id,
            username: selectedUser.username,
            role: position,
            about,
          },
          imageFile,
        })
      ).unwrap();
      onClose();
    } catch (err: any) {
      setError(err || 'Failed to add team member');
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-[#0000004d] flex flex-col items-center justify-center z-50">
      {/* contents */}
      <div className="space-y-[1.5vh] bg-white py-[2vh] px-[3vh]">
        <div>
          <label>Username</label>
          <div className="relative">
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setSelectedUser(null);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Search by username"
            />

            {loadingSuggestions && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border rounded shadow p-2 text-sm text-gray-600">
                Searching...
              </div>
            )}

            {suggestions.length > 0 && !selectedUser && (
              <ul className="absolute z-10 top-full mt-1 left-0 right-0 bg-white border rounded shadow max-h-48 overflow-y-auto text-sm">
                {suggestions.slice(0, 5).map((user) => (
                  <li
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setUsername(user.username);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    <strong>{user.username}</strong> — {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedUser && (
            <div className="mt-2 text-sm text-green-700">
              Selected: {selectedUser.username} ({selectedUser.firstName} {selectedUser.lastName})
            </div>
          )}
        </div>
        {/* position, about, image file inputs */}
        <div className="space-y-4 mt-4">
          {/* Position Selector */}
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {/* About Field */}
          <div>
            <label className="block text-sm font-medium mb-1">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              placeholder="Write something about this team member..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Image File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {imageFile && (
              <p className="text-sm text-gray-500 mt-1">Selected: {imageFile.name}</p>
            )}
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {/* Cancel / Add buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {isLoading ? <TbLoader3 className='w-6 h-6 animate-spin mx-auto' /> : "Add Member"}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AddTeamMemberModal;
