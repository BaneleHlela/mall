import { useAppSelector } from "../../../../app/hooks";
import StoreReviewsSection from "../../../../components/store_layout/sections/store_reviews/StoreReviewsSection.tsx";
import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection.tsx";

const StoreReviewsPage = () => {
  const reviewsSections = useAppSelector(
    (state) => state.layoutSettings.routes.reviews?.contains || []
  );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <StoreReviewsSection />
      {reviewsSections.includes("footer") && <StoreFooterSection />}
    </div>
  );
};

export default StoreReviewsPage;
