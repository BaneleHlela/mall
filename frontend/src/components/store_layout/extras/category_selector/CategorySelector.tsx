import FirstStoreCategorySelector from "./first/FirstStoreCategorySelector";

export interface FirstStoreCategorySelectorProps {
    categories: string[]; 
}

const CategorySelector: React.FC<FirstStoreCategorySelectorProps> = ({categories}) => {
  return (
    <div>
        <FirstStoreCategorySelector categories={categories}/>
    </div>
  )
}

export default CategorySelector;