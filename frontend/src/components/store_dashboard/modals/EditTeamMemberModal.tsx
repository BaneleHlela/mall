import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { TbLoader3 } from 'react-icons/tb';
import { editTeamMember } from '../../../features/store_admin/storeAdminSlice';
import { FiEdit3, FiUser, FiBriefcase, FiFileText, FiImage } from 'react-icons/fi';

interface Props {
  open: boolean;
  onClose: () => void;
  member: {
    member: {
      username: string;
      firstName: string;
      lastName: string;
    };
    role: string;
    about: string;
    image: string;
  }
  // member: {
  //   username: string;
  //   firstName: string;
  //   lastName: string;
  //   role: string;
  //   about: string;
  //   image: string;
  // };
}

const EditTeamMemberModal: React.FC<Props> = ({ open, onClose, member }) => {
  const dispatch = useAppDispatch();
  const { store, isLoading } = useAppSelector((state) => state.storeAdmin);

  const [position, setPosition] = useState(member.role);
  const [about, setAbout] = useState(member.about || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!store?.slug || !member.member.username) return window.alert('Store information is missing. Please try again later.');
    try {
      await dispatch(
        editTeamMember({
          storeSlug: store.slug,
          username: member.member.username,
          updatedData: {
            position,
            about, // @ts-ignore
            imageFile,
          },
        })
      ).unwrap();
      handleClose();
    } catch (err: any) {
      setError(err || 'Failed to update member');
    }
  };

  const handleClose = () => {
    setError(null);
    setImageFile(null);
    onClose();
  };

  if (!open) return null;

  const fullName = `${member.member.firstName || ''} ${member.member.lastName || ''}`.trim() || member.member.username;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <FiEdit3 className="text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Edit Team Member</h2>
                <p className="text-sm text-slate-500">{fullName}</p>
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

        {/* Current Avatar Preview */}
        {member.image && (
          <div className="px-6 pt-5">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <img 
                src={member.image} 
                alt={fullName}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <div className="text-sm font-medium text-slate-800">Current Photo</div>
                <div className="text-xs text-slate-500">Upload a new image to replace</div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Position Selector */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FiBriefcase className="text-slate-400" />
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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
              Change Profile Image
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
                id="profile-image-edit"
              />
              <label
                htmlFor="profile-image-edit"
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
                    <span>Click to upload a new image</span>
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
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md disabled:opacity-70"
          >
            {isLoading ? (
              <TbLoader3 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <FiEdit3 className="text-lg" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMemberModal;
