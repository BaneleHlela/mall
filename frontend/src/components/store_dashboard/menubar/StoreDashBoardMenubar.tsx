import { Link } from "react-router-dom";
import { LayoutDashboard, ChartArea, ShoppingBag, ClockArrowUp, CalendarArrowUp, UsersRound, HandHelping, Settings, Images  } from "lucide-react";

interface Props {
  storeId: string | undefined;
}

const StoreDashBoardMenubar = ({ storeId }: Props) => {
  return (
    <div className="w-[20vw] h-screen bg-blue-400">
      <Link to={`/dashboard/${storeId}`}>
        <ChartArea />
      </Link>
      <Link to={`/dashboard/${storeId}/team`}>
        <UsersRound />
      </Link>
      <Link to={`/dashboard/${storeId}/layouts`}>
        <LayoutDashboard />
      </Link>
      <Link to={`/dashboard/${storeId}/products`}>
        <ShoppingBag />
      </Link>
      <Link to={`/dashboard/${storeId}/services`}>
        <HandHelping />
      </Link>
      <Link to={`/dashboard/${storeId}/orders`}>
        <ClockArrowUp />
      </Link>
      <Link to={`/dashboard/${storeId}/bookings`}>
        <CalendarArrowUp />
      </Link>
      <Link to={`/dashboard/${storeId}/images`}>
        <Images />
      </Link>
      <Link to={`/dashboard/${storeId}/settings`}>
        <Settings />
      </Link>
    </div>
  );
};

export default StoreDashBoardMenubar;
