import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import ToggleSwitch from '../extras/ToggleSwitch';

interface OperationTimes {
  alwaysOpen: boolean;
  [key: string]: any;
}

interface SetOperatingHoursProps {
  operationTimes: OperationTimes;
  onChange: (path: string, value: any) => void;
  nextClicked?: boolean;
  showValidation?: boolean;
}

const SetOperatingHours: React.FC<SetOperatingHoursProps> = ({ 
  operationTimes, 
  onChange, 
  nextClicked = false,
  showValidation = true 
}) => {
  const [validation, setValidation] = useState({ businessHoursValid: true });

  const validateBusinessHours = () => {
    if (operationTimes.alwaysOpen) {
      setValidation({ businessHoursValid: true });
      return true;
    }

    const hasValidDay = Object.entries(operationTimes).some(([day, time]) => {
      if (day === 'alwaysOpen') return false;
      const timeObj = time as any;
      return !timeObj.closed && timeObj.start && timeObj.end;
    });

    setValidation({ businessHoursValid: hasValidDay });
    return hasValidDay;
  };

  React.useEffect(() => {
    validateBusinessHours();
  }, [operationTimes]);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-4 text-sm">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <FaClock className="text-indigo-600" />
          <p className="hidden text-lg font-semibold text-gray-800">Operating Hours</p>
        </div>
        <p className="text-xs text-gray-500">Set your availability for deliveries</p>
      </div>

      {/* Always Open toggle */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div>
          <span className="font-semibold text-gray-800">Always Open? (24/7)</span>
          <p className="text-xs text-gray-500">Available all the time</p>
        </div>
        <ToggleSwitch
          isOn={!operationTimes.alwaysOpen}
          onToggle={() => onChange('operationTimes.alwaysOpen', !operationTimes.alwaysOpen)}
        />
      </div>

      {/* Days */}
      <div className="space-y-2">
        {days.map((day) => {
          const label = day.charAt(0).toUpperCase() + day.slice(1);
          const time = operationTimes[day] as any;
          const isDisabled = time?.closed || operationTimes.alwaysOpen;
          
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
                onChange={(e) => onChange(`operationTimes.${day}.start`, e.target.value)}
                className={`col-span-1 border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all
                  ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
              />
              <input
                type="time"
                value={time?.end || ''}
                disabled={isDisabled}
                onChange={(e) => onChange(`operationTimes.${day}.end`, e.target.value)}
                className={`col-span-1 border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all
                  ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
              />
              <div className="flex justify-center">
                <ToggleSwitch
                  isOn={!time?.closed}
                  onToggle={() => onChange(`operationTimes.${day}.closed`, !time?.closed)}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      {operationTimes.alwaysOpen ? (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <FaCheck className="text-green-500" />
          <span className="text-sm text-green-700">You are always available</span>
        </div>
      ) : (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-xs text-indigo-700">
            💡 Tip: Set hours for at least one day, or enable "Always Open"
          </p>
        </div>
      )}

      {/* Validation error */}
      {showValidation && nextClicked && !validation.businessHoursValid && (
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

export default SetOperatingHours;
