import React, { useState } from "react";
import Swal from "sweetalert2";
import { getSetting } from "../../../../../../utils/helperFunctions";
import FirstOrderSubSettingsContainer from "../../../../FirstOrderSubSettingsContainer";
import SubSettingsContainer from "../../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../../supporting/MultipleLayoutImagesHandler";
import SlidingPanel from "../../../../supporting/SlidingPanel";
import TextEditor from "../../../../text/TextEditor";

interface HorizontalGalleryImagesHandlerProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const HorizontalGalleryImagesHandler: React.FC<HorizontalGalleryImagesHandlerProps> = ({
  settings,
  handleSettingChange,
  objectPath,
}) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const imageGroups = getSetting("", settings, objectPath) || {};

  const handleAddImage = () => {
    const newKey = `image${Object.keys(imageGroups).length + 1}`;
    const newImage = {
      url: ["https://placehold.co/600x400"],
      title: "",
      description: "",
    };
    handleSettingChange(`${objectPath}.${newKey}`, newImage);
    setActiveKey(newKey);
  };

  const handleDeleteImage = (imageKey: string) => async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${imageKey}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const updated = { ...imageGroups };
      delete updated[imageKey];
      handleSettingChange(objectPath, updated);
      if (activeKey === imageKey) setActiveKey(null);
      Swal.fire("Deleted!", "The image has been deleted.", "success");
    }
  };

  const handleChange = (imageKey: string, key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleSettingChange(`${objectPath}.${imageKey}.${key}`, e.target.value);
  };


  return (
    <div className="space-y-[.3vh] px-[.6vh]">
        {Object.keys(imageGroups).length === 0 && (
            <div className="text-center text-gray-500 mt-4">No images yet. Click "Add Image" to get started.</div>
        )}

        {Object.keys(imageGroups).map((imageKey) => {
        const image = imageGroups[imageKey];
        const displayName = image?.title?.trim() ? image.title : imageKey;

        return (
            <FirstOrderSubSettingsContainer
                key={imageKey}
                name={displayName}
                onClick={() => setActiveKey(imageKey)}
                deletable
                onDeleteClick={handleDeleteImage(imageKey)}
            />
        );
        })}

      {activeKey && imageGroups[activeKey] && (
        <SlidingPanel key={activeKey} isOpen={true} onClose={() => setActiveKey(null)} title="Image Settings">
          <div className="space-y-[.3vh] px-[.6vh]">
            {/* Title */}
            <SubSettingsContainer
              name="Title"
              SettingsComponent={
                <div className="p-[.6vh]">
                  <input
                    type="text"
                    className="w-full border-[.15vh] border-gray-300 p-2 rounded text-[1.8vh]"
                    value={imageGroups[activeKey].title}
                    onChange={handleChange(activeKey, "title")}
                  />
                </div>
              }
            />
            {/* Description */}
            <SubSettingsContainer
              name="Description"
              SettingsComponent={
                <div className="p-[.6vh]">
                  <textarea
                    className="w-full border border-gray-300 p-2 rounded text-[1.8vh]"
                    value={imageGroups[activeKey].description}
                    onChange={handleChange(activeKey, "description")}
                    rows={4}
                  />
                </div>
              }
            />
            {/* Image URL(s) */}
            <SubSettingsContainer
              name="Image"
              SettingsComponent={
                <MultipleLayoutImagesHandler
                  objectPath={`${objectPath}.${activeKey}.url`}
                  images={imageGroups[activeKey].url}
                  min={1}
                  max={1}
                />
              }
            />
          </div>
        </SlidingPanel>
      )}

      <div className="pt-[1.2vh] w-full flex flex-row justify-center">
        <button
          onClick={handleAddImage}
          className="flex flex-row justify-between items-center bg-stone-50 border-2 border-white text-black rounded px-[3.5vh] py-[.9vh] shadow-md hover:text-white hover:bg-gray-800"
        >
          + Add Image
        </button>
      </div>
    </div>
  );
};

export default HorizontalGalleryImagesHandler;
