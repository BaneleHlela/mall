import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DepartmentSelectorWithImagesProps {
    onSelect: () => void;
    department: {
        short: string;
        full: string;
        description: string;
        thumbnails: string[];
        content: {
            storeSlug: string;
            reelyThumbnail: string;
            profilyThumbnail: string;
        }[];
    };
}

const SLIDE_DURATION = 3000; // 3 seconds per slide

const DepartmentSelectorWithImages: React.FC<DepartmentSelectorWithImagesProps> = ({ onSelect, department }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % department.content.length);
        }, SLIDE_DURATION);

        return () => clearInterval(interval);
    }, [department.content.length]);

    const currentReely = department.content[currentIndex]?.reelyThumbnail;
    const currentProfily = department.content[currentIndex]?.profilyThumbnail;

    return (
        <div
            onClick={onSelect}
            className="h-[20vh] lg:h-[41vh] aspect-3/5 cursor-pointer rounded-[1vh] hover:scale-102 transition-transform duration-300"
        >
            <div className="w-full h-full relative">
                {/* Reely Thumbnail (main image slideshow) */}
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentReely}
                        src={currentReely}
                        alt={`${department.short} Department`}
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 rounded-[1vh]"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Department Label */}
                <p
                    style={{
                        lineHeight: "1",
                        fontFamily: "Bebas Neue",
                    }}
                    className="absolute rounded-b-[1vh] font-extrabold bottom-0 w-full text-white text-center text-[2.5vh] lg:text-[4.6vh] h-[20%] bg-[#0000001f] flex flex-col items-center justify-center"
                >
                    {department.short}
                </p>

                {/* Profily Thumbnail (profile image overlay) */}
                <div className="absolute top-[3%] left-[4%] w-[28%] aspect-square rounded-full bg-white p-[.2vh] shadow-md">
                    <img
                        src={currentProfily}
                        alt={`${department.short} Profile`}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default DepartmentSelectorWithImages;
