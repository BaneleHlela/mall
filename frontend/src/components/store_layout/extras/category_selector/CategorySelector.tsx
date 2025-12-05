import type { TextProps, Border } from "../../../../types/layoutTypes";
import type { BackgroundSettings } from "../../../../types/layoutSettingsType";
import FirstStoreCategorySelector from "./first/FirstStoreCategorySelector";

export interface FirstStoreCategorySelectorProps {
    categories: string[];
    style: {
      show: boolean;
      text: {
        fontFamily: string;
        fontSize: string;
        color: string;
        fontWeight: string;
      };
      width: {
        mobile: string;
        desktop: string;
      };
      selectedColor: string;
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