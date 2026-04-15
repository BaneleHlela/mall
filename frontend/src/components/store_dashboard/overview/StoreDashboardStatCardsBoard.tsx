import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import StoreDashboardOverviewStatCard from "../cards/StoreDashboardOverviewStatCard";
import { GiMoneyStack } from "react-icons/gi";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { PiPackageFill } from "react-icons/pi";
import { FaDoorOpen } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { fetchVisitStats } from "../../../features/visits/visitSlice";
import { fetchBillingStats } from "../../../features/billing/billingSlice";

type CardType = "bill" | "orders" | "revenue" | "visits";

export const StoreDashboardStatCardsBoard = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.storeAdmin.store);
  const visitStats = useAppSelector((state) => state.visits.stats);
  const billingStats = useAppSelector((state) => state.billing.stats);
  const [cardTimeframes, setCardTimeframes] = useState<Record<CardType, "today" | "week" | "month">>({
    bill: "today",
    orders: "today",
    revenue: "today",
    visits: "today",
  });
  const [showPercentage, setShowPercentage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cycleTimeframe = (current: "today" | "week" | "month") =>
    current === "today" ? "week" : current === "week" ? "month" : "today";

  const handleTimeframeChange = (cardType: CardType) => {
    const newTimeframe = cycleTimeframe(cardTimeframes[cardType]);
    setCardTimeframes(prev => ({ ...prev, [cardType]: newTimeframe }));
    if (cardType === "visits" && store?._id) {
      dispatch(fetchVisitStats({ storeId: store._id, timeframe: newTimeframe }));
    } else if (cardType === "bill" && store?._id) {
      dispatch(fetchBillingStats({ storeId: store._id, timeframe: newTimeframe }));
    }
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch initial stats
  useEffect(() => {
    if (store?._id) {
      dispatch(fetchBillingStats({ storeId: store._id, timeframe: "today" }));
      dispatch(fetchVisitStats({ storeId: store._id, timeframe: "today" }));
    }
  }, [store?._id, dispatch]);

  if (!store) {
    return <div>store not found...</div>;
  }

  const cards = [
    {
      title: "Bill",
      value: billingStats ? `R${billingStats.amount.toFixed(2)}` : "R0.00",
      percentage: billingStats?.percentage || 0,
      color: "#ef4444",
      icon: FaMoneyBills,
      gradient: "from-red-500 to-rose-500",
      cardType: "bill" as CardType,
    },
    store.trades.includes("products")
      ? {
          title: "Orders Completed",
          value: "R120k",
          percentage: 10,
          color: "#f59e0b",
          icon: PiPackageFill,
          gradient: "from-amber-500 to-orange-500",
          cardType: "orders" as CardType,
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
          cardType: "revenue" as CardType,
        }
      : null,
    {
      title: "Total Visits",
      value: visitStats ? `${visitStats.count}` : "0",
      percentage: visitStats?.percentage || 0,
      color: "#22c55e",
      icon: FaDoorOpen,
      gradient: "from-green-500 to-emerald-500",
      cardType: "visits" as CardType,
    },
  ].filter(Boolean) as Array<{
    title: string;
    value: string;
    percentage: number;
    color: string;
    icon: IconType;
    gradient: string;
    cardType: CardType;
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
              timeframe={cardTimeframes[card.cardType]}
              onTimeframeChange={() => handleTimeframeChange(card.cardType)}
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
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        spaceBetween={12}
        slidesPerView={1}
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
                timeframe={cardTimeframes[card.cardType]}
                onTimeframeChange={() => handleTimeframeChange(card.cardType)}
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
