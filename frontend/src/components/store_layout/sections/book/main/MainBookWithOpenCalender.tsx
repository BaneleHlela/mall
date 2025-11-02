import React, { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { format } from "date-fns";
import ReactCalendar from "../../../extras/react_calendar/ReactCalendar";
import { getAvailableBookingTimes, makeBooking } from "../../../../../features/bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import { convertTo12HourFormat } from "../../../../../utils/helperFunctions";
import type { Service } from "../../../../../types/serviceTypes";
import { formatDuration } from "../../../extras/cards/service/StoreServiceCard";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface MainBookWithOpenCalendarProps {
    service?: Service | null; 
}

const MainBookWithOpenCalendar: React.FC<MainBookWithOpenCalendarProps> = ({service}) => {
    // State to manage selected date, service, staff, and time
    const store = useAppSelector((state) => state.stores.currentStore);
    const [selectedDate, setSelectedDate] = useState<Value>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [note, setNote] = useState("");
    const [confirming, setConfirming] = useState(false);

    // Redux selectors to get store, available times, and services
    // const store = useAppSelector((state) => state.stores.storesById[storeId as string]);
    const availableTimes = useAppSelector((state) => state.booking?.availableTimes || {});
    const settings = useAppSelector(state => state.layoutSettings.bookService.main);
    const services = useAppSelector((state) => state.services.services);

    // variables
    const formattedDate = selectedDate instanceof Date ? format(selectedDate, "yyyy-MM-dd") : null;
    const timesForDate = formattedDate ? availableTimes[formattedDate] || [] : [];
    const [selectedService, setSelectedService] = useState<Service | null>(null); // State for selected service

    const staffOptions = selectedService?.performers || [];

    // Mobile dropdown handlers
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSlotSectionOpen, setIsSlotSectionOpen] = useState(false);

    useEffect(() => {
        if (service) {
            // Use provided service
            setSelectedService(service);
            setSelectedServiceId(service._id);
            setSelectedStaffId(service.performers?.[0]?.user || null);
        } else if (services.length > 0) {
            // Fallback to a random service if none provided
            const randomService = services[Math.floor(Math.random() * services.length)];
            setSelectedService(randomService);
            setSelectedServiceId(randomService._id);
            setSelectedStaffId(randomService.performers?.[0]?.user || null);
        }
    }, [service, services]);
    

    const dispatch = useAppDispatch();
    


    useEffect(() => {
    if (selectedDate instanceof Date && selectedServiceId && selectedStaffId) {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const result = dispatch(getAvailableBookingTimes({
            storeId: store?._id as string,
            serviceId: selectedServiceId,
            date: formattedDate,
            staffId: selectedStaffId,
        }));
        console.log(result);
    }
    }, [selectedDate, selectedServiceId, selectedStaffId, store?._id, dispatch]);

    const handleBooking = () => {
        if (!selectedService || !selectedStaffId || !formattedDate || !selectedTime) {
          alert("Please select a service, staff, date, and time.");
          return;
        }
      
        const bookingData = {
          store: store?._id,
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
        <div
            style={{
                border: "none",
                padding: "0px"
            }}
            className="flex flex-col items-center"
        >
            {/* Desktop */}
            <div 
                style={{
                    height: settings.background.height.desktop,
                    ...getBackgroundStyles(settings.background),
                    ...getBorderStyles(settings.background.border),
                }}
                className="hidden w-full lg:flex flex-row z-2 min-h-fit "
            >
                {/* Service Details */}
                <div className="h-full w-[32%]">
                    {/* Title */}
                    <div 
                        style={{ 
                            ...getTextStyles(settings.titles.text), 
                            borderBottom: `${settings.titles.background.border.width} ${settings.titles.background.border.style} ${settings.titles.background.border.color}`,
                        }}
                        className=" w-full flex flex-col justify-end +  border-gray-300"
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
                            <div className="relative mt-[1.2vh]">
                                <Listbox.Button 
                                    style={{
                                        ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                                        ...getTextStyles(settings.serviceDetails.buttons.text),
                                    }}
                                    className="w-full text-left flex flex-row justify-between items-center"
                                >
                                    {selectedServiceId ? services.find(s => s._id === selectedServiceId)?.name : 'Select a service'}
                                    <IoIosArrowDown/>
                                </Listbox.Button>
                                <Listbox.Options 
                                    style={{
                                        ...getTextStyles(settings.serviceDetails.buttons.text),
                                        ...getBackgroundStyles(settings.serviceDetails.buttons.background.dropdown),
                                    }}
                                    className="absolute bg-white w-full max-h-[300px] hide-scrollbar overflow-scroll  border-2 border-gray-200 rounded-none  z-10"
                                >
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
                            <div className="relative mt-[.3vh]">
                            <Listbox.Button
                                style={{
                                    ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                                    ...getTextStyles(settings.serviceDetails.buttons.text)
                                }}
                                className={`w-full text-left flex flex-row justify-between items-center`}
                            >
                                {selectedStaffId
                                ? staffOptions.find((s) => s.user === selectedStaffId)?.name
                                : "Select a staff member"}
                                <IoIosArrowDown/>
                            </Listbox.Button>
                            <Listbox.Options
                                style={{
                                    ...getTextStyles(settings.serviceDetails.buttons.text),
                                    ...getBackgroundStyles(settings.serviceDetails.buttons.background.dropdown),
                                }}
                                className="absolute z-10 bg-white mt-1 w-full  border-2 border-gray-200 shadow-sm max-h-60 overflow-auto focus:outline-none rounded-none"
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
                                
                            }}
                            className="mt-5"
                        >
                            <label
                                style={{
                                    ...getTextStyles(settings.serviceDetails.text)
                                }} 
                                className="block text-sm mb-2 text-white" htmlFor="note">
                                Message (optional)
                            </label>
                            <textarea
                                style={{
                                    ...getBackgroundStyles(settings.serviceDetails.messageBox.textArea.background),
                                    ...getTextStyles(settings.serviceDetails.messageBox.text),
                                }}
                                id="note"
                                rows={4}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full p-2"
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
                <div className="h-full w-[32%] ">
                    <div 
                        style={{ 
                            ...getTextStyles(settings.titles.text),
                            borderBottom: `${settings.titles.background.border.width} ${settings.titles.background.border.style} ${settings.titles.background.border.color}`,
                        }}
                        className=" w-full flex flex-col justify-end 0  border-b-3 border-gray-300"
                    >
                        <p>Select a date</p> 
                    </div>
                    <div>
                        <ReactCalendar onChange={setSelectedDate} value={selectedDate} />
                    </div>
                </div>
                {/* Choose available slot */}
                <div className="h-full w-[32%] ">
                    <div 
                        style={{ 
                            ...getTextStyles(settings.titles.text),
                            borderBottom: `${settings.titles.background.border.width} ${settings.titles.background.border.style} ${settings.titles.background.border.color}`, 
                        }}
                        className="w-full flex flex-col justify-end 0  border-b-3 border-gray-300 line-clamp-1"
                    >
                        Choose available slot
                    </div>
                    <div>
                        <p
                            style={{
                                ...getTextStyles(settings.availableSlots.selectedDate.text)
                            }}
                            className="ml-[.6vh] mt-[1.2vh] mb-[1.2vh] text-gray-700"
                        >
                            Selected Date: {formattedDate ? `${formattedDate}, ${new Date(formattedDate).toLocaleDateString('en-US', { weekday: 'long' })}` : "None"}
                        </p>
                    </div>
                    <div className="h-[350px] overflow-y-scroll hide-scrollbar">
                        {formattedDate ? (
                            timesForDate.length === 0 ? (
                                <p className="ml-[.6vh]">No available times for {formattedDate}.</p>
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
                                            className={`p-2 ml-[.6vh] mr-2 border text-center hover:scale-102 ${
                                                selectedTime === time ? "scale-115" : ""
                                            }`}
                                        >
                                            {convertTo12HourFormat(time)}
                                        </button>
                                    ))}
                                </div>
                            )
                            ) : (
                            <p className="ml-[.6vh]">Please select a date to view available times.</p>
                        )}
                    </div>    
                </div>  
            </div>
            {/* Mobile */}
            <div className="w-[100vw] min-h-fit px-[.6vh] flex flex-col justify-center lg:hidden">
                <div className="">
                    {/* Select a Date*/}
                    <div className="w-full">
                        <div 
                            style={{ 
                                ...getTextStyles(settings.titles.text),
                                borderBottom: `${settings.titles.background.border.width} ${settings.titles.background.border.style} ${settings.titles.background.border.color}`,
                            }}
                            className="w-full flex flex-row justify-between items-center pt-2 pb-1 pl-2 border-b-3 border-gray-300 cursor-pointer"
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        >
                            <p>Select a date</p>
                            <motion.div
                                initial={false}
                                animate={{ rotate: isCalendarOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm pr-2"
                            >
                            ▼
                            </motion.div>
                        </div>
                        <AnimatePresence>
                            {isCalendarOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ReactCalendar onChange={setSelectedDate} value={selectedDate} />
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Choose available slot */}
                    <div className="w-full">
                        <div 
                            style={{ 
                                ...getTextStyles(settings.titles.text),
                                borderBottom: `${settings.titles.background.border.width} ${settings.titles.background.border.style} ${settings.titles.background.border.color}`, 
                            }}
                            className="w-full flex flex-row justify-between items-center pl-2 pt-2 border-b-3 border-gray-300 cursor-pointer"
                            onClick={() => setIsSlotSectionOpen(!isSlotSectionOpen)}
                        >
                            <p className="line-clamp-1">Choose available slot</p>
                            <motion.div
                                initial={false}
                                animate={{ rotate: isSlotSectionOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm pr-2 "
                            >
                            ▼
                            </motion.div>
                        </div>
                        <AnimatePresence>
                            {isSlotSectionOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                <p
                                    style={{
                                        ...getTextStyles(settings.availableSlots.selectedDate.text)
                                    }}
                                    className="ml-[.6vh] mt-[1.2vh] mb-[1.2vh] text-gray-700"
                                >
                                    Selected Date: {formattedDate ? `${formattedDate}, ${new Date(formattedDate).toLocaleDateString('en-US', { weekday: 'long' })}` : "None"}
                                </p>
                                </div>
                                <div className="h-[350px] overflow-y-scroll hide-scrollbar">
                                {formattedDate ? (
                                    timesForDate.length === 0 ? (
                                    <p className="ml-[.6vh]">No available times for {formattedDate}.</p>
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
                                            className={`p-2 ml-[.6vh] mr-2 border text-center hover:scale-102 ${
                                                selectedTime === time ? "bg-gray-300" : ""
                                            }`}
                                        >
                                            {convertTo12HourFormat(time)}
                                        </button>
                                        ))}
                                    </div>
                                    )
                                ) : (
                                    <p className="ml-[.6vh]">Please select a date to view available times.</p>
                                )}
                                </div>
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Service Details */}
                    <div className="w-full">
                        {/* Title */}
                        <div 
                            style={{ 
                                ...getTextStyles(settings.titles.text), 
                                borderBottom: `${settings.titles.background.border.width} ${settings.titles.background.border.style} ${settings.titles.background.border.color}`,
                            }}
                            className="pl-2 w-full flex flex-col justify-end pt-2 pb-1  border-gray-300"
                        >
                            Service Details:
                        </div>
                        <div className="w-full p-2">
                            {/* <p
                                className="mt-2 mb-1"
                            >
                                Select Service
                            </p> */}
                            {/* 1. Service Dropdown */}
                            <Listbox value={selectedServiceId} onChange={setSelectedServiceId}>
                                <div className="relative mt-[1.2vh] mb-2">
                                    <Listbox.Button 
                                        style={{
                                            ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                                            ...getTextStyles(settings.serviceDetails.buttons.text),
                                        }}
                                        className="w-full text-left flex flex-row justify-between items-center"
                                    >
                                        {selectedServiceId ? services.find(s => s._id === selectedServiceId)?.name : 'Select a service'}
                                        <IoIosArrowDown />
                                    </Listbox.Button>
                                    <Listbox.Options 
                                        style={{
                                            ...getTextStyles(settings.serviceDetails.buttons.text),
                                            ...getBackgroundStyles(settings.serviceDetails.buttons.background.dropdown),
                                        }}
                                        className="absolute bg-white w-full max-h-[300px] hide-scrollbar overflow-scroll  border-2 border-gray-200 rounded-none  z-10"
                                    >
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
                                    className={`w-full text-left flex flex-row justify-between items-center px-1`}
                                >
                                    {selectedStaffId
                                    ? staffOptions.find((s) => s.user === selectedStaffId)?.name
                                    : "Select a staff member"}
                                    <IoIosArrowDown />
                                </Listbox.Button>
                                <Listbox.Options
                                    style={{
                                        ...getTextStyles(settings.serviceDetails.buttons.text),
                                        ...getBackgroundStyles(settings.serviceDetails.buttons.background.dropdown),
                                    }}
                                    className="absolute z-10 bg-white mt-1 w-full  border-2 border-gray-200 shadow-sm max-h-60 overflow-auto focus:outline-none rounded-none"
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
                                    ...getTextStyles(settings.serviceDetails.text),
                                    
                                }}
                                className="mt-5"
                            >
                                <label
                                    style={{
                                        textDecoration: "none",
                                    }} 
                                    className="block text-sm mb-2" htmlFor="note"
                                >
                                    Message (optional)
                                </label>
                                <textarea
                                    style={{
                                        ...getBackgroundStyles(settings.serviceDetails.messageBox.textArea.background),
                                        ...getTextStyles(settings.serviceDetails.messageBox.text),
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
                </div>
            </div>
        </div>
        
    )
}

export default MainBookWithOpenCalendar;

