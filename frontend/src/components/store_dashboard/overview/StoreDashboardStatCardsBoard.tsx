import { useState } from "react";
import StoreDashboardOverviewStatCard from "../cards/StoreDashboardOverviewStatCard";
import { GiMoneyStack } from "react-icons/gi";
import { useAppSelector } from "../../../app/hooks";
import { PiPackageFill } from "react-icons/pi";
import { FaDoorOpen, FaMoneyBill } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

export const StoreDashboardStatCardsBoard = () => {
  const store = useAppSelector((state) => state.storeAdmin.store);
  const [timeframe, setTimeframe] = useState<"today" | "week" | "month">("today");
  const [showPercentage, setShowPercentage] = useState(false);

  const cycleTimeframe = (current: "today" | "week" | "month") => {
    return current === "today" ? "week" : current === "week" ? "month" : "today";
  };

  
  if (!store) {
    return (
      <div className="">store not found... </div>
    )
  }
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full bg-white h-[16%] py-[2vh] px-[2vh] space-x-[2vh] rounded-[1.5vh] shadow-[0px_14px_13px_-19px_rgba(0,_0,_0,_0.1)]">
        <StoreDashboardOverviewStatCard
          title="Bill"
          value={"R123.47"}
          percentage={10}
          timeframe={timeframe}
          onTimeframeChange={() => setTimeframe(prev => cycleTimeframe(prev))}
          showPercentage={showPercentage}
          onValueToggle={() => setShowPercentage(prev => !prev)}
          icon={FaMoneyBills}
          color={"#ff0000"}
        />
        <div className="w-[.1vh] h-[80%] bg-gray-300"></div>
        {store.trades.includes("products") && (
          <StoreDashboardOverviewStatCard
            title="Orders Completed"
            value={"R120k"}
            percentage={10}
            trend="up"
            timeframe={timeframe}
            onTimeframeChange={() => setTimeframe(prev => cycleTimeframe(prev))}
            showPercentage={showPercentage}
            onValueToggle={() => setShowPercentage(prev => !prev)}
            icon={PiPackageFill}
            color={"#ffb000"}
          />
        )}
        <div className="w-[.1vh] h-[80%] bg-gray-300"></div>
        {store.trades.length > 0 && (
          <StoreDashboardOverviewStatCard
            title="Revenue"
            value={"120k"}
            percentage={-5}
            trend="down"
            timeframe={timeframe}
            onTimeframeChange={() => setTimeframe(prev => cycleTimeframe(prev))}
            showPercentage={showPercentage}
            onValueToggle={() => setShowPercentage(prev => !prev)}
            icon={GiMoneyStack}
            color={"#8b5cf6"}
          />
        )}
        <div className="w-[.1vh] h-[80%] bg-gray-300"></div>
        <StoreDashboardOverviewStatCard
          title="Total Visits"
          value={"500k"}
          percentage={10}
          trend="up"
          timeframe={timeframe}
          onTimeframeChange={() => setTimeframe(prev => cycleTimeframe(prev))}
          showPercentage={showPercentage}
          onValueToggle={() => setShowPercentage(prev => !prev)}
          icon={FaDoorOpen}
          color={"#22c55e"}
        />
        {/* <div className="w-[.1vh] h-[80%] bg-gray-300"></div>
        <StoreDashboardOverviewStatCard
          title="Unique Visits"
          value={"R85.2k"}
          percentage={10}
          trend="up"
          timeframe={timeframe}
          onTimeframeChange={() => setTimeframe(prev => cycleTimeframe(prev))}
          showPercentage={showPercentage}
          onValueToggle={() => setShowPercentage(prev => !prev)}
          icon={FaUser}
          color={"#3b82f6"}
        /> */}
        
      </div>
    </>
  );
}

export default StoreDashboardStatCardsBoard;
