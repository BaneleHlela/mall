import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { createDonation, updateDonation } from '../../../features/donations/donationsSlice';
import { TbLoader3 } from 'react-icons/tb';
import type { Donation } from '../../../types/donationTypes';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface DonationModalProps {
  open: boolean;
  onClose: () => void;
  donation?: Donation;
}

const DonationModal: React.FC<DonationModalProps> = ({
  open,
  onClose,
  donation,
}) => {
  const dispatch = useAppDispatch();
  const { store } = useAppSelector((state) => state.storeAdmin);
  const isLoading = useAppSelector((state) => state.donations.isLoading);
  const [form, setForm] = useState({
    name: '',
    description: '',
    isActive: false,
    tags: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (donation) {
      setForm({
        name: donation.name || '',
        description: donation.description || '',
        isActive: donation.isActive || false,
        tags: (donation.tags || []).join(', '),
      });
      setImages([]);
      setImageUrls([...donation.images])
    }
  }, [donation]);

  // Editor for displaying description content
  const editor = useEditor({
    extensions: [StarterKit],
    content: form.description,
    editable: true,
    onUpdate({ editor }) {
      setForm((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  // Keep editor in sync when form description changes
  useEffect(() => {
    if (!editor) return;
    const currentHTML = editor.getHTML();
    if (form.description !== currentHTML) {
      editor.commands.setContent(form.description || '', { emitUpdate: false });
    }
  }, [form.description, editor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Calculate how many images can be uploaded based on existing image URLs
      const remainingImagesCount = 5 - imageUrls.length;
      // If there are more images selected than the remaining count, slice the excess
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
      // Update the images state by appending the new images, ensuring no more than 5 in total
      setImages((prev) => [...prev, ...filesToAdd].slice(0, 5));
    }
  };

  const handleFormSubmit = async () => {
    setError(null);

    // Validation
    if (!form.name.trim()) {
      setError('Donation name is required.');
      return;
    }

    if (!form.description.trim()) {
      setError('Donation description is required.');
      return;
    }

    if (imageUrls.length === 0 && images.length === 0) {
      setError('At least one image is required for the donation.');
      return;
    }

    if (!store?._id) {
      setError('Store not found');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('isActive', String(form.isActive));
    formData.append('store', store._id);
    formData.append('imageUrls', JSON.stringify(imageUrls));

    const tagsArray = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
    formData.append('tags', JSON.stringify(tagsArray));

    images.forEach((file) => {
      formData.append('images', file);
    });

    try {
      if (donation?._id) {
        await dispatch(updateDonation({ id: donation._id, data: formData })).unwrap();
      } else {
        await dispatch(createDonation(formData)).unwrap();
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save donation');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004d] flex items-center justify-center z-50">
      <div className="bg-white max-h-screen overflow-scroll hide-scrollbar w-full max-w-md rounded-lg shadow-lg p-6 font-[Outfit]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{donation ? 'Edit Donation' : 'Add Donation'}</h2>
          <button onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>

        <div className="space-y-3">
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
            <label className="block text-sm font-medium">Description</label>
            <div className="w-full px-3 py-2 rounded border mt-1 bg-gray-50 min-h-[80px]">
              <EditorContent
                editor={editor}
                className="prose max-w-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Tags</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border mt-1"
              placeholder="e.g. charity, help"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            <div className="flex flex-row">
              {imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={url}
                        alt={`existing-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <IoClose
                        size={16}
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        onClick={() =>
                          setImageUrls((prev) => prev.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <IoClose
                        size={16}
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        onClick={() =>
                          setImages((prev) => prev.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
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
            {isLoading ? <TbLoader3 className='w-6 h-6 animate-spin mx-auto' /> : `${donation ? 'Edit Donation' : 'Create Donation'}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;