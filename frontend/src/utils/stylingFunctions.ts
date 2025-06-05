import type { TextSettings } from "../types/layoutSettingsType";
export const getTextStyles = (text: TextSettings) => {
  if (!text) return {}; // Return empty object if no text object is provided

  const styles: any = {};

  // Text styles
  if (text.color) styles.color = text.color;
  if (text.weight) styles.fontWeight = text.weight;
  if (text.fontSize) styles.fontSize = text.fontSize;
  if (text.fontFamily) styles.fontFamily = text.fontFamily;
  if (text.fontStyle) styles.fontStyle = text.fontStyle;
  if (text.lineHeight) styles.lineHeight = text.lineHeight;
  if (text.letterSpacing) styles.letterSpacing = text.letterSpacing;
  if (text.textDecoration) styles.textDecoration = text.textDecoration;
  if (text.textTransform) styles.textTransform = text.textTransform;
  if (text.textShadow) styles.textShadow = text.textShadow;

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
