import { FiPackage } from "react-icons/fi";
import ComingSoon from "../../../components/the_mall/ComingSoon";

const StoreOrders = () => {
  const ready = false;

  if (!ready) {
    return (
      <div className="h-full w-full p-[.3vh] rounded-[2vh] overflow-hidden">
        <div className="w-full h-full lg:px-[4vh] rounded overflow-hidden">
          <ComingSoon 
            message="Order handling will be ready before launch! The Mall team is working to bring smooth order tracking and fulfillment to your dashboard." 
            title="Available on Launch"
            icon={<FiPackage className="text-white text-[3vh]"/>}
            targetDate={new Date("2026-03-15")}
          />
        </div>
      </div>
    )
  }
  return (
    <div>StoreOrders</div>
  )
}

export default StoreOrders