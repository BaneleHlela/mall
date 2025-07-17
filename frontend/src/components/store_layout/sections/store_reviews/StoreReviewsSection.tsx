import { useAppSelector } from "../../../../app/hooks";
import FirstStoreReviewsSection from "./first/FirstStoreReviewsSection";
import ReviewsWithBackgroundImageAndCard from "./with_bg_image_and_and/ReviewsWithBackgroundImageAndCard";

const StoreReviewsSection = () => {
    const variation = useAppSelector((state) => state.layoutSettings.reviews.variation);
    if (variation === "reviewsWithBackgroundImageAndCard") {
        return (
            <ReviewsWithBackgroundImageAndCard />
        )
        
    }

    if (variation === "first") {
        return (
            <FirstStoreReviewsSection />
        )
    }
    return (
        <p className="">No reviews section matching the variation: {variation}</p>
    )
}

export default StoreReviewsSection;