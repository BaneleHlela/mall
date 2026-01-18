import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import { useAppSelector } from "../../../../../app/hooks";

const GalleryItem = ({
  img,
  height,
  likedImages,
  toggleLike,
  onClick,
  styles,
  textStyles,
}: any) => {
    const hasText = Boolean(img.title || img.description);
    const { fonts, colors} = useAppSelector((state) => state.layoutSettings);

    console.log(textStyles)
    return (
        <div
        style={{ ...styles, height }}
        className="relative overflow-hidden flex flex-col cursor-pointer hover:opacity-80"
        onClick={() => onClick(img)}
        >
        {/* 🖼 Image */}
        <div className={`relative w-full ${hasText ? "flex-1" : "h-full"}`}>
            <img
            src={img.url}
            className="w-full h-full object-contain"
            />

            {/* ❤️ Like */}
            <div
            className="absolute bottom-2 left-2 text-white z-10"
            onClick={(e) => {
                e.stopPropagation();
                toggleLike(img.url);
            }}
            >
            {likedImages.has(img.url) ? (
                <IoIosHeart className="text-[2.5vh] fill-red-500" />
            ) : (
                <IoIosHeartEmpty className="text-[2.5vh]" />
            )}
            </div>
        </div>

        {/* 📝 Text */}
        {hasText && (
            <div className="w-full text-center p-2 shrink-0">
            {img.title && (
                <p 
                    style={{
                        ...getTextStyles(textStyles.title, fonts, colors),
                    }}
                className="text-sm font-semibold">{img.title}</p>
            )}
            {img.description && (
                <p 
                    style={{
                        ...getTextStyles(textStyles.description, fonts, colors),
                    }}
                    className="text-xs opacity-80 line-clamp-2">
                {img.description}
                </p>
            )}
            </div>
        )}
        </div>
  );
};

export default GalleryItem;
