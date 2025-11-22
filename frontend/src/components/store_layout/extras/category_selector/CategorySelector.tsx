import type { TextProps, Border } from "../../../../types/layoutTypes";
import type { BackgroundSettings } from "../../../../types/layoutSettingsType";
import FirstStoreCategorySelector from "./first/FirstStoreCategorySelector";

export interface FirstStoreCategorySelectorProps {
    categories: string[];
    style: {
      text: TextProps,
      fontFamily: string;
      width: {
        desktop: string;
        mobile: string;
      };
      border?: Border;
      underlineColor?: {
        color: string;
      };
      selectedColor?: {
        color: string;
      };
      unselectedColor?: {
        color: string;
      };
      color?: string;
      padding?: {
        x?: {
          mobile: string;
          desktop: string;
        };
        y?: {
          mobile: string;
          desktop: string;
        };
      };
      alignment?: string;
      spacing?: {
        x?: {
          mobile: string;
          desktop: string;
        };
        y?: {
          mobile: string;
          desktop: string;
        };
      };
    };
}

const CategorySelector: React.FC<FirstStoreCategorySelectorProps> = ({categories, style}) => {

  return (
    <>
        <FirstStoreCategorySelector categories={categories} style={style} />
    </>
  )
}

export default CategorySelector;