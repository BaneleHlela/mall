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
const GoogleFontsSelector: React.FC<GoogleFontsSelectorProps> = ({ onFontSelect, selectedFont, fullWidth = false }) => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [search, setSearch] = useState<string>('');
  
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
      setSearch(''); // Clear the search input after selecting a font
    });
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : "w-1.2"}`}> {/* Added relative positioning */}
      <input
        type="text"
        placeholder={`${selectedFont ||  "Search fonts..."}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-1 py-[1.5px] border rounded-[.45vh] w-full"
      />
      {search && (
        <select
          onChange={(e) => handleFontChange(e.target.value)}
          className="absolute top-full left-0 p-2 border hide-scrollbar rounded-[7px] w-full bg-white shadow-md z-10" // Absolute positioning
          size={4} // Show 4 visible options
        >
          {fonts
            .filter((font) =>
              font.family.toLowerCase().includes(search.toLowerCase())
            )
            .map((font) => (
              <option key={font.family} value={font.family}>
                {font.family}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default GoogleFontsSelector;
