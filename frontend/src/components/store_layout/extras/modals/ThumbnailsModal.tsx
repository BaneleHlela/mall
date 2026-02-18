import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose, IoCamera, IoTrash, IoCloudUpload, IoRefresh } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  uploadStoreThumbnail,
  deleteStoreThumbnail,
  captureStoreCardThumbnail,
  captureReelyThumbnail
} from '../../../../features/store_admin/storeAdminSlice';
import type { Store } from '../../../../types/storeTypes';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const mysweetalert = withReactContent(Swal);

type ThumbnailType = 'storeCard' | 'profily' | 'reely';

interface ThumbnailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: Store;
}

const modalRoot = document.body;

const ThumbnailsModal: React.FC<ThumbnailsModalProps> = ({
  isOpen,
  onClose,
  store,
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.storeAdmin.isLoading);
  const [activeTab, setActiveTab] = useState<ThumbnailType>('storeCard');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const thumbnails = store.thumbnails || { storeCard: '', profily: '', reely: '' };

  const thumbnailConfig = {
    storeCard: {
      name: 'Store Card',
      description: 'Main store display thumbnail (1447 × 900 px)',
      dimensions: '1447 × 900 px',
      canAutoCapture: true,
      aspectRatio: 'aspect-[1447/900]',
    },
    profily: {
      name: 'Profily',
      description: 'Profile thumbnail for store listings',
      dimensions: 'Manual upload only',
      canAutoCapture: false,
      aspectRatio: 'aspect-square',
    },
    reely: {
      name: 'Reely',
      description: 'Mobile reel-style thumbnail (360 × 660 px)',
      dimensions: '360 × 660 px',
      canAutoCapture: true,
      aspectRatio: 'aspect-[360/660]',
    },
  };

  if (!isOpen) return null;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const config = thumbnailConfig[activeTab];
    const typeName = config.name;

    // Confirm upload
    const { isConfirmed } = await mysweetalert.fire({
      title: 'Upload Thumbnail',
      text: `Upload "${file.name}" as ${typeName} thumbnail?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, upload it!",
      cancelButtonText: "Cancel"
    });

    if (!isConfirmed) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    try {
      await dispatch(uploadStoreThumbnail({
        storeSlug: store.slug,
        thumbnailFile: file,
        thumbnailType: activeTab,
      })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Upload Successful!",
        text: `${typeName} thumbnail has been uploaded successfully.`,
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Upload failed:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong while uploading the thumbnail. Please try again.",
        confirmButtonColor: "#d33"
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAutoCapture = async () => {
    const config = thumbnailConfig[activeTab];
    const typeName = config.name;

    // Confirm capture
    const { isConfirmed } = await mysweetalert.fire({
      title: 'Capture Screenshot?',
      text: `This will capture a screenshot of your store for the ${typeName} thumbnail. Any existing thumbnail will be replaced.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, capture it!",
      cancelButtonText: "Cancel"
    });

    if (!isConfirmed) return;

    try {
      if (activeTab === 'storeCard') {
        await dispatch(captureStoreCardThumbnail({ storeSlug: store.slug })).unwrap();
      } else if (activeTab === 'reely') {
        await dispatch(captureReelyThumbnail({ storeSlug: store.slug })).unwrap();
      }

      mysweetalert.fire({
        icon: "success",
        title: "Capture Successful!",
        text: `${typeName} thumbnail has been captured successfully.`,
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Capture failed:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Capture Failed",
        text: "Something went wrong while capturing the thumbnail. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const handleDelete = async () => {
    const config = thumbnailConfig[activeTab];
    const typeName = config.name;

    // Confirm delete
    const { isConfirmed } = await mysweetalert.fire({
      title: 'Delete Thumbnail?',
      text: `Are you sure you want to delete the ${typeName} thumbnail? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });

    if (!isConfirmed) return;

    try {
      await dispatch(deleteStoreThumbnail({
        storeSlug: store.slug,
        thumbnailType: activeTab,
      })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Deleted!",
        text: `${typeName} thumbnail has been deleted successfully.`,
        confirmButtonColor: "#3085d6"
      });
    } catch (error) {
      console.error('Delete failed:', error);
      mysweetalert.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong while deleting the thumbnail. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const config = thumbnailConfig[activeTab];
  const currentThumbnail = thumbnails[activeTab];

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-gray-900 to-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-white">Store Thumbnails</h2>
            <p className="text-sm text-gray-300 mt-1">Manage your store's visual assets</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {(Object.keys(thumbnailConfig) as ThumbnailType[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === key
                  ? 'text-gray-900 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {thumbnailConfig[key].name}
              {activeTab === key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Card */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{config.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  <span className="font-medium">Dimensions:</span> {config.dimensions}
                </p>
              </div>
              {config.canAutoCapture && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  Auto-capture available
                </span>
              )}
            </div>
          </div>

          {/* Current Thumbnail Preview */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Thumbnail
            </label>
            <div className={`relative ${config.aspectRatio} w-full max-w-sm mx-auto bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300`}>
              {currentThumbnail ? (
                <>
                  <img
                    src={currentThumbnail}
                    alt={`${config.name} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors group">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Delete thumbnail"
                      >
                        <IoTrash size={20} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <IoCamera size={48} className="mb-2" />
                  <span className="text-sm">No thumbnail uploaded</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Upload Button */}
            <label className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading}
              />
              <div
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer ${
                  isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <IoCloudUpload size={20} />
                <span>Upload Image</span>
              </div>
            </label>

            {/* Auto Capture Button */}
            {config.canAutoCapture && (
              <button
                onClick={handleAutoCapture}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isLoading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <IoRefresh size={20} />
                <span>Auto Capture</span>
              </button>
            )}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
              <span className="text-sm">Processing...</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ThumbnailsModal;
