import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";

interface StoreLayoutImageSettingsProps {
  value: string; // image URL
  onChange: (url: string) => void;
}

const StoreLayoutImageSettings: React.FC<StoreLayoutImageSettingsProps> = ({
  value,
  onChange,
}) => {
  const [mode, setMode] = useState<"upload" | "gallery">("upload");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const images =
    useAppSelector((state) => state.storeAdmin.store?.images) || [];

  const handleGalleryImageClick = (url: string) => {
    onChange(url);
    setIsGalleryOpen(false);
  };

  return (
    <div className="space-y-4 relative">
      <div>
        <label className="font-semibold">Image Source</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "upload" | "gallery")}
          className="border rounded-md px-2 py-1 w-full mt-1"
        >
          <option value="gallery">Choose from gallery</option>
          <option value="upload">Upload new</option>
        </select>
      </div>

      {/* {mode === "upload" && (
        <UploadStoreImage
        />
      )} */}

      {mode === "gallery" && (
        <button
          onClick={() => setIsGalleryOpen(true)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Gallery
        </button>
      )}

      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg- bg-opacity-40">
          <div className="bg-white p-4 rounded-lg shadow-md w-[80%] max-w-xl relative">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">Select an Image</h2>

            <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`store-img-${i}`}
                  onClick={() => handleGalleryImageClick(img.url)}
                  className="cursor-pointer rounded hover:opacity-80 border-[.3vh] border-transparent hover:border-blue-500"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {value && (
        <div className="mt-4">
          <label className="font-semibold block mb-1">Selected Image:</label>
          <img
            src={value}
            alt="Selected"
            className="w-40 h-40 object-cover rounded border-[.15vh]"
          />
        </div>
      )}
    </div>
  );
};

export default StoreLayoutImageSettings;
