
export const getSetting = (key: string, settings: any, objectPath: string) => {
  try {
    const path = [
      ...((objectPath && objectPath.length > 0) ? objectPath.split(".") : []),
      ...((key && key.length > 0) ? key.split(".") : [])
    ];


    return path.reduce((current, prop) => current?.[prop], settings);
  } catch {
    return undefined;
  }
};


export const convertTo12HourFormat = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatPhoneNumber(phoneNumber: string): string {
  if (!/^\d{10}$/.test(phoneNumber)) {
      throw new Error("Invalid phone number format. Must be 10 digits.");
  }
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

export const validateContact = (phone: string, email: string) => {
  const phoneValid = /^[0-9]{10}$/.test(phone); 
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return {
    phoneValid,
    emailValid
  };
};

// utils/extractColors.ts
type ColorMap = {
  [path: string]: string;
};

export function extractColorsFromLayout(layout: any): ColorMap {
  const colorMap: ColorMap = {};

  function scan(obj: any, currentPath: string = '') {
    if (typeof obj !== 'object' || obj === null) return;

    for (const key in obj) {
      const value = obj[key];
      const path = currentPath ? `${currentPath}.${key}` : key;

      if (key === 'color' || key === 'backgroundColor') {
        if (typeof value === 'string') {
          colorMap[path] = value;
        }
      }

      // Continue scanning nested objects
      if (typeof value === 'object') {
        scan(value, path);
      }
    }
  }

  scan(layout);
  return colorMap;
}


export function extractLayoutColors(layout: any): string[] {
  const colors = new Set<string>();

  // Matches 3 or 6 digit hex colors (e.g. #fff or #ffffff)
  const isValidHexColor = (value: string) =>
    /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());

  const blockedValues = new Set([
    "transparent",
    "",
    "white",
    "black",
    "inherit",
    "initial",
    "unset",
  ]);

const extractColors = (obj: any) => {
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
    const value = obj[key];

    // Handle color or backgroundColor
    if (
      (key === "color" || key === "backgroundColor") &&
      typeof value === "string"
    ) {
      const color = value.trim().toLowerCase();
      if (isValidHexColor(color) && !blockedValues.has(color)) {
        colors.add(color);
      }
    }

    // Only scan "underline" if underline.show === "true"
    else if (key === "underline" && typeof value === "object") {
      if (value.show) extractColors(value);
    }

    // Special case: "extras" object
    else if (key === "extras" && typeof value === "object") {
      const include = value.include;
      if (include === "button" && value.button) {
        console.log("Extracting button colors:", value.button);
        extractColors(value.button);
      } else if (include === "icons" && value.icons) {
        console.log("Extracting icon colors:", value.icons);
        extractColors(value.icons);
      }
      // skip if "none" or invalid
    }

    // Recurse normally for other keys
    else if (typeof value === "object" && key !== "underline") {
      extractColors(value);
    }
  }
  };

  const sectionsToScan = new Set<string>();
  const routes = layout.routes || {};
  for (const routeKey in routes) {
  const route = routes[routeKey];
  if (route && Array.isArray(route.contains))  {// @ts-ignore
      route.contains.forEach(section => sectionsToScan.add(section));
    }
  }

  if (layout.menubar) {
    extractColors({
      ...layout.menubar,
      alertDiv: undefined, // temporarily exclude it
      cart: undefined       // temporarily exclude it
    });
  
    if (layout.menubar.alertDiv?.display === true) {
      extractColors(layout.menubar.alertDiv);
    }
  
    if (sectionsToScan.has("products") && layout.menubar.cart) {
      extractColors(layout.menubar.cart);
    }
  }  

  if (layout.floats?.floatingIcons?.show) {
    extractColors(layout.floats.floatingIcons);
  }

  if (layout.floats?.floatingButton?.show !== "none") {
    extractColors(layout.floats.floatingButton);
  }

  if (sectionsToScan.has("products") && layout.products) {
    extractColors(layout.products);

    if (layout.products.categorySelector?.show) {
      extractColors(layout.products.categorySelector);
    }
  }

  if (sectionsToScan.has("products") && layout.singleProduct) {
    extractColors(layout.singleProduct);

    if (layout.singleProduct.details?.messageBox?.show) {
      extractColors(layout.singleProduct.details.messageBox);
    }
  }

  for (const section of sectionsToScan) {
    if (section !== "products" && layout[section]) {
      extractColors(layout[section]);
    }
  }

  return Array.from(colors);
}


export function formatDateToNormal(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }); // "July"
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}


interface Location {
  lat: number;
  lng: number;
  nickname?: string;
  address?: string;
}

interface Delivery {
  enabled: boolean;
  range: number; // in km
}

/**
 * Returns true if the user's location is within store's delivery range
 */
export function isUserInDeliveryRange(
  userLocation: Location | null | undefined,
  storeLocation: any, // Store location can be old format (lat/lng) or new format (coordinates)
  delivery: Delivery | null | undefined
): boolean {
  if (!userLocation || !delivery?.enabled) return false;

  const toRad = (x: number) => (x * Math.PI) / 180;

  const lat1 = userLocation.lat;
  const lon1 = userLocation.lng;

  // Handle both old and new location formats
  let lat2: number, lon2: number;
  if (storeLocation.coordinates && Array.isArray(storeLocation.coordinates)) {
    // New GeoJSON format: [lng, lat]
    lon2 = storeLocation.coordinates[0];
    lat2 = storeLocation.coordinates[1];
  } else {
    // Old format: direct lat/lng properties
    lat2 = storeLocation.lat;
    lon2 = storeLocation.lng;
  }

  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // distance in km

  return distance <= delivery.range;
}

export const formatNumber = (num: number): string => {
  if (num < 1000) {
    // 0–999
    return num.toString();
  } else if (num < 10000) {
    // 1,000–9,999 → show comma separator
    return num.toLocaleString();
  } else if (num < 1000000) {
    // 10,000–999,999 → use "k"
    return (num / 1000).toFixed(num >= 100000 ? 0 : 1).replace(/\.0$/, "") + "k";
  } else {
    // 1,000,000+ → use "m"
    return (num / 1000000).toFixed(num >= 10000000 ? 0 : 1).replace(/\.0$/, "") + "m";
  }
};

export const getPositionStyle = (position: Number) => {
  switch (position) {
      case 1:
          return { top: '5%', left: '5%' };
      case 2:
          return { top: '45%', left: '5%' };
      case 3:
          return { bottom: '5%', left: '5%' };
      case 4:
          return { top: '5%', left: '45%' };
      case 5:
          return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };;
      case 6:
          return { bottom: '5%', right: '33%' };
      case 7:
          return { top: '5%', right: '5%' };
      case 8:
          return { bottom: '45%', right: '5%' };
      case 9:
          return { bottom: '5%', right: '5%' };
      default:
          return { top: '5%', left: '5%' };
  }
}

export function getDynamicSizeMap() {
  const screenWidth = window.innerWidth;

  // Extremely small screens (phones)
  if (screenWidth <= 496) {
    return {
      mobile:  { width: 320, height: 650, scale: 0.65 },
      tablet:  { width: 600, height: 900, scale: 0.55 },
      desktop: { width: 1380, height: 700, scale: 0.65 },
    };
  }

  // Medium screens (small laptops/tablets)
  if (screenWidth <= 1024) {
    return {
      mobile:  { width: 360, height: 740, scale: 0.65 },
      tablet:  { width: 700, height: 1024, scale: 0.52 },
      desktop: { width: 1380, height: 700, scale: 0.7 },
    };
  }
  if (screenWidth > 1800) {
    return {
      mobile:  { width: 360, height: 740, scale: 1.1 },
      tablet:  { width: 700, height: 1024, scale: 0.72 },
      desktop: { width: 1380, height: 700, scale: 0.8 },
    };
  }


  // Large screens (desktop)
  return {
    mobile:  { width: 412, height: 840, scale: 0.75 },
    tablet:  { width: 775, height: 1024, scale: 0.62 },
    desktop: { width: 1380, height: 700, scale: 0.7 },
  };
}


export const getZoomScaleClass = (zoom: number) => {
  if (zoom <= 0.1) return 'scale-[0.1]';
  if (zoom <= 0.2) return 'scale-[0.2]';
  if (zoom <= 0.3) return 'scale-[0.3]';
  if (zoom <= 0.4) return 'scale-[0.4]';
  if (zoom <= 0.5) return 'scale-[0.5]';
  if (zoom <= 0.6) return 'scale-[0.6]';
  if (zoom <= 0.7) return 'scale-[0.7]';
  if (zoom <= 0.8) return 'scale-[0.8]';
  if (zoom <= 0.9) return 'scale-[0.9]';
  if (zoom <= 1) return 'scale-[1]';
  if (zoom <= 1.1) return 'scale-[1.1]';
  if (zoom <= 1.2) return 'scale-[1.2]';
  if (zoom <= 1.3) return 'scale-[1.3]';
  if (zoom <= 1.4) return 'scale-[1.4]';
  if (zoom <= 1.5) return 'scale-[1.5]';
  if (zoom <= 1.6) return 'scale-[1.6]';
  if (zoom <= 1.7) return 'scale-[1.7]';
  if (zoom <= 1.8) return 'scale-[1.8]';
  if (zoom <= 1.9) return 'scale-[1.9]';
  if (zoom <= 2) return 'scale-[2]';
  return 'scale-[1]';
};


