import React, { useEffect, useState } from 'react';

interface Font {
  family: string;
  category: string;
  variants: string[];
  files: { [key: string]: string };
}

interface GoogleFontsSelectorProps {
  onFontSelect: (font: string) => void;
}

const GoogleFontsSelector: React.FC<GoogleFontsSelectorProps> = ({ onFontSelect }) => {
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
    const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
  
    // Create link
    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  
    // Wait for font to load before applying it
    document.fonts.load(`1rem "${font}"`).then(() => {
      onFontSelect(font);
    });
    console.log(document.fonts)
  };

  return (
    <div className="font-selector">
      <input
        type="text"
        placeholder="Search fonts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2 p-1 border"
      />
      <select
        onChange={(e) => handleFontChange(e.target.value)}
        className="p-2 border"
      >
        <option value="">Select a font</option>
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
    </div>
  );
};

export default GoogleFontsSelector;
