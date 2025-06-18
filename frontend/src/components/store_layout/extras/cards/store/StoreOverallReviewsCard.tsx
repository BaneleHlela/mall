import { getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
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
        <div 
            style={{
                fontFamily: style.text.fontFamily,
                color: style.text.color,
                ...getBorderStyles(style.background.border),
                backgroundColor: style.background.backgroundColor,
                height: window.innerWidth >= 1024 
                    ? style.background.height.desktop 
                    : style.background.height.mobile,
                width: window.innerWidth >= 1024 
                    ? style.background.height.desktop 
                    : style.background.height.mobile 
            }}
            className="flex flex-col justify-center"
        >
            <div className="flex flex-row justify-center">
                <StarDisplay 
                    rating={stats.averageRating} 
                    style={style.starsDisplay}
                />
            </div>
            <div 
                style={{
                    fontSize: window.innerWidth >= 1024 
                        ? style.text.totalRatings.desktop.fontSize 
                        : style.text.totalRatings.mobile.fontSize,
                }}
                className="text-center"
            >
                {stats.numberOfRatings}
            </div>
            <div
                style={{
                    fontSize: style.text.comment.style.fontSize,
                }} 
                className="text-center">
                Reviews
            </div>
        </div>
    )
}

export default StoreOverallReviewsCard