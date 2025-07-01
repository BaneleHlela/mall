import type { TextProps } from "../../../../types/layoutTypes";
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