// Theme recommendations based on store departments/trades
// Each recommendation includes font pairings and color palettes

export interface FontPairing {
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface ColorPalette {
  name: string;
  colors: string[];
  description?: string;
}

export interface ThemeRecommendation {
  department: string;
  fontPairings: FontPairing[];
  colorPalettes: ColorPalette[];
}

// Default font pairings for all departments
export const defaultFontPairings: FontPairing[] = [
  {
    name: "Modern Minimal",
    primary: "Inter",
    secondary: "Roboto",
    tertiary: "Open Sans",
  },
  {
    name: "Elegant Classic",
    primary: "Playfair Display",
    secondary: "Lora",
    tertiary: "Merriweather",
  },
  {
    name: "Bold & Dynamic",
    primary: "Montserrat",
    secondary: "Oswald",
    tertiary: "Raleway",
  },
];

// Default color palettes
export const defaultColorPalettes: ColorPalette[] = [
  {
    name: "Professional Blue",
    colors: ["#1a365d", "#2b6cb0", "#4299e1", "#90cdf4", "#ebf8ff"],
    description: "Trustworthy and professional",
  },
  {
    name: "Warm Earth",
    colors: ["#744210", "#c05621", "#dd6b20", "#ed8936", "#fbd38d"],
    description: "Natural and welcoming",
  },
  {
    name: "Fresh Green",
    colors: ["#22543d", "#276749", "#2f855a", "#48bb78", "#c6f6d5"],
    description: "Organic and healthy",
  },
  {
    name: "Elegant Purple",
    colors: ["#44337a", "#553c9a", "#6b46c1", "#9f7aea", "#e9d8fd"],
    description: "Creative and luxurious",
  },
  {
    name: "Clean monochrome",
    colors: ["#1a202c", "#2d3748", "#4a5568", "#a0aec0", "#edf2f7"],
    description: "Modern and minimal",
  },
  {
    name: "Vibrant Coral",
    colors: ["#9b2c2c", "#c53030", "#e53e3e", "#fc8181", "#fed7d7"],
    description: "Energetic and bold",
  },
];

// Department-specific theme recommendations
export const departmentThemes: Record<string, ThemeRecommendation> = {
  food: {
    department: "Food & Beverage",
    fontPairings: [
      {
        name: "Tasty & Modern",
        primary: "Poppins",
        secondary: "Open Sans",
        tertiary: "Lato",
      },
      {
        name: "Rustic Kitchen",
        primary: "Merriweather",
        secondary: "Lora",
        tertiary: "Source Sans Pro",
      },
      {
        name: "Fine Dining",
        primary: "Playfair Display",
        secondary: "Raleway",
        tertiary: "Montserrat",
      },
    ],
    colorPalettes: [
      {
        name: "Appetizing Orange",
        colors: ["#7c2d12", "#c2410c", "#ea580c", "#fb923c", "#ffedd5"],
        description: "Warm and appetizing",
      },
      {
        name: "Fresh Herbs",
        colors: ["#14532d", "#15803d", "#22c55e", "#86efac", "#dcfce7"],
        description: "Fresh and organic",
      },
      {
        name: "Coffee Brown",
        colors: ["#3f2e23", "#5d4037", "#795548", "#a1887f", "#d7ccc8"],
        description: "Cozy café vibes",
      },
    ],
  },
  clothing: {
    department: "Clothing & Fashion",
    fontPairings: [
      {
        name: "Chic & Elegant",
        primary: "Playfair Display",
        secondary: "Lato",
        tertiary: "Montserrat",
      },
      {
        name: "Streetwear",
        primary: "Oswald",
        secondary: "Roboto",
        tertiary: "Open Sans",
      },
      {
        name: "Bohemian",
        primary: "Cormorant Garamond",
        secondary: "Josefin Sans",
        tertiary: "Work Sans",
      },
    ],
    colorPalettes: [
      {
        name: "High Fashion",
        colors: ["#18181b", "#27272a", "#3f3f46", "#71717a", "#f4f4f5"],
        description: "Chic monochrome",
      },
      {
        name: "Summer Breeze",
        colors: ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd", "#e0f2fe"],
        description: "Fresh and airy",
      },
      {
        name: "Earth Tones",
        colors: ["#44403c", "#78716c", "#a8a29e", "#d6d3d1", "#f5f5f4"],
        description: "Natural elegance",
      },
    ],
  },
  health: {
    department: "Health & Medical",
    fontPairings: [
      {
        name: "Medical Clean",
        primary: "Inter",
        secondary: "Roboto",
        tertiary: "Open Sans",
      },
      {
        name: "Caring & Warm",
        primary: "Nunito",
        secondary: "Quicksand",
        tertiary: "Lato",
      },
      {
        name: "Professional Trust",
        primary: "Source Sans Pro",
        secondary: "Merriweather",
        tertiary: "Lora",
      },
    ],
    colorPalettes: [
      {
        name: "Medical Blue",
        colors: ["#1e3a8a", "#1d4ed8", "#3b82f6", "#93c5fd", "#dbeafe"],
        description: "Trustworthy and calm",
      },
      {
        name: "Healing Green",
        colors: ["#14532d", "#166534", "#22c55e", "#86efac", "#dcfce7"],
        description: "Restorative and peaceful",
      },
      {
        name: "Soft Sage",
        colors: ["#3f6212", "#65a30d", "#84cc16", "#bef264", "#ecfccb"],
        description: "Natural wellness",
      },
    ],
  },
  beauty: {
    department: "Beauty & Personal Care",
    fontPairings: [
      {
        name: "Glamorous",
        primary: "Playfair Display",
        secondary: "Lato",
        tertiary: "Montserrat",
      },
      {
        name: "Soft & Feminine",
        primary: "Cormorant Garamond",
        secondary: "Quicksand",
        tertiary: "Nunito",
      },
      {
        name: "Modern Luxe",
        primary: "Montserrat",
        secondary: "Raleway",
        tertiary: "Poppins",
      },
    ],
    colorPalettes: [
      {
        name: "Rose Gold",
        colors: ["#881337", "#be123c", "#e11d48", "#fb7185", "#ffe4e6"],
        description: "Elegant and romantic",
      },
      {
        name: "Lavender Dreams",
        colors: ["#4c1d95", "#6d28d9", "#8b5cf6", "#c4b5fd", "#ede9fe"],
        description: "Soft and luxurious",
      },
      {
        name: "Blush Pink",
        colors: ["#9f1239", "#be123c", "#db2777", "#f472b6", "#fce7f3"],
        description: "Feminine and pretty",
      },
    ],
  },
  sports: {
    department: "Sports & Outdoors",
    fontPairings: [
      {
        name: "Athletic Edge",
        primary: "Oswald",
        secondary: "Roboto",
        tertiary: "Montserrat",
      },
      {
        name: "Active Energy",
        primary: "Montserrat",
        secondary: "Open Sans",
        tertiary: "Raleway",
      },
      {
        name: "Outdoor Adventure",
        primary: "Bebas Neue",
        secondary: "Source Sans Pro",
        tertiary: "Lato",
      },
    ],
    colorPalettes: [
      {
        name: "Victory Gold",
        colors: ["#78350f", "#b45309", "#d97706", "#fbbf24", "#fef3c7"],
        description: "Championship energy",
      },
      {
        name: "Team Spirit",
        colors: ["#1e3a8a", "#1d4ed8", "#2563eb", "#60a5fa", "#dbeafe"],
        description: "Bold and determined",
      },
      {
        name: "Forest Trail",
        colors: ["#14532d", "#15803d", "#16a34a", "#4ade80", "#bbf7d0"],
        description: "Nature and adventure",
      },
    ],
  },
  construction: {
    department: "Construction & Renovations",
    fontPairings: [
      {
        name: "Solid & Reliable",
        primary: "Roboto",
        secondary: "Open Sans",
        tertiary: "Montserrat",
      },
      {
        name: "Industrial Strength",
        primary: "Oswald",
        secondary: "Raleway",
        tertiary: "Lato",
      },
      {
        name: "Craftsman",
        primary: "Merriweather",
        secondary: "Source Sans Pro",
        tertiary: "Lora",
      },
    ],
    colorPalettes: [
      {
        name: "Construction Orange",
        colors: ["#7c2d12", "#9a3412", "#c2410c", "#fb923c", "#ffedd5"],
        description: "Bold and visible",
      },
      {
        name: "Steel Gray",
        colors: ["#18181b", "#27272a", "#3f3f46", "#71717a", "#f4f4f5"],
        description: "Industrial strength",
      },
      {
        name: "Brick Red",
        colors: ["#7f1d1d", "#991b1b", "#dc2626", "#f87171", "#fee2e2"],
        description: "Traditional trades",
      },
    ],
  },
  default: {
    department: "General",
    fontPairings: defaultFontPairings,
    colorPalettes: defaultColorPalettes,
  },
};

// Helper function to get theme recommendations based on store trades
export const getThemeRecommendations = (trades: string[]): ThemeRecommendation => {
  if (!trades || trades.length === 0) {
    return departmentThemes.default;
  }

  // Map trade types to department keys
  const tradeToDepartment: Record<string, string> = {
    food: "food",
    restaurant: "food",
    cafe: "food",
    catering: "food",
    clothing: "clothing",
    fashion: "clothing",
    tailoring: "clothing",
    health: "health",
    medical: "health",
    clinic: "health",
    beauty: "beauty",
    salon: "beauty",
    spa: "beauty",
    sports: "sports",
    fitness: "sports",
    gym: "sports",
    construction: "construction",
    builder: "construction",
    contractor: "construction",
  };

  // Find matching department
  for (const trade of trades) {
    const lowerTrade = trade.toLowerCase();
    for (const [key, value] of Object.entries(tradeToDepartment)) {
      if (lowerTrade.includes(key)) {
        return departmentThemes[value] || departmentThemes.default;
      }
    }
  }

  return departmentThemes.default;
};

// Get all available font pairings
export const getAllFontPairings = (trades: string[]): FontPairing[] => {
  const recommendations = getThemeRecommendations(trades);
  return recommendations.fontPairings;
};

// Get all available color palettes
export const getAllColorPalettes = (trades: string[]): ColorPalette[] => {
  const recommendations = getThemeRecommendations(trades);
  return recommendations.colorPalettes;
};
