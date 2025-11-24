import ComingSoon from "../../../components/the_mall/ComingSoon";

const StoreBookings = () => {
  const ready = false;
  if (!ready) {
    return (
      <div className="h-full w-full p-[.3vh] rounded-[2vh] overflow-hidden">
        <div className="w-full h-full lg:px-[2vh] rounded overflow-hidden">
           <ComingSoon message="Booking management will be ready before launch! The Mall team is working to bring smooth booking tracking and fulfillment to your dashboard." />
        </div>
      </div>
    )
  }
  return (
    <div>StoreBookings</div>
  )
}

export default StoreBookings