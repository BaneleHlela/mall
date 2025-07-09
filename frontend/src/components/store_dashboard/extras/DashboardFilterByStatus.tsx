import React from "react";

interface DashboardFilterByStatusProps {
  value?: string;
  onChange: (status: string) => void;
}

const statuses = ["Published", "Inactive", "Stock Out"];

const DashboardFilterByStatus: React.FC<DashboardFilterByStatusProps> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm"
    >
      <option value="">Status</option>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default DashboardFilterByStatus;
