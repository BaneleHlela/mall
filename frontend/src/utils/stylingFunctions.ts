import type { BackgroundSettings, ResponsiveValue, TextSettings } from "../types/layoutSettingsType";

export const getTextStyles = (text: TextSettings) => {
  if (!text) return {};

  const styles: any = {};


  if (text.color) styles.color = text.color;
  if (text.weight) styles.fontWeight = text.weight;

  if (typeof text.fontSize === "object") {
    // Use getResponsiveDimension for responsive font sizes
    styles.fontSize = getResponsiveDimension(text.fontSize);
  } else if (text.fontSize) {
    styles.fontSize = text.fontSize;
  }

  if (text.fontFamily) styles.fontFamily = text.fontFamily;
  if (text.fontStyle) styles.fontStyle = text.fontStyle;
  if (text.lineHeight) styles.lineHeight = text.lineHeight;
  if (text.letterSpacing) styles.letterSpacing = text.letterSpacing;
  if (text.textDecoration) styles.textDecoration = text.textDecoration;
  if (text.textTransform) styles.textTransform = text.textTransform;
  if (text.textShadow) styles.textShadow = text.textShadow;

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

  // Padding
  if (bg.padding?.x) styles.paddingLeft = styles.paddingRight = bg.padding.x;
  if (bg.padding?.y) styles.paddingTop = styles.paddingBottom = bg.padding.y;

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