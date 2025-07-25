import React, { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { format } from "date-fns";
import ReactCalendar from "../../../extras/react_calendar/ReactCalendar";
import { getAvailableBookingTimes, makeBooking } from "../../../../../features/bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useParams } from "react-router-dom";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import { convertTo12HourFormat } from "../../../../../utils/helperFunctions";
import type { Service } from "../../../../../types/serviceTypes";
import { formatDuration } from "../../../extras/cards/service/StoreServiceCard";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface SecondBookWithCalendarProps {
    service: Service | null; 
}

const SecondBookWithCalendar: React.FC<SecondBookWithCalendarProps> = ({service}) => {
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
    const [selectedService, setSelectedService] = useState<Service | null>(null); // State for selected service

    const staffOptions = selectedService?.performers || [];

    useEffect(() => {
        // Default to the passed service and its first performer
        if (service) {
            setSelectedService(service);
            setSelectedServiceId(service._id);
            setSelectedStaffId(service.performers?.[0]?.user || null);
        }
      }, [service]);

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
      
    return (
        <div className="flex flex-row px-4 bg-white z-2 ">
            {/* Service Details */}
            <div className="h-full w-[32%]">
                {/* Title */}
                <div 
                    style={{ 
                        ...getTextStyles(settings.titles.text), 
                        borderBottom: `${settings.titles.background.border.width} ${settings.titles.background.border.style} ${settings.titles.background.border.color}`,
                    }}
                    className="h-[10vh] w-full flex flex-col justify-end pb-3 bg-white border-gray-300"
                >
                    Service Details
                </div>
                <div className="w-full py-2">
                    {/* <p
                        className="mt-2 mb-1"
                    >
                        Select Service
                    </p> */}
                    {/* 1. Service Dropdown */}
                    <Listbox value={selectedServiceId} onChange={setSelectedServiceId}>
                        <div className="relative mt-4">
                            <Listbox.Button 
                                style={{
                                    ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                                    ...getTextStyles(settings.serviceDetails.buttons.text),
                                }}
                                className="w-full text-left"
                            >
                            {selectedServiceId ? services.find(s => s._id === selectedServiceId)?.name : 'Select a service'}
                            </Listbox.Button>
                            <Listbox.Options className="absolute w-full max-h-[300px] hide-scrollbar overflow-scroll  border-2 border-gray-200 rounded-none bg-white z-10">
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
                    {/* <p className="mt-2 mb-1">Select Server</p> */}
                    <Listbox
                        value={selectedStaffId}
                        onChange={setSelectedStaffId}
                        disabled={!selectedService}
                    >
                        <div className="relative mt-0">
                        <Listbox.Button
                            style={{
                                ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                                ...getTextStyles(settings.serviceDetails.buttons.text)
                            }}
                            className={`w-full border-2 p-2 text-left  text-black rounded-none`}
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
                    {/* Date, Price, Duration */}
                    <div 
                        style={{
                            ...getTextStyles(settings.serviceDetails.text)
                        }}
                        className="mt-5"
                    >
                        <p>{ formattedDate || "No date selected"} {selectedTime && `at ${selectedTime? selectedTime : "N/A"}`}</p>
                        <p>{selectedService?.price ? `R${selectedService.price.toFixed(2)}` : "Free / N/A"}</p>
                        <p>{selectedService?.duration ? formatDuration(selectedService?.duration) : "N/A"}</p>
                    </div>
                    {/* Message / Notes */}
                    <div 
                        style={{
                            ...getTextStyles(settings.serviceDetails.messageBox.text)
                        }}
                        className="mt-5"
                    >
                        <label className="block text-sm mb-2" htmlFor="note">
                            Message (optional)
                        </label>
                        <textarea
                            style={{
                                ...getBackgroundStyles(settings.serviceDetails.messageBox.textArea.background),
                            }}
                            id="note"
                            rows={4}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full p-2 rounded border border-gray-300 text-black"
                            placeholder="Write a optional note for the service provider..."
                        ></textarea>
                    </div>
                    <div className="px-4 mt-6 w-full flex flex-row justify-center">
                            {!confirming ? (
                                <button
                                    style={{
                                        ...getBackgroundStyles(settings.serviceDetails.bookButton.background),
                                        ...getTextStyles(settings.serviceDetails.bookButton.text),
                                    }}
                                    onClick={() => setConfirming(true)}
                                    className="hover:scale-102 transition"
                                >
                                Make Booking
                                </button>
                            ) : (
                                <div className="space-y-2 w-full flex flex-col items-center">
                                    <p className="text-sm">Are you sure you want to book this slot?</p>
                                    <button
                                        style={{
                                            ...getBackgroundStyles(settings.serviceDetails.bookButton.background),
                                            ...getTextStyles(settings.serviceDetails.bookButton.text),
                                            color: "green",
                                            fontWeight: "bold",
                                        }}
                                        onClick={handleBooking} 
                                        className=" text-green-600 hover:scale-102 transition"
                                    >
                                        Confirm Booking
                                    </button>
                                    <button
                                        style={{
                                            ...getBackgroundStyles(settings.serviceDetails.bookButton.background),
                                            ...getTextStyles(settings.serviceDetails.bookButton.text),
                                            color: "red",
                                            fontWeight: "bold",
                                        }}
                                        className=" text-red-600 hover:scale-102 transition"
                                        onClick={() => setConfirming(!confirming)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </div>
            {/* Gap */}
            <div className="h-full w-[4%] bg-transparent"></div>
            {/* Select a Date*/}
            <div className="h-full w-[32%] bg-white">
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
                    className="h-[10vh] w-full flex flex-col justify-end pb-3 pl-3 bg-white border-b-3 border-gray-300 line-clamp-1"
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
                <div className="h-[350px] overflow-y-scroll hide-scrollbar">
                    {formattedDate ? (
                        timesForDate.length === 0 ? (
                            <p className="ml-2">No available times for {formattedDate}.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-1 mt-2 h-full">
                                {timesForDate.map((time, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedTime(time)}
                                        style={{
                                            ...getBackgroundStyles(settings.availableSlots.timeSlot.background),
                                            ...getTextStyles(settings.availableSlots.timeSlot.text),
                                        }}
                                        className={`p-2 ml-2 mr-2 border text-center hover:scale-102 ${
                                            selectedTime === time ? "bg-gray-300" : ""
                                        }`}
                                    >
                                        {convertTo12HourFormat(time)}
                                    </button>
                                ))}
                            </div>
                        )
                        ) : (
                        <p className="ml-2">Please select a date to view available times.</p>
                    )}
                </div>    
            </div>  
        </div>
    )
}

export default SecondBookWithCalendar;

