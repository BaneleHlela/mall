import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getStoreReviews } from "../../../../../features/reviews/reviewSlice";
import StoreReviewCard from "../../../extras/cards/review/StoreReviewCard";
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import AddReviewModal from "../../../../the_mall/reviews/AddReviewModal";

const FirstStoreReviewsSection = () => {
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
    <div 
      style={{
        backgroundColor: settings.background.color,
      }}
      className="p-4 max-h-[150vh] hide-scrollbar overflow-scroll lg:pb-10"
    >
      <h2
        style={{
          ...getTextStyles(settings.text.title),  
        }} 
        className={`text-xl font-bold mb-4
          ${settings.text.title.position === "center" && "text-center"}
          ${settings.text.title.position === "end" && "text-end"}
          ${settings.text.title.position === "start" && "text-start"}`}
      >{settings.text.title.input}</h2>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {reviews.length > 0 ? (
        <div className="flex flex-row justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:px-5">
            {reviews.map((review) => (
              <StoreReviewCard
                key={review._id}
                reviewerName={review.user && review.user.firstName && review.user.lastName
                  ? `${review.user.firstName} ${review.user.lastName}`
                  : "Anonymous"}
                review={review.comment}
                rating={review.rating}
                anonymous={review.anonymous || false}
                style={settings.reviewCard}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No reviews found for this store.</p>
      )}
      {/* Add Review */}
      <div
        className={`flex flex-row justify-center mt-4 hover:scale-102
          ${settings.addReviewBtn.shadow && "shadow-md"}`}
      > 
        <button
          onClick={openModal}
          style={{
            ...getTextStyles(settings.text.addReviewBtn),
            ...getBackgroundStyles(settings.addReviewBtn),
          }}
          className={`${settings.addReviewBtn.fullWidth && "w-full max-w-[350px]"} text-center p-3 pl-4 pr-4 text-wrap`}
        >
          {settings.text.addReviewBtn.input || 'Add Review'}
        </button>
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

export default FirstStoreReviewsSection;