import { motion } from "framer-motion";
import { getBackgroundStyles, getDivAnimation, getTextStyles } from "../../../../../utils/stylingFunctions";
import StarDisplay from "../review/supporting/StarDisplay";

interface StoreOverallReviewsCardProps {
    stats: {
        averageRating: number;
        numberOfRatings: number;
    };
    style: any;
}
const StoreOverallReviewsCard: React.FC<StoreOverallReviewsCardProps> = ({stats, style}) => {

    return (
        <motion.div 
            {...getDivAnimation(style.background.animation || "upToDown")}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
               ...getBackgroundStyles(style.background),
            }}
            className="flex flex-col justify-between min-h-fit"
        >
            <div className="flex flex-row justify-center">
                <StarDisplay 
                    rating={stats.averageRating} 
                    style={style.starsDisplay}
                />
            </div>
            <div 
                style={{
                    ...getTextStyles(style.text),
                    ...getTextStyles(style.text.totalRatings),
                }}
                className="text-center"
            >
                {stats.numberOfRatings}
            </div>
            <div
                style={{
                    ...getTextStyles(style.text),
                    ...getTextStyles(style.text.comment),
                }} 
                className="text-center">
                {style.text.comment.input}
            </div>
        </motion.div>
    )
}

export default StoreOverallReviewsCard