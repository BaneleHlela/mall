import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DepartmentSelectorWithImagesProps {
    onSelect: () => void;
    department: {
        short: string;
        full: string;
        thumbnails: string[];
        description: string;
    };
}

const SLIDE_DURATION = 3000; // 3 seconds per slide

const DepartmentSelectorWithImages: React.FC<DepartmentSelectorWithImagesProps> = ({ onSelect, department }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % department.thumbnails.length);
        }, SLIDE_DURATION);

        return () => clearInterval(interval);
    }, [department.thumbnails.length]);

    return (
        <div onClick={onSelect} className="h-[25vh] lg:h-[41vh] aspect-3/4 bg-black cursor-pointer hover:scale-102">
            <div className="w-full h-full relative">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={department.thumbnails[currentIndex]}
                        src={department.thumbnails[currentIndex]}
                        alt="Department Image"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </AnimatePresence>
                <p
                    style={{
                        lineHeight: "1",
                        fontFamily: "Bebas Neue",
                        
                    }}
                    className="absolute font-extrabold bottom-0 w-full text-white text-center text-[4vh] lg:text-[4.6vh] h-[20%] bg-[#0000001f] flex flex-col items-center justify-center"
                >
                    {department.short}
                    {/* <p style={{textShadow: "none"}} className="text-sm font-normal font-[Roboto]">{department.description}</p> */}
                </p>
                
            </div>
        </div>
    );
};

export default DepartmentSelectorWithImages;
