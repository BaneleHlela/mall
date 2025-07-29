
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

  if (layout.menubar) extractColors(layout.menubar);

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





