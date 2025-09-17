import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { TbMoneybag } from "react-icons/tb";
import { type IconType } from "react-icons"; // This is important!

export interface StoreDashboardOverviewStatCardProps {
  title: string;
  value: string;
  percentage: number;
  trend?: "up" | "down";

  timeframe: "today" | "week" | "month";
  onTimeframeChange?: (newTimeframe: "today" | "week" | "month") => void;

  showPercentage: boolean;
  onValueToggle?: (showPercentage: boolean) => void;

  icon?: IconType; 
  color?: string;
}

export const StoreDashboardOverviewStatCard = ({
  title,
  value,
  percentage,
  trend,
  timeframe,
  onTimeframeChange,
  showPercentage,
  onValueToggle,
  icon: Icon = TbMoneybag, 
  color = "#8b5cf6",
}: StoreDashboardOverviewStatCardProps) => {
  return (
    <div className="flex flex-row justify-start items-stretch space-x-[5%] w-full sm:w-[250px] transition hover:scale-105">
      {/* Icon */}
      <div 
        style={{
          backgroundColor: `${color}22`,
        }}
        className="w-[20%] aspect-square flex items-center justify-center p-[1vh] rounded-[1vh]"
      >
        <Icon className="w-[60%] h-[60%]" color={color}/>
      </div>

      <div>
        {/* Title + timeframe toggle */}
        <div className="flex justify-between items-center">
          <h3
            className="text-[1.8vh] mt-[.5vh] font-medium text-gray-500 hover:text-indigo-600 cursor-pointer"
            onClick={() => onTimeframeChange?.(timeframe)}
          >
            {title}{" "}
            {timeframe === "week" && "(Last 7 days)"}
            {timeframe === "today" && "(Today)"}
            {timeframe === "month" && "(Last 30 days)"}
          </h3>
        </div>
        {/* Value and Trend */}
        <div className="flex flex-row items-center justify-start space-x-[1vh]">
          {/* Value toggle */}
          <div
            style={{
              color: color,
            }}
            className="text-[2.8vh] font-semibold select-none cursor-pointer"
            onClick={() => onValueToggle?.(showPercentage)}
          >
            {showPercentage ? `${percentage > 0 ? "+" : ""}${percentage}%` : value}
          </div>

          {/* Trend indicator */}
          {trend && (
            <div className={`h-fit aspect-square flex items-center justify-center ${trend === "up" && "bg-[#00c95027]"} ${trend === "down" && "bg-[#c9000027]"} p-[.55vh] rounded-[.35vh]`}>
              {trend === "up" ? (
                <BsGraphUpArrow className="w-[1.5vh] h-[1.5vh] text-green-500" />
              ) : (
                <BsGraphDownArrow className="w-[1.5vh] h-[1.5vh] text-red-500" />
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StoreDashboardOverviewStatCard;
