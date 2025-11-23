import React, { useState, useEffect } from "react";
import type { Layout } from "../../../../../types/layoutTypes";
import { IoIosArrowRoundForward, IoIosColorPalette, IoIosImages } from "react-icons/io";
import GoogleFontsSelector from "../../../../../components/layout_settings/text/GoogleFontsSelector";
import { extractLayoutColors } from "../../../../../utils/helperFunctions";
import LayoutColorPalette from "./LayoutColorPalette";
import EditableLayoutColorPalette from "./EditableLayoutColorPalette";
import { createLayoutWithSettings, updateLayoutWithSettings } from "../../../../../features/layouts/layoutSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { TbLoader3, TbSection } from "react-icons/tb";
import { colorPalettes } from "../../../../../utils/helperObjects";
import { AiOutlineFontSize } from "react-icons/ai";
import { GrLinkNext } from "react-icons/gr";
import { TiLockClosed } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import type { SectionType } from "../../../../../utils/defaults/sections/getSectionDefaults";
import SectionEditor from "./SectionEditor";
import LayoutSuccessModal from "../../../../../components/layout_settings/supporting/LayoutSuccessModal";

interface CustomizeLayoutProps {
  layout: Layout;
  onBack: () => void;
  edit?: boolean;
}

const CustomizeLayout: React.FC<CustomizeLayoutProps> = ({ layout, onBack, edit = false }) => {
    const dispatch = useAppDispatch();
    const colorMap = extractLayoutColors(layout);
    const storeId = useAppSelector((state) => state.storeAdmin.store?._id)
    const isLoading = useAppSelector((state) => state.layout.isLoading);
    const activeLayout = useAppSelector((state) => state.layout.activeLayout);
    const [step, setStep] = useState<"fonts" | "colors" | "sections">("fonts");
    const [colors, setColors] = useState<string[]>(colorMap);
    const [selectedFonts, setSelectedFonts] = useState({
        primary: layout.fonts?.primary || "",
        secondary: layout.fonts?.secondary || "",
        tertiary: layout.fonts?.tertiary || "",
    });
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [selectedSectionType, setSelectedSectionType] = useState<SectionType | null>(null);
    const [showSectionEditor, setShowSectionEditor] = useState(false);
    const [sectionUpdates, setSectionUpdates] = useState<Record<string, any>>({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Extract sections from layout routes
    const getLayoutSections = () => {
        const sections: Array<{name: string, type: SectionType, hasContent: boolean}> = [];
        
        if (layout.routes) {
            Object.entries(layout.routes).forEach(([routeName, route]) => {
                if (route && route.contains) {
                    route.contains.forEach((sectionType: string) => {
                        const hasContent = layout[sectionType as keyof Layout] !== undefined;
                        sections.push({
                            name: `${routeName} - ${sectionType}`,
                            type: sectionType as SectionType,
                            hasContent
                        });
                    });
                }
            });
        }
        
        return sections;
    };

    const layoutSections = getLayoutSections();

    useEffect(() => {
        if (!edit && activeLayout && activeLayout._id) {
            setShowSuccessModal(true);
        }
    }, [activeLayout, edit]);

    const handleColorChange = (index: number, newColor: string) => {
        const updated = [...colors];
        updated[index] = newColor;
        setColors(updated);
    };

    const handleCreateOrUpdateLayout = () => {
        const oldColors = colorMap;
        const newColors = colors;
        
        if (!layout._id) {
            console.error('Layout ID is required');
            return;
        }

        if (edit) {
            // Update existing layout
            dispatch(updateLayoutWithSettings({
                layoutId: layout._id,
                newColors: colors.length > 0 ? newColors : undefined,
                oldColors: colors.length > 0 ? oldColors : undefined,
                newFonts: selectedFonts,
                sectionUpdates: Object.keys(sectionUpdates).length > 0 ? sectionUpdates : undefined,
                store: storeId || ''
            }));
        } else {
            // Create new layout
            dispatch(createLayoutWithSettings({
                layoutId: layout._id,
                newColors,
                oldColors,
                newFonts: selectedFonts,
                sectionUpdates: Object.keys(sectionUpdates).length > 0 ? sectionUpdates : undefined,
                store: storeId || ''
            }));
        }
    };

    const handleSectionEdit = (sectionName: string, sectionType: SectionType) => {
        setSelectedSection(sectionName);
        setSelectedSectionType(sectionType);
        setShowSectionEditor(true);
    };

    const handleSectionSave = (updatedSection: any) => {
        // Store the section updates to be applied when saving the layout
        setSectionUpdates((prev: Record<string, any>) => ({
            ...prev,
            [selectedSectionType!]: updatedSection
        }));
        
        setShowSectionEditor(false);
        setSelectedSection(null);
        setSelectedSectionType(null);
    };

    const handleSectionEditorClose = () => {
        setShowSectionEditor(false);
        setSelectedSection(null);
        setSelectedSectionType(null);
    };

    

    const handleFontChange = (type: "primary" | "secondary" | "tertiary", font: string) => {
        setSelectedFonts((prev) => ({
        ...prev,
        [type]: font,
        }));
    };

    return (
        <div className="space-y-6">
            {/* <h2 className="text-xl font-semibold">Customize Layout</h2> */}

            {/* Step Navigation */}
            <div className="flex flex-row justify-evenly w-full ">
                <button
                    onClick={() => setStep("fonts")}
                    className={`flex items-center w-1/3 px-4 py-2 space-x-1 ${
                        step === "fonts" ? "bg-black text-white font-semibold " : "bg-gray-200 text-gray-800"
                    }`}
                >
                    <AiOutlineFontSize /> <p className="">Fonts</p> 
                </button>
                <button
                    onClick={() => setStep("colors")}
                    className={`flex items-center w-1/3 px-4 py-2 border-x-1 border-gray-400 space-x-1 ${
                        step === "colors" ? "bg-black text-white font-semibold " : "bg-gray-200 text-gray-800"
                    }`}
                >
                   <IoIosColorPalette /> <p className="">Colors</p>
                </button>
                <button
                    onClick={() => setStep("sections")}
                    className={`flex items-center w-1/3 px-4 py-2  space-x-1 ${
                        step === "sections" ? "bg-black text-white font-semibold " : "bg-gray-200 text-gray-800"
                    }`}
                >
                   <TbSection />  <p className="">Sections</p>
                </button>
            </div>

            {/* Step Content */}
            {step === "fonts" && (
                <div className="space-y-6 px-4">
                    <h3 className="text-lg font-semibold text-center text-shadow-sm">Fonts</h3>

                    {/* Primary Font */}
                    <div className="p-3 pb-4  rounded-[.45vh] bg-gray-50 shadow">
                        <p className="block text-[2vh] font-medium mb-1">Primary Font</p>
                        <div className="flex flex-col items-center justify-between gap-2">
                            <div className="flex justify-evenly items-center gap-1 w-full">
                                <p style={{lineHeight: "1.1"}} className="line-camp-1">{layout.fonts.primary}</p>
                                <GrLinkNext className="text-[1.5vh]"/>
                                <span className="line-camp-1">{selectedFonts.primary || "None selected"}</span>             
                            </div>
                            <div className="w-full">
                                <GoogleFontsSelector
                                    selectedFont={selectedFonts.primary}
                                    onFontSelect={(font) => handleFontChange("primary", font)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Secondary Font */}
                    <div className="p-3 pb-4  rounded-[.45vh] bg-gray-50 shadow">
                        <p className="block text-[2vh] font-medium mb-1">Secondary Font</p>
                        <div className="flex flex-col items-center justify-between gap-2">
                            <div className="flex justify-evenly items-center gap-1 w-full">
                                <p style={{lineHeight: "1.1"}} className="line-camp-1">{layout.fonts.primary}</p>
                                <GrLinkNext className="text-[1.5vh]"/>
                                <span className="line-camp-1">{selectedFonts.primary || "None selected"}</span>             
                            </div>
                            <div className="w-full">
                                <GoogleFontsSelector
                                    selectedFont={selectedFonts.primary}
                                    onFontSelect={(font) => handleFontChange("secondary", font)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tertiary Font */}
                    <div className="p-3 pb-4  rounded-[.45vh] bg-gray-50 shadow">
                        <p className="block text-[2vh] font-medium mb-1">Tertiary Font</p>
                        <div className="flex flex-col items-center justify-between gap-2">
                            <div className="flex justify-evenly items-center gap-1 w-full">
                                <p style={{lineHeight: "1.1"}} className="line-camp-1">{layout.fonts.primary}</p>
                                <GrLinkNext className="text-[1.5vh]"/>
                                <span className="line-camp-1">{selectedFonts.primary || "None selected"}</span>             
                            </div>
                            <div className="w-full">
                                <GoogleFontsSelector
                                    selectedFont={selectedFonts.primary}
                                    onFontSelect={(font) => handleFontChange("tertiary", font)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === "colors" && (
                <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-shadow-sm">Colors</h3>
                    <LayoutColorPalette colors={colorMap} />
                    <p className="text-shadow-2xs">Click and edit a corresponding color to update</p>
                    <EditableLayoutColorPalette
                        colors={colors}
                        onChange={handleColorChange}
                    />
                    <div className="space-y-2 w-full ">
                        <p className="font-medium text-shadow-xs">Select from available palettes:</p>
                        <div className="flex w-full">
                            {Object.entries(colorPalettes).map(([key, palette]) => {
                            const trimmedPalette = palette.slice(0, colorMap.length);
                            return (
                                <div key={key} className="relative w-full p-5 bg-white rounded-[2vh]">
                                    {/* Blurred background */}
                                    <div className="absolute inset-0 w-full blur-[3px]">
                                        <LayoutColorPalette colors={trimmedPalette} onSelect={() => {}} />
                                    </div>

                                    {/* Centered lock icon on top */}
                                    <TiLockClosed className="absolute inset-8 m-auto text-[8vh] text-[#ffffff6e] z-10" />
                                </div>
                            );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {step === "sections" && (
                <div className="space-y-4 px-4">
                    <h3 className="text-lg font-semibold text-center text-shadow-sm">Sections</h3>
                    <p className="text-sm text-gray-600 text-center">
                        Edit the content of sections in your layout
                    </p>
                    
                    {layoutSections.length === 0 ? (
                        <p className="text-center text-gray-500">No sections found in this layout</p>
                    ) : (
                        <div className="space-y-3">
                            {layoutSections.map((section, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800 capitalize">
                                            {section.name.replace('-', ' page: ')}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Type: {section.type}
                                            {section.type === 'gallery' && layout.gallery?.variation === 'galleryWithGroupedImages' &&
                                                ' (Grouped Images)'
                                            }
                                        </p>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleSectionEdit(section.name, section.type)}
                                        className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                        disabled={!section.hasContent}
                                    >
                                        <MdEdit className="text-sm" />
                                        <span className="text-sm">Edit</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Create/Update layout button */}
            <div className="fixed bottom-4 flex justify-center items-center w-full">
                <button onClick={handleCreateOrUpdateLayout} className="p-2 bg-black text-white rounded-[.45vh]">
                    {isLoading ? (
                        <TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            <> {edit ? "Update Layout" : "Create Layout"}</>
                    )}
                </button>
            </div>

            {/* Section Editor Modal */}
            {showSectionEditor && selectedSection && selectedSectionType && (
                <SectionEditor
                    layout={layout}
                    sectionType={selectedSectionType}
                    sectionName={selectedSection}
                    onClose={handleSectionEditorClose}
                    onSave={handleSectionSave}
                />
            )}

            {/* Success Modal */}
            {showSuccessModal && activeLayout && activeLayout._id && (
                <LayoutSuccessModal
                    layoutId={activeLayout._id}
                    onClose={() => setShowSuccessModal(false)}
                />
            )}

        </div>
    );
};

export default CustomizeLayout;
