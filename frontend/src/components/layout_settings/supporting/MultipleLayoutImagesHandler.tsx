import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import SingleLayoutImageHandler from "./SingleLayoutImageHandler";
import StoreImages from "../../../pages/store_dashboard/supporting_pages/StoreImages";

interface Props {
    images: string[];
    max?: number;
    min?: number;
    onChange?: (images: string[]) => void; // ✅ Optional
    objectPath?: string; // ✅ Needed for Redux fallback
}

const MultipleLayoutImagesHandler: React.FC<Props> = ({
    images,
    max = Infinity,
    min = 0,
    onChange,
    objectPath,
}) => {
    const dispatch = useAppDispatch();
    const [showStoreImages, setShowStoreImages] = useState(false);

    const updateImages = (newImages: string[]) => {
        if (onChange) {
            onChange(newImages);
        } else if (objectPath) {
            dispatch(updateSetting({ field: objectPath, value: newImages }));
        } else {
            console.warn("No onChange or objectPath provided for MultipleLayoutImagesHandler.");
        }
    };

    const handleImageSelect = (index: number, imageUrl: string) => {
        const newImages = [...images];
        newImages[index] = imageUrl;
        updateImages(newImages);
    };

    const handleImageDelete = (index: number) => {
        if (images.length <= min) return;
        const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
        updateImages(newImages);
    };

    const handleAddImage = (imageUrl: string) => {
        if (images.length >= max) return;
        const newImages = [...images, imageUrl];
        updateImages(newImages);
        setShowStoreImages(false);
    };

    return (
        <div className="space-y-[.3vh] p-[.6vh] text-[2vh]">
            {images.map((image, index) => (
                <SingleLayoutImageHandler
                    key={index}
                    label={`Image ${index + 1}`}
                    image={image}
                    onImageSelect={(url) => handleImageSelect(index, url)}
                    onDelete={() => handleImageDelete(index)}
                />
            ))}

            {images.length < max && (
                <div className="w-full flex flex-row justify-center items-center">
                    <button
                        onClick={() => setShowStoreImages(true)}
                        className="w-fit mt-4 py-2 px-4 bg-gray-900 text-white rounded-[50px] hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                    >
                        <FiPlus className="mr-2" /> Add Another Image
                    </button>
                </div>
            )}

            {showStoreImages && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-[80vw] h-[80vh] rounded-lg relative z-5">
                        <button
                            className="absolute top-2 right-2 text-black shadow-md p-1 rounded-full hover:scale-102"
                            onClick={() => setShowStoreImages(false)}
                        >
                            <IoMdClose size={28} />
                        </button>
                        <StoreImages onImageSelect={handleAddImage} />
                    </div>
                    <div className="absolute top-0 opacity-30 h-screen w-screen bg-black"></div>
                </div>
            )}
        </div>
    );
};

export default MultipleLayoutImagesHandler;
