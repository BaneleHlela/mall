import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store, OperationTimes } from '../../../../types/storeTypes';
import ToggleSwitch from '../../../../components/the_mall/extras/ToggleSwitch';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { LoadingButton } from '../../../../components/the_mall/buttons/LoadingButton';

const mysweetalert = withReactContent(Swal);

const StoreBusinessHoursSettings = () => {
  const dispatch = useAppDispatch();
  const { store, isLoading, error } = useAppSelector((state) => state.storeAdmin);

  const [operationTimes, setOperationTimes] = useState<OperationTimes>({
    alwaysOpen: false,
    sunday: { start: '07:00', end: '17:00', closed: false },
    monday: { start: '07:00', end: '17:00', closed: false },
    tuesday: { start: '07:00', end: '17:00', closed: false },
    wednesday: { start: '07:00', end: '17:00', closed: false },
    thursday: { start: '07:00', end: '17:00', closed: false },
    friday: { start: '07:00', end: '17:00', closed: false },
    saturday: { start: '07:00', end: '17:00', closed: false },
  });

  const [validation, setValidation] = useState({
    sunday: { valid: true, message: '' },
    monday: { valid: true, message: '' },
    tuesday: { valid: true, message: '' },
    wednesday: { valid: true, message: '' },
    thursday: { valid: true, message: '' },
    friday: { valid: true, message: '' },
    saturday: { valid: true, message: '' },
  });

  useEffect(() => {
    if (store?.operationTimes) {
      setOperationTimes(store.operationTimes);
    }
  }, [store]);

  const validateDay = (day: keyof Omit<OperationTimes, 'alwaysOpen'>, dayData: { start: string; end: string; closed: boolean }) => {
    if (!dayData.closed && !operationTimes.alwaysOpen) {
      if (!dayData.start || !dayData.end) {
        setValidation(prev => ({
          ...prev,
          [day]: { valid: false, message: 'Start and end times are required when store is open' }
        }));
        return false;
      }
      if (dayData.start >= dayData.end) {
        setValidation(prev => ({
          ...prev,
          [day]: { valid: false, message: 'End time must be after start time' }
        }));
        return false;
      }
    }
    
    setValidation(prev => ({
      ...prev,
      [day]: { valid: true, message: '' }
    }));
    return true;
  };

  const handleTimeChange = (day: keyof Omit<OperationTimes, 'alwaysOpen'>, key: 'start' | 'end', value: string) => {
    const updatedDayData = {
      ...operationTimes[day],
      [key]: value,
    };
    
    setOperationTimes(prev => ({
      ...prev,
      [day]: updatedDayData
    }));

    // Validate the day after updating
    setTimeout(() => validateDay(day, updatedDayData), 0);
  };

  const handleClosedToggle = (day: keyof Omit<OperationTimes, 'alwaysOpen'>) => {
    const updatedDayData = {
      ...operationTimes[day],
      closed: !operationTimes[day].closed
    };
    
    setOperationTimes(prev => ({
      ...prev,
      [day]: updatedDayData
    }));

    // Validate the day after updating
    setTimeout(() => validateDay(day, updatedDayData), 0);
  };

  const handleAlwaysOpenToggle = () => {
    setOperationTimes(prev => ({
      ...prev,
      alwaysOpen: !prev.alwaysOpen
    }));
  };

  const handleSave = async () => {
    if (!store) {
      mysweetalert.fire({
        icon: "error",
        title: "Store Not Found",
        text: "Cannot update settings because the store was not loaded.",
        confirmButtonColor: "#d33"
      });
      return;
    }

    // Validate all days before saving
    let hasValidationErrors = false;
    const days: (keyof Omit<OperationTimes, 'alwaysOpen'>)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    days.forEach(day => {
      const dayData = operationTimes[day];
      if (!validateDay(day, dayData)) {
        hasValidationErrors = true;
      }
    });

    if (hasValidationErrors) {
      mysweetalert.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix all highlighted fields before saving.",
        confirmButtonColor: "#d33"
      });
      return;
    }

    const updatedStore: Omit<Store, 'id'> = {
      ...store,
      operationTimes
    };

    try {
      await dispatch(editStore({ storeSlug: store.slug, updatedStore })).unwrap();

      mysweetalert.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your operating hours have been updated.",
        confirmButtonColor: "#3085d6"
      });

    } catch (error) {
      console.error("Failed to update operating hours:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your operating hours. Please try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className='flex justify-center w-full h-full bg-white border-t-[.5vh] border-gray-200 lg:border-none'>
      <div className="flex flex-col justify-between items-center w-full max-w-4xl">
        <h1 className="py-5 text-2xl font-[500] w-full text-center text-shadow-2xs">Operating Hours</h1>
        
        <div className="flex flex-col space-y-4 w-full px-4">
          {/* Always Open Toggle */}
          <div className="flex justify-between items-center p-4 bg-[#0000000e] rounded">
            <span className="font-semibold text-lg text-black">Always Open?</span>
            <ToggleSwitch
              isOn={!operationTimes.alwaysOpen}
              onToggle={handleAlwaysOpenToggle}
            />
          </div>

          {/* Operating Hours Grid */}
          <div className="bg-[#0000000e] p-4 rounded">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 font-semibold text-md border-b pb-2 mb-4 text-black">
              <span>Day</span>
              <span>From</span>
              <span>Till</span>
              <span className="text-red-500">Closed</span>
            </div>

            {/* Weekdays */}
            {(Object.entries(operationTimes) as [keyof OperationTimes, any][]).map(([day, time]) => {
              if (day === 'alwaysOpen') return null;

              const label = day.slice(0, 3).toUpperCase();
              const dayData = time as { start: string; end: string; closed: boolean };

              return (
                <div key={day}>
                  <div className="grid grid-cols-4 gap-4 items-center py-2">
                    <span className="text-md text-black font-medium">{label}</span>
                    <input
                      type="time"
                      value={dayData.start}
                      disabled={dayData.closed || operationTimes.alwaysOpen}
                      className={`border-b p-2 bg-[#0000000e] focus:bg-[#00000030] disabled:opacity-50 ${
                        !validation[day as keyof typeof validation].valid ? 'border-red-500' : ''
                      }`}
                      onChange={(e) => handleTimeChange(day as keyof Omit<OperationTimes, 'alwaysOpen'>, 'start', e.target.value)}
                    />
                    <input
                      type="time"
                      value={dayData.end}
                      disabled={dayData.closed || operationTimes.alwaysOpen}
                      className={`border-b p-2 bg-[#0000000e] focus:bg-[#00000030] disabled:opacity-50 ${
                        !validation[day as keyof typeof validation].valid ? 'border-red-500' : ''
                      }`}
                      onChange={(e) => handleTimeChange(day as keyof Omit<OperationTimes, 'alwaysOpen'>, 'end', e.target.value)}
                    />
                    <ToggleSwitch
                      isOn={!dayData.closed}
                      onToggle={() => handleClosedToggle(day as keyof Omit<OperationTimes, 'alwaysOpen'>)}
                    />
                  </div>
                  {!validation[day as keyof typeof validation].valid && (
                    <p className="text-red-500 text-sm mt-1 col-span-4">
                      {validation[day as keyof typeof validation].message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {error && <p className='text-sm text-red-600'>{error}</p>}
        
        {/* Save Button */}
        <div className="w-full flex flex-row justify-center mb-[2vh]">
          <button
            type="button"
            onClick={handleSave}
            className="mt-5 px-4 py-2 text-white bg-[#0b032d] hover:scale-105 hover:opacity-80 disabled:bg-gray-500"
          >
            <LoadingButton isLoading={isLoading} label="Save" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreBusinessHoursSettings;
