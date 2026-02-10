import React, { useState, useEffect } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { makePackageBooking, getAvailableBookingTimes } from '../../../features/bookings/bookingsSlice';
import type { UserPackage } from '../../../types/packageTypes';

interface MakeBookingModalUserProps {
    userPackage: UserPackage;
    onClose: () => void;
    onSuccess: () => void;
}
interface SelectedStaff {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
}
type CurrentSection = 'selectDate' | 'selectTime' | 'finalizeBooking';

const MakeBookingModalUser: React.FC<MakeBookingModalUserProps> = ({
    userPackage,
    onClose,
    onSuccess
}) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const { availableTimes, loading, error } = useAppSelector((state) => state.booking);
    
    const [currentSection, setCurrentSection] = useState<CurrentSection>('selectDate');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [calendarDate, setCalendarDate] = useState<Date>(new Date());
    const [selectedStaff, setSelectedStaff] = useState<SelectedStaff | null>(null);
    const [notes, setNotes] = useState('');
    const [staffMembers, setStaffMembers] = useState<Array<{ _id: string; name: string; avatar?: string }>>([]);
    const [localError, setLocalError] = useState<string | null>(null);

    // Generate dates for the next 30 days
    const availableDates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        return date;
    });

    // Fetch available times when date changes
    useEffect(() => {
        if (selectedDate && selectedStaff) {
            const storeId = typeof userPackage.store === 'string' 
                ? userPackage.store 
                : userPackage.store._id;
            const dateStr = selectedDate.toISOString().split('T')[0];
            
            dispatch(getAvailableBookingTimes({
                storeId,
                itemId: userPackage._id,
                itemType: 'Package',
                date: dateStr,
                staffId: selectedStaff._id
            }));
        }
    }, [selectedDate, selectedStaff, dispatch, userPackage]);

    const handleDateSelect = (date: Date | Date[]) => {
        const selected = Array.isArray(date) ? date[0] : date;
        setSelectedDate(selected);
        setCalendarDate(selected);
        setSelectedTime(null);
        setCurrentSection('selectTime');
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setCurrentSection('finalizeBooking');
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime || !selectedStaff) {
            setLocalError('Please select all required fields');
            return;
        }

        const storeId = typeof userPackage.store === 'string' 
            ? userPackage.store 
            : userPackage.store._id;
        const dateStr = selectedDate.toISOString().split('T')[0];

        try {
            const result = await dispatch(makePackageBooking({
                userPackageId: userPackage._id,
                store: storeId,
                date: dateStr,
                time: selectedTime,
                staff: selectedStaff._id,
                notes
            })).unwrap();
            
            onSuccess();
            onClose();
        } catch (err: any) {
            setLocalError(err?.message || 'Failed to create booking');
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const getAvailableTimesForDate = (): string[] => {
        if (!selectedDate) return [];
        const dateStr = selectedDate.toISOString().split('T')[0];
        return availableTimes[dateStr] || [];
    };

    return (
        <div
            className='w-full max-w-full h-full rounded-[2vh] bg-orange-100 p-4 overflow-y-auto'
        >
            {/* ---- HEADER ---- */}
            <div className="w-full flex items-center justify-between mb-[1vh] bg-white rounded-lg p-2">
                <button
                    onClick={() => {
                        if (currentSection === 'selectDate') {
                            onClose(); // Call the modal close function
                        } else if (currentSection === 'selectTime') {
                            setCurrentSection('selectDate');
                        } else if (currentSection === 'finalizeBooking') {
                            setCurrentSection('selectTime');
                        }
                    }}
                    className={`hover:bg-stone-200 rounded-full transition-colors ${
                        currentSection === 'selectDate' ? 'cursor-not-allowed' : ''
                    }`}
                >
                    <IoChevronBackOutline className='text-[2.5vh]'/>
                </button>
                <h1 className="text-[2.5vh] font-semibold text-stone-800 line-clamp-1">
                    Step {currentSection === 'selectDate' ? `1` : currentSection === 'selectTime' ? `2` : `3`} {' '}
                    {/* {currentSection === 'selectDate' ? 'Select Date' : currentSection === 'selectTime' ? 'Select Time' : 'Confirm Booking'} */}
                </h1>
            </div>
                    
            {/* ---- PACKAGE INFO ---- */}
            {currentSection !== 'finalizeBooking' && (
                <div className="bg-white rounded-lg p-3 mb-3">
                    <h2 className="text-lg font-semibold text-stone-800">{userPackage.package.name}</h2>
                    <p className="text-sm text-stone-600">
                        {userPackage.package.sessions?.amount || 0} sessions total, {userPackage.sessionsRemaining} remaining
                    </p>
                    <p className="text-xs text-stone-500">
                        Session duration: {userPackage.package.sessions?.duration || 60} minutes
                    </p>
                </div>
            )}
            
            {/* Select Stadff Member */}
            {currentSection !== 'finalizeBooking' && (
                <div className="max-w-full my-2">
                    <div className="max-w-full flex space-x-[.5vh] overflow-x-scroll">
                        {/* Example staff members */}
                        {userPackage.package.staff && userPackage.package.staff.length > 0 ? (
                            userPackage.package.staff.map((member: string, staffId: string) => (
                                <button
                                    key={staffId}
                                    onClick={() => setSelectedStaff(member)}
                                    className={`max-h-[6vh] min-w-[20vh]  flex items-center space-x-[.5vh] px-[1vh] py-[.5vh] rounded-lg transition-colors whitespace-nowrap ${
                                        selectedStaff 
                                            ? 'bg-black text-white'
                                            : 'bg-white border border-stone-300 hover:bg-stone-100'
                                    }`}
                                >
                                    <img src={member.avatar} alt={`${member.firstName} avatar`} className="w-[3vh] h-[3vh] rounded-full"/>
                                    <span className='line-clamp-1 text-[1.8vh] font-semibold'>{member.firstName} {member.lastName}</span>
                                </button>
                            ))
                        ) : (<>No staff members</>)}
                    </div>
                </div>
            )}
            

            {/* ---- CONTENT ---- */}
            <div className="bg-white rounded-lg p-4 min-h-[40vh]">
                {currentSection === 'selectDate' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Select a date for your session</h3>
                        <div className="flex justify-center">
                            <Calendar
                                onChange={(value) => handleDateSelect(value as Date | Date[])}
                                value={calendarDate}
                                minDate={new Date()}
                                maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                                className="border rounded-lg p-2"
                                prev2Label={null}
                                next2Label={null}
                            />
                        </div>
                    </div>
                )}

                {currentSection === 'selectTime' && (
                    <div className='flex flex-col justify-between items-start'>
                        <h3 className="text-lg font-semibold mb-3">
                            Select a time for {selectedDate && formatDate(selectedDate)}
                        </h3>
                        
                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-stone-500">Loading available times...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-2">
                                {getAvailableTimesForDate().length > 0 ? (
                                    getAvailableTimesForDate().map((time, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`p-3 border rounded-lg transition-colors ${
                                                selectedTime === time
                                                    ? 'bg-orange-500 text-white border-orange-500'
                                                    : 'hover:bg-orange-100 hover:border-orange-300'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))
                                ) : selectedStaff ? (
                                    <p className="col-span-4 text-center py-8 text-stone-500">
                                        No available times for this date and staff member. Please select another date or staff member.
                                    </p>
                                ) : (
                                    <p className="col-span-4 text-center py-8 text-stone-500">
                                        Select staff
                                    </p>
                                )}
                            </div>
                        )}
                        
                        <button
                            onClick={() => setCurrentSection('selectDate')}
                            className="mt-4 text-orange-600 hover:text-orange-800 text-sm"
                        >
                            ← Select another date
                        </button>
                    </div>
                )}

                {currentSection === 'finalizeBooking' && (
                    <div>
                        {/* <h3 className="text-lg font-semibold mb-3">Review and confirm your booking</h3> */}
                        
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-stone-600">Package:</span>
                                <span className="font-medium">{userPackage.package.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-stone-600">Date:</span>
                                <span className="font-medium">{selectedDate && formatDate(selectedDate)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-stone-600">Time:</span>
                                <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-stone-600">Duration:</span>
                                <span className="font-medium">{userPackage.package.sessions?.duration || 60} minutes</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-stone-600">Sessions remaining after:</span>
                                <span className="font-medium">{userPackage.sessionsRemaining - 1}</span>
                            </div>
                        </div>

                        {/* Staff Selection */}
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-stone-700 mb-2">Selected Staff Member: {selectedStaff.firstName}</h4>
                            {/* <div className="flex space-x-2 overflow-x-auto pb-2">
                                {staffMembers.map((staff) => (
                                    <button
                                        key={staff._id}
                                        onClick={() => setSelectedStaff(staff._id)}
                                        className={`h-[5vh] w-[20vh] flex items-center space-x-[.5vh] px-[1vh] py-[.5vh] rounded-lg transition-colors whitespace-nowrap ${
                                            selectedStaff === staff._id
                                                ? 'bg-black text-white'
                                                : 'bg-white border border-stone-300 hover:bg-stone-100'
                                        }`}
                                    >
                                        <div className="w-[3vh] h-[3vh] rounded-full bg-stone-300 flex items-center justify-center text-xs">
                                            {staff.name.charAt(0)}
                                        </div>
                                        <span className='line-clamp-1 text-sm'>{staff.name}</span>
                                    </button>
                                ))}
                            </div> */}
                        </div>

                        {/* Notes */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                Notes (optional)
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any special requests or notes..."
                                className="w-full p-3 border border-stone-300 rounded-lg resize-none focus:outline-none focus:border-orange-500"
                                rows={3}
                            />
                        </div>

                        {(localError || error) && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                {error || localError}
                            </div>
                        )}

                        <button
                            onClick={handleBooking}
                            disabled={loading || !selectedStaff}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                loading || !selectedStaff
                                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                    : 'bg-orange-500 text-white hover:bg-orange-600'
                            }`}
                        >
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MakeBookingModalUser;
