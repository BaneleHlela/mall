import FirstStoreCategorySelector from "./first/FirstStoreCategorySelector";

export interface FirstStoreCategorySelectorProps {
    categories: string[]; 
    style: {fontFamily: string};
}

const CategorySelector: React.FC<FirstStoreCategorySelectorProps> = ({categories, style}) => {

  return (
    <div>
        <FirstStoreCategorySelector categories={categories} style={style} />
    </div>
  )
}

export default CategorySelector;