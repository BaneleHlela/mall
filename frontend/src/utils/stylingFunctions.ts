import { useAppSelector } from "../app/hooks";
import type { BackgroundSettings, ResponsiveValue, TextSettings } from "../types/layoutSettingsType";

export const getTextStyles = (text: TextSettings, fonts?: any, colors?: any) => {
  const resolvedFonts = fonts || useAppSelector((state) => state.layoutSettings.fonts);
  const resolvedColors = colors || useAppSelector((state) => state.layoutSettings.colors);

  if (!text) return {};

  const styles: any = {};

  // 🎨 COLOR (SWITCH CASE)
  if (text.color) {
    let mappedColor = text.color;

    switch (text.color) {
      case "primary":
        mappedColor = resolvedColors?.primary ?? text.color;
        break;
      case "secondary":
        mappedColor = resolvedColors?.secondary ?? text.color;
        break;
      case "accent":
        mappedColor = resolvedColors?.accent ?? text.color;
        break;
      case "quad":
        mappedColor = resolvedColors?.quad ?? text.color;
        break;
      case "pent":
        mappedColor = resolvedColors?.pent ?? text.color;
        break;
      default:
        mappedColor = text.color;
    }

    styles.color = mappedColor;
  }

  if (text.weight) styles.fontWeight = text.weight;

  if (text.textShadow === true) {
    styles.textShadow = "2px 2px 5px rgba(0,0,0,0.4)";
  }

  // Font size
  if (typeof text.fontSize === "object") {
    styles.fontSize = getResponsiveDimension(text.fontSize);
  } else if (text.fontSize) {
    styles.fontSize = text.fontSize;
  }

  // 🎯 FONT FAMILY (SWITCH CASE)
  if (text.fontFamily) {
    let mappedFont = "";

    switch (text.fontFamily) {
      case "primary":
        mappedFont = resolvedFonts?.primary ?? "";
        break;
      case "secondary":
        mappedFont = resolvedFonts?.secondary ?? "";
        break;
      case "tertiary":
        mappedFont = resolvedFonts?.tertiary ?? "";
        break;
      default:
        mappedFont = text.fontFamily;
    }

    if (mappedFont) styles.fontFamily = mappedFont;
  }

  // background
  if (text.backgroundColor) {
    let mappedBg = text.backgroundColor;

    switch (text.backgroundColor) {
      case "primary":
        mappedBg = resolvedColors?.primary ?? text.backgroundColor;
        break;
      case "secondary":
        mappedBg = resolvedColors?.secondary ?? text.backgroundColor;
        break;
      case "accent":
        mappedBg = resolvedColors?.accent ?? text.backgroundColor;
        break;
      case "quad":
        mappedBg = resolvedColors?.quad ?? text.backgroundColor;
        break;
      case "pent":
        mappedBg = resolvedColors?.pent ?? text.backgroundColor;
        break;
      default:
        mappedBg = text.backgroundColor;
    }

    styles.backgroundColor = mappedBg;
  }

  if (text.fontStyle) styles.fontStyle = text.fontStyle;
  if (text.lineHeight) styles.lineHeight = text.lineHeight;
  if (text.letterSpacing) styles.letterSpacing = text.letterSpacing;
  if (text.textDecoration) styles.textDecoration = text.textDecoration;
  if (text.textTransform) styles.textTransform = text.textTransform;

  if (typeof text.textShadow === "string") {
    styles.textShadow = text.textShadow;
  }

  // Padding (responsive)
  if (typeof text.padding === "object") {
    if (typeof text.padding.y === "object") {
      const y = getResponsiveDimension(text.padding.y);
      styles.paddingTop = styles.paddingBottom = y;
    } else if (text.padding.y) {
      styles.paddingTop = styles.paddingBottom = text.padding.y;
    }

    if (typeof text.padding.x === "object") {
      const x = getResponsiveDimension(text.padding.x);
      styles.paddingLeft = styles.paddingRight = x;
    } else if (text.padding.x) {
      styles.paddingLeft = styles.paddingRight = text.padding.x;
    }
  }

  return styles;
};

export const getBorderStyles = (border: { width?: string; style?: string; color?: string; radius?: string }, colors?: any) => {
  const resolvedColors = colors || useAppSelector((state) => state.layoutSettings.colors);
  const styles: React.CSSProperties = {};

  if (border.width) styles.borderWidth = border.width;
  if (border.style) styles.borderStyle = border.style;

  if (border.color) {
    let mappedColor = border.color;
    switch (border.color) {
      case "primary": mappedColor = resolvedColors?.primary ?? border.color; break;
      case "secondary": mappedColor = resolvedColors?.secondary ?? border.color; break;
      case "accent": mappedColor = resolvedColors?.accent ?? border.color; break;
      case "quad": mappedColor = resolvedColors?.quad ?? border.color; break;
      case "pent": mappedColor = resolvedColors?.pent ?? border.color; break;
      default: mappedColor = border.color;
    }
    styles.borderColor = mappedColor;
  }

  if (border.radius) styles.borderRadius = border.radius;

  return styles;
};

export const getBackgroundStyles = (bg: BackgroundSettings = {}, colors?: any) => {
  const resolvedColors = colors || useAppSelector((state) => state.layoutSettings.colors);
  const styles: any = {};


  // 🎨 BG COLOR (SWITCH CASE)
  if (bg.color) {
    let mappedColor = bg.color;

    switch (bg.color) {
      case "primary": mappedColor = resolvedColors?.primary ?? bg.color; break;
      case "secondary": mappedColor = resolvedColors?.secondary ?? bg.color; break;
      case "accent": mappedColor = resolvedColors?.accent ?? bg.color; break;
      case "quad": mappedColor = resolvedColors?.quad ?? bg.color; break;
      case "pent": mappedColor = resolvedColors?.pent ?? bg.color; break;
      default: mappedColor = bg.color;
    }

    styles.backgroundColor = mappedColor;
  }

  if (bg.shadow === true || bg.shadow === "true") {
    styles.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  }

  if (typeof bg.height === "object") styles.height = getResponsiveDimension(bg.height);
  else if (bg.height) styles.height = bg.height;

  if (typeof bg.width === "object") styles.width = getResponsiveDimension(bg.width);
  else if (bg.width) styles.width = bg.width;

  if (typeof bg.margin === "object") styles.margin = getResponsiveDimension(bg.margin);
  else if (bg.margin) styles.margin = bg.margin;

  // padding
  if (typeof bg.padding === "object") {
    if (typeof bg.padding.y === "object") {
      const y = getResponsiveDimension(bg.padding.y);
      styles.paddingTop = styles.paddingBottom = y;
    } else if (bg.padding.y) {
      styles.paddingTop = styles.paddingBottom = bg.padding.y;
    }

    if (typeof bg.padding.x === "object") {
      const x = getResponsiveDimension(bg.padding.x);
      styles.paddingLeft = styles.paddingRight = x;
    } else if (bg.padding.x) {
      styles.paddingLeft = styles.paddingRight = bg.padding.x;
    }
  }

  if (bg.opacity !== undefined) styles.opacity = bg.opacity;

  if (bg.border) {
    if (bg.border.width) styles.borderWidth = bg.border.width;
    if (bg.border.style) styles.borderStyle = bg.border.style;

    if (bg.border.color) {
      let mappedColor = bg.border.color;

      switch (bg.border.color) {
        case "primary": mappedColor = resolvedColors?.primary ?? bg.border.color; break;
        case "secondary": mappedColor = resolvedColors?.secondary ?? bg.border.color; break;
        case "accent": mappedColor = resolvedColors?.accent ?? bg.border.color; break;
        case "quad": mappedColor = resolvedColors?.quad ?? bg.border.color; break;
        case "pent": mappedColor = resolvedColors?.pent ?? bg.border.color; break;
        default: mappedColor = bg.border.color;
      }

      styles.borderColor = mappedColor;
    }

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
