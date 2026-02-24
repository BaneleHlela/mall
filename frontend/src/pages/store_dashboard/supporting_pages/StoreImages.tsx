import { useEffect, useState } from "react";
import UploadStoreImage from "../../../components/store_dashboard/UploadStoreImage";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteStoreGalleryImage, fetchStoreImages } from "../../../features/stores/storeSlice";
import StoreImageItem from "../supporting/StoreImageItem";
import { FiImage, FiGrid } from "react-icons/fi";
import type { Image } from "../../../types/storeTypes";

interface StoreImagesProps {
  onImageSelect: (imageUrl: string) => void;
}

const StoreImages: React.FC<StoreImagesProps> = ({onImageSelect}) => {
  const dispatch = useAppDispatch();

  const currentStore = useAppSelector((state) => state.storeAdmin.store);
  const images: Image[] = currentStore?.images || [];
  const isLoading = useAppSelector((state) => state.stores.isLoading);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  useEffect(() => {
    if (currentStore?._id) {
      dispatch(fetchStoreImages({ storeSlug: currentStore.slug, page, limit })).then((res: any) => {
        setHasMore(res.payload.hasMore);
      });
    }
  }, [dispatch, currentStore?._id, page]);


  const handleDeleteImage = (imageUrl: string) => {
    if (currentStore?._id) {
      dispatch(deleteStoreGalleryImage({ storeSlug: currentStore.slug, imageUrl }))
        .unwrap()
        .then(() => {
          console.log("Image deleted successfully:", imageUrl);
        })
        .catch((error) => {
          console.error("Failed to delete image:", error);
        });
    }
  };

  const handleSelectImage = (url: string) => {
    onImageSelect(url);
  };

  const loadMoreImages = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-1 lg:p-3 h-full w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <FiImage className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Gallery</h1>
                <p className="text-sm text-slate-500">{images.length} images total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50/50">
          <UploadStoreImage />
        </div>

        {/* Images Grid */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-5">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin" />
                <p className="text-slate-500 text-sm">Loading images...</p>
              </div>
            </div>
          )}

          {!isLoading && images.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <FiGrid className="text-2xl text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium mb-1">No images yet</p>
              <p className="text-slate-400 text-sm">Start uploading to build your gallery</p>
            </div>
          )}

          {!isLoading && images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {images.map((img: Image) => (
                <StoreImageItem
                  key={img._id}
                  img={img}
                  onDelete={() => handleDeleteImage(img.url)}
                  onUse={handleSelectImage}
                />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && images.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMoreImages}
                className="flex items-center gap-2 px-6 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all text-sm font-medium"
              >
                Load more images
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreImages;

