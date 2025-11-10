import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import StoreDashboardOverviewStatCard from "../cards/StoreDashboardOverviewStatCard";
import { GiMoneyStack } from "react-icons/gi";
import { useAppSelector } from "../../../app/hooks";
import { PiPackageFill } from "react-icons/pi";
import { FaDoorOpen } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

export const StoreDashboardStatCardsBoard = () => {
  const store = useAppSelector((state) => state.storeAdmin.store);
  const [timeframe, setTimeframe] = useState<"today" | "week" | "month">("today");
  const [showPercentage, setShowPercentage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const blur = true;

  const cycleTimeframe = (current: "today" | "week" | "month") =>
    current === "today" ? "week" : current === "week" ? "month" : "today";

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!store) {
    return <div>store not found...</div>;
  }

  const cards = [
    {
      title: "Bill",
      value: "R123.47",
      percentage: 10,
      color: "#ff0000",
      icon: FaMoneyBills,
    },
    store.trades.includes("products")
      ? {
          title: "Orders Completed",
          value: "R120k",
          percentage: 10,
          color: "#ffb000",
          icon: PiPackageFill,
        }
      : null,
    store.trades.length > 0
      ? {
          title: "Revenue",
          value: "120k",
          percentage: -5,
          color: "#8b5cf6",
          icon: GiMoneyStack,
        }
      : null,
    {
      title: "Total Visits",
      value: "500k",
      percentage: 10,
      color: "#22c55e",
      icon: FaDoorOpen,
    },
  ].filter(Boolean);

  // Desktop layout
  if (!isMobile) {
    return (
      <div className="border-3 border-white h-[16%] w-full rounded-[1.5vh]">
        <div className={`flex flex-row items-center justify-center w-full bg-white h-full  py-[2vh] px-[2vh] space-x-[2vh] rounded-[1.5vh] shadow-[0px_14px_13px_-19px_rgba(0,_0,_0,_0.1)]
          ${blur && "bg-white/20 ring-1 ring-black/5 shadow blur"} 
        `}>
          {cards.map((card, idx) => (
            <div key={idx} className="flex items-center space-x-[2vh]">
              <StoreDashboardOverviewStatCard
                title={card.title}
                value={card.value}
                percentage={card.percentage}
                timeframe={timeframe}
                onTimeframeChange={() => setTimeframe((prev) => cycleTimeframe(prev))}
                showPercentage={showPercentage}
                onValueToggle={() => setShowPercentage((prev) => !prev)}
                icon={card.icon}
                color={card.color}
              />
              {idx !== cards.length - 1 && (
                <div className="w-[.1vh] h-[80%] bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mobile swiper layout
  return (
    <div className="border-2 w-full border-white rounded-[1.5vh]">
      <div className={`w-full bg-white py-[2vh] px-[1vh] rounded-[1.5vh] shadow-[0px_14px_13px_-19px_rgba(0,_0,_0,_0.1)]
          ${blur && "ring-1 ring-black/5 shadow blur"}
        `}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx}>
              <StoreDashboardOverviewStatCard
                title={card.title}
                value={card.value}
                percentage={card.percentage}
                timeframe={timeframe}
                onTimeframeChange={() => setTimeframe((prev) => cycleTimeframe(prev))}
                showPercentage={showPercentage}
                onValueToggle={() => setShowPercentage((prev) => !prev)}
                icon={card.icon}
                color={card.color}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StoreDashboardStatCardsBoard;
