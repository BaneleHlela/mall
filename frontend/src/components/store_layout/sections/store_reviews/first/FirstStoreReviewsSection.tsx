import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getStoreReviews } from "../../../../../features/reviews/reviewSlice";
import StoreReviewCard from "../../../extras/cards/review/StoreReviewCard";
import { getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions";

const FirstStoreReviewsSection = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.stores.currentStore);
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const isLoading = useAppSelector((state) => state.reviews.isLoading);
  const error = useAppSelector((state) => state.reviews.error);
  const settings = useAppSelector((state) => state.layoutSettings.reviews)


  useEffect(() => {
    if (store?._id) {
      dispatch(getStoreReviews(store._id));
    }
  }, [store?._id, dispatch]);


  return (
    <div 
      style={{
        backgroundColor: settings.backgroundColor,
      }}
      className="p-4 lg:pb-10"
    >
      <h2
        style={{
          ...getTextStyles(
            window.innerWidth >= 1024
              ? settings.text.title.style.desktop // Use desktop styles for large screens
              : settings.text.title.style.mobile // Use mobile styles for smaller screens
          ),
        }} 
        className={`text-xl font-bold mb-4 ${settings.text.title.style.center && "text-center"}`}
      >{settings.text.title.input}</h2>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <StoreReviewCard
              key={review._id}
              reviewerName={`${review.user.firstName} ${review.user.lastName}`}
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
      {/* Add Review */}
      <div
        className={`flex flex-row justify-center mt-4 hover:scale-102
          ${settings.addReviewBtn.shadow && "shadow-md"}`}
      > 
        <button
          style={{
            backgroundColor: settings.addReviewBtn.backgroundColor,
            ...getBorderStyles(settings.addReviewBtn.border),
            ...getTextStyles(settings.text.addReviewBtn),
          }}
          className={`${settings.addReviewBtn.fullWidth && "w-full"} p-3 pl-4 pr-4`}>
          Add Review
        </button>
      </div>
    </div>
  );
};

export default FirstStoreReviewsSection;
