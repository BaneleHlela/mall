import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchSections, clearSections, type Section, copySectionFromLayout, addSectionFromLayout } from '../../../../features/sections/sectionSlice';
import SectionSelectorButton from './SectionSelectorButton';
import SectionDisplay from './SectionDisplay';
import { IoMdClose } from "react-icons/io";
import { updateSetting, setInitialLayout } from '../../../../features/layouts/layoutSettingsSlice';
import { selectActiveLayout } from '../../../../features/layouts/layoutSlice';

interface SectionSelectorProps {
  sectionToReplace?: string;
  onClose: () => void;
  onSelect?: (sectionName: string) => void;
  addingPage?: boolean; // Optional prop to indicate if we're adding a page instead of a section
}

const SectionSelector: React.FC<SectionSelectorProps> = ({onClose, sectionToReplace, addingPage = false, onSelect}) => {
  const dispatch = useAppDispatch();
  const { sections, loading, error } = useAppSelector((state) => state.sections);
  const activeLayout = useAppSelector(state => state.layoutSettings);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Initial fetch - if sectionToReplace is provided, fetch sections for that variation
  useEffect(() => {
    if (sectionToReplace) {
      setSelectedSection(sectionToReplace);
      dispatch(fetchSections({ variation: sectionToReplace }));
    } else {
      // For "Add New Section", we might want to show all sections or group by variation
      dispatch(fetchSections());
    }
  }, [dispatch, sectionToReplace]);

  // Fetch by selected section name (for the sidebar selection)
  useEffect(() => {
    if (selectedSection && !sectionToReplace) {
      dispatch(clearSections());
      dispatch(fetchSections({ variation: selectedSection }));
    }
  }, [dispatch, selectedSection, sectionToReplace]);

  const validSections = useMemo(() => [
    "hero", "about", "menu", "services", "products",
    "reviews", "gallery", "book", "contact", "events", "footer", "singleProduct", "FAQs"
  ], []);

  const validPages = useMemo(() => [
    "products", "services", "packages", "donations", "about", "contact", "events", "menu"
  ], []);

  const availableSections = useMemo(() => {
    if (sectionToReplace) return validSections;
    if (addingPage) return validPages;
    // Filter out sections already in the layout
    return validSections.filter(section => !(activeLayout.sections as any)?.[section]);
  }, [validSections, sectionToReplace, activeLayout.sections]);

  const handleSelectSection = (variation: string) => {
    setSelectedSection(variation);
    dispatch(clearSections());
    dispatch(fetchSections({ variation }));
  };

  const handleDeleteSection = (id: string) => {
    console.log("Delete section:", id);
    // implement deletion logic
  };

  
  const handleSelectSectionVariation = async (section: Section) => {
    if (addingPage) {
      // When adding a page, just call onSelect with the section variation
      onSelect?.(section.variation);
      onClose();
      return;
    }

    if (!activeLayout?._id) {
      console.error('No active layout found');
      onClose();
      return;
    }

    const sectionType = section.variation;
    
    try {
      // Use the layout ID directly from the section object
      const sourceLayoutId = section.layout;
      
      if (!sourceLayoutId) {
        console.error('No source layout ID found in section');
        onClose();
        return;
      }

      // Copy or add the section configuration from source to target layout
      const thunk = sectionToReplace ? copySectionFromLayout : addSectionFromLayout;


      const result = await dispatch(thunk({
        sourceLayoutId,
        targetLayoutId: activeLayout._id,
        sectionName: sectionType
      }));

      // Check if the dispatch was successful and update layout settings
      if (thunk.fulfilled.match(result)) {
        const { layout } = result.payload;

        // Update the layoutSettings state with the complete updated layout from backend
        dispatch(setInitialLayout(layout));

        // Update the local state to reflect the change
        // if (sectionToReplace) {
        //   dispatch(updateSetting({
        //     field: sectionType,
        //     value: { variation: section.variation }, // Update with the new variation
        //   }));
        // } else {
        //   onSelect?.(sectionType);
        //   dispatch(updateSetting({
        //     field: sectionType,
        //     value: { variation: section.variation },
        //   }));
        // }
      } else {
        // Handle error case
        console.error('Failed to copy/add section configuration:', result.payload);
      }
      
      onClose();
    } catch (error) {
      console.error('Error copying section configuration:', error);
      onClose();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full w-full overflow-clip">
      {/* Header */}
      <div className="relative h-[8%] w-full bg-blue-500 text-center flex flex-col justify-center text-[3vh] text-white">
        {sectionToReplace ? `Replace ${sectionToReplace} Section` : 'Add New Section'}
        <div className="absolute right-3 rounded-full p-[1vh] hover:shadow-md hover:scale-102">
            <IoMdClose className='text-[3vh]' onClick={onClose} />
        </div>
      </div>

      {/* Body Layout */}
      <div className="h-[92%]  w-full flex flex-row justify-center p-2">
        {/* Sidebar Buttons - only show if not replacing a specific section */}
        {!sectionToReplace && (
          <div className="h-full bg-white overflow-y-auto w-[25%] border-b">
            {availableSections.map((section) => (
              <SectionSelectorButton
                key={section}
                sectionName={section}
                onSelect={handleSelectSection}
                isSelected={selectedSection === section}
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

          {sections.length === 0 && !loading && !sectionToReplace && (
            <div className="p-4 text-center text-sm text-gray-700 italic">
              Select a section type from the sidebar to view available variations
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections
              .filter((section: Section) => !addingPage || validPages.includes(section.variation))
              .map((section: Section) => (
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
