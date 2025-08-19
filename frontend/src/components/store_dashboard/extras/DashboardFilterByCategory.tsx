import React from "react";

interface DashboardFilterByCategoryProps {
  categories: string[];
  value?: string;
  onChange: (category: string) => void;
}

const DashboardFilterByCategory: React.FC<DashboardFilterByCategoryProps> = ({
  categories,
  value,
  onChange,
}) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-[1.5vh] py-[1vh] text-sm"
    >
      <option value="" className="">Category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default DashboardFilterByCategory;
