import React, { useState } from "react";
import type { Layout } from "../../../../../types/layoutTypes";
import { IoIosArrowRoundForward, IoIosColorPalette, IoIosImages } from "react-icons/io";
import GoogleFontsSelector from "../../../../../components/layout_settings/text/GoogleFontsSelector";
import { extractLayoutColors } from "../../../../../utils/helperFunctions";
import LayoutColorPalette from "./LayoutColorPalette";
import EditableLayoutColorPalette from "./EditableLayoutColorPalette";
import { createLayoutWithSettings } from "../../../../../features/layouts/layoutSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { TbLoader3 } from "react-icons/tb";
import { colorPalettes } from "../../../../../utils/helperObjects";
import { AiOutlineFontSize } from "react-icons/ai";
import { GrLinkNext } from "react-icons/gr";
import { TiLockClosed } from "react-icons/ti";

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
    const [step, setStep] = useState<"fonts" | "colors">("fonts");
    const [colors, setColors] = useState<string[]>(colorMap);    
    const [selectedFonts, setSelectedFonts] = useState({
        primary: layout.fonts?.primary || "",
        secondary: layout.fonts?.secondary || "",
        tertiary: layout.fonts?.tertiary || "",
    });

    const handleColorChange = (index: number, newColor: string) => {
        const updated = [...colors];
        updated[index] = newColor;
        setColors(updated);
    };

    const handleCreateLayout = () => {
        const oldColors = colorMap; 
        const newColors = colors;
        
    
        dispatch(createLayoutWithSettings({
            layoutId: layout._id,
            newColors,
            oldColors,
            newFonts: selectedFonts,
            storeId
        }));
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
                    onClick={() => setStep("colors")}
                    className={`flex items-center w-1/3 px-4 py-2  space-x-1 ${
                        step === "colors" ? "bg-black text-white font-semibold " : "bg-gray-200 text-gray-800"
                    }`}
                >
                   <IoIosImages />  <p className="">Images</p>
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
            {/* Create layout button */}
            <div className="fixed bottom-4 flex justify-center items-center w-full">
                <button onClick={handleCreateLayout} className="p-2 bg-black text-white rounded-[.45vh]">
                    {isLoading ? (
                        <TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            <> {edit ? "Edit Layout" : "Create Layout"}</>
                    )}
                </button>
            </div>
            
        </div>
    );
};

export default CustomizeLayout;
