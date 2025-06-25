import React, { useEffect, useState } from "react";
import UploadStoreImage from "../../../components/store_dashboard/UploadStoreImage";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchStoreImages } from "../../../features/stores/storeSlice";
import StoreImageItem from "../supporting/StoreImageItem";
import { IoIosArrowDown } from "react-icons/io"; // Import the arrow icon

const StoreImages = () => {
  const dispatch = useAppDispatch();

  const currentStore = useAppSelector((state) => state.storeAdmin.store);
  const images = currentStore?.images || [];
  const isLoading = useAppSelector((state) => state.stores.isLoading);
  const [page, setPage] = useState(1); // Keep track of the current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more images to load
  const limit = 5; // Number of images per page
  console.log(hasMore)
  useEffect(() => {
    if (currentStore?._id) {
      dispatch(fetchStoreImages({ storeId: currentStore._id, page, limit })).then((res: any) => {
        setHasMore(res.payload.hasMore); // Update `hasMore` with the response
      });
    }
  }, [dispatch, currentStore?._id, page]);

  const handleViewImage = (url: string) => {
    // Implement view functionality (e.g., open in a modal)
    console.log("Viewing image:", url);
  };

  const handleDeleteImage = (id: string) => {
    // Implement delete functionality
    console.log("Deleting image with id:", id);
  };

  const handleUseImage = (url: string) => {
    // Implement use functionality
    console.log("Using image:", url);
  };

  const loadMoreImages = () => {
    setPage((prev) => prev + 1); // Increase the page number to fetch more images
  };

  return (
    <div className="h-full w-full m-1 rounded-xl bg-white shadow-md p-2">
      <div className="h-[25%] items-start w-full">
        <UploadStoreImage />
      </div>

      {/* Add a horizontal line here */}
      <hr className="w-5/5 mx-auto border-gray-300" />

      <div className="h-[55%] overflow-y-scroll hide-scrollbar">
        {isLoading && <p>Loading images...</p>}

        <div className="grid grid-cols-2 gap-2 py-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-fr">          
          {images.map((img) => (
            <StoreImageItem
              key={img._id}
              img={img}
              onView={handleViewImage}
              onDelete={handleDeleteImage}
              onUse={handleUseImage}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="w-full flex flex-row justify-center ">
            <button
              onClick={loadMoreImages}
              className="mt-6 flex items-center justify-center px-4 py-2 text-black rounded-full hover:scale-102 transition-colors"
            >
              <IoIosArrowDown size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreImages;
