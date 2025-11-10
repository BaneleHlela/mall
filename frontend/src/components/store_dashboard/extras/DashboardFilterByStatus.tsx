import React from "react";

interface DashboardFilterByStatusProps {
  value?: string;
  onChange: (status: string) => void;
}

const statuses = ["Active", "Inactive", "Stock Out"];

const DashboardFilterByStatus: React.FC<DashboardFilterByStatusProps> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border font-[500] rounded-[.45vh] text-[2vh] w-[15vh] px-[1.5vh] py-[1.1vh] min-w-fit"
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
