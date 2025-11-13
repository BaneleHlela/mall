import React, { useState, useEffect } from 'react';
import { MdClose, MdAdd, MdDelete, MdImage, MdTextFields } from 'react-icons/md';
import type { Layout } from '../../../../../types/layoutTypes';
import type { SectionType } from '../../../../../utils/defaults/sections/getSectionDefaults';
import MultipleLayoutImagesHandler from '../../../../../components/layout_settings/supporting/MultipleLayoutImagesHandler';
import SingleLayoutImageHandler from '../../../../../components/layout_settings/supporting/SingleLayoutImageHandler';

interface SectionEditorProps {
  layout: Layout;
  sectionType: SectionType;
  sectionName: string;
  onClose: () => void;
  onSave: (updatedSection: any) => void;
}

interface GalleryGroup {
  input: string;
  description: string;
  thumbnail: string[];
  images: string[];
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  layout,
  sectionType,
  sectionName,
  onClose,
  onSave
}) => {
  const [sectionData, setSectionData] = useState<any>(null);
  const [isGalleryGrouped, setIsGalleryGrouped] = useState(false);

  useEffect(() => {
    // Get the section data from the layout and create a deep copy to avoid read-only issues
    const data = layout[sectionType as keyof Layout];
    if (data) {
      // Create a deep copy to avoid read-only property errors
      setSectionData(JSON.parse(JSON.stringify(data)));
      
      // Check if this is a galleryWithGroupedImages
      if (sectionType === 'gallery' && data?.variation === 'galleryWithGroupedImages') {
        setIsGalleryGrouped(true);
      }
    }
  }, [layout, sectionType]);

  const handleTextChange = (path: string, value: string) => {
    setSectionData((prev: any) => {
      // Create a deep copy to avoid read-only property errors
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleImageChange = (path: string, value: string) => {
    setSectionData((prev: any) => {
      // Create a deep copy to avoid read-only property errors
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleGroupChange = (groupKey: string, field: keyof GalleryGroup, value: any) => {
    setSectionData((prev: any) => {
      // Create a deep copy to avoid read-only property errors
      const newData = JSON.parse(JSON.stringify(prev));
      if (!newData.imagesModal) newData.imagesModal = {};
      if (!newData.imagesModal.images) newData.imagesModal.images = {};
      if (!newData.imagesModal.images[groupKey]) newData.imagesModal.images[groupKey] = {};
      
      newData.imagesModal.images[groupKey][field] = value;
      return newData;
    });
  };

  const addNewGroup = () => {
    const newGroupKey = `group_${Date.now()}`;
    setSectionData((prev: any) => ({
      ...prev,
      imagesModal: {
        ...prev.imagesModal,
        images: {
          ...prev.imagesModal.images,
          [newGroupKey]: {
            input: 'New Group',
            description: 'Group description',
            thumbnail: [''],
            images: ['']
          }
        }
      }
    }));
  };

  const deleteGroup = (groupKey: string) => {
    setSectionData((prev: any) => {
      const newImages = { ...prev.imagesModal.images };
      delete newImages[groupKey];
      return {
        ...prev,
        imagesModal: {
          ...prev.imagesModal,
          images: newImages
        }
      };
    });
  };

  const addImageToGroup = (groupKey: string, type: 'thumbnail' | 'images') => {
    setSectionData((prev: any) => ({
      ...prev,
      imagesModal: {
        ...prev.imagesModal,
        images: {
          ...prev.imagesModal.images,
          [groupKey]: {
            ...prev.imagesModal.images[groupKey],
            [type]: [...prev.imagesModal.images[groupKey][type], '']
          }
        }
      }
    }));
  };

  const removeImageFromGroup = (groupKey: string, type: 'thumbnail' | 'images', index: number) => {
    setSectionData((prev: any) => ({
      ...prev,
      imagesModal: {
        ...prev.imagesModal,
        images: {
          ...prev.imagesModal.images,
          [groupKey]: {
            ...prev.imagesModal.images[groupKey],
            [type]: prev.imagesModal.images[groupKey][type].filter((_: any, i: number) => i !== index)
          }
        }
      }
    }));
  };

  const updateGroupImage = (groupKey: string, type: 'thumbnail' | 'images', index: number, value: string) => {
    setSectionData((prev: any) => {
      const newImages = [...prev.imagesModal.images[groupKey][type]];
      newImages[index] = value;
      return {
        ...prev,
        imagesModal: {
          ...prev.imagesModal,
          images: {
            ...prev.imagesModal.images,
            [groupKey]: {
              ...prev.imagesModal.images[groupKey],
              [type]: newImages
            }
          }
        }
      };
    });
  };

  const renderTextEditor = (label: string, path: string, currentValue: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <MdTextFields className="inline mr-1" />
        {label}
      </label>
      <input
        type="text"
        value={currentValue || ''}
        onChange={(e) => handleTextChange(path, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-[.45vh]-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  const renderSingleImageEditor = (label: string, path: string, currentValue: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <MdImage className="inline mr-1" />
        {label}
      </label>
      <SingleLayoutImageHandler
        label={label}
        image={currentValue}
        onImageSelect={(url) => handleImageChange(path, url)}
        onDelete={() => handleImageChange(path, '')}
      />
    </div>
  );

  const renderMultipleImagesEditor = (label: string, path: string, currentValue: string[]) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <MdImage className="inline mr-1" />
        {label}
      </label>
      <MultipleLayoutImagesHandler
        images={currentValue || []}
        onChange={(newImages) => {
          setSectionData((prev: any) => {
            // Create a deep copy to avoid read-only property errors
            const newData = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let current = newData;
            
            for (let i = 0; i < keys.length - 1; i++) {
              if (!current[keys[i]]) {
                current[keys[i]] = {};
              }
              current = current[keys[i]];
            }
            
            current[keys[keys.length - 1]] = newImages;
            return newData;
          });
        }}
      />
    </div>
  );

  const renderGalleryGroupEditor = () => {
    if (!sectionData?.imagesModal?.images) return null;

    const groups = sectionData.imagesModal.images;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium">Gallery Groups</h4>
          <button
            onClick={addNewGroup}
            className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-[.45vh] hover:bg-green-600"
          >
            <MdAdd />
            <span>Add Group</span>
          </button>
        </div>

        {Object.entries(groups).map(([groupKey, groupData]: [string, any]) => (
          <div key={groupKey} className="border border-gray-200 rounded-[.45vh] p-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium">Group: {groupData.input}</h5>
              <button
                onClick={() => deleteGroup(groupKey)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete />
              </button>
            </div>

            {/* Group Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
              <input
                type="text"
                value={groupData.input || ''}
                onChange={(e) => handleGroupChange(groupKey, 'input', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-[.45vh]-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Group Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={groupData.description || ''}
                onChange={(e) => handleGroupChange(groupKey, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-[.45vh]-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Images</label>
              <MultipleLayoutImagesHandler
                images={groupData.thumbnail || []}
                onChange={(newImages) => handleGroupChange(groupKey, 'thumbnail', newImages)}
              />
            </div>

            {/* Full Images */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Images</label>
              <MultipleLayoutImagesHandler
                images={groupData.images || []}
                onChange={(newImages) => handleGroupChange(groupKey, 'images', newImages)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGenericEditor = () => {
    if (!sectionData) return null;

    // Extract common text, single image, and image array fields
    const textFields: Array<{label: string, path: string, value: string}> = [];
    const singleImageFields: Array<{label: string, path: string, value: string}> = [];
    const imageArrayFields: Array<{label: string, path: string, value: string[]}> = [];

    const extractFields = (obj: any, prefix = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'string') {
          if (key.toLowerCase().includes('text') || key.toLowerCase().includes('input') ||
              key.toLowerCase().includes('title') || key.toLowerCase().includes('description') ||
              key.toLowerCase().includes('heading') || key.toLowerCase().includes('subheading') ||
              key.toLowerCase().includes('label') || key.toLowerCase().includes('content')) {
            textFields.push({label: key, path, value});
          } else if (key.toLowerCase().includes('image') || key.toLowerCase().includes('url') ||
                    key.toLowerCase().includes('src') || key.toLowerCase().includes('background')) {
            singleImageFields.push({label: key, path, value});
          }
        } else if (Array.isArray(value)) {
          // Check if it's an array of strings that could be image URLs
          if (value.length > 0 && typeof value[0] === 'string') {
            if (key.toLowerCase().includes('image') || key.toLowerCase().includes('url') ||
                key.toLowerCase().includes('src') || key.toLowerCase().includes('thumbnail') ||
                path.toLowerCase().includes('image') || path.toLowerCase().includes('gallery')) {
              imageArrayFields.push({label: key, path, value});
            }
          }
        } else if (typeof value === 'object' && value !== null) {
          // Special handling for nested image structures
          if (key === 'images' && 'url' in value && Array.isArray((value as any).url)) {
            imageArrayFields.push({label: `${key} URLs`, path: `${path}.url`, value: (value as any).url});
          } else if (key === 'imageUrl' && Array.isArray(value)) {
            imageArrayFields.push({label: key, path, value});
          } else {
            extractFields(value, path);
          }
        }
      });
    };

    extractFields(sectionData);

    return (
      <div className="space-y-6">
        {textFields.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">Text Content</h4>
            {textFields.map((field, index) =>
              renderTextEditor(field.label, field.path, field.value)
            )}
          </div>
        )}

        {singleImageFields.length > 0 && singleImageFields.length <= 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">Single Images</h4>
            {singleImageFields.map((field, index) =>
              renderSingleImageEditor(field.label, field.path, field.value)
            )}
          </div>
        )}

        {imageArrayFields.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-4">Image Collections</h4>
            {imageArrayFields.map((field, index) =>
              renderMultipleImagesEditor(field.label, field.path, field.value)
            )}
          </div>
        )}
      </div>
    );
  };

  if (!sectionData) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="bg-white p-6 max-w-md w-full">
          <p>Loading section data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#00000023]  flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-500 text-white p-6 border-b border-gray-200 shadow-xs">
          <h3 className="text-[2.7vh] font-semibold capitalize">
            Edit {sectionName.replace('-', 'page :')}
          </h3>
          <button
            onClick={onClose}
            className=" hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 ">
          {isGalleryGrouped ? renderGalleryGroupEditor() : renderGenericEditor()}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-3 border-t">
          <button
            onClick={onClose}
            className="px-2 py-1 border rounded-[.45vh]-[.45vh] hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(sectionData)}
            className="px-2 py-1 bg-black text-white rounded-[.45vh]-[.45vh] hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;