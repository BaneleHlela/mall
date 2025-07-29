import React, { useState } from "react";
import type { Layout } from "../../../../../types/layoutTypes";
import { IoIosArrowRoundForward } from "react-icons/io";
import GoogleFontsSelector from "../../../../../components/layout_settings/text/GoogleFontsSelector";
import { extractLayoutColors } from "../../../../../utils/helperFunctions";
import LayoutColorPalette from "./LayoutColorPalette";
import EditableLayoutColorPalette from "./EditableLayoutColorPalette";
import { createLayoutWithSettings } from "../../../../../features/layouts/layoutSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { TbLoader3 } from "react-icons/tb";
import { colorPalettes } from "../../../../../utils/helperObjects";

interface CustomizeLayoutProps {
  layout: Layout;
  onBack: () => void;
}

const CustomizeLayout: React.FC<CustomizeLayoutProps> = ({ layout, onBack }) => {
    const dispatch = useAppDispatch();
    const colorMap = extractLayoutColors(layout);
    console.log("Color Map:", colorMap); // Debugging line to check the extracted colors
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
        const oldColors = colorMap; // Extract original colors
        const newColors = colors; // Use the updated colors from state
    
        dispatch(createLayoutWithSettings({
            layoutId: layout._id,
            newColors,
            oldColors,
            newFonts: selectedFonts
        }));
    };

    

    const handleFontChange = (type: "primary" | "secondary" | "tertiary", font: string) => {
        setSelectedFonts((prev) => ({
        ...prev,
        [type]: font,
        }));
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-semibold">Customize Layout</h2>

            {/* Step Navigation */}
            <div className="flex gap-4">
                <button
                onClick={() => setStep("fonts")}
                className={`px-4 py-2 rounded ${
                    step === "fonts" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
                >
                Fonts
                </button>
                <button
                onClick={() => setStep("colors")}
                className={`px-4 py-2 rounded ${
                    step === "colors" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
                >
                Colors
                </button>
            </div>

            {/* Step Content */}
            {step === "fonts" && (
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-center">Fonts</h3>

                    {/* Primary Font */}
                    <div className="p-3 border rounded bg-gray-50">
                        <label className="block text-sm font-medium mb-1">Primary Font</label>
                        <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 w-1/2 truncate">
                            <span>{selectedFonts.primary || "None selected"}</span>
                            <IoIosArrowRoundForward />
                        </div>
                        <GoogleFontsSelector
                            selectedFont={selectedFonts.primary}
                            onFontSelect={(font) => handleFontChange("primary", font)}
                        />
                        </div>
                    </div>

                    {/* Secondary Font */}
                    <div className="p-3 border rounded bg-gray-50">
                        <label className="block text-sm font-medium mb-1">Secondary Font</label>
                        <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 w-1/2 truncate">
                            <span>{selectedFonts.secondary || "None selected"}</span>
                            <IoIosArrowRoundForward />
                        </div>
                        <GoogleFontsSelector
                            selectedFont={selectedFonts.secondary}
                            onFontSelect={(font) => handleFontChange("secondary", font)}
                        />
                        </div>
                    </div>

                    {/* Tertiary Font */}
                    <div className="p-3 border rounded bg-gray-50">
                        <label className="block text-sm font-medium mb-1">Tertiary Font</label>
                        <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 w-1/2 truncate">
                            <span>{selectedFonts.tertiary || "None selected"}</span>
                            <IoIosArrowRoundForward />
                        </div>
                        <GoogleFontsSelector
                            selectedFont={selectedFonts.tertiary}
                            onFontSelect={(font) => handleFontChange("tertiary", font)}
                        />
                        </div>
                    </div>
                </div>
            )}

            {step === "colors" && (
                <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Colors</h3>
                    <LayoutColorPalette colors={colorMap} />
                    <p className="">Click and edit a corresponding color to update</p>
                    <EditableLayoutColorPalette
                        colors={colors}
                        onChange={handleColorChange}
                    />
                    <div className="space-y-2 w-full">
                        <p className="font-medium">Select from available palettes:</p>
                        <div className="flex w-full">
                            {Object.entries(colorPalettes).map(([key, palette]) => {
                            const trimmedPalette = palette.slice(0, colorMap.length);
                            return (
                                <div key={key} className="w-full">
                                    <LayoutColorPalette colors={trimmedPalette} onSelect={() => setColors(trimmedPalette)}/>
                                </div>
                            );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {/* Create layout button */}
            <button onClick={handleCreateLayout} className="p-4 bg-black text-white">
                {isLoading ? (
                    <TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
                    ) : (
                    "Create Layout"
                )}
            </button>
        </div>
    );
};

export default CustomizeLayout;
