import { useEffect, useState } from "react";
import UploadStoreImage from "../../../components/store_dashboard/UploadStoreImage";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteStoreGalleryImage, fetchStoreImages } from "../../../features/stores/storeSlice";
import StoreImageItem from "../supporting/StoreImageItem";
import { IoIosArrowDown } from "react-icons/io"; // Import the arrow icon
import type { Image } from "../../../types/storeTypes";

interface StoreImagesProps {
  onImageSelect: (imageUrl: string) => void;
}

const StoreImages: React.FC<StoreImagesProps> = ({onImageSelect}) => {
  const dispatch = useAppDispatch();

  const currentStore = useAppSelector((state) => state.storeAdmin.store);
  const images: Image[] = currentStore?.images || [];
  const isLoading = useAppSelector((state) => state.stores.isLoading);
  const [page, setPage] = useState(1); // Keep track of the current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more images to load
  const limit = 5; // Number of images per page

  useEffect(() => {
    if (currentStore?._id) {
      dispatch(fetchStoreImages({ storeSlug: currentStore.slug, page, limit })).then((res: any) => {
        setHasMore(res.payload.hasMore); // Update `hasMore` with the response
      });
    }
  }, [dispatch, currentStore?._id, page]);


  const handleDeleteImage = (imageUrl: string) => {
    if (currentStore?._id) {
      dispatch(deleteStoreGalleryImage({ storeSlug: currentStore.slug, imageUrl }))
        .unwrap()
        .then(() => {
          console.log("Image deleted successfully:", imageUrl);
          // Update local state
          //const updatedImages = images.filter(img => img.url !== imageUrl);
          // You'll need to create a new action to update the store's images
          //dispatch(updateStoreImages(updatedImages));
        })
        .catch((error) => {
          console.error("Failed to delete image:", error);
        });
    }
  };

  const handleSelectImage = (url: string) => {
    onImageSelect(url); // Call the parent function to handle image selection
  };

  const loadMoreImages = () => {
    setPage((prev) => prev + 1); // Increase the page number to fetch more images
  };

  return (
    <div className="h-full w-full mt-1 lg:m-1 shadow-md p-2 overflow-y-scroll">
      <div className="h-fit flex flex-row justify-center w-full py-1">
        <UploadStoreImage />
      </div>

      {/* Add a horizontal line here */}
      <hr className="w-5/5 mx-auto border-gray-300" />

      <div className="flex flex-col items-center justify-center h-fit lg:h-fit overflow-y-scroll hide-scrollbar">
        {isLoading && <p>Loading images...</p>}

        {!isLoading && images.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No images yet — start uploading!
          </p>
        )}

        <div className="grid h-fit grid-cols-2 gap-2 py-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-fr">          
          {images.map((img: Image) => (
            <StoreImageItem
              key={img._id}
              img={img}
              onDelete={() => handleDeleteImage(img.url)}
              onUse={handleSelectImage}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="hidden w-full flex flex-row justify-center ">
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

