import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { format } from "date-fns";
import ReactCalendar from "../../../extras/react_calendar/ReactCalendar";
import { getAvailableBookingTimes, makeBooking } from "../../../../../features/bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useParams } from "react-router-dom";
import { getTextStyles } from "../../../../../utils/stylingFunctions";
import { convertTo12HourFormat } from "../../../../../utils/helperFunctions";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const FirstStoreBookSection = () => {
    const { storeId } = useParams<{ storeId: string }>();
    if (!storeId) {
    throw new Error("Store ID is required");
    }
    // State to manage selected date, service, staff, and time
    const [selectedDate, setSelectedDate] = useState<Value>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [note, setNote] = useState("");
    const [confirming, setConfirming] = useState(false);

    // Redux selectors to get store, available times, and services
    // const store = useAppSelector((state) => state.stores.storesById[storeId as string]);
    const availableTimes = useAppSelector((state) => state.booking?.availableTimes || {});
    const settings = useAppSelector((state) => state.layoutSettings.bookWithCalendar);
    const services = useAppSelector((state) => state.services.services);
    console.log("Available Times:", availableTimes);

    // variables
    const formattedDate = selectedDate instanceof Date ? format(selectedDate, "yyyy-MM-dd") : null;
    const timesForDate = formattedDate ? availableTimes[formattedDate] || [] : [];
    const selectedService = services.find((s) => s._id === selectedServiceId);
    const staffOptions = selectedService?.performers || [];

    const dispatch = useAppDispatch();
    


    useEffect(() => {
    if (selectedDate instanceof Date && selectedServiceId && selectedStaffId) {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        dispatch(getAvailableBookingTimes({
        storeId: storeId as string,
        serviceId: selectedServiceId,
        date: formattedDate,
        staffId: selectedStaffId,
        }));
    }
    }, [selectedDate, selectedServiceId, selectedStaffId, storeId, dispatch]);

    // const handleBooking = () => {
    //     if (!selectedService || !selectedStaffId || !formattedDate || !selectedTime) {
    //       alert("Please select a service, staff, date, and time.");
    //       return;
    //     }
      
    //     const staffInfo = selectedService.performers?.find(
    //       performer => performer.user === selectedStaffId
    //     );
      
    //     const staffName = staffInfo?.name || "Unknown";
      
    //     console.log("Booking confirmed with data:", {
    //       serviceName: selectedService.name,
    //       staffName,
    //       staffId: selectedStaffId,
    //       date: formattedDate,
    //       time: selectedTime,
    //       note,
    //       price: selectedService.price,
    //       duration: selectedService.duration,
    //     });
      
    //     // Booking logic here (e.g., dispatch or API call)
      
    //     setConfirming(false);
    // };


    const handleBooking = () => {
        if (!selectedService || !selectedStaffId || !formattedDate || !selectedTime) {
          alert("Please select a service, staff, date, and time.");
          return;
        }
      
        const bookingData = {
          store: storeId,
          services: [
            {
              service: selectedService._id,
              date: formattedDate,
              time: selectedTime,
              notes: note,
              staff: selectedStaffId,
            },
          ],
        };
      
        dispatch(makeBooking(bookingData))
            .unwrap()
            .then(() => {
                alert("Booking successful!");
                setConfirming(false);
                // Optionally reset fields here
            })
            .catch((error) => {
                alert("Booking failed: " + error);
                setConfirming(false);
            });
    };
    
    console.log(note);

    return (
        <div 
            className="relative w-[100dvw] h-[100vh] flex items-center justify-center bg-blue-900"
        >   
            {/* More "services" */}
            <div className="absolute top-0 h-[45dvh] w-[70dvw] bg-orange-500 z-1">

            </div>
            {/* Make Booking */}
            <div className="flex flex-row h-[80dvh] w-[65dvw] bg-white z-2 ">
                {/* Select a Date*/}
                <div className="h-full w-[32%] bg-white ml-3">
                    <div 
                        style={{ 
                            ...getTextStyles(settings.titles.text) 
                        }}
                        className="h-[10vh] w-full flex flex-col justify-end pb-3 pl-3 bg-white border-b-3 border-gray-300"
                    >
                        <p>Select a date</p> 
                    </div>
                    <div>
                        <ReactCalendar onChange={setSelectedDate} value={selectedDate} />
                    </div>
                </div>
                {/* Choose available slot */}
                <div className="h-full w-[32%] bg-white">
                    <div 
                        style={{ 
                            ...getTextStyles(settings.titles.text) 
                        }}
                        className="h-[10vh] w-full flex flex-col justify-end pb-3 pl-3 bg-white border-b-3 border-gray-300"
                    >
                        Choose available slot
                    </div>
                    <div>
                        <p
                            style={{
                                ...getTextStyles(settings.availableSlots.selectedDate.text)
                            }}
                            className="ml-2 mt-4 mb-4 text-gray-700"
                        >
                            Selected Date: {formattedDate ? `${formattedDate}, ${new Date(formattedDate).toLocaleDateString('en-US', { weekday: 'long' })}` : "None"}
                        </p>
                    </div>
                    <div className="">
                        {formattedDate ? (
                            timesForDate.length === 0 ? (
                                <p>No available times for {formattedDate}.</p>
                            ) : (
                                <div className="grid grid-cols-2 gap-1 mt-2">
                                    {timesForDate.map((time, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedTime(time)}
                                            style={{
                                                border: `${settings.availableSlots.timeSlot.border.width} ${settings.availableSlots.timeSlot.border.style} ${settings.availableSlots.timeSlot.border.color}`,
                                                ...getTextStyles(settings.availableSlots.timeSlot.text),
                                            }}
                                            className={`p-2 ml-2 mr-2 border text-center h-[5.5vh] ${
                                                selectedTime === time ? "bg-gray-300" : "bg-white"
                                            }`}
                                        >
                                            {convertTo12HourFormat(time)}
                                        </button>
                                    ))}
                                </div>
                            )
                            ) : (
                            <p>Please select a date to view available times.</p>
                        )}
                    </div>    
                </div>
                {/* Gap */}
                <div className="h-full w-[4%] bg-transparent"></div>
                {/* Service Details */}
                <div className="h-full w-[32%] mr-5">
                    {/* Title */}
                    <div 
                        style={{ 
                            ...getTextStyles(settings.titles.text) 
                        }}
                        className="h-[10vh] w-full flex flex-col justify-end pb-3 pl-3 bg-white border-b-3 border-gray-300"
                    >
                        Service Details
                    </div>
                    <div className="w-full p-0">
                        <p
                            className="mt-2 mb-1"
                        >
                            Select Service
                        </p>
                        {/* 1. Service Dropdown */}
                        <Listbox value={selectedServiceId} onChange={setSelectedServiceId}>
                        <div className="relative">
                            <Listbox.Button className="w-full border-2 border-gray-200 p-2 text-left rounded-none">
                            {selectedServiceId ? services.find(s => s._id === selectedServiceId)?.name : 'Select a service'}
                            </Listbox.Button>
                            <Listbox.Options className="absolute w-full border-2 border-gray-200 rounded-none bg-white z-10">
                            {services.map((service) => (
                                <Listbox.Option
                                key={service._id}
                                value={service._id}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                {service.name}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </div>
                        </Listbox>


                        {/* 2. Staff Dropdown */}
                        <div>
                        <p className="mt-2 mb-1">Select Server</p>
                        <Listbox
                            value={selectedStaffId}
                            onChange={setSelectedStaffId}
                            disabled={!selectedService}
                        >
                            <div className="relative">
                            <Listbox.Button
                                className={`w-full border-2 p-2 text-left ${
                                selectedService ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                } text-black rounded-none`}
                            >
                                {selectedStaffId
                                ? staffOptions.find((s) => s.user === selectedStaffId)?.name
                                : "Select a staff member"}
                            </Listbox.Button>
                            <Listbox.Options
                                className="absolute z-10 mt-1 w-full bg-white border-2 border-gray-200 shadow-sm max-h-60 overflow-auto focus:outline-none rounded-none"
                            >
                                {staffOptions.map((staff, idx) => (
                                <Listbox.Option
                                    key={idx}
                                    value={staff.user}
                                    className={({ active, selected }) =>
                                    `p-2 cursor-pointer ${
                                        active ? "bg-gray-100" : ""
                                    } ${selected ? "font-medium" : ""}`
                                    }
                                >
                                    {staff.name}
                                </Listbox.Option>
                                ))}
                            </Listbox.Options>
                            </div>
                        </Listbox>
                        </div>


                        {/* 3. Date and Time */}
                        <div
                            className="flex flex-row"
                        >
                            <label className="block">Date & Time: </label>
                            <p>{ formattedDate || "No date selected"} {selectedTime && `at ${selectedTime}`}</p>
                        </div>

                        {/* 4. Price */}
                        <div
                            className="flex flex-row"
                        >
                            <label className="block">Price: </label>
                            <p>{selectedService?.price ? `R${selectedService.price.toFixed(2)}` : "Free / N/A"}</p>
                        </div>

                        {/* 5. Duration */}
                        <div
                            className="flex flex-row"
                        >
                            <label className="block">Duration: </label>
                            <p>{selectedService?.duration ? `${selectedService.duration} minutes` : "N/A"}</p>
                        </div>
                        {/* Message / Notes */}
                        <div className="">
                            <label className="block text-sm mb-2" htmlFor="note">
                                Message (optional)
                            </label>
                            <textarea
                                id="note"
                                rows={4}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full p-2 rounded border border-gray-300 text-black"
                                placeholder="Write a note for the service provider..."
                            ></textarea>
                            <div className="px-4 mt-6">
                                {!confirming ? (
                                    <button
                                    onClick={() => setConfirming(true)}
                                    className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition"
                                    >
                                    Make Booking
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                    <p className="text-sm">Are you sure you want to book this slot?</p>
                                    <button
                                        onClick={handleBooking} // define this function
                                        className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition"
                                    >
                                        Confirm Booking
                                    </button>
                                    <button
                                        onClick={() => setConfirming(false)}
                                        className="w-full bg-red-500 text-black py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Cancel
                                    </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background pattern */}
            <div className="bg-amber-900 absolute right-[12dvw] h-[55dvh] w-[55dvw] z-0">
                
            </div>
        </div>
        
    )
}

export default FirstStoreBookSection;

