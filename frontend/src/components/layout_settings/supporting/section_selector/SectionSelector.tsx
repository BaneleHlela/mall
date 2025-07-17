import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchSections, clearSections, type Section } from '../../../../features/sections/sectionSlice';
import SectionSelectorButton from './SectionSelectorButton';
import SectionDisplay from './SectionDisplay';
import { IoMdClose } from "react-icons/io";
import { getSectionDefaults, type SectionType } from '../../../../utils/defaults/sections/getSectionDefaults';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

interface SectionSelectorProps {
  sectionToReplace?: SectionType;
  onClose: () => void;
  onSelect?: (sectionName: string) => void; // <-- NEW
}

const SectionSelector: React.FC<SectionSelectorProps> = ({onClose, sectionToReplace, onSelect}) => {
  const dispatch = useAppDispatch();
  const { sections, loading, error } = useAppSelector((state) => state.sections);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Initial fetch (e.g. default data)
  useEffect(() => {
    if (!sections.length && !selectedSection) {
      dispatch(fetchSections());
    }
  }, [dispatch, sections.length, selectedSection]);

  // Fetch by selected section name
  useEffect(() => {
    if (selectedSection) {
      dispatch(clearSections());
      dispatch(fetchSections({ name: selectedSection }));
    }
  }, [dispatch, selectedSection]);
  
  useEffect(() => {
    if (sectionToReplace) {
      setSelectedSection(sectionToReplace);
    } else {
      setSelectedSection(null); // reset on "Add New Section"
    }
  }, [sectionToReplace]);

  const validSections = useMemo(() => [
    "hero", "about", "menu", "services", "products",
    "reviews", "gallery", "book", "contact", "events", "footer",
  ], []);

  const handleSelectSection = (variation: string) => {
    setSelectedSection(variation);
    console.log(`Selected Section: ${variation} `, );
  };

  const handleDeleteSection = (id: string) => {
    console.log("Delete section:", id);
    // implement deletion logic
  };

  const extractSectionFromVariation = (variation: string): SectionType => {
    const match = variation.match(/^[a-z]+/);
    return (match?.[0] || 'hero') as SectionType; // fallback to "hero" if nothing matches
  };
  
 
  const handleSelectSectionVariation = async (variation: string) => {
    const section = sectionToReplace ?? extractSectionFromVariation(variation);
  
    // Await the outer function
    let sectionDefaults = await getSectionDefaults(section, variation);
  
    // If the result is a function (like an async () => ...), call it and await the result
    if (typeof sectionDefaults === 'function') {
      sectionDefaults = await sectionDefaults();
    }
  
    if (sectionToReplace) {
      dispatch(updateSetting({
        field: section,
        value: sectionDefaults,
      }));
    } else {
      onSelect?.(section);
      dispatch(updateSetting({
        field: section,
        value: sectionDefaults,
      }));
    }
  
    onClose();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full w-full overflow-clip">
      {/* Header */}
      <div className="relative h-[8%] w-full bg-blue-500 text-center flex flex-col justify-center text-[3vh] text-white">
        Replace or Add New Section
        <div className="absolute right-3 rounded-full p-[1vh] hover:shadow-md hover:scale-102">
            <IoMdClose className='text-[3vh]' onClick={onClose} />
        </div>
      </div>

      {/* Body Layout */}
      <div className="h-[92%]  w-full flex flex-row justify-center p-2">
        {/* Sidebar Buttons */}
        {!sectionToReplace && (
          <div className="h-full bg-white overflow-y-auto w-[25%] border-b">
            {validSections.map((section) => (
              <SectionSelectorButton
                key={section}
                sectionName={section}
                onSelect={handleSelectSection}
              />
            ))}
          </div>
        )}
        {/* Section Grid */}
        <div className="h-full bg-stone-50 overflow-y-auto w-[75%] p-2">
          {selectedSection && sections.length === 0 && !loading && (
            <div className="p-4 text-center text-sm text-gray-700 italic">
              No variations available for "{selectedSection}"
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section: Section) => (
              <SectionDisplay
                key={section._id}
                section={section}
                onDelete={handleDeleteSection}
                onVariationSelect={handleSelectSectionVariation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSelector;
