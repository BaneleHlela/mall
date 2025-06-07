import { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactCalendar from "../../../extras/react_calendar/ReactCalendar";
import { getAvailableBookingTimes } from "../../../../../features/bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useParams } from "react-router-dom";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const FirstBookWithCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const { storeId } = useParams<{ storeId: string }>();
  const store = useAppSelector((state) => state.stores.storesById[storeId as string]);
  const availableTimes = useAppSelector((state) => state.booking?.availableTimes || {});
  console.log("Available Times:", availableTimes);
  const formattedDate = selectedDate instanceof Date ? format(selectedDate, "yyyy-MM-dd") : null;
  const timesForDate = formattedDate ? availableTimes[formattedDate] || [] : [];

  const { team } = store || {};
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (selectedDate && selectedDate instanceof Date) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      dispatch(getAvailableBookingTimes({
        storeId: storeId as string,
        serviceId: "683eebf16c24fa2e493f385b",
        date: formattedDate,
        staffId: "682c375485e576ae51b91a07"
      }));
    }
  }, [selectedDate, storeId, dispatch]);

    return (
        <div 
            className="relative w-[100dvw] h-[100vh] flex items-center justify-center bg-white"
        >   
            {/* More "services" */}
            <div className="absolute top-0 h-[45dvh] w-[70dvw] bg-orange-500 z-1">

            </div>
            {/* Make Booking */}
            <div className="flex flex-row h-[75dvh] w-[65dvw] bg-pink-800 z-2">
                {/* Select a Date*/}
                <div className="h-full w-[32%] bg-black">
                    <div className="h-[10vh] w-full bg-white border-b-3 border-gray-300">
                        Select a date 
                    </div>
                    <div>
                        <ReactCalendar onChange={setSelectedDate} value={selectedDate} />
                    </div>
                </div>
                {/* Choose available slot */}
                <div className="h-full w-[32%] bg-white">
                    <div className="h-[10vh] w-fullbg-white border-b-3 border-gray-300">
                        Choose available slot
                    </div>
                    {formattedDate ? (
                        timesForDate.length === 0 ? (
                        <p>No available times for {formattedDate}.</p>
                        ) : (
                        <ul>
                            {timesForDate.map((time, i) => (
                            <li key={i}>{time}</li>
                            ))}
                        </ul>
                        )
                    ) : (
                        <p>Please select a date to view available times.</p>
                    )}
                </div>
                {/* Gap */}
                <div className="h-full w-[4%] bg-transparent"></div>
                {/* Service Details */}
                <div className="h-full w-[32%] bg-black">
                    <div className="h-[10vh] w-full bg-white border-b-3 border-gray-300">
                        Service details
                    </div>
                    
                </div>
            </div>
            {/* Background pattern */}
            <div className="bg-amber-900 absolute right-[12dvw] h-[55dvh] w-[55dvw] z-0">
                
            </div>
        </div>
        
    )
}

export default FirstBookWithCalendar;

// <div>
//     <ReactCalendar onChange={setSelectedDate} value={selectedDate} />
// </div>