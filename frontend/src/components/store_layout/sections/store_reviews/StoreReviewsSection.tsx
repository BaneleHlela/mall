import FirstStoreReviewsSection from "./first/FirstStoreReviewsSection";

const StoreReviewsSection = () => {
    const variation = "first";

    if (variation === "first") {
        return (
            <FirstStoreReviewsSection />
        )
    }
}

export default StoreReviewsSection;