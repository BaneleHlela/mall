import React from "react";
import { Listbox } from "@headlessui/react";
import { format } from "date-fns";
import type { Service } from "../../../../../types/serviceTypes";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import { formatDuration } from "../../../extras/cards/service/StoreServiceCard";

interface Props {
  services: Service[];
  selectedService: Service | null;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  selectedStaffId: string | null;
  setSelectedStaffId: (id: string | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  timesForDate: string[];
  note: string;
  setNote: (v: string) => void;
  confirming: boolean;
  setConfirming: (v: boolean) => void;
  handleBooking: () => void;
  settings: any;
}

const BookMobileUI: React.FC<Props> = ({
  selectedDate,
  setSelectedDate,
  timesForDate,
  selectedTime,
  setSelectedTime,
  selectedService,
  note,
  setNote,
  confirming,
  setConfirming,
  handleBooking,
  settings,
}) => {
  return (
    <div className="p-4">
      {/* Date Dropdown */}
      <div className="mb-4">
        <Listbox value={selectedDate} onChange={setSelectedDate}>
          <Listbox.Button
            style={{
              ...getBackgroundStyles(settings.serviceDetails.buttons.background),
              ...getTextStyles(settings.serviceDetails.buttons.text),
            }}
            className="w-full text-left"
          >
            {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Select a date"}
          </Listbox.Button>
          <Listbox.Options className="absolute w-full bg-white border max-h-60 overflow-auto z-10">
            {[...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return (
                <Listbox.Option key={i} value={date} className="p-2 hover:bg-gray-100">
                  {format(date, "yyyy-MM-dd")}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Listbox>
      </div>

      {/* Time Slot Dropdown */}
      <div className="mb-4">
        <Listbox value={selectedTime} onChange={setSelectedTime}>
          <Listbox.Button
            style={{
              ...getBackgroundStyles(settings.serviceDetails.buttons.background),
              ...getTextStyles(settings.serviceDetails.buttons.text),
            }}
            className="w-full text-left"
          >
            {selectedTime || "Select a time slot"}
          </Listbox.Button>
          <Listbox.Options className="absolute w-full bg-white border max-h-60 overflow-auto z-10">
            {timesForDate.map((time, idx) => (
              <Listbox.Option key={idx} value={time} className="p-2 hover:bg-gray-100">
                {time}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      {/* Service Details */}
      <div style={{ ...getTextStyles(settings.serviceDetails.text) }}>
        <p>{selectedDate ? format(selectedDate, "yyyy-MM-dd") : "No date selected"} {selectedTime && `at ${selectedTime}`}</p>
        <p>{selectedService?.price ? `R${selectedService.price.toFixed(2)}` : "Free / N/A"}</p>
        <p>{selectedService?.duration ? formatDuration(selectedService?.duration) : "N/A"}</p>
      </div>

      {/* Message box */}
      <textarea
        style={{
          ...getBackgroundStyles(settings.serviceDetails.messageBox.textArea.background),
        }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full mt-4 p-2 border"
        placeholder="Optional note..."
      ></textarea>

      {/* Buttons */}
      <div className="mt-4 flex flex-col items-center space-y-2">
        {!confirming ? (
          <button
            style={{
              ...getBackgroundStyles(settings.serviceDetails.bookButton.background),
              ...getTextStyles(settings.serviceDetails.bookButton.text),
            }}
            onClick={() => setConfirming(true)}
          >
            Make Booking
          </button>
        ) : (
          <>
            <button
              style={{
                ...getBackgroundStyles(settings.serviceDetails.bookButton.background),
                ...getTextStyles(settings.serviceDetails.bookButton.text),
              }}
              onClick={handleBooking}
            >
              Confirm Booking
            </button>
            <button
              style={{
                ...getBackgroundStyles(settings.serviceDetails.bookButton.background),
                ...getTextStyles(settings.serviceDetails.bookButton.text),
              }}
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookMobileUI;
