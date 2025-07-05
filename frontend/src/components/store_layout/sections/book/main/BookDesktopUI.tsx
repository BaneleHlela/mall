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

const BookDesktopUI: React.FC<Props> = ({
  services,
  selectedService,
  selectedServiceId,
  setSelectedServiceId,
  selectedStaffId,
  setSelectedStaffId,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timesForDate,
  note,
  setNote,
  confirming,
  setConfirming,
  handleBooking,
  settings,
}) => {
  return (
    <div className="p-6 flex space-x-8">
      {/* Left column: service & staff selection */}
      <div className="flex-1 space-y-4">
        {/* Service Dropdown */}
        <div>
          <Listbox value={selectedServiceId} onChange={setSelectedServiceId}>
            <Listbox.Button
              style={{
                ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                ...getTextStyles(settings.serviceDetails.buttons.text),
              }}
              className="w-full text-left p-2"
            >
              {selectedService?.name || "Select Service"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-60 bg-white border max-h-60 overflow-auto z-10">
              {services.map((service) => (
                <Listbox.Option key={service._id} value={service._id} className="p-2 hover:bg-gray-100">
                  {service.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        {/* Staff Dropdown */}
        <div>
          <Listbox value={selectedStaffId} onChange={setSelectedStaffId}>
            <Listbox.Button
              style={{
                ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                ...getTextStyles(settings.serviceDetails.buttons.text),
              }}
              className="w-full text-left p-2"
            >
              {selectedService?.performers?.find((p) => p.user === selectedStaffId)?.name || "Select Staff"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-60 bg-white border max-h-60 overflow-auto z-10">
              {selectedService?.performers?.map((performer) => (
                <Listbox.Option key={performer.user} value={performer.user} className="p-2 hover:bg-gray-100">
                  {performer.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        {/* Date Dropdown */}
        <div>
          <Listbox value={selectedDate} onChange={setSelectedDate}>
            <Listbox.Button
              style={{
                ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                ...getTextStyles(settings.serviceDetails.buttons.text),
              }}
              className="w-full text-left p-2"
            >
              {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Select a date"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-60 bg-white border max-h-60 overflow-auto z-10">
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

        {/* Time Dropdown */}
        <div>
          <Listbox value={selectedTime} onChange={setSelectedTime}>
            <Listbox.Button
              style={{
                ...getBackgroundStyles(settings.serviceDetails.buttons.background),
                ...getTextStyles(settings.serviceDetails.buttons.text),
              }}
              className="w-full text-left p-2"
            >
              {selectedTime || "Select a time slot"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-60 bg-white border max-h-60 overflow-auto z-10">
              {timesForDate.map((time, idx) => (
                <Listbox.Option key={idx} value={time} className="p-2 hover:bg-gray-100">
                  {time}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      {/* Right column: summary & confirm */}
      <div className="flex-1 space-y-4">
        <div style={{ ...getTextStyles(settings.serviceDetails.text) }}>
          <h3 className="font-semibold text-lg">{selectedService?.name || "No service selected"}</h3>
          <p>{selectedDate ? format(selectedDate, "yyyy-MM-dd") : "No date selected"} {selectedTime && `at ${selectedTime}`}</p>
          <p>{selectedService?.price ? `R${selectedService.price.toFixed(2)}` : "Free / N/A"}</p>
          <p>{selectedService?.duration ? formatDuration(selectedService.duration) : "N/A"}</p>
        </div>

        {/* Message box */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            ...getBackgroundStyles(settings.serviceDetails.messageBox.textArea.background),
          }}
          className="w-full p-2 border"
          placeholder="Optional note..."
        ></textarea>

        {/* Confirm buttons */}
        <div className="flex space-x-4">
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
    </div>
  );
};

export default BookDesktopUI;
