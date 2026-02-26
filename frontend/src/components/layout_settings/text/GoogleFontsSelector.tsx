import React, { useEffect, useState } from 'react';

interface Font {
  family: string;
  category: string;
  variants: string[];
  files: { [key: string]: string };
}

interface GoogleFontsSelectorProps {
  onFontSelect: (font: string) => void;
  selectedFont: string;
  fullWidth?: boolean;
}

const GoogleFontsSelector: React.FC<GoogleFontsSelectorProps> = ({ 
  onFontSelect, 
  selectedFont, 
  fullWidth = false 
}) => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCQy8hHjYPmp4W4Xq2Rv8WnA-8dguoxSjc`
        );
        const data = await response.json();
        setFonts(data.items);
      } catch (error) {
        console.error('Error fetching fonts:', error);
      }
    };

    fetchFonts();
  }, []);

  const handleFontChange = (font: string) => {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(
      /\s+/g,
      '+'
    )}&display=swap`;

    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Wait for font to load before applying it
    document.fonts.load(`1rem "${font}"`).then(() => {
      onFontSelect(font);
      setSearch('');
      setIsDropdownOpen(false);
    });
  };

  const filteredFonts = fonts.filter((font) =>
    font.family.toLowerCase().includes(search.toLowerCase())
  );

  // Get font category display
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'serif': return 'bg-amber-100 text-amber-700';
      case 'sans-serif': return 'bg-blue-100 text-blue-700';
      case 'display': return 'bg-purple-100 text-purple-700';
      case 'handwriting': return 'bg-green-100 text-green-700';
      case 'monospace': return 'bg-stone-200 text-stone-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : "w-full"}`}>
      {/* Selected Font Display */}
      <div 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-between px-[1.2vh] py-[.8vh] bg-white border border-stone-200 rounded-lg cursor-pointer hover:border-stone-300 transition-colors"
      >
        <div className="flex items-center gap-2">
          {selectedFont ? (
            <>
              <span 
                className="text-[1.8vh] font-medium text-stone-700"
                style={{ fontFamily: selectedFont }}
              >
                {selectedFont}
              </span>
              {fonts.find(f => f.family === selectedFont) && (
                <span className={`text-[1.6vh] px-1.5 py-0.5 rounded ${getCategoryColor(fonts.find(f => f.family === selectedFont)?.category || '')}`}>
                  {fonts.find(f => f.family === selectedFont)?.category}
                </span>
              )}
            </>
          ) : (
            <span className="text-[1.8vh] text-stone-400">Select font...</span>
          )}
        </div>
        <svg 
          className={`w-4 h-4 text-stone-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-stone-100">
            <input
              type="text"
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              autoFocus
            />
          </div>

          {/* Font List */}
          <div className="max-h-[200px] overflow-y-auto">
            {filteredFonts.length > 0 ? (
              filteredFonts.slice(0, 50).map((font) => (
                <div
                  key={font.family}
                  onClick={() => handleFontChange(font.family)}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-stone-50 ${
                    font.family === selectedFont ? 'bg-indigo-50' : ''
                  }`}
                >
                  <span 
                    className="text-sm text-stone-700"
                    style={{ fontFamily: font.family }}
                  >
                    {font.family}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${getCategoryColor(font.category)}`}>
                    {font.category}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-stone-400 text-center">
                No fonts found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleFontsSelector;
