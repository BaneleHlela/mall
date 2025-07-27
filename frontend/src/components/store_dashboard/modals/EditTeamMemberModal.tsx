import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { TbLoader3 } from 'react-icons/tb';
import { editTeamMember } from '../../../features/store_admin/storeAdminSlice';

interface Props {
  open: boolean;
  onClose: () => void;
  member: {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    about: string;
    image: string;
  };
}

const EditTeamMemberModal: React.FC<Props> = ({ open, onClose, member }) => {
  const dispatch = useAppDispatch();
  const { store, isLoading } = useAppSelector((state) => state.storeAdmin);

  const [position, setPosition] = useState(member.role);
  const [about, setAbout] = useState(member.about || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!store?._id || !member.username) return;

    try {
      await dispatch(
        editTeamMember({
          storeId: store._id,
          username: member.username,
          updatedData: {
            position,
            about, // @ts-ignore
            imageFile,
          },
        })
      ).unwrap();
      onClose();
    } catch (err: any) {
      setError(err || 'Failed to update member');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004d] flex flex-col items-center justify-center z-50">
      <div className="space-y-[1.5vh] bg-white py-[2vh] px-[3vh] w-[90%] max-w-md rounded shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Team Member</h2>
          <IoClose className="cursor-pointer w-6 h-6" onClick={onClose} />
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium mb-1">Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Change Profile Image</label>
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
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            {isLoading ? <TbLoader3 className="w-6 h-6 animate-spin mx-auto" /> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMemberModal;
