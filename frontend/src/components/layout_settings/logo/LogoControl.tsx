import React, { useState } from "react";
import type { RootState } from "../../../app/store";
import { updateStoreSetting, fetchStore } from "../../../features/store_admin/storeAdminSlice";
import { uploadStoreLogo, deleteStoreLogo } from "../../../features/stores/storeSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const LogoControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textLogo, setTextLogo] = useState<string>("");
  
  const store = useAppSelector((state: RootState) => state.storeAdmin.store);
  const logo = store?.logo || {};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleTextLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextLogo(event.target.value);
  };

  const handleUpload = async () => {
    const MAX_FILE_SIZE = 1024 * 1024;
  
    if (!selectedFile) return alert("Please select a file.");
    if (selectedFile.size > MAX_FILE_SIZE) return alert("File too large (max 1MB).");
    if (!store?._id) return alert("Store ID missing.");
  
    try {
      await dispatch(uploadStoreLogo({ storeId: store._id, logoFile: selectedFile })).unwrap();
      
      // Fetch updated store data after logo upload
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
      setTextLogo("");
      // Fetch updated store data after logo delete
      await dispatch(fetchStore(store._id));
    } catch (error) {
      console.error("Failed to delete logo:", error);
      alert("Failed to delete logo. Please try again.");
    }
  };
  

  const handleTextLogoSubmit = () => {
    if (!textLogo) return alert("Please enter text for the logo.");

    dispatch(updateStoreSetting({
      field: "logo.text",
      value: textLogo,
    }));
    alert("Text logo updated!");
    setTextLogo(""); // Clear the input after submission
  };

  const hasExistingLogo = !!(logo?.url || logo?.text);

  return (
    <div className="flex flex-col items-start gap-3 border p-4 rounded-md shadow-md w-fit bg-white">
      <label className="text-sm font-medium">
        {hasExistingLogo ? "Replace Logo:" : "Upload Logo:"}
      </label>

      <input type="file" onChange={handleFileChange} className="text-sm" />

      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className={`px-4 py-2 text-white text-sm rounded ${selectedFile ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
      >
        {hasExistingLogo ? "Replace Logo" : "Upload Logo"}
      </button>

      {hasExistingLogo && (
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm text-red-600 border border-red-500 rounded hover:bg-red-100"
        >
          Delete Logo
        </button>
      )}

      {logo?.url && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">Current Logo:</p>
          <img src={logo.url} alt="Current Logo" className="h-12 mt-1 rounded border" />
        </div>
      )}

      {/* {!logo?.url && logo?.text && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">Current Text Logo:</p>
          <p className="text-sm italic text-gray-600">"{logo.text}"</p>
        </div>
      )} */}

      <div className="mt-4">
        <label className="text-sm font-medium">Text Logo (optional):</label>
        <input
          type="text"
          value={textLogo}
          onChange={handleTextLogoChange}
          className="border p-2 text-sm w-full mt-1"
          placeholder={logo.text ? logo.text : ""}
        />
        <button
          onClick={handleTextLogoSubmit}
          disabled={!textLogo}
          className={`px-4 py-2 text-white text-sm rounded ${textLogo ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Update Text Logo
        </button>
      </div>
    </div>
  );
};

export default LogoControl;
