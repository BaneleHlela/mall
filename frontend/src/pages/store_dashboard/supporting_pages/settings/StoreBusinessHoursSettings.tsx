import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { editStore } from '../../../../features/store_admin/storeAdminSlice';
import type { Store, OperationTimes } from '../../../../types/storeTypes';
import ToggleSwitch from '../../../../components/the_mall/extras/ToggleSwitch';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoadingButton from '../../../../components/the_mall/buttons/LoadingButton';
import { FaClock, FaSun, FaMoon, FaCheck } from 'react-icons/fa';

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
        confirmButtonColor: "#dc2626"
      });
      return;
    }

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
        confirmButtonColor: "#dc2626"
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
        confirmButtonColor: "#7c3aed"
      });

    } catch (error) {
      console.error("Failed to update operating hours:", error);

      mysweetalert.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while saving your operating hours. Please try again.",
        confirmButtonColor: "#dc2626"
      });
    }
  };

  const dayLabels: Record<string, { short: string; full: string }> = {
    sunday: { short: 'SUN', full: 'Sunday' },
    monday: { short: 'MON', full: 'Monday' },
    tuesday: { short: 'TUE', full: 'Tuesday' },
    wednesday: { short: 'WED', full: 'Wednesday' },
    thursday: { short: 'THU', full: 'Thursday' },
    friday: { short: 'FRI', full: 'Friday' },
    saturday: { short: 'SAT', full: 'Saturday' },
  };

  return (
    <div className="h-full min-h-full w-full bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <FaClock className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Operating Hours</h1>
              <p className="text-white/60 text-sm">Set your store's business hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Always Open Toggle */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <FaSun className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Always Open</h3>
                <p className="text-sm text-slate-500">Your store is open 24/7</p>
              </div>
            </div>
            <ToggleSwitch
              isOn={!operationTimes.alwaysOpen}
              onToggle={handleAlwaysOpenToggle}
            />
          </div>
        </div>

        {/* Operating Hours Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
            <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-slate-600">
              <span>Day</span>
              <span className="flex items-center gap-2">
                <FaSun className="text-amber-500" />
                Opens
              </span>
              <span className="flex items-center gap-2">
                <FaMoon className="text-indigo-500" />
                Closes
              </span>
              <span className="text-right">Status</span>
            </div>
          </div>

          {/* Days */}
          <div className="divide-y divide-slate-100">
            {(Object.entries(operationTimes) as [keyof OperationTimes, any][]).map(([day, time]) => {
              if (day === 'alwaysOpen') return null;

              const label = dayLabels[day as string];
              const dayData = time as { start: string; end: string; closed: boolean };
              const isDisabled = dayData.closed || operationTimes.alwaysOpen;

              return (
                <div 
                  key={day} 
                  className={`px-6 py-4 transition-colors ${isDisabled ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                >
                  <div className="grid grid-cols-4 gap-4 items-center">
                    {/* Day Name */}
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
                        ${dayData.closed 
                          ? 'bg-slate-100 text-slate-400' 
                          : 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600'
                        }`}
                      >
                        {label.short}
                      </span>
                      <span className={`font-medium ${isDisabled ? 'text-slate-400' : 'text-slate-700'}`}>
                        {label.full}
                      </span>
                    </div>

                    {/* Start Time */}
                    <div>
                      <input
                        type="time"
                        value={dayData.start}
                        disabled={isDisabled}
                        className={`w-full px-3 py-2 bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors
                          ${!validation[day as keyof typeof validation].valid 
                            ? 'border-red-300' 
                            : isDisabled 
                              ? 'border-transparent bg-slate-100 text-slate-400' 
                              : 'border-slate-200 focus:border-amber-500'
                          }`}
                        onChange={(e) => handleTimeChange(day as keyof Omit<OperationTimes, 'alwaysOpen'>, 'start', e.target.value)}
                      />
                    </div>

                    {/* End Time */}
                    <div>
                      <input
                        type="time"
                        value={dayData.end}
                        disabled={isDisabled}
                        className={`w-full px-3 py-2 bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors
                          ${!validation[day as keyof typeof validation].valid 
                            ? 'border-red-300' 
                            : isDisabled 
                              ? 'border-transparent bg-slate-100 text-slate-400' 
                              : 'border-slate-200 focus:border-amber-500'
                          }`}
                        onChange={(e) => handleTimeChange(day as keyof Omit<OperationTimes, 'alwaysOpen'>, 'end', e.target.value)}
                      />
                    </div>

                    {/* Closed Toggle */}
                    <div className="flex items-center justify-end gap-2">
                      {dayData.closed && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-medium">
                          Closed
                        </span>
                      )}
                      <ToggleSwitch
                        isOn={!dayData.closed}
                        onToggle={() => handleClosedToggle(day as keyof Omit<OperationTimes, 'alwaysOpen'>)}
                      />
                    </div>
                  </div>
                  
                  {/* Validation Error */}
                  {!validation[day as keyof typeof validation].valid && (
                    <div className="mt-2 ml-13 pl-13">
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {validation[day as keyof typeof validation].message}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-6 py-4 border-t border-slate-100">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <FaCheck className="text-green-500" />
              <span>Changes are saved automatically when you click Save</span>
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <LoadingButton isLoading={isLoading} label="Save Changes" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBusinessHoursSettings;
