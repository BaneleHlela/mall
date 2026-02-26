import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FaFont, FaPalette, FaCheck, FaChevronDown, FaChevronUp, FaTag, FaSearch, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TbLoader3 } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAllFontPairings, getAllColorPalettes, type FontPairing, type ColorPalette } from "../../../utils/themeRecommendations";
import GoogleFontsSelector from "../text/GoogleFontsSelector";

interface ThemeSelectorProps {
  layout: any;
  onThemeSelect: (fonts: { primary: string; secondary: string; tertiary: string }, colors: string[], themeName: string) => void;
  isLoading?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ layout, onThemeSelect, isLoading = false }) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  
  // Get store trades/departments
  const storeTrades = store?.trades || [];
  
  // Get recommendations based on department
  const fontPairings = getAllFontPairings(storeTrades);
  const colorPalettes = getAllColorPalettes(storeTrades);
  
  // Get existing layout colors
  const layoutColors = layout.colors || { primary: "#000000", secondary: "#333333", accent: "#666666", quad: "#999999", pent: "#cccccc" };
  const existingColors = [layoutColors.primary, layoutColors.secondary, layoutColors.accent, layoutColors.quad, layoutColors.pent];
  const existingFonts = layout.fonts || { primary: "", secondary: "", tertiary: "" };
  
  // Steps state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  
  // State
  const [selectedFontPairing, setSelectedFontPairing] = useState<FontPairing | null>(null);
  const [selectedColorPalette, setSelectedColorPalette] = useState<ColorPalette | null>(null);
  const [themeName, setThemeName] = useState("");
  const [customColors, setCustomColors] = useState<string[]>(existingColors.length > 0 ? existingColors : colorPalettes[0]?.colors || []);
  const [customFonts, setCustomFonts] = useState({
    primary: existingFonts.primary || fontPairings[0]?.primary || "",
    secondary: existingFonts.secondary || fontPairings[0]?.secondary || "",
    tertiary: existingFonts.tertiary || fontPairings[0]?.tertiary || "",
  });
  
  // Auto-select first recommendations
  useEffect(() => {
    if (fontPairings.length > 0 && !selectedFontPairing) {
      setSelectedFontPairing(fontPairings[0]);
      setCustomFonts({
        primary: fontPairings[0].primary,
        secondary: fontPairings[0].secondary,
        tertiary: fontPairings[0].tertiary,
      });
    }
    if (colorPalettes.length > 0 && !selectedColorPalette) {
      setSelectedColorPalette(colorPalettes[0]);
      setCustomColors(colorPalettes[0].colors);
    }
  }, [fontPairings, colorPalettes]);
  
  // Load Google Font
  const loadFont = (fontFamily: string) => {
    if (!fontFamily) return;
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}&display=swap`;
    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };
  
  // Handle font pairing selection
  const handleFontPairingSelect = (pairing: FontPairing) => {
    setSelectedFontPairing(pairing);
    setCustomFonts({
      primary: pairing.primary,
      secondary: pairing.secondary,
      tertiary: pairing.tertiary,
    });
    // Load fonts
    loadFont(pairing.primary);
    loadFont(pairing.secondary);
    loadFont(pairing.tertiary);
  };
  
  // Handle color palette selection
  const handleColorPaletteSelect = (palette: ColorPalette) => {
    setSelectedColorPalette(palette);
    setCustomColors(palette.colors);
  };
  
  // Handle custom color change
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
  };
  
  // Handle theme name change
  const handleThemeNameChange = (name: string) => {
    setThemeName(name);
  };
  
  // Handle continue to editor
  const handleContinue = () => {
    onThemeSelect(customFonts, customColors, themeName || `${store?.name || "My"}-Theme`);
  };
  
  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as 1 | 2 | 3);
    }
  };
  
  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3);
    }
  };
  
  // Render step indicator
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        {/* Step 1: Fonts */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
          <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
            {currentStep > 1 ? <FaCheck className="w-3 h-3" /> : '1'}
          </span>
          <span className="text-sm font-medium">Fonts</span>
        </div>
        
        {/* Connector */}
        <div className={`w-12 h-0.5 ${currentStep > 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
        
        {/* Step 2: Colors */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
          <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
            {currentStep > 2 ? <FaCheck className="w-3 h-3" /> : '2'}
          </span>
          <span className="text-sm font-medium">Colors</span>
        </div>
        
        {/* Connector */}
        <div className={`w-12 h-0.5 ${currentStep > 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
        
        {/* Step 3: Name */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
          <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
            3
          </span>
          <span className="text-sm font-medium">Name</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Design Your Theme</h2>
        <p className="text-slate-500">
          {currentStep === 1 && "Choose your font pairing"}
          {currentStep === 2 && "Select your color palette"}
          {currentStep === 3 && "Name your theme"}
        </p>
        {storeTrades.length > 0 && (
          <p className="text-[1.8vh] text-indigo-600 mt-1">
            Recommendations for: {storeTrades.join(", ")}
          </p>
        )}
      </div>
      
      {/* Step Indicator */}
      {renderStepIndicator()}
      
      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <FaFont className="text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-800 text-lg">Font Pairings</h3>
            </div>
            
            <div className="space-y-6">
              {/* Manual Font Selection */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[1.8vh] font-medium text-slate-600 mb-3 flex items-center gap-2">
                  <FaSearch className="text-slate-400" />
                  Search for custom Google fonts
                </p>
                
                <div className="space-y-[.35vh]">
                  {/* Primary Font */}
                  <div className="p-[1.5vh] rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[1.8vh] font-medium text-slate-700 mb-2">Primary Font</p>
                    <GoogleFontsSelector
                      selectedFont={customFonts.primary}
                      onFontSelect={(font) => {
                        setCustomFonts(prev => ({ ...prev, primary: font }));
                        setSelectedFontPairing(null);
                      }}
                      fullWidth
                    />
                  </div>

                  {/* Secondary Font */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[1.8vh] font-medium text-slate-700 mb-2">Secondary Font</p>
                    <GoogleFontsSelector
                      selectedFont={customFonts.secondary}
                      onFontSelect={(font) => {
                        setCustomFonts(prev => ({ ...prev, secondary: font }));
                        setSelectedFontPairing(null);
                      }}
                      fullWidth
                    />
                  </div>

                  {/* Tertiary Font */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[1.8vh] font-medium text-slate-700 mb-2">Tertiary Font</p>
                    <GoogleFontsSelector
                      selectedFont={customFonts.tertiary}
                      onFontSelect={(font) => {
                        setCustomFonts(prev => ({ ...prev, tertiary: font }));
                        setSelectedFontPairing(null);
                      }}
                      fullWidth
                    />
                  </div>
                </div>
              </div>

              {/* Pre-made Font Pairings */}
              <div>
                <p className="text-[1.8vh] font-medium text-slate-600 mb-3">Recommended Pairings</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fontPairings.map((pairing, index) => (
                    <button
                      key={index}
                      onClick={() => handleFontPairingSelect(pairing)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedFontPairing?.name === pairing.name
                          ? "border-indigo-500 bg-indigo-50 shadow-md"
                          : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                      }`}
                    >
                      {selectedFontPairing?.name === pairing.name && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                        Option {index + 1}: {pairing.name}
                      </p>
                      <div className="space-y-2">
                        <p 
                          className="text-lg font-semibold text-slate-800"
                          style={{ fontFamily: pairing.primary }}
                        >
                          {pairing.primary}
                        </p>
                        <p 
                          className="text-[1.8vh] text-slate-600"
                          style={{ fontFamily: pairing.secondary }}
                        >
                          {pairing.secondary}
                        </p>
                        <p 
                          className="text-xs text-slate-500"
                          style={{ fontFamily: pairing.tertiary }}
                        >
                          {pairing.tertiary}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-end mt-8">
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Next: Colors
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
        
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <FaPalette className="text-rose-600" />
              </div>
              <h3 className="font-semibold text-slate-800 text-lg">Color Palettes</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {colorPalettes.map((palette, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorPaletteSelect(palette)}
                    className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedColorPalette?.name === palette.name
                        ? "border-rose-500 bg-rose-50 shadow-md"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                    }`}
                  >
                    {selectedColorPalette?.name === palette.name && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                        <FaCheck className="text-white text-xs" />
                      </div>
                    )}
                    <div className="flex gap-1 mb-2">
                      {palette.colors.slice(0, 5).map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-slate-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="font-medium text-slate-800 text-[1.8vh]">{palette.name}</p>
                    {palette.description && (
                      <p className="text-xs text-slate-500 mt-1">{palette.description}</p>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Custom Colors */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[1.8vh] font-medium text-slate-600 mb-3">Customize colors:</p>
                <div className="flex flex-wrap gap-3">
                  {customColors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-slate-200 hover:border-slate-300 transition-colors"
                      />
                      <span className="text-xs text-slate-400">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Next: Name
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
        
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Theme Name */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <FaTag className="text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-800 text-lg">Theme Name</h3>
              </div>
              
              <input
                type="text"
                value={themeName}
                onChange={(e) => handleThemeNameChange(e.target.value)}
                placeholder="Enter theme name (e.g., Summer Collection, Modern Elegance)"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700"
              />
              <p className="text-xs text-slate-400 mt-2">
                A descriptive name helps you identify this theme later
              </p>
            </div>
            
            {/* Preview Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Theme Preview</h3>
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  backgroundColor: customColors[4] || '#f9fafb',
                  fontFamily: customFonts.primary
                }}
              >
                <h4 
                  className="text-xl font-bold"
                  style={{ color: customColors[0], fontFamily: customFonts.primary }}
                >
                  {themeName || "Your Theme"}
                </h4>
                <p 
                  className="mt-2"
                  style={{ color: customColors[1], fontFamily: customFonts.secondary }}
                >
                  This is how your heading text will look with the primary font.
                </p>
                <p 
                  className="text-[1.8vh] mt-2"
                  style={{ color: customColors[2], fontFamily: customFonts.tertiary }}
                >
                  Secondary text uses the tertiary font for body content.
                </p>
                <div className="flex gap-2 mt-3">
                  {customColors.slice(0, 5).map((color, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: color }}
                    >
                      Color {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <TbLoader3 className="w-5 h-5 animate-spin" />
                    Creating Layout...
                  </>
                ) : (
                  <>
                    Create Layout & Continue
                    <FaCheck className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
