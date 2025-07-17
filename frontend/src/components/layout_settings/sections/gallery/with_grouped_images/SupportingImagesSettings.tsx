import React, { useState } from "react";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import { getSetting } from "../../../../../utils/helperFunctions";
import Swal from 'sweetalert2';
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import SlidingPanel from "../../../supporting/SlidingPanel";
import TextEditor from "../../../text/TextEditor";

export interface SupportingSettingsProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const SupportingImagesSettings: React.FC<SupportingSettingsProps> = ({
  settings,
  handleSettingChange,
  objectPath,
}) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  
  const imageGroups = getSetting("", settings, objectPath) || {};

  const handleChange = (groupKey: string, key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleSettingChange(`${objectPath}.${groupKey}.${key}`, e.target.value);
  };

  const handleAddGroup = () => {
    const newGroupKey = `group${Object.keys(imageGroups).length + 1}`;
    const newGroup = {
      input: `Group ${Object.keys(imageGroups).length + 1}`,
      description: "",
      thumbnail: ["https://placehold.co/600x400"],
      images: [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400"
      ],
    };
    handleSettingChange(`${objectPath}.${newGroupKey}`, newGroup);
    setActiveGroup(newGroupKey);
  };

  const handleDeleteClick = (groupKey: string) => async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${imageGroups[groupKey]?.input || groupKey}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      const updatedGroups = { ...imageGroups };
      delete updatedGroups[groupKey];
  
      // Use your existing setting change handler to reflect deletion
      handleSettingChange(objectPath, updatedGroups);
  
      // Optionally clear active group if it was the one deleted
      if (activeGroup === groupKey) {
        setActiveGroup(null);
      }
  
      Swal.fire('Deleted!', 'The group has been deleted.', 'success');
    }
  };
  
  return (
    <div className="space-y-2 px-2">
      {/* Group Selectors */}
      {Object.keys(imageGroups).length === 0 && (
        <div className="text-center text-gray-500 mt-4">No groups available. Click "Add Group" to get started.</div>
      )}
      {Object.keys(imageGroups).map((groupKey) => (
        <FirstOrderSubSettingsContainer
          key={groupKey}
          name={imageGroups[groupKey].input || groupKey}
          onClick={() => setActiveGroup(groupKey)}
          deletable
          onDeleteClick={handleDeleteClick(groupKey)}
        />
      ))}

      {/* Group Settings Panel */}
      {activeGroup && imageGroups[activeGroup] && (
        <SlidingPanel key={activeGroup} isOpen={true} onClose={() => setActiveGroup(null)} title="Group Settings">
            <div className="space-y-1">
            {/* Group Name */}
            <SubSettingsContainer
                name="Group Name"
                SettingsComponent={
                    <div className="px-2">
                    <TextEditor
                        objectPath={`${objectPath}.${activeGroup}`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["input"]}
                    />
                    </div>
                }
            />
            {/* Description */}
            <SubSettingsContainer
                name="Description"
                SettingsComponent={
                <div className="px-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      className="w-full border border-gray-300 p-2 rounded text-sm"
                      value={imageGroups[activeGroup].description}
                      onChange={handleChange(activeGroup, "description")}
                      rows={4}
                    />
                </div>
                }
            />
            {/* Thumbnail */}
            <SubSettingsContainer
                name="Thumbnail"
                SettingsComponent={
                <div className="px-2">
                    <MultipleLayoutImagesHandler
                        objectPath={`${objectPath}.${activeGroup}.thumbnail`}
                        images={imageGroups[activeGroup].thumbnail}
                        min={1}
                        max={1}
                    />
                </div>
                }
            />
            {/* Images */}
            <SubSettingsContainer
                name="Images"
                SettingsComponent={
                <div className="px-2">
                    <MultipleLayoutImagesHandler
                    objectPath={`${objectPath}.${activeGroup}.images`}
                    images={imageGroups[activeGroup].images}
                    min={2}
                    max={25}
                    />
                </div>
                }
            />
            </div>
        </SlidingPanel>
      )}

      {/* Add Group Button */}
      <div className="pt-4 w-full flex flex-row justify-center">
        <button
          onClick={handleAddGroup}
          className="flex flex-row justify-between items-center bg-stone-50 border-2 border-white text-black rounded px-8 py-2 shadow-md hover:scale-103 hover:opacity-85"
        >
          + Add Group
        </button>
      </div>
    </div>
  );
};

export default SupportingImagesSettings;
