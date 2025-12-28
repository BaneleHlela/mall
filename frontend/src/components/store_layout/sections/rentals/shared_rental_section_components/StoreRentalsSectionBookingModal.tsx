import { get } from "lodash";
import { useAppSelector } from "../../../../../app/hooks";
import { mockLayout } from "../../../../../major_updates/mockLayout";
import StoreLayoutButton from "../../../shared_layout_components/StoreLayoutButton";
import { getBackgroundStyles, getTextStyles } from "../../../../../utils/stylingFunctions";
import { ChevronDown } from "lucide-react";
import { HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { FaCalendar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import ReactCalendar from "../../../extras/react_calendar/ReactCalendar";
import { createPortal } from 'react-dom';

const modalRoot = document.body;

interface StoreRentalsSectionBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rentalName: string;
  rentalDuration: string;
}

const StoreRentalsSectionBookingModal: React.FC<StoreRentalsSectionBookingModalProps> = ({
  isOpen,
  onClose,
  rentalName,
  rentalDuration
}) => {
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  const config = useAppSelector(state => state.layoutSettings.sections.rentals.bookingModal) || get(mockLayout, 'sections.rentals.bookingModal');
  const rentals = useAppSelector((state) => state.rentals.rentals);
  const [isRentalsDropdownOpen, setIsRentalsDropdownOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState({ name: rentalName, duration: rentalDuration });
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const initialMonth = new Date();
  const [bookingForm, setBookingForm] = useState({
    rental: '',
    dates: [] as Date[],
  });

  const requiresRange = selectedRental.duration.includes('night') || selectedRental.duration.includes('week') || selectedRental.duration.includes('month');

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && selectedDates.length === 2) {
      const start = selectedDates[0];
      const end = selectedDates[1];
      if (date > start && date < end) {
        return 'in-between';
      }
    }
    return null;
  };

  const goToPreviousMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  // Update form
  useEffect(() => {
    setBookingForm({
      rental: selectedRental.name,
      dates: selectedDates,
    });
  }, [selectedRental, selectedDates]);

  if (!isOpen) return null;


  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ ...getBackgroundStyles(config.background, colors) }}
        className="relative flex flex-col lg:flex-row justify-center w-9/10 lg:w-[60vw] h-[35vh] lg:h-[15vh] p-2 mb:[5vh] lg:mb-[10vh]">
        {/* Select Dates */}
        <div className="w-full lg:w-7/20 px-[1vh] h-1/3 lg:h-full flex flex-col items-center justify-between text-start relative">
          {/* Title */}
          <p
            style={{
              ...getTextStyles(config.text.selectedDates, fonts, colors),
              textAlign: 'left',
            }}
            className="text-start">{config.text.selectedDates.input}</p>
          {/* Button */}
          <div
            onClick={() => {
              setIsCalendarDropdownOpen(!isCalendarDropdownOpen)
              setIsRentalsDropdownOpen(false);
            }}
            style={{
              ...getBackgroundStyles(config.buttons.selectedDateButton.background, colors),
              ...getTextStyles(config.buttons.selectedDateButton.text, fonts, colors),
              lineHeight: "1",
            }}
            className="flex flex-row items-center justify-between line-clamp-1 cursor-pointer">
            {/* Selected Dates */}
            {selectedDates.length > 0 ? selectedDates.map(d => d.toLocaleDateString()).join(' - ') : 'Select Dates'} <FaCalendar className="text-[2.5vh]"/>
          </div>
          {/* Calendar Dropdown */}
          {isCalendarDropdownOpen && (
            <div 
              style={{
                backgroundColor: colors[config.dropdowns.calendars.background.color as keyof typeof colors],
              }}
              className="absolute left-0 top-full shadow-lg z-100 w-full lg:w-[100%] p-[1vh] lg:p-[2vh]">
              {/* You selected text */}
              <div
                style={{
                  ...getTextStyles(config.buttons.selectedDateButton.text, fonts, colors)
                }}
                className="my-[2vh] line-clamp-2 lg:line-clamp-1 px-[1vh]">
                You Selected: {window.innerWidth < 476 && <br/>}{selectedDates.length > 1 ? `${selectedDates[0].toLocaleDateString()} - ${selectedDates[selectedDates.length - 1].toLocaleDateString()}` : selectedDates.length === 1 ? selectedDates[0].toLocaleDateString() : 'No dates selected'}
              </div>
              {/* Custom Navigation */}
              <div
                style={{
                  ...getTextStyles(config.dropdowns.calendars.monthText, fonts, colors)
                }} 
                className="flex justify-between items-center mb-4">
                <HiChevronLeft onClick={goToPreviousMonth} className={`cursor-pointer ${calendarMonth <= initialMonth && 'opacity-40' }`} />
                <span className="">
                  {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <HiChevronRight onClick={goToNextMonth} className="cursor-pointer" />
              </div>
              
              {/* Calendar */}
              <div className="flex justify-center">
                <ReactCalendar
                  value={selectedDates.length > 0 ? (selectedDates.length === 1 ? selectedDates[0] : [selectedDates[0], selectedDates[selectedDates.length - 1]]) : null}
                  onChange={(value) => {
                    if (Array.isArray(value)) {
                      setSelectedDates(value.filter(d => d !== null) as Date[]);
                    } else if (value) {
                      setSelectedDates([value]);
                    } else {
                      setSelectedDates([]);
                    }
                  }}
                  activeStartDate={calendarMonth}
                  tileClassName={getTileClassName}
                  selectRange={requiresRange}
                  style={config.dropdowns.calendars}
                  displayNavigation={false}
                />
              </div>
            </div>
          )}
        </div>
        {/* Selected RENTAL */}
        <div className="relative w-full lg:w-7/20 px-[1vh] h-1/3 lg:h-full flex flex-col items-center justify-between mt-[1vh] lg:mt-0">
          <p 
            style={{
              ...getTextStyles(config.text.selectedDates, fonts, colors)
            }}
            className="">{config.text.selectedRental.input}</p>
          {/* Button/Dropdown */}
          <div
            onClick={() => {
              setIsRentalsDropdownOpen(!isRentalsDropdownOpen)
              setIsCalendarDropdownOpen(false);
            }}
            style={{
              ...getBackgroundStyles(config.buttons.selectedDateButton.background, colors),
              ...getTextStyles(config.buttons.selectedDateButton.text, fonts, colors),
              lineHeight: "1",
            }}
            className=" flex flex-row items-center justify-between line-clamp-1 cursor-pointer">
            {/* Rental name */}
             {selectedRental.name} <HiChevronDown className="text-[2.5vh]"/>
          </div>
          {isRentalsDropdownOpen && (
            <div 
              style={{
                ...getBackgroundStyles(config.dropdowns.rentalsDropdown.background, colors),
                ...getTextStyles(config.dropdowns.rentalsDropdown.text, fonts, colors),
              }}
              className="absolute top-full shadow-lg z-100 w-full max-h-40 overflow-y-auto hide-scrollbar">
              {rentals.map((rental) => (
                <div
                  key={rental._id}
                  onClick={() => {
                    setSelectedRental({ name: rental.name, duration: `${rental.duration.value} ${rental.duration.unit}` });
                    setIsRentalsDropdownOpen(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {rental.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Request bookng */}
        <div className="w-full lg:w-6/20 px-[1vh] h-1/3 lg:h-full flex flex-col items-center justify-end">
          <StoreLayoutButton
            onClick={() => {}}
            style={config.buttons.requestBookingButton}
          />
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default StoreRentalsSectionBookingModal;
