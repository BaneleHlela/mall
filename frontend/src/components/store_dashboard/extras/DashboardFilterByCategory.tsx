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
      className="border rounded-md px-3 py-2 text-sm"
    >
      <option value="">Category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default DashboardFilterByCategory;
