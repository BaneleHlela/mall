import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addTeamMember } from '../../../features/store_admin/storeAdminSlice';

interface AddTeamMemberModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);

  const [form, setForm] = useState({
    name: '',
    position: '',
    about: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async () => {
    setError(null);

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    const { name, position, about } = form;

    if (!name || !position || !about || !imageFile) {
      setError('All fields are required');
      return;
    }

    try {
      await dispatch(
        addTeamMember({
          storeId: store._id,
          memberData: { name, position, about },
          imageFile,
        })
      ).unwrap();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to add team member');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004d] flex items-center justify-center z-50">
      <div className="bg-white max-h-screen overflow-scroll hide-scrollbar w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Team Member</h2>
          <button onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Position</label>
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">About</label>
            <textarea
              name="about"
              rows={3}
              value={form.about}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
              required
            />
            {imageFile && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            )}
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-sm bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className="px-4 py-2 rounded text-white bg-blue-600"
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;
