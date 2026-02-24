import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { createDonation, updateDonation } from '../../../features/donations/donationsSlice';
import { TbLoader3 } from 'react-icons/tb';
import type { Donation } from '../../../types/donationTypes';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FiPlus, FiX, FiHeart, FiTag } from 'react-icons/fi';

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
      const remainingImagesCount = 5 - imageUrls.length;
      const filesToAdd = newFiles.slice(0, remainingImagesCount);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-5 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <IoClose className="text-white" size={18} />
          </button>
          
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FiHeart className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{donation ? 'Edit Donation' : 'Add Donation'}</h2>
              <p className="text-white/80 text-sm">
                {donation ? 'Update donation details' : 'Create a new donation'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[60vh] hide-scrollbar">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Donation Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all outline-none"
                placeholder="Enter donation name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="w-full rounded-xl border border-slate-200 bg-slate-50 min-h-[100px] overflow-hidden focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
                <EditorContent
                  editor={editor}
                  className="prose max-w-none text-sm p-3"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <div className="flex items-center gap-1">
                  <FiTag className="text-slate-400" />
                  Tags
                </div>
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all outline-none"
                placeholder="e.g. charity, help, community"
              />
              <p className="text-xs text-slate-400 mt-1">Separate tags with commas</p>
            </div>

            {/* Images */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Donation Images <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-rose-300 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                />
                <p className="text-xs text-slate-400 mt-2">Upload up to 5 images (existing: {imageUrls.length})</p>
              </div>
            </div>

            {/* Image Previews */}
            {(imageUrls.length > 0 || images.length > 0) && (
              <div className="grid grid-cols-5 gap-2">
                {imageUrls.map((url, index) => (
                  <div key={`existing-${index}`} className="relative aspect-square group">
                    <img
                      src={url}
                      alt={`existing-${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImageUrls((prev) => prev.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}

                {images.map((file, index) => (
                  <div key={`new-${index}`} className="relative aspect-square group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <TbLoader3 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                donation ? 'Update Donation' : 'Create Donation'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;