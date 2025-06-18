import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getStoreRatingStats } from "../../../../../features/reviews/reviewSlice";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import StoreOverallReviewsCard from "../../../extras/cards/store/StoreOverallReviewsCard";
import SendEmailForm from "../../../extras/forms/SendEmailForm";

const FourthStoreHeroSection = () => {
  const dispatch = useAppDispatch();
  const style = useAppSelector(state => state.layoutSettings.practice);
  const store = useAppSelector((state) => state.stores.currentStore);
  const ratingStats = useAppSelector((state) => state.reviews.ratingStats);

  useEffect(() => {
    if (store?._id) {
      dispatch(getStoreRatingStats(store._id));
    }
  }, [store?._id, dispatch]);
  
  return (
    <div 
        className="w-full h-fit relative bg-amber-300"
    >
        {/* Background Image */}
        <div className="absolute top-0 w-full h-full -z-1">
          <img src="" alt="" />
        </div>
        {/* Mobile */}
        <div className="p-6 space-y-5 lg:hidden">
          {/* text */}
          <div
            className="flex flex-col justify-center w-full h-[20vh] bg-white mt-10 "
          >
            <p
              style={{
                ...getTextStyles(style.heading.mobile.main),
                fontWeight: style.heading.mobile.main.fontWeight,
              }}  
              className="leading-12"
            >
                {style.heading.mobile.main.text.trim() === "" ? "Quality Roofing Solutions" : style.heading.mobile.main.text}
            </p>
            <p
              style={{
                ...getTextStyles(style.heading.mobile.subheading),
                fontWeight: style.heading.mobile.subheading.fontWeight,
              }}  
              className=""
            >
                {style.heading.mobile.subheading.text.trim() === ""? "Durable, Reliable, and Professional" : style.heading.mobile.subheading.text  }
            </p>

          </div>
          {/* Reviews summary */}
          <div className={`
                flex flex-row justify-center w-full h-fit
                ${style.reviewsCard.placement === "right" && "justify-end"}
                ${style.reviewsCard.placement === "left" && "justify-start"}
                ${style.reviewsCard.placement === "center" && "justify-center"}
            `}>
              <StoreOverallReviewsCard stats={ratingStats} style={style.reviewsCard}/>
          </div>
          {/* Email us */}
          <div className="w-full h-[90vh] bg-white mt-5">

          </div>
        </div>
        {/* desktop */}
        <div className="hidden lg:flex flex-row w-full h-[100vh] justify-between">
          {/* Text and review */}
          <div className="h-full w-[57%] flex flex-col justify-center p-4 space-y-5">
            {/* Text */}
            <div 
              className="flex flex-col justify-center h-fit w-full"
            >
              <p
                style={{
                  ...getTextStyles(style.heading.desktop.main),
                  fontWeight: style.heading.desktop.main.fontWeight,
                }}  
                className="leading-30"
              >
                  {style.heading.mobile.main.text.trim() === "" ? "Quality Roofing Solutions" : style.heading.mobile.main.text}
              </p>
              <p
                style={{
                  ...getTextStyles(style.heading.desktop.subheading),
                  fontWeight: style.heading.desktop.subheading.fontWeight,
                }}  
                className=""
              >
                  {style.heading.mobile.subheading.text.trim() === ""? "Durable, Reliable, and Professional" : style.heading.mobile.subheading.text  }
              </p>
            </div>
            {/* Reviews */}
            <div className={`
                flex flex-row justify-center w-full h-fit
                ${style.reviewsCard.placement === "right" && "justify-end"}
                ${style.reviewsCard.placement === "left" && "justify-start"}
                ${style.reviewsCard.placement === "center" && "justify-center"}
            `}>
              <StoreOverallReviewsCard stats={ratingStats} style={style.reviewsCard}/>
            </div>
          </div>
          {/* Form */}
          <div className="flex flex-col justify-end w-[43%] h-full bg-white">
              <SendEmailForm />
          </div>
        </div>
    </div>
  )
}

export default FourthStoreHeroSection;