import React, { useRef, useState } from "react";
import type { RootState } from "../../../app/store";
import { fetchStore } from "../../../features/store_admin/storeAdminSlice";
import { uploadStoreLogo, deleteStoreLogo } from "../../../features/stores/storeSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TbLoader3 } from "react-icons/tb";

const LogoControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const store = useAppSelector((state: RootState) => state.storeAdmin.store) || useAppSelector((state: RootState) => state.stores.currentStore);
  const isLoading = useAppSelector((state: RootState) => state.storeAdmin.isLoading || state.stores.isLoading);
  const logo = store?.logo || {};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    const MAX_FILE_SIZE = 1024 * 1024;
  
    if (file.size > MAX_FILE_SIZE) return alert("File too large (max 1MB).");
    if (!store?._id) return alert("Store ID missing.");
  
    try {
      await dispatch(uploadStoreLogo({ storeId: store._id, logoFile: file })).unwrap();
      await dispatch(fetchStore(store._id));
      alert("Logo uploaded successfully.");
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload logo. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!store?._id) {
      alert("Store ID missing.");
      return;
    }
  
    const confirmed = window.confirm("Are you sure you want to delete the current logo?");
    if (!confirmed) return;
  
    try {
      await dispatch(deleteStoreLogo({ storeId: store._id })).unwrap();
      alert("Logo deleted successfully.");
      setSelectedFile(null);
      await dispatch(fetchStore(store._id));
    } catch (error) {
      console.error("Failed to delete logo:", error);
      alert("Failed to delete logo. Please try again.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const hasExistingLogo = !!logo?.url;

  return (
    <div className="flex flex-col items-center border rounded-md shadow-md w-full bg-white py-1">
      <h2 className="text-lg font-semibold mb-2">Store Logo</h2>

      <div className="flex flex-row h-22 w-full justify-between px-2">
        {logo?.url && (
          <div className="mb-4">
            <img src={logo.url} alt="Current Logo" className="h-22 w-22 rounded border object-cover" />
          </div>
        )}
        <div className="flex flex-col w-[60%] h-full justify-between py-1">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />

          <button
            onClick={triggerFileInput}
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white text-sm rounded transition duration-300 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <TbLoader3 size={20} className="animate-spin mx-auto" />
            ) : hasExistingLogo ? (
              "Replace Logo"
            ) : (
              "Upload Logo"
            )}
          </button>

          {hasExistingLogo && (
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className={`w-full px-4 py-2 text-sm rounded transition duration-300 ${
                isLoading
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-red-600 border-red-500 hover:bg-red-100'
              }`}
            >
              Delete Logo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoControl;