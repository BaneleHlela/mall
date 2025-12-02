import React from "react";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import { useAppSelector } from "../../../../../app/hooks";
import type { TextProps } from "recharts";
import type { TextSettings } from "../../../../../types/layoutSettingsType";

interface StoreSearchResultsFiltersProps {
  style: {
    text: {
      color: string;
      title: TextSettings;
      categories: TextSettings;
      category: TextSettings;
    };
    checkbox: {
      border: {
        color: string;
        width: string;
        radius: string;
      };
    }
  };
  categories?: string[];
}

const StoreSearchResultsFilters: React.FC<StoreSearchResultsFiltersProps> = ({style, categories = []}) => {
  const colors = useAppSelector((state) => state.layoutSettings.colors);
  const categoryItems = categories.map(cat => ({ name: cat, count: 0 })); // For now, count is 0 since we don't have actual counts

  return (
    <div
      style={{color: colors[style.text.color as keyof typeof colors]}}
      className="w-full p-[1vh]">
      <h3
        style={{
          ...getTextStyles(style.text.title)
        }}
       className="text-lg font-semibold mb-2 py-[1vh]">Filter by</h3>

      <hr style={{borderColor: colors[style.text.title.color as keyof typeof colors]}} className="mb-[1vh]" />

      <h4 style={{...getTextStyles(style.text.categories)}} className="text-md font-semibold mb-3">Category</h4>

      <div className="flex flex-col gap-3">
        {categoryItems.map((cat) => (
          <label
            key={cat.name}
            className="flex items-center cursor-pointer select-none"
          >
            <input
              type="checkbox"
              style={{
                borderColor: colors[style.checkbox.border.color as keyof typeof colors],
                borderWidth: style.checkbox.border.width,
                borderRadius: style.checkbox.border.radius,
                height: "2.2vh",
                width: "2.2vh",
                appearance: "none",        // Makes custom styles work
                WebkitAppearance: "none",  // For Safari
                MozAppearance: "none",     // For Firefox
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              className="mr-2 flex items-center justify-center"
              onChange={(e) => {}}
            />
            <span 
              style={{
                ...getTextStyles(style.text.category)
              }}
            >
              {cat.name}{""}
              <span style={{color: colors.accent}} className="opacity-70 italic">({cat.count})</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StoreSearchResultsFilters;
