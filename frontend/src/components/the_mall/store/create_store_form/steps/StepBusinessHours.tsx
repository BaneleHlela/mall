import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import ToggleSwitch from '../../../extras/ToggleSwitch';
import { motion } from 'framer-motion';
import { FaClock, FaCheck, FaExclamationCircle } from 'react-icons/fa';

const StepBusinessHours: React.FC = () => {
  const { form, handleChange, setStepValidator, nextClicked } = useFormContext();
  const [validation, setValidation] = useState({
    businessHoursValid: true
  });

  const validateBusinessHours = () => {
    // Business hours are optional if always open is selected
    if (form.operationTimes.alwaysOpen) {
      setValidation({ businessHoursValid: true });
      return true;
    }

    // Check if at least one day has valid hours
    const hasValidDay = Object.entries(form.operationTimes).some(([day, time]) => {
      if (day === 'alwaysOpen') return false;
      const timeObj = time as any;
      return !timeObj.closed && timeObj.start && timeObj.end;
    });

    setValidation({ businessHoursValid: hasValidDay });
    return hasValidDay;
  };

  useEffect(() => {
    setStepValidator(validateBusinessHours);
  }, [form.operationTimes]);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-4 text-sm">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <FaClock className="text-indigo-600" />
          <p className="hidden text-lg font-semibold text-gray-800">Operating Hours</p>
        </div>
        <p className="text-xs text-gray-500">Set when your store is open for business</p>
      </div>

      {/* Always Open toggle */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div>
          <span className="font-semibold text-gray-800">Always Open?</span>
          <p className="text-xs text-gray-500">Your store is open 24/7</p>
        </div>
        <ToggleSwitch
          isOn={!form.operationTimes.alwaysOpen}
          onToggle={() =>
            handleChange('operationTimes.alwaysOpen', !form.operationTimes.alwaysOpen)
          }
        />
      </div>

      {/* Days */}
      <div className="space-y-2">
        {days.map((day) => {
          const label = day.charAt(0).toUpperCase() + day.slice(1);
          const time = form.operationTimes[day] as any;
          const isDisabled = time?.closed || form.operationTimes.alwaysOpen;
          
          return (
            <motion.div 
              key={day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`grid grid-cols-4 gap-2 items-center p-3 rounded-lg border transition-all duration-200
                ${isDisabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`}
            >
              <span className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                {label}
              </span>
              <input
                type="time"
                value={time?.start || ''}
                disabled={isDisabled}
                onChange={(e) =>
                  handleChange(`operationTimes.${day}.start`, e.target.value)
                }
                className={`col-span-1 border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all
                  ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
              />
              <input
                type="time"
                value={time?.end || ''}
                disabled={isDisabled}
                onChange={(e) =>
                  handleChange(`operationTimes.${day}.end`, e.target.value)
                }
                className={`col-span-1 border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all
                  ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
              />
              <div className="flex justify-center">
                <ToggleSwitch
                  isOn={!time?.closed}
                  onToggle={() =>
                    handleChange(`operationTimes.${day}.closed`, !time?.closed)
                  }
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      {form.operationTimes.alwaysOpen ? (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <FaCheck className="text-green-500" />
          <span className="text-sm text-green-700">Your store is always open</span>
        </div>
      ) : (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-xs text-indigo-700">
            💡 Tip: Make sure to set hours for at least one day, or enable "Always Open"
          </p>
        </div>
      )}

      {/* Validation error */}
      {nextClicked && !validation.businessHoursValid && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
        >
          <FaExclamationCircle />
          <span>Please set operating hours for at least one day or enable "Always Open"</span>
        </motion.div>
      )}
    </div>
  );
};

export default StepBusinessHours;
