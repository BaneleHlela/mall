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
      color: "#ef4444",
      icon: FaMoneyBills,
      gradient: "from-red-500 to-rose-500",
    },
    store.trades.includes("products")
      ? {
          title: "Orders Completed",
          value: "R120k",
          percentage: 10,
          color: "#f59e0b",
          icon: PiPackageFill,
          gradient: "from-amber-500 to-orange-500",
        }
      : null,
    store.trades.length > 0
      ? {
          title: "Revenue",
          value: "120k",
          percentage: -5,
          color: "#8b5cf6",
          icon: GiMoneyStack,
          gradient: "from-purple-500 to-violet-500",
        }
      : null,
    {
      title: "Total Visits",
      value: "500k",
      percentage: 10,
      color: "#22c55e",
      icon: FaDoorOpen,
      gradient: "from-green-500 to-emerald-500",
    },
  ].filter(Boolean) as Array<{
    title: string;
    value: string;
    percentage: number;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
  }>;

  // Desktop layout
  if (!isMobile) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden"
          >
            {/* Background gradient decoration */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500`} />
            
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
          </div>
        ))}
      </div>
    );
  }

  // Mobile swiper layout
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={12}
        slidesPerView={1.1}
        loop={true}
        className="px-1"
      >
        {cards.map((card, idx) => (
          <SwiperSlide key={idx}>
            <div className="group relative bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden">
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full -translate-y-6 translate-x-6`} />
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StoreDashboardStatCardsBoard;
