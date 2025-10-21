import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getStoreReviews } from "../../../../../features/reviews/reviewSlice";
import StoreReviewCard from "../../../extras/cards/review/StoreReviewCard";
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from "../../../../../utils/stylingFunctions";
import AddReviewModal from "../../../../the_mall/reviews/AddReviewModal";
import { getGridColumnClasses } from "../../gallery/gallery_with_grouped_images/SingleGroupImages";
import UnderlinedText from "../../../extras/text/UnderlinedText";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const ReviewsWithBackgroundImageAndCard = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.stores.currentStore);
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const isLoading = useAppSelector((state) => state.reviews.isLoading);
  const error = useAppSelector((state) => state.reviews.error);
  const settings = useAppSelector((state) => state.layoutSettings.reviews);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const isMobile = window.innerWidth < 768;
  const visibleCount = isMobile ? settings.grid.columns.mobile : settings.grid.columns.desktop;
  const totalGroups = Math.ceil(reviews.length / visibleCount);

  let currentGroup = reviews.slice(
    activeGroupIndex * visibleCount,
    activeGroupIndex * visibleCount + visibleCount
  );

  if (currentGroup.length < visibleCount && reviews.length > 0) {
    const needed = visibleCount - currentGroup.length;
    const padding = reviews.slice(0, needed);
    currentGroup = [...currentGroup, ...padding];
  }

  console.log(settings.grid.container.stack?.desktop)

  const isHorizontal =
    (isMobile && settings.grid.container.stack?.mobile === "horizontal") ||
    (!isMobile && settings.grid.container.stack?.desktop === "horizontal");

  useEffect(() => {
    if (store?._id) {
      dispatch(getStoreReviews(store._id));
    }
  }, [store?._id, dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNext = () => {
    setDirection("right");
    setActiveGroupIndex((prev) => (prev + 1) % totalGroups);
  };

  const handlePrev = () => {
    setDirection("left");
    setActiveGroupIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-auto overflow-scroll hide-scrollbar flex flex-col items-center">
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
        style={getBackgroundStyles(settings.background)}
        className="absolute inset-0 w-full h-full bg-[#ffffff2f]"
      />

      {/* Content Container */}
      <div
        style={getBackgroundStyles(settings.containerBackground)}
        className="relative z-1 p-4 bg-white overflow-y-scroll hide-scrollbar"
      >
        {/* Heading */}
        <div className="w-full">
          <UnderlinedText style={settings.text.heading} />
          {settings.text.subheading.input && (
            <UnderlinedText style={settings.text.subheading} />
          )}
        </div>

        {/* Reviews */}
        {isLoading && <p>Loading reviews...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {reviews.length > 0 ? (
          isHorizontal ? (
            <div className="w-full relative flex flex-col items-center overflow-hidden">
              {/* Navigation */}
              <div className="flex justify-between absolute top-1/2 w-full z-10">
                <button
                  style={{
                    ...getBackgroundStyles(settings.grid.container.toggleButtons.background),
                    ...getTextStyles(settings.grid.container.toggleButtons),
                  }}
                  onClick={handlePrev}
                >
                  <MdOutlineKeyboardArrowLeft />
                </button>
                <button
                  style={{
                    ...getBackgroundStyles(settings.grid.container.toggleButtons.background),
                    ...getTextStyles(settings.grid.container.toggleButtons),
                  }}
                  onClick={handleNext}
                >
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>

              {/* Carousel */}
              <div className="w-full flex justify-center items-center">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeGroupIndex}
                    custom={direction}
                    initial={{ x: direction === "right" ? 100 : -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === "right" ? -100 : 100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex gap-4 justify-center"
                    style={{
                      gap: getResponsiveDimension(settings.grid.gap),
                      ...getBackgroundStyles(settings.grid.container.background),
                    }}
                  >
                    {currentGroup.map((review) => (
                      <StoreReviewCard
                        key={review._id}
                        reviewerName={
                          review.user?.firstName && review.user?.lastName
                            ? `${review.user.firstName} ${review.user.lastName}`
                            : "Anonymous"
                        }
                        review={review.comment}
                        rating={review.rating}
                        anonymous={review.anonymous || false}
                        style={settings.reviewCard}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step Indicators */}
              {settings.grid.container.stepIndicator.use === "digits" && (
                <div
                  style={getTextStyles(settings.grid.container.stepIndicator.text)}
                  className="mt-4 text-sm"
                >
                  {(() => {
                    const start = activeGroupIndex * visibleCount + 1;
                    const end = Math.min(start + visibleCount - 1, reviews.length);
                    return `${start}–${end} / ${reviews.length}`;
                  })()}
                </div>
              )}

              {settings.grid.container.stepIndicator.use === "dots" && (
                <div className="mt-4 flex gap-2">
                  {Array.from({ length: totalGroups }).map((_, index) => (
                    <span
                      key={index}
                      style={{
                        ...getBackgroundStyles(settings.grid.container.stepIndicator.background),
                        width: getResponsiveDimension(settings.grid.container.stepIndicator.background.height),
                        backgroundColor:
                          index === activeGroupIndex
                            ? settings.grid.container.stepIndicator.background.color
                            : "transparent",
                      }}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index === activeGroupIndex ? "scale-105" : ""
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Grid fallback (vertical stack)
            <div
              className={`w-full flex flex-row max-h-[100vh] overflow-y-scroll hide-scrollbar ${
                settings.grid.container.background.position === "center"
                  ? "justify-center"
                  : settings.grid.container.background.position === "start"
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div
                style={{
                  ...getBackgroundStyles(settings.grid.container.background),
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
                      review.user?.firstName && review.user?.lastName
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
            </div>
          )
        ) : (
          <p>No reviews found for this store.</p>
        )}

        {/* Add Review Button */}
        <div
          className={`flex flex-row justify-center mt-4 hover:scale-102 ${
            settings.addReviewBtn.shadow && "shadow-md"
          }`}
        >
          <button
            onClick={openModal}
            style={{
              ...getTextStyles(settings.addReviewBtn.text),
              ...getBackgroundStyles(settings.addReviewBtn.background),
            }}
            className={`w-full max-w-[350px] text-center text-wrap`}
          >
            {settings.addReviewBtn.text.input || 'Add Review'}
                </button>
            </div>
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