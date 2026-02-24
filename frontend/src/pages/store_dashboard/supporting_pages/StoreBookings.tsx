import { IoWatch } from "react-icons/io5";
import ComingSoon from "../../../components/the_mall/ComingSoon";

const StoreBookings = () => {
  const ready = false;
  if (!ready) {
    return (
      <div className="h-full w-full p-[.3vh] rounded-[2vh] overflow-hidden">
        <div className="w-full h-full lg:px-[2vh] rounded overflow-hidden">
          <ComingSoon
            title="Available on Launch" 
            message="Booking management will be ready before launch! The Mall team is working to bring smooth booking tracking and fulfillment to your dashboard."
            targetDate={new Date("2026-03-15")} 
            icon={<IoWatch  className="text-white text-[3vh]"/>}
          />
        </div>
      </div>
    )
  }
  return (
    <div>StoreBookings</div>
  )
}

export default StoreBookings