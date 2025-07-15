
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getStoreReviews } from "../../../../../features/reviews/reviewSlice";
import StoreReviewCard from "../../../extras/cards/review/StoreReviewCard";
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from "../../../../../utils/stylingFunctions";
import AddReviewModal from "../../../../the_mall/reviews/AddReviewModal";
import { getGridColumnClasses } from "../../gallery/gallery_with_grouped_images/SingleGroupImages";

const ReviewsWithBackgroundImageAndCard = () => {
    const dispatch = useAppDispatch();
    const store = useAppSelector((state) => state.stores.currentStore);
    const reviews = useAppSelector((state) => state.reviews.reviews);
    const isLoading = useAppSelector((state) => state.reviews.isLoading);
    const error = useAppSelector((state) => state.reviews.error);
    const settings = useAppSelector((state) => state.layoutSettings.reviews);
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      if (store?._id) {
        dispatch(getStoreReviews(store._id));
      }
    }, [store?._id, dispatch]);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="relative w-full h-screen overflow-scroll hide-scrollbar flex flex-col items-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
            <img 
            src={settings.background.image} 
            alt="Reviews Background Image" 
            className="w-full h-full object-cover" 
            />
        </div>
        {/* Background Opacity Overlay */}
        <div
            style={{
            ...getBackgroundStyles(settings.background),
            }} 
            className="absolute inset-0 w-full h-full bg-[#ffffff2f]"
        />
        
        {/* Content Container */}
        <div
            style={{
                ...getBackgroundStyles(settings.containerBackground),
            }} 
            className="relative z-1 p-4 bg-white min-h-screen overflow-y-scroll hide-scrollbar"
        >
            {/* Title */}
            <h2
                style={{
                ...getTextStyles(settings.text.title),  
                }} 
                className={`text-xl font-bold mb-4
                ${settings.text.title.position === "center" && "text-center"}
                ${settings.text.title.position === "end" && "text-end"}
                ${settings.text.title.position === "start" && "text-start"} px-4`}
            >
                {settings.text.title.input}
            </h2>
            
            {/* Subheading */}
            <h2
                style={{
                ...getTextStyles(settings.text.subheading),  
                }} 
                className={`text-xl font-bold mb-4
                ${settings.text.subheading.position === "center" && "text-center"}
                ${settings.text.subheading.position === "end" && "text-end"}
                ${settings.text.subheading.position === "start" && "text-start"} px-4`}
            >
                {settings.text.subheading.input}
            </h2>
            
            {/* Reviews Content */}
            {isLoading && <p>Loading reviews...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {reviews.length > 0 ? (
            <div
                style={{
                    gap: getResponsiveDimension(settings.grid.gap),
                }}
                className={`grid px-1 ${getGridColumnClasses({
                mobile: settings.grid.columns.mobile,
                desktop: settings.grid.columns.desktop,
                })}`}
            >
                {reviews.map((review) => (
                <StoreReviewCard
                    key={review._id}
                    reviewerName={
                    review.user && review.user.firstName && review.user.lastName
                        ? `${review.user.firstName} ${review.user.lastName}`
                        : "Anonymous"
                    }
                    review={review.comment}
                    rating={review.rating}
                    anonymous={review.anonymous || false}
                    style={settings.reviewCard}
                />
                ))}
            </div>
            ) : (
            <p>No reviews found for this store.</p>
            )}    
        </div>
        
        {/* Add Review Modal */}
        {store?._id && (
            <AddReviewModal
            isOpen={isModalOpen}
            onClose={closeModal}
            storeId={store._id}
            />
        )}
        </div>
    );
};

export default ReviewsWithBackgroundImageAndCard;