import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import SingleLayoutImageHandler from "./SingleLayoutImageHandler";
import StoreImages from "../../../pages/store_dashboard/supporting_pages/StoreImages";

interface Props {
    images: string[];
    objectPath: string; // example: "hero.images"
    max?: number;
    min?: number;
}

const MultipleLayoutImagesHandler: React.FC<Props> = ({
    images,
    objectPath,
    max = Infinity,
    min = 0,
}) => {
    const dispatch = useAppDispatch();
    const [showStoreImages, setShowStoreImages] = useState(false);

    const handleImageSelect = (index: number, imageUrl: string) => {
        dispatch(updateSetting({ field: `${objectPath}.${index}`, value: imageUrl }));
    };

    const handleImageDelete = (index: number) => {
        if (images.length <= min) return;

        const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
        dispatch(updateSetting({ field: objectPath, value: newImages }));
    };

    const handleAddImage = (imageUrl: string) => {
        if (images.length >= max) return;

        const newImages = [...images, imageUrl];
        dispatch(updateSetting({ field: objectPath, value: newImages }));
        setShowStoreImages(false);
    };

    return (
        <div className="space-y-1 p-2">
            {images.map((image, index) => (
                <SingleLayoutImageHandler
                    key={index}
                    label={`Image ${index + 1}`}
                    image={image}
                    onImageSelect={(url) => handleImageSelect(index, url)}
                    onDelete={() => {
                        if (images.length > min) {
                            handleImageDelete(index);
                        }
                    }}
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
