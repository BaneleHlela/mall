import type { BackgroundSettings, ResponsiveValue, TextSettings } from "../types/layoutSettingsType";

export const getTextStyles = (text: TextSettings) => {
  if (!text) return {};

  const styles: any = {};


  if (text.color) styles.color = text.color;
  if (text.weight) styles.fontWeight = text.weight;

  // Box shadow
  if (text.textShadow === true) {
    styles.textShadow = "2px 2px 5px rgba(0,0,0,0.4)";
  }

  if (typeof text.fontSize === "object") {
    // Use getResponsiveDimension for responsive font sizes
    styles.fontSize = getResponsiveDimension(text.fontSize);
  } else if (text.fontSize) {
    styles.fontSize = text.fontSize;
  }
  if (text.backgroundColor) styles.backgroundColor = text.backgroundColor;
  if (text.fontFamily) styles.fontFamily = text.fontFamily;
  if (text.fontStyle) styles.fontStyle = text.fontStyle;
  if (text.lineHeight) styles.lineHeight = text.lineHeight;
  if (text.letterSpacing) styles.letterSpacing = text.letterSpacing;
  if (text.textDecoration) styles.textDecoration = text.textDecoration;
  if (text.textTransform) styles.textTransform = text.textTransform;
  if (text.textShadow) styles.textShadow = text.textShadow;

  // Responsive Padding
  if (typeof text.padding === "object") {
    // Responsive padding Y
    if (typeof text.padding.y === "object") {
      const responsiveY = getResponsiveDimension(text.padding.y);
      styles.paddingTop = responsiveY;
      styles.paddingBottom = responsiveY;
    } else if (text.padding.y) {
      styles.paddingTop = styles.paddingBottom = text.padding.y;
    }

    // Responsive padding X
    if (typeof text.padding.x === "object") {
      const responsiveX = getResponsiveDimension(text.padding.x);
      styles.paddingLeft = responsiveX;
      styles.paddingRight = responsiveX;
    } else if (text.padding.x) {
      styles.paddingLeft = styles.paddingRight = text.padding.x;
    }
  }

  return styles;
};


export const getBorderStyles = (border: { width?: string; style?: string; color?: string; radius?: string }) => {
  const styles: React.CSSProperties = {};

  if (border.width) styles.borderWidth = border.width;
  if (border.style) styles.borderStyle = border.style;
  if (border.color) styles.borderColor = border.color;
  if (border.radius) styles.borderRadius = border.radius;

  return styles;
};


export const getBackgroundStyles = (bg: BackgroundSettings = {}) => {
  const styles: any = {};

  // Background color
  if (bg.color) styles.backgroundColor = bg.color;

  // Box shadow
  if (bg.shadow === true || bg.shadow === "true") {
    styles.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
  }
  // Responsive Height
  if (typeof bg.height === "object") {
    styles.height = getResponsiveDimension(bg.height);
  } else if (bg.height) {
    styles.height = bg.height;
  }

  // Responsive Width
  if (typeof bg.width === "object") {
    styles.width = getResponsiveDimension(bg.width);
  } else if (bg.width) {
    styles.width = bg.width;
  }
  // Responsive Margin
  if (typeof bg.margin === "object") {
    styles.margin = getResponsiveDimension(bg.margin);
  } else if (bg.margin) {
    styles.margin = bg.margin;
  }

  // Responsive Padding
  if (typeof bg.padding === "object") {
    // Responsive padding Y
    if (typeof bg.padding.y === "object") {
      const responsiveY = getResponsiveDimension(bg.padding.y);
      styles.paddingTop = responsiveY;
      styles.paddingBottom = responsiveY;
    } else if (bg.padding.y) {
      styles.paddingTop = styles.paddingBottom = bg.padding.y;
    }

    // Responsive padding X
    if (typeof bg.padding.x === "object") {
      const responsiveX = getResponsiveDimension(bg.padding.x);
      styles.paddingLeft = responsiveX;
      styles.paddingRight = responsiveX;
    } else if (bg.padding.x) {
      styles.paddingLeft = styles.paddingRight = bg.padding.x;
    }
  }

  // Opacity
  if (bg.opacity !== undefined) {
    styles.opacity = bg.opacity; // Convert percentage to decimal
  }

  // Optional border styles
  if (bg.border) {
    if (bg.border.width) styles.borderWidth = bg.border.width;
    if (bg.border.style) styles.borderStyle = bg.border.style;
    if (bg.border.color) styles.borderColor = bg.border.color;
    if (bg.border.radius) styles.borderRadius = bg.border.radius;
  }

  return styles;
};


export const getDivAnimation = (transition: string | undefined) => {
  switch (transition) {
    case "upToDown":
      return { initial: { y: "-100%", opacity: 0 }, exit: { y: "-100%", opacity: 0 } };
    case "downToUp":
      return { initial: { y: "100%", opacity: 0 }, exit: { y: "100%", opacity: 0 } };
    case "leftToRight":
      return { initial: { x: "-100%", opacity: 0 }, exit: { x: "-100%", opacity: 0 } };
    case "rightToLeft":
      return { initial: { x: "100%", opacity: 0 }, exit: { x: "100%", opacity: 0 } };
    case "fade":
      return { initial: { opacity: 0 }, exit: { opacity: 0 } };
    case "none":
        return {}; 
    default:
      return { initial: { y: "-100%", opacity: 0 }, exit: { y: "-100%", opacity: 0 } }; // fallback
  }
};

export const getSidebarAnimation = (transition: string | undefined) => {
  switch (transition) {
    case "leftToRight":
      return { 
        initial: { x: "-100%", opacity: 0 }, 
        animate: { x: "0%", opacity: 1 }, 
        exit: { x: "-100%", opacity: 0 } 
      };
    case "rightToLeft":
      return { 
        initial: { x: "100%", opacity: 0 }, 
        animate: { x: "0%", opacity: 1 }, 
        exit: { x: "100%", opacity: 0 } 
      };
    case "upToDown":
      return { 
        initial: { y: "-100%", opacity: 0 }, 
        animate: { y: "0%", opacity: 1 }, 
        exit: { y: "-100%", opacity: 0 } 
      };
    case "downToUp":
      return { 
        initial: { y: "100%", opacity: 0 }, 
        animate: { y: "0%", opacity: 1 }, 
        exit: { y: "100%", opacity: 0 } 
      };
    case "fade":
      return { 
        initial: { opacity: 0 }, 
        animate: { opacity: 1 }, 
        exit: { opacity: 0 } 
      };
    default:
      return { 
        initial: { x: "-100%", opacity: 0 }, 
        animate: { x: "0%", opacity: 1 }, 
        exit: { x: "-100%", opacity: 0 } 
      }; // fallback
  }
};


export const getResponsiveDimension = (
  dimension: ResponsiveValue,
): string => {
  // Define the breakpoint between mobile and desktop
  const mobileBreakpoint = 768; // You can adjust this value as needed
  const screenWidth = window.innerWidth;
  if (screenWidth < mobileBreakpoint) {
    return dimension.mobile;
  } else {
    return dimension.desktop;
  }
};

interface PercentageObject {
  mobile: string;
  desktop: string;
}

export function getComplementaryPercentages(obj: PercentageObject, propertyName: string): { [key: string]: PercentageObject } {
  const complementary = (percentage: string): string => {
    const value = parseFloat(percentage);
    if (isNaN(value) || !percentage.endsWith('%')) {
      throw new Error('Invalid percentage value');
    }
    return `${100 - value}%`;
  };

  return {
    [propertyName]: {
      mobile: complementary(obj.mobile),
      desktop: complementary(obj.desktop),
    }
  };
}

export function getSpacingClasses({
  y,
  x,
}: {
  y: { mobile: string; desktop: string };
  x: { mobile: string; desktop: string };
}): string {
  const mobileY = y.mobile;
  const desktopY = y.desktop;
  const mobileX = x.mobile;
  const desktopX = x.desktop;

  return `space-y-[${mobileY}] space-x-[${mobileX}] lg:space-y-[${desktopY}] lg:space-x-[${desktopX}]`;
}
