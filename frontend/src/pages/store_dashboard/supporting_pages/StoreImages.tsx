import React, { useEffect } from "react";
import UploadStoreImage from "../../../components/store_dashboard/UploadStoreImage";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchStoreImages } from "../../../features/stores/storeSlice";

const StoreImages = () => {
  const dispatch = useAppDispatch();

  const currentStore = useAppSelector((state) => state.storeAdmin.store);
  const images = currentStore?.images?.images || [];
  const isLoading = useAppSelector((state) => state.stores.isLoading);

  useEffect(() => {
    if (currentStore?._id) {
      dispatch(fetchStoreImages(currentStore._id));
    }
  }, [dispatch, currentStore?._id]);

  return (
    <div>
      <h2>Store Gallery</h2>

      {isLoading && <p>Loading images...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={`Store Image ${index + 1}`}
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
          />
        ))}
      </div>

      <UploadStoreImage />
    </div>
  );
};

export default StoreImages;
