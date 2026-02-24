import React, { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  uploadStoreThumbnail,
  deleteStoreThumbnail,
  captureStoreCardThumbnail,
  captureReelyThumbnail
} from "../../../features/store_admin/storeAdminSlice";
import { IoCamera, IoTrash, IoCloudUpload, IoRefresh, IoImage } from "react-icons/io5";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const mysweetalert = withReactContent(Swal);

type ThumbnailType = 'storeCard' | 'profily' | 'reely';

interface ThumbnailCardProps {
  type: ThumbnailType;
  name: string;
  description: string;
  dimensions: string;
  currentUrl: string;
  canAutoCapture: boolean;
  aspectRatio: string;
  onUpload: (file: File, type: ThumbnailType) => void;
  onDelete: (type: ThumbnailType) => void;
  onAutoCapture: (type: ThumbnailType) => void;
  isLoading: boolean;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  type,
  name,
  description,
  dimensions,
  currentUrl,
  canAutoCapture,
  aspectRatio,
  onUpload,
  onDelete,
  onAutoCapture,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file, type);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-xs text-gray-500">{dimensions}</p>
          </div>
          {canAutoCapture && (
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
              Auto
            </span>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="p-4">
        <div className={`relative ${aspectRatio} w-full bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 group`}>
          {currentUrl ? (
            <>
              <img
                src={currentUrl}
                alt={`${name} thumbnail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => onDelete(type)}
                  disabled={isLoading}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Delete"
                >
                  <IoTrash size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <IoImage size={32} className="mb-1" />
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <label className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isLoading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <IoCloudUpload size={16} />
              Upload
            </button>
          </label>

          {canAutoCapture && (
            <button
              onClick={() => onAutoCapture(type)}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <IoRefresh size={16} />
              Capture
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ThumbnailsControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const isLoading = useAppSelector((state) => state.storeAdmin.isLoading);

  if (!store) {
    return <p className="text-gray-500">No store selected</p>;
  }

  const thumbnails = store.thumbnails || { storeCard: '', profily: '', reely: '' };

  const thumbnailConfigs = [
    {
      type: 'storeCard' as ThumbnailType,
      name: 'Store Card',
      description: 'Main store display thumbnail',
      dimensions: '1447 × 900 px',
      canAutoCapture: true,
      aspectRatio: 'aspect-[1447/900]',
    },
    {
      type: 'profily' as ThumbnailType,
      name: 'Profily',
      description: 'Profile thumbnail for listings',
      dimensions: 'Manual upload only',
      canAutoCapture: false,
      aspectRatio: 'aspect-square',
    },
    {
      type: 'reely' as ThumbnailType,
      name: 'Reely',
      description: 'Mobile reel-style thumbnail',
      dimensions: '360 × 660 px',
      canAutoCapture: true,
      aspectRatio: 'aspect-[360/660]',
    },
  ];

  const handleUpload = async (file: File, type: ThumbnailType) => {
    const config = thumbnailConfigs.find(c => c.type === type);
    const typeName = config?.name || type;

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

    if (!isConfirmed) return;

    try {
      await dispatch(uploadStoreThumbnail({
        storeSlug: store.slug,
        thumbnailFile: file,
        thumbnailType: type,
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
  };

  const handleDelete = async (type: ThumbnailType) => {
    const config = thumbnailConfigs.find(c => c.type === type);
    const typeName = config?.name || type;

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
        thumbnailType: type,
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

  const handleAutoCapture = async (type: ThumbnailType) => {
    const config = thumbnailConfigs.find(c => c.type === type);
    const typeName = config?.name || type;

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
      if (type === 'storeCard') {
        await dispatch(captureStoreCardThumbnail({ storeSlug: store.slug })).unwrap();
      } else if (type === 'reely') {
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

  return (
    <div className="h-full flex flex-col items-center border-2 border-gray-200 rounded-md shadow-md w-full max-w-md py-4 px-4 overflow-y-scroll hide-scrollbar">
      <div className="flex items-center gap-2 mb-4">
        <IoCamera size={20} className="text-gray-700" />
        <h2 className="text-lg font-semibold">Store Thumbnails</h2>
      </div>

      <div className="w-full space-y-4">
        {thumbnailConfigs.map((config) => (
          <ThumbnailCard
            key={config.type}
            {...config}
            currentUrl={thumbnails[config.type]}
            onUpload={handleUpload}
            onDelete={handleDelete}
            onAutoCapture={handleAutoCapture}
            isLoading={isLoading}
          />
        ))}
      </div>

      {isLoading && (
        <div className="mt-4 flex items-center gap-2 text-gray-600">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          <span className="text-sm">Processing...</span>
        </div>
      )}
    </div>
  );
};

export default ThumbnailsControl;
