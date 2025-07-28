import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getStoreRatingStats } from "../../../../../features/reviews/reviewSlice";
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from "../../../../../utils/stylingFunctions";
import StoreOverallReviewsCard from "../../../extras/cards/store/StoreOverallReviewsCard";
import UnderlinedText from "../../../extras/text/UnderlinedText";
import SendEmailForm from "../../../extras/forms/send_email/SendEmailForm";

const HeroWithReviewCardAndEmailForm = () => {
  const dispatch = useAppDispatch();
  const style = useAppSelector(state => state.layoutSettings.hero);
  const store = useAppSelector((state) => state.stores.currentStore);
  const ratingStats = useAppSelector((state) => state.reviews.ratingStats);

  useEffect(() => {
    if (store?._id) {
      dispatch(getStoreRatingStats(store._id));
    }
  }, [store?._id, dispatch]);
  
  return (
    <div 
        className="w-full h-fit relative z-0"
    >
        {/* backgroundImage */}
        <div className="absolute inset-0 w-full h-full z-[-1]">
          <img 
            src={style.background.image} 
            alt="Contact Backgroung Image" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* background Opacity */}
        <div
          style={{
            ...getBackgroundStyles(style.background),
          }} 
          className="absolute inset-0 w-full h-full z-[-1]">
        </div>
        {/* Mobile */}
        <div className="p-4 space-y-5 z-10 lg:hidden">
          {/* Heading & Subheading */}
          <div 
              className='w-full mt-15'
          >   
              {/* Heading + Subheading */}
              <div className="w-full">
                <UnderlinedText style={style.text.heading} />
                
                {style.text.subheading.input && (
                  <UnderlinedText style={style.text.subheading} />
                )}
              </div>
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
          {/* Email Form */}
          <div className="flex flex-col items-center w-full h-full">
            <div className="mb-[10%] w-full">
              <SendEmailForm style={style.sendEmailForm}/>
            </div> 
          </div>
        </div>
        {/* desktop */}
        <div className="hidden lg:flex flex-col w-full z-10 h-full justify-center px-10">
          {/* Text */}
          <div 
              className="flex flex-col justify-center h-fit w-full mt-[15vh]"
              style={{
                width: style.text.width.desktop
              }}
          >
            <p
              style={{
                ...getTextStyles(style.text.heading),
              }}  
              className={`${style.text.heading.animation}`}
            >
              {style.text.heading.input  }              
            </p>
            <p
              style={{
                ...getTextStyles(style.text.subheading),
              }}  
              className={`${style.text.subheading.animation}`}
            >
              {style.text.subheading.input === "" ? "Quality (Your Service) Solutions" : style.text.subheading.input}
            </p>
        </div>
          {/* Form and Reviews */}
          <div className="h-[70%] w-[100%] flex flex-row justify-between p-4 py-[5%] space-y-5">
            {/* Reviews */}
            <div className={`
                flex flex-row justify-center w-[60%] h-fit
                ${style.reviewsCard.placement === "right" && "justify-end"}
                ${style.reviewsCard.placement === "left" && "justify-start"}
                ${style.reviewsCard.placement === "center" && "justify-center"}
            `}>
              <StoreOverallReviewsCard stats={ratingStats} style={style.reviewsCard}/>
            </div>
            {/* Form */}
            <div className="flex flex-col justify-end h-full w-[50%] ml-4">
              <div className=" w-full">
                <SendEmailForm style={style.sendEmailForm}/>
              </div> 
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default HeroWithReviewCardAndEmailForm;