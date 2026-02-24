import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { type IconType } from "react-icons";

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
  icon: Icon, 
  color = "#8b5cf6",
}: StoreDashboardOverviewStatCardProps) => {
  const isPositive = percentage >= 0;
  
  return (
    <div className="w-full">
      {/* Header with icon and title */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="text-sm" style={{ color }} />
            </div>
          )}
          <button
            onClick={() => onTimeframeChange?.(timeframe)}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            {title}
          </button>
        </div>
        
        {/* Timeframe badge */}
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
          {timeframe === "today" && "Today"}
          {timeframe === "week" && "7 days"}
          {timeframe === "month" && "30 days"}
        </span>
      </div>

      {/* Value */}
      <div className="flex items-end justify-between">
        <button
          onClick={() => onValueToggle?.(showPercentage)}
          className="text-2xl font-bold text-slate-800 hover:text-slate-600 transition-colors cursor-pointer"
        >
          {showPercentage ? `${percentage > 0 ? "+" : ""}${percentage}%` : value}
        </button>
        
        {/* Trend indicator */}
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive 
            ? 'bg-green-50 text-green-600' 
            : 'bg-red-50 text-red-600'
        }`}>
          {isPositive ? (
            <BsGraphUpArrow className="text-xs" />
          ) : (
            <BsGraphDownArrow className="text-xs" />
          )}
          <span>{Math.abs(percentage)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboardOverviewStatCard;
